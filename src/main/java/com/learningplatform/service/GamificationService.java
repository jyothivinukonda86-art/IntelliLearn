
package com.learningplatform.service;

import java.util.List;

import com.learningplatform.dto.BadgeResponse;
import com.learningplatform.dto.GamificationResponse;
import com.learningplatform.dto.LeaderboardEntryResponse;

public interface GamificationService {

    GamificationResponse getMyGamification();

    void awardXp(String email, int xp);

    List<LeaderboardEntryResponse> getLeaderboard();

    List<BadgeResponse> getMyBadges();
}
