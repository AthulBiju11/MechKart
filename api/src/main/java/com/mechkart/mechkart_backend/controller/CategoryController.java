package com.mechkart.mechkart_backend.controller;

import com.mechkart.mechkart_backend.entity.Category;
import com.mechkart.mechkart_backend.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories") // Consistent with your route path
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryServiceImpl;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryServiceImpl.getCategories();
        ResponseEntity<List<Category>> responseEntity = new ResponseEntity<>(categories,HttpStatus.OK);
        return responseEntity;
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createCategory(@RequestBody Category category) { // Use @RequestBody to map JSON
        categoryServiceImpl.createCategory(category);
        return new ResponseEntity<>("Category has been added", HttpStatus.CREATED); // 201 Created
    }

    @DeleteMapping("deleteAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteAllCategories(){
        categoryServiceImpl.deleteCategory();
        return new ResponseEntity<>("All Categories have been deleted", HttpStatus.OK);
    }


}


