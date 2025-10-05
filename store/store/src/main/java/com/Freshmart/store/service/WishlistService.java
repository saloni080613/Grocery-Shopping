package com.Freshmart.store.service;


import com.Freshmart.store.dto.WishlistRequest;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.model.Wishlist;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.ProductsRepository;
import com.Freshmart.store.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class WishlistService {
    private final CustomerRepository customerRepository;
    private final ProductsRepository productRepository;
    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           CustomerRepository customerRepository,
                           ProductsRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public String toggleWishlist(WishlistRequest request) {

        Customers customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Products product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Optional<Wishlist> existing = wishlistRepository.findByCustomerAndProduct(customer, product);

        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            return "Removed from wishlist";
        } else {
            Wishlist newWishlist = new Wishlist(customer, product);
            wishlistRepository.save(newWishlist);
            return "Added to wishlist";
        }
    }
}
