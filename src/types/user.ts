// src/types/user.ts
export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: number;  // Cambiado de string a number para coincidir con backend
  email: string;
  first_name: string;  // Cambiado para coincidir con backend
  last_name: string;   // Cambiado para coincidir con backend
  name?: string;       // Mantener opcional para compatibilidad
  role: UserRole;
  avatar?: string;
  is_active?: boolean;
  phone?: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}