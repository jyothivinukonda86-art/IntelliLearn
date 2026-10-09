import api from './api';

export const materialService = {
  async getMaterialsByChapter(chapterId) {
    const response = await api.get(`/materials/chapter/${chapterId}`);
    return response.data;
  },

  async getMaterialById(id) {
    const response = await api.get(`/materials/${id}`);
    return response.data;
  },

  async createMaterial(materialData) {
    const chapId = materialData.chapterId || materialData.chapter?.id;
    const payload = {
      title: materialData.title,
      description: materialData.description,
      type: materialData.type,
      fileUrl: materialData.fileUrl,
      chapterId: chapId,
      chapter: chapId ? { id: chapId } : undefined,
    };
    const response = await api.post('/materials', payload);
    return response.data;
  },

  async deleteMaterial(id) {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
  },
};
