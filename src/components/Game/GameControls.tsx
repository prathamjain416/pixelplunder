
import React from 'react';
import { useGameControls } from '@/hooks/useGameControls';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useOrientation } from '@/hooks/useOrientation';

const GameControls: React.FC = () => {
  const { isTouchDevice, controls } = useGameControls();
  const orientation = useOrientation();
  
  if (!isTouchDevice) return null;
  
  const isLandscape = orientation === 'landscape';
  
  // Position controls for better thumb reach in landscape mode
  // Increased touch area and better positioning for landscape orientation
  const leftControlsClass = isLandscape ? 'left-6 bottom-8' : 'left-0 bottom-6';
  const rightControlClass = isLandscape ? 'right-6 bottom-8' : 'right-0 bottom-6';
  
  // Adjust button size based on orientation
  const buttonSize = isLandscape ? 'p-4' : 'p-3 sm:p-4';
  const iconSize = isLandscape ? 'h-8 w-8' : 'h-6 w-6 sm:h-8 sm:w-8';
  
  return (
    <>
      {/* Left side controls (movement) */}
      <div className={`absolute flex gap-4 ${leftControlsClass}`}>
        <button
          className={`bg-game-secondary/70 rounded-full ${buttonSize} active:bg-game-primary/70 touch-none`}
          onTouchStart={() => controls.handleTouchStart('left')}
          onTouchEnd={() => controls.handleTouchEnd('left')}
        >
          <ArrowLeft className={`${iconSize} text-white`} />
        </button>
        <button
          className={`bg-game-secondary/70 rounded-full ${buttonSize} active:bg-game-primary/70 touch-none`}
          onTouchStart={() => controls.handleTouchStart('right')}
          onTouchEnd={() => controls.handleTouchEnd('right')}
        >
          <ArrowRight className={`${iconSize} text-white`} />
        </button>
      </div>
      
      {/* Right side control (jump) - positioned for easy thumb reach */}
      <div className={`absolute ${rightControlClass}`}>
        <button
          className={`bg-game-secondary/70 rounded-full ${buttonSize} active:bg-game-primary/70 touch-none`}
          onTouchStart={() => controls.handleTouchStart('jump')}
        >
          <ArrowUp className={`${iconSize} text-white`} />
        </button>
      </div>
    </>
  );
};

export default GameControls;
