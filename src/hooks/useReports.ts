// hooks/useReports.ts
import { useState, useEffect } from 'react';
import { Statistics, PatientReport, AppointmentStats, PrescriptionStats, ReportFilters } from '../types/reports';
import { reportService } from '../services/reportService';

export const useReports = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [patientReports, setPatientReports] = useState<PatientReport[]>([]);
  const [appointmentStats, setAppointmentStats] = useState<AppointmentStats[]>([]);
  const [prescriptionStats, setPrescriptionStats] = useState<PrescriptionStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAllReports = async (filters?: ReportFilters) => {
    setLoading(true);
    setError(null);
    try {
      const [stats, patients, appointments, prescriptions] = await Promise.all([
        reportService.getStatistics(filters),
        reportService.getPatientReports(filters),
        reportService.getAppointmentStats(filters),
        reportService.getPrescriptionStats(filters)
      ]);

      setStatistics(stats);
      setPatientReports(patients);
      setAppointmentStats(appointments);
      setPrescriptionStats(prescriptions);
    } catch (err) {
      setError('Error al cargar los reportes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (filters: ReportFilters): Promise<boolean> => {
    try {
      const pdfBlob = await reportService.generatePDFReport(filters);
      // Crear descarga del PDF
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      setError('Error al generar el PDF');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    loadAllReports();
  }, []);

  return {
    statistics,
    patientReports,
    appointmentStats,
    prescriptionStats,
    loading,
    error,
    refreshReports: loadAllReports,
    generatePDF
  };
};