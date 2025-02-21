package com.mechkart.mechkart_backend.dto;

import com.mechkart.mechkart_backend.entity.Order;

public class UpdatePaymentStatusRequest {

    Order.PaymentStatus paymentStatus;

    public UpdatePaymentStatusRequest() {
    }

    public UpdatePaymentStatusRequest(Order.PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Order.PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Order.PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
