package Model;

public class Wishlist {

    private int customer_id;
    private int productId;

    // Constructors
    public Wishlist() {}

    public Wishlist(int customer_id, int productId) {
        this.customer_id = customer_id;
        this.productId = productId;
    }

    // Getters and Setters
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

    // Optional: toString method
    @Override
    public String toString() {
        return "Wishlist{" +
                "customer_id=" + customer_id +
                ", productId=" + productId +
                '}';
    }
}