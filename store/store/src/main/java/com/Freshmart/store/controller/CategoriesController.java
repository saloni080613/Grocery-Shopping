 package com.Freshmart.store.controller; // Corrected

import com.Freshmart.store.model.Categories;
import com.Freshmart.store.repository.CategoriesRepository;
import com.Freshmart.store.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoriesController {

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private CategoriesService categoriesService;

    @GetMapping
    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    @GetMapping("/name")
    public List<String> getCategoryNames() {
        return categoriesService.getCategoryNames();
    }
}