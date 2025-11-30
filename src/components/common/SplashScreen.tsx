import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`splash-container ${!isVisible ? 'fade-out' : ''}`}>
      <div className="splash-content">
        {/* LOGO AQUÍ */}
        <div className="splash-logo">
          <img 
            src="/assets/images/logos/logo-splash.png" 
            alt="SaludConectada" 
            className="logo-image"
          />
          <h1>SaludConectada</h1>
          <p>Conectando tu salud con el futuro</p>
        </div>
        <div className="splash-loader">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;