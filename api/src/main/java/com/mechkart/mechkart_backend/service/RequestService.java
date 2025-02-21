package com.mechkart.mechkart_backend.service;


import com.mechkart.mechkart_backend.entity.Request;
import com.mechkart.mechkart_backend.dto.RequestCreationDto;
import java.util.List;

public interface RequestService {
    List<Request> getAllRequests();
    List<Request> getRequestsByUser(String userId);
    Request addRequest(RequestCreationDto requestDto, String userId);
    Request validateRequest(String id, Request.RequestStatus status);
}