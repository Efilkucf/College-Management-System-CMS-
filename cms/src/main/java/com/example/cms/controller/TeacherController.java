package com.example.cms.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api")
public class TeacherController {
    @Value("${admin.password}")
    private String teacherPasscode;
    @PostMapping("/validate-passcode")
    public ResponseEntity<String> validatePasscode(
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String passcode = request.get("passcode");

        // Debugging: Log the incoming request and passcode
        System.out.println("Authorization Header: " + authorizationHeader);
        System.out.println("Passcode Received: " + passcode);

        if (teacherPasscode.equals(passcode)) {
            return ResponseEntity.ok("Passcode validated successfully.");
        } else {
            System.out.println("Passcode validation failed.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid passcode");
        }
    }
}