package com.Freshmart.store.repository;

import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    // --- THIS IS THE CORRECTED METHOD NAME ---
    // It now exactly matches the path: find by (Wishlist's)customer.(Customer's)customerId
    List<Wishlist> findByCustomerCustomerId(Integer customerId);

    // This method is correct and does not need to change
    boolean existsByCustomerAndProduct(Customers customer, Products product);
}