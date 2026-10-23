import { GraduationCap } from 'lucide-react';
import { useId } from 'react';
import type { Education } from '../features/portfolio/types';

export function EducationSection({ items }: { items?: Education[] }) {
  const headingId = useId();
  if (!items?.length) return null;

  return (
    <section className="education-section" aria-labelledby={headingId}>
      <h3 className="eyebrow" id={headingId}>
        EDUCATION
      </h3>
      <ul className="education-list">
        {items.map((item) => (
          <li className="education-entry" key={item.id}>
            <span className="education-icon">
              <GraduationCap size={20} />
            </span>
            <div>
              <h4>{item.qualification}</h4>
              <p>{item.institution}</p>
              <span className="education-location">{item.location}</span>
              {item.period && (
                <span className="education-period">{item.period}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
