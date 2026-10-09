import api from './api';

export const recommendationService = {
  async getMyRecommendations() {
    const response = await api.get('/recommendations/me');
    return response.data; // { status, overallAccuracy, totalAttempts, recommendations: [...] }
  },
};
