package com.learningplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    List<Chapter> findBySubjectId(Long subjectId);
}