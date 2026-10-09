import api from './api';

export const chapterService = {
  async getChaptersBySubject(subjectId) {
    const response = await api.get(`/chapters/subject/${subjectId}`);
    return response.data;
  },

  async createChapter(chapterData) {
    // chapterData: { name, description, subject: { id: subjectId } }
    const response = await api.post('/chapters', chapterData);
    return response.data;
  },

  async deleteChapter(id) {
    const response = await api.delete(`/chapters/${id}`);
    return response.data;
  },
};
