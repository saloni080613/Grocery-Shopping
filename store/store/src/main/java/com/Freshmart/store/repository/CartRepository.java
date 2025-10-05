package com.Freshmart.store.repository;

import com.Freshmart.store.model.Cart;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products; // CHANGED: from Product to Products
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // Custom method to find a cart entry by the customer and product
    Optional<Cart> findByCustomerAndProduct(Customers customer, Products product); // CHANGED
}