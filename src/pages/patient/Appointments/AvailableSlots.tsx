// src/pages/patient/Appointments/AvailableSlots.tsx - MEJORADO
import React, { useState, useEffect } from 'react';
import { useAvailableSlots } from '../../../hooks/useAvailableSlots';

interface AvailableSlotsProps {
  doctorId: number;
  fecha: string;
  horaSeleccionada: string;
  onHoraSelect: (hora: string) => void;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ 
  doctorId, 
  fecha, 
  horaSeleccionada, 
  onHoraSelect 
}) => {
  const { availableSlots, loading, error, loadAvailableSlots } = useAvailableSlots();

  // ✅ HORARIOS POR DEFECTO SI NO HAY DATOS DEL BACKEND
  const horariosPorDefecto = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  useEffect(() => {
    if (doctorId && fecha) {
      loadAvailableSlots(doctorId, fecha);
    }
  }, [doctorId, fecha, loadAvailableSlots]);

  const handleHoraClick = (hora: string) => {
    onHoraSelect(hora);
  };

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return '';
    const date = new Date(fechaStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // ✅ USAR HORARIOS POR DEFECTO SI NO HAY DATOS
  const horariosMostrar = availableSlots.length > 0 ? availableSlots : horariosPorDefecto;

  return (
    <div className="available-slots">
      <h3 className="slots-title">Horarios Disponibles</h3>
      <p className="slots-subtitle">
        {fecha && `Fecha: ${formatearFecha(fecha)}`}
      </p>

      {/* Loading */}
      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Cargando horarios disponibles...</p>
        </div>
      )}

      {/* Error - pero mostramos horarios por defecto */}
      {error && (
        <div className="info-message">
          <p>⚠️ No se pudieron cargar los horarios del médico. Mostrando horarios estándar.</p>
        </div>
      )}

      {/* Mostrar horarios disponibles */}
      {!loading && (
        <>
          <div className="slots-grid">
            {horariosMostrar.map((hora) => (
              <button
                key={hora}
                onClick={() => handleHoraClick(hora)}
                className={`slot-button slot-available ${
                  horaSeleccionada === hora ? 'slot-selected' : ''
                }`}
              >
                <span className="slot-time">{hora}</span>
                <span className="slot-status">✓ Disponible</span>
              </button>
            ))}
          </div>

          <div className="slots-info">
            <p>💡 <strong>Horarios de atención:</strong> Lunes a Viernes de 8:00 AM a 5:00 PM</p>
            <p>📅 <strong>Fechas disponibles:</strong> De lunes a viernes en los próximos 30 días</p>
          </div>

          <div className="slots-legend">
            <div className="legend-item">
              <div className="legend-color legend-available"></div>
              <span>Disponible</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-selected"></div>
              <span>Seleccionado</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableSlots;