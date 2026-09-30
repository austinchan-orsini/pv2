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
              <b className="text-ink">Hi, I'm Austin!</b> I grew up in New York City and am now a junior at Boston College studying Computer Science and Mathematics.

            </p>

            <p className="text-ink-secondary text-base leading-relaxed">
              Growing up, I loved solving problems which drew me to puzzles and competing in chess tournaments. I also loved playing sports and throughout the years competed in ultimate frisbee, table tennis, soccer, baseball, basketball, and track. I first got into programming in middle school through Scratch, and in high school, that curiosity turned into building games with Roblox and Unity.
            </p>
            <p className="text-ink-secondary text-base leading-relaxed">
These days, I'm most interested in backend systems, cloud infrastructure, and mobile development. I especially enjoy building projects that solve problems I encounter in my own life or that can make something easier for other people. That mindset has pushed me to explore new technologies and take ideas from something I wish existed to something I can actually use.
            </p>
            <p className="text-ink-secondary text-base leading-relaxed">
Besides coding, I also try to stay involved around campus. I work as an IT consultant at the library, helping students and faculty troubleshoot technical problems, and as a student ambassador at the McMullen Museum. I'm also involved with Boston College's Computer Science Society and various cultural organizations on campus.
            </p>
                        <p className="text-ink-secondary text-base leading-relaxed">
Outside of school, you'll usually find me at the gym, rock climbing, playing chess, videogames, speedcubing, or exploring my interest in cinematography. I like having a lot of different things to learn and constantly getting better at things.            </p>


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
