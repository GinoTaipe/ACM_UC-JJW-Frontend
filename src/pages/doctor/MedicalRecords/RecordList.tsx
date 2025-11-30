import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'M' | 'F';
  lastVisit: string;
  diagnosis: string;
  status: 'active' | 'closed' | 'followup';
  notes: string;
  medications: string[];
  createdDate: string;
}

const RecordList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const navigate = useNavigate();
  

  // Datos de ejemplo - historiales médicos
  const medicalRecords: MedicalRecord[] = [
    {
      id: 'MR001',
      patientId: 'P001',
      patientName: 'Ana García López',
      patientAge: 34,
      patientGender: 'F',
      lastVisit: '2024-01-15',
      diagnosis: 'Hipertensión arterial esencial',
      status: 'active',
      notes: 'Paciente con control de presión arterial. Respondiendo bien al tratamiento.',
      medications: ['Losartán 50mg', 'Hidroclorotiazida 25mg'],
      createdDate: '2023-03-10'
    },
    {
      id: 'MR002',
      patientId: 'P002',
      patientName: 'Carlos Rodríguez',
      patientAge: 45,
      patientGender: 'M',
      lastVisit: '2024-01-10',
      diagnosis: 'Diabetes Mellitus Tipo 2',
      status: 'active',
      notes: 'Control glucémico estable. Monitoreo continuo requerido.',
      medications: ['Metformina 850mg', 'Glibenclamida 5mg'],
      createdDate: '2023-05-22'
    },
    {
      id: 'MR003',
      patientId: 'P003',
      patientName: 'María Torres',
      patientAge: 28,
      patientGender: 'F',
      lastVisit: '2023-12-20',
      diagnosis: 'Anemia ferropénica',
      status: 'followup',
      notes: 'Mejoría significativa con suplementación de hierro.',
      medications: ['Sulfato ferroso 200mg', 'Ácido fólico 5mg'],
      createdDate: '2023-11-15'
    },
    {
      id: 'MR004',
      patientId: 'P004',
      patientName: 'Juan Pérez',
      patientAge: 52,
      patientGender: 'M',
      lastVisit: '2023-11-30',
      diagnosis: 'Artrosis de rodilla',
      status: 'closed',
      notes: 'Tratamiento completado. Paciente referido a fisioterapia.',
      medications: ['Paracetamol 500mg', 'Glucosamina 1500mg'],
      createdDate: '2023-09-05'
    }
  ];

  // Filtrar historiales
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#10b981',
      followup: '#f59e0b',
      closed: '#6b7280'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: 'Activo',
      followup: 'Seguimiento',
      closed: 'Cerrado'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getGenderText = (gender: string) => {
    return gender === 'M' ? 'Masculino' : 'Femenino';
  };

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
          Historiales Clínicos
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '16px'
        }}>
          Gestiona los historiales médicos de tus pacientes
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Búsqueda */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar por paciente o diagnóstico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 40px 10px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                width: '300px'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              🔍
            </span>
          </div>

          {/* Filtro por estado */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="followup">Seguimiento</option>
            <option value="closed">Cerrados</option>
          </select>
        </div>
        
      
          <button 
            onClick={() => navigate('/doctor/medical-records/new')}
            style={{
              padding: '10px 20px',
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
            Nuevo Historial
          </button>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#2a4ea2' }}>
            {medicalRecords.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Historiales</div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
            {medicalRecords.filter(r => r.status === 'active').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Activos</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
            {medicalRecords.filter(r => r.status === 'followup').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Seguimiento</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#6b7280' }}>
            {medicalRecords.filter(r => r.status === 'closed').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Cerrados</div>
        </div>
      </div>

      {/* Lista de historiales */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {filteredRecords.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            No se encontraron historiales con los filtros aplicados
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filteredRecords.map((record, index) => (
              <div
                key={record.id}
                style={{
                  padding: '20px',
                  borderBottom: index < filteredRecords.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: 'white',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* Información del paciente */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2a4ea2, #3b82f6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        {record.patientName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ 
                          fontWeight: '600',
                          color: '#1e293b',
                          fontSize: '18px',
                          marginBottom: '4px'
                        }}>
                          {record.patientName}
                        </div>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#6b7280' }}>
                          <span>ID: {record.patientId}</span>
                          <span>{record.patientAge} años</span>
                          <span>{getGenderText(record.patientGender)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Diagnóstico y tratamiento */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ 
                        fontWeight: '600',
                        color: '#2a4ea2',
                        marginBottom: '4px'
                      }}>
                        Diagnóstico: {record.diagnosis}
                      </div>
                      <div style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {record.notes}
                      </div>
                    </div>

                    {/* Medicamentos */}
                    <div>
                      <div style={{ 
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                        fontSize: '14px'
                      }}>
                        Medicación:
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {record.medications.map((med, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '4px 8px',
                              background: '#f0f9ff',
                              color: '#0369a1',
                              borderRadius: '6px',
                              fontSize: '12px',
                              border: '1px solid #bae6fd'
                            }}
                          >
                            💊 {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Estado y acciones */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        background: getStatusColor(record.status),
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {getStatusText(record.status)}
                      </span>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          Última visita:
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>
                          {new Date(record.lastVisit).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => navigate(`/doctor/medical-records/${record.id}`)}
                        style={{
                          padding: '8px 16px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>👁️</span>
                        Ver
                      </button>
                      <button style={{
                        padding: '8px 16px',
                        background: '#fef3c7',
                        color: '#92400e',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>✏️</span>
                        Editar
                      </button>
                      <button style={{
                        padding: '8px 16px',
                        background: '#f0f9ff',
                        color: '#2a4ea2',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>📋</span>
                        Evolución
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordList;