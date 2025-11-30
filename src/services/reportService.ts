// services/reportService.ts
import { Statistics, PatientReport, AppointmentStats, PrescriptionStats, ReportFilters } from '../types/reports';

// Datos de ejemplo para estadísticas
const mockStatistics: Statistics = {
  totalPatients: 156,
  totalAppointments: 342,
  completedAppointments: 298,
  cancelledAppointments: 24,
  totalPrescriptions: 189,
  monthlyRevenue: 28450,
  averageRating: 4.7
};

const mockPatientReports: PatientReport[] = [
  {
    patientId: '101',
    patientName: 'Ana García',
    totalAppointments: 12,
    completedAppointments: 10,
    totalPrescriptions: 8,
    commonDiagnosis: ['Hipertensión', 'Control rutinario'],
    lastVisit: '2024-01-15'
  },
  {
    patientId: '102',
    patientName: 'Carlos López',
    totalAppointments: 8,
    completedAppointments: 7,
    totalPrescriptions: 6,
    commonDiagnosis: ['Diabetes tipo 2', 'Control glucosa'],
    lastVisit: '2024-01-14'
  },
  {
    patientId: '103',
    patientName: 'María Torres',
    totalAppointments: 15,
    completedAppointments: 14,
    totalPrescriptions: 12,
    commonDiagnosis: ['Artritis', 'Control dolor'],
    lastVisit: '2024-01-12'
  }
];

const mockAppointmentStats: AppointmentStats[] = [
  { date: '2024-01-01', scheduled: 8, completed: 7, cancelled: 1 },
  { date: '2024-01-02', scheduled: 10, completed: 9, cancelled: 1 },
  { date: '2024-01-03', scheduled: 6, completed: 6, cancelled: 0 },
  { date: '2024-01-04', scheduled: 9, completed: 8, cancelled: 1 },
  { date: '2024-01-05', scheduled: 7, completed: 6, cancelled: 1 },
];

const mockPrescriptionStats: PrescriptionStats[] = [
  { medication: 'Losartán', count: 45, percentage: 23.8 },
  { medication: 'Metformina', count: 38, percentage: 20.1 },
  { medication: 'Atorvastatina', count: 32, percentage: 16.9 },
  { medication: 'Omeprazol', count: 28, percentage: 14.8 },
  { medication: 'Aspirina', count: 25, percentage: 13.2 },
  { medication: 'Otros', count: 21, percentage: 11.1 }
];

export const reportService = {
  // Obtener estadísticas generales
  getStatistics: async (filters?: ReportFilters): Promise<Statistics> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockStatistics;
  },

  // Obtener reportes por paciente
  getPatientReports: async (filters?: ReportFilters): Promise<PatientReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockPatientReports;
  },

  // Obtener estadísticas de citas
  getAppointmentStats: async (filters?: ReportFilters): Promise<AppointmentStats[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockAppointmentStats;
  },

  // Obtener estadísticas de prescripciones
  getPrescriptionStats: async (filters?: ReportFilters): Promise<PrescriptionStats[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockPrescriptionStats;
  },

  // Generar reporte PDF
  generatePDFReport: async (filters: ReportFilters): Promise<Blob> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simular generación de PDF
    return new Blob(['PDF content'], { type: 'application/pdf' });
  }
};