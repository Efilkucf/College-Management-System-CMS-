package com.example.cms.service;

import com.example.cms.entity.Marks;
import java.util.Optional;

import java.util.List;

public interface MarksService {
    List<Marks> getAllMarks();

    Marks getMarksById(Long id);

    Optional<Marks> findByStudentName(String studentName);

    Optional<Marks> findByRollNo(String rollNo);

}
