import { useTheme, type Accent } from '../../lib/theme-context';

type AccentDef = { id: Accent; hex: Record<string, string> };

const accents: AccentDef[] = [
  { id: 'rosewater', hex: { mocha: '#f5e0dc', macchiato: '#f4dbd6', frappe: '#f2d5cf', latte: '#dc8a78' } },
  { id: 'flamingo',  hex: { mocha: '#f2cdcd', macchiato: '#f0c6c6', frappe: '#eebebe', latte: '#dd7878' } },
  { id: 'pink',      hex: { mocha: '#f5c2e7', macchiato: '#f5bde6', frappe: '#f4b8e4', latte: '#ea76cb' } },
  { id: 'mauve',     hex: { mocha: '#cba6f7', macchiato: '#c6a0f6', frappe: '#ca9ee6', latte: '#8839ef' } },
  { id: 'red',       hex: { mocha: '#f38ba8', macchiato: '#ed8796', frappe: '#e78284', latte: '#d20f39' } },
  { id: 'maroon',    hex: { mocha: '#eba0ac', macchiato: '#ee99a0', frappe: '#ea999c', latte: '#e64553' } },
  { id: 'peach',     hex: { mocha: '#fab387', macchiato: '#f5a97f', frappe: '#ef9f76', latte: '#fe640b' } },
  { id: 'yellow',    hex: { mocha: '#f9e2af', macchiato: '#eed49f', frappe: '#e5c890', latte: '#df8e1d' } },
  { id: 'green',     hex: { mocha: '#a6e3a1', macchiato: '#a6da95', frappe: '#a6d189', latte: '#40a02b' } },
  { id: 'teal',      hex: { mocha: '#94e2d5', macchiato: '#8bd5ca', frappe: '#81c8be', latte: '#179299' } },
  { id: 'sky',       hex: { mocha: '#89dceb', macchiato: '#91d7e3', frappe: '#99d1db', latte: '#04a5e5' } },
  { id: 'sapphire',  hex: { mocha: '#74c7ec', macchiato: '#7dc4e4', frappe: '#85c1dc', latte: '#209fb5' } },
  { id: 'blue',      hex: { mocha: '#89b4fa', macchiato: '#8aadf4', frappe: '#8caaee', latte: '#1e66f5' } },
  { id: 'lavender',  hex: { mocha: '#b4befe', macchiato: '#b7bdf8', frappe: '#babbf1', latte: '#7287fd' } },
];

export default function ColorSelector() {
  const { accent, flavour, setAccent } = useTheme();

  return (
    <div>
      <p className="text-subtext0 mb-2 text-xs font-semibold uppercase tracking-wider">Accent</p>
      <div className="flex gap-1.5">
        {accents.map((a) => {
          const color = a.hex[flavour] ?? a.hex.mocha;
          return (
            <button
              key={a.id}
              onClick={() => setAccent(a.id)}
              title={a.id}
              className={`h-5 w-5 rounded-full transition-transform hover:scale-110 ${
                accent === a.id ? 'ring-2 ring-offset-1 ring-offset-surface0 scale-110' : ''
              }`}
              style={{ backgroundColor: color, ...(accent === a.id ? { ringColor: color } : {}) }}
              aria-label={`Set accent to ${a.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
