package com.mechkart.mechkart_backend.service.impl;

import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.exception.UnauthorizedException;
import com.mechkart.mechkart_backend.exception.ResourceNotFoundException;
import com.mechkart.mechkart_backend.repository.UserRepository;
import com.mechkart.mechkart_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void deleteUser(String id, String requestUserId) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!requestUserId.equals(user.getId())) {
            throw new UnauthorizedException("You can delete only your account!");
        }

        userRepository.deleteById(id);
    }

    @Override
    public User getUser(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}