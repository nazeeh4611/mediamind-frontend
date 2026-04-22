// app/admin/works/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '../../../../components/Admincontext';

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

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: '①' },
  { id: 'media', label: 'Media', icon: '②' },
  { id: 'case', label: 'Case Study', icon: '③' },
  { id: 'seo', label: 'SEO', icon: '④' },
];

const EMPTY = {
  title: '', slug: '', category: '', client: '',
  year: new Date().getFullYear().toString(),
  description: '', results: '', tags: '', liveUrl: '',
  isPublished: true,
  instagramReel: { type: 'reel', url: '', thumbnail: null },
  caseStudy: { overview: '', challenge: '', solution: '', results: '', testimonial: { quote: '', author: '', position: '' } },
  seo: { metaTitle: '', metaDescription: '', keywords: '' },
};

const baseInput = { width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e0e0e0', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' };
const errInput = { ...baseInput, background: 'rgba(240,96,112,0.08)', border: '1px solid rgba(240,96,112,0.4)' };
const baseTextarea = { ...baseInput, resize: 'vertical', lineHeight: 1.5 };
const errTextarea = { ...errInput, resize: 'vertical', lineHeight: 1.5 };
const baseSelect = { ...baseInput, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' };

function Field({ label, required, hint, error, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'DM Mono', monospace" }}>
        {label}{required && <span style={{ color: '#e040a0' }}>*</span>}
        {hint && <span style={{ color: '#555', fontWeight: 400, textTransform: 'none', fontSize: '0.7rem' }}>— {hint}</span>}
      </label>
      {children}
      {error && <p style={{ color: '#f06070', fontSize: '0.7rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  );
}

export default function AdminWorkForm() {
  const params = useParams();
  const id = params?.id;
  const isEdit = Boolean(id) && id !== 'new';
  const { api } = useAdmin();
  const router = useRouter();

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
      const clone = JSON.parse(JSON.stringify(prev));
      let cur = clone;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const toast$ = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/works/admin/${id}`)
      .then(d => {
        setForm({
          title: d.title || '', slug: d.slug || '', category: d.category || '',
          client: d.client || '', year: d.year || '',
          description: d.description || '',
          results: Array.isArray(d.results) ? d.results.join(', ') : '',
          tags: Array.isArray(d.tags) ? d.tags.join(', ') : '',
          liveUrl: d.liveUrl || '', isPublished: d.isPublished !== false,
          instagramReel: { type: d.instagramReel?.type || 'reel', url: d.instagramReel?.url || '', thumbnail: null },
          caseStudy: {
            overview: d.caseStudy?.overview || '', challenge: d.caseStudy?.challenge || '',
            solution: d.caseStudy?.solution || '', results: d.caseStudy?.results || '',
            testimonial: { quote: d.caseStudy?.testimonial?.quote || '', author: d.caseStudy?.testimonial?.author || '', position: d.caseStudy?.testimonial?.position || '' },
          },
          seo: { metaTitle: d.seo?.metaTitle || '', metaDescription: d.seo?.metaDescription || '', keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords.join(', ') : '' },
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
    if (form.results.trim()) form.results.split(',').map(r => r.trim()).filter(Boolean).forEach(r => fd.append('results', r));
    if (form.tags.trim()) form.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => fd.append('tags', t));
    if (form.instagramReel.url.trim()) {
      fd.append('reelType', form.instagramReel.type);
      fd.append('reelUrl', form.instagramReel.url.trim());
      if (thumbFile) fd.append('reelThumbnail', thumbFile);
    }
    fd.append('caseStudy', JSON.stringify(form.caseStudy));
    fd.append('seo', JSON.stringify({ ...form.seo, keywords: form.seo.keywords.split(',').map(k => k.trim()).filter(Boolean) }));
    if (featuredFile) fd.append('featuredImage', featuredFile);
    try {
      if (isEdit) {
        await api.put(`/works/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast$('Changes saved!');
      } else {
        await api.post('/works', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast$('Work created!');
        setTimeout(() => router.push('/admin/works'), 1200);
      }
    } catch (err) {
      toast$(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (fetching) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div style={{ width: 30, height: 30, border: '2px solid rgba(224,64,160,0.2)', borderTopColor: '#e040a0', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const tabIdx = TABS.findIndex(t => t.id === tab);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", width: '100%', maxWidth: '900px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        input:focus, select:focus, textarea:focus { border-color: rgba(224,64,160,0.5) !important; background: rgba(224,64,160,0.05) !important; box-shadow: 0 0 0 3px rgba(224,64,160,0.1) !important; }
        .dropzone { border: 2px dashed rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .dropzone:hover { border-color: rgba(224,64,160,0.4); background: rgba(224,64,160,0.03); }
        .tab-btn { padding: 0.5rem 1.2rem; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); background: none; color: #888; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; }
        .tab-btn.active { background: rgba(224,64,160,0.15); border-color: rgba(224,64,160,0.4); color: #e040a0; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 640px) { .two-col { grid-template-columns: 1fr !important; } div { padding-left: 1rem; padding-right: 1rem; } }
      `}</style>

      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000, padding: '0.75rem 1.2rem', borderRadius: '12px', background: toast.type === 'error' ? '#dc2626' : '#10b981', color: '#fff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.type === 'error' ? '⚠' : '✓'} {toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button onClick={() => router.push('/admin/works')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.85rem', padding: 0, marginBottom: '0.5rem' }}>← Back to Works</button>
          <h1 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#fff', margin: 0 }}>{isEdit ? 'Edit Work' : 'Add New Work'}</h1>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', padding: '0.4rem 1rem', borderRadius: '40px', border: `1px solid ${form.isPublished ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'}`, background: form.isPublished ? 'rgba(74,222,128,0.1)' : 'transparent' }}>
          <input type="checkbox" checked={form.isPublished} onChange={e => setField('isPublished', e.target.checked)} style={{ display: 'none' }} />
          <span style={{ width: 36, height: 20, borderRadius: '40px', background: form.isPublished ? '#4ade80' : 'rgba(255,255,255,0.2)', position: 'relative', display: 'inline-block', transition: 'background 0.2s' }}>
            <span style={{ position: 'absolute', top: 2, left: form.isPublished ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: form.isPublished ? '#4ade80' : '#888' }}>{form.isPublished ? 'LIVE' : 'DRAFT'}</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {tab === 'basic' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem' }}>
            <Field label="Title" required error={errors.title}>
              <input type="text" style={errors.title ? errInput : baseInput} value={form.title} placeholder="e.g. Luxury Hotel Brand Identity"
                onChange={e => { setField('title', e.target.value); if (!isEdit) setField('slug', slugify(e.target.value)); }} />
            </Field>
            <Field label="Slug" hint="auto-generated">
              <input type="text" style={baseInput} value={form.slug} placeholder="luxury-hotel-brand-identity"
                onChange={e => setField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} />
            </Field>
            <div className="two-col">
              <Field label="Category" required error={errors.category}>
                <select style={errors.category ? errInput : baseSelect} value={form.category} onChange={e => setField('category', e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Year" required error={errors.year}>
                <input type="number" style={errors.year ? errInput : baseInput} value={form.year} onChange={e => setField('year', e.target.value)} />
              </Field>
            </div>
            <Field label="Client" required error={errors.client}>
              <input type="text" style={errors.client ? errInput : baseInput} value={form.client} placeholder="e.g. Marriott Dubai" onChange={e => setField('client', e.target.value)} />
            </Field>
            <Field label="Description" required hint="shown on project cards" error={errors.description}>
              <textarea style={errors.description ? errTextarea : baseTextarea} rows={3} value={form.description} placeholder="Brief project description..." onChange={e => setField('description', e.target.value)} />
            </Field>
            <div className="two-col">
              <Field label="Results" hint="comma-separated">
                <input type="text" style={baseInput} value={form.results} placeholder="3.2x ROAS, 22x followers" onChange={e => setField('results', e.target.value)} />
              </Field>
              <Field label="Tags" hint="comma-separated">
                <input type="text" style={baseInput} value={form.tags} placeholder="Social, Strategy" onChange={e => setField('tags', e.target.value)} />
              </Field>
            </div>
            <Field label="Live URL" hint="optional">
              <input type="url" style={baseInput} value={form.liveUrl} placeholder="https://" onChange={e => setField('liveUrl', e.target.value)} />
            </Field>
          </div>
        )}

        {tab === 'media' && (
          <>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#ccc', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Featured Image</h3>
              <input ref={featuredRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) { setFeaturedFile(f); setFeaturedPreview(URL.createObjectURL(f)); } }} />
              {featuredPreview ? (
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={featuredPreview} alt="" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button type="button" onClick={() => featuredRef.current?.click()} style={{ padding: '0.4rem 0.9rem', background: '#e040a0', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>Change</button>
                    <button type="button" onClick={() => { setFeaturedFile(null); setFeaturedPreview(''); }} style={{ padding: '0.4rem 0.9rem', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>Remove</button>
                  </div>
                </div>
              ) : (
                <div className="dropzone" onClick={() => featuredRef.current?.click()}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.5 }}>📷</div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Click to upload image</p>
                  <p style={{ fontSize: '0.7rem', color: '#666' }}>JPG, PNG, WebP · max 10MB</p>
                </div>
              )}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#ccc', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Instagram Content</h3>
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {['reel', 'post'].map(t => (
                  <label key={t} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.7rem', borderRadius: '12px', border: `1px solid ${form.instagramReel.type === t ? 'rgba(224,64,160,0.4)' : 'rgba(255,255,255,0.1)'}`, background: form.instagramReel.type === t ? 'rgba(224,64,160,0.1)' : 'transparent', cursor: 'pointer' }}>
                    <input type="radio" name="reelType" value={t} checked={form.instagramReel.type === t} onChange={() => setField('instagramReel.type', t)} style={{ display: 'none' }} />
                    <span>{t === 'reel' ? '🎬' : '📷'}</span>
                    <span style={{ color: form.instagramReel.type === t ? '#e040a0' : '#888', textTransform: 'capitalize' }}>{t}</span>
                  </label>
                ))}
              </div>
              <Field label="Instagram URL">
                <input type="url" style={baseInput} value={form.instagramReel.url} placeholder="https://instagram.com/p/..." onChange={e => setField('instagramReel.url', e.target.value)} />
              </Field>
              <Field label="Thumbnail" hint="portrait 9:16">
                <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) { setThumbFile(f); setThumbPreview(URL.createObjectURL(f)); } }} />
                {thumbPreview ? (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={thumbPreview} alt="" style={{ width: 70, height: 124, objectFit: 'cover', borderRadius: '12px' }} />
                    <div>
                      <button type="button" onClick={() => thumbRef.current?.click()} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', marginRight: '0.5rem' }}>Change</button>
                      <button type="button" onClick={() => { setThumbFile(null); setThumbPreview(''); }} style={{ padding: '0.3rem 0.8rem', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="dropzone" onClick={() => thumbRef.current?.click()} style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.85rem' }}>Upload thumbnail</p>
                  </div>
                )}
              </Field>
            </div>
          </>
        )}

        {tab === 'case' && (
          <>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#ccc', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Case Study</h3>
              {['overview', 'challenge', 'solution', 'results'].map(field => (
                <Field key={field} label={field.charAt(0).toUpperCase() + field.slice(1)}>
                  <textarea style={baseTextarea} rows={3} value={form.caseStudy[field]} placeholder={`Enter ${field}...`} onChange={e => setField(`caseStudy.${field}`, e.target.value)} />
                </Field>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#ccc', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Client Testimonial</h3>
              <Field label="Quote">
                <textarea style={baseTextarea} rows={3} value={form.caseStudy.testimonial.quote} placeholder="Client testimonial quote..." onChange={e => setField('caseStudy.testimonial.quote', e.target.value)} />
              </Field>
              <div className="two-col">
                <Field label="Author">
                  <input type="text" style={baseInput} value={form.caseStudy.testimonial.author} placeholder="Client name" onChange={e => setField('caseStudy.testimonial.author', e.target.value)} />
                </Field>
                <Field label="Position">
                  <input type="text" style={baseInput} value={form.caseStudy.testimonial.position} placeholder="CEO, Company" onChange={e => setField('caseStudy.testimonial.position', e.target.value)} />
                </Field>
              </div>
            </div>
          </>
        )}

        {tab === 'seo' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.8rem' }}>
            <Field label="Meta Title" hint="leave blank to use title">
              <input type="text" style={baseInput} value={form.seo.metaTitle} placeholder="SEO title" onChange={e => setField('seo.metaTitle', e.target.value)} />
              <div style={{ textAlign: 'right', fontSize: '0.7rem', marginTop: '0.25rem', color: form.seo.metaTitle.length > 60 ? '#f06070' : '#666' }}>{form.seo.metaTitle.length}/60</div>
            </Field>
            <Field label="Meta Description">
              <textarea style={baseTextarea} rows={3} value={form.seo.metaDescription} placeholder="SEO description" onChange={e => setField('seo.metaDescription', e.target.value)} />
              <div style={{ textAlign: 'right', fontSize: '0.7rem', marginTop: '0.25rem', color: form.seo.metaDescription.length > 160 ? '#f06070' : '#666' }}>{form.seo.metaDescription.length}/160</div>
            </Field>
            <Field label="Keywords" hint="comma-separated">
              <input type="text" style={baseInput} value={form.seo.keywords} placeholder="keyword1, keyword2" onChange={e => setField('seo.keywords', e.target.value)} />
            </Field>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => router.push('/admin/works')} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#888', cursor: 'pointer' }}>Cancel</button>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {tabIdx > 0 && <button type="button" onClick={() => setTab(TABS[tabIdx - 1].id)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ccc', cursor: 'pointer' }}>← Back</button>}
            {tabIdx < TABS.length - 1 && <button type="button" onClick={() => setTab(TABS[tabIdx + 1].id)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ccc', cursor: 'pointer' }}>Next →</button>}
            <button type="submit" disabled={saving} style={{ padding: '0.8rem 2rem', background: saving ? '#666' : 'linear-gradient(135deg, #e040a0, #9b40e0)', border: 'none', borderRadius: '12px', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
              {saving ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Work')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}