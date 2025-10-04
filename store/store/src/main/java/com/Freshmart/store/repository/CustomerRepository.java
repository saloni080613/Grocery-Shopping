package com.Freshmart.store.repository;

import com.Freshmart.store.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Integer> {

    // This method will automatically generate a query like:
    // "SELECT COUNT(*) > 0 FROM Customers WHERE email = ?"
    boolean existsByEmail(String email);

    // This method will automatically generate a query like:
    // "SELECT COUNT(*) > 0 FROM Customers WHERE phone = ?"
    boolean existsByPhone(Long phone);

}