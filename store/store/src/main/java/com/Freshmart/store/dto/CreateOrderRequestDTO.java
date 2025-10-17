package com.Freshmart.store.dto;

public class CreateOrderRequestDTO {

    private Integer customerId;
    private Double total_amount;
    private Integer total_quantity;
    private String street;
    private String city;
    private String state;
    private String postal_code;
    private String country;
    private String landmark;

    // Getters and Setters
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public Double getTotal_amount() { return total_amount; }
    public void setTotal_amount(Double total_amount) { this.total_amount = total_amount; }
    public Integer getTotal_quantity() { return total_quantity; }
    public void setTotal_quantity(Integer total_quantity) { this.total_quantity = total_quantity; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPostal_code() { return postal_code; }
    public void setPostal_code(String postal_code) { this.postal_code = postal_code; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getLandmark() { return landmark; }
    public void setLandmark(String landmark) { this.landmark = landmark; }
}
