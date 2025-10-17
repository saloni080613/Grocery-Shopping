package com.Freshmart.store.dto;
import java.util.List;

public class CustomerResponseDTO {

        private String username;
        private String email;
        private String phone;
        private List<AddressDTO> addresses;

        // Getters and Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public List<AddressDTO> getAddresses() { return addresses; }
        public void setAddresses(List<AddressDTO> addresses) { this.addresses = addresses; }
    }

