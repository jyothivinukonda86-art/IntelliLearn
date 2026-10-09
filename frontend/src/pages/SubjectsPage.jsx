import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subjectService } from '../services/subjectService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import {
  BookOpen,
  ArrowRight,
  Layers,
  Search,
  Loader2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subjectService.getAllSubjects();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load curriculum subjects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Curriculum Subjects' }]} />

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Academic Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Subjects & Course Modules
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore university curriculum subjects, chapter breakdowns, verified lecture notes, and linked practice quizzes.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subjects..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Loading curriculum subjects...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Unable to Load Subjects</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={fetchSubjects}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredSubjects.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title={searchTerm ? 'No Matching Subjects' : 'No Subjects Seeded'}
          description={
            searchTerm
              ? `No subjects matched "${searchTerm}". Try a different keyword.`
              : 'The curriculum has not been seeded yet. Log in as Administrator to add subjects.'
          }
          actionLabel={searchTerm ? 'Clear Search' : undefined}
          onAction={searchTerm ? () => setSearchTerm('') : undefined}
        />
      )}

      {/* Subjects Grid */}
      {!loading && !error && filteredSubjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    Subject #{subject.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {subject.description || 'No description provided for this subject.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/subjects/${subject.id}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View Chapters</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/quizzes?subjectId=${subject.id}`}
                  className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  title="View quizzes for this subject"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Quizzes</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
