package com.mechkart.mechkart_backend.controller;

import com.mechkart.mechkart_backend.entity.User;
import com.mechkart.mechkart_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id, @RequestAttribute String userId) {
        userService.deleteUser(id, userId);
        return ResponseEntity.ok("User has been deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User user = userService.getUser(id);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}