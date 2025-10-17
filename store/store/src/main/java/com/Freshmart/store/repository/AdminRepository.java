package com.Freshmart.store.repository;
import com.Freshmart.store.model.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admins, Integer> {
    Optional<Admins> findByEmail(String email);
    // Checks if an admin exists with the given email
    boolean existsByEmail(String email);

    // Checks if an admin exists with the given phone number
    boolean existsByPhone(Long phone);
}