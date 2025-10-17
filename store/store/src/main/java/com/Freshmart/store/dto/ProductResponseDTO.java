package com.Freshmart.store.dto;

public class ProductResponseDTO {

    private Integer id;
    private String name;
    private String category;
    private Double price;
    private String image_url;
    private Integer stock_quantity;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getImage_url() { return image_url; }
    public void setImage_url(String image_url) { this.image_url = image_url; }
    public Integer getStock_quantity() { return stock_quantity; }
    public void setStock_quantity(Integer stock_quantity) { this.stock_quantity = stock_quantity; }
}