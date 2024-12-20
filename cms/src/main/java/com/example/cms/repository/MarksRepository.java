package com.example.cms.repository;

import com.example.cms.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    Optional<Marks> findByStudentName(String studentName);

    Optional<Marks> findByRollNo(String rollNo);
    // In CourseRepository
    void deleteByRollNo(String rollNo);


}
