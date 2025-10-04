package com.Freshmart.store.controller;

import com.Freshmart.store.dto.LoginRequest;
import com.Freshmart.store.dto.RegisterRequest;
import com.Freshmart.store.model.Admins;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.AdminRepository;
import com.Freshmart.store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AdminRepository adminRepository;

    // The /register method remains unchanged
    @PostMapping("/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterRequest registerRequest) {
        if (customerRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (customerRepository.existsByPhone(registerRequest.getMobileNo())) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }

        Customers newCustomer = new Customers();
        newCustomer.setName(registerRequest.getUsername());
        newCustomer.setEmail(registerRequest.getEmail());
        newCustomer.setPhone(registerRequest.getMobileNo());
        newCustomer.setPassword(registerRequest.getPassword());
        newCustomer.setStatus("logged_out");

        Customers savedCustomer = customerRepository.save(newCustomer);
        return ResponseEntity.ok(savedCustomer);
    }

    // --- THIS IS THE UPDATED /login METHOD ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String role = loginRequest.getRole();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if ("Customer".equalsIgnoreCase(role)) {
            Optional<Customers> customerOptional = customerRepository.findByEmail(email);
            if (customerOptional.isPresent()) {
                Customers customer = customerOptional.get();
                if (password.equals(customer.getPassword())) {
                    // --- CHANGE START ---
                    // Create a response object (Map) to return as JSON
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Customer login successful!");
                    response.put("userId", customer.getCustomerId()); // Use the getter from your Customers class
                    response.put("userName", customer.getName());
                    response.put("role", "Customer");

                    return ResponseEntity.ok(response);
                    // --- CHANGE END ---
                }
            }
        } else if ("Admin".equalsIgnoreCase(role)) {
            Optional<Admins> adminOptional = adminRepository.findByEmail(email);
            if (adminOptional.isPresent()) {
                Admins admin = adminOptional.get();
                if (password.equals(admin.getPassword())) {
                    // --- CHANGE START ---
                    // Create a response object (Map) for the admin
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Admin login successful!");
                    response.put("userId", admin.getAdminId()); // Use the getter from your Admins class
                    response.put("userName", admin.getName());
                    response.put("role", "Admin");

                    return ResponseEntity.ok(response);
                    // --- CHANGE END ---
                }
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}