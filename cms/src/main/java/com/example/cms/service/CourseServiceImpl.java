package com.example.cms.service;

import com.example.cms.entity.Course;
import com.example.cms.repository.CourseRepository;
import com.example.cms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
    }

    @Override
    public Course findByStudentName(String studentName) {
        return courseRepository.findByStudentName(studentName)
                .orElseThrow(() -> new RuntimeException("Course not found for student: " + studentName));
    }

    @Override
    public Course findByRollNo(String rollNo) {
        return courseRepository.findByRollNo(rollNo)
                .orElseThrow(() -> new RuntimeException("Course not found for roll number: " + rollNo));
    }
}
