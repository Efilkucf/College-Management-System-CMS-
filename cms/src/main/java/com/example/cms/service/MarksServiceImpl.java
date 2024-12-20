package com.example.cms.service;

import com.example.cms.entity.Marks;
import com.example.cms.repository.MarksRepository;
import com.example.cms.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;
import java.util.Optional;

@Service
public class MarksServiceImpl implements MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Override
    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    @Override
    public Marks getMarksById(Long id) {
        return marksRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marks not found with id: " + id));
    }

    @Override
    public Optional<Marks> findByStudentName(String studentName) {
        return marksRepository.findByStudentName(studentName);
    }

    @Override
    public Optional<Marks> findByRollNo(String rollNo) {
        return marksRepository.findByRollNo(rollNo);
    }

}
