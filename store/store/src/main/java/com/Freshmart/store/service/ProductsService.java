package com.Freshmart.store.service;

import com.Freshmart.store.dto.NewProduct;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class ProductsService {
    private final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
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
