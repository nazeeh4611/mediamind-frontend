import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { 
        scale: 0.8,
        opacity: 0,
        rotationX: 30
      },
      {
        scale: 1,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 1,
        }
      }
    );

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        scale: 1.5,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });

    gsap.to('.cta-button', {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(178,39,140,0.4)',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

  }, []);

  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            background: '#B2278C',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      ))}

      <div className="container">
        <div
          ref={ref}
          style={{
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)',
            border: '1px solid #B2278C',
            borderRadius: '50px',
            padding: 'clamp(3rem, 8vw, 6rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(178,39,140,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'rotate 20s linear infinite'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-20%',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(24,94,167,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'rotate 20s linear infinite reverse'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="section-label" style={{ 
              marginBottom: '1.5rem',
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '50px',
              color: '#B2278C'
            }}>
              ✦ Ready to Scale? ✦
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Let's build your<br />
              <span style={{ color: '#B2278C' }}>growth engine</span> together
            </h2>

            <p style={{
              color: '#e0e0e0',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: 600,
              margin: '0 auto 3rem',
              lineHeight: 1.8
            }}>
              Join 200+ brands that have accelerated their growth with MediaMind's proven strategies.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#B2278C' }}>200+</div>
                <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Brands Trust Us</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#185EA7' }}>$50M+</div>
                <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Revenue Generated</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#B2278C' }}>98%</div>
                <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Client Retention</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary cta-button" style={{
                padding: '1.2rem 3rem',
                fontSize: '1.1rem',
                background: '#B2278C',
                border: 'none'
              }}>
                Book a Free Strategy Call
                <span style={{ marginLeft: '0.75rem' }}>→</span>
              </Link>
              <Link to="/services" className="btn-outline" style={{
                padding: '1.2rem 3rem',
                fontSize: '1.1rem',
                borderColor: '#B2278C',
                color: '#ffffff'
              }}>
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}