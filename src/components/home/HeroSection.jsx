import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { MagneticBtn } from './MagneticBtn';
import { GRAD_HERO, INK, INK60, INK30, INK10, WHITE, heroWords } from '../../utils/constants';

export function HeroSection({ onEnterBtn, onLeaveBtn }) {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9 });
    gsap.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.1 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setWordIdx(i => (i + 1) % heroWords.length); setAnimating(false); }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const colors = ['#f97316', '#8b5cf6', '#22c55e', '#ec4899', '#3b82f6', '#eab308'];
  const currentWord = heroWords[wordIdx];
  const charCount = currentWord.length;
  const dynamicFontSize = charCount > 16 ? 'clamp(1.8rem,4.5vw,4.2rem)' : charCount > 12 ? 'clamp(2.2rem,5.5vw,5rem)' : 'clamp(2.8rem,7vw,6.5rem)';

  return (
    <section style={{ minHeight: '100vh', background: GRAD_HERO, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(251,191,36,.15) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 1000, padding: '0 1.25rem', width: '100%' }}>
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,6vw,5.5rem)', color: INK, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>
            Building bold brands with
          </h1>
          <div style={{ minHeight: 'clamp(3rem,9vw,8rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem 0' }}>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: dynamicFontSize, color: colors[wordIdx % colors.length], lineHeight: 1.1, letterSpacing: '-0.02em', transform: animating ? 'translateY(-20px)' : 'translateY(0)', opacity: animating ? 0 : 1, transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease, font-size 0.2s ease', whiteSpace: 'nowrap', display: 'block' }}>
              {currentWord}
            </h1>
          </div>
        </div>

        <p ref={subRef} style={{ opacity: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.88rem,1.8vw,1.1rem)', color: INK60, lineHeight: 1.8, maxWidth: 580, margin: '1.5rem auto 2.5rem', fontWeight: 400, padding: '0 0.5rem' }}>
          Our suite of comprehensive services is designed to place your brand front and center in the ever-evolving digital arena.
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <MagneticBtn to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: INK, color: WHITE, borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 30px rgba(17,17,17,0.2)' }} onMouseEnter={() => onEnterBtn('')} onMouseLeave={onLeaveBtn}>
            Get Started
          </MagneticBtn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${i * 60 + 200},70%,65%)`, border: '2px solid white', marginLeft: i > 0 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontWeight: 700, color: WHITE, fontSize: '0.72rem' }}>
                  {['A', 'B', 'C'][i]}
                </div>
              ))}
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f3f4f6', border: '2px solid white', marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #374151', borderTopColor: 'transparent' }} />
              </div>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: INK60, fontWeight: 500 }}>200+ already with us</span>
          </div>
        </div>

        <div ref={statsRef} style={{ opacity: 0, display: 'flex', gap: 'clamp(1rem,3vw,2rem)', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '2rem', borderTop: `1px solid ${INK10}` }}>
          {[{ v: '200+', l: 'Clients' }, { v: '98%', l: 'Retention' }, { v: '8×', l: 'ROAS' }, { v: '$50M+', l: 'Revenue' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2.2rem)', color: INK }}>{s.v}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: INK30, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: INK30 }}>Scroll</span>
        <ChevronDown size={16} color={INK30} />
      </motion.div>
    </section>
  );
}