import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { progressService } from '../services/progressService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  TrendingUp,
  Target,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Compass,
  Trophy,
  Loader2,
  Calendar,
  Zap,
  BarChart2
} from 'lucide-react';

export const ProgressPage = () => {
  const [progress, setProgress] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [progData, attemptsData] = await Promise.all([
          progressService.getMyProgress(),
          progressService.getMyQuizAttempts(),
        ]);
        setProgress(progData);
        setAttempts(attemptsData || []);
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load assessment progress history.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-xs font-medium">Loading assessment history & progress metrics...</p>
      </div>
    );
  }

  const breadcrumbs = [{ label: 'Learning Progress' }];

  const totalAttempts = progress?.totalAttempts ?? attempts.length;
  const avgAccuracy = progress?.averagePercentage ?? 0;
  const totalQuestions = progress?.totalQuestionsAnswered ?? 0;
  const totalCorrect = progress?.totalCorrectAnswers ?? 0;
  const totalIncorrect = Math.max(0, totalQuestions - totalCorrect);

  // Group attempts by subject for subject breakdown
  const subjectMap = {};
  attempts.forEach((att) => {
    const sName = att.subjectName || 'General';
    if (!subjectMap[sName]) {
      subjectMap[sName] = { count: 0, totalScore: 0, totalQ: 0 };
    }
    subjectMap[sName].count += 1;
    subjectMap[sName].totalScore += att.score;
    subjectMap[sName].totalQ += att.totalQuestions;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Academic Performance Tracking</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Learning Progress & Quiz History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review detailed attempt records, accuracy metrics, and scoring breakdowns across all curriculum subjects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/quizzes"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Start a Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Attempts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Quizzes Attempted</span>
            <HelpCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalAttempts}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Completed formative sessions</p>
        </div>

        {/* Average Accuracy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Overall Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {avgAccuracy}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Mean percentage score</p>
        </div>

        {/* Questions Answered */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Questions</span>
            <BookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalQuestions}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Evaluated by server</p>
        </div>

        {/* Correct vs Incorrect */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Correct Answers</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-700 flex items-baseline gap-2">
            <span>{totalCorrect}</span>
            <span className="text-xs font-normal text-slate-400">({totalIncorrect} incorrect)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">XP earned: {totalCorrect * 10} XP</p>
        </div>
      </div>

      {/* Performance by Subject */}
      {Object.keys(subjectMap).length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            <span>Subject Mastery Breakdown</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(subjectMap).map(([sName, data]) => {
              const subjAccuracy = data.totalQ > 0 ? Math.round((data.totalScore * 100.0) / data.totalQ) : 0;
              return (
                <div key={sName} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block truncate">{sName}</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-lg font-black text-slate-900">{subjAccuracy}%</span>
                    <span className="text-[11px] text-slate-500 font-medium">{data.count} attempt{data.count === 1 ? '' : 's'}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        subjAccuracy >= 70 ? 'bg-emerald-500' : subjAccuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, subjAccuracy)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assessment History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Complete Assessment History
            </h2>
            <p className="text-xs text-slate-500">
              Verified historical submissions graded by the backend.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            {attempts.length} Attempt{attempts.length === 1 ? '' : 's'} Recorded
          </span>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={HelpCircle}
              title="No Quiz Attempts Recorded Yet"
              description="Take your first quiz to evaluate your subject knowledge, earn XP, and unlock milestone badges."
              actionText="Browse Available Quizzes"
              actionPath="/quizzes"
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5">Date & Time</th>
                  <th className="py-3 px-5">Subject</th>
                  <th className="py-3 px-5">Quiz Title</th>
                  <th className="py-3 px-5">Difficulty</th>
                  <th className="py-3 px-5">Score</th>
                  <th className="py-3 px-5">Accuracy</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map((att) => {
                  const isPass = att.percentage >= 60;
                  const diffVariant = att.difficulty?.toLowerCase() === 'easy'
                    ? 'easy'
                    : att.difficulty?.toLowerCase() === 'hard'
                    ? 'hard'
                    : 'medium';

                  return (
                    <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-5 text-slate-500 font-medium whitespace-nowrap">
                        {att.attemptedAt ? new Date(att.attemptedAt).toLocaleString() : 'Recent'}
                      </td>
                      <td className="py-3 px-5 font-semibold text-slate-800">
                        {att.subjectName}
                      </td>
                      <td className="py-3 px-5 font-bold text-slate-900">
                        {att.quizTitle}
                      </td>
                      <td className="py-3 px-5">
                        <Badge variant={diffVariant} size="xs">
                          {att.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 px-5 font-semibold text-slate-800">
                        {att.score} / {att.totalQuestions}
                      </td>
                      <td className="py-3 px-5">
                        <span
                          className={`inline-flex items-center gap-1 font-bold ${
                            isPass ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {att.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right whitespace-nowrap">
                        {att.quizId && (
                          <Link
                            to={`/quizzes/${att.quizId}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Retake</span>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launchpad to other hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/recommendations"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Performance Recommendations</h4>
              <p className="text-[11px] text-slate-500">See adaptive topics suggested based on your scores</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
        </Link>

        <Link
          to="/gamification"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Milestone Badges & Leaderboard</h4>
              <p className="text-[11px] text-slate-500">View unlocked milestones, XP tiers, and campus rankings</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
        </Link>
      </div>
    </div>
  );
};
