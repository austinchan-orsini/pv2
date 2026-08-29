import { IconCode } from '@tabler/icons-react';
import type { Project } from '../lib/data';

export default function ProjectThumb({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image.url}
        alt={project.image.alt}
        className={`aspect-video w-full object-cover ${className}`}
      />
    );
  }

  const [g0, , g2] = project.gradientVars ?? ['--mint', '--butter', '--coral', '--mark'];

  return (
    <div
      className={`aspect-video w-full flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, var(${g0}), var(${g2}))` }}
    >
      <IconCode size={32} className="text-white/70" />
    </div>
  );
}
