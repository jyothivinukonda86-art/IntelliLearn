package com.learningplatform.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learningplatform.dto.ProgressResponse;
import com.learningplatform.dto.QuizAttemptResponse;
import com.learningplatform.entity.QuizAttempt;
import com.learningplatform.repository.QuizAttemptRepository;

@Service
public class ProgressServiceImpl implements ProgressService {

    private final QuizAttemptRepository quizAttemptRepository;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public ProgressServiceImpl(QuizAttemptRepository quizAttemptRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public ProgressResponse getMyProgress() {
        String email = getAuthenticatedEmail();
        List<QuizAttempt> attempts = quizAttemptRepository.findByUser_EmailOrderByAttemptedAtDesc(email);

        ProgressResponse response = new ProgressResponse();
        response.setTotalAttempts(attempts.size());

        int totalQuestions = 0;
        int totalCorrect = 0;
        double percentageSum = 0;
        List<QuizAttemptResponse> recentList = new ArrayList<>();

        for (QuizAttempt attempt : attempts) {
            totalQuestions += attempt.getTotalQuestions();
            totalCorrect += attempt.getScore();

            double pct = 0;
            if (attempt.getTotalQuestions() > 0) {
                pct = Math.round((attempt.getScore() * 10000.0) / attempt.getTotalQuestions()) / 100.0;
                percentageSum += pct;
            }

            if (recentList.size() < 10) {
                recentList.add(mapToAttemptResponse(attempt, pct));
            }
        }

        response.setTotalQuestionsAnswered(totalQuestions);
        response.setTotalCorrectAnswers(totalCorrect);

        double averagePercentage = attempts.isEmpty() ? 0 : percentageSum / attempts.size();
        response.setAveragePercentage(Math.round(averagePercentage * 100.0) / 100.0);
        response.setRecentAttempts(recentList);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizAttemptResponse> getMyQuizAttempts() {
        String email = getAuthenticatedEmail();
        List<QuizAttempt> attempts = quizAttemptRepository.findByUser_EmailOrderByAttemptedAtDesc(email);
        List<QuizAttemptResponse> result = new ArrayList<>();

        for (QuizAttempt attempt : attempts) {
            double pct = 0;
            if (attempt.getTotalQuestions() > 0) {
                pct = Math.round((attempt.getScore() * 10000.0) / attempt.getTotalQuestions()) / 100.0;
            }
            result.add(mapToAttemptResponse(attempt, pct));
        }

        return result;
    }

    private QuizAttemptResponse mapToAttemptResponse(QuizAttempt attempt, double pct) {
        Long quizId = attempt.getQuiz() != null ? attempt.getQuiz().getId() : null;
        String quizTitle = attempt.getQuiz() != null ? attempt.getQuiz().getTitle() : "Assessment";
        String difficulty = (attempt.getQuiz() != null && attempt.getQuiz().getDifficulty() != null)
                ? attempt.getQuiz().getDifficulty()
                : "MEDIUM";
        String subjectName = (attempt.getQuiz() != null && attempt.getQuiz().getSubject() != null)
                ? attempt.getQuiz().getSubject().getName()
                : "General";
        String attemptedAtStr = attempt.getAttemptedAt() != null
                ? attempt.getAttemptedAt().format(FORMATTER)
                : null;

        return new QuizAttemptResponse(
                attempt.getId(),
                quizId,
                quizTitle,
                subjectName,
                difficulty,
                attempt.getScore(),
                attempt.getTotalQuestions(),
                pct,
                attemptedAtStr
        );
    }

    private String getAuthenticatedEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User is not authenticated");
        }
        return authentication.getName();
    }
}
