
package com.learningplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.QuizAttempt;

public interface QuizAttemptRepository
        extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUser_EmailOrderByAttemptedAtDesc(
            String email);
}
