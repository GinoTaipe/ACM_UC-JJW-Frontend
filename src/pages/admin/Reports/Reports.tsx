import React, { useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  role: 'Paciente' | 'Medico' | 'Administrador';
  specialty: string;
  registeredAt: string;
  status: 'Activo' | 'Inactivo';
}

const mockUsers: AdminUser[] = [
  { id: '1', name: 'Jaren Buendia', role: 'Paciente', specialty: 'N/A', registeredAt: '10/11/2022', status: 'Activo' },
  { id: '2', name: 'Juan Carhuaz', role: 'Medico', specialty: 'Cardiología', registeredAt: '11/11/2025', status: 'Activo' },
  { id: '3', name: 'Luis Torres', role: 'Medico', specialty: 'Medicina General', registeredAt: '11/11/2025', status: 'Activo' },
  { id: '4', name: 'Jo Hi', role: 'Administrador', specialty: 'N/A', registeredAt: '11/11/2025', status: 'Activo' },
];

const cardShadow = '0 12px 26px rgba(15,23,42,0.12)';
const primaryBlue = '#1d4ed8';

interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  doctors: number;
  patients: number;
  admins: number;
}

const AdminReports: React.FC = () => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const userSummary: UserSummary = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === 'Activo').length,
    inactiveUsers: mockUsers.filter((u) => u.status === 'Inactivo').length,
    doctors: mockUsers.filter((u) => u.role === 'Medico').length,
    patients: mockUsers.filter((u) => u.role === 'Paciente').length,
    admins: mockUsers.filter((u) => u.role === 'Administrador').length,
  };

  const recentUsers = mockUsers.slice(0, 5);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Aplicar filtros (demo)', { startDate, endDate });
    alert('Filtros aplicados (demo, sin conexión a BD todavía)');
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 22,
        padding: 20,
        boxShadow: cardShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
      }}
    >
      {/* TÍTULO */}
      <div>
        <h1
          style={{
            fontSize: 30,
            margin: 0,
            color: '#111827',
            fontWeight: 700,
          }}
        >
          Reportes del sistema
        </h1>
        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            marginTop: 6,
          }}
        >
          Estadísticas generales basadas en los usuarios registrados en la plataforma.
        </p>
      </div>

      {/* FILTROS */}
      <form
        onSubmit={handleApplyFilters}
        style={{
          backgroundColor: '#f9fafb',
          borderRadius: 18,
          padding: 16,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          border: '1px solid #e5e7eb',
        }}
      >
        <FilterField label="Fecha inicio">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={inputStyle}
          />
        </FilterField>

        <FilterField label="Fecha fin">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={inputStyle}
          />
        </FilterField>

        <div style={{ marginLeft: 'auto' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              border: 'none',
              backgroundColor: primaryBlue,
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
            }}
          >
            Aplicar filtros
          </button>
        </div>
      </form>

      {/* RESUMEN */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
        }}
      >
        <SummaryCard label="Usuarios totales" value={userSummary.totalUsers} icon="👥" accentColor="#2563eb" />
        <SummaryCard
          label="Usuarios activos"
          value={userSummary.activeUsers}
          icon="✅"
          accentColor="#16a34a"
          extra={`${userSummary.inactiveUsers} inactivos`}
        />
        <SummaryCard
          label="Médicos"
          value={userSummary.doctors}
          icon="🩺"
          accentColor="#0ea5e9"
          extra={`${userSummary.patients} pacientes`}
        />
        <SummaryCard
          label="Administradores"
          value={userSummary.admins}
          icon="🛡️"
          accentColor="#a855f7"
          extra="Control total"
        />
      </div>

      {/* USUARIOS POR ROL + INFO */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1.5fr)',
          gap: 20,
        }}
      >
        <div style={lightCardStyle}>
          <h2 style={subtitleStyle}>Usuarios por rol</h2>
          <p style={descStyle}>Distribución actual de tipos de usuario</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RoleRow label="Pacientes" value={userSummary.patients} percent={percentage(userSummary.patients, userSummary.totalUsers)} color="#0ea5e9" />
            <RoleRow label="Médicos" value={userSummary.doctors} percent={percentage(userSummary.doctors, userSummary.totalUsers)} color="#16a34a" />
            <RoleRow label="Administradores" value={userSummary.admins} percent={percentage(userSummary.admins, userSummary.totalUsers)} color="#a855f7" />
          </div>
        </div>

        <div style={lightCardStyle}>
          <h2 style={subtitleStyle}>Posibles reportes</h2>
          <p style={descStyle}>Información útil para la gestión del hospital</p>

          <ul style={{ fontSize: 14, color: '#4b5563', paddingLeft: 18, lineHeight: 1.5 }}>
            <li>Usuarios registrados por fecha</li>
            <li>Usuarios activos e inactivos</li>
            <li>Cambios de roles y permisos</li>
            <li>Usuarios sin actividad reciente</li>
          </ul>
        </div>
      </div>

      {/* ÚLTIMOS USUARIOS */}
      <div style={lightCardStyle}>
        <h2 style={subtitleStyle}>Últimos usuarios registrados</h2>
        <p style={descStyle}>Vista rápida de los más recientes</p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 6px',
            fontSize: 15,
          }}
        >
          <thead>
            <tr style={{ textAlign: 'left', color: '#6b7280' }}>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.specialty}</td>
                <td>{u.registeredAt}</td>
                <td>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 13,
                      backgroundColor: u.status === 'Activo' ? '#dcfce7' : '#fee2e2',
                      color: u.status === 'Activo' ? '#166534' : '#b91c1c',
                    }}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- ESTILOS --------- */

const inputStyle = {
  padding: '10px 14px',
  borderRadius: 999,
  border: '1px solid #d1d5db',
  fontSize: 15,
};

const lightCardStyle = {
  backgroundColor: '#f9fafb',
  borderRadius: 18,
  padding: 16,
  border: '1px solid #e5e7eb',
};

const subtitleStyle = {
  fontSize: 20,
  color: '#111827',
  marginBottom: 4,
};

const descStyle = {
  fontSize: 14,
  color: '#6b7280',
  marginBottom: 10,
};

const FilterField: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 14, color: '#374151' }}>{label}</label>
    {children}
  </div>
);

const SummaryCard: React.FC<{
  label: string;
  value: number;
  icon: string;
  accentColor: string;
  extra?: string;
}> = ({ label, value, icon, accentColor, extra }) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 16,
      boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      transition: 'transform 0.12s ease, box-shadow 0.12s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 10px 22px rgba(15,23,42,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(15,23,42,0.08)';
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: `${accentColor}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 14, color: '#6b7280' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      {extra && <div style={{ fontSize: 13, color: '#6b7280' }}>{extra}</div>}
    </div>
  </div>
);

const RoleRow: React.FC<{
  label: string;
  value: number;
  percent: number;
  color: string;
}> = ({ label, value, percent, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span>{label}</span>
      <span>
        {value} ({percent.toFixed(1)}%)
      </span>
    </div>
    <div
      style={{
        marginTop: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 999,
        height: 12,
      }}
    >
      <div
        style={{
          width: `${Math.min(percent, 100)}%`,
          height: '100%',
          borderRadius: 999,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
);

function percentage(part: number, total: number): number {
  if (!total) return 0;
  return (part / total) * 100;
}

export default AdminReports;
