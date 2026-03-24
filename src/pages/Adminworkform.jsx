import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../components/Admincontext';

const CATEGORIES = [
  { value: 'branding', label: 'Logo & Branding' },
  { value: 'seo', label: 'SEO' },
  { value: 'web', label: 'Website Development' },
  { value: 'performance', label: 'Google & Meta Ads' },
  { value: 'social', label: 'Social Media Marketing' },
  { value: 'creative', label: 'Graphic Design' },
  { value: 'production', label: 'NFC Solutions' },
  { value: 'pr', label: 'PR & Communications' },
];

const EMPTY = {
  title: '',
  slug: '',
  category: '',
  client: '',
  year: new Date().getFullYear().toString(),
  description: '',
  results: '',
  tags: '',
  liveUrl: '',
  isPublished: true,
  instagramReel: {
    type: 'reel',
    url: '',
    thumbnail: null
  },
  caseStudy: {
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    testimonial: {
      quote: '',
      author: '',
      position: ''
    }
  },
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  }
};

const inp = (err) => ({
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  background: err ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.04)',
  border: `1px solid ${err ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
  color: '#fff',
  fontSize: '0.875rem',
  outline: 'none',
  boxSizing: 'border-box',
});

const ta = (err) => ({ ...inp(err), resize: 'vertical', lineHeight: 1.6 });
const sel = { ...inp(), cursor: 'pointer' };
const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' };
const cardTitle = { fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: '1.25rem', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.06)' };

function F({ label, required, hint, error, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#999', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {label}{required && <span style={{ color: '#B2278C' }}>*</span>}
        {hint && <span style={{ color: '#555', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' }}>— {hint}</span>}
      </label>
      {children}
      {error && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  );
}

const TABS = [
  { id: 'basic', label: '① Basic' },
  { id: 'media', label: '② Media' },
  { id: 'case', label: '③ Case Study' },
  { id: 'seo', label: '④ SEO' },
];

export default function AdminWorkForm() {
  const { id } = useParams();
  const isEdit = Boolean(id) && id !== 'new';
  const { api } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [featuredFile, setFeaturedFile] = useState(null);
  const [featuredPreview, setFeaturedPreview] = useState('');
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState('');
  const [tab, setTab] = useState('basic');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [toast, setToast] = useState(null);
  const featuredRef = useRef();
  const thumbRef = useRef();

  const setField = (path, value) => {
    setForm(prev => {
      const keys = path.split('.');
      const newForm = { ...prev };
      let current = newForm;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newForm;
    });
  };

  const getField = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], form);
  };

  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const toast$ = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/works/admin/${id}`)
      .then(d => {
        setForm({
          title: d.title || '',
          slug: d.slug || '',
          category: d.category || '',
          client: d.client || '',
          year: d.year || '',
          description: d.description || '',
          results: Array.isArray(d.results) ? d.results.join(', ') : '',
          tags: Array.isArray(d.tags) ? d.tags.join(', ') : '',
          liveUrl: d.liveUrl || '',
          isPublished: d.isPublished !== false,
          instagramReel: {
            type: d.instagramReel?.type || 'reel',
            url: d.instagramReel?.url || '',
            thumbnail: null
          },
          caseStudy: {
            overview: d.caseStudy?.overview || '',
            challenge: d.caseStudy?.challenge || '',
            solution: d.caseStudy?.solution || '',
            results: d.caseStudy?.results || '',
            testimonial: {
              quote: d.caseStudy?.testimonial?.quote || '',
              author: d.caseStudy?.testimonial?.author || '',
              position: d.caseStudy?.testimonial?.position || ''
            }
          },
          seo: {
            metaTitle: d.seo?.metaTitle || '',
            metaDescription: d.seo?.metaDescription || '',
            keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords.join(', ') : ''
          }
        });
        if (d.featuredImage?.url) setFeaturedPreview(d.featuredImage.url);
        if (d.instagramReel?.thumbnail?.url) setThumbPreview(d.instagramReel.thumbnail.url);
      })
      .catch(() => toast$('Failed to load', 'error'))
      .finally(() => setFetching(false));
  }, [id, isEdit, api]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.client.trim()) e.client = 'Required';
    if (!form.year.trim()) e.year = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast$('Fix required fields', 'error'); return; }
    setSaving(true);
    const fd = new FormData();
    fd.append('title', form.title.trim());
    fd.append('slug', form.slug || slugify(form.title));
    fd.append('category', form.category);
    fd.append('client', form.client.trim());
    fd.append('year', form.year.trim());
    fd.append('description', form.description.trim());
    fd.append('isPublished', form.isPublished);
    if (form.liveUrl.trim()) fd.append('liveUrl', form.liveUrl.trim());
    
    if (form.results.trim()) {
      form.results.split(',').map(r => r.trim()).filter(Boolean).forEach(r => fd.append('results', r));
    }
    
    if (form.tags.trim()) {
      form.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => fd.append('tags', t));
    }
    
    if (form.instagramReel.url.trim()) {
      fd.append('reelType', form.instagramReel.type);
      fd.append('reelUrl', form.instagramReel.url.trim());
      if (thumbFile) fd.append('reelThumbnail', thumbFile);
    }
    
    fd.append('caseStudy', JSON.stringify({
      overview: form.caseStudy.overview,
      challenge: form.caseStudy.challenge,
      solution: form.caseStudy.solution,
      results: form.caseStudy.results,
      testimonial: {
        quote: form.caseStudy.testimonial.quote,
        author: form.caseStudy.testimonial.author,
        position: form.caseStudy.testimonial.position
      }
    }));
    
    fd.append('seo', JSON.stringify({
      metaTitle: form.seo.metaTitle,
      metaDescription: form.seo.metaDescription,
      keywords: form.seo.keywords.split(',').map(k => k.trim()).filter(Boolean)
    }));
    
    if (featuredFile) fd.append('featuredImage', featuredFile);
    
    try {
      if (isEdit) {
        await api.put(`/works/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast$('Saved!');
      } else {
        await api.post('/works', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast$('Created!');
        setTimeout(() => navigate('/admin/works'), 1200);
      }
    } catch (err) {
      toast$(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (fetching) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 260, color: '#666' }}>
      <div style={{ width: 28, height: 28, border: '2px solid rgba(178,39,140,0.3)', borderTopColor: '#B2278C', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div>
      <style>{`
        *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        input,select,textarea{font-family:inherit!important}
        input:focus,select:focus,textarea:focus{outline:none;border-color:rgba(178,39,140,0.5)!important;box-shadow:0 0 0 3px rgba(178,39,140,0.08)}
        select option{background:#111;color:#fff}
        .dz{border:2px dashed rgba(255,255,255,0.09);border-radius:12px;padding:1.75rem;text-align:center;cursor:pointer;transition:all 0.2s;color:#666}
        .dz:hover{border-color:rgba(178,39,140,0.4);background:rgba(178,39,140,0.03);color:#999}
        .tb{padding:0.45rem 1rem;border-radius:50px;border:1px solid rgba(255,255,255,0.08);background:none;color:#555;font-size:0.8rem;cursor:pointer;transition:all 0.2s}
        .tb.on{background:rgba(178,39,140,0.12);border-color:rgba(178,39,140,0.3);color:#B2278C;font-weight:600}
        .tb:hover:not(.on){color:#aaa;border-color:rgba(255,255,255,0.14)}
        .two{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        @media(max-width:600px){.two{grid-template-columns:1fr}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fi{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {toast && (
        <div style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 999, padding: '0.8rem 1.2rem', borderRadius: '10px', background: toast.type === 'error' ? 'rgba(220,38,38,0.92)' : 'rgba(22,163,74,0.92)', color: '#fff', fontSize: '0.83rem', fontWeight: 600, backdropFilter: 'blur(8px)', animation: 'fi 0.25s ease' }}>
          {toast.type === 'error' ? '⚠ ' : '✓ '}{toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
            <button onClick={() => navigate('/admin/works')} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.83rem', padding: 0 }}>← Works</button>
            <span style={{ color: '#333' }}>/</span>
            <span style={{ color: '#777', fontSize: '0.83rem' }}>{isEdit ? 'Edit' : 'New'}</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '1.4rem', color: '#fff', margin: 0 }}>{isEdit ? 'Edit Work' : 'Add Work'}</h1>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.45rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: form.isPublished ? 'rgba(34,197,94,0.08)' : 'transparent' }}>
          <input type="checkbox" checked={form.isPublished} onChange={e => setField('isPublished', e.target.checked)} style={{ display: 'none' }} />
          <span style={{ width: 30, height: 17, borderRadius: '50px', background: form.isPublished ? '#22c55e' : 'rgba(255,255,255,0.1)', position: 'relative', display: 'inline-block', transition: 'background 0.2s', flexShrink: 0 }}>
            <span style={{ position: 'absolute', top: 2, left: form.isPublished ? 15 : 2, width: 13, height: 13, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: form.isPublished ? '#22c55e' : '#555' }}>{form.isPublished ? 'Published' : 'Draft'}</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {TABS.map(t => <button key={t.id} className={`tb${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      <form onSubmit={handleSubmit}>

        {tab === 'basic' && (
          <div style={card}>
            <p style={cardTitle}>Basic Information</p>

            <F label="Title" required error={errors.title}>
              <input type="text" style={inp(errors.title)} value={form.title} placeholder="e.g. Luxury Hotel Brand Identity"
                onChange={e => { setField('title', e.target.value); if (!isEdit) setField('slug', slugify(e.target.value)); }} />
            </F>

            <F label="Slug" hint="auto-generated">
              <input type="text" style={inp()} value={form.slug} placeholder="luxury-hotel-brand-identity"
                onChange={e => setField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} />
            </F>

            <div className="two">
              <F label="Category" required error={errors.category}>
                <select style={{ ...sel, borderColor: errors.category ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)' }}
                  value={form.category} onChange={e => setField('category', e.target.value)}>
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </F>
              <F label="Year" required error={errors.year}>
                <input type="number" style={inp(errors.year)} value={form.year} min="2000" max="2099"
                  onChange={e => setField('year', e.target.value)} />
              </F>
            </div>

            <F label="Client" required error={errors.client}>
              <input type="text" style={inp(errors.client)} value={form.client} placeholder="e.g. Marriott Dubai"
                onChange={e => setField('client', e.target.value)} />
            </F>

            <F label="Description" required hint="shown on cards" error={errors.description}>
              <textarea style={ta(errors.description)} value={form.description} rows={3}
                placeholder="Brief project description…" onChange={e => setField('description', e.target.value)} />
            </F>

            <F label="Results" hint="comma-separated">
              <input type="text" style={inp()} value={form.results} placeholder="3.2x ROAS, 22x followers"
                onChange={e => setField('results', e.target.value)} />
            </F>

            <F label="Tags" hint="comma-separated">
              <input type="text" style={inp()} value={form.tags} placeholder="Social Media, Strategy"
                onChange={e => setField('tags', e.target.value)} />
            </F>

            <F label="Live URL" hint="optional">
              <input type="url" style={inp()} value={form.liveUrl} placeholder="https://"
                onChange={e => setField('liveUrl', e.target.value)} />
            </F>
          </div>
        )}

        {tab === 'media' && (
          <>
            <div style={card}>
              <p style={cardTitle}>Featured Image</p>
              <input ref={featuredRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files[0]; if (f) { setFeaturedFile(f); setFeaturedPreview(URL.createObjectURL(f)); } }} />
              {featuredPreview ? (
                <div style={{ position: 'relative' }}>
                  <img src={featuredPreview} alt="" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                  <button type="button" onClick={() => { setFeaturedFile(null); setFeaturedPreview(''); }}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.65)', border: 'none', color: '#fff', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: '0.85rem' }}>✕</button>
                  <button type="button" onClick={() => featuredRef.current?.click()}
                    style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(178,39,140,0.85)', border: 'none', color: '#fff', borderRadius: '7px', padding: '0.28rem 0.65rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Change</button>
                </div>
              ) : (
                <div className="dz" onClick={() => featuredRef.current?.click()}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🖼</div>
                  <p style={{ fontSize: '0.83rem', marginBottom: '0.2rem' }}>Click to upload</p>
                  <p style={{ fontSize: '0.7rem', color: '#555' }}>JPG, PNG, WebP · Max 10MB</p>
                </div>
              )}
            </div>

            <div style={card}>
              <p style={cardTitle}>Instagram Reel / Post</p>
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
                {['reel', 'post'].map(t => (
                  <label key={t} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.55rem', borderRadius: '9px', border: `1px solid ${form.instagramReel.type === t ? 'rgba(178,39,140,0.45)' : 'rgba(255,255,255,0.09)'}`, background: form.instagramReel.type === t ? 'rgba(178,39,140,0.1)' : 'transparent', cursor: 'pointer' }}>
                    <input type="radio" name="reelType" value={t} checked={form.instagramReel.type === t} onChange={() => setField('instagramReel.type', t)} style={{ display: 'none' }} />
                    <span style={{ color: form.instagramReel.type === t ? '#B2278C' : '#777', fontSize: '0.83rem', fontWeight: form.instagramReel.type === t ? 600 : 400 }}>{t === 'reel' ? '🎬 Reel' : '📷 Post'}</span>
                  </label>
                ))}
              </div>
              
              <F label="Instagram URL">
                <input type="url" style={inp()} value={form.instagramReel.url} placeholder="https://www.instagram.com/reel/…"
                  onChange={e => setField('instagramReel.url', e.target.value)} />
              </F>
              
              <F label="Thumbnail" hint="portrait format">
                <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => { const f = e.target.files[0]; if (f) { setThumbFile(f); setThumbPreview(URL.createObjectURL(f)); } }} />
                {thumbPreview ? (
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <img src={thumbPreview} alt="" style={{ width: 72, height: 128, objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <button type="button" onClick={() => thumbRef.current?.click()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', color: '#aaa', cursor: 'pointer', padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>Change</button>
                      <button type="button" onClick={() => { setThumbFile(null); setThumbPreview(''); setField('instagramReel.thumbnail', null); }} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="dz" onClick={() => thumbRef.current?.click()} style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.83rem' }}>📎 Upload thumbnail</p>
                  </div>
                )}
              </F>
            </div>
          </>
        )}

        {tab === 'case' && (
          <>
            <div style={card}>
              <p style={cardTitle}>Case Study</p>
              <F label="Overview">
                <textarea style={ta()} value={form.caseStudy.overview} rows={3} placeholder="High-level summary…"
                  onChange={e => setField('caseStudy.overview', e.target.value)} />
              </F>
              <F label="Challenge">
                <textarea style={ta()} value={form.caseStudy.challenge} rows={3} placeholder="What problem were you solving?"
                  onChange={e => setField('caseStudy.challenge', e.target.value)} />
              </F>
              <F label="Solution">
                <textarea style={ta()} value={form.caseStudy.solution} rows={3} placeholder="What approach did you take?"
                  onChange={e => setField('caseStudy.solution', e.target.value)} />
              </F>
              <F label="Results">
                <textarea style={ta()} value={form.caseStudy.results} rows={3} placeholder="Measurable outcomes achieved…"
                  onChange={e => setField('caseStudy.results', e.target.value)} />
              </F>
            </div>

            <div style={card}>
              <p style={cardTitle}>Testimonial</p>
              <F label="Quote">
                <textarea style={ta()} value={form.caseStudy.testimonial.quote} rows={3} placeholder='"Working with the team transformed our brand…"'
                  onChange={e => setField('caseStudy.testimonial.quote', e.target.value)} />
              </F>
              <div className="two">
                <F label="Author">
                  <input type="text" style={inp()} value={form.caseStudy.testimonial.author} placeholder="Ahmed Al-Rashidi"
                    onChange={e => setField('caseStudy.testimonial.author', e.target.value)} />
                </F>
                <F label="Position">
                  <input type="text" style={inp()} value={form.caseStudy.testimonial.position} placeholder="CEO, Acme Group"
                    onChange={e => setField('caseStudy.testimonial.position', e.target.value)} />
                </F>
              </div>
            </div>
          </>
        )}

        {tab === 'seo' && (
          <div style={card}>
            <p style={cardTitle}>SEO</p>
            <F label="Meta Title" hint="blank = work title">
              <input type="text" style={inp()} value={form.seo.metaTitle} placeholder="e.g. Brand Identity Dubai | Media Mind"
                onChange={e => setField('seo.metaTitle', e.target.value)} />
              <p style={{ textAlign: 'right', fontSize: '0.7rem', color: form.seo.metaTitle.length > 60 ? '#ef4444' : '#444', marginTop: '0.2rem' }}>{form.seo.metaTitle.length}/60</p>
            </F>
            <F label="Meta Description">
              <textarea style={ta()} value={form.seo.metaDescription} rows={3} placeholder="Search engine description…"
                onChange={e => setField('seo.metaDescription', e.target.value)} />
              <p style={{ textAlign: 'right', fontSize: '0.7rem', color: form.seo.metaDescription.length > 160 ? '#ef4444' : '#444', marginTop: '0.2rem' }}>{form.seo.metaDescription.length}/160</p>
            </F>
            <F label="Keywords" hint="comma-separated">
              <input type="text" style={inp()} value={form.seo.keywords} placeholder="brand identity dubai, logo design uae"
                onChange={e => setField('seo.keywords', e.target.value)} />
            </F>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => navigate('/admin/works')}
            style={{ padding: '0.75rem 1.4rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', color: '#666', cursor: 'pointer', fontSize: '0.85rem' }}>
            Cancel
          </button>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {tab !== 'seo' && (
              <button type="button" onClick={() => { const i = TABS.findIndex(t => t.id === tab); setTab(TABS[i + 1].id); }}
                style={{ padding: '0.75rem 1.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', color: '#aaa', cursor: 'pointer', fontSize: '0.85rem' }}>
                Next →
              </button>
            )}
            <button type="submit" disabled={saving}
              style={{ padding: '0.75rem 1.75rem', background: saving ? 'rgba(178,39,140,0.45)' : '#B2278C', border: 'none', borderRadius: '10px', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.88rem', boxShadow: saving ? 'none' : '0 6px 20px rgba(178,39,140,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {saving
                ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Saving…</>
                : isEdit ? 'Save Changes' : 'Create Work'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}