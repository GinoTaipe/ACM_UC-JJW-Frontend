// src/services/authService.ts - CORREGIDO
import { api } from './api';

export interface LoginRequest {
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  role: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'patient' | 'doctor' | 'admin';
  is_active: boolean;
  name?: string; // Para compatibilidad
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Guardar token automáticamente
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
      // Configurar header Authorization para futuras requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    
    return response.data;
  },

  async register(userData: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    
    return response.data;
  },

  // ⚠️ NOTA: Tu backend NO tiene endpoint /auth/me por ahora
  // Podemos simularlo o crear el endpoint después
  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Simular datos del usuario basados en el token
    // En una implementación real, harías una request al backend
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }

    throw new Error('User data not found');
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    delete api.defaults.headers.common['Authorization'];
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};