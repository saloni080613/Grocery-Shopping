package DAO;

import Model.Orders;
import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrdersDAO {

    private final Connection connection;

    // Constructor
    public OrdersDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addOrder(Orders order) throws SQLException {
        String sql = "INSERT INTO orders (orderId, customer_id, orderDate, totalAmount, totalStockQuantity, status) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, order.getOrderId());
            stmt.setInt(2, order.getcustomer_id());
            stmt.setTimestamp(3, order.getOrderDate());
            stmt.setBigDecimal(4, order.getTotalAmount());
            stmt.setInt(5, order.getTotalStockQuantity());
            stmt.setString(6, order.getStatus());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Orders getOrderById(int orderId) throws SQLException {
        String sql = "SELECT * FROM orders WHERE orderId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, orderId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Orders(
                        rs.getInt("orderId"),
                        rs.getInt("customer_id"),
                        rs.getTimestamp("orderDate"),
                        rs.getBigDecimal("totalAmount"),
                        rs.getInt("totalStockQuantity"),
                        rs.getString("status")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Orders> getAllOrders() throws SQLException {
        List<Orders> list = new ArrayList<>();
        String sql = "SELECT * FROM orders";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Orders order = new Orders(
                        rs.getInt("orderId"),
                        rs.getInt("customer_id"),
                        rs.getTimestamp("orderDate"),
                        rs.getBigDecimal("totalAmount"),
                        rs.getInt("totalStockQuantity"),
                        rs.getString("status")
                );
                list.add(order);
            }
        }
        return list;
    }

    // Update
    public void updateOrder(Orders order) throws SQLException {
        String sql = "UPDATE orders SET customer_id = ?, orderDate = ?, totalAmount = ?, totalStockQuantity = ?, status = ? WHERE orderId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, order.getcustomer_id());
            stmt.setTimestamp(2, order.getOrderDate());
            stmt.setBigDecimal(3, order.getTotalAmount());
            stmt.setInt(4, order.getTotalStockQuantity());
            stmt.setString(5, order.getStatus());
            stmt.setInt(6, order.getOrderId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteOrder(int orderId) throws SQLException {
        String sql = "DELETE FROM orders WHERE orderId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, orderId);
            stmt.executeUpdate();
        }
    }
}