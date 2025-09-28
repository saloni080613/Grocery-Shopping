package com.Freshmart.store.repository; // Corrected

import com.Freshmart.store.model.Product; // Corrected
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}