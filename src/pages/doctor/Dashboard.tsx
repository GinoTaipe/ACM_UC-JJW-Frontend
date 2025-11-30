import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 

  // Datos de ejemplo para el dashboard
  const stats = {
    totalPatients: 124,
    appointmentsToday: 8,
    pendingRecords: 5,
    monthlyRevenue: 'S/ 12,450'
  };

  const recentAppointments = [
    { id: 1, patient: 'Ana García', time: '09:00 AM', type: 'Consulta general', status: 'Confirmada' },
    { id: 2, patient: 'Carlos López', time: '10:30 AM', type: 'Control', status: 'Confirmada' },
    { id: 3, patient: 'María Torres', time: '11:15 AM', type: 'Revisión', status: 'Pendiente' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Header del Dashboard */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#2a4ea2', 
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Dashboard Médico
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Bienvenido, Dr. {user?.name}. Aquí tienes un resumen de tu actividad.
        </p>
      </div>

      {/* Estadísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Tarjeta Pacientes Totales */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#d1fae5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              👥
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Pacientes Totales
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#065f46'
              }}>
                {stats.totalPatients}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Citas Hoy */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📅
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Citas Hoy
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#1e40af'
              }}>
                {stats.appointmentsToday}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Historiales Pendientes */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📋
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Pendientes
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#92400e'
              }}>
                {stats.pendingRecords}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Ingresos Mensuales */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #8b5cf6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#ede9fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              💰
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Ingresos Mensuales
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#5b21b6'
              }}>
                {stats.monthlyRevenue}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de dos columnas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Próximas Citas */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Próximas Citas Hoy
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {recentAppointments.map(appointment => (
              <div key={appointment.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '4px'
                  }}>
                    {appointment.patient}
                  </div>
                  <div style={{ 
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    {appointment.time} • {appointment.type}
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  background: appointment.status === 'Confirmada' ? '#d1fae5' : '#fef3c7',
                  color: appointment.status === 'Confirmada' ? '#065f46' : '#92400e',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {appointment.status}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/doctor/schedule')}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '12px',
              background: 'transparent',
              border: '2px solid #2a4ea2',
              color: '#2a4ea2',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a4ea2';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#2a4ea2';
            }}
          >
            Ver Agenda Completa
          </button>
        </div>

        {/* Acciones Rápidas */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Acciones Rápidas
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => navigate('/doctor/patients')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '15px',
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500',
                color: '#0369a1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e0f2fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f0f9ff';
              }}
            >
              <span style={{ fontSize: '18px' }}>👥</span>
              Gestionar Pacientes
            </button>

                        <button 
              onClick={() => navigate('/doctor/appointments/new')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '15px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500',
                color: '#166534'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dcfce7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f0fdf4';
              }}
            >
              <span style={{ fontSize: '18px' }}>📅</span>
              Programar Cita
            </button>

                        <button 
              onClick={() => navigate('/doctor/medical-records/new')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '15px',
                background: '#fef7ed',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500',
                color: '#9a3412'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffedd5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fef7ed';
              }}
            >
              <span style={{ fontSize: '18px' }}>📋</span>
              Nuevo Historial
            </button>

                      <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '15px',
            background: '#faf5ff',
            border: '1px solid #e9d5ff',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '14px',
            fontWeight: '500',
            color: '#7c3aed'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3e8ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#faf5ff';
          }}
          onClick={() => window.location.href = '/doctor/prescriptions/new'}>
            <span style={{ fontSize: '18px' }}>💊</span>
            Emitir Receta
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;