import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectService } from '../services/subjectService';
import { chapterService } from '../services/chapterService';
import { materialService } from '../services/materialService';
import { quizService } from '../services/quizService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  BookOpen,
  Layers,
  FileText,
  Video,
  FileDown,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
  Clock,
  HelpCircle,
  X,
  Award,
  Download
} from 'lucide-react';

export const SubjectDetailPage = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [materialsByChapter, setMaterialsByChapter] = useState({});
  const [quizzesByChapter, setQuizzesByChapter] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Video Player Modal state
  const [videoModal, setVideoModal] = useState({ isOpen: false, title: '', embedUrl: '', rawUrl: '' });

  useEffect(() => {
    const fetchSubjectAndChapters = async () => {
      try {
        setLoading(true);
        setError(null);
        const [subData, chapData] = await Promise.all([
          subjectService.getSubjectById(id),
          chapterService.getChaptersBySubject(id),
        ]);
        setSubject(subData);
        const chapterList = Array.isArray(chapData) ? chapData : [];
        setChapters(chapterList);

        // Automatically expand and load resources for all 3 chapters so the student has immediate access
        const initialExpanded = {};
        chapterList.forEach((chap) => {
          initialExpanded[chap.id] = true;
          fetchChapterData(chap.id);
        });
        setExpandedChapters(initialExpanded);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load subject details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectAndChapters();
  }, [id]);

  const fetchChapterData = async (chapterId) => {
    // Fetch materials and chapter quizzes in parallel
    try {
      const [matData, quizData] = await Promise.all([
        materialService.getMaterialsByChapter(chapterId).catch(() => []),
        quizService.getQuizzesByChapter(chapterId).catch(() => []),
      ]);

      setMaterialsByChapter((prev) => ({
        ...prev,
        [chapterId]: Array.isArray(matData) ? matData : [],
      }));

      setQuizzesByChapter((prev) => ({
        ...prev,
        [chapterId]: Array.isArray(quizData) ? quizData : [],
      }));
    } catch (err) {
      console.error(`Error loading data for chapter ${chapterId}:`, err);
    }
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => {
      const newState = !prev[chapterId];
      if (newState && !materialsByChapter[chapterId]) {
        fetchChapterData(chapterId);
      }
      return { ...prev, [chapterId]: newState };
    });
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
  };

  const openVideoModal = (title, url) => {
    const embedUrl = getYouTubeEmbedUrl(url);
    setVideoModal({
      isOpen: true,
      title,
      embedUrl,
      rawUrl: url,
    });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, title: '', embedUrl: '', rawUrl: '' });
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Organize chapter materials into the 3 standardized slots:
  // 1. Detailed Notes PDF
  // 2. Quick Revision Notes PDF
  // 3. YouTube Lecture
  const organizeMaterials = (materials = []) => {
    let detailedNotes = null;
    let revisionNotes = null;
    let videoLecture = null;

    materials.forEach((mat) => {
      const type = (mat.type || '').toUpperCase();
      const title = (mat.title || '').toLowerCase();
      if (type.includes('VIDEO') || title.includes('lecture') || title.includes('video')) {
        videoLecture = mat;
      } else if (title.includes('revision') || title.includes('quick') || title.includes('cheatsheet')) {
        revisionNotes = mat;
      } else {
        detailedNotes = mat;
      }
    });

    return { detailedNotes, revisionNotes, videoLecture };
  };

  // Group chapter quizzes by difficulty: Easy (5), Medium (7), Hard (10)
  const organizeQuizzes = (quizzes = []) => {
    const easy = quizzes.find((q) => (q.difficulty || '').toUpperCase() === 'EASY');
    const medium = quizzes.find((q) => (q.difficulty || '').toUpperCase() === 'MEDIUM');
    const hard = quizzes.find((q) => (q.difficulty || '').toUpperCase() === 'HARD');
    return { easy, medium, hard };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-medium">Loading syllabus chapters and standardized learning resources...</p>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-rose-900">Subject Not Found</h3>
        <p className="text-xs text-rose-700 mt-1 mb-6">{error || 'This subject could not be retrieved.'}</p>
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Breadcrumbs
        items={[
          { label: 'Curriculum Subjects', path: '/subjects' },
          { label: subject.name },
        ]}
      />

      {/* Subject Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Standardized 3-Chapter Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {subject.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {subject.description || 'Comprehensive curriculum study material and chapter modules.'}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>3 Structured Chapters</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Detailed & Revision PDFs</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Video className="w-4 h-4 text-rose-500" />
                <span>YouTube Masterclasses</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Easy, Medium & Hard Quizzes</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to={`/quizzes?subjectId=${subject.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>View All Subject Quizzes</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Chapters & Standardized Materials Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Curriculum Chapters ({chapters.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Structured learning path from fundamentals to mastery</span>
        </div>

        {chapters.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">No Chapters Available</h3>
            <p className="text-xs text-slate-500">Chapters are being initialized for this subject.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chapters.map((chapter, index) => {
              const isExpanded = !!expandedChapters[chapter.id];
              const materials = materialsByChapter[chapter.id];
              const quizzes = quizzesByChapter[chapter.id];
              const { detailedNotes, revisionNotes, videoLecture } = organizeMaterials(materials);
              const { easy: easyQuiz, medium: medQuiz, hard: hardQuiz } = organizeQuizzes(quizzes);

              return (
                <div
                  key={chapter.id}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {/* Chapter Accordion Header */}
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                            Chapter {index + 1}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] font-medium text-slate-500">
                            3 Learning Resources & 3 Quiz Tiers
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {chapter.name}
                        </h3>
                        {chapter.description && (
                          <p className="text-xs text-slate-600 mt-1 line-clamp-1 sm:line-clamp-none max-w-3xl">
                            {chapter.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        Standardized Content
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Chapter Content Area */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-6">
                      {/* 1. STANDARDIZED LEARNING RESOURCES */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Standardized Learning Resources
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Detailed Notes • Quick Revision • Video Lecture
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* RESOURCE 1: DETAILED NOTES PDF */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-indigo-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                                  <FileText className="w-3 h-3 text-amber-600" />
                                  Detailed Notes PDF
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400">PDF 1.4</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {detailedNotes?.title || `${chapter.name} - Detailed Notes`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {detailedNotes?.description || 'Comprehensive notes covering core theory, syntax, definitions, examples, and architectural diagrams.'}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                              <a
                                href={detailedNotes?.fileUrl || `/notes/java_ch${index + 1}_detailed_notes.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open PDF</span>
                              </a>
                              <button
                                onClick={() =>
                                  handleDownload(
                                    detailedNotes?.fileUrl || `/notes/java_ch${index + 1}_detailed_notes.pdf`,
                                    `${chapter.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_detailed_notes.pdf`
                                  )
                                }
                                className="inline-flex items-center justify-center p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                title="Download Detailed Notes PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* RESOURCE 2: QUICK REVISION NOTES PDF */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-emerald-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <Sparkles className="w-3 h-3 text-emerald-600" />
                                  Revision Notes PDF
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400">Cheat Sheet</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {revisionNotes?.title || `${chapter.name} - Quick Revision Notes`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {revisionNotes?.description || 'Concise revision cheat sheet with bullet points, high-yield definitions, and essential exam takeaways.'}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                              <a
                                href={revisionNotes?.fileUrl || `/notes/java_ch${index + 1}_revision_notes.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open PDF</span>
                              </a>
                              <button
                                onClick={() =>
                                  handleDownload(
                                    revisionNotes?.fileUrl || `/notes/java_ch${index + 1}_revision_notes.pdf`,
                                    `${chapter.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_revision_notes.pdf`
                                  )
                                }
                                className="inline-flex items-center justify-center p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                title="Download Quick Revision Notes PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* RESOURCE 3: YOUTUBE MASTERCLASS LECTURE */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-rose-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                                  <Video className="w-3 h-3 text-rose-600" />
                                  YouTube Lecture
                                </span>
                                <span className="text-[10px] font-semibold text-rose-600">Full Video</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {videoLecture?.title || `${chapter.name} - Masterclass Lecture`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {videoLecture?.description || 'Curated high-definition video masterclass covering this chapter concepts in depth.'}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                              <button
                                onClick={() =>
                                  openVideoModal(
                                    videoLecture?.title || `${chapter.name} - Masterclass Lecture`,
                                    videoLecture?.fileUrl
                                  )
                                }
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Watch Lecture</span>
                              </button>
                              {videoLecture?.fileUrl && (
                                <a
                                  href={videoLecture.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                                  title="Open on YouTube directly"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. STANDARDIZED CHAPTER-WISE QUIZZES */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-indigo-600" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Chapter Assessment Quizzes
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Earn up to +100 XP per tier • Automated grading & explanations
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* TIER 1: EASY (5 QUESTIONS · 5 MINS) */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-emerald-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="easy">Easy Tier</Badge>
                                <span className="text-[11px] font-semibold text-emerald-600">5 Qs • 5m</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {easyQuiz?.title || `${chapter.name} (Easy)`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {easyQuiz?.description || 'Foundational core definitions, syntax, and fundamental questions.'}
                              </p>
                              <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  <Zap className="w-3 h-3 text-emerald-600" />
                                  +10 XP / Correct
                                </span>
                                <span>Max: 50 XP</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100">
                              {easyQuiz ? (
                                <Link
                                  to={`/quizzes/${easyQuiz.id}/take`}
                                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Start Easy Quiz</span>
                                </Link>
                              ) : (
                                <span className="w-full inline-flex items-center justify-center py-1.5 text-xs text-slate-400 bg-slate-100 rounded-lg font-medium">
                                  Preparing Quiz...
                                </span>
                              )}
                            </div>
                          </div>

                          {/* TIER 2: MEDIUM (7 QUESTIONS · 10 MINS) */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-amber-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="medium">Medium Tier</Badge>
                                <span className="text-[11px] font-semibold text-amber-600">7 Qs • 10m</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {medQuiz?.title || `${chapter.name} (Medium)`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {medQuiz?.description || 'Intermediate concepts, logical operations, and applied chapter problems.'}
                              </p>
                              <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                                <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                  <Zap className="w-3 h-3 text-amber-600" />
                                  +10 XP / Correct
                                </span>
                                <span>Max: 70 XP</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100">
                              {medQuiz ? (
                                <Link
                                  to={`/quizzes/${medQuiz.id}/take`}
                                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Start Medium Quiz</span>
                                </Link>
                              ) : (
                                <span className="w-full inline-flex items-center justify-center py-1.5 text-xs text-slate-400 bg-slate-100 rounded-lg font-medium">
                                  Preparing Quiz...
                                </span>
                              )}
                            </div>
                          </div>

                          {/* TIER 3: HARD (10 QUESTIONS · 15 MINS) */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-purple-300 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="hard">Hard Tier</Badge>
                                <span className="text-[11px] font-semibold text-purple-600">10 Qs • 15m</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {hardQuiz?.title || `${chapter.name} (Hard)`}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                                {hardQuiz?.description || 'Advanced internals, architecture edge cases, and rigorous technical questions.'}
                              </p>
                              <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                                <span className="inline-flex items-center gap-1 font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                                  <Zap className="w-3 h-3 text-purple-600" />
                                  +10 XP / Correct
                                </span>
                                <span>Max: 100 XP</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100">
                              {hardQuiz ? (
                                <Link
                                  to={`/quizzes/${hardQuiz.id}/take`}
                                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Start Hard Quiz</span>
                                </Link>
                              ) : (
                                <span className="w-full inline-flex items-center justify-center py-1.5 text-xs text-slate-400 bg-slate-100 rounded-lg font-medium">
                                  Preparing Quiz...
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* YOUTUBE LECTURE VIDEO MODAL */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full border border-slate-200 animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm font-bold truncate max-w-md">
                  {videoModal.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {videoModal.rawUrl && (
                  <a
                    href={videoModal.rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    <span>Open YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={closeVideoModal}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Video Player Body */}
            <div className="relative aspect-video bg-black">
              {videoModal.embedUrl ? (
                <iframe
                  src={videoModal.embedUrl}
                  title={videoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                  <AlertCircle className="w-10 h-10 text-amber-500 mb-2" />
                  <p className="text-sm font-semibold text-white">Video stream link unavailable</p>
                  <a
                    href={videoModal.rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                  >
                    Watch Directly on YouTube
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Curated academic lecture resource</span>
              <button
                onClick={closeVideoModal}
                className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
