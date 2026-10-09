package com.learningplatform.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learningplatform.entity.GamificationProfile;

public interface GamificationProfileRepository
        extends JpaRepository<GamificationProfile, Long> {

    Optional<GamificationProfile> findByUser_Email(String email);

    List<GamificationProfile> findAllByOrderByTotalXpDesc();
}
