package com.example.cms.repository;

import com.example.cms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); // Automatically implemented by Spring Data JPA
    Optional<User> findByEmail(String email); // Automatically implemented by Spring Data JPA
}
