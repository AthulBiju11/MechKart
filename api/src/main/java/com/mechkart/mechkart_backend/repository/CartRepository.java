package com.mechkart.mechkart_backend.repository;


import com.mechkart.mechkart_backend.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Optional findByUser_Id(String userId);
}