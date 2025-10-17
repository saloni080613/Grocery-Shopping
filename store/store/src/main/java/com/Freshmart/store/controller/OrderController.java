package com.Freshmart.store.controller;

import com.Freshmart.store.dto.CreateOrderRequestDTO;
import com.Freshmart.store.model.Orders;
import com.Freshmart.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createNewOrder(@RequestBody CreateOrderRequestDTO requestDTO) {
        Orders createdOrder = orderService.createOrder(requestDTO);

        if (createdOrder == null) {
            return new ResponseEntity<>("Customer not found with ID: " + requestDTO.getCustomerId(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }
}