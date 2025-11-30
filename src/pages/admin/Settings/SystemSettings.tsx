import React from 'react';

const SystemSettings: React.FC = () => {
  return (
    <div style={{ maxWidth: '520px' }}>
      <h1 style={{ fontSize: '22px', color: '#111827', marginBottom: '4px' }}>
        Configuración general
      </h1>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
        Parámetros básicos del sistema (modo demo, sin backend).
      </p>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
        }}
      >
        <div>
          <label style={{ fontSize: '13px', color: '#374151' }}>Nombre del sistema</label>
          <input
            defaultValue="SaludConectada"
            style={{
              width: '100%',
              marginTop: '4px',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#374151' }}>Correo de soporte</label>
          <input
            defaultValue="soporte@saludconectada.com"
            style={{
              width: '100%',
              marginTop: '4px',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" defaultChecked />
          <span style={{ fontSize: '13px', color: '#374151' }}>
            Habilitar notificaciones por correo
          </span>
        </div>

        <button
          type="button"
          onClick={() => alert('Configuración guardada (demo).')}
          style={{
            marginTop: '8px',
            padding: '10px',
            borderRadius: '999px',
            border: 'none',
            background: '#2563eb',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default SystemSettings;
