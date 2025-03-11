
import React from 'react';

interface GameStatusProps {
  score: number;
  level: number;
  gameOver: boolean;
  paused: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ 
  score, 
  level, 
  gameOver, 
  paused 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <p className="text-sm text-gray-500">Score</p>
          <p className="text-2xl font-bold text-purple-700">{score}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Level</p>
          <p className="text-2xl font-bold text-purple-700">{level}</p>
        </div>
      </div>
      
      {gameOver && (
        <div className="mt-2 py-1 px-3 bg-red-100 text-red-800 rounded-full text-sm text-center">
          Game Over
        </div>
      )}
      
      {paused && !gameOver && (
        <div className="mt-2 py-1 px-3 bg-amber-100 text-amber-800 rounded-full text-sm text-center">
          Paused
        </div>
      )}
    </div>
  );
};
