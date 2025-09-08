package DAO;

import Model.Admins;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminsDAO {

    private final Connection connection;

    // Constructor to initialize with DB connection
    public AdminsDAO(Connection connection) {
        this.connection = connection;
    }

    // Create (Insert)
    public void addAdmin(Admins admin) throws SQLException {
        String sql = "INSERT INTO admins (adminId, name, phone, email) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, admin.getAdminId());
            stmt.setString(2, admin.getName());
            stmt.setLong(3, admin.getPhone());
            stmt.setString(4, admin.getEmail());
            stmt.executeUpdate();
        }
    }

    // Read (Select by ID)
    public Admins getAdminById(int id) throws SQLException {
        String sql = "SELECT * FROM admins WHERE adminId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Admins(
                        rs.getInt("adminId"),
                        rs.getString("name"),
                        rs.getLong("phone"),
                        rs.getString("email")
                );
            }
        }
        return null;
    }

    // Read All
    public List<Admins> getAllAdmins() throws SQLException {
        List<Admins> list = new ArrayList<>();
        String sql = "SELECT * FROM admins";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Admins admin = new Admins(
                        rs.getInt("adminId"),
                        rs.getString("name"),
                        rs.getLong("phone"),
                        rs.getString("email")
                );
                list.add(admin);
            }
        }
        return list;
    }

    // Update
    public void updateAdmin(Admins admin) throws SQLException {
        String sql = "UPDATE admins SET name = ?, phone = ?, email = ? WHERE adminId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, admin.getName());
            stmt.setLong(2, admin.getPhone());
            stmt.setString(3, admin.getEmail());
            stmt.setInt(4, admin.getAdminId());
            stmt.executeUpdate();
        }
    }

    // Delete
    public void deleteAdmin(int id) throws SQLException {
        String sql = "DELETE FROM admins WHERE adminId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}