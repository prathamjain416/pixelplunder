
import React from 'react';
import { PlayerState } from '@/contexts/GameContext';

interface PlayerProps {
  player: PlayerState;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div
      className="absolute bg-game-character rounded-sm"
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        width: `${player.size.width}px`,
        height: `${player.size.height}px`,
        transition: 'transform 0.1s',
        transform: `scaleX(${player.direction === 'left' ? -1 : 1})`,
      }}
    >
      {/* Player character design - simplified pixel art style */}
      <div className="w-full h-full relative">
        {/* Eyes */}
        <div className="absolute bg-white rounded-full" style={{ width: '10px', height: '10px', top: '8px', left: '8px' }}></div>
        <div className="absolute bg-white rounded-full" style={{ width: '10px', height: '10px', top: '8px', left: '22px' }}></div>
        
        {/* Pupils */}
        <div className="absolute bg-black rounded-full" style={{ width: '5px', height: '5px', top: '10px', left: player.direction === 'left' ? '8px' : '10px' }}></div>
        <div className="absolute bg-black rounded-full" style={{ width: '5px', height: '5px', top: '10px', left: player.direction === 'left' ? '22px' : '24px' }}></div>
        
        {/* Mouth */}
        <div className="absolute bg-black" style={{ width: '15px', height: '3px', top: '25px', left: '12px' }}></div>
      </div>
    </div>
  );
};

export default Player;
