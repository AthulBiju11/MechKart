package com.mechkart.mechkart_backend.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    // Each Order is tied directly to one user, that is, the buyer.
    @DBRef
    private User user;

    // List of items in this order
    private List<OrderItem> items;

    // Total price for the order, calculated as the sum of each item's quantity * price.
    private double totalPrice;

    // Payment status holds the current state of the payment.
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    // Order status relates to the overall order progress.
    private OrderStatus orderStatus = OrderStatus.NEW;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    // Enums for payment and order statuses.
    public enum PaymentStatus {
        PENDING, PAID, FAILED
    }

    public enum OrderStatus {
        NEW, PROCESSING, COMPLETED, CANCELLED
    }

    public Order() {
    }

    public Order(String id, User user, List<OrderItem> items, double totalPrice, PaymentStatus paymentStatus, OrderStatus orderStatus, Date createdAt, Date updatedAt) {
        this.id = id;
        this.user = user;
        this.items = items;
        this.totalPrice = totalPrice;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    // A nested class representing each item in the order.
    @Data
    public static class OrderItem {
        // Reference to the product being ordered
        @DBRef
        private Product product;

        // The ordered quantity of the product.
        private int quantity;

        // The price of the product at the time of ordering.
        private double price;

        public OrderItem() {
        }

        public OrderItem(Product product, int quantity, double price) {
            this.product = product;
            this.quantity = quantity;
            this.price = price;
        }

        public Product getProduct() {
            return product;
        }

        public void setProduct(Product product) {
            this.product = product;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}