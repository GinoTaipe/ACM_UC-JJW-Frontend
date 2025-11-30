import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ClinicalNote {
  id: string;
  date: string;
  type: 'consultation' | 'followup' | 'emergency';
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctor: string;
}

interface MedicalRecordDetail {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'M' | 'F';
  birthDate: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: string;
  insurance: string;
  clinicalNotes: ClinicalNote[];
  createdAt: string;
  updatedAt: string;
}

const ViewRecord: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  // Si no hay ID, mostrar mensaje de error
  if (!id) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#dc2626' }}>Error: ID no especificado</h2>
          <p style={{ color: '#6b7280' }}>No se pudo cargar el historial clínico</p>
          <button
            onClick={() => navigate('/doctor/medical-records')}
            style={{
              padding: '10px 20px',
              background: '#2a4ea2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Volver a Historiales
          </button>
        </div>
      </div>
    );
  }

  // Datos de ejemplo - historial médico detallado
  const medicalRecord: MedicalRecordDetail = {
    id: id,
    patientId: 'P001',
    patientName: 'Ana García López',
    patientAge: 34,
    patientGender: 'F',
    birthDate: '1989-05-15',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Mariscos'],
    chronicConditions: ['Hipertensión arterial'],
    emergencyContact: '+51 987 654 321 - Carlos García (Esposo)',
    insurance: 'RIMAC Seguros',
    createdAt: '2023-03-10',
    updatedAt: '2024-01-15',
    clinicalNotes: [
      {
        id: 'CN001',
        date: '2024-01-15',
        type: 'consultation',
        symptoms: 'Control rutinario de presión arterial. Paciente refiere buen estado general.',
        diagnosis: 'Hipertensión arterial controlada',
        treatment: 'Continuar con Losartán 50mg + HCTZ 25mg. Control en 3 meses.',
        notes: 'Presión arterial: 125/80 mmHg. Peso estable: 68kg.',
        doctor: 'Dr. Juan Martínez'
      },
      {
        id: 'CN002',
        date: '2023-11-20',
        type: 'followup',
        symptoms: 'Paciente refiere cefalea ocasional. Presión arterial elevada en domicilio.',
        diagnosis: 'Hipertensión arterial descontrolada',
        treatment: 'Ajustar dosis de Losartán a 50mg. Agregar HCTZ 25mg.',
        notes: 'Presión arterial: 145/90 mmHg. Recomendar medición diaria.',
        doctor: 'Dr. Juan Martínez'
      },
      {
        id: 'CN003',
        date: '2023-03-10',
        type: 'consultation',
        symptoms: 'Paciente refiere cefalea, mareos ocasionales. Presión arterial elevada.',
        diagnosis: 'Hipertensión arterial esencial',
        treatment: 'Iniciar Losartán 25mg. Control en 1 mes.',
        notes: 'Primer diagnóstico de HTA. Presión arterial: 150/95 mmHg.',
        doctor: 'Dr. Juan Martínez'
      }
    ]
  };

  const getNoteTypeColor = (type: string) => {
    const colors = {
      consultation: '#3b82f6',
      followup: '#f59e0b',
      emergency: '#ef4444'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getNoteTypeText = (type: string) => {
    const texts = {
      consultation: 'Consulta',
      followup: 'Seguimiento',
      emergency: 'Emergencia'
    };
    return texts[type as keyof typeof texts] || type;
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          <button
            onClick={() => navigate('/doctor/medical-records')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: '#6b7280'
            }}
          >
            ←
          </button>
          <h1 style={{ 
            color: '#2a4ea2', 
            margin: 0,
            fontSize: '28px',
            fontWeight: '700'
          }}>
            Historial Clínico - {medicalRecord.patientName}
          </h1>
        </div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Información detallada del paciente • ID: {medicalRecord.id}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Columna izquierda - Información del paciente */}
        <div>
          {/* Tarjeta de información personal */}
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '25px'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0',
              color: '#2a4ea2',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Información Personal
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Nombre completo</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{medicalRecord.patientName}</div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>ID Paciente</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{medicalRecord.patientId}</div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Edad</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{medicalRecord.patientAge} años</div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Género</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                  {medicalRecord.patientGender === 'M' ? 'Masculino' : 'Femenino'}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Fecha Nacimiento</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                  {new Date(medicalRecord.birthDate).toLocaleDateString('es-ES')}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Tipo Sangre</div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{medicalRecord.bloodType}</div>
              </div>
            </div>
          </div>

          {/* Tarjeta de información médica */}
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
              Información Médica
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: '600' }}>
                Alergias
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {medicalRecord.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '4px 8px',
                      background: '#fef2f2',
                      color: '#dc2626',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: '1px solid #fecaca'
                    }}
                  >
                    ⚠️ {allergy}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: '600' }}>
                Condiciones Crónicas
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {medicalRecord.chronicConditions.map((condition, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '4px 8px',
                      background: '#f0f9ff',
                      color: '#0369a1',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: '1px solid #bae6fd'
                    }}
                  >
                    🏥 {condition}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                Contacto Emergencia
              </div>
              <div style={{ fontWeight: '500', color: '#1e293b' }}>
                {medicalRecord.emergencyContact}
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Notas clínicas */}
        <div>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ 
                margin: 0,
                color: '#2a4ea2',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Notas Clínicas
              </h3>
              
              <button style={{
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>➕</span>
                Nueva Nota
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {medicalRecord.clinicalNotes.map(note => (
                <div
                  key={note.id}
                  style={{
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    borderLeft: `4px solid ${getNoteTypeColor(note.type)}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                      <div style={{ 
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {getNoteTypeText(note.type)}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {new Date(note.date).toLocaleDateString('es-ES', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      color: '#6b7280',
                      textAlign: 'right'
                    }}>
                      Por: {note.doctor}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Síntomas:
                    </div>
                    <div style={{ color: '#374151' }}>
                      {note.symptoms}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Diagnóstico:
                    </div>
                    <div style={{ color: '#374151', fontWeight: '500' }}>
                      {note.diagnosis}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Tratamiento:
                    </div>
                    <div style={{ color: '#374151' }}>
                      {note.treatment}
                    </div>
                  </div>

                  {note.notes && (
                    <div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#6b7280',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        Observaciones:
                      </div>
                      <div style={{ color: '#374151', fontStyle: 'italic' }}>
                        {note.notes}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecord;