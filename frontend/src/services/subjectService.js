import api from './api';

export const subjectService = {
  async getAllSubjects() {
    const response = await api.get('/subjects');
    return response.data;
  },

  async getSubjectById(id) {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
  },

  async createSubject(subjectData) {
    const response = await api.post('/subjects', subjectData);
    return response.data;
  },

  async deleteSubject(id) {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
  },
};
