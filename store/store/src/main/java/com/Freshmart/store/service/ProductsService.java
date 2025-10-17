package com.Freshmart.store.service;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.dto.ProductResponseDTO;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;




    public List<ProductResponseDTO> getProductsByIds(List<Integer> productIds) {
        // Step 1: Fetch all product entities from the database that match the given IDs.
        List<Products> foundProducts = productsRepository.findByProductIdIn(productIds);

        // Step 2: Convert the list of entities to a list of DTOs for the API response.
        return foundProducts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Helper method to convert a single Products entity into a ProductResponseDTO.
     */
    private ProductResponseDTO convertToDto(Products product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getProductId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImage_url(product.getImageUrl());
        dto.setStock_quantity(product.getStockQuantity());

        // Safely get the category name, providing a default if the category is not set.
        if (product.getCategory() != null) {
            dto.setCategory(product.getCategory().getCategoryName());
        } else {
            dto.setCategory("Uncategorized");
        }

        return dto;
    }
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
