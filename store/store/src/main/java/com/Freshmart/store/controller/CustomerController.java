package com.Freshmart.store.controller;

import com.Freshmart.store.dto.CustomerResponseDTO;
import com.Freshmart.store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Integer id) {
        CustomerResponseDTO customerDetails = customerService.getCustomerDetails(id);
        if (customerDetails == null) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(customerDetails);
    }
}