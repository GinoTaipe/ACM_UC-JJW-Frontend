import React from 'react';

const AppointmentStats: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '22px', color: '#111827' }}>Estadísticas de citas</h1>
      <p style={{ fontSize: '13px', color: '#6b7280' }}>
        Distribución de citas por estado, médico y especialidad (datos de ejemplo).
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', marginBottom: '8px' }}>Citas por estado</h2>
          <ul style={{ fontSize: '13px', color: '#4b5563' }}>
            <li>Confirmadas: 210</li>
            <li>Pendientes: 60</li>
            <li>Canceladas: 15</li>
          </ul>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', marginBottom: '8px' }}>Citas por médico</h2>
          <ul style={{ fontSize: '13px', color: '#4b5563' }}>
            <li>Dr. Pérez: 45</li>
            <li>Dra. López: 38</li>
            <li>Dr. Ramírez: 32</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStats;
