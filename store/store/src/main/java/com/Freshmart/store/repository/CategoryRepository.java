package com.Freshmart.store.repository; // Corrected

import com.Freshmart.store.model.Category; // Corrected
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}