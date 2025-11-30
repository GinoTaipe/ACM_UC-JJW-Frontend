// src/types/appointment.ts
export interface Appointment {
  id: number;  // ✅ Cambiado de string a number para coincidir con tu backend
  patient_id: number;
  patient_name: string;
  doctor_id: number; 
  doctor_name: string;
  appointment_date: string; // Formato: "2024-01-20T10:00:00"
  duration_minutes: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reason?: string;
  symptoms?: string;
  diagnosis?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentRequest {
  patient_id: number;
  doctor_id: number;
  appointment_date: string; // Formato: "2024-01-20T10:00:00"
  duration_minutes: number;
  status?: 'scheduled' | 'confirmed';
  reason?: string;
  symptoms?: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointment?: Appointment;
}