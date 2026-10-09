package com.learningplatform.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.dto.BadgeResponse;
import com.learningplatform.dto.GamificationResponse;
import com.learningplatform.dto.LeaderboardEntryResponse;
import com.learningplatform.service.GamificationService;

@RestController
@RequestMapping("/api/gamification")
public class GamificationController {

    private final GamificationService gamificationService;

    public GamificationController(GamificationService gamificationService) {
        this.gamificationService = gamificationService;
    }

    @GetMapping("/me")
    public ResponseEntity<GamificationResponse> getMyGamification() {
        return ResponseEntity.ok(gamificationService.getMyGamification());
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntryResponse>> getLeaderboard() {
        return ResponseEntity.ok(gamificationService.getLeaderboard());
    }

    @GetMapping("/badges")
    public ResponseEntity<List<BadgeResponse>> getMyBadges() {
        return ResponseEntity.ok(gamificationService.getMyBadges());
    }
}
