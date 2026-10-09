import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { subjectService } from '../../services/subjectService';
import { chapterService } from '../../services/chapterService';
import { materialService } from '../../services/materialService';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  FileText,
  BookOpen,
  Layers,
  PlusCircle,
  Trash2,
  ExternalLink,
  Video,
  FileDown,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Info,
  ShieldAlert
} from 'lucide-react';

export const AdminMaterials = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubId = searchParams.get('subjectId') || '';
  const initialChapId = searchParams.get('chapterId') || '';

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(initialSubId);
  const [chapters, setChapters] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapId);
  const [materials, setMaterials] = useState([]);

  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('PDF');
  const [fileUrl, setFileUrl] = useState('');

  // 1. Fetch Subjects list
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

  // 2. Fetch Chapters when subject changes
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubjectId) return;
      try {
        setLoadingChapters(true);
        const data = await chapterService.getChaptersBySubject(selectedSubjectId);
        const list = Array.isArray(data) ? data : [];
        setChapters(list);
        if (list.length > 0) {
          const match = list.find((c) => String(c.id) === initialChapId);
          setSelectedChapterId(match ? String(match.id) : String(list[0].id));
        } else {
          setSelectedChapterId('');
          setMaterials([]);
        }
      } catch (err) {
        setError('Failed to load chapters for selected subject.');
      } finally {
        setLoadingChapters(false);
      }
    };

    fetchChapters();
  }, [selectedSubjectId]);

  // 3. Fetch Materials when chapter changes
  const fetchMaterials = async (chapId) => {
    if (!chapId) {
      setMaterials([]);
      return;
    }
    try {
      setLoadingMaterials(true);
      setError(null);
      const data = await materialService.getMaterialsByChapter(chapId);
      setMaterials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load materials for this chapter.');
    } finally {
      setLoadingMaterials(false);
    }
  };

  useEffect(() => {
    if (selectedChapterId) {
      fetchMaterials(selectedChapterId);
      setSearchParams({
        subjectId: selectedSubjectId,
        chapterId: selectedChapterId,
      });
    }
  }, [selectedChapterId]);

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    if (!title.trim() || !selectedChapterId) return;

    setSubmitting(true);
    try {
      await materialService.createMaterial({
        title: title.trim(),
        description: description.trim(),
        type: type.toUpperCase(),
        fileUrl: fileUrl.trim(),
        chapterId: Number(selectedChapterId),
      });
      setSuccessMsg(`Material "${title}" added successfully!`);
      setTitle('');
      setDescription('');
      setFileUrl('');
      setIsCreateModalOpen(false);
      fetchMaterials(selectedChapterId);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to create material.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMaterial = async () => {
    if (!materialToDelete) return;
    setSubmitting(true);
    try {
      await materialService.deleteMaterial(materialToDelete.id);
      setSuccessMsg(`Material "${materialToDelete.title}" deleted.`);
      setMaterialToDelete(null);
      fetchMaterials(selectedChapterId);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete material.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMaterialIcon = (matType) => {
    const t = (matType || '').toUpperCase();
    if (t.includes('VIDEO')) return <Video className="w-4 h-4 text-rose-500" />;
    if (t.includes('PDF')) return <FileDown className="w-4 h-4 text-amber-500" />;
    return <FileText className="w-4 h-4 text-indigo-500" />;
  };

  const currentChapter = chapters.find((c) => String(c.id) === String(selectedChapterId));

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Admin Console', path: '/admin' },
          { label: 'Learning Materials' },
        ]}
      />

      {/* Header & Actions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Documents</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Learning Resource Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Attach verified lecture PDFs, YouTube videos, and documentation articles to syllabus chapters.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={!selectedChapterId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Subject and Chapter Selectors */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Subject:</span>
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={loadingSubjects}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Chapter Module:</span>
          </label>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            disabled={loadingChapters || chapters.length === 0}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          >
            {chapters.length === 0 ? (
              <option value="">No chapters in this subject</option>
            ) : (
              chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Loading Materials */}
      {loadingMaterials && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Fetching materials for {currentChapter?.name}...</p>
        </div>
      )}

      {/* Error */}
      {error && !loadingMaterials && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Failed to Load Materials</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={() => fetchMaterials(selectedChapterId)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loadingMaterials && !error && materials.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No Learning Materials Uploaded"
          description={`No materials exist for ${currentChapter?.name || 'this chapter'}. Click "Upload Material" to attach lecture resources.`}
          actionLabel="Add First Material"
          onAction={() => setIsCreateModalOpen(true)}
        />
      )}

      {/* Materials Table */}
      {!loadingMaterials && !error && materials.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Resource Title</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Target Link</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {materials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {getMaterialIcon(mat.type)}
                        <span className="font-semibold text-slate-700">
                          {mat.type || 'DOCUMENT'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{mat.title}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {mat.description || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {mat.fileUrl ? (
                        <a
                          href={mat.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium hover:underline max-w-[200px] truncate"
                        >
                          <span className="truncate">{mat.fileUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="italic text-slate-400">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setMaterialToDelete(mat)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete material"
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

      {/* CREATE MATERIAL MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upload Learning Material</h3>
                <p className="text-xs text-slate-500 mt-0.5">Chapter: {currentChapter?.name}</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Lecture Slides & Chapter Summary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="VIDEO">Video Lecture URL</option>
                  <option value="ARTICLE">Online Article / Web Doc</option>
                  <option value="DOCUMENT">Course Notes / Handout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/lecture-notes.pdf"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief synopsis of what is covered in this resource..."
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
                  {submitting ? 'Uploading...' : 'Save Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {materialToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-rose-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Delete Material "{materialToDelete.title}"?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              This action cannot be undone. Students will no longer have access to this resource link.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setMaterialToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMaterial}
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
