package com.Freshmart.store.controller;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.dto.ProductRequest;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductsController {

    @Autowired
    private ProductsService productsService;

    /**
     * Endpoint to ADD a new product.
     * Takes product details from the request body.
     */
    @PostMapping
    public Products addProduct(@RequestBody ProductRequest productRequest) {
        return productsService.addProduct(productRequest);
    }

    /**
     * Endpoint to GET all products for the admin panel.
     * Uses the getProductsList method from your service.
     */
    @GetMapping
    public List<NewProduct> getAllProducts() {
        return productsService.getProductsList();
    }

    /**
     * Endpoint to UPDATE an existing product.
     * Takes the product ID from the URL and details from the request body.
     */
    @PutMapping("/{productId}")
    public Products updateProduct(@PathVariable Integer productId, @RequestBody ProductRequest productRequest) {
        // This method needs to be added to ProductsService
        return productsService.updateProduct(productId, productRequest); 
    }

    /**
     * Endpoint to DELETE a product.
     * Takes the product ID from the URL.
     */
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer productId) {
        // This method needs to be added to ProductsService
        productsService.deleteProduct(productId); 
        return ResponseEntity.ok(Map.of("message", "Product deleted successfully!"));
    }
}