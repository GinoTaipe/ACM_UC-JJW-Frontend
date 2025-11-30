import { useState, useEffect } from 'react';

export const useSplash = (): boolean => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    // Verificar si ya se mostró el splash en esta sesión
    const splashShown = sessionStorage.getItem('splashShown');
    
    if (splashShown) {
      // Si ya se mostró en esta sesión, no mostrar again
      setShowSplash(false);
      return;
    }

    console.log('🎭 Mostrando splash por primera vez en esta sesión');
    
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Marcar que ya se mostró el splash en esta sesión
      sessionStorage.setItem('splashShown', 'true');
    }, 2000); // Reducido a 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return showSplash;
};