import { IconX } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavItems, moreNavItems } from '../../lib/config';
import ThemeSelector from '../themes/ThemeSelector';
import ColorSelector from '../themes/ColorSelector';

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
        className={`bg-mantle text-text border-surface0 fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-surface0 flex h-16 items-center justify-between border-b px-4">
          <span className="text-accent font-mono text-lg font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="text-subtext1 hover:text-red rounded transition-colors"
            aria-label="Close navigation menu"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="border-surface0 border-b p-4 space-y-3">
          <ThemeSelector />
          <ColorSelector />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1" role="list">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="hover:bg-surface0 block rounded p-2 text-sm transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}

            <li><hr className="border-surface1 my-2" /></li>
            <li className="text-subtext0 px-2 py-1 text-xs font-semibold tracking-wider uppercase">More</li>

            {moreNavItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="hover:bg-surface0 block rounded p-2 text-sm transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="hover:bg-surface0 block rounded p-2 text-sm transition-colors"
                  >
                    {item.title}
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
