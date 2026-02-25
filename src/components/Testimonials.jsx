import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CMO, TechFlow Inc.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    quote: 'MediaMind transformed our entire marketing funnel. Within 3 months, our ROI increased by 280% and our CPA dropped by 45%.',
    stars: 5,
    color: '#B2278C',
    company: 'TechFlow',
    result: '280% ROI'
  },
  {
    name: 'Marcus Williams',
    role: 'Founder, GrowthLab',
    avatar: 'https://i.pravatar.cc/150?img=2',
    quote: 'The CRM optimization they did for us was game-changing. Our sales team now closes 2x more deals with the same amount of leads.',
    stars: 5,
    color: '#185EA7',
    company: 'GrowthLab',
    result: '2x Deals'
  },
  {
    name: 'Priya Sharma',
    role: 'Director, EcomVault',
    avatar: 'https://i.pravatar.cc/150?img=3',
    quote: 'Our content went viral multiple times after partnering with MediaMind. 10M+ views and still counting. Incredible team.',
    stars: 5,
    color: '#814B97',
    company: 'EcomVault',
    result: '10M+ Views'
  },
  {
    name: 'James Wilson',
    role: 'CEO, ScaleUp',
    avatar: 'https://i.pravatar.cc/150?img=4',
    quote: 'Their data-driven approach helped us identify opportunities we never knew existed. Revenue up 150% in 6 months.',
    stars: 5,
    color: '#B2278C',
    company: 'ScaleUp',
    result: '150% Growth'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Marketing Director, FinTech Pro',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'The level of detail and strategic thinking they bring is unmatched. Best marketing investment we ever made.',
    stars: 5,
    color: '#185EA7',
    company: 'FinTech Pro',
    result: '320% ROI'
  },
  {
    name: 'David Kim',
    role: 'Founder, SaaS Labs',
    avatar: 'https://i.pravatar.cc/150?img=6',
    quote: 'From strategy to execution, MediaMind delivered beyond expectations. Our conversion rate tripled.',
    stars: 5,
    color: '#814B97',
    company: 'SaaS Labs',
    result: '3x Conversion'
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const marqueeContent = marqueeRef.current;
    const marqueeWidth = marqueeContent.scrollWidth;
    
    gsap.to(marqueeContent, {
      x: -marqueeWidth / 2,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { 
          scale: 0.9,
          opacity: 0,
          rotationY: 30,
          x: i % 2 === 0 ? -100 : 100
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          }
        }
      );

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: `0 20px 40px ${testimonials[i].color}33`,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: 'none',
          scale: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });

    gsap.utils.toArray('.quote-mark').forEach(mark => {
      gsap.to(mark, {
        scale: 1.2,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

  }, []);

  return (
    <section ref={ref} style={{ 
      padding: '8rem 0',
      background: 'transparent',
      overflow: 'hidden',
      perspective: '1000px'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>
            <span style={{ color: '#B2278C' }}>❤️</span> Client Stories
          </p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff' }}>
            What our <span style={{ color: '#B2278C' }}>clients say</span>
          </h2>
        </div>

        <div style={{
          overflow: 'hidden',
          marginBottom: '4rem',
          padding: '1rem 0'
        }}>
          <div ref={marqueeRef} style={{
            display: 'flex',
            gap: '2rem',
            width: 'fit-content'
          }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                style={{
                  minWidth: '300px',
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${t.color}33`,
                  borderRadius: '20px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: `2px solid ${t.color}`
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff' }}>{t.name}</div>
                  <div style={{ color: t.color, fontSize: '0.85rem' }}>{t.company}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: t.color, fontWeight: 700 }}>
                  {t.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              style={{
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${t.color}33`,
                borderRadius: '30px',
                padding: '2.5rem',
                position: 'relative',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="quote-mark" style={{
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                fontSize: '6rem',
                color: t.color,
                opacity: 0.2,
                fontFamily: 'serif',
                lineHeight: 1
              }}>
                "
              </div>

              <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
                {Array(t.stars).fill(0).map((_, si) => (
                  <span key={si} style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>

              <p style={{
                color: '#e0e0e0',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                marginBottom: '2rem',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1
              }}>
                "{t.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: `2px solid ${t.color}`,
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#ffffff' }}>
                    {t.name}
                  </div>
                  <div style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>{t.role}</div>
                  <div style={{ color: t.color, fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    Result: {t.result}
                  </div>
                </div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                width: '80%',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                borderRadius: '2px'
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}