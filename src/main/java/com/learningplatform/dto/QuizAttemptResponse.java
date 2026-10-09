package com.learningplatform.dto;

public class QuizAttemptResponse {

    private Long id;
    private Long quizId;
    private String quizTitle;
    private String subjectName;
    private String difficulty;
    private int score;
    private int totalQuestions;
    private double percentage;
    private String attemptedAt;

    public QuizAttemptResponse() {
    }

    public QuizAttemptResponse(Long id, Long quizId, String quizTitle, String subjectName,
                               String difficulty, int score, int totalQuestions,
                               double percentage, String attemptedAt) {
        this.id = id;
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.subjectName = subjectName;
        this.difficulty = difficulty;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.attemptedAt = attemptedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
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

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public String getAttemptedAt() {
        return attemptedAt;
    }

    public void setAttemptedAt(String attemptedAt) {
        this.attemptedAt = attemptedAt;
    }
}
