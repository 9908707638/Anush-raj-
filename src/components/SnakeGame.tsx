import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED_MS } from '../constants';

type Point = { x: number; y: number };

const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const onSnake = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    if (!onSnake) break;
  }
  return newFood;
};

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const directionRef = useRef(INITIAL_DIRECTION);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setHasStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !hasStarted) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const currentDir = directionRef.current;
      const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPaused, hasStarted, food]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const currentDir = directionRef.current;

      if (e.key === ' ' && hasStarted && !gameOver) {
        setIsPaused(p => !p);
        return;
      }

      if (!hasStarted) {
        setHasStarted(true);
      }

      if (gameOver && e.key === 'Enter') {
        resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (currentDir.y !== 1) { directionRef.current = { x: 0, y: -1 }; }
          break;
        case 'ArrowDown':
        case 's':
          if (currentDir.y !== -1) { directionRef.current = { x: 0, y: 1 }; }
          break;
        case 'ArrowLeft':
        case 'a':
          if (currentDir.x !== 1) { directionRef.current = { x: -1, y: 0 }; }
          break;
        case 'ArrowRight':
        case 'd':
          if (currentDir.x !== -1) { directionRef.current = { x: 1, y: 0 }; }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, hasStarted]);

  useEffect(() => {
    const interval = setInterval(moveSnake, GAME_SPEED_MS);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center jarring-border bg-black p-6 relative uppercase screen-tear border-l-8 border-r-8 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="w-full flex justify-between items-end mb-6 border-b-4 border-glitch-cyan pb-4 z-10 bg-dark-panel p-2">
        <h2 className="text-glitch-cyan font-pixel text-sm md:text-xl tracking-widest px-2 py-1">
          DATA_FRAGS: <span className="text-white bg-glitch-cyan/20 px-2 ml-2 border border-glitch-cyan">{score.toString().padStart(4, '0')}</span>
        </h2>
        <div className="text-glitch-magenta font-mono text-xl md:text-2xl font-bold animate-pulse px-2 bg-glitch-magenta/10 border border-glitch-magenta">
          {gameOver ? 'ERR_0xDEAD' : isPaused ? 'HALT_EXEC' : 'RUNNING_'}
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-dark-bg grid overflow-hidden z-10 w-full aspect-square border-4 border-glitch-magenta shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, #ff00ff15 18px, #ff00ff15 20px), repeating-linear-gradient(90deg, transparent, transparent 18px, #00ffff15 18px, #00ffff15 20px)'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          
          const isSnakeBody = snake.some(segment => segment.x === x && segment.y === y);
          const isSnakeHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          let cellClass = "w-full h-full relative ";
          let innerHTML = null;

          if (isSnakeHead) {
            cellClass += "bg-white z-20 overflow-hidden shadow-[0_0_10px_#00ffff]";
            innerHTML = <div className="absolute inset-1 bg-glitch-cyan mix-blend-exclusion"></div>;
          } else if (isSnakeBody) {
            cellClass += "bg-glitch-cyan/90 z-10 border-2 border-black";
          } else if (isFood) {
            cellClass += "bg-glitch-magenta z-10 animate-pulse border-2 border-white shadow-[0_0_15px_#ff00ff]";
          }

          return (
            <div key={i} className={cellClass}>
              {innerHTML}
            </div>
          );
        })}

        {/* Overlays */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 font-pixel text-center p-6 border-8 border-glitch-cyan/20">
            <h3 className="text-xl md:text-3xl text-glitch-cyan mb-8 glitch-text leading-relaxed" data-text="&gt; AWAITING COM_PORT">
              &gt; AWAITING COM_PORT
            </h3>
            <p className="text-white text-xs md:text-base mb-6 bg-glitch-cyan/20 p-4 border border-glitch-cyan">INPUT: [W,A,S,D] OR ARROWS</p>
            <p className="text-glitch-magenta text-sm animate-ping">_PRESS KEY TO INITIATE_</p>
          </div>
        )}

        {isPaused && !gameOver && hasStarted && (
          <div className="absolute inset-0 bg-glitch-cyan/20 backdrop-blur-[2px] flex items-center justify-center z-30 font-pixel">
            <h3 className="text-2xl md:text-4xl text-black bg-glitch-cyan p-6 border-8 border-black shadow-[10px_10px_0_#ff00ff]">THREAD_PAUSED</h3>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-30 font-pixel p-6 text-center border-8 border-glitch-magenta/30">
            <h3 className="text-3xl md:text-5xl text-white bg-glitch-magenta px-6 py-4 border-4 border-glitch-cyan mb-8 shadow-[6px_6px_0_#00ffff]">
              FATAL_EXCEPTION
            </h3>
            <p className="text-glitch-cyan text-base md:text-xl mb-10 bg-dark-panel p-4 border border-glitch-cyan">STACK DUMP: {score} BLOCKS EXPORTED.</p>
            <button 
              onClick={resetGame}
              className="px-8 py-5 bg-black border-4 border-glitch-cyan text-white text-sm md:text-base hover:bg-glitch-cyan hover:text-black transition-colors"
            >
              REBOOT_SYS (ENTER)
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
