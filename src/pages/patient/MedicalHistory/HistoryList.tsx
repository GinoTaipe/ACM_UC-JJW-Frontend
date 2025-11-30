import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/HistoryList.css';

interface Diagnostico {
  id: number;
  titulo: string;
  fecha: string;
  medico: string;
  detalles: string;
}

interface Receta {
  id: number;
  fecha: string;
  medico: string;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  indicaciones: string;
}

interface Resultado {
  id: number;
  fecha: string;
  tipo: string;
  estado: 'Completado' | 'Pendiente';
  archivo?: string;
}

// Función para generar PDF
const generarPDF = async (
  tipo: 'diagnostico' | 'receta' | 'resultado',
  data: Diagnostico | Receta | Resultado
) => {
  try {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(tipo.toUpperCase(), 105, 20, { align: 'center' });
    
    let y = 40;
    doc.setFontSize(11);
    
    if (tipo === 'diagnostico' && 'detalles' in data) {
      doc.text(`Título: ${data.titulo}`, 20, y); y += 7;
      doc.text(`Fecha: ${data.fecha}`, 20, y); y += 7;
      doc.text(`Médico: ${data.medico}`, 20, y); y += 7;
      doc.text(`Detalles: ${data.detalles}`, 20, y);
    } else if (tipo === 'receta' && 'medicamento' in data) {
      doc.text(`Medicamento: ${data.medicamento}`, 20, y); y += 7;
      doc.text(`Médico: ${data.medico}`, 20, y); y += 7;
      doc.text(`Dosis: ${data.dosis}`, 20, y); y += 7;
      doc.text(`Frecuencia: ${data.frecuencia}`, 20, y); y += 7;
      doc.text(`Duración: ${data.duracion}`, 20, y); y += 7;
      doc.text(`Indicaciones: ${data.indicaciones}`, 20, y);
    } else if (tipo === 'resultado' && 'estado' in data) {
      doc.text(`Tipo: ${data.tipo}`, 20, y); y += 7;
      doc.text(`Fecha: ${data.fecha}`, 20, y); y += 7;
      doc.text(`Estado: ${data.estado}`, 20, y);
    }
    
    doc.save(`${tipo}_${data.id}.pdf`);
  } catch (error: unknown) {
    console.error(error);
    alert('Error al generar el PDF. Asegúrate de tener instalado jsPDF: npm install jspdf');
  }
};

const HistoryList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'diagnostico' | 'recetas' | 'resultados'>('diagnostico');

  const diagnosticos: Diagnostico[] = [
    { id: 1, titulo: 'Infección respiratoria', fecha: '01-01-2022', medico: 'Dr. Diego Ramírez', detalles: 'Dolor de garganta, tos' },
    { id: 2, titulo: 'Control cardiológico', fecha: '15-03-2022', medico: 'Dr. Juan Pérez', detalles: 'Revisión de presión arterial' },
    { id: 3, titulo: 'Consulta dermatológica', fecha: '20-05-2022', medico: 'Dra. María Torres', detalles: 'Evaluación de lunares' }
  ];

  const recetas: Receta[] = [
    { id: 1, fecha: '01-01-2022', medico: 'Dr. Diego Ramírez', medicamento: 'Amoxicilina 500 mg', dosis: '1 cápsula', frecuencia: 'Cada 8 horas', duracion: '7 días', indicaciones: 'Beber abundante agua' },
    { id: 2, fecha: '15-03-2022', medico: 'Dr. Juan Pérez', medicamento: 'Losartán 50 mg', dosis: '1 tableta', frecuencia: 'Una vez al día', duracion: '30 días', indicaciones: 'Tomar en ayunas' },
    { id: 3, fecha: '20-05-2022', medico: 'Dra. María Torres', medicamento: 'Crema hidratante dermatológica', dosis: 'Aplicar cantidad suficiente', frecuencia: '2 veces al día', duracion: '15 días', indicaciones: 'Aplicar después del baño' }
  ];

  const resultados: Resultado[] = [
    { id: 1, fecha: '05-01-2022', tipo: 'Análisis de sangre', estado: 'Completado', archivo: 'analisis_sangre.pdf' },
    { id: 2, fecha: '18-03-2022', tipo: 'Electrocardiograma', estado: 'Completado', archivo: 'electrocardiograma.pdf' },
    { id: 3, fecha: '25-05-2022', tipo: 'Biopsia de piel', estado: 'Pendiente', archivo: '' },
    { id: 4, fecha: '10-06-2022', tipo: 'Radiografía de tórax', estado: 'Completado', archivo: 'radiografia_torax.pdf' }
  ];

  const handleVerDetalle = (id: number) => navigate(`/patient/medicalhistory/${id}`);

  const handleDescargarPDF = (tipo: 'diagnóstico' | 'receta' | 'resultado', id: number) => {
    if (tipo === 'diagnóstico') {
      const diag = diagnosticos.find(d => d.id === id);
      if (diag) generarPDF('diagnostico', diag);
    } else if (tipo === 'receta') {
      const rec = recetas.find(r => r.id === id);
      if (rec) generarPDF('receta', rec);
    } else if (tipo === 'resultado') {
      const res = resultados.find(r => r.id === id);
      if (res) generarPDF('resultado', res);
    }
  };

  const handleVolver = () => navigate('/patient');

  return (
    <div className="history-container">
      <div className="history-header">
        <h1 className="history-title">Historial Médico</h1>
        <p className="history-subtitle">Revisa tus diagnósticos, recetas y resultados registrados por tu médico</p>
      </div>

      <div className="history-tabs">
        <button onClick={() => setActiveTab('diagnostico')} className={`tab-btn ${activeTab === 'diagnostico' ? 'tab-active tab-diagnostico' : ''}`}>🩺 Diagnóstico</button>
        <button onClick={() => setActiveTab('recetas')} className={`tab-btn ${activeTab === 'recetas' ? 'tab-active tab-recetas' : ''}`}>💊 Recetas médicas</button>
        <button onClick={() => setActiveTab('resultados')} className={`tab-btn ${activeTab === 'resultados' ? 'tab-active tab-resultados' : ''}`}>📊 Resultados</button>
      </div>

      <div className="history-content">
        {activeTab === 'diagnostico' && (
          <div className="records-grid">
            {diagnosticos.map(d => (
              <div key={d.id} className="record-card card-diagnostico">
                <div className="record-header">
                  <h3 className="record-title">{d.titulo}</h3>
                  <span className="record-date">{d.fecha}</span>
                </div>
                <div className="record-body">
                  <div className="record-info"><span className="info-label">Médico:</span> <span className="info-value">{d.medico}</span></div>
                  <div className="record-info"><span className="info-label">Detalles:</span> <span className="info-value">{d.detalles}</span></div>
                </div>
                <div className="record-actions">
                  <button onClick={() => handleVerDetalle(d.id)} className="btn btn-view">👁️ Ver detalle</button>
                  <button onClick={() => handleDescargarPDF('diagnóstico', d.id)} className="btn btn-pdf">📄 PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recetas' && (
          <div className="records-grid">
            {recetas.map(r => (
              <div key={r.id} className="record-card card-receta">
                <div className="record-header">
                  <h3 className="record-title">{r.medicamento}</h3>
                  <span className="record-date">{r.fecha}</span>
                </div>
                <div className="record-body">
                  <div className="record-info"><span className="info-label">Médico:</span> <span className="info-value">{r.medico}</span></div>
                  <div className="record-info"><span className="info-label">Dosis:</span> <span className="info-value">{r.dosis}</span></div>
                  <div className="record-info"><span className="info-label">Frecuencia:</span> <span className="info-value">{r.frecuencia}</span></div>
                  <div className="record-info"><span className="info-label">Duración:</span> <span className="info-value">{r.duracion}</span></div>
                  <div className="record-info full-width"><span className="info-label">Indicaciones:</span> <span className="info-value">{r.indicaciones}</span></div>
                </div>
                <div className="record-actions">
                  <button onClick={() => handleDescargarPDF('receta', r.id)} className="btn btn-pdf">PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resultados' && (
          <div className="records-grid">
            {resultados.map(res => (
              <div key={res.id} className="record-card card-resultado">
                <div className="record-header">
                  <h3 className="record-title">{res.tipo}</h3>
                  <span className={`record-badge ${res.estado === 'Completado' ? 'badge-completado' : 'badge-pendiente'}`}>{res.estado}</span>
                </div>
                <div className="record-body">
                  <div className="record-info"><span className="info-label">Fecha:</span> <span className="info-value">{res.fecha}</span></div>
                  {res.archivo && <div className="record-info"><span className="info-label">Archivo:</span> <span className="info-value">{res.archivo}</span></div>}
                </div>
                <div className="record-actions">
                  {res.estado === 'Completado' ? (
                    <button onClick={() => handleDescargarPDF('resultado', res.id)} className="btn btn-download">Descargar</button>
                  ) : (
                    <button className="btn btn-disabled" disabled>Pendiente</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="history-footer">
        <button onClick={handleVolver} className="btn btn-back">← Atrás</button>
      </div>
    </div>
  );
};

export default HistoryList;