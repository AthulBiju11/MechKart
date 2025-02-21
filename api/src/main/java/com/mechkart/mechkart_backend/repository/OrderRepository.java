package com.mechkart.mechkart_backend.repository;

import com.mechkart.mechkart_backend.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Custom method to find orders by the referenced user's id.
    List findByUser_Id(String userId);
}