import './Notebook.css';

const TAB_COLORS = ['#fce94f', '#64b5f6', '#81c784', '#f48fb1', '#ffb74d'];

export default function Notebook({ children, tabs, activePage, onNavigate }) {
  return (
    <div className="notebook-outer">
      <div className="notebook-cover">
        {/* Spine */}
        <div className="notebook-spine" />

        {/* Page */}
        <div className="notebook-page">
          <div className="notebook-margin" />
          <div className="notebook-content">{children}</div>
        </div>

        {/* Dog-ear */}
        <div className="notebook-dogear" />
      </div>

      {/* Tabs sitting outside the cover on the right */}
      <nav className="notebook-tabs" aria-label="Page navigation">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            className={`notebook-tab ${activePage === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            aria-current={activePage === tab.id ? 'page' : undefined}
            style={{ '--tab-color': TAB_COLORS[i % TAB_COLORS.length] }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Mobile bottom tabs */}
      <nav className="notebook-tabs-mobile" aria-label="Page navigation">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            className={`notebook-tab-mobile ${activePage === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            aria-current={activePage === tab.id ? 'page' : undefined}
            style={{ '--tab-color': TAB_COLORS[i % TAB_COLORS.length] }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
