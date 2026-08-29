import { IconBriefcase, IconSchool, IconUsers } from '@tabler/icons-react';
import { experiences, education, leadership, technicalSkills } from '../lib/data';

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
              {ed.coursework && ed.coursework.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ed.coursework.map((c) => (
                    <span key={c} className="bg-bar-track text-ink-muted rounded px-2 py-0.5 text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              )}
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
              <ul className="mt-3 space-y-1.5">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-ink-secondary flex gap-2 text-sm leading-relaxed">
                    <span className="text-mark mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
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
              <ul className="mt-3 space-y-1.5">
                {role.bullets.map((b) => (
                  <li key={b} className="text-ink-secondary flex gap-2 text-sm leading-relaxed">
                    <span className="text-mark mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technical Skills ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-ink text-lg font-semibold">Technical Skills</h2>
        <div className="border-hairline bg-paper divide-hairline divide-y rounded-xl border">
          {Object.entries(technicalSkills).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-ink-muted w-32 shrink-0 text-xs font-semibold uppercase tracking-wider">
                {category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="bg-bar-track text-ink-muted rounded px-2 py-0.5 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
