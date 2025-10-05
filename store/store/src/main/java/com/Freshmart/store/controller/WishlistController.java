package com.Freshmart.store.controller;

import com.Freshmart.store.dto.WishlistRequest;
import com.Freshmart.store.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/toggle")
    public ResponseEntity<String> toggleWishlist(@RequestBody WishlistRequest request) {
        String message = wishlistService.toggleWishlist(request);
        return ResponseEntity.ok(message);
    }
    @PutMapping("/products")
    public ResponseEntity<?> getWishlistProductIds(@RequestParam Long customerId) {
        List<Long> productIds = wishlistService.getProductIdsByCustomerId(customerId);

        if (productIds.isEmpty()) {
            // Return a message instead of an empty array
            return ResponseEntity.ok("You have not added any products in your wishlist.");
        }

        return ResponseEntity.ok(productIds);
    }
}

