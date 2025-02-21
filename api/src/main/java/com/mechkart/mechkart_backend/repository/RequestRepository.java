package com.mechkart.mechkart_backend.repository;

import com.mechkart.mechkart_backend.entity.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    // Finds all Request documents where the referenced User's id matches the given userId.
    List findByUser_Id(String userId);
}