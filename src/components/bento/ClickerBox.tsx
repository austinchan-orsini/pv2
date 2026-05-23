import { useEffect, useRef, useState } from "react";
import { hitCounter, getCounter } from "../../lib/abacus";

export default function ClickerBox() {
  const [total, setTotal] = useState(0);
  const [userClicks, setUserClicks] = useState(0);
  const pendingClicks = useRef(0);

  useEffect(() => {
    getCounter("global-clicks").then(setTotal).catch(console.error);

    const saved = localStorage.getItem("clicks");
    if (saved) setUserClicks(Number(saved));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (pendingClicks.current === 0) return;

      const clicksToSend = pendingClicks.current;
      pendingClicks.current = 0;

      try {
        let realTotal = total;

        for (let i = 0; i < clicksToSend; i++) {
          realTotal = await hitCounter("global-clicks");
        }

        setTotal(realTotal);
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [total]);

  const handleClick = () => {
    pendingClicks.current += 1;

    setTotal((prev) => prev + 1);

    setUserClicks((prev) => {
      const next = prev + 1;
      localStorage.setItem("clicks", String(next));
      return next;
    });
  };

  return (
    <div className="border-surface0 bg-canvas rounded-xl border p-6 shadow-lg flex flex-col items-center justify-center h-full">
      <div className="mb-5 text-4xl font-bold tracking-widest text-accent">
        {total.toLocaleString()}
      </div>

      <button
        onClick={handleClick}
        className="bg-accent text-canvas rounded-xl px-8 py-3 font-bold tracking-wide transition-transform active:scale-95"
      >
        CLICK ME
      </button>

      <p className="text-subtext0 mt-6 text-sm">
        you've clicked {userClicks} times
      </p>
    </div>
  );
}