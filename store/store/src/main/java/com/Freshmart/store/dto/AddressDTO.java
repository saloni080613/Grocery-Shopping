package com.Freshmart.store.dto;

public class AddressDTO {

        private String type;
        private String street;
        private String city;
        private String state;
        private String postal_code;
        private String country;
        private String landmark;

        // Getters and Setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
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

