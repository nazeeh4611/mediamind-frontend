import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { INK, INK60, INK10, WHITE, testimonials,INK30 } from '../../utils/constants';

export function TestimonialsSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} style={{ padding: '7rem 0', background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f3f4f6', borderRadius: 50, padding: '0.4rem 1.1rem', marginBottom: '1rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: WHITE, fontSize: '0.7rem' }}>💬</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: INK }}>Our Testimonials</span>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>What People are saying</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, maxWidth: 550, margin: '0 auto', lineHeight: 1.7 }}>
            Our strategic know-how has enabled countless businesses to achieve their digital marketing solutions and stand out brilliantly from the competition.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              style={{
                background: '#f8f9fd',
                border: `1px solid ${INK10}`,
                borderRadius: 24,
                padding: '2.5rem',
                position: 'relative',
              }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1rem', color: INK, marginBottom: '1rem' }}>{t.company}</div>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
                {Array(5).fill(0).map((_, si) => <Star key={si} size={14} style={{ color: '#ef4444', fill: '#ef4444' }} />)}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK60, lineHeight: 1.85, fontStyle: 'italic', marginBottom: '1.5rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.25rem', borderTop: `1px solid ${INK10}` }}>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {Array(5).fill(0).map((_, si) => <Star key={si} size={12} style={{ color: '#ef4444', fill: '#ef4444' }} />)}
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', color: INK }}>Clutch</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: INK30 }}>5.0 RATING</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}