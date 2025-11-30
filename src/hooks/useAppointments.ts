// src/hooks/useAppointments.ts
import { useState, useEffect, useCallback } from 'react';
import { Appointment, CreateAppointmentRequest } from '../types/appointment';
import { appointmentService } from '../services/appointmentService';

interface UseAppointmentsReturn {
  // Estado
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  
  // Acciones
  loadAppointments: (userId: number, role: 'patient' | 'doctor') => Promise<void>;
  createAppointment: (appointmentData: CreateAppointmentRequest) => Promise<boolean>;
  updateAppointment: (id: number, updates: Partial<Appointment>) => Promise<boolean>;
  cancelAppointment: (id: number) => Promise<boolean>;
  confirmAppointment: (id: number) => Promise<boolean>;
  refreshAppointments: () => Promise<void>;
  
  // Utilidades
  clearError: () => void;
  getAppointmentById: (id: number) => Appointment | undefined;
}

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<'patient' | 'doctor' | null>(null);

  /**
   * Cargar citas del usuario actual
   */
  const loadAppointments = useCallback(async (userId: number, role: 'patient' | 'doctor') => {
    setLoading(true);
    setError(null);
    
    try {
      let data: Appointment[];
      
      if (role === 'patient') {
        data = await appointmentService.getPatientAppointments(userId);
      } else {
        data = await appointmentService.getDoctorAppointments(userId);
      }
      
      setAppointments(data);
      setCurrentUserId(userId);
      setCurrentUserRole(role);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las citas';
      setError(errorMessage);
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Recargar citas (usando los mismos parámetros)
   */
  const refreshAppointments = useCallback(async () => {
    if (currentUserId && currentUserRole) {
      await loadAppointments(currentUserId, currentUserRole);
    }
  }, [currentUserId, currentUserRole, loadAppointments]);

  /**
   * Crear nueva cita
   */
  const createAppointment = useCallback(async (appointmentData: CreateAppointmentRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const newAppointment = await appointmentService.createAppointment(appointmentData);
      
      // Actualizar el estado local
      setAppointments(prev => [...prev, newAppointment]);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la cita';
      setError(errorMessage);
      console.error('Error creating appointment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualizar cita existente
   */
  const updateAppointment = useCallback(async (id: number, updates: Partial<Appointment>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedAppointment = await appointmentService.updateAppointment(id, updates);
      
      // Actualizar el estado local
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? updatedAppointment : apt)
      );
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la cita';
      setError(errorMessage);
      console.error('Error updating appointment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cancelar cita
   */
  const cancelAppointment = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const cancelledAppointment = await appointmentService.cancelAppointment(id);
      
      // Actualizar el estado local
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? cancelledAppointment : apt)
      );
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cancelar la cita';
      setError(errorMessage);
      console.error('Error cancelling appointment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Confirmar cita
   */
  const confirmAppointment = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const confirmedAppointment = await appointmentService.confirmAppointment(id);
      
      // Actualizar el estado local
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? confirmedAppointment : apt)
      );
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al confirmar la cita';
      setError(errorMessage);
      console.error('Error confirming appointment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener cita por ID
   */
  const getAppointmentById = useCallback((id: number): Appointment | undefined => {
    return appointments.find(apt => apt.id === id);
  }, [appointments]);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Efecto para limpiar errores después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    // Estado
    appointments,
    loading,
    error,
    
    // Acciones
    loadAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    confirmAppointment,
    refreshAppointments,
    
    // Utilidades
    clearError,
    getAppointmentById,
  };
};