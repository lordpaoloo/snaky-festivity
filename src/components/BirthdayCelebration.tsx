
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const BirthdayCelebration: React.FC = () => {
  const [audio] = useState(() => new Audio('/birthday.mp3'));
  const [confettiCount] = useState(100);
  
  useEffect(() => {
    // Play celebration sound
    audio.volume = 0.5;
    audio.play().catch(err => console.error("Audio playback failed:", err));
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);
  
  // Generate random confetti pieces
  const renderConfetti = () => {
    return Array.from({ length: confettiCount }).map((_, index) => {
      const left = `${Math.random() * 100}%`;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const size = `${Math.random() * 1 + 0.5}rem`;
      const delay = `${Math.random() * 3}s`;
      
      return (
        <div
          key={index}
          className="absolute animate-confetti-fall"
          style={{
            left,
            top: '-5%',
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '2px',
            animationDelay: delay,
          }}
        />
      );
    });
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
      <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-lg text-center max-w-xs animate-scale-in">
        <div className="mb-4 flex justify-center">
          <Sparkles className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-purple-700 mb-2 animate-birthday-bounce">
          Happy Birthday hamza!
        </h2>
        <p className="text-gray-700">
          You made it to year 16! What an amazing achievement!
        </p>
      </div>
      
      {/* Confetti background */}
      {renderConfetti()}
    </div>
  );
};
