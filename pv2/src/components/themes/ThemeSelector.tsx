import { useTheme } from '../../lib/theme-context';

export default function ThemeSelector() {
  const { flavour, setFlavour } = useTheme();

  const isLight = flavour === 'latte';

  return (
    <div className="flex items-center justify-between">
      <span className="text-subtext0 text-xs font-semibold uppercase tracking-wider">
        {isLight ? '☀︎ Day' : '☾ Night'}
      </span>
      <button
        role="switch"
        aria-checked={isLight}
        onClick={() => setFlavour(isLight ? 'frappe' : 'latte')}
        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none bg-accent"
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
            isLight ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}