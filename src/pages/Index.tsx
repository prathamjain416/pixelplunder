import React, { useEffect } from 'react';
import { GameProvider } from '@/contexts/GameContext';
import GameCanvas from '@/components/Game/GameCanvas';
import PixelButton from '@/components/ui/PixelButton';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-game-bg p-4">
        <div className="max-w-md w-full bg-game-secondary/20 p-6 rounded-lg border-2 border-game-secondary text-center">
          <h1 className="text-xl font-pixel text-game-primary mb-4">Desktop Only</h1>
          <p className="text-white font-pixel text-sm mb-6">
            This game is only available on desktop devices. Please visit us on your computer to play.
          </p>
          <div className="animate-bounce mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-game-primary mx-auto">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="text-center px-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-pixel text-game-primary mb-1 mt-7">
          PIXEL PLUNDER
        </h1>
        <p className="text-xs sm:text-sm font-pixel text-white opacity-80 mb-2">
          A Retro Platform Adventure
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center w-full h-[75dvh] bg-gray-800/30 rounded-lg overflow-hidden relative mx-auto">
        <GameProvider>
          <GameCanvas />
        </GameProvider>
      </div>
        
      <div className="mt-1 text-center px-2">
        <p className="text-white mb-2 font-pixel text-xs sm:text-sm">
          Use arrow keys to move, space to jump, and collect all items!
        </p>
        
        <div className="flex gap-2 sm:gap-4 justify-center flex-wrap mb-2">
          <Dialog>
            <DialogTrigger asChild>
              <PixelButton variant="tertiary" size="sm">
                HOW TO PLAY
              </PixelButton>
            </DialogTrigger>
            <DialogContent className="bg-game-bg border-4 border-game-secondary p-0 max-w-[200px] sm:max-w-[250px] w-full">
              <div className="relative">
                <div className="retro-grid absolute inset-0"></div>
                <div className="relative p-4">
                  <DialogTitle className="text-sm sm:text-base font-pixel text-game-primary mb-2 text-center">HOW TO PLAY</DialogTitle>
                  <div className="font-pixel text-white space-y-2 text-xs">
                    <div>
                      <h3 className="text-game-secondary text-xs mb-1">CONTROLS</h3>
                      <ul className="ml-2 space-y-1 text-xs">
                        <li>→ / D: Move right</li>
                        <li>← / A: Move left</li>
                        <li>↑ / W / SPACE: Jump</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-game-secondary text-xs mb-1">OBJECTIVE</h3>
                      <p className="text-xs">Collect all coins and gems in each level.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-game-secondary text-xs mb-1">SCORING</h3>
                      <ul className="ml-2 space-y-1 text-xs">
                        <li>Coins: 10 points</li>
                        <li>Gems: 50 points</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center mt-3">
                    <DialogClose asChild>
                      <PixelButton variant="tertiary" size="sm">
                        CLOSE
                      </PixelButton>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <a href="https://github.com/prathamjain416/pixelplunder" target="_blank" rel="noopener noreferrer">
            <PixelButton variant="secondary" size="sm">
              GITHUB
            </PixelButton>
          </a>
        </div>
      </div>
      
      <footer className="py-1 text-xs text-gray-400 font-pixel text-center mb-7">
        <p>Created by Pratham Jain • 2025</p>
      </footer>
    </div>
  );
};

export default Index;
