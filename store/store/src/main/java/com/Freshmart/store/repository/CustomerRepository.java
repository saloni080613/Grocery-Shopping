package com.Freshmart.store.repository;

import com.Freshmart.store.model.Customers; // Importing your 'Customers' class
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// We tell JpaRepository to work with your 'Customers' class and its 'Integer' ID
public interface CustomerRepository extends JpaRepository<Customers, Integer> {

}