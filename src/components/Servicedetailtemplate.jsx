import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import FloatingOrbs from './Floatingorbs';
import CTABanner from './CTABanner';

export default function ServiceDetailTemplate({
  icon, title, metric, metricLabel, heroDesc,
  features, process, results, accentColor = '#B2278C',
}) {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(heroRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div>
      <section style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '4rem', position: 'relative', overflow: 'hidden',
        background: 'transparent'
      }}>
        <FloatingOrbs count={5} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} style={{ maxWidth: 680 }}>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              color: '#e0e0e0', fontSize: '0.85rem', marginBottom: '2rem',
              fontFamily: 'var(--font-display)', fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#B2278C'}
            onMouseLeave={e => e.currentTarget.style.color = '#e0e0e0'}
            >← Back to Services</Link>

            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{icon}</div>

            <div style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}44`,
              borderRadius: '50px',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '0.85rem', color: accentColor,
              marginBottom: '1.5rem',
            }}>{metric} {metricLabel}</div>

            <h1 className="section-title" style={{ marginBottom: '1.5rem', color: '#ffffff' }}>{title}</h1>
            <p className="section-desc" style={{ color: '#e0e0e0' }}>{heroDesc}</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: '#B2278C', border: 'none' }}>Get Started</Link>
              <a href="#features" className="btn-outline" style={{ borderColor: '#B2278C', color: '#ffffff' }}>See What's Included</a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Features</p>
          <h2 className="section-title" style={{ marginBottom: '3rem', maxWidth: 500, color: '#ffffff' }}>What's included</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid #185EA7',
                borderRadius: '20px',
                padding: '1.75rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${accentColor}44`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#185EA7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{f.title}</h3>
                <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Process</p>
          <h2 className="section-title" style={{ marginBottom: '3rem', maxWidth: 500, color: '#ffffff' }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 700 }}>
            {process.map((p, i) => (
              <div key={i} style={{
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                padding: '1.5rem', background: 'rgba(0,0,0,0.3)',
                border: '1px solid #185EA7', borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `${accentColor}22`, border: `1px solid ${accentColor}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem',
                  color: accentColor,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{p.title}</h3>
                  <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Results</p>
          <h2 className="section-title" style={{ marginBottom: '3rem', maxWidth: 500, color: '#ffffff' }}>Real outcomes</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem',
          }}>
            {results.map((r, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2rem',
                background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
                border: `1px solid ${accentColor}22`,
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1,
                  color: accentColor, marginBottom: '0.5rem',
                }}>{r.value}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.25rem', color: '#ffffff' }}>{r.label}</div>
                <div style={{ color: '#e0e0e0', fontSize: '0.8rem' }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}