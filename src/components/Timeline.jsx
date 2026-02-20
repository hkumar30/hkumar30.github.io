import { useRef, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import rough from 'roughjs';
import './Timeline.css';

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function TimelineNode({ seed }) {
  const svgRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const rc = rough.svg(svg);
    const circle = rc.circle(10, 10, 14, {
      roughness: 1.5,
      stroke: getCssVar('--blue-pen'),
      strokeWidth: 1.5,
      fill: getCssVar('--paper-bg'),
      fillStyle: 'solid',
      seed,
    });
    svg.appendChild(circle);
  }, [seed, theme]);

  return (
    <svg ref={svgRef} width={20} height={20} className="timeline-node-svg" />
  );
}

function TimelineEntry({ item, index, isLast }) {
  return (
    <div className={`timeline-entry ${isLast ? 'last' : ''}`}>
      <div className="timeline-stem">
        <TimelineNode seed={index + 1} />
        {!isLast && <div className="timeline-line" />}
      </div>
      <div className="timeline-body">
        <div className="timeline-header">
          <h4 className="timeline-role">{item.role || item.degree}</h4>
          <span className="timeline-period">{item.period}</span>
        </div>
        <div className="timeline-company">
          {item.companyLogo && (
            <img src={item.companyLogo} alt="" className="timeline-logo" />
          )}
          <span>{item.company || item.institution || item.organization}</span>
          {item.location && <span className="timeline-location"> · {item.location}</span>}
        </div>
        {item.gpa && (
          <p className="timeline-gpa">
            <span className="highlighter-yellow">GPA: {item.gpa}</span>
          </p>
        )}
        {item.highlights && (
          <ul className="timeline-highlights">
            {item.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Timeline({ title, items }) {
  return (
    <div className="timeline-section">
      <h3 className="timeline-title">{title}</h3>
      <div className="timeline">
        {items.map((item, i) => (
          <TimelineEntry
            key={item.id}
            item={item}
            index={i}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
