package com.mechkart.mechkart_backend.service;

import com.mechkart.mechkart_backend.entity.Order;

import java.util.List;

public interface OrderService {


    // Create a new order for the given user id.
    Order createOrder(Order order, String userId);

    // Get all orders from the system (typically for admin)
    List<Order> getAllOrders();

    // Get orders for a specific user
    List<Order> getOrdersByUser(String userId);

    // Retrieve a single order by order id.
    Order getOrderById(String orderId);

    // Update order and/or payment status. Passing null for a status will leave it unchanged.
    Order updateOrderStatus(String orderId, Order.OrderStatus orderStatus, Order.PaymentStatus paymentStatus);

    Order updatePaymentStatus(String orderId, Order.PaymentStatus paymentStatus);
}