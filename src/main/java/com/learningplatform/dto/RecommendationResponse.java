package com.learningplatform.dto;

import java.util.List;

public class RecommendationResponse {

    private String status;              // NO_ATTEMPTS, NEEDS_REVISION, PRACTICING, MASTERY
    private double overallAccuracy;
    private long totalAttempts;
    private List<RecommendationItem> recommendations;

    public RecommendationResponse() {
    }

    public RecommendationResponse(String status, double overallAccuracy, long totalAttempts,
                                  List<RecommendationItem> recommendations) {
        this.status = status;
        this.overallAccuracy = overallAccuracy;
        this.totalAttempts = totalAttempts;
        this.recommendations = recommendations;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getOverallAccuracy() {
        return overallAccuracy;
    }

    public void setOverallAccuracy(double overallAccuracy) {
        this.overallAccuracy = overallAccuracy;
    }

    public long getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(long totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public List<RecommendationItem> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<RecommendationItem> recommendations) {
        this.recommendations = recommendations;
    }
}
