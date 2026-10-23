import {
  ArrowUpRight,
  Braces,
  Code2,
  Command,
  GitBranch,
  Layers3,
  Terminal,
} from 'lucide-react';
import type { Profile } from '../features/portfolio/types';

export function HeroScene({ profile }: { profile: Profile }) {
  return (
    <div
      className="hero-scene"
      role="img"
      aria-label="An illustrated code editor surrounded by connected frontend, backend, and cloud layers"
    >
      <div className="scene-grid" />
      <div className="scene-orbit orbit-one" />
      <div className="scene-orbit orbit-two" />
      <span className="scene-coordinate coordinate-top">
        IDEA → IMPLEMENTATION
      </span>
      <span className="scene-cross cross-one">+</span>
      <span className="scene-cross cross-two">+</span>
      <div className="scene-float float-braces">
        <Braces size={25} />
      </div>
      <div className="scene-float float-layers">
        <Layers3 size={24} />
      </div>
      <div className="scene-editor">
        <div className="editor-bar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>hello.tsx</span>
          <Code2 size={14} />
        </div>
        <div className="editor-body">
          <div className="editor-gutter">
            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
          </div>
          <div className="editor-code">
            <span className="code-comment">// A little about me</span>
            <br />
            <span className="code-purple">const</span> engineer = {'{'}
            <br />
            &nbsp; name: <span className="code-green">'{profile.name}'</span>,
            <br />
            &nbsp; focus: [<br />
            &nbsp;&nbsp;{' '}
            <span className="code-green">'Build with purpose'</span>,<br />
            &nbsp;&nbsp; <span className="code-green">'Sweat the details'</span>
            ,<br />
            &nbsp;&nbsp; <span className="code-green">'Keep learning'</span>
            <br />
            &nbsp; ],
            <br />
            {'}'};<span className="code-caret" />
          </div>
        </div>
        <div className="editor-footer">
          <span>
            <GitBranch size={11} /> main
          </span>
          <span>
            <span className="success-dot" /> All good
          </span>
          <span>TypeScript</span>
        </div>
      </div>
      <div className="scene-note">
        <span className="note-icon">
          <Terminal size={17} />
        </span>
        <div>
          <strong>Ideas into reality.</strong>
          <span>One commit at a time.</span>
        </div>
        <ArrowUpRight size={16} />
      </div>
      <span className="scene-coordinate coordinate-bottom">
        <Command size={11} /> BUILT WITH CURIOSITY
      </span>
    </div>
  );
}
