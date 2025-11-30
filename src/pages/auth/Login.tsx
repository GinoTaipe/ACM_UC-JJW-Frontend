import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login({ email })
      
      if (email.includes('doctor')) {
        navigate('/doctor')
      } else if (email.includes('admin')) {
        navigate('/admin')
      } else {
        navigate('/patient')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #29f8ff 0%, #2a4ea2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        maxWidth: '900px',
        width: '100%',
        minHeight: '550px'
      }}>
        
        {/* Columna Izquierda - Formulario */}
        <div style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          background: 'white'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="/assets/images/logos/logo-splash.png" 
              alt="SaludConectada" 
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px',
                border: '3px solid #e0f2fe'
              }}
            />
            <h1 style={{ 
              color: '#2a4ea2', 
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontWeight: '700'
            }}>
              SaludConectada
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: 0,
              fontSize: '14px'
            }}>
              Ingresa a tu cuenta
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151',
                fontSize: '14px'
              }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px'
                }}>📧</span>
                <input
                  type="email"
                  placeholder="usuario@saludconectada.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  required
                  disabled={isLoading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a4ea2'
                    e.target.style.boxShadow = '0 0 0 3px rgba(42, 78, 162, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>


            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #2a4ea2, #3b82f6)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(42, 78, 162, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Footer del formulario */}
                      <div style={{
              marginTop: '20px',
              textAlign: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <p>¿No tienes cuenta? <Link to="/register" style={{ color: '#2a4ea2', textDecoration: 'none', fontWeight: '500' }}>Regístrate aquí</Link></p>
            </div>
        </div>

        {/* Columna Derecha - Credenciales e Información */}
        <div style={{
          background: 'linear-gradient(135deg, #2a4ea2, #3b82f6)',
          color: 'white',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '700',
              margin: '0 0 15px 0'
            }}>
              Credenciales de Prueba
            </h2>
            
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '25px',
              opacity: '0.9'
            }}>
              Utiliza estas credenciales para probar la plataforma. Cualquier contraseña es válida.
            </p>

            {/* Lista de credenciales */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>Paciente</div>
                  <div style={{ fontSize: '13px', opacity: '0.8' }}>paciente@saludconectada.com</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  🩺
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>Médico</div>
                  <div style={{ fontSize: '13px', opacity: '0.8' }}>doctor@saludconectada.com</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(139, 92, 246, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  ⚙️
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>Administrador</div>
                  <div style={{ fontSize: '13px', opacity: '0.8' }}>admin@saludconectada.com</div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div style={{
              marginTop: '25px',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px' }}>💡</span>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>Nota importante</span>
              </div>
              <p style={{ fontSize: '13px', margin: 0, opacity: '0.9', lineHeight: '1.4' }}>
                Estas credenciales son para propósitos de demostración. En un entorno de producción, cada usuario tendría su propia cuenta segura.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animación del spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Login