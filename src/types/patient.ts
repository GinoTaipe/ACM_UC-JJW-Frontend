// types/patient.ts
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'Activo' | 'Inactivo';
  notes?: string;
}

export interface CreatePatientRequest {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  notes?: string;
}