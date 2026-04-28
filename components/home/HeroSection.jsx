"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { MagneticBtn } from './MagneticBtn';

const heroWords = ['Branding', 'Strategy', 'Growth', 'Marketing', 'Content', 'Results'];
const wordColors = ['#cc44ff', '#f97316', '#22c55e', '#ec4899', '#3b82f6', '#eab308'];

export function HeroSection({ onEnterBtn, onLeaveBtn }) {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.to(subRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
    gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx(i => (i + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&family=Pinyon+Script&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 3.5rem;
          position: relative;
          z-index: 20;
        }
        .hero-nav-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .hero-nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .brand-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.08em;
          color: #1a1a2e;
        }
        .brand-sub {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #555;
          text-transform: uppercase;
        }
        .hero-nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .hero-nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          color: #1a1a2e;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .hero-nav-links a:hover { color: #cc44ff; }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
          z-index: 30;
        }
        .hamburger span {
          display: block;
          width: 26px;
          height: 2.5px;
          background: #1a1a2e;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: #1a1a2e;
          z-index: 25;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: 0.08em;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: #cc44ff; }

        .hero-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0 2rem 3.5rem;
          position: relative;
          overflow: visible;
        }

        .hero-left {
          flex: 0 0 38%;
          max-width: 38%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .hero-right {
          flex: 0 0 62%;
          max-width: 62%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          z-index: 4;
          margin-right: -80px;
        }

        .hero-right-img {
          width: 120%;
          max-width: 120%;
          height: auto;
          display: block;
          object-fit: contain;
          position: relative;
          right: -40px;
        }

        .hero-title-block {
          display: flex;
          flex-direction: column;
        }

        .hero-title-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 6vw, 5.8rem);
          color: #1a1a2e;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          display: block;
          white-space: nowrap;
        }

        .hero-title-line-2 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 6vw, 5.8rem);
          color: #1a1a2e;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          display: block;
          white-space: nowrap;
        }

        .hero-animated-word {
          font-family: 'Pinyon Script', cursive;
          font-weight: 400;
          font-size: clamp(4.2rem, 8.5vw, 8rem);
          line-height: 1.0;
          display: block;
          transition: color 0.4s ease;
          margin-top: 0rem;
        }

        .hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: clamp(0.6rem, 0.9vw, 0.72rem);
          color: #555;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.95;
          max-width: 420px;
          margin-top: 1.6rem;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .hero-trust-badge {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: #555;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .hero-body { padding: 0 0 2rem 2.5rem; }
          .hero-left { flex: 0 0 40%; max-width: 40%; }
          .hero-right { flex: 0 0 60%; max-width: 60%; margin-right: -70px; }
          .hero-right-img { width: 120%; max-width: 120%; right: -35px; }
        }

        @media (max-width: 1024px) {
          .hero-body { padding: 0 0 2rem 2rem; }
          .hero-title-line,
          .hero-title-line-2 { font-size: clamp(2.6rem, 5.5vw, 4.8rem); }
          .hero-animated-word { font-size: clamp(3.5rem, 7.5vw, 6.5rem); }
          .hero-left { flex: 0 0 44%; max-width: 44%; }
          .hero-right { flex: 0 0 56%; max-width: 56%; margin-right: -50px; }
          .hero-right-img { width: 120%; max-width: 120%; right: -25px; }
        }

        @media (max-width: 900px) {
          .hero-nav { padding: 1.2rem 1.5rem; }
          .hero-nav-links { display: none; }
          .hamburger { display: flex; }

          .hero-body {
            flex-direction: column;
            padding: 0 0 3rem 0;
            align-items: stretch;
            overflow: visible;
          }

          .hero-left {
            flex: none;
            max-width: 100%;
            width: 100%;
            align-items: flex-start;
            order: 2;
            padding: 0 1.5rem;
          }

          .hero-right {
            flex: none;
            width: 100%;
            max-width: 100%;
            order: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0;
            margin-top: 1rem;
            margin-bottom: 2rem;
            overflow: visible;
          }

          .hero-right-img {
            width: auto;
            max-width: 80%;
            height: auto;
            position: relative;
            right: auto;
            left: auto;
            transform: none;
            margin: 0 auto;
          }

          .hero-title-line,
          .hero-title-line-2 { font-size: clamp(2.8rem, 8vw, 4.5rem); white-space: normal; }
          .hero-animated-word { font-size: clamp(3.5rem, 10vw, 6rem); }
          .hero-sub { max-width: 100%; }
        }

        @media (max-width: 600px) {
          .hero-nav { padding: 1rem 1.25rem; }
          .hero-body { padding: 0 0 3.5rem 0; }
          .hero-left { padding: 0 1.25rem; }

          .hero-right {
            position: relative;
            width: 100%;
            overflow: hidden;
            margin-top: 0.5rem;
            margin-bottom: 2rem;
          }

          .hero-right-img {
            display: block;
            width: 160vw;
            max-width: none;
            margin-left: 65%;
            transform: translateX(-50%);
          }

          .hero-title-line,
          .hero-title-line-2 {
            font-size: clamp(2.4rem, 10.5vw, 3.5rem);
            white-space: normal;
          }

          .hero-animated-word { font-size: clamp(3.2rem, 13vw, 5rem); }

          .hero-sub {
            font-size: 0.62rem;
            letter-spacing: 0.1em;
            line-height: 1.85;
            margin-top: 1rem;
          }

          .hero-cta-row { gap: 1rem; margin-top: 1.5rem; }
          .hero-trust-badge { font-size: 0.65rem; }
        }

        @media (max-width: 420px) {
          .hero-title-line,
          .hero-title-line-2 { font-size: 2.1rem; }
          .hero-animated-word { font-size: 2.8rem; }
          .hero-right-img {
            width: 160vw;
            max-width: 160vw;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 360px) {
          .hero-title-line,
          .hero-title-line-2 { font-size: 1.8rem; }
          .hero-animated-word { font-size: 2.4rem; }
        }
      `}</style>

      <nav className="hero-nav">
        <div className="hero-nav-logo">
          <div className="hero-nav-logo-text"></div>
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className="hero-body">
        <div
          className="hero-left"
          ref={titleRef}
          style={{ opacity: 0, transform: 'translateY(60px)' }}
        >
          <div className="hero-title-block">
            <span className="hero-title-line">Building Bold</span>
            <span className="hero-title-line-2">Brands With</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              className="hero-animated-word"
              style={{ color: wordColors[wordIdx % wordColors.length] }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {heroWords[wordIdx]}
            </motion.span>
          </AnimatePresence>

          <p
            className="hero-sub"
            ref={subRef}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Our comprehensive services are designed to place your brand front and center in the ever-evolving digital arena.
          </p>

          <div
            ref={ctaRef}
            className="hero-cta-row"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <MagneticBtn
              to="/contact"
              style={{
                padding: '0.9rem 2.4rem',
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={() => onEnterBtn('')}
              onMouseLeave={onLeaveBtn}
            >
              Get Started
            </MagneticBtn>
            <span className="hero-trust-badge">Trusted by 200+ brands</span>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/heroimage.avif"
            alt="Hero Visual"
            className="hero-right-img"
          />
        </div>
      </div>
    </section>
  );
}