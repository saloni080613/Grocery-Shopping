package com.Freshmart.store.dto;

public class RegisterRequest {

    private String username;
    private String email;
    private Long mobileNo;
    private String password;

    // --- Getters and Setters ---
    // (confirmPassword and its methods have been removed)

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Long getMobileNo() { return mobileNo; }
    public void setMobileNo(Long mobileNo) { this.mobileNo = mobileNo; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}