package DAO;

import Model.Wishlist;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class WishlistDAO {

    private final Connection connection;

    // Constructor
    public WishlistDAO(Connection connection) {
        this.connection = connection;
    }

    // Add item to wishlist
    public void addToWishlist(Wishlist wishlist) throws SQLException {
        String sql = "INSERT INTO wishlist (customer_id, productId) VALUES (?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, wishlist.getcustomer_id());
            stmt.setInt(2, wishlist.getProductId());
            stmt.executeUpdate();
        }
    }

    // Get wishlist items by customer ID
    public List<Wishlist> getWishlistBycustomer_id(int customer_id) throws SQLException {
        List<Wishlist> list = new ArrayList<>();
        String sql = "SELECT * FROM wishlist WHERE customer_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer_id);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Wishlist item = new Wishlist(
                        rs.getInt("customer_id"),
                        rs.getInt("productId")
                );
                list.add(item);
            }
        }
        return list;
    }

    // Remove item from wishlist
    public void removeFromWishlist(int customer_id, int productId) throws SQLException {
        String sql = "DELETE FROM wishlist WHERE customer_id = ? AND productId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer_id);
            stmt.setInt(2, productId);
            stmt.executeUpdate();
        }
    }

    // Check if item exists in wishlist
    public boolean isInWishlist(int customer_id, int productId) throws SQLException {
        String sql = "SELECT COUNT(*) FROM wishlist WHERE customer_id = ? AND productId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, customer_id);
            stmt.setInt(2, productId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        }
        return false;
    }
}