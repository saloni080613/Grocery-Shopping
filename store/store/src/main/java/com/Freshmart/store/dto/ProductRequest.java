package com.Freshmart.store.dto;

public class ProductRequest {
    private String name;
    private double price;
    private Integer stockQuantity;
    private String image;

    // UPDATED: from Integer categoryId
    private String categoryName;

    // --- Getters and Setters ---
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    // UPDATED: Getters and setters for categoryName
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}