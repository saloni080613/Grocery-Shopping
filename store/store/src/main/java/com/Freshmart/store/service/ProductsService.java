package com.Freshmart.store.service;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.dto.ProductRequest;
import com.Freshmart.store.dto.ProductResponseDTO;
import com.Freshmart.store.model.Categories;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.repository.CategoriesRepository;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository; // Required for the new logic

    /**
     * --- NEW HELPER METHOD ---
     * Finds a category by its name. If it doesn't exist,
     * it creates a new one and saves it.
     */
    private Categories findOrCreateCategory(String categoryName) {
        return categoriesRepository.findByCategoryName(categoryName)
                .orElseGet(() -> {
                    // Category not found, so create a new one
                    Categories newCategory = new Categories();
                    newCategory.setCategoryName(categoryName);
                    return categoriesRepository.save(newCategory);
                });
    }

    /**
     * --- UPDATED METHOD ---
     * Creates and saves a new product.
     * Now finds or creates the category based on its name.
     */
    public Products addProduct(ProductRequest productRequest) {

        // Step 1: Find or create the category
        Categories category = findOrCreateCategory(productRequest.getCategoryName());

        // Step 2: Create a new Products entity
        Products newProduct = new Products();
        newProduct.setName(productRequest.getName());
        newProduct.setPrice(productRequest.getPrice());
        newProduct.setStockQuantity(productRequest.getStockQuantity());
        newProduct.setImageUrl(productRequest.getImage()); // Using setImageUrl to match your existing code
        newProduct.setCategory(category);

        // Step 3: Save the new product
        return productsRepository.save(newProduct);
    }

    /**
     * --- UPDATED METHOD ---
     * Updates an existing product.
     * Now finds or creates the category based on its name.
     */
    public Products updateProduct(Integer productId, ProductRequest productRequest) {

        // Step 1: Find the existing product
        Products existingProduct = productsRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Error: Product not found with ID: " + productId));

        // Step 2: Find or create the category
        Categories category = findOrCreateCategory(productRequest.getCategoryName());

        // Step 3: Update all fields
        existingProduct.setName(productRequest.getName());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStockQuantity(productRequest.getStockQuantity());
        existingProduct.setImageUrl(productRequest.getImage());
        existingProduct.setCategory(category);

        // Step 4: Save and return the updated product
        return productsRepository.save(existingProduct);
    }

    /**
     * --- EXISTING METHOD ---
     * Deletes a product by its ID.
     */
    public void deleteProduct(Integer productId) {
        if (!productsRepository.existsById(productId)) {
            throw new RuntimeException("Error: Product not found with ID: " + productId);
        }
        productsRepository.deleteById(productId);
    }

    /**
     * --- YOUR EXISTING METHOD ---
     */
    public List<ProductResponseDTO> getProductsByIds(List<Integer> productIds) {
        List<Products> foundProducts = productsRepository.findByProductIdIn(productIds);
        return foundProducts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * --- YOUR EXISTING HELPER METHOD ---
     */
    private ProductResponseDTO convertToDto(Products product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getProductId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImage_url(product.getImageUrl());
        dto.setStock_quantity(product.getStockQuantity());

        if (product.getCategory() != null) {
            dto.setCategory(product.getCategory().getCategoryName());
        } else {
            dto.setCategory("Uncategorized");
        }
        return dto;
    }

    /**
     * --- YOUR EXISTING METHOD ---
     */
    public List<NewProduct> getProductsList() {
        return productsRepository.findAll().stream()
                .map(original -> {
                    NewProduct newProd = new NewProduct();
                    newProd.setId(original.getProductId());
                    newProd.setName(original.getName());
                    newProd.setPrice(original.getPrice());
                    newProd.setImage(original.getImageUrl());
                    newProd.setInStock(original.getStockQuantity() > 0);
                    if (original.getCategory() != null) {
                        newProd.setCategory(original.getCategory().getCategoryName());
                    }
                    return newProd;
                })
                .collect(Collectors.toList());
    }
}