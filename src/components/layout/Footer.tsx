import { useEffect, useRef, useState } from 'react';
import { IconClock, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { Site } from '../../lib/config';
import { hitCounter } from '../../lib/abacus';

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Footer() {
  const [timeOnSite, setTimeOnSite] = useState('00:00');
  const year = new Date().getFullYear();
  const [views, setViews] = useState<number | null>(null);
  const hasHitView = useRef(false);
  useEffect(() => {
    if (hasHitView.current) return;
    hasHitView.current = true;

    hitCounter('site-views')
      .then(setViews)
      .catch(console.error);  
  }, []);
  useEffect(() => {
    const start = Date.now();
    const stored = Number(localStorage.getItem('total-time-on-site') ?? 0);

    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setTimeOnSite(formatTime(stored + elapsed));
    }, 1000);

    const save = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      localStorage.setItem('total-time-on-site', String(stored + elapsed));
    };
    window.addEventListener('beforeunload', save);
    return () => { clearInterval(id); window.removeEventListener('beforeunload', save); save(); };
  }, []);

  return (
    <div className="mx-5 mb-5">
      <footer className="bg-crust text-subtext0 border-surface0/20 flex flex-col items-center justify-between gap-3 rounded-lg border p-5 text-sm md:flex-row md:gap-0">
        <div className="flex items-center gap-3">
          <span>© {year} {Site.seo.author}</span>
          <span className="text-surface1 hidden md:inline">—</span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="bg-green/75 absolute inline-flex h-full w-full animate-ping rounded-full" />
              <span className="bg-green relative inline-flex h-3 w-3 rounded-full" />
            </span>
            <span className="text-subtext1 text-xs">All Systems Nominal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
  <span className="flex items-center gap-1.5" title="Time on site">
    <IconClock size={14} className="text-subtext1" />
    <span className="text-accent font-mono text-xs">{timeOnSite}</span>
  </span>

  <span className="text-surface0">—</span>

  <span className="text-subtext1 text-xs font-mono">
    {views === null ? '...' : views.toLocaleString()} views
  </span>

  <span className="text-surface0">—</span>

  <span className="text-subtext1 text-xs font-mono">⎇ 448b603</span>

  <span className="text-surface0">—</span>

  <a href={Site.out.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-subtext1 hover:text-accent transition-colors">
    <IconBrandGithub size={16} stroke={1.5} />
  </a>

  <a href={Site.out.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-subtext1 hover:text-accent transition-colors">
    <IconBrandLinkedin size={16} stroke={1.5} />
  </a>
</div>
      </footer>
    </div>
  );
}
