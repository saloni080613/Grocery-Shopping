package com.Freshmart.store.repository;

import com.Freshmart.store.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {
}


