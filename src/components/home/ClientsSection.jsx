import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { INK, INK60, INK10, OFF_WHITE, WHITE, clients } from '../../utils/constants';

export function ClientsSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.client-item');
    gsap.fromTo(items, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.05,
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    });
  }, []);

  return (
    <section style={{ padding: '5rem 0', background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f3f4f6', borderRadius: 50, padding: '0.4rem 1.1rem', marginBottom: '1rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: WHITE, fontSize: '0.7rem' }}>👥</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: INK }}>Our Customers</span>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Our Clients</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, fontSize: '1rem' }}>Brands that trust us to elevate their digital presence.</p>
        </div>
        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          {clients.map((c, i) => (
            <div key={i} className="client-item" style={{
              padding: '0.75rem 1.5rem',
              background: OFF_WHITE,
              borderRadius: 12,
              border: `1px solid ${INK10}`,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '0.88rem',
              color: INK60,
              opacity: 0,
            }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}