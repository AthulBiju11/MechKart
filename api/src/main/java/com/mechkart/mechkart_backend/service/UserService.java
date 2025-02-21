package com.mechkart.mechkart_backend.service;
import com.mechkart.mechkart_backend.entity.User;

public interface UserService {
    void deleteUser(String id, String requestUserId);
    User getUser(String id);
}