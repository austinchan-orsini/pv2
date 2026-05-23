import { useTheme } from '../../lib/theme-context';

export default function ThemeSelector() {
  const { flavour, setFlavour } = useTheme();

  const isLight = flavour === 'latte';

  return (
    <div>
      <p className="text-subtext0 mb-2 text-xs font-semibold uppercase tracking-wider">
        Theme
      </p>

      <button
        onClick={() => setFlavour(isLight ? 'frappe' : 'latte')}
        className="bg-surface0 text-subtext1 flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:text-text"
      >
        <span>{isLight ? 'Day' : 'Night'}</span>
        <span className="text-accent">{isLight ? '☀︎' : '☾'}</span>
      </button>
    </div>
  );
}