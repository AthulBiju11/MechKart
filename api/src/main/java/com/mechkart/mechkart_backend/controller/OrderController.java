package com.mechkart.mechkart_backend.controller;

import com.mechkart.mechkart_backend.dto.UpdatePaymentStatusRequest;
import com.mechkart.mechkart_backend.entity.Order;
import com.mechkart.mechkart_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Create a new order. The currently authenticated user's id is injected from Authentication
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order, Authentication authentication) {
        String userId = authentication.getName(); // Assuming the JWT filter sets this as the principal
        Order created = orderService.createOrder(order, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get all orders – for administration purposes.
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Get orders for the currently authenticated user
    @GetMapping("/user")
    public ResponseEntity<List<Order>> getOrdersByUser(Authentication authentication) {
        String userId = authentication.getName();
        List<Order> orders = orderService.getOrdersByUser(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Get order by id (accessible to both user and admin – you can add extra authorization if needed)
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        Order order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    // Update an order's status/ payment status: only admin should be allowed to do this.
    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId,
                                                   @RequestParam(required = false) Order.OrderStatus orderStatus,
                                                   @RequestParam(required = false) Order.PaymentStatus paymentStatus) {
        // updateOrderStatus lets you update one or both statuses.
        Order updated = orderService.updateOrderStatus(orderId, orderStatus, paymentStatus);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/payment")
    public ResponseEntity updatePaymentStatus(@PathVariable String orderId,
                                              @RequestBody UpdatePaymentStatusRequest paymentStatus) {
        Order updatedOrder = orderService.updatePaymentStatus(orderId, paymentStatus.getPaymentStatus());
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}