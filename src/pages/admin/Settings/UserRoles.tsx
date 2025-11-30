import React from 'react';

const cardShadow = '0 10px 30px rgba(15,23,42,0.12)';

const UserRoles: React.FC = () => {
  const roles = [
    {
      name: 'Administrador',
      icon: '🛡️',
      description: 'Control total del sistema y configuración.',
      color: '#2563eb',
      permissions: [
        'Gestión completa de usuarios',
        'Definición de permisos y roles',
        'Acceso a todas las estadísticas',
        'Configuración general del sistema',
      ],
    },
    {
      name: 'Médico',
      icon: '🩺',
      description: 'Gestión de pacientes y consultas.',
      color: '#16a34a',
      permissions: [
        'Ver pacientes asignados',
        'Registrar diagnósticos',
        'Actualizar tratamientos',
        'Gestionar su agenda de citas',
      ],
    },
    {
      name: 'Paciente',
      icon: '👤',
      description: 'Acceso a información personal y citas.',
      color: '#7c3aed',
      permissions: [
        'Ver historial clínico propio',
        'Agendar y cancelar citas',
        'Ver recetas médicas',
        'Actualizar datos de contacto',
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h1
          style={{
            fontSize: 28,
            margin: 0,
            color: '#111827',
            fontWeight: 700,
          }}
        >
          Permisos y roles
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#6b7280',
            marginTop: 6,
          }}
        >
          Define qué puede realizar cada tipo de usuario dentro del sistema.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {roles.map((role) => (
          <div
            key={role.name}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 18,
              boxShadow: cardShadow,
              borderTop: `4px solid ${role.color}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  backgroundColor: `${role.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                {role.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#111827',
                  }}
                >
                  {role.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#6b7280',
                  }}
                >
                  {role.description}
                </div>
              </div>
            </div>

            <ul
              style={{
                fontSize: 13,
                color: '#4b5563',
                paddingLeft: 18,
                margin: '8px 0 12px',
              }}
            >
              {role.permissions.map((perm) => (
                <li key={perm}>• {perm}</li>
              ))}
            </ul>

            <button
              type="button"
              style={{
                width: '100%',
                padding: '8px 0',
                borderRadius: 999,
                border: `1px solid ${role.color}`,
                backgroundColor: '#ffffff',
                color: role.color,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.12s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${role.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Editar permisos (demo)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
