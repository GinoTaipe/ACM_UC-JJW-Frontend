// src/services/doctorService.ts
import { api } from './api';

export interface Doctor {
  id: number;
  user_id: number;
  license_number: string;
  specialization: string;
  years_experience: number;
  education: string;
  bio: string;
  consultation_fee: number;
  available_hours: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const doctorService = {
  /**
   * Obtener todos los médicos
   */
  async getAllDoctors(): Promise<Doctor[]> {
    try {
      const response = await api.get<Doctor[]>('/doctors');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw new Error('No se pudieron cargar los médicos.');
    }
  },

  /**
   * Obtener médico por ID
   */
  async getDoctorById(id: number): Promise<Doctor> {
    try {
      const response = await api.get<Doctor>(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor:', error);
      throw new Error('No se pudo cargar la información del médico.');
    }
  },

  /**
   * Obtener médicos por especialidad
   */
  async getDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    try {
      const response = await api.get<Doctor[]>(`/doctors/specialization/${specialization}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors by specialization:', error);
      // Si falla, retornar array vacío
      return [];
    }
  }
};