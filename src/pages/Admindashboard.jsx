import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../components/Admincontext';

const CATEGORY_LABELS = {
  branding: 'Branding',
  seo: 'SEO',
  web: 'Web Dev',
  performance: 'Paid Ads',
  social: 'Social Media',
  creative: 'Creative',
  production: 'Production',
  pr: 'PR',
};

const CATEGORY_COLORS = {
  branding: '#185EA7',
  seo: '#814B97',
  web: '#B2278C',
  performance: '#185EA7',
  social: '#B2278C',
  creative: '#814B97',
  production: '#185EA7',
  pr: '#B2278C',
};

export default function AdminDashboard() {
  const { api, admin } = useAdmin();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/works/admin/all')
      .then(data => setWorks(Array.isArray(data) ? data : []))
      .catch(() => setWorks([]))
      .finally(() => setLoading(false));
  }, []);

  const published = works.filter(w => w.isPublished).length;
  const draft = works.filter(w => !w.isPublished).length;
  const categories = [...new Set(works.map(w => w.category))].length;
  const recent = [...works].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const catCounts = works.reduce((acc, w) => { acc[w.category] = (acc[w.category] || 0) + 1; return acc; }, {});

  const stats = [
    { label: 'Total Works', value: works.length, icon: '◈', color: '#B2278C', sub: 'All projects' },
    { label: 'Published', value: published, icon: '✓', color: '#22c55e', sub: 'Live on site' },
    { label: 'Drafts', value: draft, icon: '○', color: '#f59e0b', sub: 'Not published' },
    { label: 'Categories', value: categories, icon: '▦', color: '#185EA7', sub: 'Active types' },
  ];

  return (
    <div>
      <style>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .stat-card { transition: all 0.25s; cursor: default; }
        .stat-card:hover { transform: translateY(-3px); }
        .work-row { transition: background 0.2s; }
        .work-row:hover { background: rgba(255,255,255,0.03) !important; }
        .action-btn { transition: all 0.2s; text-decoration: none; }
        .action-btn:hover { transform: translateY(-2px); }
        @media (max-width:768px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } .dash-grid { grid-template-columns: 1fr !important; } }
        @media (max-width:480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontWeight: 600, fontSize: '1.6rem', color: '#fff', marginBottom: '0.25rem' }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {admin?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#555', fontSize: '0.88rem' }}>Here's what's happening with your portfolio.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: '1.4rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${s.color}66, transparent)` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: `rgba(${s.color === '#B2278C' ? '178,39,140' : s.color === '#22c55e' ? '34,197,94' : s.color === '#f59e0b' ? '245,158,11' : '24,94,167'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '0.9rem', fontWeight: 700 }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '2rem', color: '#fff', lineHeight: 1, marginBottom: '0.2rem' }}>
              {loading ? '—' : s.value}
            </div>
            <div style={{ color: '#aaa', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.15rem' }}>{s.label}</div>
            <div style={{ color: '#444', fontSize: '0.72rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.25rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>Recent Works</h2>
            <Link to="/admin/works" style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>View all →</Link>
          </div>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#444' }}>Loading…</div>
          ) : recent.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
              <p style={{ color: '#555', fontSize: '0.88rem', marginBottom: '1rem' }}>No works yet</p>
              <Link to="/admin/works/new" style={{ color: '#B2278C', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Add your first work →</Link>
            </div>
          ) : (
            <div>
              {recent.map((w, i) => (
                <div key={w._id} className="work-row" style={{ padding: '1rem 1.5rem', borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '10px', background: w.featuredImage?.url ? `url(${w.featuredImage.url}) center/cover` : `rgba(${CATEGORY_COLORS[w.category] === '#B2278C' ? '178,39,140' : '24,94,167'},0.15)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: CATEGORY_COLORS[w.category] || '#B2278C' }}>
                    {!w.featuredImage?.url && '◈'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.2rem' }}>{w.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '50px', background: `rgba(${CATEGORY_COLORS[w.category] === '#B2278C' ? '178,39,140' : '24,94,167'},0.15)`, color: CATEGORY_COLORS[w.category] || '#B2278C' }}>
                        {CATEGORY_LABELS[w.category] || w.category}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: w.isPublished ? '#22c55e' : '#f59e0b', fontWeight: 600 }}>
                        {w.isPublished ? '● Published' : '○ Draft'}
                      </span>
                    </div>
                  </div>
                  <Link to={`/admin/works/${w._id}/edit`} style={{ color: '#555', fontSize: '0.78rem', textDecoration: 'none', padding: '0.35rem 0.75rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontWeight: 500, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(178,39,140,0.4)'; e.currentTarget.style.color = '#B2278C'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#555'; }}
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '1.25rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', marginBottom: '1rem' }}>By Category</h2>
            {Object.keys(CATEGORY_LABELS).map(cat => {
              const count = catCounts[cat] || 0;
              const pct = works.length ? (count / works.length) * 100 : 0;
              return (
                <div key={cat} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#888', fontSize: '0.78rem' }}>{CATEGORY_LABELS[cat]}</span>
                    <span style={{ color: '#aaa', fontSize: '0.78rem', fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: CATEGORY_COLORS[cat] || '#B2278C', borderRadius: '4px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: 'rgba(178,39,140,0.06)', border: '1px solid rgba(178,39,140,0.2)', borderRadius: '18px', padding: '1.25rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: '0.75rem' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link to="/admin/works/new" className="action-btn" style={{ padding: '0.7rem 1rem', background: '#B2278C', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                + Add New Work
              </Link>
              <Link to="/admin/works" className="action-btn" style={{ padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.04)', color: '#aaa', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, textAlign: 'center' }}>
                Manage Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}