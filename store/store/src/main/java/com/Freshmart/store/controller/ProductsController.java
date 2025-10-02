package com.Freshmart.store.controller;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/products")
public class ProductsController {
    @Autowired
   private ProductsService productsService;

    @GetMapping("/list")
   public List<NewProduct> GetAllProducts(){
       return productsService.getProductsList();
   }
}
