import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  { id: '4', name: 'Jo Hi', role: 'Administrador', specialty: 'N/A', registeredAt: '11/11/2025', status: 'Activo' }
];

const cardShadow = '0 10px 30px rgba(15, 23, 42, 0.10)';

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Inactivo'>('Todos');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'Todos' ? true : user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Título + botón nuevo usuario */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              margin: 0,
              color: '#111827',
              fontWeight: 700,
            }}
          >
            Lista de usuarios
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#6b7280',
              marginTop: 6,
            }}
          >
            Gestión de usuarios del sistema (vista administrativa).
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/users/create')}
          style={{
            borderRadius: 999,
            padding: '10px 20px',
            border: 'none',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #4f46e5, #22c1c3)',
            color: '#ffffff',
            boxShadow: cardShadow,
            transition: 'transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.06)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 14px 30px rgba(15,23,42,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = cardShadow;
          }}
        >
          + Nuevo usuario
        </button>
      </div>

      {/* Caja de búsqueda y filtro + tabla */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
          borderRadius: 20,
          padding: 18,
          boxShadow: cardShadow,
        }}
      >
        {/* Filtros */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 14,
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Buscar usuario (nombre o ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 220,
              padding: '10px 14px',
              borderRadius: 999,
              border: 'none',
              outline: 'none',
              fontSize: 14,
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              padding: '10px 14px',
              borderRadius: 999,
              border: 'none',
              minWidth: 160,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>

        {/* Tabla */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.97)',
            borderRadius: 18,
            padding: '12px 16px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ textAlign: 'left', color: '#6b7280' }}>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Especialidad</th>
                <th>Fecha registro</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 10px rgba(15,23,42,0.06)',
                  }}
                >
                  <td style={{ padding: '8px 8px' }}>{user.name}</td>
                  <td style={{ padding: '8px 8px' }}>{user.role}</td>
                  <td style={{ padding: '8px 8px' }}>{user.specialty}</td>
                  <td style={{ padding: '8px 8px' }}>{user.registeredAt}</td>

                  {/* Estado */}
                  <td style={{ padding: '8px 8px' }}>
                    <span
                      style={{
                        padding: '5px 12px',
                        borderRadius: 999,
                        backgroundColor:
                          user.status === 'Activo' ? '#dcfce7' : '#fee2e2',
                        color:
                          user.status === 'Activo' ? '#166534' : '#b91c1c',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td style={{ padding: '8px 8px', textAlign: 'right' }}>
                    <button
                      style={{
                        padding: '7px 12px',
                        borderRadius: 999,
                        border: '1px solid #d1d5db',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: 13,
                        transition: 'background-color 0.12s ease, transform 0.12s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.transform = 'none';
                      }}
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      paddingTop: 12,
                      textAlign: 'center',
                      color: '#6b7280',
                    }}
                  >
                    No se encontraron usuarios con los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
