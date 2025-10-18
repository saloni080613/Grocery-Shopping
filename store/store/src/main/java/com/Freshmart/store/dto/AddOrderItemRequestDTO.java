package com.Freshmart.store.dto;

public class AddOrderItemRequestDTO {

    private Integer productId;
    private Integer product_quantity;
    private Double product_price;

    // Getters and Setters
    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }
    public Integer getProduct_quantity() { return product_quantity; }
    public void setProduct_quantity(Integer product_quantity) { this.product_quantity = product_quantity; }
    public Double getProduct_price() { return product_price; }
    public void setProduct_price(Double product_price) { this.product_price = product_price; }
}