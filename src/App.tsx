import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import SplashScreen from './components/common/SplashScreen'
import { useSplash } from './hooks/useSplash'
import { AuthProvider } from './contexts/AuthContext'

function AppContent() {
  const showSplash = useSplash()

  return (
    <>
      {showSplash && <SplashScreen />}
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App