package com.Freshmart.store.controller;

import com.Freshmart.store.dto.AddToWishlistRequest;
import com.Freshmart.store.dto.WishlistItemResponse;
import com.Freshmart.store.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestBody AddToWishlistRequest request) {
        try {
            wishlistService.addProductToWishlist(request.getCustomerId(), request.getProductId());
            return ResponseEntity.ok("Product added to wishlist successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<WishlistItemResponse>> getWishlistItems(@PathVariable Integer customerId) {
        try {
            List<WishlistItemResponse> wishlistItems = wishlistService.getWishlistItemsForCustomer(customerId);
            return ResponseEntity.ok(wishlistItems);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}