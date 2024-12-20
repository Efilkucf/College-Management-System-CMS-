package com.example.cms.controller;

import com.example.cms.entity.Marks;
import com.example.cms.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    // Endpoint to retrieve all marks
    @GetMapping
    public ResponseEntity<List<Marks>> getAllMarks() {
        return ResponseEntity.ok(marksService.getAllMarks());
    }

    // Endpoint to retrieve marks by ID or rollNo
    @GetMapping("/{identifier}")
    public ResponseEntity<Marks> getMarksByIdentifier(@PathVariable String identifier) {
        Marks marks;
        try {
            // Try to parse identifier as a Long (ID)
            Long id = Long.parseLong(identifier);
            marks = marksService.getMarksById(id);
        } catch (NumberFormatException e) {
            // If parsing fails, treat identifier as rollNo
            marks = marksService.findByRollNo(identifier)
                    .orElseThrow(() -> new RuntimeException("Marks not found for rollNo: " + identifier));
        }
        return ResponseEntity.ok(marks);
    }

    // New search endpoint for searching by studentName or rollNo
    @GetMapping("/search")
    public ResponseEntity<Marks> searchMarks(@RequestParam(required = false) String studentName,
                                             @RequestParam(required = false) String rollNo) {
        Marks marks;
        if (studentName != null) {
            marks = marksService.findByStudentName(studentName)
                    .orElseThrow(() -> new RuntimeException("Marks not found for studentName: " + studentName));
        } else if (rollNo != null) {
            marks = marksService.findByRollNo(rollNo)
                    .orElseThrow(() -> new RuntimeException("Marks not found for rollNo: " + rollNo));
        } else {
            throw new IllegalArgumentException("Provide either studentName or rollNo for search");
        }
        return ResponseEntity.ok(marks);
    }
}


