
package com.Freshmart.store.repository;

import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByCustomerAndProduct(Customers customer, Products product);
    @Query("SELECT w.product.id FROM Wishlist w WHERE w.customer.id = :customerId")
    List<Long> findProductIdsByCustomerId(@Param("customerId") Long customerId);


}

