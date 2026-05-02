import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { Site } from '../lib/config';

export default function About() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
      {/* ── Bio ──────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h1 className="text-text text-3xl font-bold md:text-4xl">About Me</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Avatar placeholder */}
          <div className="md:col-span-1">
            <div className="bg-surface0 aspect-square w-full rounded-md shadow-lg flex items-center justify-center">
              <span className="text-subtext0 text-sm">Add /public/avatar.webp</span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <p className="text-subtext0 text-base leading-relaxed">
              <b className="text-text">Hey!</b> I'm Austin Chan-Orsini — a software developer
              based in [your city]. I enjoy building projects that are useful, interesting,
              or at minimum look cool.
            </p>

            <p className="text-subtext0 text-base leading-relaxed">
              I work primarily with TypeScript and React on the frontend, Python and Go
              on the backend. When I'm not coding I'm [your hobbies here].
            </p>

            <p className="text-subtext0 text-base leading-relaxed">
              Feel free to{' '}
              <a href={`mailto:${Site.out.email}`} className="link">shoot me an email</a>
              {' '}if you'd like to chat.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={Site.out.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <IconBrandGithub size={16} />
                GitHub
              </a>
              <span className="text-surface1">·</span>
              <a
                href={Site.out.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <IconBrandLinkedin size={16} />
                LinkedIn
              </a>
              <span className="text-surface1">·</span>
              <a
                href={`mailto:${Site.out.email}`}
                className="text-subtext1 hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <IconMail size={16} />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills / Tools ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-text text-xl font-semibold">Skills & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'TypeScript', 'React', 'Python', 'Go', 'Node.js',
            'PostgreSQL', 'Docker', 'Git', 'Linux',
          ].map((skill) => (
            <span key={skill} className="bg-surface0 text-subtext1 rounded-md px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
