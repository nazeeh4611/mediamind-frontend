import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { INK, INK60, INK10, OFF_WHITE, WHITE, ORANGE, blogs,INK30 } from '../../utils/constants';

export function BlogSection() {
  return (
    <section style={{ padding: '7rem 0', background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{
              display: 'inline-block', padding: '0.25rem 0.9rem',
              border: `1px solid ${INK10}`, borderRadius: 50,
              fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: INK60,
              background: OFF_WHITE, marginBottom: '0.75rem',
            }}>Blogs</span>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em' }}>Insights and News</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, marginTop: '0.4rem' }}>Discover latest articles and guides</p>
          </div>
          <Link to="/blogs" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: ORANGE, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            View All <ArrowUpRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {blogs.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: WHITE, border: `1px solid ${INK10}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 220, overflow: 'hidden', background: OFF_WHITE }}>
                <img src={b.img} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  loading="lazy" />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: ORANGE }}>{b.category}</span>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1rem', color: INK, margin: '0.6rem 0 0.5rem', lineHeight: 1.4 }}>{b.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: INK30 }}>{b.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}