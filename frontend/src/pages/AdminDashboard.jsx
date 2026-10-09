import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subjectService } from '../services/subjectService';
import { quizService } from '../services/quizService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  ShieldCheck,
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  PlusCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const [subData, quizData] = await Promise.allSettled([
          subjectService.getAllSubjects(),
          quizService.getAllQuizzes(),
        ]);
        if (subData.status === 'fulfilled') setSubjects(subData.value || []);
        if (quizData.status === 'fulfilled') setQuizzes(quizData.value || []);
      } catch (err) {
        console.error('Error fetching admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Administration Console' }]} />

      {/* Admin Welcome Hero */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Administrator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Curriculum & Content Management
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Maintain university curriculum subjects, chapters, educational documents/links, and tiered multiple-choice quizzes with complete explanations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/quizzes"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create New Quiz</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Subjects</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {loading ? '...' : subjects.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Configured syllabus courses</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Quizzes</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {loading ? '...' : quizzes.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Active assessments in database</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Role Access</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            ADMIN
          </div>
          <p className="text-xs text-slate-500 mt-1">Full content management rights</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Backend API</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-teal-700">
            Connected
          </div>
          <p className="text-xs text-slate-500 mt-1">Port 8080 Spring Boot</p>
        </div>
      </div>

      {/* Quick Admin Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/admin/subjects"
          className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Manage Subjects
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create, view, and organize academic curriculum courses and subjects.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>Manage Subjects</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          to="/admin/chapters"
          className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Manage Chapters
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Organize syllabus topics and modules linked to specific subjects.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>Manage Chapters</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          to="/admin/materials"
          className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Learning Materials
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add lecture notes, PDF documents, video references, and articles.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>Manage Materials</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          to="/admin/quizzes"
          className="group bg-white border border-slate-200/80 hover:border-indigo-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
              Quiz Authoring
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Build topic quizzes with tiered questions, correct keys, and explanations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>Manage Quizzes</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
};
