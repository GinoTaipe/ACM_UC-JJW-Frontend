// src/contexts/AuthContext.tsx - CORREGIDO
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse, User } from '../services/authService';

// Interfaces corregidas
interface LoginCredentials {
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        authService.logout();
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // LLAMADA REAL AL BACKEND - CORREGIDA
      const authResponse: AuthResponse = await authService.login(credentials);
      
      // Crear objeto User a partir de la respuesta del backend
      const user: User = {
        id: authResponse.user_id,
        email: credentials.email,
        first_name: authResponse.first_name,
        last_name: authResponse.last_name,
        role: authResponse.role as 'patient' | 'doctor' | 'admin',
        is_active: true,
        name: `${authResponse.first_name} ${authResponse.last_name}`
      };

      // Guardar datos del usuario en localStorage
      localStorage.setItem('user_data', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      // Manejar errores específicos del backend
      const errorMessage = error.response?.data?.detail;
      console.log(errorMessage)
      throw new Error(errorMessage);
    }
  };

  const logout = (): void => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>): void => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};