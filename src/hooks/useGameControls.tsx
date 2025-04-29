
import { useEffect, useState } from 'react';
import { useGameContext } from '@/contexts/GameContext';

export function useGameControls() {
  const { moveLeft, moveRight, stopMovement, jump } = useGameContext();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if we're on a touch device
    const isTouchCapable = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0;
    
    setIsTouchDevice(isTouchCapable);
  }, []);

  // Handle touch controls
  const handleTouchStart = (controlType: 'left' | 'right' | 'jump') => {
    if (controlType === 'left') {
      moveLeft();
    } else if (controlType === 'right') {
      moveRight();
    } else if (controlType === 'jump') {
      jump();
    }
  };

  const handleTouchEnd = (controlType: 'left' | 'right') => {
    if (controlType === 'left' || controlType === 'right') {
      stopMovement();
    }
  };

  return {
    isTouchDevice,
    controls: {
      handleTouchStart,
      handleTouchEnd
    }
  };
}
