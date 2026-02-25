import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingOrbs from '../components/Floatingorbs';
import StatsSection from '../components/Statssection';
import ServicesOverview from '../components/ServicesOverview';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = ['Performance Marketing', 'CRM Optimization', 'High-Conversion Design', 'Content Creation', 'Data Analytics', 'Growth Strategy'];

export default function Home() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const marqueeRef = useRef(null);
  const processRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const heroTl = gsap.timeline({ delay: 0.2 });
    
    const headline = headlineRef.current;
    const words = headline.innerText.split(' ');
    headline.innerHTML = words.map(word => `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(60px)">${word}</span>`).join(' ');
    
    heroTl.to('.word', {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power4.out'
    })
    .fromTo(subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(btnsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    );

    gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    const processCards = gsap.utils.toArray('.process-card');
    
    processCards.forEach((card, i) => {
      gsap.fromTo(card,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8,
          rotationY: 45
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      gsap.to(card.querySelector('.process-icon'), {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2
      });
    });

    floatingElementsRef.current.forEach((el, i) => {
      if (!el) return;
      
      gsap.to(el, {
        y: i % 2 === 0 ? -50 : 50,
        x: i % 3 === 0 ? 30 : -30,
        rotation: i * 15,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.set(el, {
            y: (i % 2 === 0 ? -50 : 50) * self.progress,
            x: (i % 3 === 0 ? 30 : -30) * self.progress,
            opacity: 1 - self.progress
          });
        }
      });
    });

    gsap.utils.toArray('.reveal-section').forEach(section => {
      gsap.fromTo(section,
        { 
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          y: 50,
          opacity: 0
        },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const processSteps = [
    { 
      step: '01', 
      title: 'Audit & Strategy', 
      desc: 'We analyze your current marketing stack, identify gaps, and create a custom growth roadmap.',
      icon: '🔍',
      color: '#B2278C'
    },
    { 
      step: '02', 
      title: 'Build & Launch', 
      desc: 'Our team executes campaigns, optimizes your CRM, and builds high-converting assets.',
      icon: '⚡',
      color: '#185EA7'
    },
    { 
      step: '03', 
      title: 'Optimize & Scale', 
      desc: 'Data-driven iteration to continuously improve performance and scale what works.',
      icon: '📈',
      color: '#814B97'
    },
    { 
      step: '04', 
      title: 'Report & Refine', 
      desc: 'Transparent reporting with actionable insights so you always know exactly what\'s happening.',
      icon: '🔄',
      color: '#B2278C'
    },
  ];

  return (
    <>
      <div ref={el => floatingElementsRef.current[0] = el} className="floating-element" style={{ top: '20%', left: '5%', color: '#B2278C' }}>✦</div>
      <div ref={el => floatingElementsRef.current[1] = el} className="floating-element" style={{ top: '60%', right: '3%', color: '#185EA7' }}>⚡</div>
      <div ref={el => floatingElementsRef.current[2] = el} className="floating-element" style={{ bottom: '10%', left: '10%', color: '#814B97' }}>◈</div>
      <div ref={el => floatingElementsRef.current[3] = el} className="floating-element" style={{ top: '30%', right: '15%', color: '#B2278C' }}>⬡</div>

      <section ref={heroRef} className="hero-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <FloatingOrbs />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="trust-badge" style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid #B2278C',
              borderRadius: '50px',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ color: '#B2278C', marginRight: '0.5rem' }}>✦</span>
              <span style={{ color: '#ffffff' }}>Trusted by 200+ brands worldwide</span>
            </div>

            <h1 ref={headlineRef} className="hero-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              We Turn Clicks Into Revenue
            </h1>

            <p ref={subRef} className="hero-subtitle" style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              color: '#e0e0e0',
              maxWidth: 600,
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}>
              Comprehensive digital marketing solutions that accelerate your growth. 
              From performance ads to CRM optimization — we engineer systems that compound.
            </p>

            <div ref={btnsRef} className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary btn-large" style={{ background: '#B2278C', border: 'none' }}>
                Book Free Strategy Call <span style={{ marginLeft: '0.5rem' }}>→</span>
              </Link>
              <Link to="/services" className="btn-outline btn-large" style={{ borderColor: '#B2278C', color: '#ffffff' }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        <div className="marquee-container" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          padding: '1.5rem 0',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #B2278C',
          borderBottom: '1px solid #B2278C'
        }}>
          <div ref={marqueeRef} className="marquee-content" style={{
            display: 'flex',
            gap: '3rem',
            whiteSpace: 'nowrap',
            width: 'fit-content'
          }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#B2278C' }}>✦</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#ffffff' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="reveal-section">
        <StatsSection />
      </div>

      <section ref={processRef} className="process-section" style={{ padding: '8rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Our Process</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff' }}>
              How we <span style={{ color: '#B2278C' }}>drive results</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '10%',
              width: '80%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #B2278C, #185EA7, transparent)',
              zIndex: 0
            }} />

            {processSteps.map((p, i) => (
              <div key={i} className="process-card" style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid #185EA7',
                borderRadius: '30px',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}>
                <div className="process-icon" style={{
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${p.color}22, transparent)`,
                  border: `1px solid ${p.color}44`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  marginBottom: '2rem'
                }}>
                  {p.icon}
                </div>
                
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: p.color,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em'
                }}>
                  {p.step}
                </div>
                
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ffffff'
                }}>
                  {p.title}
                </h3>
                
                <p style={{ color: '#e0e0e0', lineHeight: 1.7 }}>
                  {p.desc}
                </p>

                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1.5rem',
                  fontSize: '6rem',
                  fontWeight: 900,
                  color: 'rgba(0,0,0,0.5)',
                  fontFamily: 'var(--font-display)',
                  pointerEvents: 'none'
                }}>
                  {p.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="reveal-section">
        <ServicesOverview />
      </div>

      <div className="reveal-section">
        <Testimonials />
      </div>

      <div className="reveal-section">
        <CTABanner />
      </div>

      <div className="floating-stats" style={{
        position: 'fixed',
        right: '2rem',
        bottom: '2rem',
        zIndex: 100,
        pointerEvents: 'none'
      }}>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #B2278C',
          borderRadius: '50px',
          padding: '0.8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.9rem',
          boxShadow: '0 10px 30px rgba(178,39,140,0.2)'
        }}>
          <span style={{ color: '#B2278C' }}>⚡</span>
          <span style={{ color: '#ffffff' }}>200+ Brands Trust Us</span>
        </div>
      </div>
    </>
  );
}