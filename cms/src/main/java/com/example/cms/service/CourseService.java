package com.example.cms.service;

import com.example.cms.entity.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();

    Course getCourseById(Long id);

    Course findByStudentName(String studentName);

    Course findByRollNo(String rollNo);
}
