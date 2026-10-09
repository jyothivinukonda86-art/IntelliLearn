import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { subjectService } from '../../services/subjectService';
import { chapterService } from '../../services/chapterService';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Layers,
  BookOpen,
  PlusCircle,
  Trash2,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const AdminChapters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubjectId = searchParams.get('subjectId') || '';

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(initialSubjectId);
  const [chapters, setChapters] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // 1. Fetch Subjects list for selector
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const data = await subjectService.getAllSubjects();
        const list = Array.isArray(data) ? data : [];
        setSubjects(list);
        if (list.length > 0 && !selectedSubjectId) {
          setSelectedSubjectId(String(list[0].id));
        }
      } catch (err) {
        setError('Failed to load subjects.');
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  // 2. Fetch Chapters when selected subject changes
  const fetchChapters = async (subId) => {
    if (!subId) return;
    try {
      setLoadingChapters(true);
      setError(null);
      const data = await chapterService.getChaptersBySubject(subId);
      setChapters(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load chapters.');
    } finally {
      setLoadingChapters(false);
    }
  };

  useEffect(() => {
    if (selectedSubjectId) {
      fetchChapters(selectedSubjectId);
      setSearchParams({ subjectId: selectedSubjectId });
    }
  }, [selectedSubjectId]);

  const handleCreateChapter = async (e) => {
    e.preventDefault();
    if (!name.trim() || !selectedSubjectId) return;

    setSubmitting(true);
    try {
      await chapterService.createChapter({
        name: name.trim(),
        description: description.trim(),
        subjectId: Number(selectedSubjectId),
      });
      setSuccessMsg(`Chapter "${name}" added successfully!`);
      setName('');
      setDescription('');
      setIsCreateModalOpen(false);
      fetchChapters(selectedSubjectId);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to create chapter.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteChapter = async () => {
    if (!chapterToDelete) return;
    setSubmitting(true);
    try {
      await chapterService.deleteChapter(chapterToDelete.id);
      setSuccessMsg(`Chapter "${chapterToDelete.name}" removed successfully.`);
      setChapterToDelete(null);
      fetchChapters(selectedSubjectId);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete chapter.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentSubject = subjects.find((s) => String(s.id) === String(selectedSubjectId));

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Admin Console', path: '/admin' },
          { label: 'Manage Chapters' },
        ]}
      />

      {/* Header & Actions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Syllabus Modules</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Chapter & Topic Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Organize unit chapters and lecture topics under curriculum subjects.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={!selectedSubjectId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Chapter</span>
        </button>
      </div>

      {/* Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Subject Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-700">Select Subject:</span>
        </div>

        <div className="w-full sm:w-72">
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={loadingSubjects}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Chapters */}
      {loadingChapters && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Fetching chapters for {currentSubject?.name}...</p>
        </div>
      )}

      {/* Error */}
      {error && !loadingChapters && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Failed to Load Chapters</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={() => fetchChapters(selectedSubjectId)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loadingChapters && !error && chapters.length === 0 && (
        <EmptyState
          icon={Layers}
          title="No Chapters in This Subject"
          description={`No chapters have been added to ${currentSubject?.name || 'this subject'} yet.`}
          actionLabel="Add First Chapter"
          onAction={() => setIsCreateModalOpen(true)}
        />
      )}

      {/* Chapters Table */}
      {!loadingChapters && !error && chapters.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Chapter Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center">Materials</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chapters.map((ch, idx) => (
                  <tr key={ch.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-500">
                      Chapter {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{ch.name}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {ch.description || '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/admin/materials?subjectId=${selectedSubjectId}&chapterId=${ch.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-[11px] border border-indigo-200 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Manage Materials</span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setChapterToDelete(ch)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE CHAPTER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New Chapter</h3>
                <p className="text-xs text-slate-500 mt-0.5">Subject: {currentSubject?.name}</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateChapter} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chapter Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Relational Algebra & Normalization"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Module Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline key learning outcomes and syllabus scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Chapter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {chapterToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-rose-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Delete Chapter "{chapterToDelete.name}"?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure? All study materials associated with this chapter will also be removed.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setChapterToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteChapter}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
