package DAO;

import Model.Cart;
import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CartDAO {

    private final Connection connection;

    // Constructor
    public CartDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addCartItem(Cart cart) throws SQLException {
        String sql = "INSERT INTO cart (cartId, customer_id, productId, quantity, price) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, cart.getCartId());
            stmt.setInt(2, cart.getcustomer_id());
            stmt.setInt(3, cart.getProductId());
            stmt.setInt(4, cart.getQuantity());
            stmt.setBigDecimal(5, cart.getPrice());
            stmt.executeUpdate();
        }
    }

    // Read (Select by cartId)
    public Cart getCartItemById(int cartId) throws SQLException {
        String sql = "SELECT * FROM cart WHERE cartId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, cartId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Cart(
                        rs.getInt("cartId"),
                        rs.getInt("customer_id"),
                        rs.getInt("productId"),
                        rs.getInt("quantity"),
                        rs.getBigDecimal("price")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Cart> getAllCartItems() throws SQLException {
        List<Cart> list = new ArrayList<>();
        String sql = "SELECT * FROM cart";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Cart cart = new Cart(
                        rs.getInt("cartId"),
                        rs.getInt("customer_id"),
                        rs.getInt("productId"),
                        rs.getInt("quantity"),
                        rs.getBigDecimal("price")
                );
                list.add(cart);
            }
        }
        return list;
    }

    // Update
    public void updateCartItem(Cart cart) throws SQLException {
        String sql = "UPDATE cart SET customer_id = ?, productId = ?, quantity = ?, price = ? WHERE cartId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, cart.getcustomer_id());
            stmt.setInt(2, cart.getProductId());
            stmt.setInt(3, cart.getQuantity());
            stmt.setBigDecimal(4, cart.getPrice());
            stmt.setInt(5, cart.getCartId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteCartItem(int cartId) throws SQLException {
        String sql = "DELETE FROM cart WHERE cartId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, cartId);
            stmt.executeUpdate();
        }
    }
}