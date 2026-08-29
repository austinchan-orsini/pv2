import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconBrandChrome,
  IconExternalLink,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { projects } from '../lib/data';
import { tagColor } from '../lib/tagColor';
import { formatMonthYear } from '../lib/date';

// ─── Inline hooks ─────────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1300): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScreenshotGallery({
  shots,
  aspect = '3 / 4',
  fullWidth = false,
}: {
  shots: { url: string; alt: string }[];
  aspect?: string;
  fullWidth?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + shots.length) % shots.length);
  const next = () => setIndex((i) => (i + 1) % shots.length);

  return (
    <div className={`mx-auto flex w-full flex-col gap-2 ${fullWidth ? '' : 'max-w-md'}`}>
      <div
        className="border-hairline bg-ink/5 group relative overflow-hidden rounded-xl border"
        style={{ aspectRatio: aspect }}
      >
        <img src={shots[index].url} alt={shots[index].alt} className="h-full w-full object-cover object-top" />
        {shots.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60"
            >
              <IconChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60"
            >
              <IconChevronRight size={16} />
            </button>
          </>
        )}
      </div>
      {shots.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {shots.map((shot, i) => (
            <button
              key={shot.url}
              ref={(el) => { thumbRefs.current[i] = el; }}
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1} of ${shots.length}`}
              className={`h-11 shrink-0 overflow-hidden rounded-md border-2 transition-[width,opacity] duration-300 ${
                i === index ? 'border-mark' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              style={{ width: i === index ? 64 : 40 }}
            >
              <img src={shot.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
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
      className="relative inline-flex overflow-hidden items-center gap-2 rounded-lg border border-mint/60 bg-mint/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mint/30"
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

function IconLink({ href, label, icon }: { href: string; label: string; icon?: string }) {
  const Icon = icon === 'github' ? IconBrandGithub : icon === 'chrome' ? IconBrandChrome : IconExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="text-ink-muted hover:text-ink transition-colors"
    >
      <Icon size={18} />
    </a>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────

function HeroBanner({
  gradientVars,
  title,
  description,
  tags,
  badge,
}: {
  gradientVars: [string, string, string, string];
  title: string;
  description: string;
  tags: string[];
  badge?: { label: string; value: number; suffix?: string };
}) {
  const orbs = [
    { x: '8%',  y: '20%', s: 220, v: gradientVars[0], d: 6,  dl: 0   },
    { x: '68%', y: '8%',  s: 170, v: gradientVars[1], d: 8,  dl: 1   },
    { x: '82%', y: '60%', s: 190, v: gradientVars[2], d: 7,  dl: 2   },
    { x: '22%', y: '68%', s: 130, v: gradientVars[3], d: 9,  dl: 0.5 },
    { x: '48%', y: '38%', s: 100, v: gradientVars[0], d: 5.5,dl: 1.5 },
  ];

  const badgeCount = useCountUp(badge?.value ?? 0, Boolean(badge));

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
        <h1 className="text-3xl font-semibold text-white drop-shadow md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-white/75 leading-relaxed md:text-base">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.35)', color: tagColor(t) }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Corner badge */}
      {badge && (
        <div className="absolute bottom-6 right-6 flex flex-col items-end">
          <span className="text-2xl font-semibold tabular-nums text-white drop-shadow md:text-3xl">
            {badgeCount}
            {badge.suffix ?? ''}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-white/70">{badge.label}</span>
        </div>
      )}
    </div>
  );
}

// ─── Bare hero (used when a project has real screenshots) ─────────────────────

function BareHero({
  title,
  description,
  tags,
  badge,
  date,
  links,
  longDescription,
}: {
  title: string;
  description: string;
  tags: string[];
  badge?: { label: string; value: number; suffix?: string };
  date?: string;
  links?: { label: string; url: string; icon?: string }[];
  longDescription?: string;
}) {
  const badgeCount = useCountUp(badge?.value ?? 0, Boolean(badge));

  return (
    <div>
      <h1 className="text-ink text-3xl font-semibold md:text-4xl">{title}</h1>
      {(date || (links && links.length > 0)) && (
        <div className="mt-1.5 flex items-center gap-3">
          {date && (
            <span className="text-ink-muted text-sm">
              {formatMonthYear(date)}
            </span>
          )}
          {links && links.length > 0 && (
            <div className="flex items-center gap-2.5">
              {links.map((link) => (
                <IconLink key={link.label} href={link.url} label={link.label} icon={link.icon} />
              ))}
            </div>
          )}
        </div>
      )}
      <p className="text-ink-secondary mt-3 leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded px-2 py-0.5 text-xs"
            style={{
              color: 'var(--ink-secondary)',
              backgroundColor: `${tagColor(t)}40`,
              border: `1px solid ${tagColor(t)}80`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {badge && (
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-ink text-3xl font-semibold tabular-nums">
            {badgeCount}
            {badge.suffix ?? ''}
          </span>
          <span className="text-ink-muted text-xs uppercase tracking-widest">{badge.label}</span>
        </div>
      )}
      {longDescription && (
        <div className="border-hairline bg-paper mt-6 rounded-xl border p-6">
          <h2 className="text-ink mb-3 text-lg font-semibold">About</h2>
          <p className="text-ink-secondary leading-relaxed">{longDescription}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  const [featuresRef, featuresInView] = useInView(0.1);

  if (!project) return <Navigate to="/projects" replace />;

  const gradVars = project.gradientVars ?? ['--mint', '--butter', '--coral', '--mark'];
  const hasMedia = Boolean(project.screenshots && project.screenshots.length > 0);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 md:px-0">
      {/* Back */}
      <Link
        to="/projects"
        className="text-ink-muted inline-flex items-center gap-1.5 text-sm"
      >
        <IconArrowLeft size={15} />
        <span className="sweep sweep-mint">Back to Projects</span>
      </Link>

      {hasMedia ? (
        project.stackedMedia ? (
          /* Hero — gallery full-width above the title, single column */
          <div className="space-y-6">
            <ScreenshotGallery shots={project.screenshots!} aspect={project.screenshotAspect} fullWidth />
            <BareHero
              title={project.title}
              description={project.description}
              tags={project.tags}
              badge={project.heroBadge}
              date={project.date}
              links={project.links}
              longDescription={project.longDescription}
            />
          </div>
        ) : (
          /* Hero — title/description/About in one column, gallery beside it */
          <div className="grid gap-8 md:grid-cols-2">
            <BareHero
              title={project.title}
              description={project.description}
              tags={project.tags}
              badge={project.heroBadge}
              date={project.date}
              links={project.links}
              longDescription={project.longDescription}
            />
            <ScreenshotGallery shots={project.screenshots!} aspect={project.screenshotAspect} />
          </div>
        )
      ) : (
        <>
          {/* Hero */}
          <HeroBanner
            gradientVars={gradVars}
            title={project.title}
            description={project.description}
            tags={project.tags}
            badge={project.heroBadge}
          />

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-ink-muted">
              {formatMonthYear(project.date)}
            </span>
          </div>

          {/* Long description */}
          {project.longDescription && (
            <div className="border-hairline bg-paper rounded-xl border p-6">
              <h2 className="text-ink mb-3 text-lg font-semibold">About</h2>
              <p className="text-ink-secondary leading-relaxed">{project.longDescription}</p>
            </div>
          )}
        </>
      )}

      {/* Features */}
      {project.features && (
        <div
          ref={featuresRef}
          style={{
            opacity: featuresInView ? 1 : 0,
            transform: featuresInView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <h2 className="text-ink mb-4 text-lg font-semibold">Features</h2>
          <ul className="space-y-2.5">
            {project.features.map((feature) => (
              <li key={feature.title} className="text-ink-secondary flex gap-2.5 text-sm leading-relaxed">
                <span className="text-mark mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                <span>
                  <span className="text-ink font-semibold">{feature.title}</span>
                  {' — '}
                  {feature.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Real-world application */}
      {project.realWorldValue && (
        <div className="border-hairline bg-paper rounded-xl border p-6">
          <h2 className="text-ink mb-3 text-lg font-semibold">Real-World Application</h2>
          <p className="text-ink-secondary leading-relaxed">{project.realWorldValue}</p>
        </div>
      )}

      {/* Links */}
      {!hasMedia && project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => (
            <ShineLink key={link.label} href={link.url} label={link.label} icon={link.icon} />
          ))}
        </div>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <div className="border-t border-hairline pt-10">
          <h2 className="text-ink mb-5 text-lg font-semibold">More Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="border-hairline bg-paper hover:border-ink group rounded-xl border p-5 transition-colors duration-200"
              >
                {/* Mini gradient bar */}
                <div
                  className="mb-4 h-1.5 w-full rounded-full opacity-60"
                  style={{
                    background: `linear-gradient(to right, var(${(p.gradientVars ?? ['--mint', '--butter'])[0]}), var(${(p.gradientVars ?? ['--mint', '--butter'])[2] ?? (p.gradientVars ?? [])[0]}))`,
                  }}
                />
                <h3 className="text-ink group-hover:text-mark mb-1 font-semibold transition-colors">
                  {p.title}
                </h3>
                <p className="text-ink-secondary line-clamp-2 text-sm">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded px-2 py-0.5 text-xs"
                      style={{
                        color: 'var(--ink-secondary)',
                        backgroundColor: `${tagColor(t)}40`,
                        border: `1px solid ${tagColor(t)}80`,
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
