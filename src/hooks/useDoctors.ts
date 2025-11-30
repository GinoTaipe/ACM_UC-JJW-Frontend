// src/hooks/useDoctors.ts
import { useState, useEffect, useCallback } from 'react';
import { Doctor } from '../services/doctorService';
import { doctorService } from '../services/doctorService';

interface UseDoctorsReturn {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  loadDoctors: () => Promise<void>;
  getDoctorsBySpecialization: (specialization: string) => Doctor[];
  getDoctorById: (id: number) => Doctor | undefined;
  clearError: () => void;
}

export const useDoctors = (): UseDoctorsReturn => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar todos los médicos
   */
  const loadDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los médicos';
      setError(errorMessage);
      console.error('Error loading doctors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtener médicos por especialidad
   */
  const getDoctorsBySpecialization = useCallback((specialization: string): Doctor[] => {
    return doctors.filter(doctor => 
      doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
    );
  }, [doctors]);

  /**
   * Obtener médico por ID
   */
  const getDoctorById = useCallback((id: number): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
  }, [doctors]);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cargar médicos al montar el hook
  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  return {
    doctors,
    loading,
    error,
    loadDoctors,
    getDoctorsBySpecialization,
    getDoctorById,
    clearError,
  };
};