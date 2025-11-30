import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  lastVisit: string;
  status: 'Activo' | 'Inactivo';
}

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Datos de ejemplo
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Ana García López',
      email: 'ana.garcia@email.com',
      phone: '+51 987 654 321',
      age: 34,
      lastVisit: '2024-01-15',
      status: 'Activo'
    },
    {
      id: '2', 
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+51 987 654 322',
      age: 45,
      lastVisit: '2024-01-10',
      status: 'Activo'
    },
    {
      id: '3',
      name: 'María Torres',
      email: 'maria.torres@email.com', 
      phone: '+51 987 654 323',
      age: 28,
      lastVisit: '2023-12-20',
      status: 'Inactivo'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Gestión de Pacientes
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Administra la información de tus pacientes
        </p>
      </div>

      {/* Barra de búsqueda y acciones */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '20px'
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 45px 12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <span style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280'
          }}>
            🔍
          </span>
        </div>

        <button 
          onClick={() => navigate('/doctor/patients/new')}
          style={{
            padding: '12px 24px',
            background: '#2a4ea2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>➕</span>
          Nuevo Paciente
        </button>
      </div>

      {/* Tabla de pacientes */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Paciente
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Contacto
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Edad
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Última Visita
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Estado
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>
                    {patient.name}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {patient.email}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>
                    {patient.phone}
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#6b7280' }}>
                  {patient.age} años
                </td>
                <td style={{ padding: '16px', color: '#6b7280' }}>
                  {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: patient.status === 'Activo' ? '#d1fae5' : '#fef3c7',
                    color: patient.status === 'Activo' ? '#065f46' : '#92400e',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {patient.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                      style={{
                        padding: '6px 12px',
                        background: '#e0f2fe',
                        color: '#0369a1',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Ver
                    </button>
                    <button 
                    onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                    style={{
                      padding: '6px 12px',
                      background: '#fef3c7', 
                      color: '#92400e',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            No se encontraron pacientes
          </div>
        )}
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#2a4ea2' }}>
            {patients.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Pacientes</div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
            {patients.filter(p => p.status === 'Activo').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pacientes Activos</div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;