import { useState } from 'react';
import { IconSparkles, IconDice } from '@tabler/icons-react';

const facts = [
  "My iPhone stopwatch has been running nonstop since April 9, 2024 (Around 20,000 hours!)",
  "My first coding project was making a pizza clicker game on Scratch in fourth grade",
  "My best Rubik's Cube solve so far is 15.81 seconds using the MoYu WeiLong Ferrocore",
  "My highest chess.com rating so far is 1632 on Rapid",
  "I missed a ping pong game in high school and my coach made me join the track team",
  "My highest on MonkeyType was 148 WPM on a 15 second test although I avg ~120 WPM",
  "I achieved perfection for Stardew Valley during Spring of Year 3",
  "It took me 9,532 deaths to beat Celeste",
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
    <div className="border-hairline bg-paper rounded-xl border p-4 flex flex-col h-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-ink flex items-center gap-2 text-sm font-semibold">
          <IconSparkles size={16} className="text-mark" />
          Fun Fact
        </h3>
        <button
          onClick={randomize}
          className="text-ink-muted hover:text-ink transition-colors"
          aria-label="Randomize fact"
        >
          <IconDice size={16} className={spinning ? 'animate-spin' : ''} />
        </button>
      </div>
      <p className="text-ink-secondary text-base leading-relaxed flex-1">{facts[index]}</p>
    </div>
  );
}
