package com.example.cms.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "fees")
public class Fees {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name", nullable = false)
    private String studentName; // Matches `student_name` column

    @Column(name = "roll_no", nullable = false, unique = true)
    private String rollNo; // Matches `roll_no` column

    @Column(name = "fee_paid", nullable = true)
    private Double feesPaid; // Matches `fee_paid` column

    @Column(name = "fees_due", nullable = true)
    private Double feesDue; // Matches `fees_due` column

    @Column(name = "course_details", nullable = false)
    private String courseDetails; // Matches `course_details` column

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public Double getFeesPaid() {
        return feesPaid;
    }

    public void setFeesPaid(Double feesPaid) {
        this.feesPaid = feesPaid;
    }

    public Double getFeesDue() {
        return feesDue;
    }

    public void setFeesDue(Double feesDue) {
        this.feesDue = feesDue;
    }

    public String getCourseDetails() {
        return courseDetails;
    }

    public void setCourseDetails(String courseDetails) {
        this.courseDetails = courseDetails;
    }
}
