package com.learningplatform.dto;

import java.util.List;

public class QuizResultResponse {

    private Long attemptId;
    private int score;
    private int totalQuestions;
    private int correctCount;
    private int incorrectCount;
    private int xpEarned;
    private double percentage;
    private String message;
    private List<QuestionReviewResponse> reviews;

    public QuizResultResponse() {
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Long attemptId) {
        this.attemptId = attemptId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }

    public int getIncorrectCount() {
        return incorrectCount;
    }

    public void setIncorrectCount(int incorrectCount) {
        this.incorrectCount = incorrectCount;
    }

    public int getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(int xpEarned) {
        this.xpEarned = xpEarned;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<QuestionReviewResponse> getReviews() {
        return reviews;
    }

    public void setReviews(List<QuestionReviewResponse> reviews) {
        this.reviews = reviews;
    }
}
