import React from 'react';

const TreatmentStats: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '22px', color: '#111827' }}>Estadísticas de tratamientos</h1>
      <p style={{ fontSize: '13px', color: '#6b7280' }}>
        Información general sobre tratamientos más frecuentes y adherencia (demo).
      </p>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '16px',
          maxWidth: '520px',
        }}
      >
        <h2 style={{ fontSize: '15px', marginBottom: '8px' }}>Tratamientos más frecuentes</h2>
        <ul style={{ fontSize: '13px', color: '#4b5563' }}>
          <li>Hipertensión arterial – 35 pacientes</li>
          <li>Diabetes tipo 2 – 28 pacientes</li>
          <li>Control de peso – 18 pacientes</li>
        </ul>
      </div>
    </div>
  );
};

export default TreatmentStats;
