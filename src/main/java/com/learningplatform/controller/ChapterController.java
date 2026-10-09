package com.learningplatform.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learningplatform.entity.Chapter;
import com.learningplatform.service.ChapterService;

@RestController
@RequestMapping("/api/chapters")
@CrossOrigin(origins = "http://localhost:3000")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @PostMapping
    public ResponseEntity<Chapter> createChapter(@RequestBody Chapter chapter) {
        return ResponseEntity.ok(chapterService.createChapter(chapter));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Chapter>> getChaptersBySubject(
            @PathVariable Long subjectId) {
        return ResponseEntity.ok(
                chapterService.getChaptersBySubject(subjectId)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChapter(@PathVariable Long id) {
        chapterService.deleteChapter(id);
        return ResponseEntity.ok("Chapter deleted successfully");
    }
}