import React, { useRef, useEffect, useState } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import Player from './Player';
import Platform from './Platform';
import Collectible from './Collectible';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import PixelButton from '@/components/ui/PixelButton';
import { LEVELS } from '@/config/levels';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOrientation } from '@/hooks/useOrientation';

const GameCanvas: React.FC = () => {
  const { gameState, startGame, resetGame } = useGameContext();
  const { isGameStarted, isGameOver, platforms, collectibles, player, score, currentLevel } = gameState;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  const isWrongOrientation = isMobile && orientation === 'portrait';

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // Target dimensions for our game
        const targetWidth = 800;
        const targetHeight = 480;
        
        // Calculate scale based on container dimensions and orientation
        let widthScale = containerWidth / targetWidth;
        let heightScale = containerHeight / targetHeight;
        
        // Adjust padding factor based on device and orientation
        let paddingFactor = 1;
        if (isMobile) {
          if (orientation === 'landscape') {
            paddingFactor = 0.95; // Less padding in landscape for better visibility
          } else {
            paddingFactor = 0.85; // More padding in portrait to ensure controls fit
            // Force aspect ratio in portrait mode
            heightScale = widthScale * 0.8; // Maintain 4:3 aspect ratio approximately
          }
        } else {
          paddingFactor = 0.9; // Desktop padding
        }
        
        // Use the smaller scale to maintain aspect ratio
        let newScale = Math.min(widthScale, heightScale) * paddingFactor;
        
        // Ensure minimum visibility while preventing excessive scaling
        newScale = Math.max(Math.min(newScale, 1.5), 0.3);
        
        setScale(newScale);
      }
    };

    // Handle orientation changes with multiple attempts
    const handleOrientationChange = () => {
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 300);
      setTimeout(handleResize, 500);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [isMobile, orientation]);

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center w-full h-full relative overflow-hidden"
      style={{
        padding: isMobile ? (orientation === 'landscape' ? '4px' : '8px') : '12px',
        height: '100%',
      }}
    >
      {isWrongOrientation && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6">
          <div className="animate-pulse mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-game-primary rotate-90">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>
          <h3 className="font-pixel text-game-primary text-xl text-center mb-2">ROTATE YOUR DEVICE</h3>
          <p className="font-pixel text-white text-sm text-center">
            Please turn your phone sideways for the best gaming experience
          </p>
        </div>
      )}
      
      <div 
        className={`relative bg-game-bg border-4 border-game-secondary overflow-hidden ${isWrongOrientation ? 'opacity-20' : ''}`}
        style={{
          width: '800px',
          height: '480px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          maxWidth: '100%',
          maxHeight: '100%',
          visibility: scale > 0 ? 'visible' : 'hidden',
        }}
      >
        <div className="absolute inset-0 retro-grid"></div>
        <div className="absolute top-4 left-4 font-pixel text-white text-sm">
          Level {currentLevel + 1}
        </div>

        {platforms.map((platform) => (
          <Platform key={platform.id} platform={platform} />
        ))}
        
        {collectibles.map((collectible) => (
          <Collectible key={collectible.id} collectible={collectible} />
        ))}
        
        {isGameStarted && !isGameOver && <Player player={player} />}
        
        <ScoreBoard score={score} />
        
        {isGameStarted && !isGameOver && <GameControls />}
        
        {!isGameStarted && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-game-bg/80 px-4">
            <h1 className="text-xl sm:text-2xl font-pixel text-game-primary mb-4 sm:mb-8 text-center">PIXEL PLUNDER</h1>
            <p className="text-xs sm:text-sm font-pixel text-white mb-2 sm:mb-4 text-center">Collect coins and gems!</p>
            <p className="text-xs font-pixel text-white mb-4 text-center">Complete all 10 levels</p>
            <PixelButton onClick={startGame}>START GAME</PixelButton>
          </div>
        )}
        
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-game-bg/80 px-4">
            <h1 className="text-xl sm:text-2xl font-pixel text-red-500 mb-4 sm:mb-6 text-center">GAME OVER</h1>
            <p className="text-base sm:text-lg font-pixel text-white mb-2 text-center">Final Score: {score}</p>
            <p className="text-xs sm:text-sm font-pixel text-white mb-4 text-center">
              {currentLevel === LEVELS.length - 1 ? 'Congratulations! All levels complete!' : `Reached Level ${currentLevel + 1}`}
            </p>
            <PixelButton onClick={resetGame} variant="tertiary">TRY AGAIN</PixelButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvas;