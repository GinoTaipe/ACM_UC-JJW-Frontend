// src/services/prescriptionService.ts - VERSIÓN REAL
import { Prescription, CreatePrescriptionRequest } from '../types/prescription';
import { api } from './api';

export const prescriptionService = {
  getPrescriptions: async (doctorId: string): Promise<Prescription[]> => {
    const response = await api.get(`/prescriptions/doctor/${doctorId}`);
    return response.data;
  },

  getPrescriptionById: async (id: string): Promise<Prescription | null> => {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  },

  createPrescription: async (data: CreatePrescriptionRequest): Promise<Prescription> => {
    const response = await api.post('/prescriptions', data);
    return response.data;
  }
};