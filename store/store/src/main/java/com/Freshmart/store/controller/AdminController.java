package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AdminDetailsDTO;
import com.Freshmart.store.model.Admins;
import com.Freshmart.store.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/logout/{adminId}")
    public ResponseEntity<?> logoutAdmin(@PathVariable Integer adminId) {
        try {
            Admins updatedAdmin = adminService.logoutAdmin(adminId);
            return ResponseEntity.ok(updatedAdmin);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{adminId}")
    public ResponseEntity<?> getAdminDetailsById(@PathVariable Integer adminId) {
        try {
            AdminDetailsDTO adminDetails = adminService.getAdminDetails(adminId);
            return ResponseEntity.ok(adminDetails);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
