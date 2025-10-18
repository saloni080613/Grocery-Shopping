package com.Freshmart.store.repository;

import com.Freshmart.store.model.Order_Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<Order_Items, Long> {
}