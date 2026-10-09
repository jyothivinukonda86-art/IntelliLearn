package com.learningplatform.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.entity.LearningMaterial;
import com.learningplatform.service.LearningMaterialService;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningMaterialController {

    private final LearningMaterialService learningMaterialService;

    public LearningMaterialController(
            LearningMaterialService learningMaterialService) {
        this.learningMaterialService = learningMaterialService;
    }

    @PostMapping
    public ResponseEntity<LearningMaterial> createMaterial(
            @RequestBody LearningMaterial material) {

        return ResponseEntity.ok(
                learningMaterialService.createMaterial(material)
        );
    }

    @GetMapping("/chapter/{chapterId}")
    public ResponseEntity<List<LearningMaterial>> getMaterialsByChapter(
            @PathVariable Long chapterId) {

        return ResponseEntity.ok(
                learningMaterialService.getMaterialsByChapter(chapterId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningMaterial> getMaterialById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                learningMaterialService.getMaterialById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMaterial(
            @PathVariable Long id) {

        learningMaterialService.deleteMaterial(id);
        return ResponseEntity.ok("Learning material deleted successfully");
    }
}