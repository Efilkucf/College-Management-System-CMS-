package com.example.cms.service;

import com.example.cms.entity.User;

public interface UserService {
    void addStudent(User user); // Method to save a user
    boolean existsByEmail(String email); // Method to check if email already exists
}
