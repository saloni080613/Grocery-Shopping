package DAO;

import Model.Categories;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoriesDAO {

    private final Connection connection;

    // Constructor
    public CategoriesDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addCategory(Categories category) throws SQLException {
        String sql = "INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, category.getCategoryId());
            stmt.setString(2, category.getCategoryName());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Categories getCategoryById(int categoryId) throws SQLException {
        String sql = "SELECT * FROM categories WHERE categoryId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, categoryId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Categories(
                        rs.getInt("categoryId"),
                        rs.getString("categoryName")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Categories> getAllCategories() throws SQLException {
        List<Categories> list = new ArrayList<>();
        String sql = "SELECT * FROM categories";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Categories category = new Categories(
                        rs.getInt("categoryId"),
                        rs.getString("categoryName")
                );
                list.add(category);
            }
        }
        return list;
    }

    // Update
    public void updateCategory(Categories category) throws SQLException {
        String sql = "UPDATE categories SET categoryName = ? WHERE categoryId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, category.getCategoryName());
            stmt.setInt(2, category.getCategoryId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteCategory(int categoryId) throws SQLException {
        String sql = "DELETE FROM categories WHERE categoryId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, categoryId);
            stmt.executeUpdate();
        }
    }
}