
import React from 'react';
import { CollectibleState } from '@/contexts/GameContext';
import { Coins, Gem } from 'lucide-react';

interface CollectibleProps {
  collectible: CollectibleState;
}

const Collectible: React.FC<CollectibleProps> = ({ collectible }) => {
  if (collectible.collected) return null;

  return (
    <div
      className={`absolute ${
        collectible.type === 'coin' 
          ? 'text-game-coin animate-spin' 
          : 'text-game-gem animate-float'
      }`}
      style={{
        left: `${collectible.position.x}px`,
        top: `${collectible.position.y}px`,
        width: '20px',
        height: '20px',
      }}
    >
      {collectible.type === 'coin' ? (
        <Coins className="w-full h-full" />
      ) : (
        <Gem className="w-full h-full" />
      )}
    </div>
  );
};

export default Collectible;
