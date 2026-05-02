import { Link } from 'react-router-dom';
import { IconArrowRight, IconStar } from '@tabler/icons-react';
import type { Project } from '../lib/data';

type Props = { projects: Project[]; maxProjects?: number };

export default function Featured({ projects, maxProjects = 2 }: Props) {
  const display = projects.slice(0, maxProjects);
  if (!display.length) return null;

  return (
    <section className="px-4 md:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-text flex items-center gap-2 text-2xl font-semibold">
          <IconStar size={24} className="text-accent" />
          Featured Projects
        </h2>
        <Link
          to="/projects"
          className="text-accent/90 group hidden items-center gap-1 text-sm hover:underline sm:inline-flex"
        >
          <span>View all</span>
          <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {display.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="border-surface0 bg-canvas hover:border-accent group block overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none"
          >
            {project.image ? (
              <div className="overflow-hidden">
                <img
                  src={project.image.url}
                  alt={project.image.alt}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="bg-surface0 aspect-video w-full" />
            )}
            <div className="space-y-2 p-5">
              <h3 className="text-text group-hover:text-accent text-xl font-semibold transition-colors">
                {project.title}
              </h3>
              <p className="text-subtext0 line-clamp-2 text-sm">{project.description}</p>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-surface0 text-subtext1 rounded px-2 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 text-center sm:hidden">
        <Link to="/projects" className="text-accent group inline-flex items-center gap-1 text-sm hover:underline">
          <span>View all projects</span>
          <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
