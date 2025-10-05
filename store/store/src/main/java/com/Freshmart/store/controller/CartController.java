package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddToCartRequest;
import com.Freshmart.store.dto.CartItemResponse;
import com.Freshmart.store.model.Cart;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.repository.CartRepository;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private CartRepository cartRepository;

    // The /add endpoint is correct and does not need changes
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        Optional<Customers> customerOpt = customerRepository.findById(request.getCustomerId());
        Optional<Products> productOpt = productsRepository.findById(request.getProductId());

        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Customer not found!");
        }
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Product not found!");
        }

        Customers customer = customerOpt.get();
        Products product = productOpt.get();

        Optional<Cart> existingCartItemOpt = cartRepository.findByCustomerAndProduct(customer, product);

        if (existingCartItemOpt.isPresent()) {
            Cart existingCartItem = existingCartItemOpt.get();
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
            cartRepository.save(existingCartItem);
        } else {
            Cart newCartItem = new Cart();
            newCartItem.setCustomer(customer);
            newCartItem.setProduct(product);
            newCartItem.setQuantity(1);
            cartRepository.save(newCartItem);
        }

        return ResponseEntity.ok("Product added to cart successfully!");
    }

    // ... (imports and other methods in the class remain the same)



        // ... (your Autowired repositories and the /add endpoint are unchanged)

        @GetMapping("/{customerId}")
        public ResponseEntity<List<CartItemResponse>> getCartItems(@PathVariable Integer customerId) {
            if (!customerRepository.existsById(customerId)) {
                return ResponseEntity.badRequest().body(null);
            }

            // --- THIS IS THE CORRECTED METHOD CALL ---
            List<Cart> cartItems = cartRepository.findByCustomerCustomerId(customerId);

            List<CartItemResponse> responseList = new ArrayList<>();

            for (Cart cartItem : cartItems) {
                CartItemResponse responseItem = new CartItemResponse();
                Products product = cartItem.getProduct();

                responseItem.setId(product.getProductId());
                responseItem.setName(product.getName());
                responseItem.setPrice(product.getPrice());
                responseItem.setStockQuantity(product.getStockQuantity());
                responseItem.setImage(product.getImageUrl());

                if (product.getCategory() != null) {
                    responseItem.setCategory(product.getCategory().getCategoryName());
                }

                responseItem.setQuantity(cartItem.getQuantity());

                responseList.add(responseItem);
            }

            return ResponseEntity.ok(responseList);
        }
    }