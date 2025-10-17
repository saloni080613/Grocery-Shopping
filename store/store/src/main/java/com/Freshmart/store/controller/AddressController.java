package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddressDTO;
import com.Freshmart.store.dto.SaveAddressRequestDTO;
import com.Freshmart.store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private CustomerService customerService;


    @PutMapping
    public ResponseEntity<?> saveOrUpdateAddress(@RequestBody SaveAddressRequestDTO requestDTO) {
        AddressDTO savedAddress = customerService.saveOrUpdateAddress(requestDTO);

        if (savedAddress == null) {
            // This happens if the customerId in the request body is not valid.
            return new ResponseEntity<>("Customer not found with ID: " + requestDTO.getCustomerId(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(savedAddress);
    }
}