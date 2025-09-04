package DAO;

import Model.Customers;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomersDAO {

    private final Connection connection;

    // Constructor
    public CustomersDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addCustomer(Customers customer) throws SQLException {
        String sql = "INSERT INTO customers (customer_id, username, email, phone, address_id) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer.getcustomer_id());
            stmt.setString(2, customer.getUsername());
            stmt.setString(3, customer.getEmail());
            stmt.setLong(4, customer.getPhone());
            stmt.setInt(5, customer.getaddress_id());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Customers getCustomerById(int customer_id) throws SQLException {
        String sql = "SELECT * FROM customers WHERE customer_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer_id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Customers(
                        rs.getInt("customer_id"),
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getLong("phone"),
                        rs.getInt("address_id")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Customers> getAllCustomers() throws SQLException {
        List<Customers> list = new ArrayList<>();
        String sql = "SELECT * FROM customers";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Customers customer = new Customers(
                        rs.getInt("customer_id"),
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getLong("phone"),
                        rs.getInt("address_id")
                );
                list.add(customer);
            }
        }
        return list;
    }

    // Update
    public void updateCustomer(Customers customer) throws SQLException {
        String sql = "UPDATE customers SET username = ?, email = ?, phone = ?, address_id = ? WHERE customer_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, customer.getUsername());
            stmt.setString(2, customer.getEmail());
            stmt.setLong(3, customer.getPhone());
            stmt.setInt(4, customer.getaddress_id());
            stmt.setInt(5, customer.getcustomer_id());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteCustomer(int customer_id) throws SQLException {
        String sql = "DELETE FROM customers WHERE customer_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer_id);
            stmt.executeUpdate();
        }
    }
}