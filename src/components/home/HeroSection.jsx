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
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '2rem',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .hero-logo-video {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .hero-logo-video video {
          width: 920px;
          max-width: 90%;
          opacity: 0.2;
        }
        @media (max-width: 768px) {
          .hero-logo-video {
            align-items: flex-start;
          }
          .hero-logo-video video {
            max-width: 90%;
            margin-top: 5%;
          }
        }
        .hero-robot-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 4;
          pointer-events: none;
        }
        .hero-robot-wrap video {
          display: block;
          width: 220px;
          opacity: 0.9;
        }
        @media (max-width: 480px) {
          .hero-robot-wrap video {
            width: 110px;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .hero-robot-wrap video {
            width: 150px;
          }
        }
        .hero-stats-grid {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 2rem;
        }
        @media (max-width: 360px) {
          .hero-stats-grid {
            gap: 1rem;
          }
        }
      `}</style>

      <div className="hero-logo-video">
        <video autoPlay loop muted playsInline src={logoVideoSrc} />
      </div>

      <div className="hero-robot-wrap">
        <video autoPlay loop muted playsInline src={rootVideoSrc} />
      </div>

      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 5,
          maxWidth: 1000,
          padding: '0 1.5rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div ref={titleRef}>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 5.5vw, 5.5rem)',
              color: INK,
              lineHeight: 1.15,
              margin: 0,
              wordBreak: 'break-word'
            }}
          >
            Building bold brands with
          </h1>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 'clamp(2.25rem, 7vw, 6.5rem)',
              color: colors[wordIdx % colors.length],
              margin: '0.15rem 0 0',
              lineHeight: 1.1,
              wordBreak: 'break-word',
              transition: 'color 0.3s ease'
            }}
          >
            {currentWord}
          </h1>
        </div>

        <p
          ref={subRef}
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: INK60,
            lineHeight: 1.8,
            maxWidth: 580,
            margin: '1.5rem auto 2.5rem',
            padding: '0 0.5rem'
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
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              display: 'inline-block'
            }}
            onMouseEnter={() => onEnterBtn('')}
            onMouseLeave={onLeaveBtn}
          >
            Get Started
          </MagneticBtn>
        </div>

        <div
          ref={statsRef}
          className="hero-stats-grid"
          style={{ borderTop: `1px solid ${INK10}` }}
        >
          {[
            { v: '200+', l: 'Clients' },
            { v: '98%', l: 'Retention' },
            { v: '8×', l: 'ROAS' },
            { v: '$50M+', l: 'Revenue' }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '56px' }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(1.3rem, 4vw, 2rem)',
                  color: INK
                }}
              >
                {s.v}
              </div>
              <div style={{ fontSize: '0.7rem', color: INK30, marginTop: '0.2rem' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
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