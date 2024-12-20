package com.example.cms.service;

import com.example.cms.entity.Student;
import com.example.cms.entity.Course;
import com.example.cms.entity.Fees;
import com.example.cms.entity.Marks;
import com.example.cms.repository.CourseRepository;
import com.example.cms.repository.FeesRepository;
import com.example.cms.repository.MarksRepository;
import com.example.cms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private FeesRepository feesRepository;

    @Autowired
    private MarksRepository marksRepository;

    @Override
    public Student saveStudent(Student student) {
        Student savedStudent = studentRepository.save(student);

        // Create related course record
        Course course = new Course();
        course.setStudentName(student.getStudentName());
        course.setRollNo(student.getRollNo());
        course.setCourseDetails(student.getCourseDetails());
        courseRepository.save(course);

        // Create related fees record
        Fees fees = new Fees();
        fees.setStudentName(student.getStudentName());
        fees.setRollNo(student.getRollNo());
        fees.setFeesPaid(student.getFeesPaid());
        fees.setFeesDue(student.getFeesDue());
        fees.setCourseDetails(student.getCourseDetails());
        feesRepository.save(fees);

        // Create related marks record
        Marks marks = new Marks();
        marks.setStudentName(student.getStudentName());
        marks.setRollNo(student.getRollNo());
        marks.setCGPA(student.getCGPA());
        marksRepository.save(marks);

        return savedStudent;
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        // Update fields
        existingStudent.setStudentName(student.getStudentName());
        existingStudent.setRollNo(student.getRollNo());
        existingStudent.setAge(student.getAge());
        existingStudent.setFeesPaid(student.getFeesPaid());
        existingStudent.setFeesDue(student.getFeesDue());
        existingStudent.setCourseDetails(student.getCourseDetails());
        existingStudent.setCGPA(student.getCGPA());

        Student updatedStudent = studentRepository.save(existingStudent);

        // Update related entities
        Course course = courseRepository.findByRollNo(updatedStudent.getRollNo())
                .orElse(new Course());
        course.setStudentName(updatedStudent.getStudentName());
        course.setRollNo(updatedStudent.getRollNo());
        course.setCourseDetails(updatedStudent.getCourseDetails());
        courseRepository.save(course);

        Fees fees = feesRepository.findByRollNo(updatedStudent.getRollNo())
                .orElse(new Fees());
        fees.setStudentName(updatedStudent.getStudentName());
        fees.setRollNo(updatedStudent.getRollNo());
        fees.setFeesPaid(updatedStudent.getFeesPaid());
        fees.setFeesDue(updatedStudent.getFeesDue());
        fees.setCourseDetails(updatedStudent.getCourseDetails());
        feesRepository.save(fees);

        Marks marks = marksRepository.findByRollNo(updatedStudent.getRollNo())
                .orElse(new Marks());
        marks.setStudentName(updatedStudent.getStudentName());
        marks.setRollNo(updatedStudent.getRollNo());
        marks.setCGPA(updatedStudent.getCGPA());
        marksRepository.save(marks);

        return updatedStudent;
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        // Fetch the student to ensure they exist
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        // Delete related records explicitly
        courseRepository.deleteByRollNo(existingStudent.getRollNo());
        feesRepository.deleteByRollNo(existingStudent.getRollNo());
        marksRepository.deleteByRollNo(existingStudent.getRollNo());

        // Delete the student record
        studentRepository.delete(existingStudent);
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}