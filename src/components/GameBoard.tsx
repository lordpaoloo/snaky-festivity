import React from 'react';
import { Position } from '@/types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  boardSize: number;
  gameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  snake, 
  food, 
  boardSize,
  gameOver 
}) => {
  // Calculate cell size based on viewport width for responsiveness
  // We're keeping the board square, so we take the minimum dimension
  const cellSize = 100 / boardSize; // percentage-based size

  return (
    <div 
      className={`relative aspect-square w-full max-w-md mx-auto border-2 border-gray-200 rounded-md overflow-hidden bg-snake-background ${gameOver ? 'opacity-70' : ''}`}
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {/* Render snake cells */}
      {snake.map((segment, index) => (
        <div
          key={`snake-${index}`}
          className={`absolute rounded-sm ${index === 0 ? 'bg-purple-700' : 'bg-snake-body'}`}
          style={{
            width: `${cellSize}%`,
            height: `${cellSize}%`,
            left: `${segment.x * cellSize}%`,
            top: `${segment.y * cellSize}%`,
            transition: 'left 0.1s linear, top 0.1s linear',
          }}
        />
      ))}

      {/* Render food cell */}
      <div
        className="absolute bg-snake-food rounded-full animate-pulse"
        style={{
          width: `${cellSize * 0.8}%`,
          height: `${cellSize * 0.8}%`,
          left: `${food.x * cellSize + cellSize * 0.1}%`,
          top: `${food.y * cellSize + cellSize * 0.1}%`,
        }}
      />
    </div>
  );
};
