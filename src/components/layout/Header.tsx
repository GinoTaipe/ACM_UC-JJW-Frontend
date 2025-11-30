import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplay = (role: string) => {
    const roles = {
      patient: 'Paciente',
      doctor: 'Médico',
      admin: 'Administrador'
    };
    return roles[role as keyof typeof roles] || role;
  };

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 20px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Logo y título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img 
          src="/assets/images/logos/logo-splash.png" 
          alt="SaludConectada" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <h1 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
          color: '#2a4ea2'
        }}>
          SaludConectada
        </h1>
      </div>

      {/* Información del usuario */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2a4ea2, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#1e293b'
            }}>
              {user?.name}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b'
            }}>
              {getRoleDisplay(user?.role || '')}
            </div>
          </div>
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '200px',
            zIndex: 1000,
            marginTop: '5px'
          }}>
            <div style={{ padding: '16px' }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                {user?.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#64748b',
                marginBottom: '12px'
              }}>
                {user?.email}
              </div>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #e2e8f0',
              padding: '8px 0'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>🚪</span>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cerrar dropdown al hacer click fuera */}
      {showDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;