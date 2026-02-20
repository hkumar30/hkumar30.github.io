import { useState } from 'react';
import { RoughBox, RoughLine } from '../components/RoughBox';
import { blogPosts, blogTags } from '../data/blogPosts';
import './BlogPage.css';

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter((post) => {
    const matchesTag = activeTag === 'all' || post.tags.includes(activeTag);
    const matchesSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="blog-page">
      <h2>Blog</h2>
      <p className="blog-subtitle font-caveat text-pencil">
        Thoughts on algorithms, engineering, and building things.
      </p>

      {/* Search */}
      <div className="blog-search">
        <span className="blog-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="blog-search-input"
        />
      </div>

      {/* Tags */}
      <div className="blog-tags">
        {blogTags.map((tag) => (
          <button
            key={tag}
            className={`blog-tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="blog-list">
        {filtered.length === 0 && (
          <p className="blog-empty text-pencil font-caveat">No posts match your search.</p>
        )}
        {filtered.map((post, i) => (
          <div key={post.id}>
            <article className="blog-post-card">
              <div className="blog-post-header">
                <h3 className="blog-post-title">{post.title}</h3>
                <time className="blog-post-date">{formatDate(post.date)}</time>
              </div>
              <div className="blog-post-tags">
                {post.tags.map((t) => (
                  <span key={t} className="blog-post-tag">{t}</span>
                ))}
              </div>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <span className="blog-post-cta font-caveat text-pencil">
                Coming soon...
              </span>
            </article>
            {i < filtered.length - 1 && <RoughLine seed={i + 30} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
