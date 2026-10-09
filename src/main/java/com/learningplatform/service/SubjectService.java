package com.learningplatform.service;

import java.util.List;

import com.learningplatform.entity.Subject;

public interface SubjectService {

    Subject createSubject(Subject subject);

    List<Subject> getAllSubjects();

    Subject getSubjectById(Long id);

    void deleteSubject(Long id);
}