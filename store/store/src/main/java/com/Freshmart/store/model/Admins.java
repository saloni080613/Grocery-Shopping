package com.Freshmart.store.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Admins") // Matches your table name
public class Admins {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id") // Matches your 'admin_id' column
    private Integer adminId;

    @Column(name = "name", nullable = false, length = 100) // Matches your 'name' column
    private String name;

    @Column(name = "password", nullable = false, length = 60) // Matches your 'password' column
    private String password;

    @Column(name = "phone", nullable = false, unique = true) // Matches your 'phone' column (BIGINT -> Long)
    private Long phone;

    @Column(name = "email", nullable = false, unique = true) // Matches your 'email' column
    private String email;

    @Column(name = "status") // Matches your 'status' column
    private String status = "logged_out"; // Sets the default value in Java
    @Column(name = "reset_password_token", unique = true)
    private String resetPasswordToken;

    @Column(name = "reset_token_expiry_date")
    private LocalDateTime resetTokenExpiryDate;

    public LocalDateTime getResetTokenExpiryDate() {
        return resetTokenExpiryDate;
    }

    public void setResetTokenExpiryDate(LocalDateTime resetTokenExpiryDate) {
        this.resetTokenExpiryDate = resetTokenExpiryDate;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    // A no-argument constructor is required by JPA
    public Admins() {}

    // --- Generate Getters and Setters for all fields ---
    // (You would have these in your file)
    public Integer getAdminId() { return adminId; }
    public void setAdminId(Integer adminId) { this.adminId = adminId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Long getPhone() { return phone; }
    public void setPhone(Long phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}