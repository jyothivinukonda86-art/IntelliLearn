package com.learningplatform.service;

import java.util.List;

import com.learningplatform.dto.ProgressResponse;
import com.learningplatform.dto.QuizAttemptResponse;

public interface ProgressService {

    ProgressResponse getMyProgress();

    List<QuizAttemptResponse> getMyQuizAttempts();
}
