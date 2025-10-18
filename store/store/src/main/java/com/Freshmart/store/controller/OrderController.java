package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddOrderItemRequestDTO;
import com.Freshmart.store.dto.CreateOrderRequestDTO;
import com.Freshmart.store.dto.OrderHistoryDTO;
import com.Freshmart.store.dto.UpdateOrderStatusRequestDTO;
import com.Freshmart.store.model.Order_Items;
import com.Freshmart.store.model.Orders;
import com.Freshmart.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderHistoryDTO>> getAllOrders() {
        List<OrderHistoryDTO> allOrderHistory = orderService.getAllOrderHistory();
        return ResponseEntity.ok(allOrderHistory);
    }

    @PostMapping
    public ResponseEntity<?> createNewOrder(@RequestBody CreateOrderRequestDTO requestDTO) {
        Orders createdOrder = orderService.createOrder(requestDTO);

        if (createdOrder == null) {
            return new ResponseEntity<>("Customer not found with ID: " + requestDTO.getCustomerId(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PostMapping("/{orderId}/items")
    public ResponseEntity<List<Order_Items>> addItemsToOrder(
            @PathVariable Integer orderId,
            @RequestBody List<AddOrderItemRequestDTO> items) {

        List<Order_Items> savedItems = orderService.addItemsToOrder(orderId, items);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItems);
    }

    @PatchMapping("/status")
    public ResponseEntity<?> updateSingleOrderStatus(@RequestBody UpdateOrderStatusRequestDTO requestDTO) {
        try {
            Orders updatedOrder = orderService.updateOrderStatus(requestDTO);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}