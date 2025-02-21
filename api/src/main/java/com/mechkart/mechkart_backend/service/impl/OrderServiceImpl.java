package com.mechkart.mechkart_backend.service.impl;

import com.mechkart.mechkart_backend.entity.Order;
import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.exception.ResourceNotFoundException;
import com.mechkart.mechkart_backend.repository.OrderRepository;
import com.mechkart.mechkart_backend.repository.UserRepository;
import com.mechkart.mechkart_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Order createOrder(Order order, String userId) {
        // Associate the order with the user. Here we assume a minimal User reference.
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        order.setUser(user);
        // Optionally recalc totalPrice if needed e.g. based on items in the order.
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUser_Id(userId);
    }

    @Override
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    @Override
    public Order updateOrderStatus(String orderId, Order.OrderStatus orderStatus, Order.PaymentStatus paymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if(orderStatus != null) {
            order.setOrderStatus(orderStatus);
        }
        if(paymentStatus != null) {
            order.setPaymentStatus(paymentStatus);
        }

        return orderRepository.save(order);
    }

    @Override
    public Order updatePaymentStatus(String orderId, Order.PaymentStatus paymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        order.setPaymentStatus(paymentStatus);
        // Optionally update order status if needed (for example, mark the order as COMPLETED)
        // order.setOrderStatus(Order.OrderStatus.COMPLETED);
        return orderRepository.save(order);
    }
}