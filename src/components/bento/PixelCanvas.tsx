import { useEffect, useRef, useState } from 'react';
import { IconPalette, IconEraser } from '@tabler/icons-react';

const COLS = 14;
const ROWS = 14;

const PALETTE = [
  { name: 'Ink', value: 'var(--ink)' },
  { name: 'Mint', value: 'var(--mint)' },
  { name: 'Butter', value: 'var(--butter)' },
  { name: 'Coral', value: 'var(--coral)' },
  { name: 'Mark', value: 'var(--mark)' },
];

export default function PixelCanvas() {
  const [grid, setGrid] = useState<(string | null)[]>(() => Array(COLS * ROWS).fill(null));
  const [color, setColor] = useState<string>(PALETTE[0].value);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const stop = () => { isDrawingRef.current = false; };
    window.addEventListener('mouseup', stop);
    return () => window.removeEventListener('mouseup', stop);
  }, []);

  const paint = (i: number) => {
    setGrid((prev) => {
      if (prev[i] === color) return prev;
      const next = [...prev];
      next[i] = color;
      return next;
    });
  };

  const clear = () => setGrid(Array(COLS * ROWS).fill(null));

  return (
    <div className="border-hairline bg-paper rounded-xl border p-4 flex flex-col aspect-square">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-ink flex items-center gap-2 text-sm font-semibold">
          <IconPalette size={16} className="text-mark" />
          Pixel Canvas
        </h3>
        <button
          onClick={clear}
          className="text-ink-muted hover:text-ink transition-colors"
          aria-label="Clear canvas"
        >
          <IconEraser size={16} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div
          className="border-hairline overflow-hidden rounded border select-none"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            height: '100%',
            aspectRatio: '1',
            maxWidth: '100%',
          }}
          onMouseLeave={() => { isDrawingRef.current = false; }}
        >
          {grid.map((cell, i) => (
            <div
              key={i}
              onMouseDown={() => { isDrawingRef.current = true; paint(i); }}
              onMouseEnter={() => { if (isDrawingRef.current) paint(i); }}
              className="aspect-square hover:opacity-80"
              style={{ backgroundColor: cell ?? 'transparent' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {PALETTE.map((swatch) => (
          <button
            key={swatch.name}
            onClick={() => setColor(swatch.value)}
            aria-label={swatch.name}
            className={`h-5 w-5 rounded-full transition-transform ${
              color === swatch.value ? 'scale-110 ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''
            }`}
            style={{ backgroundColor: swatch.value }}
          />
        ))}
      </div>
    </div>
  );
}
