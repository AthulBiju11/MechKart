package com.mechkart.mechkart_backend.service.impl;


import com.mechkart.mechkart_backend.dto.RequestCreationDto;
import com.mechkart.mechkart_backend.entity.Request;
import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.exception.ResourceNotFoundException;
import com.mechkart.mechkart_backend.repository.RequestRepository;
import com.mechkart.mechkart_backend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Override
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public List<Request> getRequestsByUser(String userId) {
        // Assuming your repository has a method similar to:
        // List<Request> findByUser_Id(String userId);
        List<Request> userRequests =  requestRepository.findByUser_Id(userId);
        return userRequests;
    }

    @Override
    public Request addRequest(RequestCreationDto requestDto, String userId) {
        User user = new User();
        user.setId(userId); // minimal user reference; adjust if you need to load full user data

        Request newRequest = new Request();
        newRequest.setUser(user);
        newRequest.setUsername(requestDto.getUsername());
        newRequest.setEmail(requestDto.getEmail());
        newRequest.setRequest(requestDto.getRequest());
        newRequest.setQuantity(requestDto.getQuantity());
        newRequest.setStatus(Request.RequestStatus.PENDING);

        return requestRepository.save(newRequest);
    }

    @Override
    public Request validateRequest(String id, Request.RequestStatus status) {
        Request existingRequest = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
        existingRequest.setStatus(status);
        return requestRepository.save(existingRequest);
    }
}