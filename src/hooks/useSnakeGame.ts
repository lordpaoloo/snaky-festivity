import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction } from '@/types/game';

// Constants
const INITIAL_SNAKE: Position[] = [{ x: 5, y: 5 }];
const INITIAL_FOOD: Position = { x: 10, y: 10 };
const BOARD_SIZE = 20;
const INITIAL_DELAY = 200; // milliseconds between moves
const MIN_DELAY = 80; // fastest speed
const DELAY_DECREMENT = 5; // how much to speed up per level
const POINTS_PER_FOOD = 10;
const FOODS_PER_LEVEL = 5;
const BIRTHDAY_LEVEL = 22;

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('right');
  const [nextDirection, setNextDirection] = useState<Direction>('right');
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [delay, setDelay] = useState<number>(INITIAL_DELAY);
  const [foodEaten, setFoodEaten] = useState<number>(0);
  const [isBirthdayLevel, setIsBirthdayLevel] = useState<boolean>(false);
  
  const gameInterval = useRef<number | null>(null);
  const lastDirection = useRef<Direction>('right');
  
  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood: Position = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    
    // Make sure food doesn't spawn on the snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    
    return newFood;
  }, [snake]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || paused) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (lastDirection.current !== 'down') {
            setNextDirection('up');
          }
          break;
        case 'ArrowDown':
          if (lastDirection.current !== 'up') {
            setNextDirection('down');
          }
          break;
        case 'ArrowLeft':
          if (lastDirection.current !== 'right') {
            setNextDirection('left');
          }
          break;
        case 'ArrowRight':
          if (lastDirection.current !== 'left') {
            setNextDirection('right');
          }
          break;
        case ' ':
          if (paused) {
            resumeGame();
          } else {
            pauseGame();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, paused]);
  
  // Game loop
  const moveSnake = useCallback(() => {
    if (gameOver || paused) return;
    
    setSnake(prevSnake => {
      // Update direction from nextDirection
      setDirection(nextDirection);
      lastDirection.current = nextDirection;
      
      const head = { ...prevSnake[0] };
      
      // Move head in the current direction
      switch (nextDirection) {
        case 'up':
          head.y = (head.y - 1 + BOARD_SIZE) % BOARD_SIZE;
          break;
        case 'down':
          head.y = (head.y + 1) % BOARD_SIZE;
          break;
        case 'left':
          head.x = (head.x - 1 + BOARD_SIZE) % BOARD_SIZE;
          break;
        case 'right':
          head.x = (head.x + 1) % BOARD_SIZE;
          break;
        default:
          break;
      }
      
      // Check for collisions with self
      if (prevSnake.some((segment, index) => 
        index !== 0 && segment.x === head.x && segment.y === head.y
      )) {
        setGameOver(true);
        return prevSnake;
      }
      
      // Create new snake array
      const newSnake = [head, ...prevSnake];
      
      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        // Increment score and food count
        setScore(prevScore => prevScore + POINTS_PER_FOOD);
        
        // Increment food eaten count and increase level immediately
        setFoodEaten(prev => {
          const newFoodEaten = prev + 1;
          
          // Level up with every food eaten
          const newLevel = newFoodEaten + 1;
          setLevel(newLevel);
          
          // Check if reached birthday level
          if (newLevel === BIRTHDAY_LEVEL) {
            setIsBirthdayLevel(true);
            setGameOver(true);
          } else {
            // Speed up game with each level
            const newDelay = Math.max(MIN_DELAY, INITIAL_DELAY - (newLevel - 1) * DELAY_DECREMENT);
            setDelay(newDelay);
          }
          
          return newFoodEaten;
        });
        
        // Generate new food
        setFood(generateFood());
      } else {
        // Remove tail if no food was eaten
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [food, gameOver, nextDirection, paused, generateFood]);
  
  // Set up game interval
  useEffect(() => {
    if (!gameOver && !paused) {
      gameInterval.current = window.setInterval(moveSnake, delay);
    }
    
    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    };
  }, [gameOver, paused, moveSnake, delay]);
  
  // Game controls
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection('right');
    setNextDirection('right');
    lastDirection.current = 'right';
    setGameOver(false);
    setPaused(false);
    setScore(0);
    setLevel(1);
    setDelay(INITIAL_DELAY);
    setFoodEaten(0);
    setIsBirthdayLevel(false);
  }, [generateFood]);
  
  const pauseGame = useCallback(() => {
    setPaused(true);
  }, []);
  
  const resumeGame = useCallback(() => {
    setPaused(false);
  }, []);
  
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);
  
  const handleDirectionChange = useCallback((newDirection: Direction) => {
    if (gameOver || paused) return;
    
    // Prevent 180-degree turns
    switch (newDirection) {
      case 'up':
        if (lastDirection.current !== 'down') {
          setNextDirection('up');
        }
        break;
      case 'down':
        if (lastDirection.current !== 'up') {
          setNextDirection('down');
        }
        break;
      case 'left':
        if (lastDirection.current !== 'right') {
          setNextDirection('left');
        }
        break;
      case 'right':
        if (lastDirection.current !== 'left') {
          setNextDirection('right');
        }
        break;
      default:
        break;
    }
  }, [gameOver, paused]);
  
  return {
    snake,
    food,
    direction,
    gameOver,
    paused,
    score,
    level,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    handleDirectionChange,
    boardSize: BOARD_SIZE,
    isBirthdayLevel
  };
};
