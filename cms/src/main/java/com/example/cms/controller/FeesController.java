package com.example.cms.controller;

import com.example.cms.entity.Fees;
import com.example.cms.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
public class FeesController {

    @Autowired
    private FeeService feeService;

    // Endpoint to retrieve all fees
    @GetMapping
    public ResponseEntity<List<Fees>> getAllFees() {
        return ResponseEntity.ok(feeService.getAllFees());
    }

    // Endpoint to retrieve fees by ID or rollNo
    @GetMapping("/{identifier}")
    public ResponseEntity<Fees> getFeesByIdentifier(@PathVariable String identifier) {
        Fees fees;
        try {
            // Try to parse identifier as a Long (ID)
            Long id = Long.parseLong(identifier);
            fees = feeService.getFeesById(id);
        } catch (NumberFormatException e) {
            // If parsing fails, treat identifier as rollNo
            fees = feeService.findByRollNo(identifier)
                    .orElseThrow(() -> new RuntimeException("Fees not found for rollNo: " + identifier));
        }
        return ResponseEntity.ok(fees);
    }

    // New search endpoint for searching by studentName or rollNo
    @GetMapping("/search")
    public ResponseEntity<Fees> searchFees(@RequestParam(required = false) String studentName,
                                           @RequestParam(required = false) String rollNo) {
        Fees fees;
        if (studentName != null) {
            fees = feeService.findByStudentName(studentName)
                    .orElseThrow(() -> new RuntimeException("Fees not found for studentName: " + studentName));
        } else if (rollNo != null) {
            fees = feeService.findByRollNo(rollNo)
                    .orElseThrow(() -> new RuntimeException("Fees not found for rollNo: " + rollNo));
        } else {
            throw new IllegalArgumentException("Provide either studentName or rollNo for search");
        }
        return ResponseEntity.ok(fees);
    }
}


