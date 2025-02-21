package com.mechkart.mechkart_backend.service;

import com.mechkart.mechkart_backend.dto.LoginRequest;
import com.mechkart.mechkart_backend.dto.RegisterRequest;
import com.mechkart.mechkart_backend.entity.User;

public interface AuthService {
    void register(RegisterRequest registerRequest);
    User login(LoginRequest loginRequest);
}