package com.learningplatform.service;

import java.util.List;

import com.learningplatform.dto.QuizRequest;
import com.learningplatform.dto.QuizResponse;
import com.learningplatform.dto.QuizResultResponse;
import com.learningplatform.dto.QuizSubmissionRequest;

public interface QuizService {

    QuizResponse createQuiz(QuizRequest request);
    QuizResponse getQuizById(Long id);
    QuizResultResponse submitQuiz(Long quizId, QuizSubmissionRequest request);
    List<QuizResponse> getAllQuizzes();
    List<QuizResponse> getQuizzesBySubject(Long subjectId);
    List<QuizResponse> getQuizzesByChapter(Long chapterId);
    List<QuizResponse> getQuizzes(Long subjectId, String difficulty);
    List<QuizResponse> getQuizzes(Long subjectId, Long chapterId, String difficulty);
}
