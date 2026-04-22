"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedScribbleLine } from './AnimatedScribbleLine';

// Constants
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';
const WHITE = '#FFFFFF';

const cards = [
  {
    bg: 'linear-gradient(135deg, #fde8d8 0%, #fcd5b8 100%)',
    gradStop: 'rgba(253,232,216,0.98)',
    img: '/webman.avif',
    title: 'We build websites that grow your business.',
    desc: 'Fast, scalable, and designed for results.',
  },
  {
    bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    gradStop: 'rgba(219,234,254,0.98)',
    img: '/nfcmain copy.avif',
    title: 'Streamline customer engagement with smart NFC solutions.',
    desc: 'Designed to improve connections, generate leads, and grow your business.',
  },
];

export function BentoServicesSection({ onEnterBtn, onLeaveBtn }) {
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

  useEffect(() => {
    if (!sectionRef.current || isMobile) return;
    const cardEls = sectionRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(cardEls, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });
  }, [isMobile]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };
  const onTouchEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent(p => Math.min(cards.length - 1, p + 1));
    else if (diff < -40) setCurrent(p => Math.max(0, p - 1));
  };

  return (
    <section ref={sectionRef} style={{ padding: isMobile ? '3rem 0' : '6rem 0', background: WHITE, position: 'relative', overflow: 'hidden' }}>
      {!isMobile && <AnimatedScribbleLine />}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block', padding: '0.25rem 0.9rem',
            border: `1px solid ${INK10}`, borderRadius: 50,
            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: INK60,
            background: OFF_WHITE, marginBottom: '0.75rem',
          }}>What We Do</span>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em' }}>
            Everything your brand needs
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0', fontSize: '0.95rem' }}>
            From strategy to execution, we cover every dimension of digital growth.
          </p>
        </div>

        {isMobile ? (
          <div style={{ width: '100%' }}>
            <div
              style={{ width: '100%', overflow: 'hidden', borderRadius: 24, touchAction: 'pan-y' }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div style={{
                display: 'flex',
                width: `${cards.length * 100}%`,
                transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: `translateX(${(-current * 100) / cards.length}%)`,
                willChange: 'transform',
              }}>
                {cards.map((card, i) => (
                  <div key={i} style={{
                    width: `${100 / cards.length}%`,
                    flexShrink: 0,
                    height: 400,
                    background: card.bg,
                    borderRadius: 24,
                    overflow: 'hidden',
                    position: 'relative',
                    border: `1px solid ${INK10}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '58%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '1rem 1rem 0',
                    }}>
                      <img
                        src={card.img}
                        alt={card.title}
                        style={{
                          width: '65%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'bottom',
                          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))',
                          display: 'block',
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '1.25rem 1.25rem 1.5rem',
                      background: `linear-gradient(to top, ${card.gradStop} 65%, transparent)`,
                    }}>
                      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1rem', color: INK, lineHeight: 1.3, marginBottom: '0.35rem' }}>
                        {card.title}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: INK60, lineHeight: 1.6 }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {cards.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? INK : INK10,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                className="bento-card"
                whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: card.bg,
                  borderRadius: 28,
                  overflow: 'hidden',
                  opacity: 0,
                  minHeight: 490,
                  position: 'relative',
                  cursor: 'pointer',
                  border: `1px solid ${INK10}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '140px', overflow: 'hidden' }}>
                  <img src={card.img} alt={card.title} style={{ width: '75%', height: 'auto', objectFit: 'contain', objectPosition: 'bottom', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} loading="lazy" />
                </div>
                <div style={{ position: 'relative', zIndex: 2, padding: '1.75rem 2rem', background: `linear-gradient(to top, ${card.gradStop} 60%, transparent)` }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: INK, lineHeight: 1.25, marginBottom: '0.5rem' }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: INK60, lineHeight: 1.65 }}>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}