package com.mechkart.mechkart_backend.dto;



public class RequestCreationDto {

    private String username;
    private String email;
    private String request;
    private int quantity;

    public RequestCreationDto() {}

    public RequestCreationDto(String username, String email, String request, int quantity) {
        this.username = username;
        this.email = email;
        this.request = request;
        this.quantity = quantity;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getRequest() {
        return request;
    }
    public void setRequest(String request) {
        this.request = request;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
