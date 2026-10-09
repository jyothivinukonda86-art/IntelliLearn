package com.learningplatform.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.dto.ProgressResponse;
import com.learningplatform.dto.QuizAttemptResponse;
import com.learningplatform.service.ProgressService;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping({"", "/me"})
    public ResponseEntity<ProgressResponse> getMyProgress() {
        return ResponseEntity.ok(progressService.getMyProgress());
    }

    @GetMapping("/attempts")
    public ResponseEntity<List<QuizAttemptResponse>> getMyAttempts() {
        return ResponseEntity.ok(progressService.getMyQuizAttempts());
    }
}
