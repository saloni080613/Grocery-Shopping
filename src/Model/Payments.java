package Model;

import java.math.BigDecimal;

public class Payments {

    private int paymentId;
    private int orderId;
    private String paymentMethod;
    private BigDecimal totalAmount;

    // Constructors
    public Payments() {}

    public Payments(int paymentId, int orderId, String paymentMethod, BigDecimal totalAmount) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.paymentMethod = paymentMethod;
        this.totalAmount = totalAmount;
    }

    // Getters and Setters
    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Payments{" +
                "paymentId=" + paymentId +
                ", orderId=" + orderId +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", totalAmount=" + totalAmount +
                '}';
    }
}
