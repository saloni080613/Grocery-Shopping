package com.Freshmart.store.repository;

import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByCustomerAndProduct(Customers customer, Products product);
    // --- THIS IS THE CORRECTED METHOD NAME ---
    // It now exactly matches the path: find by (Wishlist's)customer.(Customer's)customerId
    List<Wishlist> findByCustomerCustomerId(Integer customerId);
    @Query("SELECT w.product.id FROM Wishlist w WHERE w.customer.id = :customerId")
 List<Long> findProductIdsByCustomerId(@Param("customerId") Long customerId);
    // This method is correct and does not need to change
    boolean existsByCustomerAndProduct(Customers customer, Products product);
}