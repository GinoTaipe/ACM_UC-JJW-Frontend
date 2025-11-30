import React from 'react';

const GeneralStats: React.FC = () => {
  const stats = {
    totalAppointments: 320,
    completedAppointments: 280,
    canceledAppointments: 40,
    averageWaitTime: '12 min',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '22px', color: '#111827' }}>Estadísticas generales</h1>
        <p style={{ fontSize: '13px', color: '#6b7280' }}>
          Resumen de la actividad global del sistema.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {/* tarjetas */}
        <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe', padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#1d4ed8' }}>Citas totales</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.totalAppointments}</div>
        </div>
        <div style={{ background: '#ecfdf3', borderRadius: '12px', border: '1px solid #bbf7d0', padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#15803d' }}>Citas completadas</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.completedAppointments}</div>
        </div>
        <div style={{ background: '#fee2e2', borderRadius: '12px', border: '1px solid #fecaca', padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#b91c1c' }}>Citas canceladas</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.canceledAppointments}</div>
        </div>
        <div style={{ background: '#f5f3ff', borderRadius: '12px', border: '1px solid #e0e7ff', padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#4f46e5' }}>Tiempo de espera promedio</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{stats.averageWaitTime}</div>
        </div>
      </div>

      {/* gráfico fake */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '16px',
        }}
      >
        <h2 style={{ fontSize: '16px', color: '#111827', marginBottom: '8px' }}>
          Citas por día (ejemplo)
        </h2>
        <div
          style={{
            height: '160px',
            background: 'repeating-linear-gradient(90deg,#e5e7eb, #e5e7eb 1px, transparent 1px, transparent 20px)',
            borderRadius: '8px',
          }}
        />
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
          Aquí posteriormente se puede reemplazar por un gráfico real.
        </p>
      </div>
    </div>
  );
};

export default GeneralStats;
