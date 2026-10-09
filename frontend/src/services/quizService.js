import api from './api';

export const quizService = {
  async getAllQuizzes(subjectId, difficulty, chapterId) {
    let url = '/quizzes';
    const params = new URLSearchParams();
    if (subjectId && subjectId !== 'ALL') params.append('subjectId', subjectId);
    if (difficulty && difficulty !== 'ALL') params.append('difficulty', difficulty);
    if (chapterId && chapterId !== 'ALL') params.append('chapterId', chapterId);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    const response = await api.get(url);
    return response.data;
  },

  async getQuizzesBySubject(subjectId) {
    const response = await api.get(`/quizzes/subject/${subjectId}`);
    return response.data;
  },

  async getQuizzesByChapter(chapterId) {
    const response = await api.get(`/quizzes/chapter/${chapterId}`);
    return response.data;
  },

  async getQuizById(id) {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  async submitQuiz(quizId, answers) {
    // answers format: { answers: { [questionId]: "A"|"B"|"C"|"D" } }
    const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data; // { attemptId, score, totalQuestions, percentage, correctCount, incorrectCount, xpEarned, reviews, message }
  },

  async createQuiz(quizData) {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },
};
