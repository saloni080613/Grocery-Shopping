package Model;




public class Customers {

    private int customer_id;
    private String username;
    private String email;
    private long phone;
    private int address_id;

    // Constructors
    public Customers() {}

    public Customers(int customer_id, String username, String email, long phone, int address_id) {
        this.customer_id = customer_id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address_id = address_id;
    }

    // Getters and Setters
    public int getcustomer_id() {
        return customer_id;
    }

    public void setcustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public int getaddress_id() {
        return address_id;
    }

    public void setaddress_id(int address_id) {
        this.address_id = address_id;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Customer{" +
                "customer_id=" + customer_id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", address_id=" + address_id +
                '}';
    }
}