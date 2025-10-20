package com.Freshmart.store.service;

import com.Freshmart.store.dto.DashboardStatsDTO;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.OrdersRepository;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ProductsRepository productsRepository;

    public DashboardStatsDTO getDashboardStats() {
        // Use the .count() method from JpaRepository to get totals
        long totalCustomers = customerRepository.count();
        long totalOrders = ordersRepository.count();
        long totalProducts = productsRepository.count();

        // Call our new method to get revenue
        Double revenue = ordersRepository.getTotalRevenue();

        // Handle the case where there are no orders (revenue would be null)
        double totalRevenue = (revenue == null) ? 0.0 : revenue;

        // Put all stats into the DTO
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotalCustomers(totalCustomers);
        stats.setTotalOrders(totalOrders);
        stats.setTotalProducts(totalProducts);
        stats.setTotalRevenue(totalRevenue);

        return stats;
    }
}