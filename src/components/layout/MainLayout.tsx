import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0' // Se ajustará cuando el sidebar esté expandido
      }}>
        {/* Header */}
        <Header />
        
        {/* Contenido de la página */}
        <main style={{
          flex: 1,
          padding: '20px',
          overflow: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;