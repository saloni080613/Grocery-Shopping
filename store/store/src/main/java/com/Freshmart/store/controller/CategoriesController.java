 package com.Freshmart.store.controller;

import com.Freshmart.store.model.Categories;
import com.Freshmart.store.repository.CategoriesRepository;
import com.Freshmart.store.service.CategoriesService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/add")
    public ResponseEntity<Categories> addCategory(@RequestBody Map<String, String> payload) {
        Categories newCategory = new Categories();
        newCategory.setCategoryName(payload.get("name"));
        Categories savedCategory = categoriesRepository.save(newCategory);
        return ResponseEntity.ok(savedCategory);
    }
}