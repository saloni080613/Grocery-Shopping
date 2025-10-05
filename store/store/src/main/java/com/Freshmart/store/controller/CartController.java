package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddToCartRequest;
import com.Freshmart.store.dto.UpdateCartRequest;
import com.Freshmart.store.dto.CartItemResponse;
import com.Freshmart.store.model.Cart;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products;
import com.Freshmart.store.repository.CartRepository;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/update")
    public ResponseEntity<?> updateCartQuantity(@RequestBody UpdateCartRequest request) {
        Optional<Customers> customerOpt = customerRepository.findById(request.getCustomerId());
        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Customer not found");
        }

        Optional<Products> productOpt = productsRepository.findById(request.getProductId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        Optional<Cart> cartItemOpt = cartRepository.findByCustomerAndProduct(customerOpt.get(), productOpt.get());

        if (cartItemOpt.isPresent()) {
            Cart cartItem = cartItemOpt.get();
            if (request.getQuantity() > 0) {
                cartItem.setQuantity(request.getQuantity());
                cartRepository.save(cartItem);
                return ResponseEntity.ok("Cart updated successfully");
            } else {
                // If quantity is 0 or less, remove the item
                cartRepository.delete(cartItem);
                return ResponseEntity.ok("Item removed from cart");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not in cart");
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestParam Integer customerId, @RequestParam Integer productId) {
        Optional<Customers> customerOpt = customerRepository.findById(customerId);
        if (customerOpt.isEmpty()) return ResponseEntity.badRequest().body("Customer not found");

        Optional<Products> productOpt = productsRepository.findById(productId);
        if (productOpt.isEmpty()) return ResponseEntity.badRequest().body("Product not found");

        cartRepository.findByCustomerAndProduct(customerOpt.get(), productOpt.get()).ifPresent(cartRepository::delete);

        return ResponseEntity.ok("Item removed from cart");
    }
    }