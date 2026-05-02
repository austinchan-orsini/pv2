import { useTheme, type Flavour } from '../../lib/theme-context';

const flavours: { id: Flavour; label: string }[] = [
  { id: 'latte',     label: 'Latte'     },
  { id: 'frappe',    label: 'Frappé'    },
  { id: 'macchiato', label: 'Macchiato' },
  { id: 'mocha',     label: 'Mocha'     },
];

export default function ThemeSelector() {
  const { flavour, setFlavour } = useTheme();

  return (
    <div>
      <p className="text-subtext0 mb-2 text-xs font-semibold uppercase tracking-wider">Theme</p>
      <div className="grid grid-cols-2 gap-1.5">
        {flavours.map((f) => (
          <button
            key={f.id}
            onClick={() => setFlavour(f.id)}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              flavour === f.id
                ? 'bg-accent text-canvas font-semibold'
                : 'bg-surface0 text-subtext1 hover:text-text'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
