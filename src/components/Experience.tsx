import { Link } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import { experiences } from '../lib/data';

export default function Experience() {
  return (
    <section className="px-4 md:px-0">
      <div className="border-hairline divide-hairline divide-y rounded-xl border">
        {experiences.slice(0, 3).map((exp, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <div>
              {exp.url ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep sweep-mint text-ink text-sm font-semibold"
                >
                  {exp.company}
                </a>
              ) : (
                <span className="text-ink text-sm font-semibold">{exp.company}</span>
              )}
              <p className="text-ink-secondary text-xs">{exp.role}</p>
            </div>
            <span className="text-ink-muted text-xs whitespace-nowrap">{exp.period}</span>
          </div>
        ))}
      </div>

      <Link
        to="/experience"
        className="group mt-3 inline-flex items-center gap-1 text-sm"
      >
        <span className="sweep sweep-mint text-ink-muted">Experience</span>
        <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
