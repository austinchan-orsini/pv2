import { IconX } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavItems, moreNavItems } from '../../lib/config';

const NAV_SWEEP = ['sweep-mint', 'sweep-butter', 'sweep-coral', 'sweep-sky'];

type Props = { isOpen: boolean; onClose: () => void };

export default function Sidebar({ isOpen, onClose }: Props) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`bg-paper text-ink border-hairline fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-hairline flex h-16 items-center justify-between border-b px-4">
          <span className="text-ink text-lg font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-coral rounded transition-colors"
            aria-label="Close navigation menu"
          >
            <IconX size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1" role="list">
            {mainNavItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="text-ink hover:bg-row-hover block rounded p-2 text-sm"
                >
                  <span
                    className={`sweep ${NAV_SWEEP[i % NAV_SWEEP.length]} ${pathname === item.href ? 'sweep-active' : ''}`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}

            <li><hr className="border-hairline my-2" /></li>
            <li className="text-ink-secondary px-2 py-1 text-xs font-semibold tracking-wider uppercase">More</li>

            {moreNavItems.map((item, i) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="hover:bg-row-hover block rounded p-2 text-sm"
                  >
                    <span className={`sweep ${NAV_SWEEP[i % NAV_SWEEP.length]}`}>{item.title}</span>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="hover:bg-row-hover block rounded p-2 text-sm"
                  >
                    <span
                      className={`sweep ${NAV_SWEEP[i % NAV_SWEEP.length]} ${pathname === item.href ? 'sweep-active' : ''}`}
                    >
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
