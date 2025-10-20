package com.Freshmart.store.controller;

import com.Freshmart.store.dto.DashboardStatsDTO;
import com.Freshmart.store.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return dashboardService.getDashboardStats();
    }
}