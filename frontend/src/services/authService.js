import api from './api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data; // { token, email, role }
  },

  async register(data) {
    const response = await api.post('/auth/register', data);
    return response.data; // "Student registered successfully"
  },
};
