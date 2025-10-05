package com.Freshmart.store.dto;

public class AddToWishlistRequest {
    private Integer customerId;
    private Integer productId;

    // Getters and Setters
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }
}