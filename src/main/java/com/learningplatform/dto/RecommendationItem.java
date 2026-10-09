package com.learningplatform.dto;

public class RecommendationItem {

    private String type;        // REVISION, PRACTICE, ADVANCEMENT, EXPLORATION
    private String priority;    // HIGH, MEDIUM, LOW
    private Long subjectId;
    private String subjectName;
    private Long quizId;
    private String quizTitle;
    private Long chapterId;
    private String chapterName;
    private String reason;
    private String actionText;
    private String actionRoute;

    public RecommendationItem() {
    }

    public RecommendationItem(String type, String priority, Long subjectId, String subjectName,
                              Long quizId, String quizTitle, Long chapterId, String chapterName,
                              String reason, String actionText, String actionRoute) {
        this.type = type;
        this.priority = priority;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.chapterId = chapterId;
        this.chapterName = chapterName;
        this.reason = reason;
        this.actionText = actionText;
        this.actionRoute = actionRoute;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
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

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getActionText() {
        return actionText;
    }

    public void setActionText(String actionText) {
        this.actionText = actionText;
    }

    public String getActionRoute() {
        return actionRoute;
    }

    public void setActionRoute(String actionRoute) {
        this.actionRoute = actionRoute;
    }
}
