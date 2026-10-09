package com.learningplatform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.learningplatform.entity.Chapter;
import com.learningplatform.entity.LearningMaterial;
import com.learningplatform.repository.ChapterRepository;
import com.learningplatform.repository.LearningMaterialRepository;

@Service
public class LearningMaterialServiceImpl implements LearningMaterialService {

    private final LearningMaterialRepository learningMaterialRepository;
    private final ChapterRepository chapterRepository;

    public LearningMaterialServiceImpl(
            LearningMaterialRepository learningMaterialRepository,
            ChapterRepository chapterRepository) {
        this.learningMaterialRepository = learningMaterialRepository;
        this.chapterRepository = chapterRepository;
    }

    @Override
    public LearningMaterial createMaterial(LearningMaterial material) {
        if (material.getChapter() != null && material.getChapter().getId() != null) {
            Long chapterId = material.getChapter().getId();
            Chapter chapter = chapterRepository.findById(chapterId)
                    .orElseThrow(() -> new RuntimeException("Chapter not found with ID: " + chapterId));
            material.setChapter(chapter);
        } else {
            throw new IllegalArgumentException("Chapter ID must be specified for learning material.");
        }

        return learningMaterialRepository.save(material);
    }

    @Override
    public List<LearningMaterial> getMaterialsByChapter(Long chapterId) {
        return learningMaterialRepository.findByChapterId(chapterId);
    }

    @Override
    public LearningMaterial getMaterialById(Long id) {
        return learningMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning material not found"));
    }

    @Override
    public void deleteMaterial(Long id) {
        learningMaterialRepository.deleteById(id);
    }
}