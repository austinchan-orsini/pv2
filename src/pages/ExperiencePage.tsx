import { IconBriefcase, IconSchool, IconUsers } from '@tabler/icons-react';
import { experiences, education, leadership } from '../lib/data';

function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="bg-bar-track text-ink-muted rounded px-2 py-0.5 text-xs">
          {t}
        </span>
      ))}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 md:px-0">
      <h1 className="text-ink text-3xl font-semibold md:text-4xl">Experience</h1>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-ink flex items-center gap-2 text-lg font-semibold">
          <IconSchool size={20} className="text-mark" />
          Education
        </h2>
        <div className="space-y-3">
          {education.map((ed) => (
            <div key={ed.school} className="border-hairline bg-paper rounded-xl border p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                {ed.url ? (
                  <a
                    href={ed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep sweep-mint text-ink font-semibold"
                  >
                    {ed.school}
                  </a>
                ) : (
                  <span className="text-ink font-semibold">{ed.school}</span>
                )}
                <span className="text-ink-muted text-xs whitespace-nowrap">{ed.period}</span>
              </div>
              <p className="text-ink-secondary mt-1 text-sm">{ed.degree}</p>
              <div className="text-ink-muted mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                {ed.location && <span>{ed.location}</span>}
                {ed.gpa && <span>GPA: {ed.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-ink flex items-center gap-2 text-lg font-semibold">
          <IconBriefcase size={20} className="text-mark" />
          Experience
        </h2>
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="border-hairline bg-paper rounded-xl border p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep sweep-mint text-ink font-semibold"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-ink font-semibold">{exp.company}</span>
                )}
                <span className="text-ink-muted text-xs whitespace-nowrap">{exp.period}</span>
              </div>
              <div className="text-ink-secondary mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                <span>{exp.role}</span>
                {exp.location && <span className="text-ink-muted text-xs self-center">{exp.location}</span>}
              </div>
              <p className="text-ink-secondary mt-3 text-sm leading-relaxed">{exp.summary}</p>
              <Tags items={exp.tags} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Leadership & Involvement ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-ink flex items-center gap-2 text-lg font-semibold">
          <IconUsers size={20} className="text-mark" />
          Leadership & Involvement
        </h2>
        <div className="space-y-3">
          {leadership.map((role) => (
            <div key={`${role.org}-${role.period}`} className="border-hairline bg-paper rounded-xl border p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-ink font-semibold">{role.org}</span>
                <span className="text-ink-muted text-xs whitespace-nowrap">{role.period}</span>
              </div>
              <p className="text-ink-secondary mt-1 text-sm">{role.role}</p>
              <p className="text-ink-secondary mt-3 text-sm leading-relaxed">{role.summary}</p>
              {role.tags && <Tags items={role.tags} />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
