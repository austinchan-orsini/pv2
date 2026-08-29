import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { Site } from '../lib/config';

export default function About() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:px-6">
      {/* ── Bio ──────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h1 className="text-ink text-3xl font-semibold md:text-4xl">About Me</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Avatar placeholder */}
          <div className="md:col-span-1">
            <div className="bg-bar-track aspect-square w-full rounded-md flex items-center justify-center">
              <span className="text-ink-secondary text-sm">Add /public/avatar.webp</span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <p className="text-ink-secondary text-base leading-relaxed">
              <b className="text-ink">Hey!</b> I'm Austin Chan-Orsini — a software developer
              based in [your city]. I enjoy building projects that are useful, interesting,
              or at minimum look cool.
            </p>

            <p className="text-ink-secondary text-base leading-relaxed">
              I work primarily with TypeScript and React on the frontend, Python and Go
              on the backend. When I'm not coding I'm [your hobbies here].
            </p>

            <p className="text-ink-secondary text-base leading-relaxed">
              Feel free to{' '}
              <a href={`mailto:${Site.out.email}`} className="link">shoot me an email</a>
              {' '}if you'd like to chat.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={Site.out.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted inline-flex items-center gap-1.5 text-sm"
              >
                <IconBrandGithub size={16} />
                <span className="sweep sweep-mint">GitHub</span>
              </a>
              <span className="text-hairline">·</span>
              <a
                href={Site.out.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted inline-flex items-center gap-1.5 text-sm"
              >
                <IconBrandLinkedin size={16} />
                <span className="sweep sweep-mint">LinkedIn</span>
              </a>
              <span className="text-hairline">·</span>
              <a
                href={`mailto:${Site.out.email}`}
                className="text-ink-muted inline-flex items-center gap-1.5 text-sm"
              >
                <IconMail size={16} />
                <span className="sweep sweep-coral">Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
