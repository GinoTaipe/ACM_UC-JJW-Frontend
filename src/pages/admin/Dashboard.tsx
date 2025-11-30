import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const pageBg = '#f4f7fb';
const cardShadow = '0 10px 30px rgba(15, 23, 42, 0.12)';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalUsers: 42,
    totalDoctors: 8,
    totalPatients: 30,
    todayAppointments: 18,
  };

  const recentActivity = [
    {
      id: 1,
      title: 'Nuevo usuario registrado',
      detail: 'Se registró un nuevo paciente en el sistema.',
      time: '10:30 AM · Hoy',
    },
    {
      id: 2,
      title: 'Cita médica completada',
      detail: 'Dr. Silva completó una consulta con Juan Pérez.',
      time: '09:15 AM · Hoy',
    },
    {
      id: 3,
      title: 'Actualización de tratamiento',
      detail: 'Se actualizó el tratamiento de Jaren Buendia.',
      time: '08:45 AM · Hoy',
    },
    {
      id: 4,
      title: 'Reporte generado',
      detail: 'Se generó el reporte estadístico mensual.',
      time: 'Ayer',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: pageBg,
        padding: '16px 8px',
        minHeight: '100%',
      }}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 24,
          padding: 24,
          boxShadow: cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Encabezado */}
        <header
          style={{
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: 16,
          }}
        >
          <h1
            style={{
              fontSize: 30,
              margin: 0,
              color: '#111827',
              fontWeight: 700,
            }}
          >
            Panel del administrador
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#6b7280',
              marginTop: 8,
            }}
          >
            Hola {user?.name ?? 'Administrador'}, desde aquí puedes gestionar usuarios,
            estadísticas, permisos y reportes del sistema SaludConectada.
          </p>
        </header>

        {/* Tarjetas de resumen */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 20,
          }}
        >
          <SummaryCard
            label="Usuarios totales"
            value={stats.totalUsers}
            color="#2563eb"
            icon="👥"
          />
          <SummaryCard
            label="Médicos activos"
            value={stats.totalDoctors}
            color="#16a34a"
            icon="🩺"
          />
          <SummaryCard
            label="Pacientes registrados"
            value={stats.totalPatients}
            color="#f97316"
            icon="🙂"
          />
          <SummaryCard
            label="Citas de hoy"
            value={stats.todayAppointments}
            color="#4f46e5"
            icon="📅"
          />
        </section>

        {/* Actividad reciente + accesos rápidos */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.3fr)',
            gap: 20,
          }}
        >
          {/* Actividad reciente */}
          <div
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: 18,
              padding: 18,
              border: '1px solid #e5e7eb',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                marginBottom: 6,
                color: '#111827',
              }}
            >
              Actividad reciente
            </h2>
            <p
              style={{
                fontSize: 14,
                color: '#6b7280',
                marginBottom: 12,
              }}
            >
              Últimos eventos registrados en el sistema.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderRadius: 14,
                    padding: '10px 14px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 8px 20px rgba(15, 23, 42, 0.12)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: '#4b5563' }}>{item.detail}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#9ca3af',
                      marginTop: 4,
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accesos rápidos */}
          <div
            style={{
              background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
              borderRadius: 18,
              padding: 18,
              color: '#000000',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              Accesos rápidos
            </h2>
            <p
              style={{
                fontSize: 14,
                marginBottom: 14,
              }}
            >
              Navega rápidamente a las secciones más usadas del panel.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <QuickLink
                label="Gestionar usuarios"
                icon="👥"
                onClick={() => navigate('/admin/users')}
              />
              <QuickLink
                label="Ver estadísticas"
                icon="📊"
                onClick={() => navigate('/admin/statistics')}
              />
              <QuickLink
                label="Permisos y roles"
                icon="🛡️"
                onClick={() => navigate('/admin/settings')}
              />
              <QuickLink
                label="Reportes del sistema"
                icon="📋"
                onClick={() => navigate('/admin/reports')}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ========= Subcomponentes ========= */

interface SummaryCardProps {
  label: string;
  value: number;
  color: string;
  icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, color, icon }) => (
  <div
    style={{
      backgroundColor: '#ffffff',
      padding: 18,
      borderRadius: 18,
      boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      transition: 'transform 0.12s ease, box-shadow 0.12s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 10px 26px rgba(15, 23, 42, 0.14)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)';
      e.currentTarget.style.transform = 'none';
    }}
  >
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 14, color: '#6b7280' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#111827' }}>{value}</div>
    </div>
  </div>
);

interface QuickLinkProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const QuickLink: React.FC<QuickLinkProps> = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    style={{
      borderRadius: 999,
      padding: '12px 16px',
      border: 'none',
      backgroundColor: 'rgba(255,255,255,0.3)',
      color: '#000000',
      fontWeight: 750,
      fontSize: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease',
      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.55)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.18)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.12)';
    }}
  >
    <span>
      {icon} {label}
    </span>
    <span>→</span>
  </button>
);

export default AdminDashboard;
