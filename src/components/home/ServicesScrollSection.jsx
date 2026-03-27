import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticBtn } from './MagneticBtn';
import { scrollingServices } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export function ServicesScrollSection({ onEnterBtn, onLeaveBtn }) {
  const sectionRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !cardsWrapRef.current) return;

    const cards = gsap.utils.toArray('.stack-card');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${cards.length * 100}%`, 
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, i) => {
      if (i !== 0) {
        tl.fromTo(card, 
          { yPercent: 100, opacity: 0, scale: 0.9 },
          { 
            yPercent: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 1,
            ease: "none",
            onStart: () => setActiveIndex(i),
            onReverseComplete: () => setActiveIndex(Math.max(0, i - 1))
          },
          i
        );
      }

      if (i < cards.length - 1) {
        tl.to(card, {
          scale: 0.92,
          opacity: 0.4,
          duration: 1,
          ease: "none"
        }, i + 1);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '120px',
        marginTop: '0px',
      }}
    >
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2vh 0 4vh 0',
        }}
      >
        <div
          ref={cardsWrapRef}
          style={{
            position: 'relative',
            maxWidth: '1000px',
            width: '90%',
            height: '70vh',
            marginTop: '2rem',
          }}
        >
          {scrollingServices.map((s, i) => (
            <div
              key={i}
              className="stack-card"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: s.bg,
                borderRadius: 28,
                padding: '3rem',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '2rem',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                zIndex: i,
              }}
            >
              <div>
                <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.05)', padding: '6px 14px', borderRadius: 10, marginBottom: '1.2rem', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  {s.tag}
                </div>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', color: '#444' }}>
                  {s.desc}
                </p>
                <MagneticBtn 
                  onMouseEnter={() => onEnterBtn('View')} 
                  onMouseLeave={onLeaveBtn}
                  style={{ padding: '1rem 2rem', background: '#111', color: '#fff', borderRadius: 50, fontWeight: 600 }}
                >
                  Learn More
                </MagneticBtn>
              </div>
              
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={s.img} alt={s.tag} style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}