package com.Freshmart.store.dto;

public class SaveAddressRequestDTO {

    private Integer customerId;
    private String type;
    private String street;
    private String city;
    private String state;
    private String postal_code;
    private String country;
    private String landmark;

    // Getters and Setters
    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPostalCode() { return postal_code; }
    public void setPostalCode(String postal_code) { this.postal_code = postal_code; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getLandmark() { return landmark; }
    public void setLandmark(String landmark) { this.landmark = landmark; }
}