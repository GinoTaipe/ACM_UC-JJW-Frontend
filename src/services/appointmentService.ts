// src/services/appointmentService.ts
import { api } from './api';
import { Appointment, CreateAppointmentRequest } from '../types/appointment';

export const appointmentService = {
  /**
   * Crear nueva cita médica
   */
  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    try {
      const response = await api.post<Appointment>('/appointments/', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('No se pudo crear la cita. Por favor intenta nuevamente.');
    }
  },

  /**
   * Obtener todas las citas de un paciente
   */
  async getPatientAppointments(patientId: number): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>(`/appointments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      throw new Error('No se pudieron cargar las citas del paciente.');
    }
  },

  /**
   * Obtener todas las citas de un médico
   */
  async getDoctorAppointments(doctorId: number): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>(`/appointments/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      throw new Error('No se pudieron cargar las citas del médico.');
    }
  },

  /**
   * Obtener cita por ID
   */
  async getAppointmentById(id: number): Promise<Appointment> {
    try {
      const response = await api.get<Appointment>(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw new Error('No se pudo cargar la cita.');
    }
  },

  /**
   * Actualizar una cita existente
   */
  async updateAppointment(id: number, updates: Partial<Appointment>): Promise<Appointment> {
    try {
      const response = await api.put<Appointment>(`/appointments/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('No se pudo actualizar la cita.');
    }
  },

  /**
   * Cancelar una cita
   */
  async cancelAppointment(id: number): Promise<Appointment> {
    try {
      const response = await api.patch<Appointment>(`/appointments/${id}`, {
        status: 'cancelled'
      });
      return response.data;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw new Error('No se pudo cancelar la cita.');
    }
  },

  /**
   * Confirmar una cita
   */
  async confirmAppointment(id: number): Promise<Appointment> {
    try {
      const response = await api.patch<Appointment>(`/appointments/${id}`, {
        status: 'confirmed'
      });
      return response.data;
    } catch (error) {
      console.error('Error confirming appointment:', error);
      throw new Error('No se pudo confirmar la cita.');
    }
  },

  /**
   * Obtener horarios disponibles de un médico en una fecha específica
   */
  async getAvailableSlots(doctorId: number, date: string): Promise<string[]> {
    try {
      const response = await api.get<string[]>(`/appointments/doctor/${doctorId}/available-slots`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      // Si el endpoint no existe, retornar array vacío por ahora
      return [];
    }
  },

  /**
   * Obtener todas las citas (para administradores)
   */
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      throw new Error('No se pudieron cargar todas las citas.');
    }
  },

  /**
   * Eliminar una cita (solo admin o en casos específicos)
   */
  async deleteAppointment(id: number): Promise<void> {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('No se pudo eliminar la cita.');
    }
  }
};