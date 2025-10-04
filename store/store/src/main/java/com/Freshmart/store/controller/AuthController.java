package com.Freshmart.store.controller;

import com.Freshmart.store.dto.RegisterRequest;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterRequest registerRequest) {

        // --- VALIDATION LOGIC START ---

        // 1. Check if the email is already in use
        if (customerRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // 2. Check if the phone number is already in use
        if (customerRepository.existsByPhone(registerRequest.getMobileNo())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Phone number is already in use!");
        }

        // --- VALIDATION LOGIC END ---

        // If both checks pass, create the new customer
        Customers newCustomer = new Customers();
        newCustomer.setName(registerRequest.getUsername());
        newCustomer.setEmail(registerRequest.getEmail());
        newCustomer.setPhone(registerRequest.getMobileNo());
        newCustomer.setPassword(registerRequest.getPassword());
        newCustomer.setStatus("logged_out");

        Customers savedCustomer = customerRepository.save(newCustomer);

        return ResponseEntity.ok(savedCustomer);
    }
}