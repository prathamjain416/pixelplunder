
import { useState, useEffect } from 'react';

type OrientationType = 'portrait' | 'landscape';

export function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationType>(() => {
    // Initial orientation detection
    return detectOrientation();
  });

  function detectOrientation(): OrientationType {
    // Use multiple methods for more reliable detection
    if (typeof window !== 'undefined') {
      // First try screen.orientation (most accurate when available)
      if (window.screen && window.screen.orientation && window.screen.orientation.type) {
        return window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape';
      }
      
      // Fallback to window dimensions ratio
      return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }
    
    // Default fallback
    return 'landscape';
  }

  useEffect(() => {
    const updateOrientation = () => {
      // Use setTimeout to ensure dimensions have updated after orientation change
      setTimeout(() => {
        setOrientation(detectOrientation());
      }, 50);
    };

    // Initial check
    updateOrientation();
    
    // Add event listeners to both events for cross-browser support
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    
    // Create a special check for iOS which sometimes has problems with orientation events
    const orientationInterval = setInterval(updateOrientation, 1000);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
      clearInterval(orientationInterval);
    };
  }, []);

  return orientation;
}
