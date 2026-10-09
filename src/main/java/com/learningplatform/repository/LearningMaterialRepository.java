package com.learningplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learningplatform.entity.LearningMaterial;

public interface LearningMaterialRepository
        extends JpaRepository<LearningMaterial, Long> {

    @Query("SELECT l FROM LearningMaterial l WHERE l.chapter.id = :chapterId")
    List<LearningMaterial> findByChapterId(@Param("chapterId") Long chapterId);
}