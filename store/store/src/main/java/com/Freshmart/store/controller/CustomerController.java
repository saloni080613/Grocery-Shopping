package com.Freshmart.store.controller;

import com.Freshmart.store.dto.CustomerResponseDTO;
import com.Freshmart.store.dto.OrderHistoryDTO;
import com.Freshmart.store.service.CustomerService;
import com.Freshmart.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Integer id) {
        CustomerResponseDTO customerDetails = customerService.getCustomerDetails(id);
        if (customerDetails == null) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(customerDetails);
    }

    @GetMapping("/{customerId}/orders")
    public ResponseEntity<List<OrderHistoryDTO>> getOrderHistory(@PathVariable Integer customerId) {
        List<OrderHistoryDTO> orderHistory = orderService.getOrderHistoryForCustomer(customerId);
        return ResponseEntity.ok(orderHistory);
    }
}