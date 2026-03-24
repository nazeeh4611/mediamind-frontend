import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../components/Admincontext';

const CATEGORY_LABELS = {
  branding: 'Branding', seo: 'SEO', web: 'Web Dev',
  performance: 'Paid Ads', social: 'Social Media',
  creative: 'Creative', production: 'Production', pr: 'PR',
};
const CATEGORY_COLORS = {
  branding: '#185EA7', seo: '#814B97', web: '#B2278C',
  performance: '#185EA7', social: '#B2278C', creative: '#814B97',
  production: '#185EA7', pr: '#B2278C',
};
const colorRgb = { '#B2278C': '178,39,140', '#185EA7': '24,94,167', '#814B97': '129,75,151' };

export default function AdminWorks() {
  const { api } = useAdmin();
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchWorks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get('/works/admin/all');
      setWorks(Array.isArray(data) ? data : []);
    } catch { setWorks([]); }
    finally { setLoading(false); }
  }, [api]);

  useEffect(() => { fetchWorks(); }, [fetchWorks]);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await api.delete(`/works/${id}`);
      setWorks(prev => prev.filter(w => w._id !== id));
      showToast('Work deleted successfully');
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const filtered = works.filter(w => {
    const matchSearch = !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.client?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || w.category === filterCat;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'published' ? w.isPublished : !w.isPublished);
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div>
      <style>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .aw-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; color: #fff; font-size: 0.85rem; outline: none; padding: 0.65rem 1rem; transition: all 0.2s; }
        .aw-input:focus { border-color: rgba(178,39,140,0.5); background: rgba(178,39,140,0.04); }
        .aw-select { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; color: #aaa; font-size: 0.82rem; outline: none; padding: 0.65rem 1rem; cursor: pointer; }
        .work-card { transition: all 0.25s; }
        .work-card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-2px); }
        .icon-btn { background: none; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; cursor: pointer; padding: 0.4rem 0.75rem; font-size: 0.78rem; transition: all 0.2s; }
        .icon-btn:hover { background: rgba(255,255,255,0.06); }
        @keyframes fadein { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .toast { animation: fadein 0.3s ease; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdropFilter: blur(6px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        @media (max-width:640px) { .filters-row { flex-direction: column !important; } .aw-input,.aw-select { width: 100% !important; } }
      `}</style>

      {toast && (
        <div className="toast" style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 999, padding: '0.85rem 1.25rem', borderRadius: '12px', background: toast.type === 'error' ? 'rgba(220,50,50,0.9)' : 'rgba(34,197,94,0.9)', color: '#fff', fontSize: '0.85rem', fontWeight: 600, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.type === 'error' ? '⚠' : '✓'} {toast.msg}
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0f0f1a', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '20px', padding: '2rem', maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗑</div>
            <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Delete Work?</h3>
            <p style={{ color: '#777', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "<strong style={{ color: '#ccc' }}>{confirmDelete.title}</strong>" will be permanently deleted along with its images.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '0.7rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#aaa', cursor: 'pointer', fontWeight: 500 }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete._id)} disabled={deleting === confirmDelete._id} style={{ padding: '0.7rem 1.5rem', background: '#dc2626', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 600, opacity: deleting === confirmDelete._id ? 0.6 : 1 }}>
                {deleting === confirmDelete._id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', marginBottom: '0.2rem' }}>Works</h1>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>{works.length} total projects</p>
        </div>
        <Link to="/admin/works/new" style={{ padding: '0.7rem 1.5rem', background: '#B2278C', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(178,39,140,0.3)', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Add Work
        </Link>
      </div>

      <div className="filters-row" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="aw-input" placeholder="Search by title or client…" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
        <select className="aw-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="aw-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', animation: 'shimmer 1.5s infinite', animationDelay: `${i*0.1}s` }}>
              <div style={{ height: 160, background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ height: 14, width: '70%', background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginBottom: '0.6rem' }} />
                <div style={{ height: 10, width: '45%', background: 'rgba(255,255,255,0.04)', borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ color: '#555', marginBottom: '0.5rem' }}>{search ? 'No results found' : 'No works yet'}</p>
          {!search && <Link to="/admin/works/new" style={{ color: '#B2278C', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>Add your first work →</Link>}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1rem' }}>
          {filtered.map(work => {
            const color = CATEGORY_COLORS[work.category] || '#B2278C';
            const rgb = colorRgb[color] || '178,39,140';
            return (
              <div key={work._id} className="work-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden' }}>
                <div style={{ height: 160, position: 'relative', background: work.featuredImage?.url ? `url(${work.featuredImage.url}) center/cover` : `linear-gradient(135deg, rgba(${rgb},0.2), rgba(${rgb},0.05))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!work.featuredImage?.url && <span style={{ fontSize: '2.5rem', opacity: 0.5 }}>🖼</span>}
                  <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', display: 'flex', gap: '0.4rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color, border: `1px solid rgba(${rgb},0.4)` }}>
                      {CATEGORY_LABELS[work.category] || work.category}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: work.isPublished ? '#22c55e' : '#f59e0b' }}>
                      {work.isPublished ? '● Live' : '○ Draft'}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.1rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {work.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    {work.client} · {work.year}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.55, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {work.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="icon-btn" onClick={() => navigate(`/admin/works/${work._id}/edit`)} style={{ color: '#B2278C', borderColor: 'rgba(178,39,140,0.25)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(178,39,140,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      ✎ Edit
                    </button>
                    <button className="icon-btn" onClick={() => setConfirmDelete(work)} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes shimmer{0%,100%{opacity:.4}50%{opacity:.8}}`}</style>
    </div>
  );
}