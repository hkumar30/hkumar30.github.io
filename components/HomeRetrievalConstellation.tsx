'use client';

import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { retrievalConstellation } from '@/data/siteContent';

type Scenario = (typeof retrievalConstellation.scenarios)[number];
type RetrievalNode = Scenario['nodes'][number];

type NodeStyle = CSSProperties & {
  '--node-x': string;
  '--node-y': string;
};

type OrbitLetterStyle = CSSProperties & {
  '--angle': string;
};

const ORBITS = [
  {
    className: 'retrieval-orbit-dev',
    phrase: 'HARSHK.DEV',
    minCharacters: 58,
  },
  {
    className: 'retrieval-orbit-rag',
    phrase: 'RAG SYSTEMS',
    minCharacters: 58,
  },
] as const;

function getNodeStyle(node: RetrievalNode): NodeStyle {
  return {
    '--node-x': `${node.x}%`,
    '--node-y': `${node.y}%`,
  };
}

function buildOrbitCharacters(phrase: string, minCharacters: number) {
  const segment = `${phrase} \u2022 `;
  const repeatCount = Math.ceil(minCharacters / segment.length);

  return Array.from(segment.repeat(repeatCount));
}

export default function HomeRetrievalConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scenarioIndex, setScenarioIndex] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbitRotate = useTransform(scrollYProgress, [0, 1], ['-18deg', '8deg']);
  const orbitY = useTransform(scrollYProgress, [0, 1], ['1.4rem', '-1.4rem']);
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.14, 0.3, 0.16]);
  const scenario = retrievalConstellation.scenarios[scenarioIndex];

  const selectedNode = useMemo(
    () =>
      scenario.nodes.find((node) => node.id === selectedNodeId) ??
      scenario.nodes[0],
    [scenario.nodes, selectedNodeId],
  );

  const cycleScenario = () => {
    setScenarioIndex((current) =>
      current === retrievalConstellation.scenarios.length - 1 ? 0 : current + 1,
    );
    setSelectedNodeId(null);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="retrieval-constellation"
      className="retrieval-constellation"
      aria-labelledby="retrieval-constellation-title"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="retrieval-constellation-intro">
        <p className="retrieval-constellation-kicker">
          {retrievalConstellation.kicker}
        </p>
        <h2
          id="retrieval-constellation-title"
          aria-label={retrievalConstellation.title}
        >
          {retrievalConstellation.title.split(' ').map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h2>
        <p>{retrievalConstellation.description}</p>
      </div>

      <div className="retrieval-constellation-shell">
        <div className="retrieval-constellation-map-wrap">
          <motion.div
            className="retrieval-orbit-layer"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: orbitOpacity,
                    rotate: orbitRotate,
                    y: orbitY,
                  }
            }
            aria-hidden="true"
          >
            <div className="retrieval-orbit-stage">
              {ORBITS.map((orbit) => {
                const characters = buildOrbitCharacters(
                  orbit.phrase,
                  orbit.minCharacters,
                );

                return (
                  <div
                    key={orbit.phrase}
                    className={`retrieval-orbit-band ${orbit.className}`}
                  >
                    {characters.map((letter, index) => (
                      <span
                        key={`${orbit.phrase}-${index}`}
                        className="retrieval-orbit-letter"
                        style={
                          {
                            '--angle': `${(360 / characters.length) * index}deg`,
                          } as OrbitLetterStyle
                        }
                      >
                        {letter === ' ' ? '\u00a0' : letter}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="retrieval-constellation-map" aria-label="Retrieved document map">
            <svg
              className="retrieval-constellation-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {scenario.nodes.map((node) => (
                <line
                  key={node.id}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  className={node.id === selectedNode.id ? 'is-active' : ''}
                />
              ))}
            </svg>

            <button
              type="button"
              className="retrieval-constellation-core"
              onClick={cycleScenario}
              aria-label={`Current scenario: ${scenario.label}. Click to cycle scenario.`}
            >
              <span>{scenario.label}</span>
              <strong>{scenario.query}</strong>
            </button>

            {scenario.nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={`retrieval-constellation-node ${
                  node.id === selectedNode.id ? 'is-active' : ''
                }`}
                style={getNodeStyle(node)}
                onMouseEnter={() => setSelectedNodeId(node.id)}
                onFocus={() => setSelectedNodeId(node.id)}
                onClick={() => setSelectedNodeId(node.id)}
                aria-pressed={node.id === selectedNode.id}
              >
                <span>{node.title}</span>
                <small>{node.score}</small>
              </button>
            ))}
          </div>
        </div>

        <aside className="retrieval-constellation-panel" aria-live="polite">
          <div className="retrieval-constellation-scenario">
            <span>{scenario.status}</span>
            <p>{scenario.summary}</p>
          </div>

          <dl className="retrieval-constellation-node-detail">
            <div>
              <dt>Selected Signal</dt>
              <dd>{selectedNode.title}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{selectedNode.type}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>{selectedNode.score}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{selectedNode.source}</dd>
            </div>
          </dl>

          <p className="retrieval-constellation-reason">
            {selectedNode.reason}
          </p>

          <p className="retrieval-constellation-diagnosis">
            {scenario.diagnosis}
          </p>
        </aside>
      </div>
    </motion.section>
  );
}
