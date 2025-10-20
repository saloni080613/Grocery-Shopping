package com.Freshmart.store.repository;

import com.Freshmart.store.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // Make sure to import Optional

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

    // --- NEW METHOD ---
    // This allows the service to check if a category already exists.
    Optional<Categories> findByCategoryName(String categoryName);
}