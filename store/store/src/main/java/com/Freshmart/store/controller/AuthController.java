package com.Freshmart.store.controller;

import com.Freshmart.store.dto.*;
import com.Freshmart.store.service.AuthService;
import com.Freshmart.store.dto.ApiResponse;
import com.Freshmart.store.dto.PasswordDtos.ForgotPasswordRequest;
import com.Freshmart.store.dto.PasswordDtos.ResetPasswordRequest;
import com.Freshmart.store.model.Admins;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.AdminRepository;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.service.AdminService;
import com.Freshmart.store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;




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
        newCustomer.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
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
        newAdmin.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Storing plain text as before
        newAdmin.setStatus("logged_out");

        Admins savedAdmin = adminRepository.save(newAdmin);

        return ResponseEntity.ok(savedAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String role = loginRequest.getRole();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword(); // Plain-text from user

        if ("Customer".equalsIgnoreCase(role)) {
            Optional<Customers> customerOptional = customerRepository.findByEmail(email);
            if (customerOptional.isPresent()) {
                Customers customer = customerOptional.get();

                // --- SIMPLIFIED CHECK ---
                // We now assume the stored password is ALWAYS a hash
                if (passwordEncoder.matches(password, customer.getPassword())) {

                    // --- SUCCESS ---
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

                // --- SIMPLIFIED CHECK ---
                if (passwordEncoder.matches(password, admin.getPassword())) {

                    // --- SUCCESS ---
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

        // If we get here, user not found or password didn't match
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @Autowired
    private AuthService authService;

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            String result = authService.forgotPassword(request.getEmail());
            // Wrap the success message in the ApiResponse object
            return ResponseEntity.ok(new ApiResponse(result));
        } catch (RuntimeException e) {
            // Wrap the error message in the ApiResponse object
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            String result = authService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(new ApiResponse(result));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
    }

    @PutMapping("/logout/{customerId}")
    public ResponseEntity<Customers> logoutCustomer(@PathVariable Integer customerId) {
        Customers updatedCustomer = customerService.logoutCustomer(customerId);
        return ResponseEntity.ok(updatedCustomer);
    }




}