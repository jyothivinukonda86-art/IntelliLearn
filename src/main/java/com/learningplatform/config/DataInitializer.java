package com.learningplatform.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.learningplatform.config.QuizSeed.QuestionSeed;
import com.learningplatform.entity.Chapter;
import com.learningplatform.entity.LearningMaterial;
import com.learningplatform.entity.Question;
import com.learningplatform.entity.Quiz;
import com.learningplatform.entity.Subject;
import com.learningplatform.repository.ChapterRepository;
import com.learningplatform.repository.LearningMaterialRepository;
import com.learningplatform.repository.QuestionRepository;
import com.learningplatform.repository.QuizRepository;
import com.learningplatform.repository.SubjectRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final SubjectRepository subjectRepository;
    private final ChapterRepository chapterRepository;
    private final LearningMaterialRepository materialRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public DataInitializer(
            SubjectRepository subjectRepository,
            ChapterRepository chapterRepository,
            LearningMaterialRepository materialRepository,
            QuizRepository quizRepository,
            QuestionRepository questionRepository) {
        this.subjectRepository = subjectRepository;
        this.chapterRepository = chapterRepository;
        this.materialRepository = materialRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Starting standardized curriculum, learning materials, and chapter-wise quiz seeding...");
        seedStandardizedCurriculum();
        log.info("Standardized curriculum seeding completed successfully.");
    }

    private void seedStandardizedCurriculum() {
        // 1. Subjects
        Subject javaSub = getOrCreateSubject("Java Programming",
                "Learn Java programming from fundamentals, OOP, to advanced collections and concurrency.");
        Subject dbmsSub = getOrCreateSubject("Database Management Systems",
                "Relational algebra, normal forms, transaction management, indexing, and SQL.");
        Subject osSub = getOrCreateSubject("Operating Systems",
                "Process management, CPU scheduling, concurrency, virtual memory, and storage architecture.");
        Subject seSub = getOrCreateSubject("Software Engineering",
                "Software development lifecycles, Agile Scrum, SOLID design principles, and quality testing.");

        // 2. Standardized 3 Chapters per subject
        List<Chapter> javaChapters = ensureSubjectChapters(javaSub, List.of(
                new ChapterSpec("Java Fundamentals & Control Structures",
                        "Java syntax, primitive data types, operators, branching statements, loops, and methods.", "java", 1, "https://www.youtube.com/watch?v=xk4_1vDrzzo"),
                new ChapterSpec("Object-Oriented Programming & Collections",
                        "Classes, encapsulation, inheritance, polymorphism, abstract classes, interfaces, and Java Collections Framework.", "java", 2, "https://www.youtube.com/watch?v=A74TOX803D0"),
                new ChapterSpec("Multithreading & JVM Architecture",
                        "Concurrency, threads, synchronization, memory model, class loading, garbage collection, and JVM internals.", "java", 3, "https://www.youtube.com/watch?v=r_MbozD32eo")
        ));

        List<Chapter> dbmsChapters = ensureSubjectChapters(dbmsSub, List.of(
                new ChapterSpec("Relational Model & SQL",
                        "Relational data model, relational algebra, SQL DDL/DML, joins, subqueries, and views.", "dbms", 1, "https://www.youtube.com/watch?v=HXV3zeQKqGY"),
                new ChapterSpec("Normalization & Indexing",
                        "Functional dependencies, 1NF to BCNF, B-trees, clustered and non-clustered indexes, and query optimization.", "dbms", 2, "https://www.youtube.com/watch?v=5ds-_a_q6iY"),
                new ChapterSpec("Transactions & Concurrency Control",
                        "ACID properties, transaction states, serializability, two-phase locking, MVCC, and recovery techniques.", "dbms", 3, "https://www.youtube.com/watch?v=e_Z_gU2v7sY")
        ));

        List<Chapter> osChapters = ensureSubjectChapters(osSub, List.of(
                new ChapterSpec("OS Architecture & Process Management",
                        "Dual-mode operations, system calls, process control blocks, fork(), and inter-process communication.", "os", 1, "https://www.youtube.com/watch?v=26QPDBe-NB8"),
                new ChapterSpec("CPU Scheduling & Synchronization",
                        "Preemptive scheduling algorithms, critical sections, semaphores, mutexes, and deadlock handling.", "os", 2, "https://www.youtube.com/watch?v=EWkqlLflcrg"),
                new ChapterSpec("Memory Management & Storage Systems",
                        "Paging, page tables, TLB, virtual memory, page replacement algorithms, and file system architecture.", "os", 3, "https://www.youtube.com/watch?v=qZXzxbCOmFY")
        ));

        List<Chapter> seChapters = ensureSubjectChapters(seSub, List.of(
                new ChapterSpec("Software Lifecycle & Agile Methodologies",
                        "SDLC phases, Waterfall, V-Model, Agile Manifesto, Scrum framework, user stories, and Kanban.", "se", 1, "https://www.youtube.com/watch?v=4p1gK3eXQpM"),
                new ChapterSpec("Object-Oriented Design & Architectural Patterns",
                        "SOLID principles, GoF design patterns, Hexagonal architecture, Clean Architecture, and microservices.", "se", 2, "https://www.youtube.com/watch?v=v-XeaTj9nmg"),
                new ChapterSpec("Quality Assurance, DevOps & CI/CD",
                        "Testing pyramid, unit and integration testing, TDD/BDD, Git workflows, Docker, and CI/CD automation.", "se", 3, "https://www.youtube.com/watch?v=0yWAtQ6wYNM")
        ));

        // 3. Seed Standardized Chapter Quizzes (36 quizzes, 264 questions)
        // Java
        seedChapterQuiz(javaSub, javaChapters.get(0), JavaQuizData.getCh1Easy(), 1L);
        seedChapterQuiz(javaSub, javaChapters.get(0), JavaQuizData.getCh1Medium(), null);
        seedChapterQuiz(javaSub, javaChapters.get(0), JavaQuizData.getCh1Hard(), null);

        seedChapterQuiz(javaSub, javaChapters.get(1), JavaQuizData.getCh2Easy(), null);
        seedChapterQuiz(javaSub, javaChapters.get(1), JavaQuizData.getCh2Medium(), 4L);
        seedChapterQuiz(javaSub, javaChapters.get(1), JavaQuizData.getCh2Hard(), null);

        seedChapterQuiz(javaSub, javaChapters.get(2), JavaQuizData.getCh3Easy(), null);
        seedChapterQuiz(javaSub, javaChapters.get(2), JavaQuizData.getCh3Medium(), null);
        seedChapterQuiz(javaSub, javaChapters.get(2), JavaQuizData.getCh3Hard(), 5L);

        // DBMS
        seedChapterQuiz(dbmsSub, dbmsChapters.get(0), DbmsQuizData.getCh1Easy(), 6L);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(0), DbmsQuizData.getCh1Medium(), null);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(0), DbmsQuizData.getCh1Hard(), null);

        seedChapterQuiz(dbmsSub, dbmsChapters.get(1), DbmsQuizData.getCh2Easy(), null);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(1), DbmsQuizData.getCh2Medium(), 2L);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(1), DbmsQuizData.getCh2Hard(), null);

        seedChapterQuiz(dbmsSub, dbmsChapters.get(2), DbmsQuizData.getCh3Easy(), null);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(2), DbmsQuizData.getCh3Medium(), null);
        seedChapterQuiz(dbmsSub, dbmsChapters.get(2), DbmsQuizData.getCh3Hard(), 7L);

        // OS
        seedChapterQuiz(osSub, osChapters.get(0), OsQuizData.getCh1Easy(), 8L);
        seedChapterQuiz(osSub, osChapters.get(0), OsQuizData.getCh1Medium(), null);
        seedChapterQuiz(osSub, osChapters.get(0), OsQuizData.getCh1Hard(), null);

        seedChapterQuiz(osSub, osChapters.get(1), OsQuizData.getCh2Easy(), null);
        seedChapterQuiz(osSub, osChapters.get(1), OsQuizData.getCh2Medium(), 3L);
        seedChapterQuiz(osSub, osChapters.get(1), OsQuizData.getCh2Hard(), null);

        seedChapterQuiz(osSub, osChapters.get(2), OsQuizData.getCh3Easy(), null);
        seedChapterQuiz(osSub, osChapters.get(2), OsQuizData.getCh3Medium(), null);
        seedChapterQuiz(osSub, osChapters.get(2), OsQuizData.getCh3Hard(), 9L);

        // Software Engineering
        seedChapterQuiz(seSub, seChapters.get(0), SeQuizData.getCh1Easy(), 10L);
        seedChapterQuiz(seSub, seChapters.get(0), SeQuizData.getCh1Medium(), null);
        seedChapterQuiz(seSub, seChapters.get(0), SeQuizData.getCh1Hard(), null);

        seedChapterQuiz(seSub, seChapters.get(1), SeQuizData.getCh2Easy(), null);
        seedChapterQuiz(seSub, seChapters.get(1), SeQuizData.getCh2Medium(), 11L);
        seedChapterQuiz(seSub, seChapters.get(1), SeQuizData.getCh2Hard(), null);

        seedChapterQuiz(seSub, seChapters.get(2), SeQuizData.getCh3Easy(), null);
        seedChapterQuiz(seSub, seChapters.get(2), SeQuizData.getCh3Medium(), null);
        seedChapterQuiz(seSub, seChapters.get(2), SeQuizData.getCh3Hard(), 12L);
    }

    private record ChapterSpec(String name, String description, String prefix, int chNum, String ytUrl) {}

    private Subject getOrCreateSubject(String name, String description) {
        return subjectRepository.findAll().stream()
                .filter(s -> s.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    Subject s = new Subject();
                    s.setName(name);
                    s.setDescription(description);
                    return subjectRepository.save(s);
                });
    }

    private List<Chapter> ensureSubjectChapters(Subject subject, List<ChapterSpec> specs) {
        List<Chapter> existing = chapterRepository.findBySubjectId(subject.getId());
        List<Chapter> result = new ArrayList<>();

        for (int i = 0; i < specs.size(); i++) {
            ChapterSpec spec = specs.get(i);
            Chapter chapter;
            if (i < existing.size()) {
                chapter = existing.get(i);
                chapter.setName(spec.name());
                chapter.setDescription(spec.description());
            } else {
                chapter = new Chapter();
                chapter.setName(spec.name());
                chapter.setDescription(spec.description());
                chapter.setSubject(subject);
            }
            chapter = chapterRepository.save(chapter);
            result.add(chapter);

            // Ensure the 3 standardized learning materials for this chapter
            ensureStandardizedMaterials(chapter, spec);
        }

        return result;
    }

    private void ensureStandardizedMaterials(Chapter chapter, ChapterSpec spec) {
        List<LearningMaterial> existing = materialRepository.findByChapterId(chapter.getId());

        String detailedTitle = chapter.getName() + " - Detailed Notes";
        String detailedUrl = "/notes/" + spec.prefix() + "_ch" + spec.chNum() + "_detailed_notes.pdf";
        String revisionTitle = chapter.getName() + " - Quick Revision Notes";
        String revisionUrl = "/notes/" + spec.prefix() + "_ch" + spec.chNum() + "_revision_notes.pdf";
        String lectureTitle = chapter.getName() + " - Masterclass Lecture";

        // 1. Detailed Notes PDF
        upsertMaterial(existing, chapter, detailedTitle,
                "Comprehensive notes covering core concepts, syntax, definitions, examples, and architecture.",
                "PDF", detailedUrl, 0);

        // 2. Quick Revision Notes PDF
        upsertMaterial(existing, chapter, revisionTitle,
                "Concise revision cheat sheet with bullet points, high-yield definitions, and essential exam summaries.",
                "PDF", revisionUrl, 1);

        // 3. YouTube Lecture
        upsertMaterial(existing, chapter, lectureTitle,
                "Curated high-definition video masterclass covering this chapter's concepts in depth.",
                "VIDEO", spec.ytUrl(), 2);
    }

    private void upsertMaterial(List<LearningMaterial> existing, Chapter chapter,
                                String title, String description, String type, String fileUrl, int slot) {
        LearningMaterial m = null;
        if (slot < existing.size()) {
            m = existing.get(slot);
        } else {
            m = new LearningMaterial();
            m.setChapter(chapter);
        }
        m.setTitle(title);
        m.setDescription(description);
        m.setType(type);
        m.setFileUrl(fileUrl);
        materialRepository.save(m);
    }

    private void seedChapterQuiz(Subject subject, Chapter chapter, QuizSeed seed, Long preferredId) {
        Quiz quiz = null;

        // 1. If preferredId is provided, check if that legacy quiz exists
        if (preferredId != null) {
            Optional<Quiz> legacy = quizRepository.findById(preferredId);
            if (legacy.isPresent()) {
                quiz = legacy.get();
            }
        }

        // 2. If not found by legacy ID, check by chapter ID and difficulty
        if (quiz == null) {
            List<Quiz> matches = quizRepository.findByChapterIdAndDifficultyIgnoreCase(chapter.getId(), seed.difficulty());
            if (!matches.isEmpty()) {
                quiz = matches.get(0);
            }
        }

        // 3. Create new if still not found
        if (quiz == null) {
            quiz = new Quiz();
        }

        quiz.setTitle(seed.title());
        quiz.setDescription(seed.description());
        quiz.setDifficulty(seed.difficulty().toUpperCase());
        quiz.setSubject(subject);
        quiz.setChapter(chapter);

        // Save to ensure ID exists
        quiz = quizRepository.save(quiz);

        // Populate questions
        if (quiz.getQuestions() == null) {
            quiz.setQuestions(new ArrayList<>());
        } else {
            quiz.getQuestions().clear();
        }

        for (QuestionSeed qs : seed.questions()) {
            Question q = new Question();
            q.setQuestionText(qs.text());
            q.setOptionA(qs.optionA());
            q.setOptionB(qs.optionB());
            q.setOptionC(qs.optionC());
            q.setOptionD(qs.optionD());
            q.setCorrectAnswer(qs.correctAnswer());
            q.setExplanation(qs.explanation());
            q.setQuiz(quiz);
            quiz.getQuestions().add(q);
        }

        quizRepository.save(quiz);
    }
}
