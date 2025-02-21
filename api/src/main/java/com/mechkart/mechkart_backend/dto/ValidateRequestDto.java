package com.mechkart.mechkart_backend.dto;

import com.mechkart.mechkart_backend.entity.Request.RequestStatus;

public class ValidateRequestDto {
    private String id;
    private RequestStatus status;


    public ValidateRequestDto() {}

    public ValidateRequestDto(String id, RequestStatus status) {
        this.id = id;
        this.status = status;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public RequestStatus getStatus() {
        return status;
    }
    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}