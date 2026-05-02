import { useCallback, useEffect, useRef, useState } from 'react';
import { IconDeviceGamepad2 } from '@tabler/icons-react';

type Dir = 'U' | 'D' | 'L' | 'R';
type Cell = { x: number; y: number };

const COLS = 12;
const ROWS = 8;
const TICK = 150;

function rand(exclude: Cell[]): Cell {
  let cell: Cell;
  do { cell = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
  while (exclude.some((c) => c.x === cell.x && c.y === cell.y));
  return cell;
}

const init = () => {
  const snake = [{ x: 6, y: 4 }, { x: 5, y: 4 }];
  return { snake, food: rand(snake), dir: 'R' as Dir, alive: true, score: 0 };
};

export default function TimeWaster() {
  const [state, setState] = useState(init);
  const dirRef = useRef<Dir>('R');
  const aliveRef = useRef(true);
  const stateRef = useRef(state);
  stateRef.current = state;

  const tick = useCallback(() => {
    if (!aliveRef.current) return;
    setState((prev) => {
      const d = dirRef.current;
      const head = prev.snake[0];
      const next = {
        x: (head.x + (d === 'R' ? 1 : d === 'L' ? -1 : 0) + COLS) % COLS,
        y: (head.y + (d === 'D' ? 1 : d === 'U' ? -1 : 0) + ROWS) % ROWS,
      };
      const ate = next.x === prev.food.x && next.y === prev.food.y;
      const newSnake = [next, ...prev.snake.slice(0, ate ? undefined : -1)];
      const dead = newSnake.slice(1).some((c) => c.x === next.x && c.y === next.y);
      if (dead) { aliveRef.current = false; return { ...prev, alive: false }; }
      return {
        snake: newSnake,
        food: ate ? rand(newSnake) : prev.food,
        dir: prev.dir,
        alive: true,
        score: ate ? prev.score + 1 : prev.score,
      };
    });
  }, []);

  useEffect(() => {
    const id = setInterval(tick, TICK);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R',
        w: 'U', s: 'D', a: 'L', d: 'R',
      };
      const next = map[e.key];
      if (!next) return;
      const opposites: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
      if (next !== opposites[dirRef.current]) dirRef.current = next;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const restart = () => {
    aliveRef.current = true;
    dirRef.current = 'R';
    setState(init());
  };

  const cells = Array.from({ length: ROWS }, (_, y) =>
    Array.from({ length: COLS }, (_, x) => {
      const isHead = state.snake[0]?.x === x && state.snake[0]?.y === y;
      const isBody = !isHead && state.snake.slice(1).some((c) => c.x === x && c.y === y);
      const isFood = state.food.x === x && state.food.y === y;
      return { x, y, isHead, isBody, isFood };
    })
  );

  return (
    <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg sm:col-span-2 lg:col-span-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-text flex items-center gap-2 text-sm font-semibold">
          <IconDeviceGamepad2 size={16} className="text-accent" />
          Time Waster
        </h3>
        <span className="text-accent font-mono text-xs">
          {state.score} pt{state.score !== 1 ? 's' : ''}
        </span>
      </div>

      <div
        className="border-surface0 relative overflow-hidden rounded border"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        onKeyDown={(e) => e.preventDefault()}
      >
        {cells.flat().map(({ x, y, isHead, isBody, isFood }) => (
          <div
            key={`${x}-${y}`}
            className={`aspect-square ${
              isHead ? 'bg-accent' :
              isBody ? 'bg-accent/50' :
              isFood ? 'bg-red' :
              'bg-canvas'
            }`}
            style={{ width: '100%' }}
          />
        ))}
        {!state.alive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-canvas/80 backdrop-blur-sm">
            <p className="text-text text-sm font-semibold">Game Over — {state.score} pts</p>
            <button
              onClick={restart}
              className="bg-accent text-canvas rounded px-3 py-1 text-xs font-medium"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="text-subtext0 mt-2 text-center text-xs">Arrow keys / WASD to move</p>
    </div>
  );
}
