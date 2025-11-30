// pages/doctor/Appointments/ScheduleAppointment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const ScheduleAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Datos de ejemplo
  const patients: Patient[] = [
    { id: 'P001', name: 'Ana García López', email: 'ana.garcia@email.com', phone: '+51 987 654 321' },
    { id: 'P002', name: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', phone: '+51 987 654 322' },
    { id: 'P003', name: 'María Torres', email: 'maria.torres@email.com', phone: '+51 987 654 323' },
    { id: 'P004', name: 'Juan Pérez', email: 'juan.perez@email.com', phone: '+51 987 654 324' }
  ];

  const appointmentTypes = [
    'Consulta general',
    'Control rutinario',
    'Revisión de resultados',
    'Consulta especializada',
    'Seguimiento',
    'Emergencia'
  ];

  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    duration: 30,
    type: 'Consulta general',
    notes: ''
  });

  // Simular obtención de horarios disponibles
  const generateTimeSlots = (date: string) => {
    if (!date) return [];
    
    const slots: TimeSlot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Simular disponibilidad (80% de horarios disponibles)
        const available = Math.random() > 0.2;
        slots.push({ time, available });
      }
    }
    
    return slots;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, date, time: '' }));
    
    // Generar horarios disponibles para la fecha seleccionada
    const slots = generateTimeSlots(date);
    setAvailableSlots(slots);
  };

  const handleBack = () => {
    navigate('/doctor/appointments');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (!formData.patientId || !formData.date || !formData.time) {
      alert('Por favor complete todos los campos obligatorios');
      setLoading(false);
      return;
    }

    // Simular envío a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Cita programada:', formData);
    setLoading(false);
    
    // Redirigir a la lista de citas
    navigate('/doctor/appointments');
  };

  const selectedPatient = patients.find(p => p.id === formData.patientId);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <button
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Volver
          </button>
          <h1 style={{ 
            color: '#2a4ea2', 
            margin: 0,
            fontSize: '28px',
            fontWeight: '700'
          }}>
            Programar Nueva Cita
          </h1>
        </div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Programe una nueva cita médica para sus pacientes
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Selección de Paciente */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Información del Paciente
          </h3>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Paciente *
            </label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Seleccionar paciente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.phone}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <div style={{ fontWeight: '600', color: '#0369a1', marginBottom: '8px' }}>
                Información del Paciente Seleccionado:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div><strong>Nombre:</strong> {selectedPatient.name}</div>
                <div><strong>Email:</strong> {selectedPatient.email}</div>
                <div><strong>Teléfono:</strong> {selectedPatient.phone}</div>
                <div><strong>ID:</strong> {selectedPatient.id}</div>
              </div>
            </div>
          )}
        </div>

        {/* Tipo de Cita y Duración */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Detalles de la Cita
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Tipo de Cita *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Duración (minutos) *
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fecha y Hora */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Fecha y Hora
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Fecha *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleDateChange(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Hora *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
                disabled={!selectedDate}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  opacity: !selectedDate ? 0.6 : 1
                }}
              >
                <option value="">Seleccionar hora</option>
                {availableSlots.map(slot => (
                  <option 
                    key={slot.time} 
                    value={slot.time}
                    disabled={!slot.available}
                  >
                    {slot.time} {slot.available ? '✅' : '❌'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Horarios disponibles */}
          {selectedDate && (
            <div>
              <div style={{ 
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '10px'
              }}>
                Horarios Disponibles para {new Date(selectedDate).toLocaleDateString('es-ES')}:
              </div>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px',
                maxHeight: '200px',
                overflowY: 'auto',
                padding: '10px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                {availableSlots.filter(slot => slot.available).map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, time: slot.time }))}
                    style={{
                      padding: '8px',
                      background: formData.time === slot.time ? '#2a4ea2' : 'white',
                      color: formData.time === slot.time ? 'white' : '#374151',
                      border: `1px solid ${formData.time === slot.time ? '#2a4ea2' : '#d1d5db'}`,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notas adicionales */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Notas Adicionales
          </h3>
          
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Motivo de la consulta, síntomas, observaciones importantes..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Resumen de la cita */}
        {formData.patientId && formData.date && formData.time && (
          <div style={{
            marginBottom: '30px',
            padding: '20px',
            background: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <h4 style={{ 
              margin: '0 0 15px 0',
              color: '#166534',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Resumen de la Cita
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
              <div><strong>Paciente:</strong> {selectedPatient?.name}</div>
              <div><strong>Fecha:</strong> {new Date(formData.date).toLocaleDateString('es-ES')}</div>
              <div><strong>Hora:</strong> {formData.time}</div>
              <div><strong>Duración:</strong> {formData.duration} minutos</div>
              <div><strong>Tipo:</strong> {formData.type}</div>
              <div><strong>Estado:</strong> <span style={{ color: '#f59e0b' }}>Pendiente</span></div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ 
          display: 'flex', 
          gap: '15px',
          justifyContent: 'flex-end',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '20px'
        }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              color: '#6b7280',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={loading || !formData.patientId || !formData.date || !formData.time}
            style={{
              padding: '12px 24px',
              background: '#10b981',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: (loading || !formData.patientId || !formData.date || !formData.time) ? 0.6 : 1
            }}
          >
            {loading ? 'Programando...' : 'Programar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAppointment;