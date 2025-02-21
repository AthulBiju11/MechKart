package com.mechkart.mechkart_backend.service.impl;


import com.mechkart.mechkart_backend.entity.Category;
import com.mechkart.mechkart_backend.repository.CategoryRepository;
import com.mechkart.mechkart_backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    public List<Category> getCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        return categoryList;
    }

    public void createCategory(Category category) {
        categoryRepository.save(category);
    }

    public void deleteCategory() {
        categoryRepository.deleteAll();
    }
}