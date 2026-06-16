import { IconMenu2 } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavItems } from '../../lib/config';
import Breadcrumb from './Breadcrumb';

type Props = { onToggleSidebar: () => void };

export default function Header({ onToggleSidebar }: Props) {
  const { pathname } = useLocation();
  return (
    <header
      className="sticky top-0 z-10 flex h-20 items-center justify-between px-5"
      style={{
        maskImage: 'linear-gradient(black 60%, transparent)',
        WebkitMaskImage: 'linear-gradient(black 60%, transparent)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Breadcrumb />

      {/* Mobile hamburger */}
      <button
        onClick={onToggleSidebar}
        className="text-text hover:text-accent rounded p-2 md:hidden transition-colors"
        aria-label="Open navigation menu"
      >
        <IconMenu2 size={24} />
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center space-x-1">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`rounded px-3 py-2 text-sm font-medium transition-colors duration-150 ${
              pathname === item.href ? 'text-accent' : 'text-text hover:text-accent'
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
