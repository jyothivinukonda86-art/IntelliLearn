package com.learningplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}