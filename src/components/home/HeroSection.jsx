import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { MagneticBtn } from './MagneticBtn';
import { GRAD_HERO, INK, INK60, INK30, INK10, WHITE, heroWords } from '../../utils/constants';

export function HeroSection({ onEnterBtn, onLeaveBtn, rootVideoSrc, logoVideoSrc }) {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6 });
    gsap.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.8 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const colors = ['#22c55e', '#8b5cf6', '#f97316', '#ec4899', '#3b82f6', '#eab308'];
  const currentWord = heroWords[wordIdx];

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#ffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '7rem',
        paddingBottom: '4rem'
      }}
    >
      {/* <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={logoVideoSrc}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '520px',
            opacity: 0.15
          }}
        />
      </div> */}

      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={rootVideoSrc}
          style={{
            position: 'absolute',
            left: '8%',
            bottom: '8%',
            width: '560px',
            opacity: 0.85
          }}
        />
      </div>

      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 5,
          maxWidth: 1000,
          padding: '0 1.25rem',
          width: '100%'
        }}
      >
        <div ref={titleRef}>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem,6vw,5.5rem)',
              color: INK,
              lineHeight: 1.1
            }}
          >
            Building bold brands with
          </h1>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 'clamp(3rem,7vw,6.5rem)',
              color: colors[wordIdx % colors.length]
            }}
          >
            {currentWord}
          </h1>
        </div>

        <p
          ref={subRef}
          style={{
            fontSize: '1.05rem',
            color: INK60,
            lineHeight: 1.8,
            maxWidth: 580,
            margin: '1.5rem auto 2.5rem'
          }}
        >
          Our suite of comprehensive services is designed to place your brand front and center in the ever-evolving digital arena.
        </p>

        <div ref={ctaRef} style={{ marginBottom: '3rem' }}>
          <MagneticBtn
            to="/contact"
            style={{
              padding: '0.9rem 2rem',
              background: INK,
              color: WHITE,
              borderRadius: 50,
              fontWeight: 700
            }}
            onMouseEnter={() => onEnterBtn('')}
            onMouseLeave={onLeaveBtn}
          >
            Get Started
          </MagneticBtn>
        </div>

        <div
          ref={statsRef}
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: '2rem',
            borderTop: `1px solid ${INK10}`
          }}
        >
          {[
            { v: '200+', l: 'Clients' },
            { v: '98%', l: 'Retention' },
            { v: '8×', l: 'ROAS' },
            { v: '$50M+', l: 'Revenue' }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '2rem', color: INK }}>{s.v}</div>
              <div style={{ fontSize: '0.7rem', color: INK30 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5
        }}
      >
        <ChevronDown size={18} color={INK30} />
      </motion.div>
    </section>
  );
}