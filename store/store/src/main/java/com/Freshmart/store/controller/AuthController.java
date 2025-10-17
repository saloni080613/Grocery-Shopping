package com.Freshmart.store.controller;

import com.Freshmart.store.dto.LoginRequest;
import com.Freshmart.store.dto.RegisterRequest;
import com.Freshmart.store.model.Admins;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.AdminRepository;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminRepository adminRepository;

    // --- EXISTING CUSTOMER REGISTRATION ---
    @PostMapping("/register")
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

    // --- NEW ADMIN REGISTRATION METHOD ---
    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest registerRequest) {
        // 1. Check if the email is already in use by another admin
        if (adminRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // 2. Check if the phone number is already in use by another admin
        if (adminRepository.existsByPhone(registerRequest.getMobileNo())) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }

        // 3. If checks pass, create the new admin
        Admins newAdmin = new Admins();
        newAdmin.setName(registerRequest.getUsername());
        newAdmin.setEmail(registerRequest.getEmail());
        newAdmin.setPhone(registerRequest.getMobileNo());
        newAdmin.setPassword(registerRequest.getPassword()); // Storing plain text as before
        newAdmin.setStatus("logged_out");

        Admins savedAdmin = adminRepository.save(newAdmin);

        return ResponseEntity.ok(savedAdmin);
    }

    // --- EXISTING LOGIN METHOD ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // ... (existing login logic is unchanged)
        String role = loginRequest.getRole();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if ("Customer".equalsIgnoreCase(role)) {
            Optional<Customers> customerOptional = customerRepository.findByEmail(email);
            if (customerOptional.isPresent()) {
                Customers customer = customerOptional.get();
                if (password.equals(customer.getPassword())) {
                    customer.setStatus("logged_in");
                    customerRepository.save(customer);

                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Customer login successful!");
                    response.put("userId", customer.getCustomerId());
                    response.put("userName", customer.getName());
                    response.put("role", "Customer");

                    return ResponseEntity.ok(response);
                }
            }
        } else if ("Admin".equalsIgnoreCase(role)) {
            Optional<Admins> adminOptional = adminRepository.findByEmail(email);
            if (adminOptional.isPresent()) {
                Admins admin = adminOptional.get();
                if (password.equals(admin.getPassword())) {
                    admin.setStatus("logged_in");
                    adminRepository.save(admin);

                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Admin login successful!");
                    response.put("userId", admin.getAdminId());
                    response.put("userName", admin.getName());
                    response.put("role", "Admin");

                    return ResponseEntity.ok(response);
                }
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PutMapping("/logout/{customerId}")
    public ResponseEntity<Customers> logoutCustomer(@PathVariable Integer customerId) {
        Customers updatedCustomer = customerService.logoutCustomer(customerId);
        return ResponseEntity.ok(updatedCustomer);
    }
}