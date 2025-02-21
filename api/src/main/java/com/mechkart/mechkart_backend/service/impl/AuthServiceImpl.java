package com.mechkart.mechkart_backend.service.impl;

import com.mechkart.mechkart_backend.dto.LoginRequest;
import com.mechkart.mechkart_backend.dto.RegisterRequest;
import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.exception.UnauthorizedException;
import com.mechkart.mechkart_backend.repository.UserRepository;
import com.mechkart.mechkart_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void register(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setFullname(registerRequest.getFullname());
        user.setAdmin(false);

        userRepository.save(user);
    }

    @Override
    public User login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found!"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Wrong password or username!");
        }

        return user;
    }
}