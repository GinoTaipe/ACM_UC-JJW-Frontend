// pages/doctor/Reports/PatientReports.tsx
import React, { useState } from 'react';
import { useReports } from '../../../hooks/useReports';

const PatientReports: React.FC = () => {
  const { patientReports, loading, error } = useReports();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = patientReports.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ 
          color: '#2a4ea2',
          fontSize: '18px'
        }}>
          Cargando reportes de pacientes...
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
          Reportes por Paciente
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Análisis detallado de la actividad de cada paciente
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <select style={{
          padding: '12px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          minWidth: '150px'
        }}>
          <option value="">Todos los pacientes</option>
          <option value="active">Pacientes activos</option>
          <option value="inactive">Pacientes inactivos</option>
        </select>
      </div>

      {/* Lista de reportes de pacientes */}
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
            Resumen de Pacientes ({filteredReports.length})
          </h3>
        </div>

        {filteredReports.length === 0 ? (
          <div style={{ 
            padding: '40px 20px', 
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No se encontraron pacientes que coincidan con la búsqueda
          </div>
        ) : (
          <div>
            {filteredReports.map((patient, index) => (
              <div key={patient.patientId} style={{
                padding: '20px',
                borderBottom: index < filteredReports.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                gap: '15px',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
                {/* Información del paciente */}
                <div>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    {patient.patientName}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    ID: {patient.patientId}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Última visita: {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                  </div>
                </div>

                {/* Citas totales */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#3b82f6',
                    marginBottom: '4px'
                  }}>
                    {patient.totalAppointments}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Citas totales
                  </div>
                </div>

                {/* Citas completadas */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#10b981',
                    marginBottom: '4px'
                  }}>
                    {patient.completedAppointments}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Completadas
                  </div>
                </div>

                {/* Recetas */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#8b5cf6',
                    marginBottom: '4px'
                  }}>
                    {patient.totalPrescriptions}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Recetas
                  </div>
                </div>

                {/* Diagnósticos comunes */}
                <div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Diagnósticos:
                  </div>
                  <div style={{ 
                    fontSize: '11px',
                    color: '#374151'
                  }}>
                    {patient.commonDiagnosis.slice(0, 2).join(', ')}
                    {patient.commonDiagnosis.length > 2 && '...'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumen estadístico */}
      {filteredReports.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              color: '#3b82f6',
              marginBottom: '8px'
            }}>
              {filteredReports.length}
            </div>
            <div style={{ 
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Pacientes Encontrados
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
              fontSize: '24px', 
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '8px'
            }}>
              {filteredReports.reduce((sum, patient) => sum + patient.totalAppointments, 0)}
            </div>
            <div style={{ 
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Citas Totales
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
              fontSize: '24px', 
              fontWeight: '700',
              color: '#8b5cf6',
              marginBottom: '8px'
            }}>
              {filteredReports.reduce((sum, patient) => sum + patient.totalPrescriptions, 0)}
            </div>
            <div style={{ 
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Recetas Totales
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReports;