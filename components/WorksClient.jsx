"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { MagneticBtn } from '@/components/home/MagneticBtn';
import baseurl from '../base/base';

const PINK = '#B2278C';
const PINK_LIGHT = 'rgba(178, 39, 140, 0.08)';
const PINK_MID = 'rgba(178, 39, 140, 0.18)';
const WHITE = '#FFFFFF';
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK30 = 'rgba(17, 17, 17, 0.3)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';
const GRAD_HERO = 'radial-gradient(circle at 70% 30%, rgba(178,39,140,0.08) 0%, #FFFFFF 70%)';

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

const CATEGORIES = [
  'All',
  'Websites',
  'Branding & Design',
  'Social Media Creatives',
  'NFC Digital Cards',
  'Performance Marketing',
  'SEO',
];

const getCategoryColor = (category) => {
  const colors = {
    'Websites': PINK,
    'Branding & Design': '#9B59B6',
    'Social Media Creatives': '#E84393',
    'NFC Digital Cards': '#D81B60',
    'Performance Marketing': '#C2185B',
    'SEO': '#AD1457',
  };
  return colors[category] || PINK;
};

function SkeletonCard() {
  return (
    <div style={{ background: WHITE, border: `1px solid ${INK10}`, borderRadius: '24px', overflow: 'hidden' }}>
      <div style={{ height: 220, background: OFF_WHITE, animation: 'wshimmer 1.5s infinite' }} />
      <div style={{ padding: '1.5rem' }}>
        {[80, 60, 100, 70].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 1 ? 18 : 12,
              width: `${w}%`,
              borderRadius: 6,
              background: OFF_WHITE,
              marginBottom: i === 3 ? 0 : '0.85rem',
              animation: 'wshimmer 1.5s infinite',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work }) {
  const [imgErr, setImgErr] = useState(false);
  const cardColor = work.color || getCategoryColor(work.category);

  const getImageUrl = () => {
    if (work.featuredImage?.url) return work.featuredImage.url;
    if (work.image) return work.image;
    return null;
  };

  const imageUrl = getImageUrl();

  const safeWork = {
    ...work,
    tags: Array.isArray(work?.tags) ? work.tags : [],
    desc: work?.desc || '',
    title: work?.title || '',
    subtitle: work?.subtitle || '',
    result: work?.result || '',
    resultLabel: work?.resultLabel || '',
    category: work?.category || '',
    _id: work?._id || work?.id || '',
    image: imageUrl,
  };

  return (
    <Link
      href={`/works/${safeWork._id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: WHITE,
        border: `1px solid ${INK10}`,
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = cardColor;
        el.style.transform = 'translateY(-7px)';
        el.style.boxShadow = '0 28px 64px rgba(0,0,0,0.08)';
        const ov = el.querySelector('.cov');
        if (ov) ov.style.opacity = '1';
        const im = el.querySelector('.cim');
        if (im) im.style.transform = 'scale(1.06)';
        const ar = el.querySelector('.car');
        if (ar) { ar.style.opacity = '1'; ar.style.transform = 'translateX(0)'; }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = INK10;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
        const ov = el.querySelector('.cov');
        if (ov) ov.style.opacity = '0';
        const im = el.querySelector('.cim');
        if (im) im.style.transform = 'scale(1)';
        const ar = el.querySelector('.car');
        if (ar) { ar.style.opacity = '0'; ar.style.transform = 'translateX(-6px)'; }
      }}
    >
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: OFF_WHITE, flexShrink: 0 }}>
        {!imgErr && safeWork.image ? (
          <img
            className="cim"
            src={safeWork.image}
            alt={safeWork.title}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: OFF_WHITE, fontSize: '3.5rem' }}>
            📷
          </div>
        )}
        <div
          className="cov"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(160deg, ${cardColor}cc, ${INK}aa)`,
            opacity: 0,
            transition: 'opacity 0.35s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ padding: '0.55rem 1.5rem', border: '2px solid rgba(255,255,255,0.9)', borderRadius: '50px', color: WHITE, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
            View Project →
          </span>
        </div>
        <span style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', padding: '0.28rem 0.8rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: WHITE, color: cardColor, border: `1px solid ${INK10}` }}>
          {safeWork.category}
        </span>
        <span style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', padding: '0.28rem 0.8rem', borderRadius: '50px', background: WHITE, border: `1px solid ${INK10}`, fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '0.82rem', color: cardColor }}>
          {safeWork.result}
        </span>
      </div>

      <div style={{ padding: '1.35rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          {safeWork.tags.slice(0, 3).map((tag, ti) => (
            <span
              key={`${safeWork._id}-tag-${ti}`}
              style={{ padding: '0.22rem 0.65rem', borderRadius: '50px', fontSize: '0.67rem', fontWeight: 600, background: OFF_WHITE, color: cardColor, border: `1px solid ${INK10}` }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 style={{ color: INK, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem', lineHeight: 1.3 }}>
          {safeWork.title}
        </h3>
        <p style={{ color: INK60, fontSize: '0.73rem', marginBottom: '0.65rem', fontWeight: 500 }}>
          {safeWork.subtitle}
        </p>
        <p style={{ color: INK60, fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
          {safeWork.desc.length > 115 ? safeWork.desc.slice(0, 115) + '…' : safeWork.desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${INK10}`, paddingTop: '0.9rem' }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: cardColor, lineHeight: 1 }}>{safeWork.result}</div>
            <div style={{ color: INK30, fontSize: '0.65rem', marginTop: '0.15rem', fontWeight: 500 }}>{safeWork.resultLabel}</div>
          </div>
          <span
            className="car"
            style={{ color: cardColor, fontSize: '0.88rem', fontWeight: 700, opacity: 0, transform: 'translateX(-6px)', transition: 'all 0.3s' }}
          >
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WorksClient() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorks = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const params = category !== 'All' ? { category } : {};
      const data = await api.get('/works', { params });
      const list = Array.isArray(data?.works) ? data.works : Array.isArray(data) ? data : [];
      const safeList = list.map((item) => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        services: Array.isArray(item.services) ? item.services : [],
        deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
        metrics: Array.isArray(item.metrics) ? item.metrics : [],
        gallery: Array.isArray(item.gallery) ? item.gallery : [],
        featuredImage: item.featuredImage || null,
        image: item.featuredImage?.url || item.image || null,
        _id: item._id || item.id,
        color: getCategoryColor(item.category),
      }));
      setWorks(safeList);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
      setWorks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current) {
      gsap.fromTo(
        Array.from(heroRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    fetchWorks(activeCategory);
  }, [activeCategory, fetchWorks]);

  useEffect(() => {
    if (!loading && gridRef.current && works.length > 0) {
      gsap.fromTo(
        gridRef.current.querySelectorAll('.work-animate'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
      );
    }
  }, [works, loading]);

  return (
    <div style={{ background: WHITE }}>
      <style jsx global>{`
        @keyframes wshimmer { 0%,100%{opacity:.4} 50%{opacity:.85} }
        .fscroll::-webkit-scrollbar { display:none; }
        @media (max-width:1024px) { .wgrid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:600px)  { .wgrid { grid-template-columns:1fr !important; } }
        .section-label {
          display: inline-block; color: ${PINK}; font-weight: 700;
          letter-spacing: 0.12em; font-size: 0.72rem; font-family: 'Syne', sans-serif;
          margin-bottom: 1rem; background: ${PINK_LIGHT}; border: 1px solid ${PINK_MID};
          padding: 0.3rem 0.9rem; border-radius: 4px;
        }
        .section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800; color: ${INK}; margin-bottom: 1.5rem; line-height: 1.2;
        }
        .section-desc {
          color: ${INK60}; font-size: clamp(0.9rem, 2vw, 1rem);
          line-height: 1.7; font-family: 'DM Sans', sans-serif; max-width: 600px;
        }
      `}</style>

      <section
        style={{
          minHeight: '52vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '120px',
          paddingBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
          background: GRAD_HERO,
        }}
      >
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${PINK_LIGHT} 0%, transparent 70%)`, top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${PINK_MID} 0%, transparent 70%)`, bottom: '5%', left: '-5%', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          <div ref={heroRef}>
            <div className="section-label">Our Portfolio</div>
            <h1 className="section-title">
              Work that <span style={{ color: PINK }}>delivers</span>
            </h1>
            <p className="section-desc">
              Design, marketing & digital solutions we've delivered for businesses in Dubai and worldwide.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              {[['150+', 'Projects'], ['7', 'Categories'], ['200+', 'Happy Clients']].map(([n, l], i) => (
                <div key={`stat-${i}`}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.6rem', color: PINK, lineHeight: 1 }}>{n}</div>
                  <div style={{ color: INK60, fontSize: '0.78rem', marginTop: '0.2rem', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 2.5rem', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="fscroll" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    outline: 'none',
                    border: `1px solid ${isActive ? PINK : INK10}`,
                    background: isActive ? PINK_LIGHT : WHITE,
                    color: isActive ? PINK : INK60,
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 500,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = PINK;
                      e.currentTarget.style.color = PINK;
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = INK10;
                      e.currentTarget.style.color = INK60;
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {!loading && (
            <p style={{ color: INK60, fontSize: '0.78rem', marginTop: '0.75rem' }}>
              {works.length} project{works.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: '0 0 6rem', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          {error && (
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                background: OFF_WHITE,
                border: `1px solid ${INK10}`,
                color: PINK,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>⚠</span> {error}
            </div>
          )}
          <div ref={gridRef} className="wgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : works.length > 0 ? (
              works.map(work => (
                <div key={work._id} className="work-animate">
                  <WorkCard work={work} />
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                <p style={{ color: INK60, marginBottom: '1rem', fontSize: '0.95rem' }}>No projects in this category yet.</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: PINK,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  View all projects →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: OFF_WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ background: INK, borderRadius: '32px', padding: '4rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: WHITE, marginBottom: '1rem' }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
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
                fontFamily: "'Syne', sans-serif",
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