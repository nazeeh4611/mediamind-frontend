"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Constants
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK30 = 'rgba(17, 17, 17, 0.3)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const WHITE = '#FFFFFF';

const services = [
  {
    bg: '#FFF7ED',
    accent: '#F97316',
    icon: '📱',
    tag: 'Digital Marketing',
    title: 'Social Media Management',
    stat: '200%',
    statLabel: 'Avg Engagement',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600'
  },
  {
    bg: '#F0F9FF',
    accent: '#0EA5E9',
    icon: '🌐',
    tag: 'Web Development',
    title: 'Custom Website Design',
    stat: '150+',
    statLabel: 'Projects Delivered',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600'
  },
  {
    bg: '#F3E8FF',
    accent: '#9333EA',
    icon: '🎯',
    tag: 'SEO',
    title: 'Search Engine Optimization',
    stat: '300%',
    statLabel: 'Traffic Growth',
    img: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=600'
  }
];

export function ServicesGrid() {
  return (
    <section style={{ padding: '6rem 0', background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em' }}>
            Innovative solutions for <em style={{ fontFamily: "'Inter', sans-serif", fontStyle: 'italic' }}>bold brands</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, marginTop: '1rem', maxWidth: 560, margin: '1rem auto 0' }}>
            Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable in every interaction.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.5rem',
              background: INK, color: WHITE,
              borderRadius: 50, fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              Let's craft together <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
          {services.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
              style={{
                background: s.bg,
                borderRadius: 24, overflow: 'hidden',
                border: `1px solid ${INK10}`,
                cursor: 'pointer',
              }}>
              <div style={{ height: 200, overflow: 'hidden' }}>
                <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  loading="lazy" />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.06)', borderRadius: 8, padding: '0.25rem 0.65rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: s.accent }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.accent }}>{s.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1rem', color: INK, marginBottom: '0.5rem' }}>{s.title}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: s.accent }}>{s.stat}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: INK30, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}