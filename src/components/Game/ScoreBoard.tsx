
import React from 'react';
import { Coins, Gem } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="absolute top-4 right-4 bg-game-bg/80 border-2 border-game-primary p-2 rounded-md font-pixel text-white flex items-center gap-2">
      <Coins className="h-4 w-4 text-game-coin" />
      <Gem className="h-4 w-4 text-game-gem" />
      <span className="text-game-score">{score}</span>
    </div>
  );
};

export default ScoreBoard;
