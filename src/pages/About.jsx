import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import {MagneticBtn} from '../components/home/MagneticBtn';
import { 
  WHITE, INK, INK60, INK30, INK20, INK10, 
  OFF_WHITE, ORANGE, PURPLE, GRAD_HERO 
} from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Ahmed Al Mansoori', role: 'Founder & Growth Strategist', avatar: 'AA', color: ORANGE, desc: '10+ years in digital marketing, helping UAE businesses scale online.' },
  { name: 'Sarah Khalid', role: 'Head of Performance Marketing', avatar: 'SK', color: '#3b82f6', desc: 'Certified Google Ads and Meta specialist with 8 years of experience.' },
  { name: 'Omar Hassan', role: 'Creative Director', avatar: 'OH', color: '#8b5cf6', desc: 'Award-winning designer with a passion for brand storytelling.' },
  { name: 'Leila Mahmoud', role: 'Client Success Manager', avatar: 'LM', color: '#ec4899', desc: 'Dedicated to ensuring every client achieves their business goals.' },
];

const values = [
  { icon: '🎯', title: 'Results First', desc: 'Every decision we make is tied to measurable outcomes. We don\'t do vanity metrics.' },
  { icon: '🔬', title: 'Data-Driven', desc: 'Intuition informed by data. We test everything and let the numbers guide strategy.' },
  { icon: '🤝', title: 'True Partnership', desc: 'We treat your business like our own. Your wins are our wins.' },
  { icon: '🚀', title: 'Always Evolving', desc: 'Marketing moves fast. We stay ahead of algorithm changes and trends.' },
];

export default function About() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Hero animations
    gsap.fromTo(heroRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );

    // Story section animations
    if (storyRef.current) {
      gsap.fromTo(storyRef.current.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%' }
        }
      );
    }

    // Values section animations
    gsap.utils.toArray('.value-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.1,
        }
      );
    });

    // Team section animations
    gsap.utils.toArray('.team-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.1,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ background: WHITE }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-block;
          padding: 0.25rem 0.9rem;
          border-radius: 50px;
          background: ${INK10};
          color: ${INK60};
        }
        
        .section-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: ${INK};
        }
        
        .section-desc {
          font-family: 'Inter', sans-serif;
          color: ${INK60};
          line-height: 1.8;
          font-size: 1rem;
        }
        
        .team-card, .value-card {
          transition: all 0.3s ease;
          background: ${WHITE};
          border: 1px solid ${INK10};
          border-radius: 24px;
        }
        
        .team-card:hover, .value-card:hover {
          transform: translateY(-6px);
          border-color: ${ORANGE};
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        
        .stat-card {
          transition: all 0.3s ease;
          background: ${OFF_WHITE};
          border: 1px solid ${INK10};
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: ${ORANGE};
          background: ${WHITE};
        }
        
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
        
        @media (max-width: 480px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        background: GRAD_HERO,
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, width: '100%' }}>
          <div ref={heroRef} style={{ maxWidth: 720 }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: ORANGE, background: `${INK10}` }}>About MediaMind</p>
            <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
              We're builders who<br />
              <span style={{ color: ORANGE }}>obsess over your growth</span>
            </h1>
            <p className="section-desc">
              MediaMind was founded with one belief: that exceptional marketing should be accessible to every ambitious brand. We combine the expertise of a large agency with the agility and care of a boutique studio.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <MagneticBtn
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '1rem 2.5rem',
                  background: INK,
                  color: WHITE,
                  borderRadius: 50,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 30px rgba(17,17,17,0.2)',
                }}>
                Work With Us <ArrowUpRight size={16} />
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} style={{ padding: '6rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
            <div className="animate-item">
              <p className="section-label" style={{ marginBottom: '1rem', color: ORANGE }}>Our Story</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                From frustrated marketers to growth architects
              </h2>
              <p style={{ color: INK60, lineHeight: 1.8, marginBottom: '1rem' }}>
                We started MediaMind after watching too many great companies waste their budgets on agencies that prioritized looking busy over driving results.
              </p>
              <p style={{ color: INK60, lineHeight: 1.8, marginBottom: '1rem' }}>
                We built the agency we always wished existed — one where every dollar spent is tracked, every strategy is tested, and every client relationship is treated as a genuine partnership.
              </p>
              <p style={{ color: INK60, lineHeight: 1.8 }}>
                Today, we've helped 200+ brands across e-commerce, hospitality, and professional services achieve sustainable, scalable growth through performance marketing and high-impact creative.
              </p>
            </div>
            
            <div className="animate-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { n: '200+', l: 'Brands Scaled' },
                { n: '$50M+', l: 'Revenue Generated' },
                { n: '8×', l: 'Avg. ROAS' },
                { n: '98%', l: 'Client Retention' },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: ORANGE,
                    marginBottom: '0.25rem',
                  }}>{s.n}</div>
                  <div style={{ color: INK60, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '6rem 0', background: OFF_WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem', color: ORANGE, background: `${INK10}` }}>Our Values</p>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>What drives us</h2>
          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={i} className="value-card" style={{
                padding: '2rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, marginBottom: '0.5rem', color: INK, fontSize: '1.25rem' }}>{v.title}</h3>
                <p style={{ color: INK60, fontSize: '0.9rem', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} style={{ padding: '6rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem', color: ORANGE, background: `${INK10}` }}>The Team</p>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>Meet the people behind the results</h2>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {team.map((t, i) => (
              <div key={i} className="team-card" style={{
                padding: '2rem',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  margin: '0 auto 1.25rem',
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: WHITE
                }}>{t.avatar}</div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, marginBottom: '0.25rem', color: INK, fontSize: '1.1rem' }}>{t.name}</h3>
                <div style={{ color: t.color, fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.role}</div>
                <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: INK,
            borderRadius: 28,
            padding: '3rem 4rem',
            textAlign: 'center',
          }}>
            <h2 style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 800, 
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: WHITE,
              marginBottom: '1rem'
            }}>
              Ready to grow with us?
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem',
              marginBottom: '2rem',
              maxWidth: 500,
              margin: '0 auto 2rem'
            }}>
              Let's create something amazing together. We're just a message away.
            </p>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1rem 2.5rem',
                background: WHITE,
                color: INK,
                borderRadius: 50,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
              }}>
              Start Your Journey <ArrowUpRight size={16} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}