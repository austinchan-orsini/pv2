import { useState, useEffect } from 'react';
import {
  IconArrowRight, IconActivity,
} from '@tabler/icons-react';

type Commit = { message: string; repo: string; repoUrl: string; sha: string; date: string };
import { Link } from 'react-router-dom';
import { Site, socialLinks } from '../lib/config';
import { featuredProjects } from '../lib/data';
import LinkWithIcon from '../components/LinkWithIcon';
import Experience from '../components/Experience';
import Featured from '../components/Featured';
import ThemeSelector from '../components/themes/ThemeSelector';
import ColorSelector from '../components/themes/ColorSelector';
import TimeWaster from '../components/bento/TimeWaster';
import ClickerBox from "../components/bento/ClickerBox";
import SpotifyBox from '../components/bento/SpotifyBox';
import FunFactsBox from '../components/bento/FunFactsBox';

export default function Home() {
  const [nameHovered, setNameHovered] = useState(false);
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
        <h1 className="text-3xl font-bold md:text-4xl text-text">
          Hey! I'm{' '}
          <span className="text-accent">
            <span
              className="relative inline-block"
              onMouseEnter={() => setNameHovered(true)}
              onMouseLeave={() => setNameHovered(false)}
            >
              Austin
              <span
                className={`pointer-events-none inline-flex overflow-hidden whitespace-nowrap align-baseline transition-all duration-500 ease-out select-none ${
                  nameHovered ? 'max-w-[10ch] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                &nbsp;'A.C.'
              </span>
            </span>{' '}
            Chan-Orsini
          </span>
        </h1>

        <p className="text-subtext0 max-w-prose text-base leading-relaxed">
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
                <span className="text-surface1 text-xs">|</span>
              )}
            </span>
          ))}
          <span className="text-surface1 text-xs">|</span>
          <Link
            to="/about"
            className="text-subtext1 hover:text-accent group inline-flex items-center gap-1 text-sm transition-colors"
          >
            More about me
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

          {/* Box 1: Fun Facts */}
          <FunFactsBox />

          {/* Box 2: Book a chat */}
          <ClickerBox />

          {/* Box 3: Spotify */}
          <SpotifyBox />

          {/* Box 4: Time Waster (Snake) */}
          <TimeWaster />

          {/* Box 5: Recent Activity */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg md:col-span-2">
            <div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
              <h3 className="flex items-center gap-2 font-semibold">
                <IconActivity size={16} className="text-accent" />
                Recent Activity
              </h3>
              <a
                href="https://github.com/austinchan-orsini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
              >
                GitHub ↗
              </a>
            </div>
            {!commits ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-surface0 animate-pulse h-8 rounded" />
                ))}
              </div>
            ) : commits.length === 0 ? (
              <p className="text-subtext1 text-sm italic">No recent activity.</p>
            ) : (
              <ul className="space-y-2">
                {commits.map((c) => (
                  <li key={c.sha} className="flex items-start gap-2 text-sm min-w-0">
                    <a
                      href={c.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent shrink-0 text-xs font-mono mt-0.5 hover:underline"
                    >
                      {c.repo}
                    </a>
                    <span className="text-subtext0 truncate">{c.message}</span>
                    <span className="text-surface1 text-xs shrink-0 ml-auto">
                      {new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Box 6: Theme Selector */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg sm:col-span-2 space-y-3">
            <ThemeSelector />
            <ColorSelector />
          </div>
        </div>
      </section>
    </div>
  );
}
