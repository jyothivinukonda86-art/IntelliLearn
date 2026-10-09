import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recommendationService } from '../services/recommendationService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  Compass,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Loader2,
  Sparkles,
  Info,
  ShieldCheck,
  Target,
  ChevronRight
} from 'lucide-react';

export const RecommendationsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await recommendationService.getMyRecommendations();
      setData(res);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load recommendations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const getPriorityVariant = (priority) => {
    const p = (priority || 'MEDIUM').toUpperCase();
    if (p === 'HIGH') return 'danger';
    if (p === 'MEDIUM') return 'warning';
    return 'success';
  };

  const getStatusDisplay = (status) => {
    if (status === 'NEEDS_REVISION') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Revision Required (&lt; 60% Accuracy)</span>
        </div>
      );
    }
    if (status === 'PRACTICING') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          <Target className="w-3.5 h-3.5 text-amber-600" />
          <span>Active Practice (60% – 84% Accuracy)</span>
        </div>
      );
    }
    if (status === 'MASTERY') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Concept Mastery (&ge; 85% Accuracy)</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <span>Diagnostic Evaluation Stage</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Intelligent Recommendations' }]} />

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Adaptive Performance Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Intelligent Learning Recommendations
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Transparent, rule-based recommendations analyzing your actual quiz scores, subject attempts, and curriculum resources to guide your revision.
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Analyzing quiz performance metrics...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Unable to Load Recommendations</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={fetchRecommendations}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry Analysis
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {/* Performance Summary Banner */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="mb-2">{getStatusDisplay(data.status)}</div>
              <h2 className="text-xl font-bold text-slate-900">
                Personalized Learning Pathway
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                {data.status === 'NO_ATTEMPTS'
                  ? 'Welcome! Complete topic quizzes to generate customized chapter revision recommendations.'
                  : `Evaluated ${data.totalAttempts} completed assessments with an average scoring accuracy of ${data.overallAccuracy}%.`}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0">
              <div className="text-center px-4 border-r border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Total Attempts</div>
                <div className="text-xl font-bold text-slate-900">{data.totalAttempts}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-xs text-slate-500 font-medium">Accuracy</div>
                <div className="text-xl font-bold text-emerald-600">{data.overallAccuracy}%</div>
              </div>
            </div>
          </div>

          {/* Rule Transparency Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Transparent Rule-Based Recommendation Engine:</span>
              <p className="mt-1 leading-relaxed">
                Our recommendation engine uses verified, predictable scoring thresholds:
                <strong> Below 60%</strong> (High-priority fundamental revision),
                <strong> 60%–69%</strong> (Moderate-priority material review & retake),
                <strong> 70%–84%</strong> (Solidifying concepts with extra practice), and
                <strong> 85% & above</strong> (Mastery — progress to harder tiers or new topics).
              </p>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Tailored Action Items ({data.recommendations?.length || 0})</span>
            </h3>

            {(!data.recommendations || data.recommendations.length === 0) ? (
              <EmptyState
                icon={CheckCircle2}
                title="All Topics Mastered"
                description="No revision actions needed right now! Keep attempting higher difficulty quizzes to challenge yourself."
                actionLabel="Explore Quizzes"
                actionRoute="/quizzes"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{rec.subjectName || 'Curriculum Subject'}</span>
                        </span>
                        <Badge variant={getPriorityVariant(rec.priority)} size="xs">
                          {rec.priority} Priority
                        </Badge>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                        {rec.actionText}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {rec.reason}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {rec.type || 'RECOMMENDATION'}
                      </span>

                      <Link
                        to={rec.actionRoute || '/dashboard'}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>{rec.actionText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
