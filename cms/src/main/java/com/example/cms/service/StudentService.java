package com.example.cms.service;

import com.example.cms.entity.Student;

import java.util.List;

public interface StudentService {
    Student saveStudent(Student student);

    Student updateStudent(Long id, Student student);

    void deleteStudent(Long id);

    Student getStudentById(Long id);

    List<Student> getAllStudents();
}
