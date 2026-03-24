import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingOrbs from '../components/Floatingorbs';
import CTABanner from '../components/Ctabanner';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'nfc-solutions',
    image: '/nfchom.avif',
    color: '#814B97',
    label: 'NFC Solutions',
    title: 'Smart NFC Digital Business Cards',
    desc: 'Share your contact details, website, social media, and portfolio instantly with just one tap. Custom designed and printed NFC cards.',
    features: [
      'Custom NFC card design & print',
      'NFC chip programming',
      'Digital profile landing page',
      'WhatsApp & social media links',
      'Portfolio & website integration',
    ],
    stat: '100+',
    statLabel: 'Cards Delivered',
    link: '/services/nfc-solutions',
    icon: '📲'
  },
  {
    id: 'website-development',
    image: '/web.avif',
    color: '#B2278C',
    label: 'Website Development',
    title: 'Modern, Responsive Business Websites',
    desc: 'Custom-built, fast-loading websites designed to turn visitors into customers — from business landing pages to full e-commerce stores.',
    features: [
      'Custom UI/UX design',
      'WordPress & React development',
      'E-commerce (Shopify & WooCommerce)',
      'Mobile-first, speed-optimised',
      'WhatsApp & CRM integration',
    ],
    stat: '12+',
    statLabel: 'Sites Launched',
    link: '/services/website-development',
    icon: '🌐'
  },
  {
    id: 'social-media',
    image: '/social.avif',
    color: '#185EA7',
    label: 'Social Media Marketing',
    title: 'Grow Your Brand on Social',
    desc: 'Content creation & account management across Instagram, Facebook, TikTok and more. We manage your entire social presence — strategy, content, and paid amplification.',
    features: [
      'Content strategy & calendar planning',
      'Reels, stories and carousel creation',
      'Community management & engagement',
      'Paid social boosting & ads',
      'Monthly performance analytics',
    ],
    stat: '8.5K+',
    statLabel: 'Avg Followers Gained',
    link: '/services/social-media-marketing',
    icon: '📱'
  },
  {
    id: 'seo-ads',
    image: '/seo.avif',
    color: '#814B97',
    label: 'SEO & Google Ads',
    title: 'Rank Higher & Get Quality Leads',
    desc: 'Comprehensive SEO campaigns and Google Ads management that get your business to the top of search results — covering technical SEO, on-page content, and paid search.',
    features: [
      'Keyword research & strategy',
      'On-page SEO optimisation',
      'Google Search, Shopping & Display',
      'Google My Business optimisation',
      'Monthly ranking reports',
    ],
    stat: 'Top 10',
    statLabel: 'Google Rankings',
    link: '/services/seo',
    icon: '🔍'
  },
  {
    id: 'branding-design',
    image: '/brand.avif',
    color: '#B2278C',
    label: 'Branding & Graphic Design',
    title: 'Brand Identity, Posters & Creatives',
    desc: 'From social media posters to print ads and event banners — we create eye-catching designs that communicate your message and elevate your brand.',
    features: [
      'Social media posters & banners',
      'Advertising creatives (static & animated)',
      'Event flyers & promotional material',
      'Digital ad banners (all sizes)',
      'Company profiles & brochures',
    ],
    stat: '50+',
    statLabel: 'Designs Delivered',
    link: '/services/branding-graphic-design',
    icon: '🎨'
  },
  {
    id: 'logo-design',
    image: '/logo.avif',
    color: '#185EA7',
    label: 'Logo Design',
    title: 'Professional Logo Creation',
    desc: 'Your logo is your first impression. We design logos and complete visual systems that are distinctive, versatile, and built to last.',
    features: [
      'Logo design & variations',
      'Color palette & typography system',
      'Brand guidelines document',
      'Stationery & business card design',
      'Social media kit & templates',
    ],
    stat: '15+',
    statLabel: 'Brands Designed',
    link: '/services/logo-design',
    icon: '✦'
  },
  {
    id: 'email-marketing',
    image: '/email.avif',
    color: '#814B97',
    label: 'Email Marketing',
    title: 'Customer Follow-Up Automation',
    desc: 'Turn your customer list into a revenue engine. We build intelligent email automation workflows, follow-up sequences, and lead nurturing systems.',
    features: [
      'Welcome & nurture sequences',
      'Automated follow-up flows',
      'CRM & platform integration',
      'Personalised email templates',
      'Performance reporting',
    ],
    stat: '35%',
    statLabel: 'Open Rate Avg',
    link: '/services/email-marketing',
    icon: '📧'
  },
  {
    id: 'performance-marketing',
    image: '/perfo.avif',
    color: '#B2278C',
    label: 'Performance Marketing',
    title: 'Data-Driven Advertising',
    desc: 'Maximize your ROI with targeted ad campaigns across Google, Meta, and other platforms. We optimize every dollar spent.',
    features: [
      'Google Ads management',
      'Meta (Facebook/Instagram) Ads',
      'Retargeting campaigns',
      'Conversion rate optimization',
      'ROI tracking & reporting',
    ],
    stat: 'AED 500K+',
    statLabel: 'Ad Spend Managed',
    link: '/services/perfomance-marketing',
    icon: '📊'
  }
];

const process = [
  { step: '01', icon: '🔍', title: 'Discovery Call', desc: 'We learn about your business, goals and target audience to build the right strategy.', color: '#B2278C' },
  { step: '02', icon: '📋', title: 'Custom Plan', desc: 'A tailored proposal covering scope, timeline and pricing — built for your specific needs.', color: '#185EA7' },
  { step: '03', icon: '⚡', title: 'Execution', desc: 'Our team gets to work — designing, building and launching with attention to every detail.', color: '#814B97' },
  { step: '04', icon: '📈', title: 'Results', desc: 'We track, report and continuously optimise to maximise your return over time.', color: '#B2278C' },
];

const whyUs = [
  { icon: '🏆', title: 'All-in-One Digital Partner', desc: 'Marketing, design, development & NFC solutions — everything in one place.', color: '#B2278C' },
  { icon: '📈', title: 'Results-Focused Strategy', desc: 'We focus on leads, sales and business growth — not just design.', color: '#185EA7' },
  { icon: '⚙️', title: 'Custom Solutions', desc: 'Every business is different. We create strategies tailored to your brand.', color: '#814B97' },
  { icon: '🚀', title: 'Modern & Innovative', desc: 'We use the latest tools, AI systems and smart technologies.', color: '#B2278C' },
  { icon: '🤝', title: 'Personal Support', desc: 'Direct communication. Fast response. Real partnership.', color: '#185EA7' },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to={service.link}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          aspectRatio: '3/4',
          width: '100%',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: hovered ? `0 32px 72px rgba(0,0,0,0.6)` : '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src={service.image}
          alt={service.label}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
            filter: hovered ? 'brightness(0.55)' : 'brightness(0.45)',
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)`
            : `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.8) 100%)`,
          transition: 'background 0.4s ease',
        }} />

        <div style={{
          position: 'absolute',
          top: '1.1rem',
          left: '1.1rem',
          right: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.9rem 0.65rem 1.1rem',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.18)',
          transition: 'all 0.35s ease',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            {service.label}
          </span>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: hovered ? service.color : 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'background 0.3s ease',
            flexShrink: 0,
          }}>
            →
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          opacity: hovered ? 1 : 0.7,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.4s ease',
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{service.icon}</div>
          <div style={{
            height: 2,
            width: hovered ? '100%' : '30%',
            background: `linear-gradient(90deg, ${service.color}, transparent)`,
            borderRadius: 4,
            transition: 'width 0.5s ease',
            marginBottom: '0.6rem',
          }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.78rem',
              fontWeight: 500,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'all 0.35s ease 0.05s',
              margin: 0,
            }}>
              Explore service →
            </p>
            <div style={{
              textAlign: 'right',
              opacity: hovered ? 1 : 0.5,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: service.color, lineHeight: 1 }}>
                {service.stat}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.6rem' }}>{service.statLabel}</div>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '28px',
          border: `2px solid ${service.color}`,
          opacity: hovered ? 0.6 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />
      </div>
    </Link>
  );
}

export default function Services() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      heroRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );

    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: (i % 3) * 0.1,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        .service-card {
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        
        .process-step:hover {
          transform: translateY(-4px);
          border-color: rgba(178,39,140,0.5) !important;
        }
        
        .why-item:hover {
          transform: translateY(-3px);
          border-color: rgba(178,39,140,0.35) !important;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
        }
        
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .why-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

      <section style={{
        minHeight: '58vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <FloatingOrbs count={5} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: 'radial-gradient(ellipse at top right, rgba(178,39,140,0.08), transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} style={{ maxWidth: 700 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              background: 'rgba(178,39,140,0.08)',
              border: '1px solid rgba(178,39,140,0.3)',
              borderRadius: '50px',
              marginBottom: '1.5rem',
            }}>
              <span style={{ color: '#B2278C', fontSize: '0.7rem' }}>✦</span>
              <span style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Our Services</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1.25rem',
              lineHeight: 1.1,
            }}>
              Digital solutions for<br />
              <span style={{ color: '#B2278C' }}>every business need</span>
            </h1>

            <p style={{ color: '#999', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 580, marginBottom: '2.5rem' }}>
              Media Mind Digital is a Dubai-based creative and digital marketing agency. We help businesses grow online through innovative technology, powerful marketing strategies and stunning design — all under one roof.
            </p>

            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[['8', 'Core Services'], ['50+', 'Happy Clients'], ['Dubai', 'HQ · Worldwide']].map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#B2278C', lineHeight: 1 }}>{n}</div>
                  <div style={{ color: '#666', fontSize: '0.78rem', marginTop: '0.2rem', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Why Choose Us</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#ffffff' }}>
              Your all-in-one digital partner
            </h2>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', marginBottom: '5rem' }}>
            {whyUs.map((w, i) => (
              <div key={i} className="why-item" style={{
                padding: '1.75rem 1.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${w.color}66, transparent)`,
                }} />
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{w.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {w.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>How It Works</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#ffffff' }}>
              From enquiry to results
            </h2>
          </div>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {process.map((p, i) => (
              <div key={i} className="process-step" style={{
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${p.color}66, transparent)`,
                }} />
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.7rem', color: '#B2278C', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  STEP {p.step}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: '0.6rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.65 }}>{p.desc}</p>
                <div style={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  right: '0.75rem',
                  fontSize: '4.5rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.02)',
                  fontFamily: 'var(--font-display)',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}>
                  {p.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container">
          <div style={{
            background: 'rgba(178,39,140,0.06)',
            border: '1px solid rgba(178,39,140,0.2)',
            borderRadius: '28px',
            padding: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '40%',
              background: 'radial-gradient(ellipse at right, rgba(178,39,140,0.1), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#B2278C' }}>📍</span>
                <span style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dubai · UAE · Worldwide</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', marginBottom: '0.5rem' }}>
                Not sure which service you need?
              </h3>
              <p style={{ color: '#888', fontSize: '0.95rem' }}>
                Tell us about your business and we'll recommend the right solution.
              </p>
            </div>
            <Link to="/contact" style={{
              position: 'relative',
              zIndex: 1,
              padding: '0.9rem 2.25rem',
              background: '#B2278C',
              color: '#fff',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 30px rgba(178,39,140,0.35)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(178,39,140,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(178,39,140,0.35)'; }}
            >
              Book a Free Consultation →
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}