import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2a4ea2', margin: 0 }}>Panel del Paciente</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
        
        <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '5px', marginBottom: '2rem' }}>
          <h3>¡Bienvenido, {user?.name}!</h3>
          <p>Email: {user?.email} | Rol: {user?.role}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3>📅 Mis Citas</h3>
            <p>Gestiona tus citas médicas</p>
          </div>
          
          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3>📋 Historial Médico</h3>
            <p>Consulta tu historial</p>
          </div>
          
          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3>💊 Mis Recetas</h3>
            <p>Ver recetas activas</p>
          </div>
          
          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3>👤 Mi Perfil</h3>
            <p>Editar información personal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;