package com.Freshmart.store.service;

import com.Freshmart.store.dto.*;
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
import java.util.stream.Collectors;

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
        newOrder.setStatus("Pending"); // Set a default status for new orders.

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

    public List<OrderHistoryDTO> getOrderHistoryForCustomer(Integer customerId) {
        // Step 1: Fetch all orders for the given customer.
        List<Orders> customerOrders = orderRepository.findByCustomerCustomerId(customerId);

        // Step 2: Map each Order entity to the complex OrderHistoryDTO.
        return customerOrders.stream()
                .map(this::mapOrderToHistoryDTO)
                .collect(Collectors.toList());
    }

    // --- Helper method to orchestrate the mapping for a single order ---
    private OrderHistoryDTO mapOrderToHistoryDTO(Orders order) {
        OrderHistoryDTO historyDTO = new OrderHistoryDTO();

        historyDTO.setOrderId("ORD-" + order.getOrderId());
        historyDTO.setOrder_date(order.getOrderDate());
        historyDTO.setTotal_amount(order.getTotalAmount());
        historyDTO.setStatus(order.getStatus());

        // Map the nested objects using other helpers
        historyDTO.setCustomer(mapCustomerToInfoDTO(order.getCustomer()));
        historyDTO.setShipping_address(mapOrderToShippingAddressDTO(order));

        // Fetch and map the list of items for this order
        List<Order_Items> items = orderItemRepository.findByOrderOrderId(order.getOrderId());
        historyDTO.setItems(items.stream().map(this::mapOrderItemToDetailDTO).collect(Collectors.toList()));

        return historyDTO;
    }

    // --- Helper to map customer details ---
    private CustomerInfoDTO mapCustomerToInfoDTO(Customers customer) {
        CustomerInfoDTO customerDTO = new CustomerInfoDTO();
        customerDTO.setUsername(customer.getName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setPhone_no(String.valueOf(customer.getPhone()));
        return customerDTO;
    }

    // --- Helper to map shipping address from the order ---
    private ShippingAddressDTO mapOrderToShippingAddressDTO(Orders order) {
        ShippingAddressDTO addressDTO = new ShippingAddressDTO();
        addressDTO.setStreet(order.getStreet());
        addressDTO.setCity(order.getCity());
        addressDTO.setState(order.getState());
        addressDTO.setPostal_code(order.getPostalCode());
        addressDTO.setCountry(order.getCountry());
        return addressDTO;
    }

    // --- Helper to map a single order item ---
    private OrderItemDetailDTO mapOrderItemToDetailDTO(Order_Items item) {
        OrderItemDetailDTO itemDTO = new OrderItemDetailDTO();
        Products product = item.getProduct(); // Get the associated product

        itemDTO.setProduct_id(product.getProductId());
        itemDTO.setProduct_name(product.getName());
        itemDTO.setQuantity(item.getProductQuantity());
        itemDTO.setPrice(item.getProductPrice()); // Price at the time of purchase
        itemDTO.setImage_url(product.getImageUrl());

        if (product.getCategory() != null) {
            itemDTO.setCategory(product.getCategory().getCategoryName());
        } else {
            itemDTO.setCategory("Uncategorized");
        }

        return itemDTO;
    }

    public List<OrderHistoryDTO> getAllOrderHistory() {
        // Step 1: Fetch ALL orders from the database.
        List<Orders> allOrders = orderRepository.findAll();

        // Step 2: Use the exact same mapping logic as before.
        return allOrders.stream()
                .map(this::mapOrderToHistoryDTO)
                .collect(Collectors.toList());
    }


}