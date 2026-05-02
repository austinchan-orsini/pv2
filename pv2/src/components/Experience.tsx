import { experiences } from '../lib/data';

export default function Experience() {
  return (
    <section className="px-4 md:px-0">
      <div className="border-surface0 divide-surface0 divide-y rounded-xl border">
        {experiences.map((exp, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <div>
              {exp.url ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:text-accent text-sm font-semibold transition-colors"
                >
                  {exp.company}
                </a>
              ) : (
                <span className="text-text text-sm font-semibold">{exp.company}</span>
              )}
              <p className="text-subtext0 text-xs">{exp.role}</p>
            </div>
            <span className="text-overlay1 text-xs whitespace-nowrap">{exp.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
