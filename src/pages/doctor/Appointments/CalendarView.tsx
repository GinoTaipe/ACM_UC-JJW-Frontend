// src/pages/doctor/Appointments/CalendarView.tsx - ACTUALIZADO
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
}

const CalendarView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    appointments, 
    loading, 
    error, 
    loadAppointments,
    updateAppointment 
  } = useAppointments();

  
  // 🎯 DEBUG - SOLO ESTAS 4 LÍNEAS:
  console.log('🔍 User:', user);
  console.log('🔍 Appointments:', appointments);
  console.log('🔍 Loading:', loading);
  console.log('🔍 Error:', error);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  // Cargar citas del médico cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id && user.role === 'doctor') {
      loadAppointments(user.id, 'doctor');
    }
  }, [user, loadAppointments]);

  // Horarios de trabajo (8 AM to 6 PM)
  const workHours = Array.from({ length: 11 }, (_, i) => i + 8);

  // Obtener citas para la fecha seleccionada
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date).toISOString().split('T')[0];
      return appointmentDate === date;
    });
  };

  // Navegación del calendario
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener color según estado
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

  // Vista semanal - Días de la semana
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  // Obtener citas por hora para un día específico
  const getAppointmentsForHour = (date: string, hour: number) => {
    return getAppointmentsForDate(date).filter(appointment => {
      const appointmentHour = new Date(appointment.appointment_date).getHours();
      return appointmentHour === hour;
    });
  };

  // Cambiar estado de la cita
  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      const success = await updateAppointment(appointmentId, { status: newStatus as any });
      if (success) {
        alert(`Cita ${getStatusText(newStatus).toLowerCase()} exitosamente`);
      }
    } catch (err) {
      alert('Error al actualizar la cita');
    }
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

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Cargando agenda...</div>
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
          Agenda Médica
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona tus citas y horarios de atención
        </p>
      </div>

      {/* Controles del calendario */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={goToToday}
            style={{
              padding: '8px 16px',
              background: '#2a4ea2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Hoy
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={goToPrevious}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '5px'
              }}
            >
              ◀
            </button>
            
            <span style={{ 
              fontWeight: '600',
              color: '#1e293b',
              minWidth: '200px',
              textAlign: 'center'
            }}>
              {formatDate(currentDate)}
            </span>

            <button
              onClick={goToNext}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '5px'
              }}
            >
              ▶
            </button>
          </div>
        </div>

        {/* Selector de vista */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['day', 'week', 'month'] as const).map(viewType => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              style={{
                padding: '8px 16px',
                background: view === viewType ? '#2a4ea2' : 'white',
                color: view === viewType ? 'white' : '#374151',
                border: `1px solid ${view === viewType ? '#2a4ea2' : '#d1d5db'}`,
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {viewType === 'day' ? 'Día' : viewType === 'week' ? 'Semana' : 'Mes'}
            </button>
          ))}
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

      {/* Vista Semanal del Calendario */}
      {view === 'week' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Encabezado de días */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <div style={{ 
              padding: '15px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Hora
            </div>
            {weekDays.map(day => (
              <div
                key={day.toISOString()}
                style={{
                  padding: '15px',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: day.toDateString() === new Date().toDateString() 
                    ? '#2a4ea2' 
                    : '#374151',
                  background: day.toDateString() === new Date().toDateString() 
                    ? '#f0f9ff' 
                    : 'transparent',
                  borderLeft: '1px solid #e5e7eb',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedDate(day.toISOString().split('T')[0])}
              >
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {day.toLocaleDateString('es-ES', { weekday: 'short' })}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700',
                  marginTop: '4px'
                }}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Cuerpo del calendario - Horas */}
          <div style={{ maxHeight: '600px', overflow: 'auto' }}>
            {workHours.map(hour => (
              <div
                key={hour}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px repeat(7, 1fr)',
                  borderBottom: '1px solid #f3f4f6'
                }}
              >
                {/* Columna de horas */}
                <div style={{
                  padding: '10px 15px',
                  color: '#6b7280',
                  fontSize: '14px',
                  borderRight: '1px solid #e5e7eb',
                  background: '#f8fafc'
                }}>
                  {hour}:00
                </div>

                {/* Celdas de cada día */}
                {weekDays.map(day => {
                  const dayString = day.toISOString().split('T')[0];
                  const hourAppointments = getAppointmentsForHour(dayString, hour);

                  return (
                    <div
                      key={dayString}
                      style={{
                        minHeight: '60px',
                        borderRight: '1px solid #e5e7eb',
                        position: 'relative',
                        background: 'white',
                        padding: '2px'
                      }}
                    >
                      {hourAppointments.map(appointment => (
                        <div
                          key={appointment.id}
                          style={{
                            background: getStatusColor(appointment.status),
                            color: 'white',
                            padding: '6px',
                            margin: '1px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            right: '2px',
                            bottom: '2px',
                            zIndex: 1,
                            overflow: 'hidden'
                          }}
                          title={`${appointment.patient_name} - ${new Date(appointment.appointment_date).toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} - ${getStatusText(appointment.status)}`}
                          onClick={() => {
                            // Mostrar detalles de la cita
                            alert(`Detalles de la cita:\n\nPaciente: ${appointment.patient_name}\nHora: ${new Date(appointment.appointment_date).toLocaleTimeString('es-ES')}\nDuración: ${appointment.duration_minutes} min\nEstado: ${getStatusText(appointment.status)}\nMotivo: ${appointment.reason || 'No especificado'}`);
                          }}
                        >
                          <div style={{ 
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '10px'
                          }}>
                            {appointment.patient_name}
                          </div>
                          <div style={{ 
                            fontSize: '9px',
                            opacity: '0.9'
                          }}>
                            {new Date(appointment.appointment_date).toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leyenda de estados */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#f59e0b'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Programada</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Confirmada</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#3b82f6'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>En progreso</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#6b7280'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Completada</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ef4444'
          }}></div>
          <span style={{ fontSize: '14px', color: '#374151' }}>Cancelada</span>
        </div>
      </div>

      {/* Resumen del día seleccionado */}
      <div style={{
        marginTop: '30px',
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
          Citas para {new Date(selectedDate).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        {getAppointmentsForDate(selectedDate).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280',
            padding: '40px'
          }}>
            No hay citas programadas para este día
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {getAppointmentsForDate(selectedDate)
              .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
              .map(appointment => (
                <div
                  key={appointment.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: getStatusColor(appointment.status),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {new Date(appointment.appointment_date).getHours()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {appointment.patient_name}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {new Date(appointment.appointment_date).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} • {appointment.duration_minutes} min • {getStatusText(appointment.status)}
                      </div>
                      {appointment.reason && (
                        <div style={{ 
                          fontSize: '13px',
                          color: '#6b7280',
                          fontStyle: 'italic',
                          marginTop: '4px'
                        }}>
                          📝 {appointment.reason}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button 
                      onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                      disabled={appointment.status !== 'scheduled'}
                      style={{
                        padding: '6px 12px',
                        background: appointment.status !== 'scheduled' ? '#e5e7eb' : '#d1fae5',
                        color: appointment.status !== 'scheduled' ? '#9ca3af' : '#065f46',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: appointment.status === 'scheduled' ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Confirmar
                    </button>
                    <button 
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                      disabled={appointment.status !== 'in_progress'}
                      style={{
                        padding: '6px 12px',
                        background: appointment.status !== 'in_progress' ? '#e5e7eb' : '#f3f4f6',
                        color: appointment.status !== 'in_progress' ? '#9ca3af' : '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: appointment.status === 'in_progress' ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Completar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;