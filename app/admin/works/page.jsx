// app/admin/works/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../../../components/Admincontext';

const CATEGORY_LABELS = {
  branding: 'Branding', seo: 'SEO', web: 'Web Dev',
  performance: 'Paid Ads', social: 'Social Media',
  creative: 'Creative', production: 'Production', pr: 'PR',
};

const CATEGORY_PALETTE = {
  branding:   { bg: '#1a1a2e', accent: '#4f8ef7', label: '#7eb8ff' },
  seo:        { bg: '#1e1a2e', accent: '#9b6dff', label: '#b89bff' },
  web:        { bg: '#2e1a28', accent: '#e040a0', label: '#f06ec0' },
  performance:{ bg: '#1a1a2e', accent: '#4f8ef7', label: '#7eb8ff' },
  social:     { bg: '#2e1a28', accent: '#e040a0', label: '#f06ec0' },
  creative:   { bg: '#1e1a2e', accent: '#9b6dff', label: '#b89bff' },
  production: { bg: '#1a1a2e', accent: '#4f8ef7', label: '#7eb8ff' },
  pr:         { bg: '#2e1a28', accent: '#e040a0', label: '#f06ec0' },
};

export default function AdminWorks() {
  const { api } = useAdmin();
  const router = useRouter();
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
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }

        .search-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #e0e0e0;
          font-size: 0.9rem;
          outline: none;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          transition: all 0.2s;
          width: 100%;
        }
        .search-input:focus { border-color: rgba(224,64,160,0.5); background: rgba(224,64,160,0.05); }
        .search-input::placeholder { color: #555; }

        .filter-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #ccc;
          font-size: 0.85rem;
          outline: none;
          padding: 0.8rem 2rem 0.8rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
        .filter-select:focus { border-color: rgba(224,64,160,0.4); }
        .filter-select option { background: #1a1a1a; color: #fff; }

        .work-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.25s ease;
        }
        .work-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

        .action-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          cursor: pointer;
          padding: 0.4rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .edit-btn { color: #c470e8; }
        .edit-btn:hover { background: rgba(196,112,232,0.1); border-color: rgba(196,112,232,0.4); }
        .del-btn { color: #f06070; }
        .del-btn:hover { background: rgba(240,96,112,0.1); border-color: rgba(240,96,112,0.4); }

        .skeleton { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }

        .toast { animation: slideIn 0.25s ease forwards; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .modal-content {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 28px;
          padding: 2rem;
          max-width: 420px;
          width: 100%;
        }

        .add-btn {
          padding: 0.7rem 1.5rem;
          background: linear-gradient(135deg, #e040a0, #9b40e0);
          color: #fff;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(224,64,160,0.3);
          transition: all 0.2s;
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(224,64,160,0.4); }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.5rem 1rem;
          color: #ccc;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
        }
        .back-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        @media (max-width: 768px) {
          .header-row { flex-direction: column !important; align-items: flex-start !important; }
          .filters-row { flex-direction: column !important; }
          .filters-row > div { width: 100% !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          div { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>

      {toast && (
        <div className="toast" style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 1001, padding: '0.8rem 1.2rem', borderRadius: '14px', background: toast.type === 'error' ? '#dc2626' : '#10b981', color: '#fff', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 4px 15px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.type === 'error' ? '⚠' : '✓'} {toast.msg}
        </div>
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ width: 56, height: 56, borderRadius: '18px', background: 'rgba(240,96,112,0.15)', border: '1px solid rgba(240,96,112,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>🗑</div>
            <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Delete this work?</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              <strong style={{ color: '#ccc' }}>"{confirmDelete.title}"</strong> will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: '#999', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete._id)} disabled={deleting === confirmDelete._id} style={{ flex: 1, padding: '0.7rem', background: 'rgba(240,96,112,0.2)', border: '1px solid rgba(240,96,112,0.4)', borderRadius: '14px', color: '#f06070', cursor: 'pointer', fontWeight: 700 }}>
                {deleting === confirmDelete._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => router.push('/admin/')} className="back-btn">
          <span style={{ fontSize: '1.1rem' }}>←</span>
          Back to Dashboard
        </button>
      </div>

      <div className="header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <p style={{ color: '#666', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', fontFamily: 'DM Mono, monospace' }}>Portfolio</p>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>Works</h1>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.3rem' }}>{works.length} total projects</p>
        </div>
        <Link href="/admin/works/new" className="add-btn">
          <span style={{ fontSize: '1.2rem' }}>+</span> Add Work
        </Link>
      </div>

      <div className="filters-row" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666', fontSize: '1rem' }}>🔍</span>
          <input className="search-input" placeholder="Search by title or client..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ minWidth: '160px' }}>
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ minWidth: '140px' }}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ height: 180, background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ height: 14, width: '70%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: '0.5rem' }} />
                <div style={{ height: 11, width: '50%', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>◈</div>
          <p style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>{search ? 'No matching works found' : 'No works yet'}</p>
          {!search && <Link href="/admin/works/new" style={{ color: '#e040a0', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Create your first work →</Link>}
        </div>
      ) : (
        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.25rem' }}>
          {filtered.map(work => {
            const palette = CATEGORY_PALETTE[work.category] || CATEGORY_PALETTE.web;
            return (
              <div key={work._id} className="work-card">
                <div style={{ height: 190, position: 'relative', background: work.featuredImage?.url ? `url(${work.featuredImage.url}) center/cover` : `linear-gradient(135deg, ${palette.bg}, #000)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!work.featuredImage?.url && <span style={{ fontSize: '2.5rem', opacity: 0.2, color: palette.accent }}>◈</span>}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }} />
                  <div style={{ position: 'absolute', top: '0.8rem', left: '0.8rem' }}>
                    <span style={{ padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: palette.label, border: `1px solid ${palette.accent}66`, textTransform: 'uppercase' }}>
                      {CATEGORY_LABELS[work.category] || work.category}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem' }}>
                    <span style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: work.isPublished ? '#4ade80' : '#fbbf24' }}>
                      {work.isPublished ? '● Live' : '○ Draft'}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#e8e8e8', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{work.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.75rem', marginBottom: '0.75rem', fontFamily: 'DM Mono, monospace' }}>{work.client} · {work.year}</p>
                  <p style={{ color: '#777', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{work.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem' }}>
                    <button className="action-btn edit-btn" onClick={() => router.push(`/admin/works/${work._id}/edit`)}>✎ Edit</button>
                    <button className="action-btn del-btn" onClick={() => setConfirmDelete(work)}>✕ Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}