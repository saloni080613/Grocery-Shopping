package com.Freshmart.store.service;

import com.Freshmart.store.dto.AddOrderItemRequestDTO;
import com.Freshmart.store.dto.CreateOrderRequestDTO;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Order_Items;
import com.Freshmart.store.model.Orders;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductsRepository productRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public Orders createOrder(CreateOrderRequestDTO requestDTO) {
        // Step 1: Find the customer to link to the order.
        Optional<Customers> customerOptional = customerRepository.findById(requestDTO.getCustomerId());
        if (customerOptional.isEmpty()) {
            // If the customer doesn't exist, we cannot create the order.
            return null;
        }
        Customers customer = customerOptional.get();

        // Step 2: Create a new Orders entity and map the data from the DTO.
        Orders newOrder = new Orders();
        newOrder.setCustomer(customer);
        newOrder.setTotalAmount(requestDTO.getTotal_amount());
        newOrder.setTotalQuantity(requestDTO.getTotal_quantity());

        // Map the address fields
        newOrder.setStreet(requestDTO.getStreet());
        newOrder.setCity(requestDTO.getCity());
        newOrder.setState(requestDTO.getState());
        newOrder.setPostalCode(requestDTO.getPostal_code());
        newOrder.setCountry(requestDTO.getCountry());
        newOrder.setLandmark(requestDTO.getLandmark());

        // Step 3: Set server-side values like the order date and initial status.
        newOrder.setOrderDate(LocalDateTime.now());
        newOrder.setStatus("Placed"); // Set a default status for new orders.

        cartRepository.deleteByCustomerCustomerId(customer.getCustomerId());

        // Step 4: Save the fully constructed order to the database.
        return orderRepository.save(newOrder);
    }

    public List<Order_Items> addItemsToOrder(Integer orderId, List<AddOrderItemRequestDTO> itemsDTO) {
        // Step 1: Find the parent order. If it doesn't exist, we can't add items.
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        List<Order_Items> itemsToSave = new ArrayList<>();
        for (AddOrderItemRequestDTO itemDto : itemsDTO) {
            // Step 2: For each item, find the corresponding product.
            Products product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + itemDto.getProductId()));

            // Step 3: Create a new OrderItems entity and populate it.
            Order_Items newOrderItem = new Order_Items();
            newOrderItem.setOrder(order); // Link to the parent order
            newOrderItem.setProduct(product); // Link to the product
            newOrderItem.setProductQuantity(itemDto.getProduct_quantity());
            newOrderItem.setProductPrice(itemDto.getProduct_price());
            itemsToSave.add(newOrderItem);
        }

        // Step 4: Save all the new items to the database in one operation.
        return orderItemRepository.saveAll(itemsToSave);
    }
}