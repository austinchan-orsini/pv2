import { useState, useEffect } from 'react';
import {
  IconArrowRight, IconActivity, IconExternalLink,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Site, socialLinks } from '../lib/config';

type Commit = { message: string; repo: string; repoUrl: string; commitUrl: string; sha: string; date: string; additions?: number; deletions?: number };
import { featuredProjects } from '../lib/data';
import LinkWithIcon from '../components/LinkWithIcon';
import Experience from '../components/Experience';
import Featured from '../components/Featured';
import Snake from '../components/bento/Snake';
import ClickerBox from "../components/bento/ClickerBox";
import SpotifyBox from '../components/bento/SpotifyBox';
import FunFactsBox from '../components/bento/FunFactsBox';
import PixelCanvas from '../components/bento/PixelCanvas';

export default function Home() {
  const [commits, setCommits] = useState<Commit[] | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCommits)
      .catch(() => setCommits([]));
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="space-y-5 px-4 md:px-0">
        <h1 className="text-3xl font-semibold md:text-4xl text-ink">
          Hey! I'm Austin Chan-Orsini
        </h1>

        <p className="text-ink-secondary max-w-prose text-base leading-relaxed">
          I'm a software developer who likes building things that actually matter. I write
          code in TypeScript, Python, and whatever the job calls for. Currently open to interesting
          opportunities — feel free to{' '}
          <a href={`mailto:${Site.out.email}`} className="link">reach out</a>.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          {socialLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              <LinkWithIcon href={link.href} text={link.text} external={link.external} className="text-sm" />
              {i < socialLinks.length - 1 && (
                <span className="text-hairline text-xs">|</span>
              )}
            </span>
          ))}
          <span className="text-hairline text-xs">|</span>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1 text-sm"
          >
            <span className="sweep sweep-mint text-ink-muted">More about me</span>
            <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <Experience />

      {/* ── Featured Projects ────────────────────────────────────────────── */}
      <Featured projects={featuredProjects} maxProjects={2} />

      {/* ── Bento Grid ───────────────────────────────────────────────────── */}
      <section className="px-4 md:px-0">
        <h2 className="sr-only">Dashboard</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">

          {/* Box 1: Book a chat */}
          <ClickerBox />

          {/* Box 2: Spotify */}
          <SpotifyBox />

          {/* Box 3: Snake */}
          <Snake />

          {/* Box 4: Pixel Canvas */}
          <PixelCanvas />

          {/* Box 5: Recent Commits */}
          <div className="border-hairline bg-paper rounded-xl border p-4 md:col-span-2 flex flex-col">
            <div className="text-ink mb-3 flex items-center justify-between gap-2 text-sm">
              <h3 className="flex items-center gap-2 font-semibold">
                <IconActivity size={16} className="text-mark" />
                Recent Commits
              </h3>
              <span className="text-ink-muted text-xs">[info]</span>
            </div>
            {!commits ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-bar-track animate-pulse h-7 rounded" />
                ))}
              </div>
            ) : commits.length === 0 ? (
              <p className="text-ink-muted text-sm italic">No recent activity.</p>
            ) : (
              <ul className="space-y-1 flex-1">
                {commits.map((c) => (
                  <li key={c.sha}>
                    <a
                      href={c.commitUrl ?? c.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-row-hover group flex items-center gap-2 rounded px-1 py-1.5 text-sm min-w-0 transition-colors"
                    >
                      <span className="text-ink shrink-0">{c.repo}:</span>
                      <span className="text-ink-secondary truncate flex-1">{c.message}</span>
                      {c.additions != null && (
                        <span className="shrink-0 text-xs">
                          <span className="text-mint">+{c.additions}</span>
                          <span className="text-ink-muted"> / </span>
                          <span className="text-coral">-{c.deletions}</span>
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <a
              href="https://github.com/austinchan-orsini"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1 text-xs font-medium border-t border-hairline pt-3"
            >
              <span className="sweep sweep-mint text-ink">View on GitHub</span> <IconExternalLink size={12} />
            </a>
          </div>

          {/* Box 6: Fun Facts */}
          <div className="sm:col-span-2">
            <FunFactsBox />
          </div>
        </div>
      </section>
    </div>
  );
}
