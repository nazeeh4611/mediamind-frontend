import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '📈',
    title: 'Performance Marketing',
    metric: '300% Avg ROI',
    desc: 'Meta Ads, Google Ads, and data-driven campaigns that actually convert.',
    link: '/services/performance-marketing',
    gradient: 'linear-gradient(145deg, #B2278C, #185EA7)',
    tags: ['Meta Ads', 'Google Ads', 'Retargeting', 'Analytics'],
    stats: ['2.5M+ Impressions', '45% Lower CPA']
  },
  {
    icon: '⚙️',
    title: 'CRM Optimization',
    metric: '2x Conversion Rate',
    desc: 'Turn your HubSpot or Salesforce into a revenue-generating machine.',
    link: '/services/crm-optimization',
    gradient: 'linear-gradient(145deg, #185EA7, #814B97)',
    tags: ['HubSpot', 'Salesforce', 'Automation', 'Lead Scoring'],
    stats: ['98% Data Accuracy', '60% Faster Response']
  },
  {
    icon: '🎨',
    title: 'High-Conversion Design',
    metric: '85% Mobile Optimized',
    desc: 'Landing pages and funnels designed to maximize ROI.',
    link: '/services/design',
    gradient: 'linear-gradient(145deg, #814B97, #B2278C)',
    tags: ['Landing Pages', 'Funnels', 'A/B Testing', 'UX Design'],
    stats: ['42% Higher CTR', '3.2s Load Time']
  },
  {
    icon: '🎬',
    title: 'Content Creation',
    metric: '10M+ Views',
    desc: 'Video editing, social media content, and brand storytelling.',
    link: '/services/content',
    gradient: 'linear-gradient(145deg, #B2278C, #814B97)',
    tags: ['Video Editing', 'Social Content', 'Brand Story', 'Reels'],
    stats: ['1.2M+ Engagement', '85% Retention']
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    metric: 'Real-time Insights',
    desc: 'Make data-driven decisions with comprehensive analytics and reporting.',
    link: '/services/analytics',
    gradient: 'linear-gradient(145deg, #185EA7, #B2278C)',
    tags: ['Dashboard', 'Predictive Analytics', 'Attribution', 'Reporting'],
    stats: ['99.9% Accuracy', 'Live Dashboards']
  },
  {
    icon: '🚀',
    title: 'Growth Strategy',
    metric: 'Scalable Systems',
    desc: 'Comprehensive growth strategies that compound over time.',
    link: '/services/growth',
    gradient: 'linear-gradient(145deg, #814B97, #185EA7)',
    tags: ['Market Analysis', 'Scaling', 'Automation', 'Strategy'],
    stats: ['3x Revenue Growth', '200% ROI']
  },
];

export default function ServicesOverview() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { 
          y: 150,
          opacity: 0,
          rotationZ: i % 2 === 0 ? -10 : 10,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationZ: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          }
        }
      );

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.in'
        });
      });
    });

    gsap.utils.toArray('.service-icon').forEach((icon, i) => {
      gsap.to(icon, {
        y: -15,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });

  }, []);

  return (
    <section ref={sectionRef} style={{ 
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
      perspective: '2000px',
      background: 'transparent'
    }}>
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '5rem',
          position: 'relative'
        }}>
          <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>
            <span style={{ color: '#B2278C', marginRight: '0.5rem' }}>✦</span>
            What We Do
            <span style={{ color: '#B2278C', marginLeft: '0.5rem' }}>✦</span>
          </p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff' }}>
            Comprehensive solutions to<br />
            <span style={{ color: '#B2278C' }}>accelerate your growth</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          transformStyle: 'preserve-3d'
        }}>
          {services.map((svc, i) => (
            <Link
              key={i}
              to={svc.link}
              ref={el => cardsRef.current[i] = el}
              className="service-card-modern"
              style={{
                display: 'block',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '2.5rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #185EA7',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: svc.gradient,
                opacity: 0.05,
                transition: 'opacity 0.3s ease',
                zIndex: 0
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="service-icon" style={{
                  fontSize: '3.5rem',
                  marginBottom: '1.5rem',
                  transformStyle: 'preserve-3d'
                }}>
                  {svc.icon}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '0.4rem 1rem',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#B2278C',
                    border: '1px solid #B2278C'
                  }}>
                    {svc.metric}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  color: '#ffffff'
                }}>
                  {svc.title}
                </h3>

                <p style={{
                  color: '#e0e0e0',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem'
                }}>
                  {svc.desc}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  padding: '1rem 0',
                  borderTop: '1px solid #185EA7',
                  borderBottom: '1px solid #185EA7'
                }}>
                  {svc.stats.map((stat, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: '#e0e0e0' }}>
                      <span style={{ color: '#B2278C', marginRight: '0.25rem' }}>⚡</span>
                      {stat}
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.3rem 0.9rem',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid #185EA7',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#e0e0e0'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#B2278C',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'gap 0.3s ease'
                }}>
                  Learn More
                  <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}