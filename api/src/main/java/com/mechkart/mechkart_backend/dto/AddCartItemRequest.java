package com.mechkart.mechkart_backend.dto;

public class AddCartItemRequest {
    private String productId;


    public AddCartItemRequest() {
    }

    public AddCartItemRequest(String productId) {
        this.productId = productId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }


}
