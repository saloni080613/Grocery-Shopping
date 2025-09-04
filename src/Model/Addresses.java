package Model;


public class Addresses {

    private int address_id;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;

    // Constructors
    public Addresses() {}

    public Addresses(int address_id, String streetAddress, String city, String state, String postalCode) {
        this.address_id = address_id;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

    // Getters and Setters
    public int getaddress_id() {
        return address_id;
    }

    public void setaddress_id(int address_id) {
        this.address_id = address_id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Addresses{" +
                "address_id=" + address_id +
                ", streetAddress='" + streetAddress + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", postalCode='" + postalCode + '\'' +
                '}';
    }
}