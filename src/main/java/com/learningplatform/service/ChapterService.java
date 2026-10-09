package com.learningplatform.service;

import java.util.List;

import com.learningplatform.entity.Chapter;

public interface ChapterService {

    Chapter createChapter(Chapter chapter);

    List<Chapter> getChaptersBySubject(Long subjectId);

    void deleteChapter(Long id);
}