
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';
import { BirthdayCelebration } from './BirthdayCelebration';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { useSwipeControls } from '@/hooks/useSwipeControls';

export const SnakeGame: React.FC = () => {
  const {
    snake,
    food,
    gameOver,
    paused,
    score,
    level,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    handleDirectionChange,
    boardSize,
    isBirthdayLevel
  } = useSnakeGame();

  const boardRef = useRef<HTMLDivElement>(null);
  
  // Set up swipe controls for mobile
  useSwipeControls(boardRef, handleDirectionChange);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="w-full max-w-md">
        <GameStatus 
          score={score} 
          level={level} 
          gameOver={gameOver} 
          paused={paused} 
        />
        
        <div 
          ref={boardRef} 
          className="touch-none relative mt-4 mb-6"
        >
          <GameBoard 
            snake={snake} 
            food={food} 
            boardSize={boardSize} 
            gameOver={gameOver}
          />
          
          {isBirthdayLevel && <BirthdayCelebration />}
        </div>
        
        <GameControls 
          gameOver={gameOver}
          paused={paused}
          onStart={startGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onReset={resetGame}
          onDirectionChange={handleDirectionChange}
        />
      </div>
    </div>
  );
};

export default SnakeGame;
