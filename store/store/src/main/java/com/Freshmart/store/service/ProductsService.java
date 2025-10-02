package com.Freshmart.store.service;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Scanner;
@Service
public class ProductsService {
    private ProductsRepository productsRepository;

    public List<NewProduct> getProductsList() {
        return productsRepository.findAll().stream()
                .map(original -> {

                    NewProduct newProd = new NewProduct();


                    newProd.setId(original.getProductId());
                    newProd.setName(original.getName());
                    newProd.setPrice(original.getPrice());
                    newProd.setImage(original.getImageUrl());


                    newProd.setInStock(original.getStockQuantity() > 0);


                    newProd.setCategory(original.getCategory().getCategoryName());

                    return newProd;
                })
                .toList();
    }
}
