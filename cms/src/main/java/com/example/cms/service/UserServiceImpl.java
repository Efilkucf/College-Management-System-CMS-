package com.example.cms.service;

import com.example.cms.entity.User;
import com.example.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository; // Repository to interact with DB

    @Override
    public void addStudent(User user) {
        userRepository.save(user); // Save the user
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email); // Check email existence
    }
}
