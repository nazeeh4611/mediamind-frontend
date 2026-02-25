import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 300, suffix: '%', label: 'Average ROI', sub: 'Performance Marketing', icon: '📈', color: '#B2278C' },
  { value: 2, suffix: 'x', label: 'Conversion Rate', sub: 'CRM Optimization', icon: '⚡', color: '#185EA7' },
  { value: 85, suffix: '%', label: 'Mobile Optimized', sub: 'High-Conversion Design', icon: '📱', color: '#814B97' },
  { value: 10, suffix: 'M+', label: 'Views Generated', sub: 'Content Creation', icon: '🎬', color: '#B2278C' },
];

export default function StatsSection() {
  const containerRef = useRef(null);
  const numRefs = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i].value;
      
      gsap.fromTo({ val: 0 },
        { val: 0 },
        {
          val: target,
          duration: 2.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: function() {
            if (el) el.textContent = Math.floor(this.targets()[0].val);
          },
        }
      );
    });

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { 
          rotationY: 45,
          rotationX: 15,
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          rotationY: 0,
          rotationX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      gsap.to(card.querySelector('.stat-icon'), {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2
      });
    });

    stats.forEach((_, i) => {
      const particles = document.createElement('div');
      particles.className = `stat-particles-${i}`;
      particles.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `;
      
      for (let j = 0; j < 5; j++) {
        const particle = document.createElement('span');
        particle.innerHTML = '✦';
        particle.style.cssText = `
          position: absolute;
          color: ${stats[i].color};
          font-size: 0.8rem;
          opacity: 0;
        `;
        particles.appendChild(particle);
        
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0.5,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      
      if (cardsRef.current[i]) {
        cardsRef.current[i].style.position = 'relative';
        cardsRef.current[i].appendChild(particles);
      }
    });

  }, []);

  return (
    <section ref={containerRef} style={{ 
      padding: '8rem 0',
      position: 'relative',
      background: 'transparent'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          perspective: '1000px'
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="stat-card-modern"
              style={{
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${s.color}33`,
                borderRadius: '30px',
                padding: '2.5rem',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  boxShadow: `0 30px 60px ${s.color}33`,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: 'none',
                  duration: 0.3,
                  ease: 'power2.in'
                });
              }}
            >
              <div className="stat-icon" style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                color: s.color
              }}>
                {s.icon}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}>
                  <span ref={el => numRefs.current[i] = el}>0</span>
                  <span>{s.suffix}</span>
                </div>
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                color: '#ffffff'
              }}>
                {s.label}
              </div>

              <div style={{
                color: '#e0e0e0',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  background: s.color,
                  borderRadius: '50%',
                  display: 'inline-block'
                }} />
                {s.sub}
              </div>

              <div style={{
                marginTop: '1.5rem',
                height: '4px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${s.value}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`,
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}