package com.Freshmart.store.service;

import com.Freshmart.store.dto.WishlistItemResponse;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.model.Wishlist;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.ProductsRepository;
import com.Freshmart.store.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WishlistService {

    @Autowired private CustomerRepository customerRepository;
    @Autowired private ProductsRepository productsRepository;
    @Autowired private WishlistRepository wishlistRepository;

    // This method is correct and does not need to change
    public void addProductToWishlist(Integer customerId, Integer productId) {
        Customers customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found!"));
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        if (wishlistRepository.existsByCustomerAndProduct(customer, product)) {
            return;
        }

        Wishlist newWishlistItem = new Wishlist();
        newWishlistItem.setCustomer(customer);
        newWishlistItem.setProduct(product);
        wishlistRepository.save(newWishlistItem);
    }

    public List<WishlistItemResponse> getWishlistItemsForCustomer(Integer customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new RuntimeException("Customer not found!");
        }

        // --- THIS IS THE CORRECTED METHOD CALL ---
        List<Wishlist> wishlistItems = wishlistRepository.findByCustomerCustomerId(customerId);

        List<WishlistItemResponse> responseList = new ArrayList<>();

        for (Wishlist wishlistItem : wishlistItems) {
            WishlistItemResponse responseItem = new WishlistItemResponse();
            Products product = wishlistItem.getProduct();

            responseItem.setId(product.getProductId());
            responseItem.setName(product.getName());
            responseItem.setPrice(product.getPrice());
            responseItem.setImage(product.getImageUrl());
            responseItem.setInStock(product.getStockQuantity() > 0);

            if (product.getCategory() != null) {
                responseItem.setCategory(product.getCategory().getCategoryName());
            }

            responseList.add(responseItem);
        }
        return responseList;
    }
}