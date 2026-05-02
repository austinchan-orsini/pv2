import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean).slice(0, 4);

  return (
    <nav aria-label="Breadcrumbs">
      <ul className="flex items-center text-sm font-mono select-none">
        <li>
          <Link to="/" className="text-accent hover:opacity-70 transition-opacity">~</Link>
        </li>
        {segments.map((seg, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/');
          const isLast = i === segments.length - 1;
          return (
            <li key={href} className="flex items-center">
              <span className="mx-1 text-overlay0">/</span>
              {isLast ? (
                <span className="text-text" aria-current="page">{seg}</span>
              ) : (
                <Link to={href} className="text-subtext1 hover:text-accent transition-colors">{seg}</Link>
              )}
            </li>
          );
        })}
        <li className="flex items-center">
          <span className="mx-1 text-overlay0" aria-hidden="true">/</span>
          <span className="bg-accent h-4 w-2 cursor-blink" aria-hidden="true" />
        </li>
      </ul>
    </nav>
  );
}
