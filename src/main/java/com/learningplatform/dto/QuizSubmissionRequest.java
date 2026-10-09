package com.learningplatform.dto;

import java.util.Map;

public class QuizSubmissionRequest {

    private Map<Long, String> answers;

    public QuizSubmissionRequest() {
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
} 