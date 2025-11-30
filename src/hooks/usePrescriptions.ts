// hooks/usePrescriptions.ts
import { useState, useEffect } from 'react';
import { Prescription, CreatePrescriptionRequest } from '../types/prescription';
import { prescriptionService } from '../services/prescriptionService';

export const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPrescriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      // En una app real, el doctorId vendría del contexto de autenticación
      const data = await prescriptionService.getPrescriptions('1');
      setPrescriptions(data);
    } catch (err) {
      setError('Error al cargar las recetas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPrescription = async (data: CreatePrescriptionRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newPrescription = await prescriptionService.createPrescription(data);
      setPrescriptions(prev => [...prev, newPrescription]);
      return true;
    } catch (err) {
      setError('Error al crear la receta');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  return {
    prescriptions,
    loading,
    error,
    createPrescription,
    refreshPrescriptions: loadPrescriptions
  };
};