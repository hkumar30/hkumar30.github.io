import { PageTransition } from '@/components/PageTransition';
import { Metadata } from 'next';
import HomeRetrievalConstellation from '@/components/HomeRetrievalConstellation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Lab | Harsh Kumar',
  description: 'Interactive experiments in RAG systems, vector search, and AI infrastructure.',
};

export default function LabPage() {
  return (
    <PageTransition className="lab-shell">
      {/* Lab Header */}
      <section className="lab-header" data-cursor-accent="--signature-blue">
        <span className="section-marker">प्रयोगशाला</span>
        
        <div className="lab-header-content">
          <p className="lab-kicker">Behind the scenes</p>
          <h1 className="lab-title">
            <span>Interactive</span>
            <span>Lab</span>
          </h1>
          <p className="lab-intro">
            Production systems are <em>invisible</em> by design — they just work. 
            This is where I make the invisible <span className="lab-highlight">visible</span>.
          </p>
        </div>
        
        <div className="lab-meta-box">
          <span className="lab-meta-label">Currently exploring</span>
          <span className="lab-meta-value">RAG pipeline observability</span>
        </div>
      </section>
      
      {/* The Constellation */}
      <Suspense fallback={<div className="lab-loading">Loading visualization...</div>}>
        <HomeRetrievalConstellation />
      </Suspense>
      
      {/* Lab Notes */}
      <section className="lab-notes">
        <h2 className="lab-notes-title">Field Notes</h2>
        <div className="lab-notes-grid">
          <article className="lab-note-box">
            <h3>On Retrieval Augmentation</h3>
            <p>The best RAG systems do not retrieve more — they retrieve <em>better</em>.</p>
          </article>
          <article className="lab-note-box">
            <h3>On Vector Search</h3>
            <p>Similarity is a proxy for meaning. Proxies fail. Design for failure.</p>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
