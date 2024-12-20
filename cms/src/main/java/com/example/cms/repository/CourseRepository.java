package com.example.cms.repository;

import com.example.cms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByStudentName(String studentName);

    Optional<Course> findByRollNo(String rollNo);
    // In CourseRepository
    void deleteByRollNo(String rollNo);

}
