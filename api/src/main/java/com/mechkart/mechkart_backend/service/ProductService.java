package com.mechkart.mechkart_backend.service;


import com.mechkart.mechkart_backend.entity.Product;

import java.util.List;

public interface ProductService {
    List getAllProducts();
    Product createProduct(Product product);
}