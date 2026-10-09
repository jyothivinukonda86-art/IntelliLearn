package com.learningplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findBySubjectId(Long subjectId);

    List<Quiz> findBySubjectIdAndDifficultyIgnoreCase(Long subjectId, String difficulty);

    List<Quiz> findByDifficultyIgnoreCase(String difficulty);

    List<Quiz> findByChapterId(Long chapterId);

    List<Quiz> findByChapterIdAndDifficultyIgnoreCase(Long chapterId, String difficulty);

    List<Quiz> findBySubjectIdAndChapterIdAndDifficultyIgnoreCase(Long subjectId, Long chapterId, String difficulty);
}