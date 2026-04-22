"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Constants
const INK = '#111111';
const INK30 = 'rgba(17, 17, 17, 0.3)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';
const WHITE = '#FFFFFF';

const stats = [
  { v: '200+', l: 'Happy Clients' },
  { v: '500+', l: 'Projects Completed' },
  { v: '50+', l: 'Team Members' },
  { v: '15+', l: 'Years Experience' }
];

export function StatsBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{ background: OFF_WHITE, padding: '4rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1px', background: INK10, borderRadius: 20, overflow: 'hidden', border: `1px solid ${INK10}` }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ padding: isMobile ? '2rem 1rem' : '3rem 2rem', background: WHITE, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,3.5rem)', color: INK, lineHeight: 1, marginBottom: '0.4rem' }}>{s.v}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: INK30, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}