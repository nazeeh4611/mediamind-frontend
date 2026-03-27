import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { MagneticBtn } from './MagneticBtn';
import { INK, INK60, INK10, WHITE, LAVENDER, PURPLE, serviceCategories } from '../../utils/constants';

export function InnovationBanner({ onEnterBtn, onLeaveBtn }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector('.innov-title'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
    );
  }, []);

  return (
    <section ref={ref} style={{ padding: '5rem 0', background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <svg style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', width: '100%', pointerEvents: 'none' }} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,10 400,110 600,60 C800,10 1000,110 1200,60" fill="none" stroke={LAVENDER} strokeWidth="3" strokeDasharray="0" />
          </svg>
          <h2 className="innov-title" style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem,4.5vw,3.8rem)',
            color: INK,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            position: 'relative',
            zIndex: 1,
            opacity: 0,
          }}>
            Where innovation meets <em style={{ fontFamily: "'Inter', sans-serif", fontStyle: 'italic', color: PURPLE }}>aesthetics</em>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {serviceCategories.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              style={{
                background: s.bg,
                borderRadius: 20,
                padding: '1.5rem 1.8rem',
                width: 170,
                cursor: 'pointer',
                border: `1px solid ${INK10}`,
              }}>
              <div style={{ color: s.color, marginBottom: '1rem' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: INK, lineHeight: 1.3 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{
          background: INK, borderRadius: 20, padding: '1.8rem 3rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1.05rem', color: WHITE, marginBottom: '0.25rem' }}>See Our Work in Action.</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)' }}>Start Your Creative Journey with Us!</p>
          </div>
          <MagneticBtn to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.9rem 2rem',
              background: WHITE, color: INK,
              borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.88rem',
            }}
            onMouseEnter={() => onEnterBtn('')} onMouseLeave={onLeaveBtn}>
            Let's Collaborate <ArrowUpRight size={16} />
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
}