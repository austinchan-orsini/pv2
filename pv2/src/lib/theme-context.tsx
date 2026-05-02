import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Flavour = 'mocha' | 'macchiato' | 'frappe' | 'latte';
export type Accent =
  | 'mauve' | 'blue' | 'sapphire' | 'sky' | 'teal' | 'green'
  | 'yellow' | 'peach' | 'maroon' | 'red' | 'pink' | 'flamingo'
  | 'rosewater' | 'lavender';

type ThemeCtx = {
  flavour: Flavour;
  accent: Accent;
  setFlavour: (f: Flavour) => void;
  setAccent: (a: Accent) => void;
};

const ThemeContext = createContext<ThemeCtx>({
  flavour: 'mocha',
  accent: 'mauve',
  setFlavour: () => {},
  setAccent: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [flavour, setFlavourState] = useState<Flavour>(() => {
    return (localStorage.getItem('ctp-flavour') as Flavour) ?? 'mocha';
  });
  const [accent, setAccentState] = useState<Accent>(() => {
    return (localStorage.getItem('ctp-accent') as Accent) ?? 'mauve';
  });

  const setFlavour = (f: Flavour) => {
    setFlavourState(f);
    localStorage.setItem('ctp-flavour', f);
  };
  const setAccent = (a: Accent) => {
    setAccentState(a);
    localStorage.setItem('ctp-accent', a);
  };

  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove('mocha', 'macchiato', 'frappe', 'latte');
    el.classList.add(flavour);
  }, [flavour]);

  useEffect(() => {
    const el = document.documentElement;
    const accentClasses = [
      'accent-mauve','accent-blue','accent-sapphire','accent-sky','accent-teal',
      'accent-green','accent-yellow','accent-peach','accent-maroon','accent-red',
      'accent-pink','accent-flamingo','accent-rosewater','accent-lavender',
    ];
    el.classList.remove(...accentClasses);
    el.classList.add(`accent-${accent}`);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ flavour, accent, setFlavour, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
