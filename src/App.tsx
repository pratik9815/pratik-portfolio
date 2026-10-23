import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Cloud,
  Code2,
  Coffee,
  Copy,
  GitFork,
  Globe2,
  LoaderCircle,
  Mail,
  MapPin,
  Server,
  Sparkles,
} from 'lucide-react';
import { Component, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from './components/Header';
import { HeroScene } from './components/HeroScene';
import { ProjectArtwork } from './components/ProjectArtwork';
import { ProjectDialog } from './components/ProjectDialog';
import { CvDownload } from './components/CvDownload';
import { EducationSection } from './components/EducationSection';
import type { PortfolioData, Project } from './features/portfolio/types';
import { usePortfolio } from './features/portfolio/usePortfolio';
import { useTheme } from './hooks/useTheme';

const expertiseIcons = {
  code: Code2,
  server: Server,
  cloud: Cloud,
  sparkles: Sparkles,
};
const socialIcons = {
  github: GitFork,
  linkedin: BriefcaseBusiness,
  website: Globe2,
};

class PortfolioBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="app-state">
          <Code2 size={32} />
          <h1>Something didn’t load.</h1>
          <p>Refresh the page to try again.</p>
          <button
            className="button button-primary"
            onClick={() => window.location.reload()}
          >
            Refresh page <ArrowRight size={16} />
          </button>
        </div>
      );
    return this.props.children;
  }
}

export function App() {
  return (
    <PortfolioBoundary>
      <PortfolioLoader />
    </PortfolioBoundary>
  );
}

function PortfolioLoader() {
  const { state, retry } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  if (state.status === 'loading')
    return (
      <div className="app-state" role="status">
        <LoaderCircle className="spinner" size={30} />
        <p>A few things coming together…</p>
      </div>
    );
  if (state.status === 'error')
    return (
      <div className="app-state" role="alert">
        <Code2 size={32} />
        <h1>Couldn’t load the portfolio.</h1>
        <p>Please try again.</p>
        <button className="button button-primary" onClick={retry}>
          Try again <ArrowRight size={16} />
        </button>
      </div>
    );
  return (
    <Portfolio data={state.data} theme={theme} toggleTheme={toggleTheme} />
  );
}

function Portfolio({
  data,
  theme,
  toggleTheme,
}: {
  data: PortfolioData;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) {
  const { profile, projects, expertise, experience, contact } = data;
  const categories = [
    'All projects',
    ...new Set(projects.map((project) => project.category)),
  ];
  const [category, setCategory] = useState('All projects');
  const initialProjectCount = Math.max(
    1,
    Math.floor(data.projectDisplay?.initialCount ?? 2),
  );
  const projectIncrement = Math.max(
    1,
    Math.floor(data.projectDisplay?.increment ?? 2),
  );
  const [visibleProjectCount, setVisibleProjectCount] =
    useState(initialProjectCount);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );
  const [localTime, setLocalTime] = useState('');
  const filteredProjects =
    category === 'All projects'
      ? projects
      : projects.filter((project) => project.category === category);
  const shownProjects = filteredProjects.slice(0, visibleProjectCount);
  const hasMoreProjects = shownProjects.length < filteredProjects.length;
  const emailLink = `mailto:${profile.email}?subject=${encodeURIComponent(contact.subject)}`;

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        `${profile.name}. ${profile.role}. ${profile.introduction}`,
      );
  }, [profile]);

  useEffect(() => {
    const updateTime = () => {
      try {
        setLocalTime(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: profile.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setLocalTime('');
      }
    };
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, [profile.timezone]);

  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timer = window.setTimeout(() => setCopyStatus('idle'), 3500);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  }

  const cvLink = <CvDownload data={data} />;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header profile={profile} theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        <section
          className="hero section-container"
          id="home"
          aria-labelledby="hero-heading"
        >
          <div className="hero-content">
            <div
              className={`availability ${profile.available ? 'available' : ''}`}
            >
              <span className="status-dot" />
              {profile.availability}
            </div>
            <p className="hero-intro">
              HELLO, I’M {profile.name.toUpperCase()}{' '}
              <span className="hello-hand">✳</span>
            </p>
            <h1 id="hero-heading">
              {profile.headline[0]}
              <br />
              <span>{profile.headline[1]}</span>
            </h1>
            <p className="hero-description">{profile.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowDownRight />
              </a>
              {cvLink}
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={13} />
                {profile.location}
              </span>
              <span className="meta-divider" />
              <span>Building for the web. And beyond.</span>
            </div>
          </div>
          <HeroScene profile={profile} />
          <div className="hero-bottom">
            <span>
              <span className="small-star">✳</span> A little curiosity goes a
              long way.
            </span>
            <a href="#work">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="disciplines-strip">
          <div className="section-container">
            <span>IDEAS TO IMPLEMENTATION</span>
            <div>
              {['Frontend', 'Backend', 'Cloud', 'Design thinking'].map(
                (discipline) => (
                  <span key={discipline}>
                    <i />
                    {discipline}
                  </span>
                ),
              )}
            </div>
            <Code2 size={20} />
          </div>
        </div>

        <section
          className="work-section section-container section-space"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span />
                PROJECTS & CONTRIBUTIONS
              </p>
              <h2 id="work-heading">
                Work, beyond the code<span>.</span>
              </h2>
            </div>
            <p>
              Professional contributions and personal projects.
              <br />
              From financial systems to real-time messaging.
            </p>
          </div>
          <div className="project-toolbar">
            <div
              className="project-filters"
              role="group"
              aria-label="Filter projects"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  onClick={() => {
                    if (item !== category) {
                      setCategory(item);
                      setVisibleProjectCount(initialProjectCount);
                    }
                  }}
                >
                  {item}
                  {item === 'All projects' && (
                    <span>{projects.length.toString().padStart(2, '0')}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="project-count">
              {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="project-grid" id="project-grid">
            {shownProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <button
                  className="project-preview-button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.name} project details`}
                >
                  <ProjectArtwork project={project} />
                  <span className="project-open">
                    <ArrowUpRight size={21} />
                  </span>
                </button>
                <div className="project-card-body">
                  <div className="project-title-row">
                    <h3>
                      <button onClick={() => setSelectedProject(project)}>
                        {project.name} <ArrowUpRight size={18} />
                      </button>
                    </h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-card-links">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live project <ArrowUpRight size={13} />
                      </a>
                    )}
                    {project.links.source && (
                      <a
                        href={project.links.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GitFork size={13} /> Source code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredProjects.length > 0 && (
            <div className="project-reveal">
              <span role="status">
                Showing {shownProjects.length} of {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
              {filteredProjects.length > initialProjectCount && (
                <button
                  className="button button-secondary"
                  aria-controls="project-grid"
                  aria-expanded={shownProjects.length > initialProjectCount}
                  onClick={() =>
                    setVisibleProjectCount((count) =>
                      hasMoreProjects
                        ? count + projectIncrement
                        : initialProjectCount,
                    )
                  }
                >
                  {hasMoreProjects ? 'See more' : 'See less'}
                  {hasMoreProjects ? (
                    <ArrowDown size={15} />
                  ) : (
                    <ArrowUp size={15} />
                  )}
                </button>
              )}
            </div>
          )}
          {shownProjects.length === 0 && (
            <div className="empty-state">
              <Code2 size={25} />
              <h3>More work is on the way.</h3>
              <p>Check back soon for new projects.</p>
            </div>
          )}
          <div className="work-footnote">
            <span>Always experimenting. Always building.</span>
            <a href="#contact">
              Have a challenge for me? <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="section-container section-space">
            <div className="about-grid">
              <div className="about-identity">
                <p className="eyebrow">
                  <span />
                  THE PERSON BEHIND THE CODE
                </p>
                <h2 id="about-heading">
                  An engineer.
                  <br />A lifelong <span>explorer.</span>
                </h2>
                <div className="identity-card">
                  <div className="identity-top">
                    <div className="initials-portrait">
                      <span>{profile.initials}</span>
                      <Code2 size={24} />
                      <span className="portrait-spark">✳</span>
                    </div>
                    <div>
                      <strong>
                        {profile.name}
                        <span>.</span>
                      </strong>
                      <span>{profile.role}</span>
                      <span className="identity-location">
                        <MapPin size={12} />
                        {profile.location}
                      </span>
                    </div>
                    <span className="identity-star">✳</span>
                  </div>
                  <div className="identity-bottom">
                    <span>
                      <Coffee size={15} />
                      FUELED BY CURIOSITY
                    </span>
                    <span>↗</span>
                  </div>
                </div>
                <EducationSection items={data.education} />
              </div>
              <div className="about-story">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="currently">
                  <span className="eyebrow">CURRENTLY</span>
                  <span>
                    <span className="status-dot" />
                    {profile.currently}
                  </span>
                </div>
                <div className="interest-tags">
                  {profile.interests.map((interest) => (
                    <span key={interest}>{interest}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="expertise-header">
              <span className="eyebrow">A VERSATILE TOOLKIT</span>
              <span>The right tools. A thoughtful approach.</span>
            </div>
            <div className="expertise-grid">
              {expertise.map((item) => {
                const Icon = expertiseIcons[item.icon];
                return (
                  <article className="expertise-card" key={item.title}>
                    <div className="expertise-icon">
                      <Icon size={21} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="expertise-skills">
                      {item.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="experience-section section-container section-space"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="experience-layout">
            <div className="experience-intro">
              <p className="eyebrow">
                <span />
                THE JOURNEY SO FAR
              </p>
              <h2 id="experience-heading">
                Always learning.
                <br />
                Always moving<span>.</span>
              </h2>
              <p>
                Different teams, different challenges.
                <br />
                The same drive to build things that matter.
              </p>
              {cvLink}
            </div>
            <div className="timeline">
              {experience.length ? (
                experience.map((item) => (
                  <article className="experience-item" key={item.id}>
                    <div
                      className={`timeline-point ${item.current ? 'is-current' : ''}`}
                    />
                    <div className="experience-period">
                      {item.period}
                      {item.current && <span>NOW</span>}
                    </div>
                    <h3>{item.role}</h3>
                    <div className="experience-company">
                      {item.company}
                      {item.location && (
                        <>
                          <span>·</span>
                          {item.location}
                        </>
                      )}
                    </div>
                    <p>{item.description}</p>
                    <div className="project-tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <p className="muted">The next chapter is just beginning.</p>
              )}
            </div>
          </div>
        </section>

        <section
          className="contact-section section-container"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="contact-panel">
            <div className="contact-topline">
              <span className="eyebrow">
                GOOD THINGS START WITH A CONVERSATION
              </span>
              <span className="contact-star" aria-hidden="true">
                ✳
              </span>
            </div>
            <h2 id="contact-heading">
              {contact.heading}
              <br />
              <span>Let’s make it happen.</span>
            </h2>
            <p>{contact.description}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={emailLink}>
                Say hello <ArrowUpRight size={17} />
              </a>
              <div className="copy-email">
                <a href={emailLink}>{profile.email}</a>
                <button
                  className="icon-button"
                  onClick={() => void copyEmail()}
                  aria-label={
                    copyStatus === 'copied'
                      ? 'Email copied'
                      : 'Copy email address'
                  }
                  title={
                    copyStatus === 'copied' ? 'Copied!' : 'Copy email address'
                  }
                >
                  {copyStatus === 'copied' ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <span className="copy-status" role="status">
                  {copyStatus === 'copied'
                    ? 'Email copied'
                    : copyStatus === 'error'
                      ? 'Couldn’t copy. Select the email instead.'
                      : ''}
                </span>
              </div>
            </div>
            <div className="contact-bottom">
              <span className={profile.available ? 'available' : ''}>
                <span className="status-dot" />
                {profile.availability}
              </span>
              <div>
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon size={15} />
                      {social.label}
                      <ArrowUpRight size={13} />
                    </a>
                  );
                })}
                <a href={emailLink}>
                  <Mail size={15} />
                  Email
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-container">
        <div>
          <a className="wordmark" href="#home">
            {profile.name.toLowerCase()}
            <span>.</span>
          </a>
          {/* <span>
            Thoughtfully built with <Heart size={11} /> & React.
          </span> */}
        </div>
        <span className="footer-time">
          {localTime && (
            <>
              <span className="status-dot" />
              {localTime} in {profile.location.split(',')[0]}
            </>
          )}
        </span>
        <div>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a className="back-top" href="#home" aria-label="Back to top">
            <ArrowUp size={17} />
          </a>
        </div>
      </footer>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

function ArrowDownRight() {
  return <ArrowUpRight size={17} className="explore-arrow" />;
}
