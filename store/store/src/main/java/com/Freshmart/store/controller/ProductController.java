package com.Freshmart.store.controller; // Corrected

import com.Freshmart.store.model.Product; // Corrected
import com.Freshmart.store.repository.ProductRepository; // Corrected
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    // Add this new method inside the class
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}