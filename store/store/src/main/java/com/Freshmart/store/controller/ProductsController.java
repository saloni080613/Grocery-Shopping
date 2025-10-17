package com.Freshmart.store.controller;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.dto.ProductResponseDTO;
import com.Freshmart.store.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
   private ProductsService productsService;

    @GetMapping("/list")
   public List<NewProduct> GetAllProducts(){
       return productsService.getProductsList();
   }

    @PostMapping("/details")
    public ResponseEntity<List<ProductResponseDTO>> getProductDetails(@RequestBody List<Integer> productIds) {
        List<ProductResponseDTO> products = productsService.getProductsByIds(productIds);
        return ResponseEntity.ok(products);
    }
}
