package com.Freshmart.store.dto;

public class AddToCartRequest {
    private Integer customerId;
    private Integer productId; // CHANGED: from Long to Integer

    // --- Getters and Setters ---
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public Integer getProductId() { return productId; } // CHANGED
    public void setProductId(Integer productId) { this.productId = productId; } // CHANGED
}