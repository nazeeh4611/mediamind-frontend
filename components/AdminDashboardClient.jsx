// components/AdminDashboardClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/components/Admincontext';

const CATEGORY_LABELS = {
  branding: 'Branding', seo: 'SEO', web: 'Web Dev',
  performance: 'Paid Ads', social: 'Social Media',
  creative: 'Creative', production: 'Production', pr: 'PR',
};

const CATEGORY_ACCENT = {
  branding: '#4f8ef7', seo: '#9b6dff', web: '#e040a0',
  performance: '#4f8ef7', social: '#e040a0', creative: '#9b6dff',
  production: '#4f8ef7', pr: '#e040a0',
};

const STAT_CONFIG = [
  { key: 'total', label: 'Total Works', icon: '◈', accent: '#c470e8', sub: 'All projects' },
  { key: 'published', label: 'Published', icon: '●', accent: '#4ade80', sub: 'Live on site' },
  { key: 'draft', label: 'Drafts', icon: '○', accent: '#fbbf24', sub: 'Not published' },
  { key: 'categories', label: 'Categories', icon: '▦', accent: '#4f8ef7', sub: 'Active types' },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

export default function AdminDashboardClient() {
  const { api, admin } = useAdmin();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/works/admin/all')
      .then(data => setWorks(Array.isArray(data) ? data : []))
      .catch(() => setWorks([]))
      .finally(() => setLoading(false));
  }, [api]);

  const published = works.filter(w => w.isPublished).length;
  const draft = works.filter(w => !w.isPublished).length;
  const categories = [...new Set(works.map(w => w.category))].length;
  const recent = [...works].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const catCounts = works.reduce((acc, w) => { acc[w.category] = (acc[w.category] || 0) + 1; return acc; }, {});
  const statValues = { total: works.length, published, draft, categories };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .stat-card { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .stat-card:hover { transform: translateY(-4px) scale(1.01); background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.12) !important; }
        .work-row { transition: background 0.15s; cursor: default; border-radius: 12px; margin: 0 0.5rem; }
        .work-row:hover { background: rgba(255,255,255,0.03) !important; }
        .cat-bar-fill { transition: width 1.2s cubic-bezier(0.16,1,0.3,1); }
        .quick-btn { transition: all 0.2s; }
        .quick-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .edit-link { transition: all 0.15s; }
        @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .dash-grid { grid-template-columns: 1fr !important; } .stats-grid { grid-template-columns: 1fr !important; } div { padding: 1rem; } }
      `}</style>

      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: '#666', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.5rem' }}>
          {greeting}, {admin?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Here's your portfolio at a glance.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {STAT_CONFIG.map((s) => {
          const rgb = hexToRgb(s.accent);
          return (
            <div key={s.key} className="stat-card" style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '12px',
                  background: `rgba(${rgb},0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.accent, fontSize: '1.1rem',
                }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '2.2rem', color: '#fff', lineHeight: 1, marginBottom: '0.35rem', letterSpacing: '-0.04em', fontFamily: 'DM Mono, monospace' }}>
                {loading ? '—' : statValues[s.key]}
              </div>
              <div style={{ color: '#999', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.2rem' }}>{s.label}</div>
              <div style={{ color: '#555', fontSize: '0.7rem', fontFamily: 'DM Mono, monospace' }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#e0e0e0', letterSpacing: '-0.01em' }}>Recent Works</h2>
            <Link href="/admin/works" style={{ color: '#e040a0', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>Loading works...</div>
          ) : recent.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>◈</div>
              <p style={{ color: '#666', marginBottom: '1rem' }}>No works yet</p>
              <Link href="/admin/works/new" style={{ color: '#e040a0', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Add your first work →</Link>
            </div>
          ) : (
            <div>
              {recent.map((w, i) => {
                const accent = CATEGORY_ACCENT[w.category] || '#e040a0';
                return (
                  <div key={w._id} className="work-row" style={{ padding: '1rem 1.5rem', borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                      background: w.featuredImage?.url
                        ? `url(${w.featuredImage.url}) center/cover`
                        : `rgba(${hexToRgb(accent)},0.15)`,
                      border: `1px solid rgba(${hexToRgb(accent)},0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', color: accent,
                    }}>
                      {!w.featuredImage?.url && '◈'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e8e8e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.3rem' }}>{w.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px', background: `rgba(${hexToRgb(accent)},0.15)`, color: accent, textTransform: 'uppercase' }}>
                          {CATEGORY_LABELS[w.category] || w.category}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: w.isPublished ? '#4ade80' : '#fbbf24', fontWeight: 600 }}>
                          {w.isPublished ? '● Live' : '○ Draft'}
                        </span>
                      </div>
                    </div>
                    <Link href={`/admin/works/${w._id}/edit`} className="edit-link" style={{ color: '#666', fontSize: '0.75rem', textDecoration: 'none', padding: '0.35rem 0.8rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', whiteSpace: 'nowrap' }}>
                      Edit
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '1.5rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#e0e0e0', marginBottom: '1.25rem' }}>By Category</h2>
            {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
              const count = catCounts[cat] || 0;
              const pct = works.length ? (count / works.length) * 100 : 0;
              const accent = CATEGORY_ACCENT[cat] || '#e040a0';
              return (
                <div key={cat} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>{label}</span>
                    <span style={{ color: '#aaa', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'DM Mono, monospace' }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="cat-bar-fill" style={{ height: '100%', width: `${pct}%`, background: accent, borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(224,64,160,0.08), rgba(155,64,224,0.08))', border: '1px solid rgba(224,64,160,0.2)', borderRadius: '24px', padding: '1.5rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#e0e0e0', marginBottom: '1rem' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/admin/works/new" className="quick-btn" style={{ padding: '0.8rem 1rem', background: 'linear-gradient(135deg, #e040a0, #9b40e0)', color: '#fff', borderRadius: '14px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', boxShadow: '0 4px 20px rgba(224,64,160,0.3)' }}>
                + Add New Work
              </Link>
              <Link href="/admin/works" className="quick-btn" style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', color: '#ccc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, textAlign: 'center' }}>
                Manage All Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}