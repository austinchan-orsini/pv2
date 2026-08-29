import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean).slice(0, 4);

  return (
    <nav aria-label="Breadcrumbs">
      <ul className="flex items-center text-sm select-none">
        <li>
          <Link to="/" className="sweep sweep-mint text-ink">~</Link>
        </li>
        {segments.map((seg, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/');
          const isLast = i === segments.length - 1;
          return (
            <li key={href} className="flex items-center">
              <span className="mx-1 text-mark">/</span>
              {isLast ? (
                <span className="text-ink" aria-current="page">{seg}</span>
              ) : (
                <Link to={href} className="sweep sweep-mint text-ink-muted">{seg}</Link>
              )}
            </li>
          );
        })}
        <li className="flex items-center">
          <span className="mx-1 text-mark" aria-hidden="true">/</span>
          <span className="bg-mark h-4 w-2 cursor-blink" aria-hidden="true" />
        </li>
      </ul>
    </nav>
  );
}
