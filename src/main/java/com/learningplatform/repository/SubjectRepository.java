package com.learningplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}