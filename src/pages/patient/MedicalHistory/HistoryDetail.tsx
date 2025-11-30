import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/HistoryDetail.css';

interface DiagnosticoDetalle {
  id: number;
  titulo: string;
  fechaExamen: string;
  tipoExamen: string;
  medico: string;
  hallazgos: string[];
  pruebasRealizadas: string[];
  observaciones: string;
  recomendaciones: string;
  sintomas: string[];
  temperatura: string;
  presionArterial: string;
  frecuenciaCardiaca: string;
  conclusion: string;
}

// Función para generar PDF
const generarPDF = async (diag: DiagnosticoDetalle) => {
  try {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    let y = 20;
    
    doc.setFontSize(16);
    doc.text('INFORME MÉDICO', 105, y, { align: 'center' }); y += 15;

    doc.setFontSize(11);
    doc.text(`Diagnóstico: ${diag.titulo}`, 20, y); y += 7;
    doc.text(`Fecha: ${diag.fechaExamen}`, 20, y); y += 7;
    doc.text(`Médico: ${diag.medico}`, 20, y); y += 10;

    doc.setFontSize(12);
    doc.text('Signos Vitales', 20, y); y += 7;
    doc.setFontSize(10);
    doc.text(
      `Temp: ${diag.temperatura} | Presión: ${diag.presionArterial} | FC: ${diag.frecuenciaCardiaca}`,
      20,
      y
    ); y += 10;

    doc.setFontSize(12);
    doc.text('Síntomas', 20, y); y += 7;
    doc.setFontSize(10);
    diag.sintomas.forEach(s => { doc.text(`• ${s}`, 25, y); y += 6; });
    y += 5;

    doc.setFontSize(12);
    doc.text('Hallazgos', 20, y); y += 7;
    doc.setFontSize(10);
    diag.hallazgos.forEach(h => { doc.text(`• ${h}`, 25, y); y += 6; });
    y += 5;

    if (y > 240) { doc.addPage(); y = 20; }

    doc.setFontSize(12);
    doc.text('Conclusión', 20, y); y += 7;
    doc.setFontSize(10);
    const concLines = doc.splitTextToSize(diag.conclusion, 170);
    doc.text(concLines, 20, y); y += (concLines.length * 6) + 5;

    doc.setFontSize(12);
    doc.text('Recomendaciones', 20, y); y += 7;
    doc.setFontSize(10);
    const recLines = doc.splitTextToSize(diag.recomendaciones, 170);
    doc.text(recLines, 20, y);

    doc.save(`diagnostico_${diag.id}.pdf`);
  } catch (error: unknown) {
    console.error(error);
    alert('Error al generar PDF. Asegúrate de tener instalado jsPDF: npm install jspdf');
  }
};

const HistoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const diagnosticosEjemplo: { [key: string]: DiagnosticoDetalle } = {
    '1': {
      id: 1,
      titulo: 'Infección respiratoria',
      fechaExamen: '01-01-2022',
      tipoExamen: 'Evaluación clínica general',
      medico: 'Dr. Diego Ramírez',
      hallazgos: ['Congestión nasal', 'Inflamación de garganta', 'Tos productiva'],
      pruebasRealizadas: ['Examen físico respiratorio', 'Control de temperatura', 'Auscultación pulmonar'],
      observaciones: 'Paciente presenta síntomas típicos de infección respiratoria alta.',
      recomendaciones: 'Reposo, hidratación abundante, y seguimiento en 7 días.',
      sintomas: ['Dolor de garganta', 'Tos', 'Congestión nasal', 'Malestar general'],
      temperatura: '38.2°C',
      presionArterial: '120/80 mmHg',
      frecuenciaCardiaca: '78 lpm',
      conclusion: 'Se evidencia infección respiratoria de tipo infeccioso'
    },
    '2': {
      id: 2,
      titulo: 'Control cardiológico',
      fechaExamen: '15-03-2022',
      tipoExamen: 'Control preventivo cardiovascular',
      medico: 'Dr. Juan Pérez',
      hallazgos: ['Presión arterial ligeramente elevada', 'Frecuencia cardíaca normal'],
      pruebasRealizadas: ['Electrocardiograma', 'Medición de presión arterial'],
      observaciones: 'Control de rutina para seguimiento de hipertensión.',
      recomendaciones: 'Continuar con medicación, dieta baja en sodio, ejercicio moderado.',
      sintomas: ['Ninguno reportado'],
      temperatura: '36.5°C',
      presionArterial: '135/85 mmHg',
      frecuenciaCardiaca: '72 lpm',
      conclusion: 'Hipertensión controlada, continuar tratamiento actual'
    },
    '3': {
      id: 3,
      titulo: 'Consulta dermatológica',
      fechaExamen: '20-05-2022',
      tipoExamen: 'Evaluación dermatológica',
      medico: 'Dra. María Torres',
      hallazgos: ['Lesiones cutáneas benignas', 'Sin signos de malignidad'],
      pruebasRealizadas: ['Dermatoscopia digital', 'Examen visual completo'],
      observaciones: 'Paciente presenta múltiples lunares, todos de aspecto benigno.',
      recomendaciones: 'Uso de protector solar diario, hidratación de piel, control anual.',
      sintomas: ['Resequedad en la piel'],
      temperatura: '36.7°C',
      presionArterial: '118/75 mmHg',
      frecuenciaCardiaca: '70 lpm',
      conclusion: 'Todas las lesiones evaluadas son benignas'
    }
  };

  const diagnostico = id ? diagnosticosEjemplo[id] : null;

  if (!diagnostico) {
    return (
      <div className="detail-container">
        <div className="detail-error">
          <h2>Diagnóstico no encontrado</h2>
          <button onClick={() => navigate('/patient/medicalhistory')} className="btn btn-back">
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1 className="detail-title">{diagnostico.titulo}</h1>
        <p className="detail-subtitle">Detalles completos del diagnóstico</p>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Información General</h2>
          <div className="info-grid">
            <div className="info-box">
              <span className="info-label">Fecha</span>
              <span className="info-value">{diagnostico.fechaExamen}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Tipo</span>
              <span className="info-value">{diagnostico.tipoExamen}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Médico</span>
              <span className="info-value">{diagnostico.medico}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Signos Vitales</h2>
          <div className="vitals-grid">
            <div className="vital-card vital-temperature">
              <div className="vital-icon"></div>
              <div className="vital-info">
                <span className="vital-label">Temperatura</span>
                <span className="vital-value">{diagnostico.temperatura}</span>
              </div>
            </div>
            <div className="vital-card vital-pressure">
              <div className="vital-icon"></div>
              <div className="vital-info">
                <span className="vital-label">Presión</span>
                <span className="vital-value">{diagnostico.presionArterial}</span>
              </div>
            </div>
            <div className="vital-card vital-heart">
              <div className="vital-icon"></div>
              <div className="vital-info">
                <span className="vital-label">Frecuencia</span>
                <span className="vital-value">{diagnostico.frecuenciaCardiaca}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Hallazgos</h2>
          <div className="list-container">
            {diagnostico.hallazgos.map((h, i) => (
              <div key={i} className="list-item list-hallazgo">
                <span className="list-bullet">•</span><span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Pruebas</h2>
          <div className="list-container">
            {diagnostico.pruebasRealizadas.map((p, i) => (
              <div key={i} className="list-item list-prueba">
                <span className="list-bullet">✓</span><span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Síntomas</h2>
          <div className="symptoms-grid">
            {diagnostico.sintomas.map((s, i) => (
              <div key={i} className="symptom-tag">{s}</div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Observaciones</h2>
          <div className="text-box"><p>{diagnostico.observaciones}</p></div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Conclusión</h2>
          <div className="text-box conclusion-box"><p>{diagnostico.conclusion}</p></div>
        </div>

        <div className="detail-section">
          <h2 className="section-title"><span className="section-icon"></span>Recomendaciones</h2>
          <div className="text-box recommendations-box"><p>{diagnostico.recomendaciones}</p></div>
        </div>
      </div>

      <div className="detail-footer">
        <button onClick={() => navigate('/patient/medicalhistory')} className="btn btn-back">
        Atrás
        </button>
        <button onClick={() => generarPDF(diagnostico)} className="btn btn-pdf">
         Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default HistoryDetail;