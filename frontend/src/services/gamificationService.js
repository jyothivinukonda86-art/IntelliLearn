import api from './api';

export const gamificationService = {
  async getMyGamification() {
    const response = await api.get('/gamification/me');
    return response.data; // { totalXp, level, levelName }
  },

  async getLeaderboard() {
    const response = await api.get('/gamification/leaderboard');
    return response.data; // [{ rank, displayName, totalXp, level, levelName, isCurrentUser }]
  },

  async getMyBadges() {
    const response = await api.get('/gamification/badges');
    return response.data; // [{ id, name, description, iconName, unlocked, unlockedAt, progress, target }]
  },
};
