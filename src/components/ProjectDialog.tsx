import { ArrowUpRight, GitFork, X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import type { Project } from '../features/portfolio/types';
import { ProjectArtwork } from './ProjectArtwork';

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollPosition = window.scrollY;
    element?.showModal();
    document.body.classList.add('dialog-open');
    return () => {
      element?.close();
      document.body.classList.remove('dialog-open');
      trigger?.focus({ preventScroll: true });
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">PROJECT DETAILS</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={21} />
        </button>
      </div>
      <ProjectArtwork project={project} />
      <div className="dialog-content">
        <div className="dialog-heading">
          <h2 id={titleId}>{project.name}</h2>
          <span>{project.year}</span>
        </div>
        <p className="dialog-summary">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="dialog-role">
          <span>MY ROLE</span>
          <strong>{project.role}</strong>
        </div>
        <h3>The project</h3>
        <p>{project.overview}</p>
        {project.highlights.length > 0 && (
          <>
            <h3>A closer look</h3>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </>
        )}
        <div className="dialog-links">
          {project.links.live && (
            <a
              className="button button-primary"
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
            >
              Visit project <ArrowUpRight size={16} />
            </a>
          )}
          {project.links.source && (
            <a
              className="button button-secondary"
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
            >
              <GitFork size={16} /> Source code
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
