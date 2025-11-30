// pages/doctor/MedicalRecords/CreateRecord.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
}

interface MedicalRecordForm {
  patientId: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  medications: string[];
  notes: string;
  recordType: 'consultation' | 'followup' | 'emergency';
  severity: 'low' | 'medium' | 'high';
}

const CreateRecord: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentMedication, setCurrentMedication] = useState('');

  // Datos de ejemplo - pacientes disponibles
  const patients: Patient[] = [
    { id: 'P001', name: 'Ana García López', age: 34, gender: 'F' },
    { id: 'P002', name: 'Carlos Rodríguez', age: 45, gender: 'M' },
    { id: 'P003', name: 'María Torres', age: 28, gender: 'F' },
    { id: 'P004', name: 'Juan Pérez', age: 52, gender: 'M' }
  ];

  const [formData, setFormData] = useState<MedicalRecordForm>({
    patientId: '',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    medications: [],
    notes: '',
    recordType: 'consultation',
    severity: 'medium'
  });

  const handleBack = () => {
    navigate('/doctor/medical-records');
  };

  const handleAddMedication = () => {
    if (currentMedication.trim() && !formData.medications.includes(currentMedication.trim())) {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, currentMedication.trim()]
      }));
      setCurrentMedication('');
    }
  };

  const handleRemoveMedication = (medication: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter(m => m !== medication)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Historial creado:', formData);
    setLoading(false);
    
    // Redirigir a la lista de historiales
    navigate('/doctor/medical-records');
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444'
    };
    return colors[severity as keyof typeof colors];
  };

  const getSeverityText = (severity: string) => {
    const texts = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    };
    return texts[severity as keyof typeof texts];
  };

  const selectedPatient = patients.find(p => p.id === formData.patientId);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
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
            Crear Nuevo Historial Clínico
          </h1>
        </div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Complete la información para crear un nuevo historial médico
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
            Selección de Paciente
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
                  {patient.name} - {patient.age} años - {patient.gender === 'M' ? 'Masculino' : 'Femenino'}
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
                Paciente Seleccionado:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div><strong>Nombre:</strong> {selectedPatient.name}</div>
                <div><strong>Edad:</strong> {selectedPatient.age} años</div>
                <div><strong>Género:</strong> {selectedPatient.gender === 'M' ? 'Masculino' : 'Femenino'}</div>
                <div><strong>ID:</strong> {selectedPatient.id}</div>
              </div>
            </div>
          )}
        </div>

        {/* Tipo de Registro y Severidad */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Tipo de Registro
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Tipo de Consulta *
              </label>
              <select
                value={formData.recordType}
                onChange={(e) => setFormData(prev => ({ ...prev, recordType: e.target.value as any }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="consultation">Consulta General</option>
                <option value="followup">Seguimiento</option>
                <option value="emergency">Emergencia</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Gravedad *
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value as any }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
              
              {formData.severity && (
                <div style={{
                  marginTop: '8px',
                  padding: '4px 8px',
                  background: getSeverityColor(formData.severity),
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>
                  {getSeverityText(formData.severity)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información Médica */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Información Médica
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Síntomas y Motivo de Consulta *
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                required
                placeholder="Describa los síntomas, duración, intensidad, etc."
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

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Diagnóstico *
              </label>
              <input
                type="text"
                value={formData.diagnosis}
                onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                required
                placeholder="Ej: Hipertensión arterial, Diabetes tipo 2, etc."
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
                Tratamiento y Recomendaciones *
              </label>
              <textarea
                value={formData.treatment}
                onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
                required
                placeholder="Describa el tratamiento, recomendaciones, seguimiento requerido..."
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
          </div>
        </div>

        {/* Medicamentos */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Medicamentos Recetados
          </h3>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={currentMedication}
              onChange={(e) => setCurrentMedication(e.target.value)}
              placeholder="Ej: Losartán 50mg - 1 tableta al día"
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            <button
              type="button"
              onClick={handleAddMedication}
              disabled={!currentMedication.trim()}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: !currentMedication.trim() ? 0.6 : 1
              }}
            >
              Agregar
            </button>
          </div>

          {formData.medications.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Medicamentos agregados ({formData.medications.length}):
              </div>
              {formData.medications.map((medication, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  background: '#f8fafc',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#10b981' }}>💊</span>
                    <span style={{ fontSize: '14px' }}>{medication}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(medication)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: '4px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
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
            placeholder="Observaciones adicionales, recomendaciones específicas, etc."
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
            disabled={loading || !formData.patientId || !formData.diagnosis || !formData.symptoms || !formData.treatment}
            style={{
              padding: '12px 24px',
              background: '#2a4ea2',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: (loading || !formData.patientId || !formData.diagnosis || !formData.symptoms || !formData.treatment) ? 0.6 : 1
            }}
          >
            {loading ? 'Creando...' : 'Crear Historial'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecord;