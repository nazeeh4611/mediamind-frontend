import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import baseurl from '../../base/Base';

gsap.registerPlugin(ScrollTrigger);

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

const seoData = {
  hero: {
    badge: "SEO OPTIMISATION",
    title: "Dominate Search Results &",
    titleGradient: "Drive Organic Traffic",
    description: "Rank higher on Google, attract quality leads, and grow your business with our data-driven SEO strategies. We help UAE businesses achieve sustainable organic growth.",
    ctaText: "Get Free SEO Audit",
    ctaLink: "/contact",
    secondaryText: "View Case Studies",
    secondaryLink: "/works"
  },
  stats: [
    { number: "87%", label: "Avg. Traffic Increase" },
    { number: "150+", label: "Keywords Ranked" },
    { number: "3x", label: "ROI on SEO Investment" },
    { number: "24/7", label: "Monitoring & Support" }
  ],
  whatIsSEO: {
    title: "What is SEO & Why It Matters",
    description: "Search Engine Optimization (SEO) is the process of optimizing your website to rank higher in search engine results pages (SERPs). With 93% of online experiences starting with a search engine, appearing on the first page is crucial for business success.",
    points: [
      "Increase organic visibility and brand awareness",
      "Drive qualified, high-intent traffic to your website",
      "Build trust and credibility with your target audience",
      "Achieve sustainable, long-term growth without ad spend",
      "Outrank competitors and capture market share"
    ]
  },
  services: [
    {
      title: "Technical SEO",
      icon: "⚙️",
      description: "Optimize website structure, speed, mobile-friendliness, crawlability, and indexation for search engines.",
      features: ["Site Speed Optimization", "Mobile Optimization", "XML Sitemaps", "Schema Markup", "Core Web Vitals", "SSL Security"]
    },
    {
      title: "On-Page SEO",
      icon: "📄",
      description: "Optimize content, meta tags, headers, and internal linking to improve relevance and rankings.",
      features: ["Keyword Research", "Content Optimization", "Meta Tags", "Header Tags", "Internal Linking", "Image Optimization"]
    },
    {
      title: "Off-Page SEO",
      icon: "🔗",
      description: "Build authority through high-quality backlinks, local citations, and brand mentions.",
      features: ["Link Building", "Guest Posting", "Local Citations", "Brand Mentions", "Social Signals", "Digital PR"]
    },
    {
      title: "Local SEO",
      icon: "📍",
      description: "Dominate local search results and attract customers in your area with optimized Google Business Profile.",
      features: ["Google Business Profile", "Local Citations", "Review Management", "Local Keywords", "Map Pack Rankings", "Location Pages"]
    },
    {
      title: "E-commerce SEO",
      icon: "🛒",
      description: "Optimize product pages, category structure, and technical elements to boost online sales.",
      features: ["Product Optimization", "Category Structure", "Rich Snippets", "User Reviews", "Site Search", "Conversion Optimization"]
    },
    {
      title: "SEO Analytics",
      icon: "📊",
      description: "Data-driven insights with regular reporting and continuous optimization strategies.",
      features: ["Google Analytics", "Search Console", "Rank Tracking", "Competitor Analysis", "Monthly Reports", "ROI Tracking"]
    }
  ],
  process: [
    {
      step: "01",
      title: "SEO Audit & Analysis",
      desc: "We perform a comprehensive audit of your website, analyzing technical issues, content gaps, and competitor strategies.",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Keyword Strategy",
      desc: "Identify high-intent keywords with optimal search volume and competition levels for your business.",
      icon: "🎯"
    },
    {
      step: "03",
      title: "On-Page Optimization",
      desc: "Optimize your website content, meta data, structure, and technical elements for target keywords.",
      icon: "📝"
    },
    {
      step: "04",
      title: "Off-Page Building",
      desc: "Build authority through strategic link building, local citations, and brand awareness campaigns.",
      icon: "🔗"
    },
    {
      step: "05",
      title: "Monitor & Refine",
      desc: "Track rankings, analyze data, and continuously optimize strategies for maximum results.",
      icon: "📈"
    }
  ],
  results: [
    {
      metric: "Organic Traffic",
      increase: "+245%",
      timeframe: "6 Months",
      color: "#B2278C"
    },
    {
      metric: "Keyword Rankings",
      increase: "+180",
      timeframe: "Top 10 Positions",
      color: "#185EA7"
    },
    {
      metric: "Conversion Rate",
      increase: "+67%",
      timeframe: "Year over Year",
      color: "#814B97"
    },
    {
      metric: "Click-Through Rate",
      increase: "+42%",
      timeframe: "SERP CTR",
      color: "#B2278C"
    }
  ],
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "SEO is a long-term strategy. Typically, you'll start seeing initial improvements within 3-6 months, with significant results appearing after 6-12 months of consistent optimization."
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "No ethical SEO agency can guarantee #1 rankings as search algorithms are complex and constantly evolving. However, we guarantee data-driven strategies, transparent reporting, and continuous improvement toward your goals."
    },
    {
      q: "What's included in your SEO packages?",
      a: "Our SEO packages include technical audits, keyword research, on-page optimization, content strategy, link building, local SEO, regular reporting, and ongoing optimization. Contact us for custom packages tailored to your business needs."
    },
    {
      q: "Do you offer local SEO for Dubai businesses?",
      a: "Yes! We specialize in local SEO for UAE businesses, helping you dominate local search results, optimize Google Business Profile, and attract customers in your area."
    },
    {
      q: "How do you measure SEO success?",
      a: "We track key metrics including organic traffic, keyword rankings, conversion rates, click-through rates, bounce rates, and ROI. You'll receive detailed monthly reports with actionable insights."
    }
  ]
};

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '20px',
          background: `linear-gradient(135deg, rgba(178,39,140,0.2), transparent)`,
          border: '1px solid rgba(178,39,140,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {service.icon}
      </div>
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#ffffff',
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: '#888',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {service.description}
      </p>
      <div style={{ marginTop: 'auto' }}>
        {service.features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: '#666',
              fontSize: '0.85rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span style={{ color: '#B2278C' }}>✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ step, title, desc, icon, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '28px',
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(178,39,140,0.5)' : 'rgba(255,255,255,0.08)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, #B2278C, transparent)`,
          borderRadius: '28px 28px 0 0',
        }}
      />
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: '20px',
          background: 'rgba(178,39,140,0.1)',
          border: '1px solid rgba(178,39,140,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#B2278C',
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
        }}
      >
        STEP {step}
      </div>
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: '#ffffff',
        }}
      >
        {title}
      </h3>
      <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{desc}</p>
      <div
        style={{
          position: 'absolute',
          bottom: '-0.5rem',
          right: '1rem',
          fontSize: '5rem',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.02)',
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        {step}
      </div>
    </div>
  );
}

function ResultCard({ metric, increase, timeframe, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: hovered ? `rgba(178,39,140,0.5)` : 'rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: color,
          fontFamily: 'Inter, sans-serif',
          marginBottom: '0.5rem',
        }}
      >
        {increase}
      </div>
      <div
        style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {metric}
      </div>
      <div style={{ color: '#666', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{timeframe}</div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        marginBottom: '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#ffffff',
          textAlign: 'left',
        }}
      >
        {q}
        <span
          style={{
            fontSize: '1.5rem',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            color: '#B2278C',
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: '0 1.5rem 1.5rem 1.5rem',
            color: '#888',
            lineHeight: 1.7,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function SEO() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const heroTl = gsap.timeline({ delay: 0.2 });

    const headline = headlineRef.current;
    if (headline) {
      const words = headline.innerText.split(' ');
      headline.innerHTML = words
        .map(word => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(80px)">${word}</span>`)
        .join(' ');
    }

    heroTl
      .to('.word', { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power4.out' })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .fromTo(btnsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    floatingElementsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: i % 2 === 0 ? -40 : 40,
        x: i % 3 === 0 ? 30 : -30,
        rotation: i * 20,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    gsap.utils.toArray('.reveal-section').forEach(section => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap');

        :root {
          --pink: #B2278C;
          --blue: #185EA7;
          --purple: #814B97;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .glow-text {
          background: linear-gradient(135deg, #B2278C, #185EA7, #814B97);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s ease infinite;
        }
        
        .hero-badge {
          animation: pulse 2s ease infinite;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .process-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .process-grid {
            grid-template-columns: 1fr;
          }
          .results-grid {
            grid-template-columns: 1fr;
          }
          .stats-container {
            gap: 2rem;
          }
        }
        
        .stats-container {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          margin-top: 3rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-family: 'Inter', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #B2278C, #814B97);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
        }
        
        .stat-label {
          color: #888;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          font-family: 'Inter', sans-serif;
        }
        
        .whatis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        @media (max-width: 768px) {
          .whatis-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

     

      <section
        ref={heroRef}
        style={{
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div
              className="hero-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1.5rem',
                background: 'rgba(178,39,140,0.12)',
                border: '1px solid rgba(178,39,140,0.5)',
                borderRadius: '100px',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#B2278C', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#e0e0e0', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                {seoData.hero.badge}
              </span>
            </div>

            <h1
              ref={headlineRef}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: '1.5rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {seoData.hero.title}{' '}
              <span className="glow-text">{seoData.hero.titleGradient}</span>
            </h1>

            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#b0b0b0',
                maxWidth: 700,
                margin: '0 auto 2rem',
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {seoData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to={seoData.hero.ctaLink}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #B2278C, #8B1A6B)',
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 40px rgba(178,39,140,0.4)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {seoData.hero.ctaText} <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
              <Link
                to={seoData.hero.secondaryLink}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {seoData.hero.secondaryText}
              </Link>
            </div>

            <div className="stats-container">
              {seoData.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div className="whatis-grid">
            <div>
              <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                UNDERSTANDING SEO
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
                {seoData.whatIsSEO.title}
              </h2>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {seoData.whatIsSEO.description}
              </p>
              <div>
                {seoData.whatIsSEO.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#B2278C', fontSize: '1.2rem' }}>✓</span>
                    <span style={{ color: '#aaa', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: '28px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
               <img
                src='/se.avif'
                alt="NFC Digital Business Card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: 'scale(0.9)',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR EXPERTISE
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Comprehensive <span style={{ color: '#B2278C' }}>SEO Services</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Data-driven strategies tailored to your business goals and target audience
            </p>
          </div>

          <div className="services-grid">
            {seoData.services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR PROCESS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              How We Drive <span style={{ color: '#B2278C' }}>Results</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A systematic approach to achieve sustainable organic growth
            </p>
          </div>

          <div className="process-grid">
            {seoData.process.map((step, i) => (
              <ProcessStep key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              PROVEN RESULTS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Real Metrics. <span style={{ color: '#B2278C' }}>Real Growth.</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See the impact of our SEO strategies on client businesses
            </p>
          </div>

          <div className="results-grid">
            {seoData.results.map((result, i) => (
              <ResultCard key={i} {...result} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Frequently Asked <span style={{ color: '#B2278C' }}>Questions</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Everything you need to know about our SEO services
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {seoData.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'transparent' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(178,39,140,0.15), rgba(24,94,167,0.1))',
              borderRadius: '40px',
              padding: '4rem',
              textAlign: 'center',
              border: '1px solid rgba(178,39,140,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Ready to Dominate Search Results?
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Get a free SEO audit and discover how we can help you rank higher and attract more qualified leads.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #B2278C, #8B1A6B)',
                color: '#fff',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                transition: 'all 0.3s',
                boxShadow: '0 0 30px rgba(178,39,140,0.3)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Get Free SEO Audit <span style={{ fontSize: '1.2rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <div
        style={{
          position: 'fixed',
          right: '1.5rem',
          bottom: '1.5rem',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(178,39,140,0.5)',
            borderRadius: '50px',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            boxShadow: '0 8px 30px rgba(178,39,140,0.3)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B2278C', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          <span style={{ color: '#ffffff', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>Based in Dubai · Available Worldwide</span>
        </div>
      </div>
    </>
  );
}