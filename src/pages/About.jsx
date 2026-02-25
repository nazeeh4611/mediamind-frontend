import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingOrbs from '../components/Floatingorbs';
import CTABanner from '../components/Ctabanner';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Alex Rivera', role: 'CEO & Growth Strategist', avatar: 'AR', color: '#B2278C', desc: '10+ years scaling DTC brands from 0 to $50M+' },
  { name: 'Zara Malik', role: 'Head of Performance Marketing', avatar: 'ZM', color: '#185EA7', desc: 'Former Google and Meta ads lead. Managed $100M+ in spend.' },
  { name: 'James Chen', role: 'CRM & Automation Lead', avatar: 'JC', color: '#814B97', desc: 'HubSpot Diamond Partner with 8 years of CRM architecture.' },
  { name: 'Priya Nair', role: 'Head of Creative', avatar: 'PN', color: '#B2278C', desc: 'Award-winning designer with content that has reached 50M+ viewers.' },
];

const values = [
  { icon: '🎯', title: 'Results First', desc: 'Every decision we make is tied to measurable outcomes. We don\'t do vanity metrics.' },
  { icon: '🔬', title: 'Data-Driven', desc: 'Intuition informed by data. We test everything and let the numbers guide strategy.' },
  { icon: '🤝', title: 'True Partnership', desc: 'We treat your business like our own. Your wins are our wins. Your goals become ours.' },
  { icon: '🚀', title: 'Always Evolving', desc: 'Marketing moves fast. We stay ahead of algorithm changes, trends, and platform shifts.' },
];

export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(heroRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
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
          <div ref={heroRef} style={{ maxWidth: 720 }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>About MediaMind</p>
            <h1 className="section-title" style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
              We're builders who<br />
              <span style={{ color: '#B2278C' }}>obsess over your growth</span>
            </h1>
            <p className="section-desc" style={{ color: '#e0e0e0' }}>
              MediaMind was founded with one belief: that exceptional marketing should be accessible to every ambitious brand, not just Fortune 500 companies with bloated budgets. We combine the expertise of a large agency with the agility and care of a boutique studio.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: '#B2278C', border: 'none' }}>Work With Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Our Story</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#ffffff' }}>
                From frustrated marketers to growth architects
              </h2>
              <p style={{ color: '#e0e0e0', lineHeight: 1.8, marginBottom: '1rem' }}>
                We started MediaMind after watching too many great companies waste their budgets on agencies that prioritized looking busy over driving results. Fancy reports, generic strategies, and zero accountability.
              </p>
              <p style={{ color: '#e0e0e0', lineHeight: 1.8, marginBottom: '1rem' }}>
                We built the agency we always wished existed — one where every dollar spent is tracked, every strategy is tested, and every client relationship is treated as a genuine partnership.
              </p>
              <p style={{ color: '#e0e0e0', lineHeight: 1.8 }}>
                Today, we've helped 200+ brands across e-commerce, SaaS, and professional services achieve sustainable, scalable growth through performance marketing, CRM optimization, and high-impact creative.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { n: '200+', l: 'Brands Scaled' },
                { n: '$50M+', l: 'Ad Spend Managed' },
                { n: '4 yrs', l: 'In Business' },
                { n: '98%', l: 'Client Retention' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '1.5rem', background: 'rgba(0,0,0,0.3)',
                  border: '1px solid #B2278C',
                  borderRadius: '16px', textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '2rem', color: '#B2278C', marginBottom: '0.25rem',
                  }}>{s.n}</div>
                  <div style={{ color: '#e0e0e0', fontSize: '0.85rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
        `}</style>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Our Values</p>
          <h2 className="section-title" style={{ marginBottom: '3rem', color: '#ffffff' }}>What drives us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} style={{
                padding: '2rem', background: 'rgba(0,0,0,0.3)',
                border: '1px solid #185EA7', borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>{v.title}</h3>
                <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>The Team</p>
          <h2 className="section-title" style={{ marginBottom: '3rem', color: '#ffffff' }}>Meet the people behind the results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {team.map((t, i) => (
              <div key={i} style={{
                padding: '2rem', background: 'rgba(0,0,0,0.3)',
                border: '1px solid #185EA7', borderRadius: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${t.color}44`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#185EA7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1.25rem',
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
                  color: '#ffffff'
                }}>{t.avatar}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.25rem', color: '#ffffff' }}>{t.name}</h3>
                <div style={{ color: t.color, fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>{t.role}</div>
                <p style={{ color: '#e0e0e0', fontSize: '0.85rem', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}