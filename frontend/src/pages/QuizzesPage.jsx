import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { quizService } from '../services/quizService';
import { subjectService } from '../services/subjectService';
import { chapterService } from '../services/chapterService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  HelpCircle,
  BookOpen,
  Zap,
  Clock,
  Filter,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Play,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';

export const QuizzesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubjectId = searchParams.get('subjectId') || 'ALL';
  const initialChapterId = searchParams.get('chapterId') || 'ALL';
  const initialDifficulty = searchParams.get('difficulty') || 'ALL';

  const [quizzes, setQuizzes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(initialSubjectId);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subData = await subjectService.getAllSubjects();
        setSubjects(Array.isArray(subData) ? subData : []);
      } catch (err) {
        console.error('Error loading subjects:', err);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch chapters when a subject is selected
  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedSubjectId === 'ALL') {
        setChapters([]);
        setSelectedChapterId('ALL');
        return;
      }
      try {
        const chapData = await chapterService.getChaptersBySubject(selectedSubjectId);
        setChapters(Array.isArray(chapData) ? chapData : []);
      } catch (err) {
        console.error('Error loading chapters for subject:', err);
        setChapters([]);
      }
    };
    fetchChapters();
  }, [selectedSubjectId]);

  const fetchQuizzes = async (subjectFilter, chapterFilter, difficultyFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await quizService.getAllQuizzes(
        subjectFilter === 'ALL' ? null : subjectFilter,
        difficultyFilter === 'ALL' ? null : difficultyFilter,
        chapterFilter === 'ALL' ? null : chapterFilter
      );
      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load quizzes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(selectedSubjectId, selectedChapterId, selectedDifficulty);
  }, [selectedSubjectId, selectedChapterId, selectedDifficulty]);

  const handleSubjectFilter = (id) => {
    setSelectedSubjectId(id);
    setSelectedChapterId('ALL');
    const newParams = new URLSearchParams(searchParams);
    if (id === 'ALL') {
      newParams.delete('subjectId');
      newParams.delete('chapterId');
    } else {
      newParams.set('subjectId', id);
      newParams.delete('chapterId');
    }
    setSearchParams(newParams);
  };

  const handleChapterFilter = (chapId) => {
    setSelectedChapterId(chapId);
    const newParams = new URLSearchParams(searchParams);
    if (chapId === 'ALL') {
      newParams.delete('chapterId');
    } else {
      newParams.set('chapterId', chapId);
    }
    setSearchParams(newParams);
  };

  const handleDifficultyFilter = (diff) => {
    setSelectedDifficulty(diff);
    const newParams = new URLSearchParams(searchParams);
    if (diff === 'ALL') {
      newParams.delete('difficulty');
    } else {
      newParams.set('difficulty', diff);
    }
    setSearchParams(newParams);
  };

  const getSubjectName = (subjectId) => {
    const sub = subjects.find((s) => s.id === subjectId);
    return sub ? sub.name : `Subject #${subjectId}`;
  };

  const getDifficultyVariant = (diff) => {
    const d = (diff || 'MEDIUM').toUpperCase();
    if (d === 'EASY') return 'easy';
    if (d === 'HARD') return 'hard';
    return 'medium';
  };

  const getDifficultyMeta = (diff) => {
    const d = (diff || 'MEDIUM').toUpperCase();
    if (d === 'EASY') return { qCount: 5, duration: '5 mins' };
    if (d === 'HARD') return { qCount: 10, duration: '15 mins' };
    return { qCount: 7, duration: '10 mins' };
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const title = (q.title || '').toLowerCase();
    const desc = (q.description || '').toLowerCase();
    const subName = getSubjectName(q.subjectId).toLowerCase();
    const chapName = (q.chapterName || '').toLowerCase();
    return title.includes(query) || desc.includes(query) || subName.includes(query) || chapName.includes(query);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Quiz Arena' }]} />

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Assessment & Mastery Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive Quiz Arena
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Every chapter offers Easy (5 Qs), Medium (7 Qs), and Hard (10 Qs) assessments. Instant automated grading, verified XP rewards, and comprehensive answer explanations.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, chapter, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-3">
        {/* Difficulty Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5" />
            Tier:
          </span>

          {[
            { key: 'ALL', label: 'All Levels' },
            { key: 'EASY', label: 'Easy (5 Qs • 5m)' },
            { key: 'MEDIUM', label: 'Medium (7 Qs • 10m)' },
            { key: 'HARD', label: 'Hard (10 Qs • 15m)' },
          ].map((tab) => {
            const isActive = selectedDifficulty === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleDifficultyFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-100 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0 mr-1">
            <BookOpen className="w-3.5 h-3.5" />
            Subject:
          </span>

          <button
            onClick={() => handleSubjectFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
              selectedSubjectId === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Subjects
          </button>

          {subjects.map((sub) => {
            const isActive = selectedSubjectId === String(sub.id);
            return (
              <button
                key={sub.id}
                onClick={() => handleSubjectFilter(String(sub.id))}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* Chapter Filter (Surfaced when a specific subject is chosen) */}
        {selectedSubjectId !== 'ALL' && chapters.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-100 scrollbar-none">
            <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1.5 shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5" />
              Chapter:
            </span>

            <button
              onClick={() => handleChapterFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedChapterId === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              All Chapters
            </button>

            {chapters.map((chap, i) => {
              const isActive = selectedChapterId === String(chap.id);
              return (
                <button
                  key={chap.id}
                  onClick={() => handleChapterFilter(String(chap.id))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  Ch {i + 1}: {chap.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Loading verified chapter quizzes...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Failed to Load Quizzes</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={() => fetchQuizzes(selectedSubjectId, selectedChapterId, selectedDifficulty)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredQuizzes.length === 0 && (
        <EmptyState
          icon={HelpCircle}
          title="No Quizzes Found"
          description={
            searchQuery
              ? `No quizzes matched "${searchQuery}". Try a different search term or clear the filter.`
              : 'No quizzes match the selected subject, chapter, or difficulty criteria.'
          }
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedSubjectId('ALL');
            setSelectedChapterId('ALL');
            setSelectedDifficulty('ALL');
            setSearchQuery('');
            setSearchParams({});
          }}
        />
      )}

      {/* Quizzes Grid */}
      {!loading && !error && filteredQuizzes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuizzes.map((quiz) => {
            const meta = getDifficultyMeta(quiz.difficulty);
            const questionCount = quiz.questions?.length || meta.qCount;

            return (
              <div
                key={quiz.id}
                className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Subject and Difficulty Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate max-w-[150px]">
                        {getSubjectName(quiz.subjectId)}
                      </span>
                    </span>
                    <Badge variant={getDifficultyVariant(quiz.difficulty)} size="xs">
                      {quiz.difficulty || 'MEDIUM'}
                    </Badge>
                  </div>

                  {/* Chapter Tag */}
                  {quiz.chapterName && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 truncate max-w-full">
                        <Layers className="w-3 h-3 shrink-0" />
                        <span className="truncate">{quiz.chapterName}</span>
                      </span>
                    </div>
                  )}

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {quiz.description || 'Comprehensive multiple-choice test evaluating chapter mastery.'}
                  </p>
                </div>

                <div>
                  {/* Metadata Row: Questions, Time & XP */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{questionCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{meta.duration}</span>
                    </div>
                  </div>

                  {/* Start Quiz Action */}
                  <Link
                    to={`/quizzes/${quiz.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Assessment</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
