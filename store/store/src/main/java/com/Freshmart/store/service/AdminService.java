package com.Freshmart.store.service;

import com.Freshmart.store.dto.AdminDetailsDTO;
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

    public AdminDetailsDTO getAdminDetails(Integer adminId) {
        // Step 1: Find the admin entity by ID. Throws an exception if not found.
        Admins admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + adminId));

        // Step 2: Convert the entity to our specific DTO.
        return convertToAdminDetailsDTO(admin);
    }

    private AdminDetailsDTO convertToAdminDetailsDTO(Admins admin) {
        AdminDetailsDTO dto = new AdminDetailsDTO();
        dto.setName(admin.getName());
        dto.setEmail(admin.getEmail());
        dto.setPhone_no(admin.getPhone());
        return dto;
    }
}