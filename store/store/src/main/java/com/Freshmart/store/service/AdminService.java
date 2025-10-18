package com.Freshmart.store.service;

import com.Freshmart.store.model.Admins;
import com.Freshmart.store.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admins logoutAdmin(Integer adminId) {
        // Step 1: Find the admin by ID.
        Admins admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + adminId));

        // Step 2: Update the status.
        admin.setStatus("logged_out");

        // Step 3: Save the updated admin and return it.
        return adminRepository.save(admin);
    }
}