// src/services/patientService.ts
import { api } from './api';

export const patientService = {
  async getAll() {
    const response = await api.get('/patients');
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  async create(patientData: any) {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  async update(id: number, patientData: any) {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  }
};