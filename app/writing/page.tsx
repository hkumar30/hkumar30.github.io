import { PageTransition, SectionTransition } from '@/components/PageTransition';
import SectionDivider from '@/components/SectionDivider';
import { writingPosts } from '@/data/writing';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function WritingPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <span className="section-label">Writing</span>
        <h1 className="route-heading">Writing</h1>
        <p className="route-copy">Thoughts on algorithms, engineering, and building things.</p>
      </section>

      <SectionTransition>
        <div className="writing-list">
          {writingPosts.map((post) => (
            <article key={post.id} className="writing-item">
              <p className="writing-date section-label">{formatDate(post.date)}</p>
              <h2 className="writing-title font-garamond">{post.title}</h2>
              <p className="writing-excerpt">{post.excerpt}</p>
              <p className="writing-reading-time section-label">{post.readingTime}</p>
            </article>
          ))}
        </div>
      </SectionTransition>

      <SectionTransition>
        <SectionDivider label="Pages" />
        <nav className="writing-pagination" aria-label="Pagination">
          <a href="/writing?page=1" className="active-nav-link">
            1
          </a>
        </nav>
      </SectionTransition>
    </PageTransition>
  );
}
