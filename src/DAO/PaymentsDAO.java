package DAO;

import Model.Payments;
import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PaymentsDAO {

    private final Connection connection;

    // Constructor
    public PaymentsDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addPayment(Payments payment) throws SQLException {
        String sql = "INSERT INTO payments (paymentId, orderId, paymentMethod, totalAmount) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, payment.getPaymentId());
            stmt.setInt(2, payment.getOrderId());
            stmt.setString(3, payment.getPaymentMethod());
            stmt.setBigDecimal(4, payment.getTotalAmount());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Payments getPaymentById(int paymentId) throws SQLException {
        String sql = "SELECT * FROM payments WHERE paymentId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, paymentId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Payments(
                        rs.getInt("paymentId"),
                        rs.getInt("orderId"),
                        rs.getString("paymentMethod"),
                        rs.getBigDecimal("totalAmount")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Payments> getAllPayments() throws SQLException {
        List<Payments> list = new ArrayList<>();
        String sql = "SELECT * FROM payments";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Payments payment = new Payments(
                        rs.getInt("paymentId"),
                        rs.getInt("orderId"),
                        rs.getString("paymentMethod"),
                        rs.getBigDecimal("totalAmount")
                );
                list.add(payment);
            }
        }
        return list;
    }

    // Update
    public void updatePayment(Payments payment) throws SQLException {
        String sql = "UPDATE payments SET orderId = ?, paymentMethod = ?, totalAmount = ? WHERE paymentId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, payment.getOrderId());
            stmt.setString(2, payment.getPaymentMethod());
            stmt.setBigDecimal(3, payment.getTotalAmount());
            stmt.setInt(4, payment.getPaymentId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deletePayment(int paymentId) throws SQLException {
        String sql = "DELETE FROM payments WHERE paymentId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, paymentId);
            stmt.executeUpdate();
        }
    }
}