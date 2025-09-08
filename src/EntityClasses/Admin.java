package com.example.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long admin_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private Long phone;

    @Column(nullable = false, unique = true)
    private String email;

    // Getters and setters
}

    public Long getAdmin_id() {
        return admin_id;
    }
    public void setAdmin_id(Long admin_id) {
        this.admin_id = admin_id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Long getPhone() {
        return phone;
    }
    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

