import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SidebarMenu from './SidebarMenu';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Menús según el rol
  const getMenuItems = () => {
    const baseItems = [
      { icon: '📊', label: 'Dashboard', path: `/${user?.role}` }
    ];

    const roleItems = {
      patient: [
        ...baseItems,
        { icon: '📅', label: 'Mis Citas', path: '/patient/appointments' },
        { icon: '📋', label: 'Historial Médico', path: '/patient/medicalhistory' },
        { icon: '💊', label: 'Agendar Cita', path: '/patient/appointments/new' },
        { icon: '👤', label: 'Mi Perfil', path: '/patient/profile' }
      ],
      doctor: [
        ...baseItems,
        { icon: '👥', label: 'Pacientes', path: '/doctor/patients' },
        { icon: '📅', label: 'Agenda', path: '/doctor/schedule' },
        { icon: '📋', label: 'Historiales', path: '/doctor/medical-records' },
        { icon: '💊', label: 'Recetas', path: '/doctor/prescriptions' },
        { icon: '📈', label: 'Reportes', path: '/doctor/reports' }
      ],
      admin: [
        ...baseItems,
        { icon: '👥', label: 'Usuarios', path: '/admin/users' },
        { icon: '📊', label: 'Estadísticas', path: '/admin/statistics' },
        { icon: '⚙️', label: 'Configuración', path: '/admin/settings' },
        { icon: '📋', label: 'Reportes', path: '/admin/reports' }
      ]
    };

    return roleItems[user?.role as keyof typeof roleItems] || baseItems;
  };

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '280px',
      background: 'white',
      borderRight: '1px solid #e2e8f0',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      left: 0
    }}>
      {/* Header del Sidebar */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between'
      }}>
        {!isCollapsed && (
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#2a4ea2'
          }}>
            Menú Principal
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '18px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Menú de navegación */}
      <nav style={{
        flex: 1,
        padding: '20px 0'
      }}>
        <SidebarMenu 
          items={getMenuItems()} 
          isCollapsed={isCollapsed} 
        />
      </nav>

      {/* Footer del Sidebar */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        {!isCollapsed && (
          <div style={{
            fontSize: '12px',
            color: '#64748b'
          }}>
            SaludConectada v1.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;