import React, { useRef, useEffect } from 'react';
import { ORANGE, INK30, INK10, marqItems } from '../../utils/constants';

export function MarqueeBar() {
  const marqRef = useRef(null);

  useEffect(() => {
    let x = 0, id;
    const animate = () => {
      if (!marqRef.current) return;
      x -= 0.6;
      const half = marqRef.current.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      marqRef.current.style.transform = `translateX(${x}px)`;
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{ borderTop: `1px solid ${INK10}`, borderBottom: `1px solid ${INK10}`, padding: '0.9rem 0', overflow: 'hidden', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
      <div ref={marqRef} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'fit-content', willChange: 'transform' }}>
        {[...marqItems, ...marqItems, ...marqItems, ...marqItems].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', padding: '0 2.5rem', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK30 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: ORANGE, flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}