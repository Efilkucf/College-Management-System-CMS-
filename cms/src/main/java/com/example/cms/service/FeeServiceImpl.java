package com.example.cms.service;

import com.example.cms.entity.Fees;
import com.example.cms.exception.ResourceNotFoundException;
import com.example.cms.repository.FeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeeServiceImpl implements FeeService {

    @Autowired
    private FeesRepository feesRepository;

    @Override
    public List<Fees> getAllFees() {
        return feesRepository.findAll();
    }

    @Override
    public Fees getFeesById(Long id) {
        return feesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fees not found with id: " + id));
    }

    @Override
    public Optional<Fees> findByStudentName(String studentName) {
        return feesRepository.findByStudentName(studentName);
    }

    @Override
    public Optional<Fees> findByRollNo(String rollNo) {
        return feesRepository.findByRollNo(rollNo);
    }
}
