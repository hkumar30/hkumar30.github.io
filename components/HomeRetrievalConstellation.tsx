'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { retrievalConstellation } from '@/data/siteContent';

type Scenario = (typeof retrievalConstellation.scenarios)[number];
type RetrievalNode = Scenario['nodes'][number];

type NodeStyle = CSSProperties & {
  '--node-x': string;
  '--node-y': string;
};

function getNodeStyle(node: RetrievalNode): NodeStyle {
  return {
    '--node-x': `${node.x}%`,
    '--node-y': `${node.y}%`,
  };
}

export default function HomeRetrievalConstellation() {
  const [scenarioIndex, setScenarioIndex] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
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

        <aside className="retrieval-constellation-panel" aria-live="polite">
          <div className="retrieval-constellation-scenario">
            <span>{scenario.status}</span>
            <p>{scenario.summary}</p>
          </div>

          <dl className="retrieval-constellation-node-detail">
            <div>
              <dt>Selected Source</dt>
              <dd>{selectedNode.title}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{selectedNode.type}</dd>
            </div>
            <div>
              <dt>Score</dt>
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
