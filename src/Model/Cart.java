package Model;


import java.math.BigDecimal;

public class Cart {

    private int cartId;
    private int customer_id;
    private int productId;
    private int quantity;
    private BigDecimal price;

    // Constructors
    public Cart() {}

    public Cart(int cartId, int customer_id, int productId, int quantity, BigDecimal price) {
        this.cartId = cartId;
        this.customer_id = customer_id;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and Setters
    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public int getcustomer_id() {
        return customer_id;
    }

    public void setcustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cartId +
                ", customer_id=" + customer_id +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
