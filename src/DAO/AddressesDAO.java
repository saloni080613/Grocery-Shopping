package DAO;


import Model.Addresses;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

    public class AddressesDAO {

        private final Connection connection;

        // Constructor to initialize the DAO with a DB connection
        public AddressesDAO(Connection connection) {
            this.connection = connection;
        }

        // Create (Insert)
        public void addAddress(Addresses address) throws SQLException {
            String sql = "INSERT INTO addresses (address_id, streetAddress, city, state, postalCode) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setInt(1, address.getaddress_id());
                stmt.setString(2, address.getStreetAddress());
                stmt.setString(3, address.getCity());
                stmt.setString(4, address.getState());
                stmt.setString(5, address.getPostalCode());
                stmt.executeUpdate();
            }
        }

        // Read (Select by ID)
        public Addresses getAddressById(int id) throws SQLException {
            String sql = "SELECT * FROM addresses WHERE address_id = ?";
            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setInt(1, id);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    return new Addresses(
                            rs.getInt("address_id"),
                            rs.getString("streetAddress"),
                            rs.getString("city"),
                            rs.getString("state"),
                            rs.getString("postalCode")
                    );
                }
            }
            return null;
        }

        // Read All
        public List<Addresses> getAllAddresses() throws SQLException {
            List<Addresses> list = new ArrayList<>();
            String sql = "SELECT * FROM addresses";
            try (Statement stmt = connection.createStatement()) {
                ResultSet rs = stmt.executeQuery(sql);
                while (rs.next()) {
                    Addresses address = new Addresses(
                            rs.getInt("address_id"),
                            rs.getString("streetAddress"),
                            rs.getString("city"),
                            rs.getString("state"),
                            rs.getString("postalCode")
                    );
                    list.add(address);
                }
            }
            return list;
        }

        // Update
        public void updateAddress(Addresses address) throws SQLException {
            String sql = "UPDATE addresses SET streetAddress = ?, city = ?, state = ?, postalCode = ? WHERE address_id = ?";
            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setString(1, address.getStreetAddress());
                stmt.setString(2, address.getCity());
                stmt.setString(3, address.getState());
                stmt.setString(4, address.getPostalCode());
                stmt.setInt(5, address.getaddress_id());
                stmt.executeUpdate();
            }
        }

        // Delete
        public void deleteAddress(int id) throws SQLException {
            String sql = "DELETE FROM addresses WHERE address_id = ?";
            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setInt(1, id);
                stmt.executeUpdate();
            }
        }
    }

