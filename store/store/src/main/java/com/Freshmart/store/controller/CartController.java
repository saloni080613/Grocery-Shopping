package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddToCartRequest;
import com.Freshmart.store.model.Cart;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.model.Products; // CHANGED: from Product to Products
import com.Freshmart.store.repository.CartRepository;
import com.Freshmart.store.repository.CustomerRepository;
import com.Freshmart.store.repository.ProductsRepository; // CHANGED
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired private CustomerRepository customerRepository;
    @Autowired private ProductsRepository productsRepository; // CHANGED
    @Autowired private CartRepository cartRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        Optional<Customers> customerOpt = customerRepository.findById(request.getCustomerId());
        // Use the ProductsRepository to find by an Integer ID
        Optional<Products> productOpt = productsRepository.findById(request.getProductId()); // CHANGED

        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Customer not found!");
        }
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Product not found!");
        }

        Customers customer = customerOpt.get();
        Products product = productOpt.get(); // CHANGED

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
}