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
import { ServicesGrid } from '../components/home/ServicesGrid';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { RecentWorksSection } from '../components/home/RecentWorksSection';
import { BlogSection } from '../components/home/BlogSection';
import { ContactSection } from '../components/home/ContactSection';
import Footer from '../components/Footer';
import { useFetchWorks } from '../hooks/useFetchWorks';
import { ServicesSection } from '../components/home/Servicesection';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const wrapRef = useRef(null);
  const [cursorBig, setCursorBig] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const { recentWorks, loadingWorks, fetchWorks } = useFetchWorks();

  const enterBtn = useCallback((label = '') => { setCursorBig(true); setCursorLabel(label); }, []);
  const leaveBtn = useCallback(() => { setCursorBig(false); setCursorLabel(''); }, []);

  useEffect(() => { fetchWorks(); }, [fetchWorks]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <div ref={wrapRef} style={{ background: WHITE, color: INK, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; cursor: none !important; margin: 0; overflow-x: hidden; }
        a, button { cursor: none !important; }
        .cc { position: fixed; border-radius: 50%; pointer-events: none; z-index: 9999; will-change: transform; transition: width 0.2s ease, height 0.2s ease; }
        .cd { position: fixed; width: 6px; height: 6px; border-radius: 50%; pointer-events: none; z-index: 10000; will-change: transform; background: ${ORANGE}; }
        @keyframes shimmer { 0%,100% { opacity:.4 } 50% { opacity:.7 } }
        .stack-card { will-change: transform, opacity; }
        @media(max-width:900px){
          .contact-grid{grid-template-columns:1fr !important;}
          .services-grid{grid-template-columns:1fr !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .bento-grid { grid-template-columns: 1fr !important; }
          .stack-card { grid-template-columns: 1fr !important; text-align: center; padding: 2rem !important; }
          .stack-card img { max-height: 200px !important; margin-top: 1rem; }
        }
        @media(max-width:600px){
          .footer-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:1fr !important;}
        }
      `}</style>

      <div ref={cursorRef} className="cc" style={{
        width: cursorBig ? 64 : 28,
        height: cursorBig ? 64 : 28,
        border: `1.5px solid ${cursorBig ? ORANGE : INK30}`,
        background: cursorBig ? `rgba(249,115,22,.07)` : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        left: 0, top: 0,
      }}>
        {cursorLabel && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.45rem', fontWeight: 700, color: ORANGE, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cursorLabel}</span>}
      </div>
      <div ref={cursorDotRef} className="cd" style={{ left: 0, top: 0 }} />

      <HeroSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <MarqueeBar />
      <ClientsSection />
      <InnovationBanner onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <StatsBar />
      <BentoServicesSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <ServicesSection/>
      <ServicesScrollSection onEnterBtn={enterBtn} onLeaveBtn={leaveBtn} />
      <ServicesGrid />
      <TestimonialsSection />
      <RecentWorksSection works={recentWorks} loading={loadingWorks} />
      <BlogSection />
      <ContactSection />
    </div>
  );
}