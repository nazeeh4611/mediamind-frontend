import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Star } from 'lucide-react';
import { INK, INK60, INK10, WHITE, testimonials, INK30 } from '../../utils/constants';

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));
  const dupFirst = [...firstRow, ...firstRow];
  const dupSecond = [...secondRow, ...secondRow];

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; isDragging.current = true; };
  const onTouchEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent(p => Math.min(testimonials.length - 1, p + 1));
    else if (diff < -40) setCurrent(p => Math.max(0, p - 1));
  };

  return (
    <section ref={sectionRef} style={{ padding: isMobile ? '3rem 0' : '7rem 0', background: WHITE, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f3f4f6', borderRadius: 50, padding: '0.4rem 1.1rem', marginBottom: '1rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: WHITE, fontSize: '0.7rem' }}>💬</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: INK }}>Our Testimonials</span>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>What People are saying</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, maxWidth: 550, margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Our strategic know-how has enabled countless businesses to achieve their digital marketing goals and stand out brilliantly from the competition.
          </p>
        </div>

        {isMobile ? (
          <div>
            <div style={{ overflow: 'hidden', borderRadius: 24, touchAction: 'pan-y' }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div style={{ display: 'flex', transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)', transform: `translateX(${-current * 100}%)`, willChange: 'transform' }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{ minWidth: '100%', flexShrink: 0 }}>
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.85rem' }}>
              {testimonials.map((_, i) => (
                <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? INK : INK10, cursor: 'pointer', transition: 'all 0.3s ease' }} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
              <MarqueeRow direction="right" speed={70}>{dupFirst.map((t, i) => <TestimonialCard key={`f-${i}`} testimonial={t} />)}</MarqueeRow>
            </div>
            <div style={{ position: 'relative' }}>
              <MarqueeRow direction="left" speed={70}>{dupSecond.map((t, i) => <TestimonialCard key={`s-${i}`} testimonial={t} />)}</MarqueeRow>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function MarqueeRow({ children, direction, speed }) {
  const rowRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const rowWidth = row.scrollWidth / 2;
    const startX = direction === 'right' ? -rowWidth : 0;
    const endX = direction === 'right' ? 0 : -rowWidth;
    x.set(startX);
    animate(x, endX, { type: "tween", duration: speed, repeat: Infinity, repeatType: "loop", ease: "linear" });
    return () => { x.stop(); };
  }, [direction, speed, x]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div ref={rowRef} style={{ display: 'flex', gap: '1.25rem', width: 'fit-content', x }}>
        {children}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} style={{ background: '#f8f9fd', border: `1px solid ${INK10}`, borderRadius: 24, padding: '2rem', position: 'relative', width: 320, flexShrink: 0, cursor: 'pointer' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1rem', color: INK, marginBottom: '1rem' }}>{testimonial.company}</div>
      <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
        {Array(5).fill(0).map((_, si) => <Star key={si} size={14} style={{ color: '#ef4444', fill: '#ef4444' }} />)}
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK60, lineHeight: 1.85, fontStyle: 'italic', marginBottom: '1.5rem' }}>"{testimonial.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.25rem', borderTop: `1px solid ${INK10}` }}>
        <div style={{ display: 'flex', gap: '0.1rem' }}>
          {Array(5).fill(0).map((_, si) => <Star key={si} size={12} style={{ color: '#ef4444', fill: '#ef4444' }} />)}
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', color: INK }}>Clutch</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: INK30 }}>5.0 RATING</span>
      </div>
    </motion.div>
  );
}