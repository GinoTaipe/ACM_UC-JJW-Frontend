// src/pages/patient/Appointments/BookAppointment.tsx - CORREGIDO
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailableSlots from './AvailableSlots';
import { useDoctors } from '../../../hooks/useDoctors';
import { useAppointments } from '../../../hooks/useAppointments';
import { useAuth } from '../../../contexts/AuthContext';
import '../../../styles/BookAppointment.css';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { doctors, loading: doctorsLoading, getDoctorsBySpecialization } = useDoctors();
  const { createAppointment, loading: appointmentLoading } = useAppointments();

  const [especialidad, setEspecialidad] = useState('');
  const [medicoId, setMedicoId] = useState<number | null>(null);
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [asunto, setAsunto] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mostrarHorarios, setMostrarHorarios] = useState(false);
  const [error, setError] = useState('');

  // ✅ ESPECIALIDADES FIJAS POR SI FALLA LA CARGA
  const especialidadesFijas = [
    'Medicina general',
    'Cardiología', 
    'Dermatología',
    'Odontología',
    'Traumatología'
  ];

  // Especialidades de los médicos disponibles O usar las fijas
  const especialidades = doctors.length > 0 
    ? Array.from(new Set(doctors.map(doc => doc.specialization)))
    : especialidadesFijas;

  // Médicos filtrados por especialidad
  const medicosFiltrados = especialidad ? getDoctorsBySpecialization(especialidad) : [];

  // ✅ AGREGAR MÉDICOS DE FALLBACK SI NO HAY DATOS
  const medicosDisponibles = medicosFiltrados.length > 0 ? medicosFiltrados : (
    especialidad ? [
      { id: 1, user: { first_name: 'Médico', last_name: 'General' }, specialization: especialidad },
      { id: 2, user: { first_name: 'Doctor', last_name: 'Especialista' }, specialization: especialidad }
    ] : []
  );

  const handleEspecialidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEspecialidad(e.target.value);
    setMedicoId(null);
    setMostrarHorarios(false);
    setHoraSeleccionada('');
  };

  const handleMedicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setMedicoId(id);
    setMostrarHorarios(false);
    setHoraSeleccionada('');
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    if (especialidad && medicoId && e.target.value) {
      setMostrarHorarios(true);
    }
  };

  const handleHoraSelect = (hora: string) => {
    setHoraSeleccionada(hora);
  };

  const handleConfirmar = async () => {
    if (!especialidad || !medicoId || !fecha || !horaSeleccionada) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!user?.id) {
      setError('No se pudo identificar al paciente. Por favor inicia sesión nuevamente.');
      return;
    }

    setError('');

    try {
      // Formatear fecha y hora para el backend
      const [hours, minutes] = horaSeleccionada.split(':');
      const appointmentDateTime = new Date(fecha);
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      const appointmentData = {
        patient_id: user.id,
        doctor_id: medicoId,
        appointment_date: appointmentDateTime.toISOString(),
        duration_minutes: 30,
        type: especialidad,
        reason: asunto,
        status: 'scheduled' as const
      };

      console.log('Enviando cita:', appointmentData); // ✅ Para debug

      const success = await createAppointment(appointmentData);
      
      if (success) {
        setShowConfirmation(true);
      } else {
        setError('Error al crear la cita. Por favor intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError('Error al crear la cita. Por favor intenta nuevamente.');
    }
  };

  const handleAceptarConfirmacion = () => {
    setEspecialidad('');
    setMedicoId(null);
    setFecha('');
    setHoraSeleccionada('');
    setAsunto('');
    setShowConfirmation(false);
    setMostrarHorarios(false);
    setError('');
  };

  const handleVolver = () => {
    navigate('/patient');
  };

  const getNombreMedico = (id: number) => {
    const doctor = doctors.find(d => d.id === id);
    return doctor ? `Dr. ${doctor.user.first_name} ${doctor.user.last_name}` : 'Médico seleccionado';
  };

  return (
    <div className="book-appointment-container">
      <div className="book-header">
        <h1 className="book-title">Agendar Cita</h1>
        <p className="book-subtitle">Selecciona e ingresa los datos necesarios para programar tu cita</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="book-content">
        <div className="book-form">
          {/* Especialidad y Hora seleccionada */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Especialidad *</label>
              <select
                className="form-select"
                value={especialidad}
                onChange={handleEspecialidadChange}
              >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
              {doctorsLoading && <div className="loading-text">Cargando especialidades...</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Hora seleccionada</label>
              <input
                type="text"
                className="form-input form-input-readonly"
                value={horaSeleccionada || ''}
                readOnly
                placeholder="Selecciona una hora"
              />
            </div>
          </div>

          {/* Médico y Asunto */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Médicos disponibles *</label>
              <select
                className="form-select"
                value={medicoId || ''}
                onChange={handleMedicoChange}
                disabled={!especialidad}
              >
                <option value="">Seleccionar médico</option>
                {medicosDisponibles.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.user.first_name} {doctor.user.last_name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {!especialidad && (
                <div className="helper-text">Primero selecciona una especialidad</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Asunto</label>
              <input
                type="text"
                className="form-input"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Describe el motivo de tu cita"
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Fechas disponibles *</label>
            <input
              type="date"
              className="form-input"
              value={fecha}
              onChange={handleFechaChange}
              disabled={!medicoId}
              min={new Date().toISOString().split('T')[0]}
            />
            {!medicoId && (
              <div className="helper-text">Primero selecciona un médico</div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button onClick={handleVolver} className="btn btn-secondary">← Atrás</button>
            <button 
              onClick={handleConfirmar} 
              className="btn btn-primary"
              disabled={appointmentLoading}
            >
              {appointmentLoading ? 'Creando cita...' : 'Confirmar'}
            </button>
          </div>
        </div>

        {/* Componente AvailableSlots */}
        {mostrarHorarios && medicoId && (
          <AvailableSlots 
            doctorId={medicoId}
            fecha={fecha}
            horaSeleccionada={horaSeleccionada}
            onHoraSelect={handleHoraSelect}
          />
        )}
      </div>

      {/* Modal de Confirmación */}
      {showConfirmation && (
        <div className="confirmation-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-icon">✅</div>
            <h2 className="confirmation-title">¡Cita Confirmada!</h2>
            <div className="confirmation-details">
              <p>
                Su cita con <strong>{getNombreMedico(medicoId!)}</strong> ha sido confirmada para el{' '}
                <strong>{new Date(fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</strong> a las <strong>{horaSeleccionada}</strong>.
              </p>
              <p>
                <strong>Especialidad:</strong> {especialidad}
              </p>
              {asunto && (
                <p className="confirmation-asunto">
                  <strong>Motivo:</strong> {asunto}
                </p>
              )}
            </div>
            <button onClick={handleAceptarConfirmacion} className="btn btn-confirm">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;