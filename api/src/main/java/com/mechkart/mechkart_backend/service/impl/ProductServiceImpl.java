package com.mechkart.mechkart_backend.service.impl;

import com.mechkart.mechkart_backend.entity.Product;
import com.mechkart.mechkart_backend.repository.ProductRepository;
import com.mechkart.mechkart_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
}