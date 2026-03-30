import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { MagneticBtn } from './MagneticBtn';
import { heroWords } from '../../utils/constants';

const BG_VIDEO = '/hero1.mp4';

export function HeroSection({ onEnterBtn, onLeaveBtn }) {
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  const [wordIdx, setWordIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Staggered entrance — each child animates in sequence
    const children = titleRef.current?.children;
    if (children) {
      gsap.fromTo(
        children,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.13,
          delay: 0.2,
        }
      );
    }
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.95 }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % heroWords.length);
        setAnimating(false);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const accentColors = ['#f97316', '#8b5cf6', '#22c55e', '#ec4899', '#3b82f6', '#eab308'];
  const currentWord = heroWords[wordIdx];
  const charCount = currentWord.length;
  const dynamicFontSize = charCount > 16 
    ? 'clamp(1.6rem, 4vw, 3.5rem)' 
    : charCount > 12 
      ? 'clamp(1.8rem, 5vw, 4rem)' 
      : 'clamp(2rem, 6vw, 5rem)';

  return (
    <>
      {/* Google Fonts: Inter (primary) + Orbitron (display) + Exo 2 (body) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&display=swap');

        .hero-rule {
          width: 72px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%);
          margin-bottom: 2.2rem;
        }

        .hero-word-ticker {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
        }

        /* Stroke outline variant for TRANSCENDENCE */
        .heading-outline {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.55);
          color: transparent;
        }

        /* Subtle scanline texture overlay */
        .scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.04) 3px,
            rgba(0,0,0,0.04) 4px
          );
          pointer-events: none;
          z-index: 4;
        }

        /* Animated corner bracket — top-left */
        .corner-bracket {
          position: absolute;
          top: 2.2rem;
          left: 2.2rem;
          width: 38px;
          height: 38px;
          border-top: 2px solid rgba(255,255,255,0.45);
          border-left: 2px solid rgba(255,255,255,0.45);
          z-index: 10;
        }

        /* bottom-right */
        .corner-bracket-br {
          position: absolute;
          bottom: 2.2rem;
          right: 2.2rem;
          width: 38px;
          height: 38px;
          border-bottom: 2px solid rgba(255,255,255,0.45);
          border-right: 2px solid rgba(255,255,255,0.45);
          z-index: 10;
        }

        .tag-label {
          font-family: 'Exo 2', sans-serif;
          font-weight: 500;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
      `}</style>

      <section
        className="scanlines"
        style={{
          minHeight: '100vh',
          background: '#08090f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '10vh',
          paddingBottom: '10vh',
        }}
      >
        {/* Background video */}
        <video
          src={BG_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Gradient overlay — heavier on left so text stays legible */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(8,9,15,0.88) 0%, rgba(8,9,15,0.55) 55%, rgba(8,9,15,0.25) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Purple glow — repositioned to upper-right */}
        <div style={{
          position: 'absolute',
          width: 420,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,50,210,0.45) 0%, rgba(100,20,180,0.2) 45%, transparent 70%)',
          top: '10%',
          right: '8%',
          zIndex: 3,
          pointerEvents: 'none',
          filter: 'blur(18px)',
        }} />

        {/* Accent glow — bottom accent */}
        <div style={{
          position: 'absolute',
          width: 280,
          height: 180,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${accentColors[wordIdx % accentColors.length]}33 0%, transparent 70%)`,
          bottom: '12%',
          left: '6%',
          zIndex: 3,
          pointerEvents: 'none',
          filter: 'blur(24px)',
          transition: 'background 0.8s ease',
        }} />

        {/* Diagonal lines — repositioned top-right */}
        <svg style={{ position: 'absolute', top: '6%', right: '3%', zIndex: 4 }} width="90" height="75" viewBox="0 0 90 75">
          <defs>
            <linearGradient id="dg1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5c518" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="dg2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5c518" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="dg3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5c518" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <line x1="65" y1="2" x2="15" y2="62" stroke="url(#dg1)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="6" x2="38" y2="72" stroke="url(#dg2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="88" y1="14" x2="60" y2="73" stroke="url(#dg3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Corner brackets */}
        <div className="corner-bracket" />
        <div className="corner-bracket-br" />

        {/* Scroll indicator — left edge */}
        <motion.div
          style={{
            position: 'absolute',
            left: '1.5rem',
            bottom: '3.5rem',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="tag-label" style={{ writingMode: 'vertical-rl', marginBottom: '8px' }}>scroll</span>
          <div style={{ width: 1, height: 44, background: 'rgba(255,255,255,0.3)' }} />
        </motion.div>

        {/* ── MAIN CONTENT — left-aligned, generous padding ── */}
        <div
          ref={titleRef}
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'left',
            paddingLeft: 'clamp(2rem, 8vw, 9rem)',
            paddingRight: 'clamp(2rem, 8vw, 9rem)',
            paddingTop: '4vh',
            paddingBottom: '4vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '900px',
          }}
        >

          {/* ── Row 1: eyebrow label ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.6rem', opacity: 0 }}>
            <div style={{ width: 28, height: 1.5, background: accentColors[wordIdx % accentColors.length], transition: 'background 0.6s' }} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              WE ARE
            </p>
          </div>

          {/* ── Row 2: DIGITAL — large filled ── */}
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(4rem, 12vw, 8.5rem)',
            color: '#ffffff',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: 0,
            marginBottom: '0.2rem',
            opacity: 0,
          }}>
            DIGITAL
          </h1>

          {/* ── Row 3: TRANSCENDENCE — smaller, outline/stroke style ── */}
          <h2 className="heading-outline" style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 5.5vw, 4.2rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '3rem',
            opacity: 0,
          }}>
            TRANSCENDENCE
          </h2>

          {/* ── Row 4: animated word ticker ── */}
          <div style={{
            minHeight: '4rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '3.5rem',
            opacity: 0,
            flexWrap: 'wrap',
          }}>
            <div style={{ width: 4, height: '100%', minHeight: '2.8rem', background: accentColors[wordIdx % accentColors.length], marginRight: '1rem', borderRadius: 2, transition: 'background 0.5s' }} />
            <span
              className="hero-word-ticker"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: dynamicFontSize,
                color: accentColors[wordIdx % accentColors.length],
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                transform: animating ? 'translateY(-14px)' : 'translateY(0)',
                opacity: animating ? 0 : 1,
                transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {currentWord}
            </span>
          </div>

          {/* ── Row 5: CTA ── */}
          <div ref={ctaRef} style={{ opacity: 0 }}>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.95rem 2.6rem',
                background: 'transparent',
                color: '#fff',
                borderRadius: 3,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                border: '1.5px solid rgba(255,255,255,0.55)',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => onEnterBtn('')}
              onMouseLeave={onLeaveBtn}
            >
              Contact Us
              {/* Small right-arrow glyph */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5H12M8 1L12 5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticBtn>
          </div>

        </div>
      </section>
    </>
  );
}