import React, { useState } from 'react';
import '../../../styles/EditProfile.css';

interface ProfileData {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  pais: string;
  fechaNacimiento: string;
  sexo: string;
  email: string;
  notificacionesCitas: boolean;
  notificacionesMedicamentos: boolean;
  notificacionesEmail: boolean;
}

const EditProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'config'>('personal');
  
  // Notificación flotante
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Estados para contraseñas
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Errores
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [profileData, setProfileData] = useState<ProfileData>({
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    direccion: '',
    pais: 'Perú',
    fechaNacimiento: '',
    sexo: '',
    email: 'paciente@gmail.com',
    notificacionesCitas: true,
    notificacionesMedicamentos: true,
    notificacionesEmail: false,
  });

  // ========================================
  // VALIDACIONES SIMPLES
  // ========================================
  
  const validar = (campo: string, valor: string): string => {
    // Si está vacío, no validar (no es obligatorio)
    if (!valor || valor.trim() === '') return '';
    
    switch (campo) {
      case 'nombres':
      case 'apellidos':
        if (valor.length < 2) return 'Mínimo 2 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'Solo letras';
        return '';
        
      case 'dni':
        if (!/^\d{8}$/.test(valor)) return 'Debe tener 8 dígitos';
        return '';
        
      case 'telefono':
        if (!/^\+?[\d\s]{9,15}$/.test(valor)) return 'Formato inválido';
        return '';
        
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Email inválido';
        return '';
        
      case 'direccion':
        if (valor.length < 5) return 'Mínimo 5 caracteres';
        return '';
        
      default:
        return '';
    }
  };

  const validarPassword = (): string => {
    if (!newPassword) return 'La contraseña es obligatoria';
    if (newPassword.length < 6) return 'Mínimo 6 caracteres';
    if (!/[A-Z]/.test(newPassword)) return 'Necesita una mayúscula';
    if (!/[0-9]/.test(newPassword)) return 'Necesita un número';
    if (newPassword !== confirmPassword) return 'Las contraseñas no coinciden';
    return '';
  };

  // ========================================
  // MANEJAR CAMBIOS
  // ========================================
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real
    const error = validar(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (name: keyof ProfileData) => {
    setProfileData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // ========================================
  // MOSTRAR NOTIFICACIÓN
  // ========================================
  
  const mostrarNotificacion = (mensaje: string) => {
    setNotificationMessage(mensaje);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // ========================================
  // GUARDAR
  // ========================================
  
  const guardarInformacionPersonal = () => {
    // Validar solo los campos que tienen contenido
    const nuevosErrores: {[key: string]: string} = {};
    
    if (profileData.nombres) nuevosErrores.nombres = validar('nombres', profileData.nombres);
    if (profileData.apellidos) nuevosErrores.apellidos = validar('apellidos', profileData.apellidos);
    if (profileData.dni) nuevosErrores.dni = validar('dni', profileData.dni);
    if (profileData.telefono) nuevosErrores.telefono = validar('telefono', profileData.telefono);
    if (profileData.direccion) nuevosErrores.direccion = validar('direccion', profileData.direccion);
    
    // Filtrar solo errores que tengan valor
    const erroresReales = Object.fromEntries(
      Object.entries(nuevosErrores).filter(([, valor]) => valor !== '')
    );
    
    if (Object.keys(erroresReales).length > 0) {
      setErrors(erroresReales);
      return;
    }
    
    mostrarNotificacion('✅ Información personal actualizada');
    console.log('Datos guardados:', profileData);
  };

  const guardarEmail = () => {
    const error = validar('email', profileData.email);
    if (error) {
      setErrors(prev => ({ ...prev, email: error }));
      return;
    }
    mostrarNotificacion('✅ Email actualizado correctamente');
  };

  const cambiarContrasena = () => {
    const error = validarPassword();
    if (error) {
      setErrors(prev => ({ ...prev, password: error }));
      return;
    }
    mostrarNotificacion('✅ Contraseña cambiada exitosamente');
    setNewPassword('');
    setConfirmPassword('');
    setErrors(prev => ({ ...prev, password: '' }));
  };

  // ========================================
  // CANCELAR/RESETEAR
  // ========================================
  
  const cancelarCambios = () => {
    // Resetear al estado inicial
    setProfileData({
      nombres: '',
      apellidos: '',
      dni: '',
      telefono: '',
      direccion: '',
      pais: 'Perú',
      fechaNacimiento: '',
      sexo: '',
      email: 'paciente@gmail.com',
      notificacionesCitas: true,
      notificacionesMedicamentos: true,
      notificacionesEmail: false,
    });
    setErrors({});
    setNewPassword('');
    setConfirmPassword('');
    mostrarNotificacion('❌ Cambios cancelados');
  };

  return (
    <div className="edit-profile-container">
      {/* NOTIFICACIÓN FLOTANTE */}
      {showNotification && (
        <div className="floating-notification">
          {notificationMessage}
        </div>
      )}

      {/* Header */}
      <div className="profile-header gradient-header">
        <div className="profile-header-content">
          <div>
            <h1 className="profile-title">Mi Perfil</h1>
            <p className="profile-subtitle">Administra tu información personal y preferencias</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Sidebar */}
        <div className="profile-sidebar gradient-border">
          <div className="avatar-container">
            <div className="avatar-wrapper">
              <div className="avatar rainbow-glow">
                <span className="avatar-text">
                  {profileData.nombres ? profileData.nombres.charAt(0).toUpperCase() : '👤'}
                </span>
              </div>
              <button className="camera-button rainbow-button">📷</button>
            </div>
            <h3 className="user-name gradient-text">
              {profileData.nombres || 'Nombre'} {profileData.apellidos || 'Apellido'}
            </h3>
            <p className="user-email">{profileData.email}</p>
            <div className="user-badge rainbow-badge">
              <span className="user-badge-text">⭐ Paciente ⭐</span>
            </div>
          </div>

          <nav className="tabs-nav">
            <button
              onClick={() => setActiveTab('personal')}
              className={`tab-button ${activeTab === 'personal' ? 'active gradient-active' : 'inactive'}`}
            >
              👤 Información Personal
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`tab-button ${activeTab === 'config' ? 'active gradient-active' : 'inactive'}`}
            >
              ⚙️ Configuración
            </button>
          </nav>
        </div>

        {/* Contenido Principal */}
        <div className="profile-content gradient-border">
          {activeTab === 'personal' ? (
            <div>
              <div className="section-header">
                <h2 className="section-title gradient-text">📋 Información Personal</h2>
                <div className="section-divider rainbow-divider"></div>
                <p className="section-description">Actualiza los campos que desees cambiar</p>
              </div>

              <div className="form-grid">
                {/* NOMBRES */}
                <div className="form-field">
                  <label className="form-label colorful-label">💎 Nombres</label>
                  <input
                    type="text"
                    name="nombres"
                    value={profileData.nombres}
                    onChange={handleInputChange}
                    className={`form-input ${errors.nombres ? 'input-error' : 'input-glow-blue'}`}
                    placeholder="Ingresa tus nombres"
                  />
                  {errors.nombres && <span className="error-message">❌ {errors.nombres}</span>}
                </div>

                {/* APELLIDOS */}
                <div className="form-field">
                  <label className="form-label colorful-label">💎 Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={profileData.apellidos}
                    onChange={handleInputChange}
                    className={`form-input ${errors.apellidos ? 'input-error' : 'input-glow-purple'}`}
                    placeholder="Ingresa tus apellidos"
                  />
                  {errors.apellidos && <span className="error-message">❌ {errors.apellidos}</span>}
                </div>

                {/* DNI */}
                <div className="form-field">
                  <label className="form-label colorful-label">🆔 DNI</label>
                  <input
                    type="text"
                    name="dni"
                    value={profileData.dni}
                    onChange={handleInputChange}
                    maxLength={8}
                    className={`form-input ${errors.dni ? 'input-error' : 'input-glow-green'}`}
                    placeholder="12345678"
                  />
                  {errors.dni && <span className="error-message">❌ {errors.dni}</span>}
                </div>

                {/* TELÉFONO */}
                <div className="form-field">
                  <label className="form-label colorful-label">📱 Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={profileData.telefono}
                    onChange={handleInputChange}
                    className={`form-input ${errors.telefono ? 'input-error' : 'input-glow-orange'}`}
                    placeholder="+51 999 999 999"
                  />
                  {errors.telefono && <span className="error-message">❌ {errors.telefono}</span>}
                </div>

                {/* FECHA DE NACIMIENTO */}
                <div className="form-field">
                  <label className="form-label colorful-label">🎂 Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={profileData.fechaNacimiento}
                    onChange={handleInputChange}
                    className="form-input input-glow-pink"
                  />
                </div>

                {/* SEXO */}
                <div className="form-field">
                  <label className="form-label colorful-label">⚧️ Sexo</label>
                  <select
                    name="sexo"
                    value={profileData.sexo}
                    onChange={handleInputChange}
                    className="form-select input-glow-cyan"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* DIRECCIÓN */}
                <div className="form-field full-width">
                  <label className="form-label colorful-label">🏠 Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={profileData.direccion}
                    onChange={handleInputChange}
                    className={`form-input ${errors.direccion ? 'input-error' : 'input-glow-indigo'}`}
                    placeholder="Av. Ejemplo 123, Distrito, Ciudad"
                  />
                  {errors.direccion && <span className="error-message">❌ {errors.direccion}</span>}
                </div>

                {/* PAÍS */}
                <div className="form-field">
                  <label className="form-label colorful-label">🌎 País</label>
                  <select
                    name="pais"
                    value={profileData.pais}
                    onChange={handleInputChange}
                    className="form-select input-glow-teal"
                  >
                    <option value="Perú">Perú</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="España">España</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Paraguay">Paraguay</option>
                  </select>
                </div>
              </div>

              {/* Botón Guardar */}
              <div className="form-actions">
                <button onClick={cancelarCambios} className="btn btn-cancel">Cancelar</button>
                <button onClick={guardarInformacionPersonal} className="btn btn-save rainbow-button-animated">
                  💾 Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="section-header">
                <h2 className="section-title gradient-text">⚙️ Configuración</h2>
                <div className="section-divider" style={{background: 'linear-gradient(to right, #a855f7, #ec4899, #f97316)'}}></div>
                <p className="section-description">Gestiona tu cuenta y notificaciones</p>
              </div>

              {/* EMAIL */}
              <div className="config-section config-blue">
                <label className="form-label colorful-label">📧 Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'input-error' : 'input-glow-blue'}`}
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && <span className="error-message">❌ {errors.email}</span>}
                <button onClick={guardarEmail} className="btn-change gradient-button-blue">
                  ✅ Actualizar Email
                </button>
              </div>

              {/* CONTRASEÑA */}
              <div className="config-section config-purple">
                <label className="form-label colorful-label">🔒 Nueva Contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`form-input ${errors.password ? 'input-error' : 'input-glow-purple'}`}
                  placeholder="Nueva contraseña (min. 6 caracteres)"
                />
                
                <label className="form-label colorful-label" style={{marginTop: '12px'}}>🔐 Confirmar Contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-input ${errors.password ? 'input-error' : 'input-glow-pink'}`}
                  placeholder="Confirma tu contraseña"
                />
                
                {errors.password && <span className="error-message">❌ {errors.password}</span>}
                
                <button onClick={cambiarContrasena} className="btn-change gradient-button-purple">
                  🔐 Cambiar Contraseña
                </button>
              </div>

              {/* NOTIFICACIONES */}
              <div className="notifications-section">
                <h3 className="notifications-title gradient-text">🔔 Notificaciones</h3>
                
                <div className="notifications-list">
                  <label className="notification-item notification-blue">
                    <div className="notification-info">
                      <h4>📅 Recordatorio de citas</h4>
                      <p>Recibe notificaciones sobre tus citas médicas</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={profileData.notificacionesCitas}
                        onChange={() => handleCheckboxChange('notificacionesCitas')}
                      />
                      <span className="toggle-slider toggle-blue"></span>
                    </label>
                  </label>

                  <label className="notification-item notification-green">
                    <div className="notification-info">
                      <h4>💊 Recordatorio de medicamentos</h4>
                      <p>Recibe alertas para tomar tus medicamentos</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={profileData.notificacionesMedicamentos}
                        onChange={() => handleCheckboxChange('notificacionesMedicamentos')}
                      />
                      <span className="toggle-slider toggle-green"></span>
                    </label>
                  </label>

                  <label className="notification-item notification-purple">
                    <div className="notification-info">
                      <h4>📬 Vía correo electrónico</h4>
                      <p>Recibe notificaciones por email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={profileData.notificacionesEmail}
                        onChange={() => handleCheckboxChange('notificacionesEmail')}
                      />
                      <span className="toggle-slider toggle-purple"></span>
                    </label>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;