'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { retrievalConstellation } from '@/data/siteContent';

type Scenario = (typeof retrievalConstellation.scenarios)[number];
type RetrievalNode = Scenario['nodes'][number];

const STATUS_KEYS = ['healthy', 'drift', 'regression'] as const;

/** Flag the signals that represent the actual failure in a scenario. */
function isRisk(node: RetrievalNode): boolean {
  return /stale|failure|regression|collision/i.test(`${node.type} ${node.title}`);
}

export default function HomeRetrievalConstellation() {
  const [scenarioIndex, setScenarioIndex] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const scenario = retrievalConstellation.scenarios[scenarioIndex];
  const statusKey = STATUS_KEYS[scenarioIndex] ?? 'healthy';

  const rankedNodes = useMemo(
    () =>
      [...scenario.nodes].sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score),
      ),
    [scenario.nodes],
  );

  const selectedNode = useMemo(
    () =>
      rankedNodes.find((node) => node.id === selectedNodeId) ?? rankedNodes[0],
    [rankedNodes, selectedNodeId],
  );

  const topNode = rankedNodes[0];
  const topIsRisk = isRisk(topNode);

  const selectScenario = (index: number) => {
    setScenarioIndex(index);
    setSelectedNodeId(null);
  };

  return (
    <motion.section
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

      {/* Step 1 - pick a scenario */}
      <div className="retrieval-steps">
        <p className="retrieval-step-label">
          <span className="retrieval-step-num">1</span> Pick a scenario
        </p>
        <div
          className="retrieval-scenario-tabs"
          role="tablist"
          aria-label="Retrieval scenarios"
        >
          {retrievalConstellation.scenarios.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === scenarioIndex}
              data-status={STATUS_KEYS[index]}
              className={`retrieval-scenario-tab ${
                index === scenarioIndex ? 'is-active' : ''
              }`}
              onClick={() => selectScenario(index)}
            >
              <span className="retrieval-scenario-tab-dot" aria-hidden="true" />
              <span className="retrieval-scenario-tab-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="retrieval-lab-grid">
        {/* Left - the ranked ledger */}
        <div className="retrieval-ledger">
          <div className="retrieval-query">
            <span className="retrieval-query-label">Query</span>
            <p className="retrieval-query-text">{scenario.query}</p>
          </div>

          <div className="retrieval-ranklist">
            <div className="retrieval-ranklist-head">
              <span className="retrieval-ranklist-title">
                <span className="retrieval-step-num">2</span>
                Retrieved signals - click to inspect
              </span>
              <span className="retrieval-ranklist-unit">Weight</span>
            </div>

            <ul className="retrieval-rank-rows">
              {rankedNodes.map((node, index) => (
                <li key={node.id}>
                  <button
                    type="button"
                    className={`retrieval-rank-row ${
                      node.id === selectedNode.id ? 'is-active' : ''
                    }`}
                    data-risk={isRisk(node) ? 'true' : undefined}
                    onMouseEnter={() => setSelectedNodeId(node.id)}
                    onFocus={() => setSelectedNodeId(node.id)}
                    onClick={() => setSelectedNodeId(node.id)}
                    aria-pressed={node.id === selectedNode.id}
                  >
                    <span className="retrieval-rank-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="retrieval-rank-info">
                      <span className="retrieval-rank-title">
                        {node.title}
                        {isRisk(node) && (
                          <span className="retrieval-rank-flag">risk</span>
                        )}
                      </span>
                      <span className="retrieval-rank-meta">
                        {node.type} · {node.source}
                      </span>
                    </span>
                    <span className="retrieval-rank-bar" aria-hidden="true">
                      <span
                        className="retrieval-rank-bar-fill"
                        style={{ '--w': node.score } as CSSProperties}
                      />
                    </span>
                    <span className="retrieval-rank-score">{node.score}</span>
                  </button>
                </li>
              ))}
            </ul>

            {topIsRisk && (
              <p className="retrieval-ledger-flag">
                Highest-weighted signal is a risk source - ranking alone would
                ship the wrong answer.
              </p>
            )}
          </div>
        </div>

        {/* Right - live readout */}
        <aside className="retrieval-readout" aria-live="polite">
          <div className="retrieval-readout-status">
            <span className="retrieval-status-badge">{scenario.status}</span>
            <p className="retrieval-status-summary">{scenario.summary}</p>
          </div>

          <div className="retrieval-readout-detail">
            <p className="retrieval-readout-kicker">Selected signal</p>
            <h3 className="retrieval-readout-title">{selectedNode.title}</h3>
            <dl className="retrieval-readout-meta">
              <div>
                <dt>Type</dt>
                <dd>{selectedNode.type}</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>{selectedNode.source}</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd>{selectedNode.score}</dd>
              </div>
            </dl>
            <p className="retrieval-readout-reason">{selectedNode.reason}</p>
          </div>

          <div className="retrieval-verdict">
            <span className="retrieval-verdict-label">Verdict</span>
            <p className="retrieval-verdict-text">{scenario.diagnosis}</p>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}
