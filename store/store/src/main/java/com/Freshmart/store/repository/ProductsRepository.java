package com.Freshmart.store.repository;

import com.Freshmart.store.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Integer> {
}


