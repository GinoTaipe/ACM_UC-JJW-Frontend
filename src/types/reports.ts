// types/reports.ts
export interface ReportFilters {
  startDate: string;
  endDate: string;
  patientId?: string;
  reportType: 'general' | 'patient' | 'appointments' | 'prescriptions';
}

export interface Statistics {
  totalPatients: number;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalPrescriptions: number;
  monthlyRevenue: number;
  averageRating: number;
}

export interface PatientReport {
  patientId: string;
  patientName: string;
  totalAppointments: number;
  completedAppointments: number;
  totalPrescriptions: number;
  commonDiagnosis: string[];
  lastVisit: string;
}

export interface AppointmentStats {
  date: string;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface PrescriptionStats {
  medication: string;
  count: number;
  percentage: number;
}