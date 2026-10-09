package com.learningplatform.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learningplatform.dto.QuestionRequest;
import com.learningplatform.dto.QuestionResponse;
import com.learningplatform.dto.QuestionReviewResponse;
import com.learningplatform.dto.QuizRequest;
import com.learningplatform.dto.QuizResponse;
import com.learningplatform.dto.QuizResultResponse;
import com.learningplatform.dto.QuizSubmissionRequest;
import com.learningplatform.entity.Chapter;
import com.learningplatform.entity.Question;
import com.learningplatform.entity.Quiz;
import com.learningplatform.entity.QuizAttempt;
import com.learningplatform.entity.Subject;
import com.learningplatform.entity.User;
import com.learningplatform.repository.ChapterRepository;
import com.learningplatform.repository.QuizAttemptRepository;
import com.learningplatform.repository.QuizRepository;
import com.learningplatform.repository.SubjectRepository;
import com.learningplatform.repository.UserRepository;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final SubjectRepository subjectRepository;
    private final ChapterRepository chapterRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    public QuizServiceImpl(
            QuizRepository quizRepository,
            SubjectRepository subjectRepository,
            ChapterRepository chapterRepository,
            QuizAttemptRepository quizAttemptRepository,
            UserRepository userRepository,
            GamificationService gamificationService) {
        this.quizRepository = quizRepository;
        this.subjectRepository = subjectRepository;
        this.chapterRepository = chapterRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.userRepository = userRepository;
        this.gamificationService = gamificationService;
    }

    @Override
    @Transactional
    public QuizResponse createQuiz(QuizRequest request) {
        Subject subject = null;
        if (request.getSubjectId() != null) {
            subject = subjectRepository.findById(request.getSubjectId()).orElse(null);
        }

        Chapter chapter = null;
        if (request.getChapterId() != null) {
            chapter = chapterRepository.findById(request.getChapterId()).orElse(null);
            if (subject == null && chapter != null) {
                subject = chapter.getSubject();
            }
        }

        if (subject == null && chapter == null) {
            throw new RuntimeException("Subject or Chapter must be specified for a quiz");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setDifficulty(request.getDifficulty());
        quiz.setSubject(subject);
        quiz.setChapter(chapter);

        List<Question> questions = new ArrayList<>();

        if (request.getQuestions() != null) {
            for (QuestionRequest questionRequest : request.getQuestions()) {
                Question question = new Question();
                question.setQuestionText(questionRequest.getQuestionText());
                question.setOptionA(questionRequest.getOptionA());
                question.setOptionB(questionRequest.getOptionB());
                question.setOptionC(questionRequest.getOptionC());
                question.setOptionD(questionRequest.getOptionD());
                question.setCorrectAnswer(questionRequest.getCorrectAnswer());
                question.setExplanation(questionRequest.getExplanation());
                question.setQuiz(quiz);

                questions.add(question);
            }
        }

        quiz.setQuestions(questions);
        Quiz savedQuiz = quizRepository.save(quiz);

        return mapToQuizResponse(savedQuiz);
    }

    @Override
    @Transactional(readOnly = true)
    public QuizResponse getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return mapToQuizResponse(quiz);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResponse> getAllQuizzes() {
        return quizRepository.findAll()
                .stream()
                .map(this::mapToQuizResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResponse> getQuizzesBySubject(Long subjectId) {
        return quizRepository.findBySubjectId(subjectId)
                .stream()
                .map(this::mapToQuizResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResponse> getQuizzesByChapter(Long chapterId) {
        return quizRepository.findByChapterId(chapterId)
                .stream()
                .map(this::mapToQuizResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResponse> getQuizzes(Long subjectId, String difficulty) {
        return getQuizzes(subjectId, null, difficulty);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResponse> getQuizzes(Long subjectId, Long chapterId, String difficulty) {
        List<Quiz> quizzes;

        boolean hasSubject = subjectId != null && subjectId > 0;
        boolean hasChapter = chapterId != null && chapterId > 0;
        boolean hasDifficulty = difficulty != null && !difficulty.trim().isEmpty() && !"ALL".equalsIgnoreCase(difficulty.trim());

        if (hasChapter && hasDifficulty) {
            quizzes = quizRepository.findByChapterIdAndDifficultyIgnoreCase(chapterId, difficulty.trim());
        } else if (hasChapter) {
            quizzes = quizRepository.findByChapterId(chapterId);
        } else if (hasSubject && hasDifficulty) {
            quizzes = quizRepository.findBySubjectIdAndDifficultyIgnoreCase(subjectId, difficulty.trim());
        } else if (hasSubject) {
            quizzes = quizRepository.findBySubjectId(subjectId);
        } else if (hasDifficulty) {
            quizzes = quizRepository.findByDifficultyIgnoreCase(difficulty.trim());
        } else {
            quizzes = quizRepository.findAll();
        }

        return quizzes.stream()
                .map(this::mapToQuizResponse)
                .toList();
    }

    private QuizResponse mapToQuizResponse(Quiz quiz) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setDescription(quiz.getDescription());
        response.setDifficulty(quiz.getDifficulty());
        if (quiz.getSubject() != null) {
            response.setSubjectId(quiz.getSubject().getId());
        }
        if (quiz.getChapter() != null) {
            response.setChapterId(quiz.getChapter().getId());
            response.setChapterName(quiz.getChapter().getName());
        }

        List<QuestionResponse> questionResponses = new ArrayList<>();
        if (quiz.getQuestions() != null) {
            for (Question question : quiz.getQuestions()) {
                QuestionResponse questionResponse = new QuestionResponse();
                questionResponse.setId(question.getId());
                questionResponse.setQuestionText(question.getQuestionText());
                questionResponse.setOptionA(question.getOptionA());
                questionResponse.setOptionB(question.getOptionB());
                questionResponse.setOptionC(question.getOptionC());
                questionResponse.setOptionD(question.getOptionD());
                // Never expose correctAnswer or explanation here
                questionResponses.add(questionResponse);
            }
        }

        response.setQuestions(questionResponses);
        return response;
    }

    @Override
    @Transactional
    public QuizResultResponse submitQuiz(Long quizId, QuizSubmissionRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.getQuestions() == null || quiz.getQuestions().isEmpty()) {
            throw new RuntimeException("Quiz has no questions");
        }

        int score = 0;
        int totalQuestions = quiz.getQuestions().size();
        List<QuestionReviewResponse> reviews = new ArrayList<>();

        for (Question question : quiz.getQuestions()) {
            String selectedAnswer = request.getAnswers() == null
                    ? null
                    : request.getAnswers().get(question.getId());

            boolean isCorrect = false;
            if (selectedAnswer != null
                    && question.getCorrectAnswer() != null
                    && selectedAnswer.trim().equalsIgnoreCase(question.getCorrectAnswer().trim())) {
                score++;
                isCorrect = true;
            }

            reviews.add(new QuestionReviewResponse(
                    question.getId(),
                    question.getQuestionText(),
                    question.getOptionA(),
                    question.getOptionB(),
                    question.getOptionC(),
                    question.getOptionD(),
                    selectedAnswer,
                    question.getCorrectAnswer(),
                    isCorrect,
                    question.getExplanation() != null ? question.getExplanation() : "Standard topic concept review."
            ));
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setScore(score);
        attempt.setTotalQuestions(totalQuestions);

        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);
        int xpEarned = score * 10;
        gamificationService.awardXp(email, xpEarned);

        QuizResultResponse response = new QuizResultResponse();
        response.setAttemptId(savedAttempt.getId());
        response.setScore(score);
        response.setTotalQuestions(totalQuestions);
        response.setCorrectCount(score);
        response.setIncorrectCount(totalQuestions - score);
        response.setXpEarned(xpEarned);
        response.setPercentage(
                Math.round((score * 10000.0) / totalQuestions) / 100.0);
        response.setMessage("Quiz submitted successfully");
        response.setReviews(reviews);

        return response;
    }
}
