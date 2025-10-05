package com.Freshmart.store.dto;

public class WishlistItemResponse {
    private Integer id; // Product ID
    private String name;
    private String category;
    private double price;
    private boolean inStock; // Boolean as requested
    private String image;

    // --- Generate Getters and Setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}