package com.mechkart.mechkart_backend.service;

import com.mechkart.mechkart_backend.entity.Cart;

import java.util.List;

public interface CartService {


    // Completely updates/replaces the cart items for the given user.
    void setCartItems(String userId, List<Cart.CartItem> items);

    // Adds one unit of the given product to the cart (or increments quantity if already present).
    void addCartItem(String userId, String productId);

    // Retrieves the cart items for the given user. If no cart exists, creates one with an empty items list.
    List<Cart.CartItem> getCartItems(String userId);
}