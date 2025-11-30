import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Paciente' | 'Medico' | 'Administrador'>('Paciente');
  const [specialty, setSpecialty] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [status, setStatus] = useState<'Activo' | 'Inactivo'>('Activo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 Aquí luego irá la llamada a Supabase (insert)
    console.log('Crear usuario (demo)', {
      name,
      age,
      phone,
      email,
      role,
      specialty,
      registeredAt,
      status,
    });

    alert('Usuario creado (demo). Luego esto se conectará a Supabase.');
    navigate('/admin/users');
  };

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
        Crear nuevo usuario
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
        {/* Nombre */}
        <Field label="Nombre completo *">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Edad */}
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

        {/* Teléfono */}
        <Field label="Teléfono *">
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Email */}
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Rol */}
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

        {/* Especialidad */}
        <Field label="Especialidad">
          <input
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Fecha registro */}
        <Field label="Fecha de registro">
          <input
            type="date"
            value={registeredAt}
            onChange={(e) => setRegisteredAt(e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Estado */}
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
            Guardar usuario
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
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

export default CreateUser;
