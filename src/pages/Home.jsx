import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHITE, INK, INK30, ORANGE } from '../utils/constants';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeBar } from '../components/home/MarqueeBar';
import { ClientsSection } from '../components/home/ClientsSection';
import { InnovationBanner } from '../components/home/InnovationBanner';
import { StatsBar } from '../components/home/StatsBar';
import { BentoServicesSection } from '../components/home/BentoServicesSection';
import { ServicesScrollSection } from '../components/home/ServicesScrollSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { ServicesSection } from '../components/home/Servicesection';
import { useFetchWorks } from '../hooks/useFetchWorks';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const wrapRef = useRef(null);
  const [cursorBig, setCursorBig] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { recentWorks, loadingWorks, fetchWorks } = useFetchWorks();

  const enterBtn = useCallback((label = '') => { setCursorBig(true); setCursorLabel(label); }, []);
  const leaveBtn = useCallback(() => { setCursorBig(false); setCursorLabel(''); }, []);

  useEffect(() => { fetchWorks(); }, [fetchWorks]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let rafId, cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;
    const onMouseMove = (e) => {
      cursorX += (e.clientX - cursorX) * 0.18;
      cursorY += (e.clientY - cursorY) * 0.18;
      dotX += (e.clientX - dotX) * 0.4;
      dotY += (e.clientY - dotY) * 0.4;
    };
    const loop = () => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorX}px,${cursorY}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${dotX}px,${dotY}px)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  useEffect(() => {
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <div ref={wrapRef} style={{ background: WHITE, color: INK, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; cursor: ${isMobile ? 'auto' : 'none'} !important; margin: 0; overflow-x: hidden; }
        a, button { cursor: ${isMobile ? 'pointer' : 'none'} !important; }
        .cc { position: fixed; border-radius: 50%; pointer-events: none; z-index: 9999; will-change: transform; transition: width 0.2s ease, height 0.2s ease; }
        .cd { position: fixed; width: 6px; height: 6px; border-radius: 50%; pointer-events: none; z-index: 10000; will-change: transform; background: ${ORANGE}; }
        .stack-card { will-change: transform, opacity; }
      `}</style>

      {!isMobile && (
        <>
          <div ref={cursorRef} className="cc" style={{
            width: cursorBig ? 64 : 28, height: cursorBig ? 64 : 28,
            border: `1.5px solid ${cursorBig ? ORANGE : INK30}`,
            background: cursorBig ? `rgba(249,115,22,.07)` : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            left: 0, top: 0,
          }}>
            {cursorLabel && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.45rem', fontWeight: 700, color: ORANGE, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cursorLabel}</span>}
          </div>
          <div ref={cursorDotRef} className="cd" style={{ left: 0, top: 0 }} />
        </>
      )}

      <HeroSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <MarqueeBar />
      <ClientsSection />
      <InnovationBanner onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <StatsBar />
      <BentoServicesSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <ServicesSection />
      <ServicesScrollSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}