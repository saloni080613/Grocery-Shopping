package com.Freshmart.store.repository;

import com.Freshmart.store.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByProductIdIn(List<Integer> ids);
}


