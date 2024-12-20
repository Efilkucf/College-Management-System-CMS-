package com.example.cms.service;

import com.example.cms.entity.Fees;

import java.util.List;
import java.util.Optional;

public interface FeeService {
    List<Fees> getAllFees();

    Fees getFeesById(Long id);

    Optional<Fees> findByStudentName(String studentName);

    Optional<Fees> findByRollNo(String rollNo);
}
