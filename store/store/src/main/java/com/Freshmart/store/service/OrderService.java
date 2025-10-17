package com.Freshmart.store.service;

import com.Freshmart.store.dto.CreateOrderRequestDTO;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Orders;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository; // To find the customer

    /**
     * Creates and saves a new order based on the provided request data.
     * @param requestDTO The DTO containing the order details.
     * @return The saved Order entity, or null if the customer was not found.
     */
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

        // Step 4: Save the fully constructed order to the database.
        return orderRepository.save(newOrder);
    }
}