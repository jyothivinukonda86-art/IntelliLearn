package com.learningplatform.service;

import java.util.List;

import com.learningplatform.entity.LearningMaterial;

public interface LearningMaterialService {

    LearningMaterial createMaterial(LearningMaterial material);

    List<LearningMaterial> getMaterialsByChapter(Long chapterId);

    LearningMaterial getMaterialById(Long id);

    void deleteMaterial(Long id);
}