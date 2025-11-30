import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface AdminUser {
  id: string;
  name: string;
  role: 'Paciente' | 'Medico' | 'Administrador';
  specialty: string;
  registeredAt: string;
  status: 'Activo' | 'Inactivo';
  age: number;
  phone: string;
  email: string;
}

// 👇 Datos de ejemplo (luego se reemplaza por Supabase)
const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Jaren Buendia',
    role: 'Paciente',
    specialty: 'N/A',
    registeredAt: '10/11/2022',
    status: 'Activo',
    age: 25,
    phone: '988747339',
    email: 'jaren@gmail.com',
  },
  {
    id: '2',
    name: 'Juan Carhuaz',
    role: 'Medico',
    specialty: 'Cardiología',
    registeredAt: '11/11/2025',
    status: 'Activo',
    age: 34,
    phone: '987654321',
    email: 'juan.carhuaz@hospital.com',
  },
  {
    id: '3',
    name: 'Luis Torres',
    role: 'Medico',
    specialty: 'Medicina General',
    registeredAt: '11/11/2025',
    status: 'Activo',
    age: 40,
    phone: '999888777',
    email: 'luis.torres@hospital.com',
  },
  {
    id: '4',
    name: 'Jo Hi',
    role: 'Administrador',
    specialty: 'N/A',
    registeredAt: '11/11/2025',
    status: 'Activo',
    age: 29,
    phone: '955444333',
    email: 'admin@saludconectada.com',
  },
];

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<AdminUser | null>(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Paciente' | 'Medico' | 'Administrador'>('Paciente');
  const [specialty, setSpecialty] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo');

  useEffect(() => {
    const found = mockUsers.find((u) => u.id === (id ?? ''));
    if (found) {
      setUser(found);
      setName(found.name);
      setAge(String(found.age));
      setPhone(found.phone);
      setEmail(found.email);
      setRole(found.role);
      setSpecialty(found.specialty);
      setRegisteredAt(found.registeredAt);
      setStatus(found.status);
    } else {
      setUser(null);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 Aquí luego va el update en Supabase
    console.log('Actualizar usuario (demo)', {
      id,
      name,
      age,
      phone,
      email,
      role,
      specialty,
      registeredAt,
      status,
    });
    alert(`Cambios guardados para el usuario #${id} (demo).`);
    navigate('/admin/users');
  };

  if (!id) {
    return <div>No se proporcionó un ID de usuario válido.</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Usuario no encontrado</h2>
        <p>No se encontró un usuario con el ID: {id}</p>
        <button
          onClick={() => navigate('/admin/users')}
          style={{
            marginTop: 8,
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 950,
        margin: '0 auto',
        background: 'linear-gradient(135deg, #4fd1c5, #38bdf8)',
        borderRadius: 24,
        padding: 24,
        boxShadow: '0 10px 30px rgba(15,23,42,0.18)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: 26,
          marginBottom: 16,
          color: '#111827',
          fontWeight: 700,
        }}
      >
        Editar usuario
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        <Field label="Nombre completo *">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Edad *">
          <input
            required
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Teléfono *">
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Rol *">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            style={inputStyle}
          >
            <option value="Paciente">Paciente</option>
            <option value="Medico">Médico</option>
            <option value="Administrador">Administrador</option>
          </select>
        </Field>

        <Field label="Especialidad">
          <input
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Fecha de registro">
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            value={registeredAt}
            onChange={(e) => setRegisteredAt(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 14 }}>Estado *</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['Activo', 'Inactivo'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 999,
                  border:
                    status === option ? '2px solid #2563eb' : '1px solid #d1d5db',
                  backgroundColor: status === option ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: status === option ? 700 : 500,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div
          style={{
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: '9px 16px',
              borderRadius: 999,
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              padding: '9px 18px',
              borderRadius: 999,
              border: 'none',
              background: 'linear-gradient(135deg, #00b4db, #0083b0)',
              color: '#ffffff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '9px 12px',
  borderRadius: 999,
  border: '1px solid #d1d5db',
  fontSize: 14,
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 14 }}>{label}</label>
    {children}
  </div>
);

export default UserDetail;
