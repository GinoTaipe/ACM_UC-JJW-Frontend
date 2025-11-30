// src/hooks/useAvailableSlots.ts - MEJORADO
import { useState, useCallback } from 'react';
import { appointmentService } from '../services/appointmentService';

interface UseAvailableSlotsReturn {
  availableSlots: string[];
  loading: boolean;
  error: string | null;
  loadAvailableSlots: (doctorId: number, date: string) => Promise<void>;
  clearSlots: () => void;
  clearError: () => void;
}

export const useAvailableSlots = (): UseAvailableSlotsReturn => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar horarios disponibles - CON FALLBACK
   */
  const loadAvailableSlots = useCallback(async (doctorId: number, date: string) => {
    if (!doctorId || !date) {
      setAvailableSlots([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Intentar cargar del backend
      const slots = await appointmentService.getAvailableSlots(doctorId, date);
      
      if (slots.length > 0) {
        // Si el backend devuelve horarios, usarlos
        setAvailableSlots(slots);
      } else {
        // Si no hay horarios del backend, generar horarios estándar
        const defaultSlots = generateDefaultSlots();
        setAvailableSlots(defaultSlots);
      }
    } catch (err) {
      // Si hay error, usar horarios por defecto
      const errorMessage = 'No se pudieron cargar los horarios. Usando horarios estándar.';
      setError(errorMessage);
      console.error('Error loading available slots:', err);
      
      const defaultSlots = generateDefaultSlots();
      setAvailableSlots(defaultSlots);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Generar horarios por defecto (8:00 AM - 5:00 PM)
   */
  const generateDefaultSlots = (): string[] => {
    const slots: string[] = [];
    const startHour = 8; // 8 AM
    const endHour = 17;  // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    
    return slots;
  };

  /**
   * Limpiar slots
   */
  const clearSlots = useCallback(() => {
    setAvailableSlots([]);
  }, []);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    availableSlots,
    loading,
    error,
    loadAvailableSlots,
    clearSlots,
    clearError,
  };
};