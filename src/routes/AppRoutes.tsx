// AppRoutes.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Unauthorized from '../pages/shared/Unauthorized'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'
import Register from '../pages/auth/Register'

// Importar componentes del Panel Médico
import DoctorDashboard from '../pages/doctor/Dashboard'
import PatientList from '../pages/doctor/Patients/PatientList'
import PatientDetail from '../pages/doctor/Patients/PatientDetail'
import AddPatient from '../pages/doctor/Patients/AddPatient'
import CalendarView from '../pages/doctor/Appointments/CalendarView'
import AppointmentList from '../pages/doctor/Appointments/AppointmentList'
import RecordList from '../pages/doctor/MedicalRecords/RecordList'
import ViewRecord from '../pages/doctor/MedicalRecords/ViewRecord'
import PrescriptionList from '../pages/doctor/Prescriptions/PrescriptionList'
import CreatePrescription from '../pages/doctor/Prescriptions/CreatePrescription'
import Statistics from '../pages/doctor/Reports/Statistics'
import PatientReports from '../pages/doctor/Reports/PatientReports'
import CreateRecord from '../pages/doctor/MedicalRecords/CreateRecord'
import ScheduleAppointment from '../pages/doctor/Appointments/ScheduleAppointment'


//Importar componenetes del panel Paciente
import EditProfile from '../pages/patient/Profile/EditProfile'
import MyAppointments from '../pages/patient/Appointments/MyAppointments'
import BookAppointment from '../pages/patient/Appointments/BookAppointment'
import HistoryList from '../pages/patient/MedicalHistory/HistoryList'
import HistoryDetail from '../pages/patient/MedicalHistory/HistoryDetail'

// Importar componentes del Panel Admin
import AdminDashboard from '../pages/admin/Dashboard'
import UserList from '../pages/admin/Users/UserList'
import UserDetail from '../pages/admin/Users/UserDetail'
import CreateUser from '../pages/admin/Users/CreateUser'
import GeneralStats from '../pages/admin/Statistics/GeneralStats'
import AppointmentStats from '../pages/admin/Statistics/AppointmentStats'
import TreatmentStats from '../pages/admin/Statistics/TreatmentStats'
import SystemSettings from '../pages/admin/Settings/SystemSettings'
import UserRoles from '../pages/admin/Settings/UserRoles'
import AdminReports from '../pages/admin/Reports/Reports'

// Placeholders para Panel Paciente
const PatientDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ color: '#2a4ea2' }}>Panel del Paciente</h1>
    <p>Bienvenido al panel del paciente - En construcción</p>
  </div>
)



const PatientPrescriptions = () => <div style={{ padding: '20px' }}>Mis Recetas - En construcción</div>


// Placeholders para componentes restantes (si es que se quiere poner componentes en un futuro)


function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/register" element={<Register />} />
      
      {/* ==================== */}
      {/* RUTAS PANEL PACIENTE */}
      {/* ==================== */}
     <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/patient/appointments/new" element={ 
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <BookAppointment />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/patient/appointments" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <MyAppointments />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/medicalhistory" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <HistoryList />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/patient/medicalhistory/:id" element={
  <ProtectedRoute allowedRoles={['patient']}>
    <MainLayout>
      <HistoryDetail />
    </MainLayout>
  </ProtectedRoute>
} />
      
      <Route path="/patient/prescriptions" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <PatientPrescriptions />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/patient/profile" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout>
            <EditProfile />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* ================== */}
      {/* RUTAS PANEL MÉDICO */}
      {/* ================== */}
      
      {/* Dashboard Médico */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <DoctorDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Gestión de Pacientes */}
      <Route path="/doctor/patients" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <PatientList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/patients/:id" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <PatientDetail />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/patients/new" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <AddPatient />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/patients/edit/:id" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <AddPatient />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Agenda y Citas */}
      <Route path="/doctor/schedule" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <CalendarView />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/appointments" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <AppointmentList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/appointments/new" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <ScheduleAppointment />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Historiales Médicos */}
      <Route path="/doctor/medical-records" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <RecordList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/medical-records/new" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <CreateRecord />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/medical-records/:id" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <ViewRecord />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Prescripciones Médicas */}
      <Route path="/doctor/prescriptions" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <PrescriptionList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/prescriptions/new" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <CreatePrescription />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Reportes y Estadísticas */}
      <Route path="/doctor/reports" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <Statistics />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/reports/statistics" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <Statistics />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/reports/patients" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout>
            <PatientReports />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* =================== */}
      {/* RUTAS PANEL ADMIN */}
      {/* =================== */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Gestión de Usuarios */}
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <UserList />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users/create" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <CreateUser />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <UserDetail />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Estadísticas */}
      <Route path="/admin/statistics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <GeneralStats />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/statistics/appointments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AppointmentStats />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/statistics/treatments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <TreatmentStats />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Configuración */}
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <UserRoles />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings/roles" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <UserRoles />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings/system" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <SystemSettings />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Reportes Admin */}
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout>
            <AdminReports />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* ==================== */}
      {/* RUTAS POR DEFECTO */}
      {/* ==================== */}
      
      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes