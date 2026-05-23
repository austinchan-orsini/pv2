import { useState } from 'react';
import { IconSparkles, IconDice } from '@tabler/icons-react';

const facts = [
  "I've visited over 12 countries before turning 25.",
  "I learned to code by modding Minecraft plugins in Java.",
  "I can solve a Rubik's cube in under 2 minutes.",
  "My first computer was a Gateway running Windows XP.",
  "I once stayed awake for 36 hours debugging a race condition.",
  "I make my own cold brew coffee every week.",
  "I played competitive chess in high school.",
  "I type at ~110 WPM on a good day.",
];

export default function FunFactsBox() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * facts.length));
  const [spinning, setSpinning] = useState(false);

  function randomize() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 400);
    setIndex((prev) => {
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * facts.length);
      return next;
    });
  }

  return (
    <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg flex flex-col h-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-text flex items-center gap-2 text-sm font-semibold">
          <IconSparkles size={16} className="text-accent" />
          Fun Fact
        </h3>
        <button
          onClick={randomize}
          className="text-subtext1 hover:text-accent transition-colors"
          aria-label="Randomize fact"
        >
          <IconDice size={16} className={spinning ? 'animate-spin' : ''} />
        </button>
      </div>
      <p className="text-subtext1 text-base leading-relaxed flex-1">{facts[index]}</p>
    </div>
  );
}
