import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { quizService } from '../services/quizService';
import { gamificationService } from '../services/gamificationService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  Trophy,
  Award,
  Sparkles,
  RotateCcw,
  Loader2,
  Send,
  Check,
  X,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  BookOpen,
  Crown
} from 'lucide-react';

export const QuizArena = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: "A" | "B" | "C" | "D" }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  // Review before submit modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  // Abandon / Exit warning modal
  const [isExitWarningOpen, setIsExitWarningOpen] = useState(false);

  // Submission & Result States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [preQuizLevel, setPreQuizLevel] = useState(1);
  const [preQuizXp, setPreQuizXp] = useState(0);
  const [postQuizGamification, setPostQuizGamification] = useState(null);
  const [leveledUp, setLeveledUp] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const hasCelebratedRef = useRef(false);

  // Expand / Collapse all reviews toggle
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    const loadQuizAndProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const [quizData, gamData] = await Promise.allSettled([
          quizService.getQuizById(id),
          gamificationService.getMyGamification(),
        ]);

        if (quizData.status === 'fulfilled') {
          setQuiz(quizData.value);

          // Calculate initial duration in seconds based on difficulty
          const diff = (quizData.value.difficulty || 'MEDIUM').toUpperCase();
          let seconds = 600; // default 10m
          if (diff === 'EASY') seconds = 300; // 5m
          else if (diff === 'HARD') seconds = 900; // 15m
          setTimeLeft(seconds);
        } else {
          throw new Error('Failed to load quiz details.');
        }

        if (gamData.status === 'fulfilled') {
          setPreQuizLevel(gamData.value.level || 1);
          setPreQuizXp(gamData.value.totalXp || 0);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error loading quiz.');
      } finally {
        setLoading(false);
      }
    };

    loadQuizAndProfile();
  }, [id]);

  // Handle countdown timer
  useEffect(() => {
    if (loading || submissionResult || timeLeft === null) return;

    if (timeLeft <= 0) {
      // Time is up! Auto-submit
      handleSubmitQuiz();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, loading, submissionResult]);

  // Warn on page unload if answers in progress
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!submissionResult && Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, submissionResult]);

  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (questionId, optionLetter) => {
    if (submissionResult) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLetter,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleExitClick = () => {
    if (answeredCount > 0 && !submissionResult) {
      setIsExitWarningOpen(true);
    } else {
      navigate('/quizzes');
    }
  };

  const handleSubmitQuiz = async () => {
    setIsReviewModalOpen(false);
    setIsSubmitting(true);
    try {
      const result = await quizService.submitQuiz(id, answers);
      setSubmissionResult(result);

      // Reconcile gamification
      const updatedGamification = await gamificationService.getMyGamification();
      setPostQuizGamification(updatedGamification);

      const diffXp = (updatedGamification.totalXp || 0) - preQuizXp;
      const finalXpAwarded = result.xpEarned ?? (diffXp > 0 ? diffXp : result.score * 10);
      setEarnedXp(finalXpAwarded);

      const isLevelUp = (updatedGamification.level || 1) > preQuizLevel;
      if (isLevelUp) {
        setLeveledUp(true);
        setShowLevelUpModal(true);
      }

      if (!hasCelebratedRef.current) {
        hasCelebratedRef.current = true;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          if (isLevelUp) {
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#6366f1', '#f59e0b', '#ec4899', '#10b981', '#38bdf8'],
            });
          } else if (result.percentage >= 60) {
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#6366f1', '#f59e0b', '#10b981'],
            });
          }
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmissionResult(null);
    setLeveledUp(false);
    setShowLevelUpModal(false);
    hasCelebratedRef.current = false;
    const diff = (quiz?.difficulty || 'MEDIUM').toUpperCase();
    let seconds = 600;
    if (diff === 'EASY') seconds = 300;
    else if (diff === 'HARD') seconds = 900;
    setTimeLeft(seconds);
  };

  const formatTime = (totalSeconds) => {
    if (totalSeconds === null || totalSeconds < 0) return '00:00';
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleReviewExpand = (idx) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-medium">Preparing quiz environment...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-rose-900">Quiz Unavailable</h3>
        <p className="text-xs text-rose-700 mt-1 mb-6">{error || 'This quiz could not be loaded.'}</p>
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Quiz Hub</span>
        </Link>
      </div>
    );
  }

  // =========================================================================
  // RESULT SCREEN WITH POST-SUBMISSION DETAILED REVIEW & EXPLANATIONS
  // =========================================================================
  if (submissionResult) {
    const isSuccess = submissionResult.percentage >= 60;
    const reviews = submissionResult.reviews || [];

    return (
      <div className="max-w-3xl mx-auto space-y-6 py-4 animate-fade-in">
        <Breadcrumbs
          items={[
            { label: 'Quiz Arena', path: '/quizzes' },
            { label: quiz.title, path: `/quizzes/${id}` },
            { label: 'Results & Review' },
          ]}
        />

        {/* Level Up Banner */}
        {leveledUp && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3 text-amber-900 shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                <Crown className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  Level Promotion: Level {postQuizGamification?.level}!
                </h4>
                <p className="text-xs text-amber-700">
                  New Academic Rank Title: <strong>{postQuizGamification?.levelName}</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLevelUpModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold transition-colors shrink-0 cursor-pointer"
            >
              View Badge
            </button>
          </div>
        )}

        {/* Summary Result Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm bg-indigo-50 text-indigo-600">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Assessment Completed!
          </h2>
          <p className="text-xs text-slate-500 mb-6">{quiz.title}</p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Score</div>
              <div className="text-2xl font-bold text-slate-900">
                {submissionResult.score} / {submissionResult.totalQuestions}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Accuracy</div>
              <div className={`text-2xl font-bold ${isSuccess ? 'text-emerald-600' : 'text-amber-600'}`}>
                {submissionResult.percentage}%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Correct / Total</div>
              <div className="text-2xl font-bold text-emerald-600">
                {submissionResult.correctCount ?? submissionResult.score} / {submissionResult.totalQuestions}
              </div>
            </div>

            {/* Floating XP Reward */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="text-xs text-amber-800 font-medium mb-1">XP Earned</div>
              <div className="text-2xl font-bold text-amber-700 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>+{earnedXp}</span>
              </div>
            </div>
          </div>

          {/* Gamification Confirmation Banner */}
          {postQuizGamification && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 max-w-xl mx-auto mb-6 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Updated Profile Standing:
              </span>
              <span className="font-bold text-indigo-700 text-xs">
                {postQuizGamification.totalXp} XP (Level {postQuizGamification.level} • {postQuizGamification.levelName})
              </span>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <Link
              to="/progress"
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-indigo-200 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>View Analytics</span>
            </Link>

            <Link
              to="/quizzes"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Back to Quiz Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* DETAILED QUESTION-BY-QUESTION REVIEW WITH EXPLANATIONS */}
        {reviews.length > 0 && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Detailed Question Review & Explanations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review each question, your submission, the verified correct answer, and detailed explanations.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {reviews.length} Questions Evaluated
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {reviews.map((rev, index) => {
                const isCorrect = rev.isCorrect;
                const isAnswered = Boolean(rev.selectedAnswer);
                const options = [
                  { key: 'A', text: rev.optionA },
                  { key: 'B', text: rev.optionB },
                  { key: 'C', text: rev.optionC },
                  { key: 'D', text: rev.optionD },
                ];

                return (
                  <div
                    key={rev.id || index}
                    className={`rounded-xl border p-4 sm:p-5 transition-all ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    {/* Header: Question Number & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Question {index + 1}
                      </span>
                      {isCorrect ? (
                        <Badge variant="success" size="xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Correct (+10 XP)
                        </Badge>
                      ) : (
                        <Badge variant="danger" size="xs">
                          <X className="w-3 h-3 stroke-[3]" />
                          {isAnswered ? 'Incorrect (0 XP)' : 'Not Answered (0 XP)'}
                        </Badge>
                      )}
                    </div>

                    {/* Question Text */}
                    <h4 className="text-sm font-bold text-slate-900 mb-4 leading-relaxed">
                      {rev.questionText}
                    </h4>

                    {/* Options Breakdown */}
                    <div className="space-y-2 mb-4">
                      {options.map((opt) => {
                        const isSelected = rev.selectedAnswer === opt.key;
                        const isTheCorrectKey = rev.correctAnswer === opt.key;

                        let rowStyle = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (isTheCorrectKey) {
                          rowStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          rowStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={opt.key}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between ${rowStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 bg-white border border-slate-200">
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isSelected && !isTheCorrectKey && (
                                <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                                  Your Choice
                                </span>
                              )}
                              {isTheCorrectKey && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  Correct Answer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {rev.explanation && (
                      <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-indigo-800">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          Explanation & Concept Rationale:
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5">
                          {rev.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Level Up Modal */}
        {showLevelUpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border border-amber-300 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl text-center relative">
              <button
                onClick={() => setShowLevelUpModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Crown className="w-8 h-8 fill-current" />
              </div>

              <Badge variant="warning" size="xs" className="mb-2">
                ACADEMIC PROMOTION
              </Badge>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Level {postQuizGamification?.level} Reached!
              </h3>
              <p className="text-sm font-bold text-amber-700 mb-3">
                Title: {postQuizGamification?.levelName}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Congratulations! Your performance has elevated your standing on the campus leaderboard.
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-center justify-around text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">XP Earned</span>
                  <span className="text-base font-bold text-amber-600">+{earnedXp} XP</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-slate-500 block text-[11px]">New Total</span>
                  <span className="text-base font-bold text-slate-900">{postQuizGamification?.totalXp} XP</span>
                </div>
              </div>

              <button
                onClick={() => setShowLevelUpModal(false)}
                className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                Claim Reward & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // ACTIVE QUIZ INTERFACE (NO BROWSER HISTORY PUSHES FOR QUESTIONS)
  // =========================================================================
  const options = [
    { key: 'A', text: currentQuestion?.optionA },
    { key: 'B', text: currentQuestion?.optionB },
    { key: 'C', text: currentQuestion?.optionC },
    { key: 'D', text: currentQuestion?.optionD },
  ];

  const selectedAnswer = answers[currentQuestion?.id];
  const isTimeCritical = timeLeft !== null && timeLeft <= 60;

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Quiz Arena', path: '/quizzes' },
          { label: quiz.title },
        ]}
      />

      {/* Top Bar: Exit button, Timer countdown, Question counter */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
        <button
          onClick={handleExitClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>

        {/* Live Countdown Timer */}
        {timeLeft !== null && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-600' : 'text-slate-500'}`} />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        )}

        {/* Progress Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant={
              (quiz.difficulty || 'MEDIUM').toUpperCase() === 'EASY'
                ? 'easy'
                : (quiz.difficulty || 'MEDIUM').toUpperCase() === 'HARD'
                ? 'hard'
                : 'medium'
            }
            size="xs"
          >
            {quiz.difficulty || 'MEDIUM'}
          </Badge>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {answeredCount} / {totalQuestions} Answered
          </span>
        </div>
      </div>

      {/* Question Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Navigator Grid */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs font-medium text-slate-500 mr-1 shrink-0">
          Jump to:
        </span>
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white shadow-sm'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      {currentQuestion && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-indigo-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-slate-400">Single Choice</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQuestion.questionText}
          </h3>

          {/* Options List */}
          <div className="space-y-3 pt-1">
            {options.map((opt) => {
              const isSelected = selectedAnswer === opt.key;

              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 text-indigo-950 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}

              <button
                onClick={() => setIsReviewModalOpen(true)}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Review & Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: PRE-SUBMISSION SUMMARY & REVIEW */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">
              Review Quiz Before Submitting
            </h3>

            <p className="text-xs text-slate-600 text-center leading-relaxed">
              You have answered <strong className="text-slate-900">{answeredCount}</strong> of{' '}
              <strong className="text-slate-900">{totalQuestions}</strong> questions.
            </p>

            {answeredCount < totalQuestions && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{totalQuestions - answeredCount} questions are unanswered.</strong> Unanswered questions will receive 0 XP and be marked incorrect.
                </span>
              </div>
            )}

            {/* Quick navigator pills inside modal */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Question Completion Summary:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q, idx) => {
                  const isAns = !!answers[q.id];
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setIsReviewModalOpen(false);
                      }}
                      className={`w-6 h-6 rounded text-[11px] font-bold cursor-pointer ${
                        isAns
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={`Go to Q${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Questions
              </button>

              <button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Evaluating Answers...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ABANDON / EXIT CONFIRMATION */}
      {isExitWarningOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-rose-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Abandon Quiz Session?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              You have answered <strong>{answeredCount}</strong> questions. If you leave now, your session progress will be lost and no score or XP will be saved.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsExitWarningOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Continue Quiz
              </button>

              <button
                onClick={() => {
                  setIsExitWarningOpen(false);
                  navigate('/quizzes');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Leave Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
