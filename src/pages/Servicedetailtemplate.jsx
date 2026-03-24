import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import FloatingOrbs from './Floatingorbs';
import CTABanner from './Ctabanner';

export default function ServiceDetailTemplate({
  icon,
  title,
  metric,
  metricLabel,
  heroDesc,
  accentColor,
  image,
  features,
  process,
  results,
}) {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(heroRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const colorRgb = {
    '#B2278C': '178,39,140',
    '#185EA7': '24,94,167',
    '#814B97': '129,75,151',
  }[accentColor] || '178,39,140';

  return (
    <div>
      <style>{`
        .feature-card:hover { transform: translateY(-4px); border-color: ${accentColor}66 !important; }
        .process-step:hover { transform: translateY(-4px); border-color: ${accentColor}66 !important; }
        .result-card:hover { transform: translateY(-4px); border-color: ${accentColor}66 !important; }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-layout { grid-template-columns: 1fr !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        minHeight: '70vh', display: 'flex', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <FloatingOrbs count={4} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
          background: `radial-gradient(ellipse at top right, ${accentColor}15, transparent 60%)`,
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.5rem 1.2rem',
                background: `rgba(${colorRgb},0.1)`,
                border: `1px solid ${accentColor}40`,
                borderRadius: '50px', marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <span style={{ color: accentColor, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>{title}</span>
              </div>
              <h1 className="section-title" style={{ color: '#ffffff', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: accentColor }}>{metric}</span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{metricLabel}</span>
              </div>
              <p style={{ color: '#b0b0b0', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                {heroDesc}
              </p>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.9rem 2rem', background: accentColor, color: '#fff',
                borderRadius: '50px', textDecoration: 'none', fontWeight: 700,
                transition: 'all 0.3s', boxShadow: `0 0 30px ${accentColor}60`,
              }}>
                Get Started <span>→</span>
              </Link>
            </div>
            <div style={{
              borderRadius: '24px', overflow: 'hidden', height: '400px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}>
              <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              What we <span style={{ color: accentColor }}>offer</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>Comprehensive solutions tailored to your business needs</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{
                padding: '1.75rem', background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '20px',
                transition: 'all 0.3s', backdropFilter: 'blur(10px)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Our <span style={{ color: accentColor }}>process</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>A proven methodology that delivers results</p>
          </div>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {process.map((p, i) => (
              <div key={i} className="process-step" style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '20px',
                textAlign: 'center', transition: 'all 0.3s',
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%', background: `${accentColor}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem', fontSize: '1.2rem', fontWeight: 700, color: accentColor,
                }}>{i + 1}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Results we've <span style={{ color: accentColor }}>delivered</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>Real numbers from real client work</p>
          </div>
          <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {results.map((r, i) => (
              <div key={i} className="result-card" style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '20px',
                textAlign: 'center', transition: 'all 0.3s',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: accentColor, marginBottom: '0.25rem' }}>
                  {r.value}
                </div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.25rem' }}>{r.label}</div>
                <div style={{ color: '#666', fontSize: '0.7rem' }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}