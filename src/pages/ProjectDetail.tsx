import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconExternalLink,
  IconCopy,
  IconCheck,
  IconChartBar,
  IconRefresh,
  IconTrophy,
  IconDownload,
  IconSearch,
  IconFileText,
  IconKeyboard,
  IconCloudOff,
  IconFlame,
  IconBell,
  IconChartLine,
  IconMail,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';
import { projects } from '../lib/data';

// ─── Inline hooks ─────────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1300): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    setValue(0);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  chart:     IconChartBar,
  refresh:   IconRefresh,
  trophy:    IconTrophy,
  download:  IconDownload,
  search:    IconSearch,
  file:      IconFileText,
  keyboard:  IconKeyboard,
  cloudoff:  IconCloudOff,
  flame:     IconFlame,
  bell:      IconBell,
  chartline: IconChartLine,
  mail:      IconMail,
};

// ─── Tag colors ───────────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  TypeScript:    '#89b4fa',
  JavaScript:    '#f9e2af',
  React:         '#74c7ec',
  Python:        '#a6e3a1',
  FastAPI:       '#94e2d5',
  Go:            '#89dceb',
  PostgreSQL:    '#8caaee',
  SQLite:        '#b4befe',
  Electron:      '#cba6f7',
  'GitHub API':  '#cba6f7',
  'Drizzle ORM': '#fab387',
  'Chart.js':    '#f38ba8',
};
function tagColor(tag: string) { return TAG_COLORS[tag] ?? 'var(--ctp-accent)'; }

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCounter({
  stat,
  active,
}: {
  stat: { label: string; value: number; suffix?: string };
  active: boolean;
}) {
  const n = useCountUp(stat.value, active);
  return (
    <div className="bg-surface0 flex flex-col items-center rounded-xl px-4 py-5 gap-1">
      <span className="text-accent font-mono text-3xl font-bold tabular-nums">
        {n.toLocaleString()}
        {stat.suffix ?? ''}
      </span>
      <span className="text-subtext1 text-xs uppercase tracking-widest">{stat.label}</span>
    </div>
  );
}

function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const lines = code.split('\n');
  return (
    <div className="border-surface0 overflow-hidden rounded-xl border shadow-lg">
      {/* Titlebar */}
      <div className="bg-mantle flex items-center justify-between px-4 py-2.5 border-b border-surface0">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red opacity-70" />
          <span className="h-3 w-3 rounded-full bg-yellow opacity-70" />
          <span className="h-3 w-3 rounded-full bg-green opacity-70" />
          <span className="text-subtext0 ml-3 font-mono text-xs">{filename}</span>
        </div>
        <button
          onClick={copy}
          className="text-subtext1 hover:text-accent flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors hover:bg-surface0"
        >
          {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <div className="bg-crust overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4 min-w-0">
            <span className="text-overlay0 w-5 shrink-0 select-none text-right tabular-nums">{i + 1}</span>
            <span className="text-subtext1 whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShineLink({ href, label, icon }: { href: string; label: string; icon?: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = icon === 'github' ? IconBrandGithub : IconExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex overflow-hidden items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
    >
      <Icon size={15} />
      <span>{label}</span>
      {hovered && (
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%)',
            animation: 'shine-sweep 0.5s ease forwards',
          }}
        />
      )}
    </a>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────

function HeroBanner({
  gradientVars,
  title,
  description,
  tags,
}: {
  gradientVars: [string, string, string, string];
  title: string;
  description: string;
  tags: string[];
}) {
  const orbs = [
    { x: '8%',  y: '20%', s: 220, v: gradientVars[0], d: 6,  dl: 0   },
    { x: '68%', y: '8%',  s: 170, v: gradientVars[1], d: 8,  dl: 1   },
    { x: '82%', y: '60%', s: 190, v: gradientVars[2], d: 7,  dl: 2   },
    { x: '22%', y: '68%', s: 130, v: gradientVars[3], d: 9,  dl: 0.5 },
    { x: '48%', y: '38%', s: 100, v: gradientVars[0], d: 5.5,dl: 1.5 },
  ];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        aspectRatio: '21 / 8',
        background: `linear-gradient(-45deg, var(${gradientVars[0]}), var(${gradientVars[1]}), var(${gradientVars[2]}), var(${gradientVars[3]}))`,
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 9s ease infinite',
      }}
    >
      {/* Floating blurred orbs */}
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-25"
          style={{
            left: o.x,
            top: o.y,
            width: o.s,
            height: o.s,
            background: `var(${o.v})`,
            filter: 'blur(55px)',
            animation: `orb-float ${o.d}s ease-in-out ${o.dl}s infinite alternate`,
          }}
        />
      ))}

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-white drop-shadow md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-white/75 leading-relaxed md:text-base">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded px-2 py-0.5 font-mono text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.35)', color: tagColor(t) }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  const [statsRef, statsInView] = useInView(0.2);
  const [featuresRef, featuresInView] = useInView(0.1);
  const [codeRef, codeInView] = useInView(0.15);

  if (!project) return <Navigate to="/projects" replace />;

  const gradVars = project.gradientVars ?? ['--ctp-blue', '--ctp-mauve', '--ctp-sapphire', '--ctp-lavender'];

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 md:px-0">
      {/* Back */}
      <Link
        to="/projects"
        className="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <IconArrowLeft size={15} />
        Back to Projects
      </Link>

      {/* Hero */}
      <HeroBanner
        gradientVars={gradVars}
        title={project.title}
        description={project.description}
        tags={project.tags}
      />

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-overlay1 font-mono">
          {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </span>
      </div>

      {/* Stats */}
      {project.stats && (
        <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} active={statsInView} />
          ))}
        </div>
      )}

      {/* Long description */}
      {project.longDescription && (
        <div className="border-surface0 bg-canvas rounded-xl border p-6 shadow-lg">
          <h2 className="text-text mb-3 text-lg font-semibold">About</h2>
          <p className="text-subtext0 leading-relaxed">{project.longDescription}</p>
        </div>
      )}

      {/* Features */}
      {project.features && (
        <div ref={featuresRef}>
          <h2 className="text-text mb-5 text-lg font-semibold">Features</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((feature, i) => {
              const Icon = ICON_MAP[feature.iconName] ?? IconFileText;
              return (
                <div
                  key={feature.title}
                  className="border-surface0 bg-canvas rounded-xl border p-5 shadow"
                  style={{
                    opacity: featuresInView ? 1 : 0,
                    transform: featuresInView ? 'translateY(0)' : 'translateY(18px)',
                    transition: `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`,
                  }}
                >
                  <div className="text-accent mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-text mb-1 text-sm font-semibold">{feature.title}</h3>
                  <p className="text-subtext0 text-xs leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Code snippet */}
      {project.codeSnippet && (
        <div
          ref={codeRef}
          style={{ opacity: codeInView ? 1 : 0, transition: 'opacity 0.55s ease 0.1s' }}
        >
          <h2 className="text-text mb-4 text-lg font-semibold">Code Snippet</h2>
          <CodeBlock code={project.codeSnippet.code} filename={project.codeSnippet.filename} />
        </div>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => (
            <ShineLink key={link.label} href={link.url} label={link.label} icon={link.icon} />
          ))}
        </div>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <div className="border-t border-surface0 pt-10">
          <h2 className="text-text mb-5 text-lg font-semibold">More Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="border-surface0 bg-canvas hover:border-accent group rounded-xl border p-5 shadow transition-colors duration-200"
              >
                {/* Mini gradient bar */}
                <div
                  className="mb-4 h-1.5 w-full rounded-full opacity-60"
                  style={{
                    background: `linear-gradient(to right, var(${(p.gradientVars ?? ['--ctp-accent', '--ctp-blue'])[0]}), var(${(p.gradientVars ?? ['--ctp-accent', '--ctp-blue'])[2] ?? (p.gradientVars ?? [])[0]}))`,
                  }}
                />
                <h3 className="text-text group-hover:text-accent mb-1 font-semibold transition-colors">
                  {p.title}
                </h3>
                <p className="text-subtext0 line-clamp-2 text-sm">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded px-2 py-0.5 font-mono text-xs"
                      style={{
                        borderColor: `${tagColor(t)}30`,
                        color: tagColor(t),
                        backgroundColor: `${tagColor(t)}12`,
                        border: `1px solid ${tagColor(t)}30`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
