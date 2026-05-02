import { useState } from 'react';
import {
  IconArrowRight, IconCalendarEvent, IconActivity,
  IconArticle, IconExternalLink, IconMapPin,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Site, socialLinks } from '../lib/config';
import { featuredProjects, posts } from '../lib/data';
import LinkWithIcon from '../components/LinkWithIcon';
import Experience from '../components/Experience';
import Featured from '../components/Featured';
import ThemeSelector from '../components/themes/ThemeSelector';
import ColorSelector from '../components/themes/ColorSelector';
import TimeWaster from '../components/bento/TimeWaster';

export default function Home() {
  const [nameHovered, setNameHovered] = useState(false);

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

          {/* Box 1: Theme Selector */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg sm:col-span-2 lg:col-span-1 space-y-3">
            <ThemeSelector />
            <ColorSelector />
          </div>

          {/* Box 2: Book a chat */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg">
            <h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
              <IconCalendarEvent size={16} className="text-accent" />
              Let's Connect
            </h3>
            <p className="text-subtext0 mb-4 text-sm">
              Always open to interesting projects and conversations.
            </p>
            <a
              href={Site.out.calcom}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-canvas inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-opacity hover:opacity-85"
            >
              <IconCalendarEvent size={16} />
              Book a Chat
            </a>
          </div>

          {/* Box 3: Location */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg">
            <h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold">
              <IconMapPin size={16} className="text-accent" />
              Location
            </h3>
            <div className="bg-surface0 flex flex-col items-center justify-center rounded-lg p-6 text-center">
              <p className="text-text font-medium">Your City</p>
              <p className="text-subtext0 text-sm">Your Country</p>
            </div>
          </div>

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
                href={Site.out.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
              >
                GitHub ↗
              </a>
            </div>
            <p className="text-subtext1 text-sm italic">
              Connect the GitHub API in{' '}
              <code className="bg-surface0 text-text rounded px-1 py-0.5 text-xs">src/lib/data.ts</code>{' '}
              to show live commits here.
            </p>
          </div>

          {/* Box 6: Latest Posts */}
          <div className="border-surface0 bg-canvas rounded-xl border p-4 shadow-lg sm:col-span-2">
            <div className="mb-3 flex items-center justify-between gap-2 text-sm">
              <h3 className="text-text flex items-center gap-2 font-semibold">
                <IconArticle size={14} className="text-accent" />
                Latest Posts
              </h3>
              <Link
                to="/posts"
                aria-label="View all posts"
                className="text-accent/80 hover:text-accent transition-colors"
              >
                <IconExternalLink size={16} />
              </Link>
            </div>
            {posts.length > 0 ? (
              <ul className="space-y-2">
                {posts.slice(0, 4).map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/posts/${post.slug}`}
                      className="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2 text-sm"
                    >
                      <span className="min-w-0 flex-1 truncate">{post.title}</span>
                      <span className="text-surface1 text-xs flex-shrink-0">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-subtext1 text-xs italic">No posts yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
