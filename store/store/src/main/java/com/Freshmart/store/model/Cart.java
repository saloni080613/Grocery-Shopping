package com.Freshmart.store.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Cart", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"customer_id", "product_id"})
})
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product; // CHANGED: from Product to Products

    @Column(nullable = false)
    private int quantity;

    public Cart() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Customers getCustomer() { return customer; }
    public void setCustomer(Customers customer) { this.customer = customer; }
    public Products getProduct() { return product; } // CHANGED
    public void setProduct(Products product) { this.product = product; } // CHANGED
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}