package com.mechkart.mechkart_backend.service.impl;

import com.mechkart.mechkart_backend.service.CartService;

import com.mechkart.mechkart_backend.entity.Cart;
import com.mechkart.mechkart_backend.entity.Product;
import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.exception.ResourceNotFoundException;
import com.mechkart.mechkart_backend.repository.CartRepository;
import com.mechkart.mechkart_backend.repository.ProductRepository;
import com.mechkart.mechkart_backend.repository.UserRepository;
import com.mechkart.mechkart_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public void setCartItems(String userId, List<Cart.CartItem> items) {
        // Look up existing cart by user id.
        Optional<Cart> existingOpt = cartRepository.findByUser_Id(userId);
        List<Cart.CartItem> convertedItems = new ArrayList<>();

        // Convert each incoming CartItem so that the product field holds the actual Product entity.
        for (Cart.CartItem item : items) {
            // Assuming that the client sends a product object with its id field set.
            String prodId = item.getProduct().getId();
            Product product = productRepository.findById(prodId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + prodId));
            convertedItems.add(new Cart.CartItem(product, item.getQuantity()));
        }

        if (existingOpt.isPresent()) {
            Cart cart = existingOpt.get();
            cart.setItems(convertedItems);
            cartRepository.save(cart);
        } else {
            // Create a new cart if one does not exist.
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setItems(convertedItems);
            cartRepository.save(newCart);
        }
    }

    @Override
    public void addCartItem(String userId, String productId) {
        Optional<Cart> cartOpt = cartRepository.findByUser_Id(userId);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            // Check if the product already exists in the cart.
            Optional<Cart.CartItem> itemOpt = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst();
            if (itemOpt.isPresent()) {
                // Increment quantity.
                Cart.CartItem existingItem = itemOpt.get();
                existingItem.setQuantity(existingItem.getQuantity() + 1);
            } else {
                // Retrieve the Product entity.
                Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
                Cart.CartItem newItem = new Cart.CartItem(product, 1);
                cart.getItems().add(newItem);
            }
            cartRepository.save(cart);
        } else {
            // Create a new cart with one item.
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
            Cart.CartItem newItem = new Cart.CartItem(product, 1);
            List<Cart.CartItem> items = new ArrayList<>();
            items.add(newItem);
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setItems(items);
            cartRepository.save(newCart);
        }
    }

    @Override
    public List<Cart.CartItem> getCartItems(String userId) {
        Optional<Cart> cartOpt = cartRepository.findByUser_Id(userId);
        if (cartOpt.isEmpty()) {
            // Create a new cart with no items if one does not exist.
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setItems(new ArrayList<>());
            cartRepository.save(cart);
            return cart.getItems();
        }
        return cartOpt.get().getItems();
    }
}