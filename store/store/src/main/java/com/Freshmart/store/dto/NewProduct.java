package com.Freshmart.store.dto;
import lombok.Getter;

@Getter // Lombok will generate all getter methods for every field
public class NewProduct {

    private int id;
    private String name;
    private double price;
    private String image;
    private boolean inStock;
    private String category;

    // You would still need to write constructors and setters manually
    public NewProduct() {
    }

    public NewProduct(int id, String name, double price, String image, boolean inStock, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.inStock = inStock;
        this.category = category;
    }

    // Setters would still be here
    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(double price) { this.price = price; }
    public void setImage(String image) { this.image = image; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
    public void setCategory(String category) { this.category = category; }
}