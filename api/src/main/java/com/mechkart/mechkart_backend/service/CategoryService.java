package com.mechkart.mechkart_backend.service;

import com.mechkart.mechkart_backend.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();
    void createCategory(Category category);
}
