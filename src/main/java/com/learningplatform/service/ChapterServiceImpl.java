package com.learningplatform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.learningplatform.entity.Chapter;
import com.learningplatform.entity.Subject;
import com.learningplatform.repository.ChapterRepository;
import com.learningplatform.repository.SubjectRepository;

@Service
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final SubjectRepository subjectRepository;

    public ChapterServiceImpl(ChapterRepository chapterRepository,
                              SubjectRepository subjectRepository) {
        this.chapterRepository = chapterRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Chapter createChapter(Chapter chapter) {
        return chapterRepository.save(chapter);
    }

    @Override
    public List<Chapter> getChaptersBySubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return chapterRepository.findAll()
                .stream()
                .filter(chapter -> chapter.getSubject().getId().equals(subject.getId()))
                .toList();
    }

    @Override
    public void deleteChapter(Long id) {
        chapterRepository.deleteById(id);
    }
}