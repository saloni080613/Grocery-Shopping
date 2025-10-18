package com.Freshmart.store.repository;

import com.Freshmart.store.model.Cart;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByCustomerAndProduct(Customers customer, Products product);


    // --- THIS IS THE CORRECTED METHOD NAME ---
    // It now exactly matches the path: find by (Cart's)customer.(Customer's)customerId
    List<Cart> findByCustomerCustomerId(Integer customerId);

    @Transactional
    void deleteByCustomerCustomerId(Integer customerId);
}