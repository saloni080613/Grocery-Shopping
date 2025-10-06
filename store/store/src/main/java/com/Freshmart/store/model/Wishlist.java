package com.Freshmart.store.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Wishlist", uniqueConstraints = {
        // This ensures a customer-product pair can only be wishlisted once
        @UniqueConstraint(columnNames = {"customer_id", "product_id"})
})
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Corresponds to BIGINT in your table

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;

    // A no-argument constructor is required by JPA
    public Wishlist() {}
    public Wishlist(Customers customerId, Products productId) {
 this.customer = customerId;
 this.product = productId;
 }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Customers getCustomer() { return customer; }
    public void setCustomer(Customers customer) { this.customer = customer; }
    public Products getProduct() { return product; }
    public void setProduct(Products product) { this.product = product; }
}