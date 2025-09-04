package DAO;

import Model.Products;
import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductsDAO {

    private final Connection connection;

    // Constructor
    public ProductsDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addProduct(Products product) throws SQLException {
        String sql = "INSERT INTO products (productId, name, price, imageUrl, quantity, categoryId) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, product.getProductId());
            stmt.setString(2, product.getName());
            stmt.setBigDecimal(3, product.getPrice());
            stmt.setString(4, product.getImageUrl());
            stmt.setInt(5, product.getQuantity());
            stmt.setInt(6, product.getCategoryId());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Products getProductById(int productId) throws SQLException {
        String sql = "SELECT * FROM products WHERE productId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, productId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Products(
                        rs.getInt("productId"),
                        rs.getString("name"),
                        rs.getBigDecimal("price"),
                        rs.getString("imageUrl"),
                        rs.getInt("quantity"),
                        rs.getInt("categoryId")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Products> getAllProducts() throws SQLException {
        List<Products> list = new ArrayList<>();
        String sql = "SELECT * FROM products";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Products product = new Products(
                        rs.getInt("productId"),
                        rs.getString("name"),
                        rs.getBigDecimal("price"),
                        rs.getString("imageUrl"),
                        rs.getInt("quantity"),
                        rs.getInt("categoryId")
                );
                list.add(product);
            }
        }
        return list;
    }

    // Update
    public void updateProduct(Products product) throws SQLException {
        String sql = "UPDATE products SET name = ?, price = ?, imageUrl = ?, quantity = ?, categoryId = ? WHERE productId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, product.getName());
            stmt.setBigDecimal(2, product.getPrice());
            stmt.setString(3, product.getImageUrl());
            stmt.setInt(4, product.getQuantity());
            stmt.setInt(5, product.getCategoryId());
            stmt.setInt(6, product.getProductId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteProduct(int productId) throws SQLException {
        String sql = "DELETE FROM products WHERE productId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, productId);
            stmt.executeUpdate();
        }
    }
}