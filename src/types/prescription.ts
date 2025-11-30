// types/prescription.ts
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface CreatePrescriptionRequest {
  patientId: string;
  medications: Omit<Medication, 'id'>[];
  diagnosis: string;
  notes?: string;
}