// src/pages/doctor/Appointments/AppointmentList.tsx - ACTUALIZADO
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../../hooks/useAppointments';
import { useAuth } from '../../../contexts/AuthContext';

interface Appointment {
  id: number;
  patient_name: string;
  patient_id: number;
  appointment_date: string;
  duration_minutes: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reason?: string;
  symptoms?: string;
  diagnosis?: string;
  notes?: string;
}

const AppointmentList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    appointments, 
    loading, 
    error, 
    loadAppointments, 
    updateAppointment,
    cancelAppointment 
  } = useAppointments();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar citas del médico cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id && user.role === 'doctor') {
      loadAppointments(user.id, 'doctor');
    }
  }, [user, loadAppointments]);

  // Filtrar citas
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (appointment.reason && appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: '#f59e0b',    // Amarillo - Programada
      confirmed: '#10b981',    // Verde - Confirmada
      in_progress: '#3b82f6',  // Azul - En progreso
      completed: '#6b7280',    // Gris - Completada
      cancelled: '#ef4444',    // Rojo - Cancelada
      no_show: '#dc2626'       // Rojo oscuro - No se presentó
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const getStatusText = (status: string) => {
    const texts = {
      scheduled: 'Programada',
      confirmed: 'Confirmada',
      in_progress: 'En progreso',
      completed: 'Completada',
      cancelled: 'Cancelada',
      no_show: 'No asistió'
    };
    return texts[status as keyof typeof texts] || status;
  };

  // Confirmar cita
  const handleConfirmAppointment = async (id: number) => {
    try {
      const success = await updateAppointment(id, { status: 'confirmed' });
      if (success) {
        alert('Cita confirmada exitosamente');
      }
    } catch (err) {
      alert('Error al confirmar la cita');
    }
  };

  // Marcar como en progreso
  const handleStartAppointment = async (id: number) => {
    try {
      const success = await updateAppointment(id, { status: 'in_progress' });
      if (success) {
        alert('Cita marcada como en progreso');
      }
    } catch (err) {
      alert('Error al actualizar la cita');
    }
  };

  // Completar cita
  const handleCompleteAppointment = async (id: number) => {
    try {
      const success = await updateAppointment(id, { status: 'completed' });
      if (success) {
        alert('Cita completada exitosamente');
      }
    } catch (err) {
      alert('Error al completar la cita');
    }
  };

  // Cancelar cita
  const handleCancelAppointment = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        const success = await cancelAppointment(id);
        if (success) {
          alert('Cita cancelada exitosamente');
        }
      } catch (err) {
        alert('Error al cancelar la cita');
      }
    }
  };

  // Ver detalles de la cita
  const handleViewDetails = (appointment: Appointment) => {
    // Podrías navegar a una página de detalles o mostrar un modal
    console.log('Ver detalles:', appointment);
    alert(`Detalles de la cita:\nPaciente: ${appointment.patient_name}\nFecha: ${new Date(appointment.appointment_date).toLocaleString()}\nMotivo: ${appointment.reason || 'No especificado'}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Cargando citas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ color: '#ef4444', marginBottom: '15px' }}>Error: {error}</div>
        <button 
          onClick={() => user?.id && loadAppointments(user.id, 'doctor')}
          style={{
            padding: '10px 20px',
            background: '#2a4ea2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#2a4ea2', 
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Lista de Citas
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona todas tus citas médicas programadas
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Búsqueda */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar por paciente o motivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 40px 10px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                width: '300px'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              🔍
            </span>
          </div>

          {/* Filtro por estado */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="all">Todos los estados</option>
            <option value="scheduled">Programadas</option>
            <option value="confirmed">Confirmadas</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <button 
          onClick={() => navigate('/doctor/appointments/schedule')}
          style={{
            padding: '10px 20px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>➕</span>
          Nueva Cita
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#2a4ea2' }}>
            {appointments.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Citas</div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
            {appointments.filter(a => a.status === 'confirmed').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Confirmadas</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
            {appointments.filter(a => a.status === 'scheduled').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Programadas</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
            {appointments.filter(a => a.status === 'cancelled' || a.status === 'no_show').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Canceladas/No Show</div>
        </div>
      </div>

      {/* Tabla de citas */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Paciente
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Fecha y Hora
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Duración
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Estado
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>
                    {appointment.patient_name}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>
                    ID: {appointment.patient_id}
                  </div>
                  {appointment.reason && (
                    <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                      📝 {appointment.reason}
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500', color: '#1e293b' }}>
                    {new Date(appointment.appointment_date).toLocaleDateString('es-ES', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {new Date(appointment.appointment_date).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#6b7280' }}>
                  {appointment.duration_minutes} min
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '6px 12px',
                    background: getStatusColor(appointment.status),
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {getStatusText(appointment.status)}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleViewDetails(appointment)}
                      style={{
                        padding: '6px 12px',
                        background: '#e0f2fe',
                        color: '#0369a1',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Ver
                    </button>
                    
                    {appointment.status === 'scheduled' && (
                      <button 
                        onClick={() => handleConfirmAppointment(appointment.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#d1fae5',
                          color: '#065f46',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Confirmar
                      </button>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                      <button 
                        onClick={() => handleStartAppointment(appointment.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Iniciar
                      </button>
                    )}
                    
                    {appointment.status === 'in_progress' && (
                      <button 
                        onClick={() => handleCompleteAppointment(appointment.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Completar
                      </button>
                    )}
                    
                    {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            {appointments.length === 0 
              ? 'No tienes citas programadas.' 
              : 'No se encontraron citas con los filtros aplicados.'
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;