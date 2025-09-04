package com.Freshmart.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Customers")
public class Customers {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

@Column(name = "name", nullable = false,length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;
}
