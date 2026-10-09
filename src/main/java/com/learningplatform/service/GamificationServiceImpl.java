package com.learningplatform.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learningplatform.dto.BadgeResponse;
import com.learningplatform.dto.GamificationResponse;
import com.learningplatform.dto.LeaderboardEntryResponse;
import com.learningplatform.entity.GamificationProfile;
import com.learningplatform.entity.QuizAttempt;
import com.learningplatform.entity.Role;
import com.learningplatform.entity.User;
import com.learningplatform.repository.GamificationProfileRepository;
import com.learningplatform.repository.QuizAttemptRepository;
import com.learningplatform.repository.UserRepository;

@Service
public class GamificationServiceImpl implements GamificationService {

    private final GamificationProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public GamificationServiceImpl(
            GamificationProfileRepository profileRepository,
            UserRepository userRepository,
            QuizAttemptRepository quizAttemptRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @Override
    @Transactional
    public GamificationResponse getMyGamification() {
        String email = getAuthenticatedUserEmail();
        return buildResponse(
                profileRepository.findByUser_Email(email)
                        .orElseGet(() -> createProfile(email)));
    }

    @Override
    @Transactional
    public void awardXp(String email, int xp) {
        if (xp <= 0) {
            return;
        }

        GamificationProfile profile = profileRepository
                .findByUser_Email(email)
                .orElseGet(() -> createProfile(email));

        profile.setTotalXp(profile.getTotalXp() + xp);
        profile.setLevel((profile.getTotalXp() / 100) + 1);

        profileRepository.save(profile);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeaderboardEntryResponse> getLeaderboard() {
        String currentEmail = "";
        try {
            currentEmail = getAuthenticatedUserEmail();
        } catch (Exception ignored) {
        }

        List<GamificationProfile> profiles = profileRepository.findAllByOrderByTotalXpDesc();
        List<LeaderboardEntryResponse> leaderboard = new ArrayList<>();
        int rank = 1;

        for (GamificationProfile profile : profiles) {
            User user = profile.getUser();
            if (user == null || user.getRole() == Role.ADMIN) {
                // Keep leaderboard student-focused; skip admins
                continue;
            }

            String displayName = user.getName();
            if (displayName == null || displayName.trim().isEmpty()) {
                if (user.getEmail() != null && user.getEmail().contains("@")) {
                    displayName = user.getEmail().substring(0, user.getEmail().indexOf("@"));
                } else {
                    displayName = "Learner " + profile.getId();
                }
            }

            boolean isCurrentUser = currentEmail.equalsIgnoreCase(user.getEmail());
            String levelName = getLevelName(profile.getLevel());

            leaderboard.add(new LeaderboardEntryResponse(
                    rank++,
                    displayName,
                    profile.getTotalXp(),
                    profile.getLevel(),
                    levelName,
                    isCurrentUser
            ));
        }

        return leaderboard;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BadgeResponse> getMyBadges() {
        String email = getAuthenticatedUserEmail();
        GamificationProfile profile = profileRepository.findByUser_Email(email)
                .orElseGet(() -> createProfile(email));

        List<QuizAttempt> attempts = quizAttemptRepository.findByUser_EmailOrderByAttemptedAtDesc(email);

        List<BadgeResponse> badges = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        // Badge 1: First Steps (1 quiz attempt)
        int attemptCount = attempts.size();
        boolean firstStepsUnlocked = attemptCount >= 1;
        String firstStepsUnlockedAt = null;
        if (firstStepsUnlocked && !attempts.isEmpty()) {
            QuizAttempt oldest = attempts.get(attempts.size() - 1);
            if (oldest.getAttemptedAt() != null) {
                firstStepsUnlockedAt = oldest.getAttemptedAt().format(formatter);
            }
        }
        badges.add(new BadgeResponse(
                "first_steps",
                "First Steps",
                "Complete your first quiz attempt in the platform",
                "Footprints",
                firstStepsUnlocked,
                firstStepsUnlockedAt,
                Math.min(attemptCount, 1),
                1
        ));

        // Badge 2: Perfect Score (100% on any quiz)
        List<QuizAttempt> perfectAttempts = attempts.stream()
                .filter(a -> a.getTotalQuestions() > 0 && a.getScore() == a.getTotalQuestions())
                .collect(Collectors.toList());
        boolean perfectUnlocked = !perfectAttempts.isEmpty();
        String perfectUnlockedAt = null;
        if (perfectUnlocked) {
            QuizAttempt oldestPerfect = perfectAttempts.get(perfectAttempts.size() - 1);
            if (oldestPerfect.getAttemptedAt() != null) {
                perfectUnlockedAt = oldestPerfect.getAttemptedAt().format(formatter);
            }
        }
        badges.add(new BadgeResponse(
                "perfect_score",
                "Perfect Score",
                "Score a flawless 100% on any quiz assessment",
                "Trophy",
                perfectUnlocked,
                perfectUnlockedAt,
                perfectUnlocked ? 1 : 0,
                1
        ));

        // Badge 3: Century Scholar (Reach 100 XP)
        int currentXp = profile.getTotalXp();
        boolean centuryUnlocked = currentXp >= 100;
        badges.add(new BadgeResponse(
                "century_scholar",
                "Century Scholar",
                "Earn 100 or more total XP across quizzes",
                "Flame",
                centuryUnlocked,
                centuryUnlocked ? "Unlocked" : null,
                Math.min(currentXp, 100),
                100
        ));

        // Badge 4: Quiz Explorer (Attempt quizzes in 3 distinct subjects)
        long distinctSubjects = attempts.stream()
                .map(a -> (a.getQuiz() != null && a.getQuiz().getSubject() != null) ? a.getQuiz().getSubject().getId() : null)
                .filter(Objects::nonNull)
                .distinct()
                .count();
        boolean explorerUnlocked = distinctSubjects >= 3;
        badges.add(new BadgeResponse(
                "quiz_explorer",
                "Quiz Explorer",
                "Attempt quizzes across 3 distinct academic subjects",
                "Compass",
                explorerUnlocked,
                explorerUnlocked ? "Unlocked" : null,
                Math.min((int) distinctSubjects, 3),
                3
        ));

        // Badge 5: High Achiever (Complete 5 quiz attempts)
        boolean highAchieverUnlocked = attemptCount >= 5;
        badges.add(new BadgeResponse(
                "high_achiever",
                "High Achiever",
                "Demonstrate dedication by completing 5 quiz attempts",
                "Award",
                highAchieverUnlocked,
                highAchieverUnlocked ? "Unlocked" : null,
                Math.min(attemptCount, 5),
                5
        ));

        // Badge 6: Consistent Learner (Quizzes across 2 distinct calendar days)
        long distinctDays = attempts.stream()
                .map(a -> a.getAttemptedAt() != null ? a.getAttemptedAt().toLocalDate() : null)
                .filter(Objects::nonNull)
                .distinct()
                .count();
        boolean consistentUnlocked = distinctDays >= 2;
        badges.add(new BadgeResponse(
                "consistent_learner",
                "Consistent Learner",
                "Complete quizzes across at least 2 distinct days",
                "CalendarCheck",
                consistentUnlocked,
                consistentUnlocked ? "Unlocked" : null,
                Math.min((int) distinctDays, 2),
                2
        ));

        return badges;
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User is not authenticated");
        }
        return authentication.getName();
    }

    private GamificationProfile createProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        GamificationProfile profile = new GamificationProfile();
        profile.setUser(user);
        profile.setTotalXp(0);
        profile.setLevel(1);

        return profileRepository.save(profile);
    }

    private String getLevelName(int level) {
        if (level >= 10) {
            return "Master";
        } else if (level >= 5) {
            return "Expert";
        } else if (level >= 3) {
            return "Intermediate";
        } else {
            return "Beginner";
        }
    }

    private GamificationResponse buildResponse(GamificationProfile profile) {
        GamificationResponse response = new GamificationResponse();
        response.setTotalXp(profile.getTotalXp());
        response.setLevel(profile.getLevel());
        response.setLevelName(getLevelName(profile.getLevel()));
        return response;
    }
}
