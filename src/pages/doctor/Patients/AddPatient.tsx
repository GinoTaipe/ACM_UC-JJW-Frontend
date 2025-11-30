// pages/doctor/Patients/AddPatient.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PatientFormData {
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
  notes?: string;
}

const AddPatient: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentAllergy, setCurrentAllergy] = useState('');
  const [currentCondition, setCurrentCondition] = useState('');

  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    email: '',
    phone: '',
    age: 0,
    gender: 'Masculino',
    address: '',
    emergencyContact: '',
    bloodType: '',
    allergies: [],
    chronicConditions: [],
    notes: ''
  });

  const handleBack = () => {
    navigate('/doctor/patients');
  };

  const handleAddAllergy = () => {
    if (currentAllergy.trim() && !formData.allergies.includes(currentAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, currentAllergy.trim()]
      }));
      setCurrentAllergy('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleAddCondition = () => {
    if (currentCondition.trim() && !formData.chronicConditions.includes(currentCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        chronicConditions: [...prev.chronicConditions, currentCondition.trim()]
      }));
      setCurrentCondition('');
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.filter(c => c !== condition)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío a API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Paciente creado:', formData);
    setLoading(false);
    
    // Redirigir a la lista de pacientes
    navigate('/doctor/patients');
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
            Agregar Nuevo Paciente
          </h1>
        </div>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Complete la información del nuevo paciente
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Información Personal */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Información Personal
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
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
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
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
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
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
                Edad *
              </label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                required
                min="0"
                max="120"
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
                Género *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Tipo de Sangre
              </label>
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="">Seleccionar tipo</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Dirección *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Contacto de Emergencia *
            </label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
              required
              placeholder="Nombre y teléfono"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Alergias */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Alergias
          </h3>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={currentAllergy}
              onChange={(e) => setCurrentAllergy(e.target.value)}
              placeholder="Ej: Penicilina, Mariscos, Polen..."
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
              onClick={handleAddAllergy}
              disabled={!currentAllergy.trim()}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: !currentAllergy.trim() ? 0.6 : 1
              }}
            >
              Agregar
            </button>
          </div>

          {formData.allergies.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.allergies.map((allergy, index) => (
                <span key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: '#fef3c7',
                  color: '#92400e',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>
                  {allergy}
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(allergy)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#92400e',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Condiciones Crónicas */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0',
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Condiciones Crónicas
          </h3>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              placeholder="Ej: Diabetes, Hipertensión, Asma..."
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
              onClick={handleAddCondition}
              disabled={!currentCondition.trim()}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: !currentCondition.trim() ? 0.6 : 1
              }}
            >
              Agregar
            </button>
          </div>

          {formData.chronicConditions.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.chronicConditions.map((condition, index) => (
                <span key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>
                  {condition}
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(condition)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ×
                  </button>
                </span>
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
            placeholder="Observaciones, recomendaciones iniciales..."
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
            disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.address || !formData.emergencyContact}
            style={{
              padding: '12px 24px',
              background: '#2a4ea2',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: (loading || !formData.name || !formData.email || !formData.phone || !formData.address || !formData.emergencyContact) ? 0.6 : 1
            }}
          >
            {loading ? 'Creando...' : 'Crear Paciente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;