import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { WorkCard } from './WorkCard';
import { INK, INK60, INK10, OFF_WHITE, WHITE, ORANGE,INK30 } from '../../utils/constants';

export function RecentWorksSection({ works, loading }) {
  return (
    <section style={{ padding: '7rem 0', background: OFF_WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em' }}>Our Work</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, marginTop: '0.5rem' }}>Results that speak for themselves.</p>
          </div>
          <Link to="/works" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: ORANGE, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            View All Projects <ArrowUpRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: 20, overflow: 'hidden', background: WHITE, border: `1px solid ${INK10}` }}>
                <div style={{ height: 240, background: OFF_WHITE, animation: 'shimmer 1.5s infinite' }} />
                <div style={{ padding: '1.5rem' }}>
                  {[70, 50, 90].map((w, j) => <div key={j} style={{ height: 10, width: `${w}%`, borderRadius: 5, background: OFF_WHITE, marginBottom: '0.55rem' }} />)}
                </div>
              </div>
            ))}
          </div>
        ) : works.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {works.map((work, i) => <WorkCard key={work._id || i} work={work} i={i} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: INK30, fontFamily: "'Inter', sans-serif" }}>Projects coming soon.</div>
        )}
      </div>
    </section>
  );
}