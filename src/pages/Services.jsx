import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FloatingOrbs from '../components/Floatingorbs';
import ServicesOverview from '../components/Servicesoverview';
import CTABanner from '../components/Ctabanner';

export default function Services() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div>
      <section style={{
        minHeight: '50vh', display: 'flex', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '3rem', position: 'relative', overflow: 'hidden',
        background: 'transparent'
      }}>
        <FloatingOrbs count={4} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Our Services</p>
            <h1 className="section-title" style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
              Everything you need to<br />
              <span style={{ color: '#B2278C' }}>dominate your market</span>
            </h1>
            <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center', color: '#e0e0e0' }}>
              Four core service pillars designed to work together seamlessly — or independently to fill the gaps in your current strategy.
            </p>
          </div>
        </div>
      </section>

      <ServicesOverview />
      <CTABanner />
    </div>
  );
}