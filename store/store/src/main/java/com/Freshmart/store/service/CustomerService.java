package com.Freshmart.store.service;

import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customers logoutCustomer(Integer customerId) {
        Optional<Customers> optionalCustomer = customerRepository.findById(customerId);

        if (optionalCustomer.isEmpty()) {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }

        Customers customer = optionalCustomer.get();
        customer.setStatus("logged_out");
        return customerRepository.save(customer);
    }
}
