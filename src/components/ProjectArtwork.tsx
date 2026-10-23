import { Layers3 } from 'lucide-react';
import type { Project } from '../features/portfolio/types';

export function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div
      className={`project-art${project.image ? '' : ' project-art-fallback'}`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} project illustration`}
          loading="lazy"
          width="840"
          height="540"
        />
      ) : (
        <div aria-hidden="true">
          <Layers3 size={28} />
          <span>{project.category}</span>
          <strong>{project.name}</strong>
          <p>{project.tags.slice(0, 3).join(' / ')}</p>
        </div>
      )}
    </div>
  );
}
