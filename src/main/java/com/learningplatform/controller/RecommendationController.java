package com.learningplatform.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.dto.RecommendationResponse;
import com.learningplatform.service.RecommendationService;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/me")
    public ResponseEntity<RecommendationResponse> getMyRecommendations() {
        return ResponseEntity.ok(recommendationService.getMyRecommendations());
    }
}
