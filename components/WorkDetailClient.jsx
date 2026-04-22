"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { MagneticBtn } from '@/components/home/MagneticBtn';
import { 
  WHITE, INK, INK60, INK30, INK10, 
  OFF_WHITE, ORANGE, GRAD_HERO 
} from '@/utils/constants';
import baseurl from '../base/base';

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

const FALLBACK_WORKS = [
  {
    _id: 'social-brand-launch',
    slug: 'social-brand-launch',
    category: 'Social Media Creatives',
    title: 'Multi-Platform Brand Launch',
    subtitle: 'Instagram · Facebook · TikTok',
    desc: 'Built an end-to-end social presence for a Dubai lifestyle brand — content strategy, reels, paid promotion and community management.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80' },
    result: '3.2x',
    resultLabel: 'Return on Ad Spend',
    color: ORANGE,
    icon: '📱',
    tags: ['Strategy', 'Content', 'Paid Social'],
    fullDesc: `This project involved building a complete social media presence from scratch for a Dubai-based lifestyle brand entering a competitive market. We developed a comprehensive strategy covering platform selection, content pillars, posting cadence, and paid amplification.\n\nOur team produced weekly content calendars, shot-list briefs, Reels scripts and carousel templates — all aligned with the brand's visual identity. Paid campaigns ran simultaneously on Instagram and Facebook targeting key UAE demographics.\n\nThe result was a cohesive brand voice across all platforms, significant organic growth, and a measurable return on ad spend from day one.`,
    metrics: [{ value: '3.2x', label: 'ROAS' }, { value: '18K', label: 'New Followers' }, { value: '4.2%', label: 'Engagement Rate' }, { value: '120+', label: 'Posts Created' }],
    services: ['Content Strategy', 'Reel Production', 'Paid Social Ads', 'Community Management'],
    deliverables: ['Monthly Content Calendar', 'Ad Creatives', 'Caption Copywriting', 'Analytics Reports'],
    gallery: ['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=85', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80'],
  },
];

const colorRgb = {
  '#f97316': '249,115,22',
  '#3b82f6': '59,130,246',
  '#8b5cf6': '139,92,246',
  '#22c55e': '34,197,94',
  '#ec4899': '236,72,153',
};

function SkeletonDetail() {
  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', background: WHITE }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {[50, 75, 40, 100, 220, 65].map((w, i) => (
          <div key={i} style={{ height: i === 1 ? 46 : i === 4 ? 400 : 14, width: i === 4 ? '100%' : `${w}%`, borderRadius: i === 4 ? 20 : 8, background: INK10, marginBottom: '1.5rem', animation: 'dshimmer 1.5s infinite' }} />
        ))}
      </div>
      <style jsx global>{`
        @keyframes dshimmer { 0%,100%{opacity:.4} 50%{opacity:.85} }
      `}</style>
    </div>
  );
}

function RelatedCard({ work }) {
  const [imgErr, setImgErr] = useState(false);
  const rgb = colorRgb[work.color] || '249,115,22';
  
  const getImageUrl = () => {
    if (work.featuredImage?.url) return work.featuredImage.url;
    if (work.image) return work.image;
    return null;
  };
  
  const safeWork = {
    ...work,
    tags: Array.isArray(work?.tags) ? work.tags : [],
    image: getImageUrl(),
    title: work?.title || '',
    category: work?.category || '',
    desc: work?.desc || '',
    result: work?.result || '',
    color: work?.color || ORANGE,
    icon: work?.icon || '📁',
    _id: work?._id || work?.id || work?.slug || ''
  };
  
  return (
    <Link href={`/works/${safeWork._id}`} style={{ display: 'block', textDecoration: 'none', background: WHITE, border: `1px solid ${INK10}`, borderRadius: '20px', overflow: 'hidden', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = safeWork.color; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.08)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ height: 160, overflow: 'hidden', background: OFF_WHITE, position: 'relative' }}>
        {!imgErr && safeWork.image
          ? <img src={safeWork.image} alt={safeWork.title} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>{safeWork.icon}</div>
        }
        <span style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', padding: '0.22rem 0.65rem', borderRadius: '50px', background: WHITE, border: `1px solid ${INK10}`, fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '0.78rem', color: safeWork.color }}>
          {safeWork.result}
        </span>
      </div>
      <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
        <p style={{ color: INK60, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{safeWork.category}</p>
        <h3 style={{ color: INK, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.5rem' }}>{safeWork.title}</h3>
        <p style={{ color: INK60, fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>{safeWork.desc.length > 90 ? safeWork.desc.slice(0, 90) + '…' : safeWork.desc}</p>
        <span style={{ color: safeWork.color, fontSize: '0.8rem', fontWeight: 700 }}>View Project →</span>
      </div>
    </Link>
  );
}

export default function WorkDetailClient({ id }) {
  const router = useRouter();
  const heroRef = useRef(null);

  const [work, setWork] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const transformWorkData = (data) => {
    const getFullDesc = () => {
      if (data.fullDesc) return data.fullDesc;
      if (data.caseStudy?.overview) {
        let desc = data.caseStudy.overview || '';
        if (data.caseStudy.challenge) desc += `\n\n${data.caseStudy.challenge}`;
        if (data.caseStudy.solution) desc += `\n\n${data.caseStudy.solution}`;
        if (data.caseStudy.results) desc += `\n\n${data.caseStudy.results}`;
        return desc;
      }
      if (data.description) return data.description;
      return '';
    };

    const getMetrics = () => {
      if (data.metrics && Array.isArray(data.metrics)) return data.metrics;
      if (data.results && Array.isArray(data.results)) {
        return data.results.map(r => ({ value: r, label: '' }));
      }
      return [];
    };

    const getServices = () => {
      if (data.services && Array.isArray(data.services)) return data.services;
      return [];
    };

    const getDeliverables = () => {
      if (data.deliverables && Array.isArray(data.deliverables)) return data.deliverables;
      return [];
    };

    const getGallery = () => {
      if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
        return data.gallery.map(g => g.url || g);
      }
      if (data.featuredImage?.url) return [data.featuredImage.url];
      if (data.image) return [data.image];
      return [];
    };

    const getTags = () => {
      if (data.tags && Array.isArray(data.tags)) return data.tags;
      return [];
    };

    return {
      ...data,
      _id: data._id || data.id || data.slug || id,
      fullDesc: getFullDesc(),
      metrics: getMetrics(),
      services: getServices(),
      deliverables: getDeliverables(),
      gallery: getGallery(),
      tags: getTags(),
      desc: data.desc || data.description || '',
      title: data.title || '',
      subtitle: data.subtitle || data.client || '',
      category: data.category || '',
      result: data.result || (data.results?.[0] || ''),
      resultLabel: data.resultLabel || '',
      color: data.color || ORANGE,
      image: data.featuredImage?.url || data.image || '',
      icon: data.icon || '📁',
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
    if (!id) return;
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let workData = null;
        
        try {
          const response = await api.get(`/works/${id}`);
          workData = response?.work || response;
        } catch (apiError) {
          const fb = FALLBACK_WORKS.find(w => w._id === id || w.id === id || w.slug === id);
          if (fb) {
            workData = fb;
          } else {
            throw new Error('Project not found');
          }
        }
        
        if (!workData) {
          throw new Error('Project data is empty');
        }
        
        const transformedWork = transformWorkData(workData);
        
        if (!cancelled) {
          setWork(transformedWork);
          
          let relatedData = [];
          try {
            const rel = await api.get(`/works/${id}/related`, { params: { limit: 3 } });
            relatedData = Array.isArray(rel?.works) ? rel.works : Array.isArray(rel) ? rel : [];
          } catch (relError) {
            if (transformedWork.relatedIds && Array.isArray(transformedWork.relatedIds)) {
              relatedData = FALLBACK_WORKS.filter(w => transformedWork.relatedIds.includes(w._id || w.id || w.slug)).slice(0, 3);
            }
          }
          
          const safeRelated = relatedData.map(item => transformWorkData(item));
          setRelated(safeRelated);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Project not found');
          setWork(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!loading && heroRef.current && work) {
      gsap.fromTo(heroRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [loading, work]);

  if (loading) return <SkeletonDetail />;

  if (error || !work) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: WHITE }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', color: INK }}>Project not found</h2>
        <p style={{ color: INK60, marginBottom: '2rem' }}>{error || 'The project you are looking for does not exist.'}</p>
        <Link href="/works" style={{ color: ORANGE, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>← Back to Works</Link>
      </div>
    );
  }

  const rgb = colorRgb[work.color] || '249,115,22';
  const gallery = work.gallery?.length ? work.gallery : work.image ? [work.image] : [];

  return (
    <div style={{ background: WHITE }}>
      <style jsx global>{`
        @keyframes dshimmer { 0%,100%{opacity:.4} 50%{opacity:.85} }
        .thumb-btn { transition: all 0.25s; cursor: pointer; border: none; background: none; padding: 0; }
        .thumb-btn:hover { opacity: 1 !important; }
        @media (max-width:900px) {
          .dlayout { grid-template-columns:1fr !important; }
          .relgrid { grid-template-columns:1fr 1fr !important; }
          .mrow { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:560px) {
          .relgrid { grid-template-columns:1fr !important; }
          .mrow { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ 
        paddingTop: '110px', 
        paddingBottom: '3.5rem', 
        position: 'relative', 
        overflow: 'hidden',
        background: GRAD_HERO
      }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, rgba(249,115,22,.1) 0%,transparent 70%)`, top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, rgba(59,130,246,.08) 0%,transparent 70%)`, bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => router.back()} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: INK60, 
              cursor: 'pointer', 
              fontSize: '0.88rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              padding: 0, 
              marginBottom: '2.5rem', 
              transition: 'color 0.2s',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
            onMouseLeave={e => (e.currentTarget.style.color = INK60)}
          >
            ← Back to Works
          </button>

          <div ref={heroRef}>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.4rem', alignItems: 'center' }}>
              <span style={{ 
                padding: '0.32rem 0.9rem', 
                borderRadius: '50px', 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase', 
                background: OFF_WHITE, 
                color: work.color, 
                border: `1px solid ${INK10}` 
              }}>
                {work.category}
              </span>
              <span style={{ color: INK30, fontSize: '0.75rem' }}>·</span>
              <span style={{ color: INK60, fontSize: '0.78rem', fontWeight: 500 }}>{work.subtitle}</span>
            </div>

            <h1 style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: 'clamp(2rem,5vw,3.8rem)', 
              fontWeight: 800, 
              color: INK, 
              lineHeight: 1.08, 
              marginBottom: '1.25rem' 
            }}>
              {work.title}
            </h1>

            <p style={{ 
              color: INK60, 
              fontSize: '1.05rem', 
              maxWidth: 620, 
              lineHeight: 1.75, 
              marginBottom: '1.75rem' 
            }}>
              {work.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {work.tags.map((tag, i) => (
                <span key={i} style={{ 
                  padding: '0.28rem 0.8rem', 
                  borderRadius: '50px', 
                  fontSize: '0.72rem', 
                  fontWeight: 600, 
                  background: OFF_WHITE, 
                  color: INK60, 
                  border: `1px solid ${INK10}` 
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section style={{ padding: '0 0 3.5rem', background: WHITE }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: INK, marginBottom: '1.5rem' }}>Project Gallery</h2>
            <div style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              marginBottom: '0.75rem', 
              position: 'relative', 
              background: OFF_WHITE, 
              border: `1px solid ${INK10}` 
            }}>
              <img src={gallery[activeImg]} alt={work.title} style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} />
              {gallery.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)} 
                    style={{ 
                      position: 'absolute', 
                      left: '1rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      background: WHITE, 
                      border: `1px solid ${INK10}`, 
                      color: INK, 
                      borderRadius: '50%', 
                      width: 40, 
                      height: 40, 
                      cursor: 'pointer', 
                      fontSize: '1.2rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.color = INK; }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveImg(i => (i + 1) % gallery.length)} 
                    style={{ 
                      position: 'absolute', 
                      right: '1rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      background: WHITE, 
                      border: `1px solid ${INK10}`, 
                      color: INK, 
                      borderRadius: '50%', 
                      width: 40, 
                      height: 40, 
                      cursor: 'pointer', 
                      fontSize: '1.2rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.color = INK; }}
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}
              <div style={{ 
                position: 'absolute', 
                bottom: '1rem', 
                right: '1rem', 
                background: WHITE, 
                border: `1px solid ${INK10}`, 
                borderRadius: '50px', 
                padding: '0.25rem 0.75rem', 
                color: INK60, 
                fontSize: '0.75rem' 
              }}>
                {activeImg + 1} / {gallery.length}
              </div>
            </div>
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto' }}>
                {gallery.map((img, i) => (
                  <button 
                    key={i} 
                    className="thumb-btn" 
                    onClick={() => setActiveImg(i)} 
                    style={{ 
                      padding: 0, 
                      borderRadius: '10px', 
                      overflow: 'hidden', 
                      opacity: activeImg === i ? 1 : 0.45, 
                      outline: activeImg === i ? `2px solid ${work.color}` : 'none', 
                      outlineOffset: 2, 
                      flexShrink: 0 
                    }}
                  >
                    <img src={img} alt="" style={{ width: 88, height: 62, objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Metrics Section */}
      {work.metrics.length > 0 && (
        <section style={{ padding: '0 0 3rem', background: WHITE }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: INK, marginBottom: '1.5rem', textAlign: 'center' }}>Key Results</h2>
            <div className="mrow" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(work.metrics.length, 4)}, 1fr)`, gap: '1rem' }}>
              {work.metrics.map((m, i) => (
                <div key={i} style={{ 
                  padding: '1.6rem 1.25rem', 
                  textAlign: 'center', 
                  background: WHITE, 
                  border: `1px solid ${INK10}`, 
                  borderRadius: '18px', 
                  transition: 'all 0.25s' 
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = work.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: work.color, lineHeight: 1, marginBottom: '0.4rem' }}>{m.value}</div>
                  <div style={{ color: INK60, fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section style={{ padding: '0 0 3rem', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="dlayout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left Column - About Project */}
            <div>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${work.color}, transparent)`, borderRadius: '3px', marginBottom: '2rem' }} />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: INK, marginBottom: '1.5rem' }}>About This Project</h2>
              {work.fullDesc.split('\n\n').map((para, i) => (
                <p key={i} style={{ color: INK60, lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.95rem' }}>{para}</p>
              ))}
              
              {work.liveUrl && (
                <div style={{ marginTop: '2rem' }}>
                  <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.75rem 1.5rem', 
                    background: OFF_WHITE, 
                    border: `1px solid ${INK10}`, 
                    borderRadius: '40px', 
                    color: work.color, 
                    textDecoration: 'none', 
                    fontSize: '0.9rem', 
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = work.color; e.currentTarget.style.background = WHITE; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.background = OFF_WHITE; }}
                  >
                    <ExternalLink size={16} /> Visit Live Project <ArrowRight size={14} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Services Section */}
              {work.services.length > 0 && (
                <div style={{ padding: '1.5rem', background: WHITE, border: `1px solid ${INK10}`, borderRadius: '18px' }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: INK, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: work.color }}>⚡</span> Services Used
                  </h3>
                  {work.services.map((s, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: i < arr.length - 1 ? `1px solid ${INK10}` : 'none' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: work.color, flexShrink: 0 }} />
                      <span style={{ color: INK60, fontSize: '0.85rem' }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Deliverables Section */}
              {work.deliverables.length > 0 && (
                <div style={{ padding: '1.5rem', background: WHITE, border: `1px solid ${INK10}`, borderRadius: '18px' }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: INK, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={18} style={{ color: work.color }} /> Deliverables
                  </h3>
                  {work.deliverables.map((d, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.4rem 0', borderBottom: i < arr.length - 1 ? `1px solid ${INK10}` : 'none' }}>
                      <Check size={14} style={{ color: work.color, marginTop: '0.15rem', flexShrink: 0 }} />
                      <span style={{ color: INK60, fontSize: '0.85rem' }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Result Card */}
              <div style={{ 
                padding: '1.5rem', 
                textAlign: 'center', 
                background: OFF_WHITE, 
                border: `1px solid ${work.color}`, 
                borderRadius: '18px' 
              }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: INK, fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Project Outcome</h3>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '2.2rem', color: work.color, lineHeight: 1, marginBottom: '0.25rem' }}>{work.result || 'Delivered'}</div>
                <div style={{ color: INK60, fontSize: '0.8rem', marginBottom: '1rem' }}>{work.resultLabel || 'Success'}</div>
                <div style={{ width: 40, height: 1, background: work.color, margin: '0 auto 1rem' }} />
                <p style={{ color: INK60, fontSize: '0.78rem', lineHeight: 1.6 }}>Achieved for a client in<br /><span style={{ color: INK, fontWeight: 600 }}>Dubai, UAE</span></p>
              </div>

              {/* CTA Buttons */}
              <MagneticBtn
                to="/contact"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.95rem',
                  background: INK,
                  color: WHITE,
                  borderRadius: '14px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  width: '100%'
                }}
              >
                Start a Similar Project →
              </MagneticBtn>

              <Link 
                href="/works" 
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  padding: '0.85rem', 
                  background: 'transparent', 
                  color: INK60, 
                  border: `1px solid ${INK10}`, 
                  borderRadius: '14px', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  fontSize: '0.85rem', 
                  transition: 'all 0.2s' 
                }}
                onMouseEnter={e => { e.currentTarget.style.color = ORANGE; e.currentTarget.style.borderColor = ORANGE; }}
                onMouseLeave={e => { e.currentTarget.style.color = INK60; e.currentTarget.style.borderColor = INK10; }}
              >
                ← Browse All Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {related.length > 0 && (
        <section style={{ padding: '3rem 0 5rem', background: OFF_WHITE, borderTop: `1px solid ${INK10}` }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: INK, fontSize: '1.8rem' }}>Related Projects</h2>
              <Link href="/works" style={{ color: ORANGE, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>View All →</Link>
            </div>
            <div className="relgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
              {related.map((r, i) => <RelatedCard key={i} work={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{ padding: '5rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              background: INK,
              borderRadius: '32px',
              padding: '4rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: WHITE, marginBottom: '1rem' }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: "'Inter', sans-serif" }}>
              Let's create something amazing together. Contact us to discuss your next project.
            </p>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: WHITE,
                color: INK,
                borderRadius: '50px',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Start Your Project <ArrowRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}