import React, { useState } from 'react';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'patient'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError('Ingresa un email válido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registerResponse = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          role: formData.role
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.detail || 'Error en el registro');
      }

      console.log('Registro exitoso');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '14px 16px',
    border: `2px solid ${focusedField === fieldName ? '#667eea' : '#e5e7eb'}`,
    borderRadius: '12px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
    outline: 'none',
    backgroundColor: focusedField === fieldName ? '#f9fafb' : 'white',
    fontFamily: 'inherit'
  });

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        maxWidth: '1100px',
        width: '100%',
        minHeight: '700px'
      }}>
        
        {/* Columna Izquierda - Formulario */}
        <div style={{
          padding: '50px 45px',
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
              fontSize: '36px',
              color: 'white'
            }}>
              🏥
            </div>
            <h1 style={{ 
              color: '#1f2937', 
              margin: '0 0 10px 0',
              fontSize: '28px',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>
              Crear Cuenta
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: 0,
              fontSize: '15px'
            }}>
              Únete a SaludConectada
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Formulario */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ingresa tu nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('firstName')}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Ingresa tu apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('lastName')}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px'
              }}>
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="usuario@saludconectada.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('email')}
                required
                disabled={isLoading}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px'
              }}>
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+51 999 999 999"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('phone')}
                required
                disabled={isLoading}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px'
              }}>
                Tipo de Cuenta
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setFocusedField('role')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle('role'),
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23374151\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center'
                }}
                disabled={isLoading}
              >
                <option value="patient">👤 Paciente</option>
                <option value="doctor">👨‍⚕️ Médico</option>
                <option value="admin">⚙️ Administrador</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('password')}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('confirmPassword')}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading ? 'none' : '0 10px 25px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transform: isLoading ? 'scale(1)' : 'scale(1)',
                fontFamily: 'inherit'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></div>
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear Cuenta
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {/* Enlace para login */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '2px solid #f3f4f6',
            color: '#6b7280',
            fontSize: '15px'
          }}>
            <p style={{ margin: 0 }}>
              ¿Ya tienes cuenta?{' '}
              <a 
                href="/login" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#764ba2'}
                onMouseOut={(e) => e.currentTarget.style.color = '#667eea'}
              >
                Inicia Sesión
              </a>
            </p>
          </div>
        </div>

        {/* Columna Derecha - Información */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '50px 45px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Círculos decorativos */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            opacity: 0.5
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            opacity: 0.3
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              margin: '0 0 20px 0',
              lineHeight: '1.2'
            }}>
              Únete a Nuestra Comunidad
            </h2>
            
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '35px',
              opacity: '0.95'
            }}>
              Crea tu cuenta y accede a todos los beneficios de SaludConectada. Gestiona tus citas, historial médico y más.
            </p>

            {/* Beneficios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
              {[
                { icon: '📅', text: 'Citas médicas online' },
                { icon: '📋', text: 'Historial médico digital' },
                { icon: '🔔', text: 'Recordatorios automáticos' },
                { icon: '🔒', text: 'Comunicación segura' }
              ].map((benefit, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0
                  }}>
                    {benefit.icon}
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Información adicional */}
            <div style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>🛡️</span>
                <span style={{ fontWeight: '700', fontSize: '18px' }}>Seguridad garantizada</span>
              </div>
              <p style={{ fontSize: '14px', margin: 0, opacity: '0.95', lineHeight: '1.5' }}>
                Tus datos están protegidos con encriptación de última generación. Cumplimos con todos los estándares de seguridad médica.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Register;