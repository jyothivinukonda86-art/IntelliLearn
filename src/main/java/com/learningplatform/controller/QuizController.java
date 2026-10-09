package com.learningplatform.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.dto.QuizRequest;
import com.learningplatform.dto.QuizResponse;
import com.learningplatform.dto.QuizResultResponse;
import com.learningplatform.dto.QuizSubmissionRequest;
import com.learningplatform.service.QuizService;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(@RequestBody QuizRequest request) {
        QuizResponse response = quizService.createQuiz(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<QuizResponse>> getAllQuizzes(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long chapterId,
            @RequestParam(required = false) String difficulty) {
        if (subjectId != null || chapterId != null || difficulty != null) {
            return ResponseEntity.ok(quizService.getQuizzes(subjectId, chapterId, difficulty));
        }
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResponse> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<QuizResponse>> getQuizzesBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(quizService.getQuizzesBySubject(subjectId));
    }

    @GetMapping("/chapter/{chapterId}")
    public ResponseEntity<List<QuizResponse>> getQuizzesByChapter(@PathVariable Long chapterId) {
        return ResponseEntity.ok(quizService.getQuizzesByChapter(chapterId));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(
            @PathVariable Long id,
            @RequestBody QuizSubmissionRequest request) {
        return ResponseEntity.ok(quizService.submitQuiz(id, request));
    }
}
