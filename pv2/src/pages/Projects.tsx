import { IconFolders } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { projects } from '../lib/data';

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <h1 className="text-text mb-8 flex items-center gap-3 text-3xl font-bold">
        <IconFolders size={30} className="text-accent" />
        Projects
      </h1>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="border-surface0 bg-canvas hover:border-accent group block space-y-3 rounded-xl border p-5 shadow-lg transition-colors duration-200"
            >
              {project.image ? (
                <img
                  src={project.image.url}
                  alt={project.image.alt}
                  className="mb-4 aspect-video w-full rounded-md object-cover"
                />
              ) : (
                <div className="bg-surface0 mb-4 aspect-video w-full rounded-md" />
              )}

              <div className="flex items-center justify-between gap-3">
                <h2 className="text-text group-hover:text-accent min-w-0 flex-1 truncate text-xl font-semibold transition-colors">
                  {project.title}
                </h2>
                <p className="text-overlay1 flex-shrink-0 text-xs whitespace-nowrap">
                  {new Date(project.date).getFullYear()}
                </p>
              </div>

              <p className="text-subtext0 line-clamp-3 text-sm">{project.description}</p>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-surface0 text-subtext1 rounded px-2 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-subtext1">No projects published yet.</p>
      )}
    </div>
  );
}
