package com.learningplatform.dto;

import java.util.List;

public class ProgressResponse {

    private long totalAttempts;
    private int totalQuestionsAnswered;
    private int totalCorrectAnswers;
    private double averagePercentage;
    private List<QuizAttemptResponse> recentAttempts;

    public ProgressResponse() {
    }

    public long getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(long totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public int getTotalQuestionsAnswered() {
        return totalQuestionsAnswered;
    }

    public void setTotalQuestionsAnswered(int totalQuestionsAnswered) {
        this.totalQuestionsAnswered = totalQuestionsAnswered;
    }

    public int getTotalCorrectAnswers() {
        return totalCorrectAnswers;
    }

    public void setTotalCorrectAnswers(int totalCorrectAnswers) {
        this.totalCorrectAnswers = totalCorrectAnswers;
    }

    public double getAveragePercentage() {
        return averagePercentage;
    }

    public void setAveragePercentage(double averagePercentage) {
        this.averagePercentage = averagePercentage;
    }

    public List<QuizAttemptResponse> getRecentAttempts() {
        return recentAttempts;
    }

    public void setRecentAttempts(List<QuizAttemptResponse> recentAttempts) {
        this.recentAttempts = recentAttempts;
    }
}
