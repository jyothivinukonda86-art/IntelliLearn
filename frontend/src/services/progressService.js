import api from './api';

export const progressService = {
  async getMyProgress() {
    const response = await api.get('/progress/me');
    return response.data; // { totalAttempts, totalQuestionsAnswered, totalCorrectAnswers, averagePercentage, recentAttempts }
  },

  async getMyQuizAttempts() {
    const response = await api.get('/progress/attempts');
    return response.data; // [{ id, quizId, quizTitle, subjectName, difficulty, score, totalQuestions, percentage, attemptedAt }]
  },
};
