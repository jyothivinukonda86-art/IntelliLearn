package com.learningplatform.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learningplatform.dto.RecommendationItem;
import com.learningplatform.dto.RecommendationResponse;
import com.learningplatform.entity.Chapter;
import com.learningplatform.entity.Quiz;
import com.learningplatform.entity.QuizAttempt;
import com.learningplatform.entity.Subject;
import com.learningplatform.repository.ChapterRepository;
import com.learningplatform.repository.QuizAttemptRepository;
import com.learningplatform.repository.QuizRepository;
import com.learningplatform.repository.SubjectRepository;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRepository quizRepository;
    private final SubjectRepository subjectRepository;
    private final ChapterRepository chapterRepository;

    public RecommendationServiceImpl(QuizAttemptRepository quizAttemptRepository,
                                     QuizRepository quizRepository,
                                     SubjectRepository subjectRepository,
                                     ChapterRepository chapterRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizRepository = quizRepository;
        this.subjectRepository = subjectRepository;
        this.chapterRepository = chapterRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public RecommendationResponse getMyRecommendations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();
        List<QuizAttempt> attempts = quizAttemptRepository.findByUser_EmailOrderByAttemptedAtDesc(email);
        List<Subject> allSubjects = subjectRepository.findAll();
        List<Quiz> allQuizzes = quizRepository.findAll();

        List<RecommendationItem> items = new ArrayList<>();

        // CASE 1: Student has no quiz attempts yet
        if (attempts.isEmpty()) {
            if (!allQuizzes.isEmpty()) {
                Quiz firstQuiz = allQuizzes.get(0);
                String subName = firstQuiz.getSubject() != null ? firstQuiz.getSubject().getName() : "Curriculum";
                Long subId = firstQuiz.getSubject() != null ? firstQuiz.getSubject().getId() : null;

                items.add(new RecommendationItem(
                        "EXPLORATION",
                        "HIGH",
                        subId,
                        subName,
                        firstQuiz.getId(),
                        firstQuiz.getTitle(),
                        null,
                        null,
                        "You haven't attempted any quizzes yet. Kickstart your learning journey by taking the diagnostic assessment: " + firstQuiz.getTitle() + ".",
                        "Take First Quiz",
                        "/quizzes/" + firstQuiz.getId()
                ));
            }

            if (!allSubjects.isEmpty()) {
                Subject firstSubject = allSubjects.get(0);
                items.add(new RecommendationItem(
                        "EXPLORATION",
                        "MEDIUM",
                        firstSubject.getId(),
                        firstSubject.getName(),
                        null,
                        null,
                        null,
                        null,
                        "Explore foundational subject materials and chapter notes in " + firstSubject.getName() + " to prepare for assessments.",
                        "Browse Syllabus",
                        "/subjects/" + firstSubject.getId()
                ));
            }

            return new RecommendationResponse("NO_ATTEMPTS", 0.0, 0, items);
        }

        // CASE 2: Student has attempts. Evaluate latest performance per quiz
        Map<Long, QuizAttempt> latestAttemptByQuiz = new HashMap<>();
        Set<Long> attemptedSubjectIds = new HashSet<>();
        double totalScoreSum = 0;
        int totalQuestionsSum = 0;

        for (QuizAttempt attempt : attempts) {
            totalScoreSum += attempt.getScore();
            totalQuestionsSum += attempt.getTotalQuestions();

            Long qId = attempt.getQuiz().getId();
            if (!latestAttemptByQuiz.containsKey(qId)) {
                latestAttemptByQuiz.put(qId, attempt);
            }
            if (attempt.getQuiz().getSubject() != null) {
                attemptedSubjectIds.add(attempt.getQuiz().getSubject().getId());
            }
        }

        double overallAccuracy = totalQuestionsSum > 0
                ? Math.round((totalScoreSum * 10000.0) / totalQuestionsSum) / 100.0
                : 0.0;

        String generalStatus = overallAccuracy < 60.0
                ? "NEEDS_REVISION"
                : (overallAccuracy < 85.0 ? "PRACTICING" : "MASTERY");

        // Rule-based evaluation per attempted quiz
        for (QuizAttempt attempt : latestAttemptByQuiz.values()) {
            Quiz quiz = attempt.getQuiz();
            Subject subject = quiz.getSubject();
            Long subId = subject != null ? subject.getId() : null;
            String subName = subject != null ? subject.getName() : "Curriculum";

            double pct = attempt.getTotalQuestions() > 0
                    ? Math.round((attempt.getScore() * 10000.0) / attempt.getTotalQuestions()) / 100.0
                    : 0.0;

            // Fetch subject's chapters for targeted material links
            List<Chapter> subjectChapters = subId != null
                    ? chapterRepository.findAll().stream()
                            .filter(c -> c.getSubject() != null && c.getSubject().getId().equals(subId))
                            .toList()
                    : List.of();

            String chapterName = !subjectChapters.isEmpty() ? subjectChapters.get(0).getName() : null;
            Long chapterId = !subjectChapters.isEmpty() ? subjectChapters.get(0).getId() : null;

            if (pct < 60.0) {
                // Rule 1: Below 60% -> High-priority revision
                items.add(new RecommendationItem(
                        "REVISION",
                        "HIGH",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Latest attempt scored %.1f%% on '%s'. High-priority revision of fundamental chapter materials is strongly recommended.", pct, quiz.getTitle()),
                        "Review Study Notes",
                        subId != null ? "/subjects/" + subId : "/subjects"
                ));
                items.add(new RecommendationItem(
                        "PRACTICE",
                        "HIGH",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Retake '%s' after revision to reinforce concepts and earn additional XP points.", quiz.getTitle()),
                        "Retake Quiz",
                        "/quizzes/" + quiz.getId()
                ));
            } else if (pct < 70.0) {
                // Rule 2: 60-69% -> Moderate priority practice & material review
                items.add(new RecommendationItem(
                        "REVISION",
                        "MEDIUM",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Scored %.1f%% on '%s'. Reviewing core chapter topics will help close remaining conceptual gaps.", pct, quiz.getTitle()),
                        "Review Chapter Materials",
                        subId != null ? "/subjects/" + subId : "/subjects"
                ));
                items.add(new RecommendationItem(
                        "PRACTICE",
                        "MEDIUM",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Retake '%s' to boost your score above 70%% and advance towards the next rank tier.", quiz.getTitle()),
                        "Practice Retake",
                        "/quizzes/" + quiz.getId()
                ));
            } else if (pct < 85.0) {
                // Rule 3: 70-84% -> Good mastery, targeted challenge
                items.add(new RecommendationItem(
                        "PRACTICE",
                        "LOW",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Good mastery (%.1f%%) on '%s'. Practicing edge cases will help achieve a top score.", pct, quiz.getTitle()),
                        "Perfect Your Score",
                        "/quizzes/" + quiz.getId()
                ));
            } else {
                // Rule 4: 85% and above -> Mastery achieved, recommend progression
                items.add(new RecommendationItem(
                        "ADVANCEMENT",
                        "LOW",
                        subId,
                        subName,
                        quiz.getId(),
                        quiz.getTitle(),
                        chapterId,
                        chapterName,
                        String.format("Outstanding mastery (%.1f%%) on '%s'! You have mastered this module.", pct, quiz.getTitle()),
                        "Explore Higher Challenges",
                        "/quizzes"
                ));
            }
        }

        // Recommend unattempted subjects if any exist
        for (Subject sub : allSubjects) {
            if (!attemptedSubjectIds.contains(sub.getId())) {
                items.add(new RecommendationItem(
                        "EXPLORATION",
                        "MEDIUM",
                        sub.getId(),
                        sub.getName(),
                        null,
                        null,
                        null,
                        null,
                        "You haven't explored " + sub.getName() + " yet. Broaden your domain expertise by studying its chapters.",
                        "Start " + sub.getName(),
                        "/subjects/" + sub.getId()
                ));
            }
        }

        return new RecommendationResponse(generalStatus, overallAccuracy, attempts.size(), items);
    }
}
