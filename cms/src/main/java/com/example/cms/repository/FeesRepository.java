package com.example.cms.repository;

import com.example.cms.entity.Fees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeesRepository extends JpaRepository<Fees, Long> {
    Optional<Fees> findByStudentName(String studentName);
    Optional<Fees> findByRollNo(String rollNo);// For searching by rollNo
    // In CourseRepository
    void deleteByRollNo(String rollNo);

}

