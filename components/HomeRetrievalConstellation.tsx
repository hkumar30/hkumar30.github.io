'use client';

import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { retrievalConstellation } from '@/data/siteContent';

type Scenario = (typeof retrievalConstellation.scenarios)[number];
type RetrievalNode = Scenario['nodes'][number];

type NodeStyle = CSSProperties & {
  '--node-x': string;
  '--node-y': string;
};

const STATUS_KEYS = ['healthy', 'drift', 'regression'] as const;

function getNodeStyle(node: RetrievalNode): NodeStyle {
  return {
    '--node-x': `${node.x}%`,
    '--node-y': `${node.y}%`,
  };
}

export default function HomeRetrievalConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scenarioIndex, setScenarioIndex] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const scenario = retrievalConstellation.scenarios[scenarioIndex];
  const statusKey = STATUS_KEYS[scenarioIndex] ?? 'healthy';

  const selectedNode = useMemo(
    () =>
      scenario.nodes.find((node) => node.id === selectedNodeId) ??
      scenario.nodes[0],
    [scenario.nodes, selectedNodeId],
  );

  const selectScenario = (index: number) => {
    setScenarioIndex(index);
    setSelectedNodeId(null);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="retrieval-constellation"
      className="retrieval-constellation"
      data-status={statusKey}
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
        <h2 id="retrieval-constellation-title">
          {retrievalConstellation.title}
        </h2>
        <p className="retrieval-constellation-lede">
          {retrievalConstellation.description}
        </p>
      </div>

      {/* Step 1 — pick a scenario */}
      <div className="retrieval-steps">
        <p className="retrieval-step-label">
          <span className="retrieval-step-num">1</span> Pick a scenario
        </p>
        <div className="retrieval-scenario-tabs" role="tablist" aria-label="Retrieval scenarios">
          {retrievalConstellation.scenarios.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === scenarioIndex}
              data-status={STATUS_KEYS[index]}
              className={`retrieval-scenario-tab ${index === scenarioIndex ? 'is-active' : ''}`}
              onClick={() => selectScenario(index)}
            >
              <span className="retrieval-scenario-tab-dot" aria-hidden="true" />
              <span className="retrieval-scenario-tab-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="retrieval-constellation-shell">
        <div className="lab-frame">
          <p className="retrieval-step-label retrieval-step-label--map">
            <span className="retrieval-step-num">2</span> Hover a signal to inspect it
          </p>
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

            <div className="retrieval-constellation-core" aria-hidden="true">
              <span>Query</span>
              <strong>{scenario.query}</strong>
            </div>

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
                <span className="retrieval-node-title">{node.title}</span>
                <span
                  className="retrieval-node-score"
                  style={{ '--node-score': node.score } as CSSProperties}
                >
                  <span className="retrieval-node-score-fill" />
                  <small>{node.score}</small>
                </span>
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
              <dt>Signal</dt>
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

          <p className="retrieval-constellation-reason">{selectedNode.reason}</p>

          <p className="retrieval-constellation-diagnosis">
            <span className="retrieval-diagnosis-label">Verdict</span>
            {scenario.diagnosis}
          </p>
        </aside>
      </div>
    </motion.section>
  );
}
