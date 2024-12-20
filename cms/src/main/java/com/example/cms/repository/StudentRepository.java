package com.example.cms.repository;

import com.example.cms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.rollNo = :rollNo")
    void deleteByRollNo(@Param("rollNo") String rollNo);
}
