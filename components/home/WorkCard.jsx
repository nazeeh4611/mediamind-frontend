"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { INK, INK60, INK30, INK10, OFF_WHITE, WHITE, ORANGE } from '../../utils/constants';

export function WorkCard({ work, i }) {
  const [err, setErr] = useState(false);
  const img = work.featuredImage?.url || work.image || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min((i % 3) * 0.1, 0.3) }}>
      <Link href={`/works/${work._id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{
          background: WHITE, border: `1px solid ${INK10}`,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 2px 20px rgba(17,17,17,0.04)',
        }}>
          <div style={{ height: 240, overflow: 'hidden', position: 'relative', background: OFF_WHITE }}>
            {!err && img ? (
              <img src={img} alt={work.title} onError={() => setErr(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                loading="lazy" />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK10, fontSize: '2.5rem' }}>◻</div>
            )}
            {work.result && (
              <span style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.85rem', borderRadius: 50, background: ORANGE, color: WHITE, fontWeight: 700, fontSize: '0.6rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}>
                {work.result}
              </span>
            )}
          </div>
          <div style={{ padding: '1.6rem' }}>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {(Array.isArray(work.tags) ? work.tags : []).slice(0, 3).map((tag, ti) => (
                <span key={ti} style={{ padding: '0.12rem 0.55rem', borderRadius: 50, fontSize: '0.56rem', fontWeight: 600, background: OFF_WHITE, color: INK60, border: `1px solid ${INK10}`, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif" }}>{tag}</span>
              ))}
            </div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1rem', color: INK, marginBottom: '0.35rem' }}>{work.title}</h3>
            <p style={{ color: INK60, fontSize: '0.75rem', lineHeight: 1.75, marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>
              {(work.desc || '').slice(0, 90)}{(work.desc || '').length > 90 ? '…' : ''}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${INK10}`, paddingTop: '0.8rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.58rem', color: INK30, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{work.resultLabel}</span>
              <span style={{ color: ORANGE, fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                View <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}