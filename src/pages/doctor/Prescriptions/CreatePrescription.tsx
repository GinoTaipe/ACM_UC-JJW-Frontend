// pages/doctor/Prescriptions/CreatePrescription.tsx
import React, { useState } from 'react';
import { usePrescriptions } from '../../../hooks/usePrescriptions';
import { Medication, CreatePrescriptionRequest } from '../../../types/prescription';

const CreatePrescription: React.FC = () => {
  const { createPrescription, loading } = usePrescriptions();
  
  const [formData, setFormData] = useState<CreatePrescriptionRequest>({
    patientId: '',
    diagnosis: '',
    notes: '',
    medications: []
  });

  const [newMedication, setNewMedication] = useState<Omit<Medication, 'id'>>({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication]
      }));
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.medications.length === 0) {
      alert('Debe agregar al menos un medicamento');
      return;
    }

    const success = await createPrescription(formData);
    if (success) {
      alert('Receta creada exitosamente');
      // Redirigir a la lista de recetas
      window.location.href = '/doctor/prescriptions';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#2a4ea2', 
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Crear Nueva Receta
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Complete la información para emitir una nueva receta médica
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Información del paciente */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Información del Paciente
          </h3>
          
          <div style={{ display: 'grid', gap: '20px' }}>
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
                <option value="101">Ana García</option>
                <option value="102">Carlos López</option>
                <option value="103">María Torres</option>
              </select>
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
                placeholder="Ej: Hipertensión arterial, Diabetes tipo 2..."
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
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Observaciones, recomendaciones..."
                rows={3}
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
            Medicamentos
          </h3>

          {/* Formulario para agregar medicamento */}
          <div style={{
            background: '#f8fafc',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '15px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Medicamento *
                </label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre del medicamento"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Dosis *
                </label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="Ej: 500 mg, 1 tableta"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Frecuencia *
                </label>
                <input
                  type="text"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                  placeholder="Ej: 2 veces al día, cada 8 horas"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Duración
                </label>
                <input
                  type="text"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ej: 7 días, 30 días"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Instrucciones Especiales
              </label>
              <input
                type="text"
                value={newMedication.instructions}
                onChange={(e) => setNewMedication(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="Ej: Tomar con alimentos, Evitar lácteos..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleAddMedication}
              disabled={!newMedication.name || !newMedication.dosage || !newMedication.frequency}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                opacity: (!newMedication.name || !newMedication.dosage || !newMedication.frequency) ? 0.6 : 1
              }}
            >
              + Agregar Medicamento
            </button>
          </div>

          {/* Lista de medicamentos agregados */}
          {formData.medications.length > 0 && (
            <div>
              <h4 style={{ 
                margin: '0 0 15px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Medicamentos Agregados ({formData.medications.length})
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {formData.medications.map((med, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {med.name} - {med.dosage}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {med.frequency} • {med.duration} • {med.instructions}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(index)}
                      style={{
                        padding: '6px 12px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            onClick={() => window.history.back()}
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
            disabled={loading || !formData.patientId || !formData.diagnosis || formData.medications.length === 0}
            style={{
              padding: '12px 24px',
              background: '#2a4ea2',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: (loading || !formData.patientId || !formData.diagnosis || formData.medications.length === 0) ? 0.6 : 1
            }}
          >
            {loading ? 'Creando...' : 'Emitir Receta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePrescription;