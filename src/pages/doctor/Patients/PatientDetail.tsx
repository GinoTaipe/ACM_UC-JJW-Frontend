// pages/doctor/Patients/PatientDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'Activo' | 'Inactivo';
  notes?: string;
}

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Datos de ejemplo - en una app real esto vendría de una API
  const patient: Patient = {
    id: '1',
    name: 'Ana García López',
    email: 'ana.garcia@email.com',
    phone: '+51 987 654 321',
    age: 34,
    gender: 'Femenino',
    address: 'Av. Principal 123, Lima, Perú',
    emergencyContact: '+51 987 654 000 (Juan García)',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Mariscos'],
    chronicConditions: ['Hipertensión'],
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-15',
    status: 'Activo',
    notes: 'Paciente responsable con sus controles. Recomendar reducir consumo de sal.'
  };

  const handleBack = () => {
    navigate('/doctor/patients');
  };

  const handleEdit = () => {
    navigate(`/doctor/patients/edit/${id}`);
  };

  const handleNewAppointment = () => {
    navigate('/doctor/appointments/new', { 
      state: { patientId: id, patientName: patient.name } 
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
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
            Detalle del Paciente
          </h1>
        </div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Información completa y historial médico
        </p>
      </div>

      {/* Tarjeta principal del paciente */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        overflow: 'hidden'
      }}>
        {/* Header de la tarjeta */}
        <div style={{
          padding: '25px',
          background: '#f8fafc',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#2a4ea2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ 
                margin: '0 0 8px 0',
                color: '#1f2937',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                {patient.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px',
                  background: patient.status === 'Activo' ? '#d1fae5' : '#fef3c7',
                  color: patient.status === 'Activo' ? '#065f46' : '#92400e',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {patient.status}
                </span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  ID: {patient.id}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleNewAppointment}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📅 Nueva Cita
            </button>
            <button
              onClick={handleEdit}
              style={{
                padding: '10px 20px',
                background: '#2a4ea2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✏️ Editar
            </button>
          </div>
        </div>

        {/* Información del paciente */}
        <div style={{ padding: '30px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Información Personal */}
            <div>
              <h3 style={{ 
                margin: '0 0 20px 0',
                color: '#2a4ea2',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Información Personal
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Email
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.email}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Teléfono
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.phone}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Edad y Género
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.age} años • {patient.gender}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Dirección
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div>
              <h3 style={{ 
                margin: '0 0 20px 0',
                color: '#2a4ea2',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Información Médica
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Tipo de Sangre
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.bloodType}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Alergias
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {patient.allergies.length > 0 ? (
                      patient.allergies.map((allergy, index) => (
                        <span key={index} style={{
                          padding: '4px 8px',
                          background: '#fef3c7',
                          color: '#92400e',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>Ninguna</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Condiciones Crónicas
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {patient.chronicConditions.length > 0 ? (
                      patient.chronicConditions.map((condition, index) => (
                        <span key={index} style={{
                          padding: '4px 8px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {condition}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>Ninguna</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Contacto de Emergencia
                  </label>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.emergencyContact}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Última visita y próxima cita */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                Última Visita
              </label>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                {new Date(patient.lastVisit).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                Próxima Cita
              </label>
              <div style={{ 
                color: patient.nextAppointment ? '#10b981' : '#6b7280', 
                fontSize: '14px',
                fontWeight: patient.nextAppointment ? '600' : 'normal'
              }}>
                {patient.nextAppointment 
                  ? new Date(patient.nextAppointment).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'No programada'
                }
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          {patient.notes && (
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Notas Adicionales
              </label>
              <div style={{ 
                background: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                color: '#6b7280',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {patient.notes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        <button style={{
          padding: '15px',
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          color: '#0369a1',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          📋 Ver Historial Médico
        </button>
        
        <button style={{
          padding: '15px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          color: '#166534',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          💊 Ver Recetas
        </button>
        
        <button style={{
          padding: '15px',
          background: '#fef7ed',
          border: '1px solid #fed7aa',
          borderRadius: '8px',
          color: '#9a3412',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          📊 Ver Reportes
        </button>
      </div>
    </div>
  );
};

export default PatientDetail;