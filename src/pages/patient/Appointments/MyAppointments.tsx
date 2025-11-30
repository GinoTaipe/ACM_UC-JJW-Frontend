// src/pages/patient/Appointments/MyAppointments.tsx - CORREGIDO
import React, { useState, useEffect } from 'react';
import { useAppointments } from '../../../hooks/useAppointments';
import { useAuth } from '../../../contexts/AuthContext';
import '../../../styles/MyAppointments.css';

interface Cita {
  id: number;
  appointment_date: string;
  doctor_name: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reason?: string;
  duration_minutes: number;
  // Campos para compatibilidad
  fecha: string;
  hora: string;
  medico: string;
  especialidad: string;
  modalidad: string;
  estado: string;
  asunto?: string;
  motivo?: string;
}

const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const { 
    appointments, 
    loading, 
    error, 
    loadAppointments, 
    cancelAppointment,
    updateAppointment 
  } = useAppointments();

  const [activeTab, setActiveTab] = useState<'proximas' | 'pasadas' | 'canceladas'>('proximas');
  const [showDetails, setShowDetails] = useState<{ tab: string; id: number | null }>({
    tab: '',
    id: null,
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');

  // Cargar citas cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id && user.role === 'patient') {
      loadAppointments(user.id, 'patient');
    }
  }, [user, loadAppointments]);

  // Convertir appointments del backend al formato de la interfaz
  const citasProximas: Cita[] = appointments
    .filter(apt => 
      apt.status === 'scheduled' || 
      apt.status === 'confirmed' ||
      apt.status === 'in_progress'
    )
    .map(apt => ({
      id: apt.id,
      appointment_date: apt.appointment_date,
      doctor_name: apt.doctor_name,
      status: apt.status,
      reason: apt.reason,
      duration_minutes: apt.duration_minutes,
      // Campos para compatibilidad
      fecha: new Date(apt.appointment_date).toLocaleDateString('es-ES'),
      hora: new Date(apt.appointment_date).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      medico: apt.doctor_name,
      especialidad: 'Consulta médica', // Valor por defecto ya que no hay 'type' en Appointment
      modalidad: 'Presencial',
      estado: getEstadoTexto(apt.status),
      asunto: apt.reason
    }));

  const citasPasadas: Cita[] = appointments
    .filter(apt => apt.status === 'completed')
    .map(apt => ({
      id: apt.id,
      appointment_date: apt.appointment_date,
      doctor_name: apt.doctor_name,
      status: apt.status,
      reason: apt.reason,
      duration_minutes: apt.duration_minutes,
      fecha: new Date(apt.appointment_date).toLocaleDateString('es-ES'),
      hora: new Date(apt.appointment_date).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      medico: apt.doctor_name,
      especialidad: 'Consulta médica',
      modalidad: 'Presencial',
      estado: 'Atendido',
      asunto: apt.reason
    }));

  const citasCanceladas: Cita[] = appointments
    .filter(apt => apt.status === 'cancelled' || apt.status === 'no_show')
    .map(apt => ({
      id: apt.id,
      appointment_date: apt.appointment_date,
      doctor_name: apt.doctor_name,
      status: apt.status,
      reason: apt.reason,
      duration_minutes: apt.duration_minutes,
      fecha: new Date(apt.appointment_date).toLocaleDateString('es-ES'),
      hora: new Date(apt.appointment_date).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      medico: apt.doctor_name,
      especialidad: 'Consulta médica',
      modalidad: 'Presencial',
      estado: 'Cancelada',
      asunto: apt.reason,
      motivo: apt.status === 'cancelled' ? 'Cancelado por el paciente' : 'No se presentó'
    }));

  // Función para convertir estado del backend a texto
  function getEstadoTexto(status: string): string {
    const estados: { [key: string]: string } = {
      'scheduled': 'Programada',
      'confirmed': 'Confirmada',
      'in_progress': 'En progreso',
      'completed': 'Atendido',
      'cancelled': 'Cancelada',
      'no_show': 'No asistió'
    };
    return estados[status] || status;
  }

  // Abrir modal cancelar
  const handleCancelar = (cita: Cita) => {
    setSelectedCita(cita);
    setMotivoCancelacion('');
    setShowCancelModal(true);
  };

  // Confirmar cancelación REAL
  const confirmarCancelacion = async () => {
    if (!motivoCancelacion.trim()) {
      alert('Debes ingresar un motivo');
      return;
    }
    if (!selectedCita) return;

    try {
      const success = await cancelAppointment(selectedCita.id);
      
      if (success) {
        setShowCancelModal(false);
        alert('Cita cancelada exitosamente');
      } else {
        alert('Error al cancelar la cita');
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert('Error al cancelar la cita');
    }
  };

  // Cambiar visibilidad del detalle por TAB
  const toggleDetails = (tab: string, id: number) => {
    setShowDetails(prev =>
      prev.tab === tab && prev.id === id
        ? { tab: '', id: null }
        : { tab, id }
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="appointments-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tus citas...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="appointments-container">
        <div className="error-container">
          <h3>Error al cargar las citas</h3>
          <p>{error}</p>
          <button onClick={() => user?.id && loadAppointments(user.id, 'patient')}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      {/* Header */}
      <div className="appointments-header">
        <h1 className="appointments-title">Mis Citas Médicas</h1>
        <p className="appointments-subtitle">Revisa tus próximas citas, pasadas y canceladas</p>
      </div>

      {/* Tabs */}
      <div className="appointments-tabs">
        <button 
          onClick={() => setActiveTab('proximas')} 
          className={`tab-button ${activeTab === 'proximas' ? 'tab-active tab-proximas' : ''}`}
        >
          🔜 Próximas ({citasProximas.length})
        </button>
        <button 
          onClick={() => setActiveTab('pasadas')} 
          className={`tab-button ${activeTab === 'pasadas' ? 'tab-active tab-pasadas' : ''}`}
        >
          ✅ Pasadas ({citasPasadas.length})
        </button>
        <button 
          onClick={() => setActiveTab('canceladas')} 
          className={`tab-button ${activeTab === 'canceladas' ? 'tab-active tab-canceladas' : ''}`}
        >
          ❌ Canceladas ({citasCanceladas.length})
        </button>
      </div>

      {/* Grid */}
      <div className="appointments-grid">
        {/* Próximas */}
        {activeTab === 'proximas' && citasProximas.map(cita => (
          <div key={cita.id} className="appointment-card card-proxima">
            <div className="card-header">
              <span className="badge badge-proxima">{cita.estado}</span>
              <button onClick={() => toggleDetails('proximas', cita.id)} className="details-button">
                {showDetails.tab === 'proximas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {/* Mostrar detalles */}
            {showDetails.tab === 'proximas' && showDetails.id === cita.id && (
              <div className="details-box">
                <span className="info-label">Asunto</span>
                <p className="details-text">{cita.asunto || 'Sin asunto especificado'}</p>
                <div className="info-item"><span className="info-label">Duración</span> <span className="info-value">{cita.duration_minutes} minutos</span></div>
              </div>
            )}

            <div className="card-actions">
              <button onClick={() => handleCancelar(cita)} className="btn btn-cancel">Cancelar</button>
            </div>
          </div>
        ))}

        {/* Pasadas */}
        {activeTab === 'pasadas' && citasPasadas.map(cita => (
          <div key={cita.id} className="appointment-card card-pasada">
            <div className="card-header">
              <span className="badge badge-pasada">{cita.estado}</span>
              <button onClick={() => toggleDetails('pasadas', cita.id)} className="details-button">
                {showDetails.tab === 'pasadas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {showDetails.tab === 'pasadas' && showDetails.id === cita.id && (
              <div className="details-box details-pasada">
                <span className="info-label">Asunto</span>
                <p className="details-text">{cita.asunto || 'Sin asunto especificado'}</p>
                <p className="details-text">Cita atendida exitosamente</p>
              </div>
            )}
          </div>
        ))}

        {/* Canceladas */}
        {activeTab === 'canceladas' && citasCanceladas.map(cita => (
          <div key={cita.id} className="appointment-card card-cancelada">
            <div className="card-header">
              <span className="badge badge-cancelada">{cita.estado}</span>
              <button onClick={() => toggleDetails('canceladas', cita.id)} className="details-button">
                {showDetails.tab === 'canceladas' && showDetails.id === cita.id ? '−' : '+'}
              </button>
            </div>

            <div className="card-info">
              <div className="info-item"><span className="info-label">Fecha y Hora</span> <span className="info-value">{cita.fecha} - {cita.hora}</span></div>
              <div className="info-item"><span className="info-label">Especialidad</span> <span className="info-value">{cita.especialidad}</span></div>
              <div className="info-item"><span className="info-label">Médico</span> <span className="info-value">{cita.medico}</span></div>
              <div className="info-item"><span className="info-label">Modalidad</span> <span className="info-value">{cita.modalidad}</span></div>
            </div>

            {showDetails.tab === 'canceladas' && showDetails.id === cita.id && (
              <div className="details-box details-cancelada">
                <span className="info-label">Motivo de cancelación</span>
                <p className="details-text">{cita.motivo}</p>
              </div>
            )}
          </div>
        ))}

        {/* Mensaje cuando no hay citas */}
        {activeTab === 'proximas' && citasProximas.length === 0 && (
          <div className="no-appointments">
            <p>No tienes citas próximas programadas.</p>
          </div>
        )}

        {activeTab === 'pasadas' && citasPasadas.length === 0 && (
          <div className="no-appointments">
            <p>No tienes citas pasadas.</p>
          </div>
        )}

        {activeTab === 'canceladas' && citasCanceladas.length === 0 && (
          <div className="no-appointments">
            <p>No tienes citas canceladas.</p>
          </div>
        )}
      </div>

      {/* Modal Cancelación */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Cancelar Cita</h2>
              <button onClick={() => setShowCancelModal(false)} className="modal-close">✕</button>
            </div>

            <p className="modal-subtitle">Ingresa el motivo de la cancelación</p>

            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Motivo</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={motivoCancelacion}
                  onChange={e => setMotivoCancelacion(e.target.value)}
                  placeholder="¿Por qué deseas cancelar la cita?"
                ></textarea>
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowCancelModal(false)} className="btn btn-modal-cancel">Cerrar</button>
              <button onClick={confirmarCancelacion} className="btn btn-modal-confirm">❌ Confirmar Cancelación</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;