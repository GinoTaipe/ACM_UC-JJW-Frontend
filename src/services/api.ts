// src/services/api.ts - CORREGIDO
import axios from 'axios';

const API_BASE_URL = "http://localhost:8001/api"; // ✅ AGREGAR /api

// Crear instancia de axios configurada
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ AGREGAR INTERCEPTOR PARA TOKEN
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Manejar error 401 (No autorizado)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);