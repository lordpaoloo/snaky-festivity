
import { RefObject, useEffect } from 'react';
import { Direction } from '@/types/game';

export const useSwipeControls = (
  elementRef: RefObject<HTMLElement>,
  onDirectionChange: (direction: Direction) => void
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling when swiping on the game board
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only register swipe if it's significant enough
      const minSwipeDistance = 30;
      
      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return; // Not a strong enough swipe
      }
      
      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          onDirectionChange('right');
        } else {
          onDirectionChange('left');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onDirectionChange('down');
        } else {
          onDirectionChange('up');
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, onDirectionChange]);
};
