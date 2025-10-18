package com.Freshmart.store.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryDTO {

    private String orderId;
    private LocalDateTime order_date;
    private Double total_amount;
    private String status;
    private CustomerInfoDTO customer;
    private ShippingAddressDTO shipping_address;
    private List<OrderItemDetailDTO> items;

    // Getters and Setters
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public LocalDateTime getOrder_date() { return order_date; }
    public void setOrder_date(LocalDateTime order_date) { this.order_date = order_date; }
    public Double getTotal_amount() { return total_amount; }
    public void setTotal_amount(Double total_amount) { this.total_amount = total_amount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public CustomerInfoDTO getCustomer() { return customer; }
    public void setCustomer(CustomerInfoDTO customer) { this.customer = customer; }
    public ShippingAddressDTO getShipping_address() { return shipping_address; }
    public void setShipping_address(ShippingAddressDTO shipping_address) { this.shipping_address = shipping_address; }
    public List<OrderItemDetailDTO> getItems() { return items; }
    public void setItems(List<OrderItemDetailDTO> items) { this.items = items; }
}