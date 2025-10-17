
    package com.Freshmart.store.repository;

import com.Freshmart.store.model.Addresses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

    @Repository
    public interface AddressRepository extends JpaRepository<Addresses, Integer> {
        List<Addresses> findByCustomerCustomerId(Integer customerId);
        Optional<Addresses> findByCustomerCustomerIdAndAddressType(Integer customerId, String addressType);
    }

