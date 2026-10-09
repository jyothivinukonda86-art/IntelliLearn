import React, { useState, useEffect } from 'react';
import { quizService } from '../../services/quizService';
import { subjectService } from '../../services/subjectService';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  HelpCircle,
  PlusCircle,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Info,
  Zap,
  Eye,
  Plus,
  Minus,
  Sparkles,
  Check
} from 'lucide-react';

export const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Authoring Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [subjectId, setSubjectId] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
    },
  ]);

  const fetchQuizzesAndSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const [qData, sData] = await Promise.all([
        quizService.getAllQuizzes(),
        subjectService.getAllSubjects(),
      ]);
      setQuizzes(Array.isArray(qData) ? qData : []);
      const subList = Array.isArray(sData) ? sData : [];
      setSubjects(subList);
      if (subList.length > 0 && !subjectId) {
        setSubjectId(String(subList[0].id));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load quizzes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzesAndSubjects();
  }, []);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        explanation: '',
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!title.trim() || !subjectId) {
      alert('Please fill out the quiz title and select a subject.');
      return;
    }

    // Validate all questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (
        !q.questionText.trim() ||
        !q.optionA.trim() ||
        !q.optionB.trim() ||
        !q.optionC.trim() ||
        !q.optionD.trim()
      ) {
        alert(`Question #${i + 1} has empty fields. All questions and options A-D are required.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      await quizService.createQuiz({
        title: title.trim(),
        description: description.trim(),
        difficulty: difficulty.toUpperCase(),
        subjectId: Number(subjectId),
        questions: questions.map((q) => ({
          questionText: q.questionText.trim(),
          optionA: q.optionA.trim(),
          optionB: q.optionB.trim(),
          optionC: q.optionC.trim(),
          optionD: q.optionD.trim(),
          correctAnswer: q.correctAnswer.trim().toUpperCase(),
          explanation: q.explanation?.trim() || '',
        })),
      });

      setSuccessMsg(`Quiz "${title}" created successfully with ${questions.length} questions!`);
      setTitle('');
      setDescription('');
      setDifficulty('MEDIUM');
      setQuestions([
        {
          questionText: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: 'A',
          explanation: '',
        },
      ]);
      setIsCreateModalOpen(false);
      fetchQuizzesAndSubjects();
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to create quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  const getSubjectName = (subId) => {
    const s = subjects.find((item) => item.id === subId);
    return s ? s.name : `Subject #${subId}`;
  };

  const getDifficultyVariant = (diff) => {
    const d = (diff || 'MEDIUM').toUpperCase();
    if (d === 'EASY') return 'easy';
    if (d === 'HARD') return 'hard';
    return 'medium';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Admin Console', path: '/admin' },
          { label: 'Quiz Management' },
        ]}
      />

      {/* Header & Actions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Assessment Authoring</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Quiz Management & Authoring
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Build interactive multiple-choice tests with answer keys, explanations, and curriculum tagging.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Assessment</span>
        </button>
      </div>

      {/* Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-rose-900">Failed to Load Quizzes</h3>
          <p className="text-xs text-rose-700 mt-1 mb-4">{error}</p>
          <button
            onClick={fetchQuizzesAndSubjects}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium">Loading published quizzes...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && quizzes.length === 0 && (
        <EmptyState
          icon={HelpCircle}
          title="No Quizzes Published"
          description="No topic quizzes exist yet. Click 'Create Assessment' to author the first quiz."
          actionLabel="Create Assessment"
          onAction={() => setIsCreateModalOpen(true)}
        />
      )}

      {/* Quizzes Table */}
      {!loading && !error && quizzes.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Quiz Title</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Questions</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-500">#{quiz.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{quiz.title}</td>
                    <td className="py-3 px-4 text-slate-600">{getSubjectName(quiz.subjectId)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getDifficultyVariant(quiz.difficulty)} size="xs">
                        {quiz.difficulty || 'MEDIUM'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        {quiz.questions?.length ?? 0} Questions
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setPreviewQuiz(quiz)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUIZ INSPECT / PREVIEW MODAL */}
      {previewQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-xl relative max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getDifficultyVariant(previewQuiz.difficulty)} size="xs">
                    {previewQuiz.difficulty || 'MEDIUM'}
                  </Badge>
                  <span className="text-xs text-slate-500">#{previewQuiz.id}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{previewQuiz.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{previewQuiz.description || 'No description provided.'}</p>
              </div>
              <button
                onClick={() => setPreviewQuiz(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Questions ({previewQuiz.questions?.length || 0})
              </h4>

              {(!previewQuiz.questions || previewQuiz.questions.length === 0) ? (
                <p className="text-xs text-slate-400 italic">No questions mapped to this quiz.</p>
              ) : (
                previewQuiz.questions.map((q, idx) => (
                  <div key={q.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[10px] text-indigo-700 font-bold">
                        {idx + 1}
                      </span>
                      <span>{q.questionText}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-600 pl-7">
                      <div><strong className="text-slate-400">A:</strong> {q.optionA}</div>
                      <div><strong className="text-slate-400">B:</strong> {q.optionB}</div>
                      <div><strong className="text-slate-400">C:</strong> {q.optionC}</div>
                      <div><strong className="text-slate-400">D:</strong> {q.optionD}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewQuiz(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE QUIZ MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-3xl w-full shadow-xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Author Assessment Quiz</h3>
                <p className="text-xs text-slate-500">Configure parameters, multiple choice questions, and answer explanations</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-6">
              {/* Quiz Overview Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quiz Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Database Transactions & ACID Properties"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Curriculum Subject <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} (ID: {sub.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Difficulty Tier
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  >
                    <option value="EASY">Easy (5 Qs • 5 Mins)</option>
                    <option value="MEDIUM">Medium (7 Qs • 10 Mins)</option>
                    <option value="HARD">Hard (10 Qs • 15 Mins)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Summary / Scope
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Assess understanding of concurrency, serializability, and rollback."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Questions Builder */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Questions ({questions.length})</span>
                  </h4>

                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700">
                        Question #{idx + 1}
                      </span>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove question"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Question Statement <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(idx, 'questionText', e.target.value)}
                        placeholder="e.g. Which of the following isolation levels prevents dirty reads?"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-600 font-bold block mb-1">Option A *</span>
                        <input
                          type="text"
                          required
                          value={q.optionA}
                          onChange={(e) => handleQuestionChange(idx, 'optionA', e.target.value)}
                          placeholder="Option A text..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-600 font-bold block mb-1">Option B *</span>
                        <input
                          type="text"
                          required
                          value={q.optionB}
                          onChange={(e) => handleQuestionChange(idx, 'optionB', e.target.value)}
                          placeholder="Option B text..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-600 font-bold block mb-1">Option C *</span>
                        <input
                          type="text"
                          required
                          value={q.optionC}
                          onChange={(e) => handleQuestionChange(idx, 'optionC', e.target.value)}
                          placeholder="Option C text..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-600 font-bold block mb-1">Option D *</span>
                        <input
                          type="text"
                          required
                          value={q.optionD}
                          onChange={(e) => handleQuestionChange(idx, 'optionD', e.target.value)}
                          placeholder="Option D text..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-700">
                        Correct Answer Key:
                      </span>
                      <div className="flex items-center gap-4">
                        {['A', 'B', 'C', 'D'].map((letter) => (
                          <label key={letter} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`correctAnswer_${idx}`}
                              value={letter}
                              checked={q.correctAnswer === letter}
                              onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-xs font-bold text-slate-800">{letter}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Explanation & Concept Rationale (Shown after submission)
                      </label>
                      <textarea
                        rows={2}
                        value={q.explanation || ''}
                        onChange={(e) => handleQuestionChange(idx, 'explanation', e.target.value)}
                        placeholder="Explain why the designated option is correct..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
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
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing Quiz...</span>
                    </>
                  ) : (
                    <span>Publish Assessment</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
