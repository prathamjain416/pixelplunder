
import React from 'react';
import { PlatformState } from '@/contexts/GameContext';

interface PlatformProps {
  platform: PlatformState;
}

const Platform: React.FC<PlatformProps> = ({ platform }) => {
  return (
    <div
      className="absolute bg-game-platform border-t-2 border-white/30"
      style={{
        left: `${platform.position.x}px`,
        top: `${platform.position.y}px`,
        width: `${platform.size.width}px`,
        height: `${platform.size.height}px`,
      }}
    >
      {/* Platform texture - pixel grid */}
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full retro-grid"></div>
      </div>
    </div>
  );
};

export default Platform;
