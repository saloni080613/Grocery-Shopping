import DAO.CustomersDAO;
import Model.Customers;
//import DBConnection; // Assuming DBConnection is in a package named Utility

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        try (Connection connection = DBConnection.getConnection()) {
            CustomersDAO dao = new CustomersDAO(connection);
            List<Customers> customers = dao.getAllCustomers();

            for (Customers customer : customers) {
                System.out.println(customer);
            }

        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
