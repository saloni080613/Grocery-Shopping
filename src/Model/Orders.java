package Model;
import java.sql.Timestamp;


import java.math.BigDecimal;
import java.sql.Timestamp;

public class Orders {

    private int orderId;
    private int customer_id;
    private Timestamp orderDate;
    private BigDecimal totalAmount;
    private int totalStockQuantity;
    private String status;

    // Constructors
    public Orders() {}

    public Orders(int orderId, int customer_id, Timestamp orderDate, BigDecimal totalAmount, int totalStockQuantity, String status) {
        this.orderId = orderId;
        this.customer_id = customer_id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.totalStockQuantity = totalStockQuantity;
        this.status = status;
    }

    // Getters and Setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getcustomer_id() {
        return customer_id;
    }

    public void setcustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getTotalStockQuantity() {
        return totalStockQuantity;
    }

    public void setTotalStockQuantity(int totalStockQuantity) {
        this.totalStockQuantity = totalStockQuantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", customer_id=" + customer_id +
                ", orderDate=" + orderDate +
                ", totalAmount=" + totalAmount +
                ", totalStockQuantity=" + totalStockQuantity +
                ", status='" + status + '\'' +
                '}';
    }
}