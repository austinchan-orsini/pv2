import { useState, useEffect } from 'react';
import {
  IconArrowRight, IconActivity, IconBrandGithub, IconBrandLinkedin, IconExternalLink,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Site, socialLinks } from '../lib/config';

type Commit = { message: string; repo: string; repoUrl: string; commitUrl: string; sha: string; date: string; additions?: number; deletions?: number };
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
          <a href={Site.out.github} target="_blank" rel="noopener noreferrer"
            className="text-subtext1 hover:text-accent transition-colors">
            <IconBrandGithub size={20} />
          </a>
          <a href={Site.out.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-subtext1 hover:text-accent transition-colors">
            <IconBrandLinkedin size={20} />
          </a>
          <span className="text-surface1 text-xs">|</span>
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

          {/* Box 1: Theme Selector */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg space-y-3">
            <ThemeSelector />
            <ColorSelector />
          </div>

          {/* Box 2: Book a chat */}
          <ClickerBox />

          {/* Box 3: Spotify */}
          <SpotifyBox />

          {/* Box 4: Time Waster (Snake) */}
          <TimeWaster />

          {/* Box 5: Recent Commits */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg md:col-span-2 flex flex-col">
            <div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
              <h3 className="flex items-center gap-2 font-semibold">
                <IconActivity size={16} className="text-accent" />
                Recent Commits
              </h3>
              <span className="text-surface1 font-mono text-xs">[info]</span>
            </div>
            {!commits ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-surface0 animate-pulse h-7 rounded" />
                ))}
              </div>
            ) : commits.length === 0 ? (
              <p className="text-subtext1 text-sm italic">No recent activity.</p>
            ) : (
              <ul className="space-y-1 flex-1">
                {commits.map((c) => (
                  <li key={c.sha}>
                    <a
                      href={c.commitUrl ?? c.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-surface0 group flex items-center gap-2 rounded px-1 py-1.5 text-sm min-w-0 transition-colors"
                    >
                      <span className="text-accent font-mono shrink-0">{c.repo}:</span>
                      <span className="text-subtext0 truncate flex-1">{c.message}</span>
                      {c.additions != null && (
                        <span className="shrink-0 font-mono text-xs">
                          <span className="text-green">+{c.additions}</span>
                          <span className="text-overlay0"> / </span>
                          <span className="text-red">-{c.deletions}</span>
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
              className="text-accent hover:text-accent/80 mt-3 flex items-center gap-1 text-xs font-medium transition-colors border-t border-surface0 pt-3"
            >
              View on GitHub <IconExternalLink size={12} />
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
