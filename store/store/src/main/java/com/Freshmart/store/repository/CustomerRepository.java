package com.Freshmart.store.repository;
import com.Freshmart.store.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Integer> {
    boolean existsByEmail(String email);
    boolean existsByPhone(Long phone);
    Optional<Customers> findByEmail(String email); // This method is needed for login
}