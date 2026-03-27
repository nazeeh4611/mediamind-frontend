import React from 'react';
import { motion } from 'framer-motion';
import { INK, INK30, OFF_WHITE, WHITE, INK10, stats } from '../../utils/constants';

export function StatsBar() {
  return (
    <section style={{ background: OFF_WHITE, padding: '4rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: INK10, borderRadius: 20, overflow: 'hidden', border: `1px solid ${INK10}` }}>
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ padding: '3rem 2rem', background: WHITE, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, lineHeight: 1, marginBottom: '0.4rem' }}>{s.v}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: INK30, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}