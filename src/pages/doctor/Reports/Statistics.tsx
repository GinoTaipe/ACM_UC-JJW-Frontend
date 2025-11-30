// pages/doctor/Reports/Statistics.tsx
import React, { useState } from 'react';
import { useReports } from '../../../hooks/useReports';

const Statistics: React.FC = () => {
  const { statistics, appointmentStats, prescriptionStats, loading, error } = useReports();
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ 
          color: '#2a4ea2',
          fontSize: '18px'
        }}>
          Cargando estadísticas...
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

  if (!statistics) {
    return null;
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
          Estadísticas Generales
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Resumen completo de tu actividad médica
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Fecha Inicio
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              style={{
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
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Fecha Fin
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              style={{
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <button style={{
            padding: '10px 20px',
            background: '#2a4ea2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Pacientes Totales */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#d1fae5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              👥
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Pacientes Totales
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#065f46'
              }}>
                {statistics.totalPatients}
              </div>
            </div>
          </div>
        </div>

        {/* Citas Completadas */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ✅
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Citas Completadas
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#1e40af'
              }}>
                {statistics.completedAppointments}
              </div>
              <div style={{ 
                fontSize: '12px',
                color: '#6b7280'
              }}>
                de {statistics.totalAppointments} total
              </div>
            </div>
          </div>
        </div>

        {/* Tasa de Éxito */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📊
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Tasa de Éxito
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#92400e'
              }}>
                {((statistics.completedAppointments / statistics.totalAppointments) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Ingresos Mensuales */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #8b5cf6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: '#ede9fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              💰
            </div>
            <div>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                Ingresos Mensuales
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#5b21b6'
              }}>
                S/ {statistics.monthlyRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficas y Estadísticas Detalladas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Estadísticas de Citas */}
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
            Citas por Día
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appointmentStats.map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {new Date(stat.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#3b82f6' }}>✓ {stat.completed}</span>
                  <span style={{ fontSize: '12px', color: '#ef4444' }}>✗ {stat.cancelled}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Total: {stat.scheduled}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicamentos Más Recetados */}
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
            Medicamentos Más Recetados
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {prescriptionStats.map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                background: '#f8fafc',
                borderRadius: '6px'
              }}>
                <div style={{ 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {stat.medication}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${stat.percentage}%`,
                      height: '100%',
                      background: '#10b981',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <span style={{ 
                    fontSize: '12px',
                    color: '#6b7280',
                    minWidth: '35px'
                  }}>
                    {stat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end'
      }}>
        <button style={{
          padding: '12px 24px',
          background: 'transparent',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          color: '#6b7280',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          📊 Exportar Datos
        </button>
        
        <button style={{
          padding: '12px 24px',
          background: '#2a4ea2',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          📄 Generar Reporte PDF
        </button>
      </div>
    </div>
  );
};

export default Statistics;