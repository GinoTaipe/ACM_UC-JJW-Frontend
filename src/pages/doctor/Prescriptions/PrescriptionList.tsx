// pages/doctor/Prescriptions/PrescriptionList.tsx
import React from 'react';
import { usePrescriptions } from '../../../hooks/usePrescriptions';
import { useAuth } from '../../../contexts/AuthContext';

const PrescriptionList: React.FC = () => {
  const { prescriptions, loading, error } = usePrescriptions();
  const { user } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ 
          color: '#2a4ea2',
          fontSize: '18px'
        }}>
          Cargando recetas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #fecaca',
          padding: '16px',
          borderRadius: '8px',
          color: '#dc2626'
        }}>
          {error}
        </div>
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
          Recetas Médicas
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona y revisa todas las recetas emitidas
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            {prescriptions.length}
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Total Recetas
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            color: '#3b82f6',
            marginBottom: '8px'
          }}>
            {prescriptions.filter(p => p.status === 'active').length}
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Activas
          </div>
        </div>
      </div>

      {/* Lista de recetas */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ 
            margin: 0,
            color: '#2a4ea2',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Recetas Emitidas
          </h3>
          
          <button style={{
            padding: '10px 20px',
            background: '#2a4ea2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => window.location.href = '/doctor/prescriptions/new'}>
            + Nueva Receta
          </button>
        </div>

        {prescriptions.length === 0 ? (
          <div style={{ 
            padding: '40px 20px', 
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No hay recetas registradas
          </div>
        ) : (
          <div>
            {prescriptions.map(prescription => (
              <div key={prescription.id} style={{
                padding: '20px',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{ 
                      margin: 0,
                      color: '#1f2937',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {prescription.patientName}
                    </h4>
                    <span style={{
                      padding: '4px 8px',
                      background: prescription.status === 'active' ? '#d1fae5' : 
                                 prescription.status === 'completed' ? '#dbeafe' : '#fef3c7',
                      color: prescription.status === 'active' ? '#065f46' : 
                            prescription.status === 'completed' ? '#1e40af' : '#92400e',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {prescription.status === 'active' ? 'Activa' : 
                       prescription.status === 'completed' ? 'Completada' : 'Cancelada'}
                    </span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    <strong>Diagnóstico:</strong> {prescription.diagnosis}
                  </div>
                  
                  <div style={{ 
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    <strong>Medicamentos:</strong> {prescription.medications.length}
                  </div>
                  
                  <div style={{ 
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    Emitida el {prescription.date}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Ver Detalle
                  </button>
                  
                  <button style={{
                    padding: '8px 16px',
                    background: '#2a4ea2',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Descargar PDF
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

export default PrescriptionList;