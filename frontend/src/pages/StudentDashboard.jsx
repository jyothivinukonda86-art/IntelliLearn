import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gamificationService } from '../services/gamificationService';
import { progressService } from '../services/progressService';
import { subjectService } from '../services/subjectService';
import { quizService } from '../services/quizService';
import { recommendationService } from '../services/recommendationService';
import { Badge } from '../components/common/Badge';
import {
  Trophy,
  Zap,
  Target,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Award,
  Compass,
  ArrowRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  Clock,
  Play,
  BarChart3,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [gamification, setGamification] = useState(null);
  const [progress, setProgress] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [gamData, progData, subData, quizData, recData] = await Promise.allSettled([
          gamificationService.getMyGamification(),
          progressService.getMyProgress(),
          subjectService.getAllSubjects(),
          quizService.getAllQuizzes(),
          recommendationService.getMyRecommendations(),
        ]);

        if (gamData.status === 'fulfilled') setGamification(gamData.value);
        if (progData.status === 'fulfilled') setProgress(progData.value);
        if (subData.status === 'fulfilled') setSubjects(subData.value);
        if (quizData.status === 'fulfilled') setQuizzes(quizData.value);
        if (recData.status === 'fulfilled') setRecommendationsData(recData.value);
      } catch (err) {
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Gamification stats
  const totalXp = gamification?.totalXp ?? 0;
  const level = gamification?.level ?? 1;
  const levelName = gamification?.levelName ?? 'Novice Explorer';
  const xpInCurrentLevel = totalXp % 100;
  const xpNeededForNextLevel = 100 - xpInCurrentLevel;
  const levelProgressPercent = Math.min(100, Math.max(0, xpInCurrentLevel));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* SECTION A: Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-48 -mb-10 w-48 h-48 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Student Learning Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {user?.email ? user.email.split('@')[0] : 'Learner'}!
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Master core curriculum topics, challenge yourself with multi-difficulty quizzes, earn XP, and unlock academic milestone badges.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/quizzes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start a Quiz</span>
              </Link>
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Browse Subjects</span>
              </Link>
              <Link
                to="/progress"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 text-xs font-medium transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>View My Analytics</span>
              </Link>
            </div>
          </div>

          {/* Gamification Level Status Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center font-bold text-lg shadow-sm">
                  L{level}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Current Rank
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {levelName}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500 font-medium">Total XP</div>
                <div className="text-lg font-bold text-amber-600 flex items-center gap-1 justify-end">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {totalXp}
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Level {level} Progress</span>
                <span>{xpInCurrentLevel}/100 XP ({xpNeededForNextLevel} to Lvl {level + 1})</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>

            <Link
              to="/gamification"
              className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Badges & Campus Leaderboard
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION B: Learning Overview Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            Learning Overview & Key Metrics
          </h2>
          <Link
            to="/progress"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Detailed Analytics
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Attempts */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Quizzes Taken</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {progress?.totalAttempts ?? 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Completed assessments</p>
            </div>

            {/* Average Accuracy */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Average Accuracy</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                {progress?.averagePercentage != null ? `${progress.averagePercentage}%` : '0%'}
              </div>
              <p className="text-xs text-slate-500 mt-1">Overall grading accuracy</p>
            </div>

            {/* Questions Answered */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Questions Answered</span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {progress?.totalQuestionsAnswered ?? 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Across all quiz sessions</p>
            </div>

            {/* Correct Answers */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Correct Answers</span>
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-teal-700">
                {progress?.totalCorrectAnswers ?? 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Server evaluated correct</p>
            </div>
          </div>
        )}
      </div>

      {/* SECTION C: Continue Learning / Curriculum Subjects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Academic Curriculum Subjects
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore chapters, read verified lecture materials, and practice topic quizzes
            </p>
          </div>
          <Link
            to="/subjects"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            All Subjects ({subjects.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 rounded-xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/subjects/${sub.id}`}
                className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {sub.description || 'Core engineering syllabus module.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <span>Browse Chapters</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* SECTION D: Recommended Next Steps */}
      {recommendationsData && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Performance-Driven Adaptive Path</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Recommended Next Steps
              </h2>
            </div>
            <Link
              to="/recommendations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>Full Recommendations Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recommendationsData.recommendations?.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              No recommendations at this time. Complete quizzes across subjects to generate personalized guidance.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {recommendationsData.recommendations.slice(0, 2).map((rec, i) => (
                <div
                  key={i}
                  className="bg-slate-50/80 border border-slate-200/80 hover:border-indigo-300 rounded-xl p-4 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
                        {rec.subjectName || 'Curriculum Subject'}
                      </span>
                      <Badge
                        variant={
                          rec.priority === 'HIGH'
                            ? 'danger'
                            : rec.priority === 'MEDIUM'
                            ? 'warning'
                            : 'success'
                        }
                        size="xs"
                      >
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">
                      {rec.actionText}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                      {rec.reason}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex justify-end">
                    <Link
                      to={rec.actionRoute || '/dashboard'}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION E: Achievements & Milestone Badges Preview */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Achievements & Milestone Badges
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Earn XP by completing quizzes and unlock prestigious academic milestone badges
            </p>
          </div>
          <Link
            to="/gamification"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All Badges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Badge 1: First Steps */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              (progress?.totalAttempts ?? 0) >= 1
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-slate-200 text-slate-400'
            }`}>
              🎯
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">First Steps</div>
              <div className="text-[10px] text-slate-500">
                {(progress?.totalAttempts ?? 0) >= 1 ? 'Unlocked' : '1 Quiz required'}
              </div>
            </div>
          </div>

          {/* Badge 2: Perfect Score */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              (progress?.recentAttempts || []).some(a => a.percentage === 100)
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-slate-200 text-slate-400'
            }`}>
              🌟
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Perfect Score</div>
              <div className="text-[10px] text-slate-500">
                {(progress?.recentAttempts || []).some(a => a.percentage === 100) ? 'Unlocked' : '100% on any quiz'}
              </div>
            </div>
          </div>

          {/* Badge 3: Century Scholar */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              totalXp >= 100
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-slate-200 text-slate-400'
            }`}>
              ⚡
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Century Scholar</div>
              <div className="text-[10px] text-slate-500">
                {totalXp >= 100 ? 'Unlocked' : `${totalXp}/100 XP`}
              </div>
            </div>
          </div>

          {/* Badge 4: Quiz Explorer */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              (progress?.totalAttempts ?? 0) >= 3
                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                : 'bg-slate-200 text-slate-400'
            }`}>
              🏆
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Quiz Explorer</div>
              <div className="text-[10px] text-slate-500">
                {(progress?.totalAttempts ?? 0) >= 3 ? 'Unlocked' : `${progress?.totalAttempts ?? 0}/3 Quizzes`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
