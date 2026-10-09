package com.learningplatform.config;

public record QuizSeed(
        String title,
        String description,
        String difficulty,
        int durationMinutes,
        QuestionSeed[] questions
) {
    public record QuestionSeed(
            String text,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String correctAnswer,
            String explanation
    ) {}
}
