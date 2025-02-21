package com.mechkart.mechkart_backend.controller;

import com.mechkart.mechkart_backend.dto.AddCartItemRequest;
import com.mechkart.mechkart_backend.entity.Cart;
import com.mechkart.mechkart_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    // Endpoint to set when the client wishes to completely update the whole cart items list.
    @PostMapping("/set")
    public ResponseEntity<String> setCartItems(@RequestBody List<Cart.CartItem> items, Authentication authentication) {
        String userId = authentication.getName(); // Assuming that the JWT filter sets the principal as the userId.
        cartService.setCartItems(userId, items);
        return new ResponseEntity<>("Cart updated successfully", HttpStatus.OK);
    }

    // Endpoint to add a single cart item (if already present, increments quantity).
    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestBody AddCartItemRequest request, Authentication authentication) {
        String userId = authentication.getName();
        cartService.addCartItem(userId, request.getProductId());
        return new ResponseEntity<>("Item added to cart successfully", HttpStatus.OK);
    }

    // Endpoint to get the cart items for a given user.
    @GetMapping("/{id}")
    public ResponseEntity<List<Cart.CartItem>> getCartItems(@PathVariable("id") String userId) {
        List<Cart.CartItem> items = cartService.getCartItems(userId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}