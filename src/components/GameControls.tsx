
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RefreshCw } from 'lucide-react';
import { Direction } from '@/types/game';

interface GameControlsProps {
  gameOver: boolean;
  paused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onDirectionChange: (direction: Direction) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameOver,
  paused,
  onStart,
  onPause,
  onResume,
  onReset,
  onDirectionChange
}) => {
  return (
    <div className="w-full">
      {/* Game action buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {gameOver ? (
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8" 
            onClick={onReset}
          >
            Play Again
          </Button>
        ) : paused ? (
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            onClick={onResume}
          >
            <Play className="mr-2 h-4 w-4" />
            Resume
          </Button>
        ) : (
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white" 
            onClick={onPause}
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}

        {!gameOver && (
          <Button 
            className="bg-gray-500 hover:bg-gray-600 text-white" 
            onClick={onReset}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Direction controls for both mobile and desktop */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        <div className="col-start-2">
          <Button 
            size="lg"
            variant="outline"
            className="w-full aspect-square flex items-center justify-center border-2 hover:bg-purple-100"
            onClick={() => onDirectionChange('up')}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-1 row-start-2">
          <Button 
            size="lg"
            variant="outline"
            className="w-full aspect-square flex items-center justify-center border-2 hover:bg-purple-100"
            onClick={() => onDirectionChange('left')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-3 row-start-2">
          <Button 
            size="lg"
            variant="outline"
            className="w-full aspect-square flex items-center justify-center border-2 hover:bg-purple-100"
            onClick={() => onDirectionChange('right')}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="col-start-2 row-start-3">
          <Button 
            size="lg"
            variant="outline"
            className="w-full aspect-square flex items-center justify-center border-2 hover:bg-purple-100"
            onClick={() => onDirectionChange('down')}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
