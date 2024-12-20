package com.example.cms.controller;

import com.example.cms.entity.Course;
import com.example.cms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Get all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // Get course by ID or rollNo
    @GetMapping("/{identifier}")
    public ResponseEntity<Course> getCourseByIdentifier(@PathVariable String identifier) {
        Course course;
        try {
            // Try parsing identifier as a Long (ID)
            Long id = Long.parseLong(identifier);
            course = courseService.getCourseById(id);
        } catch (NumberFormatException e) {
            // If parsing fails, treat identifier as rollNo
            course = courseService.findByRollNo(identifier);
        }
        return ResponseEntity.ok(course);
    }

    // Search courses by studentName or rollNo
    @GetMapping("/search")
    public ResponseEntity<Course> searchCourses(@RequestParam(required = false) String studentName,
                                                @RequestParam(required = false) String rollNo) {
        Course course;
        if (studentName != null) {
            course = courseService.findByStudentName(studentName);
        } else if (rollNo != null) {
            course = courseService.findByRollNo(rollNo);
        } else {
            throw new IllegalArgumentException("Provide either studentName or rollNo for search");
        }
        return ResponseEntity.ok(course);
    }
}


