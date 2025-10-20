package com.Freshmart.store.repository;

import com.Freshmart.store.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Import this
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    // Your existing method (which is correct)
    List<Orders> findByCustomerCustomerId(Integer customerId);

    // --- ADD THIS NEW METHOD ---
    @Query("SELECT SUM(o.totalAmount) FROM Orders o")
    Double getTotalRevenue();

}