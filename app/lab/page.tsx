import { PageTransition } from '@/components/PageTransition';
import { Metadata } from 'next';
import HomeRetrievalConstellation from '@/components/HomeRetrievalConstellation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Lab | Harsh Kumar',
  description: 'Interactive experiments in RAG systems, vector search, and AI infrastructure.',
};

const fieldNotes = [
  {
    title: 'On Retrieval Augmentation',
    body: 'The best RAG systems do not retrieve more - they retrieve better.',
  },
  {
    title: 'On Vector Search',
    body: 'Similarity is a proxy for meaning. Proxies fail. Design for failure.',
  },
];

export default function LabPage() {
  return (
    <PageTransition className="lab-shell">
      <Suspense fallback={<div className="lab-loading">Loading visualization…</div>}>
        <HomeRetrievalConstellation />
      </Suspense>

      <section className="lab-notes" aria-label="Field notes">
        <p className="lab-notes-kicker">Field Notes</p>
        <div className="lab-notes-grid">
          {fieldNotes.map((note) => (
            <article key={note.title} className="lab-note-box">
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
