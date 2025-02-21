package com.mechkart.mechkart_backend.controller;

import com.mechkart.mechkart_backend.dto.RequestCreationDto;
import com.mechkart.mechkart_backend.dto.ValidateRequestDto;
import com.mechkart.mechkart_backend.entity.Request;
import com.mechkart.mechkart_backend.exception.UnauthorizedException;
import com.mechkart.mechkart_backend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {


    @Autowired
    private RequestService requestService;

    // GET /api/requests – Get all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // GET /api/requests/user – Get requests for the current (authenticated) user
    @GetMapping("/user")
    public ResponseEntity<List<Request>> getRequestsByUser(Authentication authentication) {
        // Assuming the authenticated user's id is available via authentication.getName()
        String userId = authentication.getName();
        List<Request> requests = requestService.getRequestsByUser(userId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // POST /api/requests – Create a new request
    @PostMapping
    public ResponseEntity<String> addRequest(@RequestBody RequestCreationDto requestDto, Authentication authentication) {
        String userId = authentication.getName();
        requestService.addRequest(requestDto, userId);
        return new ResponseEntity<>("Request has been added", HttpStatus.CREATED);
    }

    // PUT /api/requests – Validate/update a request’s status.
    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> validateRequest(@RequestBody ValidateRequestDto validateRequestDto) {
        requestService.validateRequest(validateRequestDto.getId(), validateRequestDto.getStatus());

        return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
    }
}