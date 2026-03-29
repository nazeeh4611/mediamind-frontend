import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUpRight } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';
import {
  WHITE, INK, INK60, INK30, INK10,
  OFF_WHITE, ORANGE, GRAD_HERO
} from '../utils/constants';

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
    { step: "01", title: "SEO Audit & Analysis", desc: "We perform a comprehensive audit of your website, analyzing technical issues, content gaps, and competitor strategies.", icon: "🔍" },
    { step: "02", title: "Keyword Strategy", desc: "Identify high-intent keywords with optimal search volume and competition levels for your business.", icon: "🎯" },
    { step: "03", title: "On-Page Optimization", desc: "Optimize your website content, meta data, structure, and technical elements for target keywords.", icon: "📝" },
    { step: "04", title: "Off-Page Building", desc: "Build authority through strategic link building, local citations, and brand awareness campaigns.", icon: "🔗" },
    { step: "05", title: "Monitor & Refine", desc: "Track rankings, analyze data, and continuously optimize strategies for maximum results.", icon: "📈" }
  ],
  results: [
    { metric: "Organic Traffic", increase: "+245%", timeframe: "6 Months", color: "#B2278C" },
    { metric: "Keyword Rankings", increase: "+180", timeframe: "Top 10 Positions", color: "#B2278C" },
    { metric: "Conversion Rate", increase: "+67%", timeframe: "Year over Year", color: "#B2278C" },
    { metric: "Click-Through Rate", increase: "+42%", timeframe: "SERP CTR", color: "#B2278C" }
  ],
  faqs: [
    { q: "How long does SEO take to show results?", a: "SEO is a long-term strategy. Typically, you'll start seeing initial improvements within 3-6 months, with significant results appearing after 6-12 months of consistent optimization." },
    { q: "Do you guarantee #1 rankings on Google?", a: "No ethical SEO agency can guarantee #1 rankings as search algorithms are complex and constantly evolving. However, we guarantee data-driven strategies, transparent reporting, and continuous improvement toward your goals." },
    { q: "What's included in your SEO packages?", a: "Our SEO packages include technical audits, keyword research, on-page optimization, content strategy, link building, local SEO, regular reporting, and ongoing optimization. Contact us for custom packages tailored to your business needs." },
    { q: "Do you offer local SEO for Dubai businesses?", a: "Yes! We specialize in local SEO for UAE businesses, helping you dominate local search results, optimize Google Business Profile, and attract customers in your area." },
    { q: "How do you measure SEO success?", a: "We track key metrics including organic traffic, keyword rankings, conversion rates, click-through rates, bounce rates, and ROI. You'll receive detailed monthly reports with actionable insights." }
  ]
};

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: WHITE,
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
        minWidth: '280px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '16px',
          background: OFF_WHITE,
          border: `1px solid ${INK10}`,
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
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: INK,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: INK60,
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontFamily: "'Inter', sans-serif",
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
              color: INK60,
              fontSize: '0.85rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Check size={14} color="#B2278C" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ step, title, desc, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        minWidth: '280px',
        width: '100%',
        height: '100%'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: '16px',
          background: OFF_WHITE,
          border: `1px solid ${INK10}`,
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
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          color: "#B2278C",
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
        }}
      >
        STEP {step}
      </div>
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: INK,
        }}
      >
        {title}
      </h3>
      <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
    </div>
  );
}

function ResultCard({ metric, increase, timeframe, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        minWidth: '200px',
        width: '100%'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: "#B2278C",
          fontFamily: "'Inter', sans-serif",
          marginBottom: '0.5rem',
        }}
      >
        {increase}
      </div>
      <div
        style={{
          color: INK,
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {metric}
      </div>
      <div style={{ color: INK60, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>{timeframe}</div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${INK10}`,
        borderRadius: '16px',
        marginBottom: '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: INK,
          textAlign: 'left',
        }}
      >
        <span style={{ flex: 1 }}>{q}</span>
        <span
          style={{
            fontSize: '1.5rem',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            color: "#B2278C",
            marginLeft: '1rem'
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: '0 1.5rem 1.5rem 1.5rem',
            color: INK60,
            lineHeight: 1.7,
            borderTop: `1px solid ${INK10}`,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

function HorizontalScrollSection({ title, subtitle, items, renderItem, bgColor = WHITE }) {
  const scrollRef = useRef(null);

  return (
    <section style={{ padding: '4rem 0', background: bgColor }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {subtitle && (
            <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
              {subtitle}
            </p>
          )}
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
            {title}
          </h2>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch'
          }}
          className="horizontal-scroll"
        >
          {items.map((item, i) => (
            <div key={i} style={{ flex: '0 0 auto', width: 'min(100%, 320px)' }}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: ${INK10};
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: #B2278C;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

export default function SEO() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div style={{ background: WHITE }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .glow-text {
          background: linear-gradient(135deg, ${ORANGE}, #3b82f6, #8b5cf6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s ease infinite;
        }
        .container {
          width: 100%;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        button, .btn {
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .stats-container {
            gap: 1.5rem !important;
          }
        }
      `}</style>

      <section
        style={{
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',
          background: GRAD_HERO,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', width: '60%', maxWidth: 600, paddingBottom: '60%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '50%', maxWidth: 500, paddingBottom: '50%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.2rem',
                background: OFF_WHITE,
                border: `1px solid ${INK10}`,
                borderRadius: '100px',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: ORANGE, display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: INK60, fontSize: '0.85rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                {seoData.hero.badge}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: INK,
                letterSpacing: '-0.02em',
              }}
            >
              {seoData.hero.title}{' '}
              <span className="glow-text">{seoData.hero.titleGradient}</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                color: INK60,
                maxWidth: 700,
                margin: '0 auto 1.5rem',
                lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
                padding: '0 1rem'
              }}
            >
              {seoData.hero.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
              <MagneticBtn
                to={seoData.hero.ctaLink}
                style={{
                  padding: '0.8rem 1.8rem',
                  background: INK,
                  color: WHITE,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {seoData.hero.ctaText} <ArrowUpRight size={16} />
              </MagneticBtn>
              <MagneticBtn
                to={seoData.hero.secondaryLink}
                style={{
                  padding: '0.8rem 1.8rem',
                  background: WHITE,
                  color: INK,
                  border: `1px solid ${INK10}`,
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {seoData.hero.secondaryText} <ArrowUpRight size={16} />
              </MagneticBtn>
            </div>

            <div className="stats-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              {seoData.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: '100px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, background: `linear-gradient(135deg, ${ORANGE}, #8b5cf6)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>
                    {stat.number}
                  </div>
                  <div style={{ color: INK60, fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                UNDERSTANDING SEO
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
                {seoData.whatIsSEO.title}
              </h2>
              <p style={{ color: INK60, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                {seoData.whatIsSEO.description}
              </p>
              <div>
                {seoData.whatIsSEO.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <Check size={16} color="#B2278C" />
                    <span style={{ color: INK60, fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '24px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/se.avif'
                alt="SEO"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          </div>
        </div>
      </section>

      <HorizontalScrollSection
        subtitle="OUR EXPERTISE"
        title="Comprehensive <span style='color: #B2278C'>SEO Services</span>"
        items={seoData.services}
        renderItem={(service) => <ServiceCard service={service} />}
        bgColor={OFF_WHITE}
      />

      <HorizontalScrollSection
        subtitle="OUR PROCESS"
        title="How We Drive <span style='color: #B2278C'>Results</span>"
        items={seoData.process}
        renderItem={(step) => <ProcessStep {...step} />}
        bgColor={WHITE}
      />

      <HorizontalScrollSection
        subtitle="PROVEN RESULTS"
        title="Real Metrics. <span style='color: #B2278C'>Real Growth.</span>"
        items={seoData.results}
        renderItem={(result) => <ResultCard {...result} />}
        bgColor={OFF_WHITE}
      />

      <section style={{ padding: '4rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
              Frequently Asked <span style={{ color: "#B2278C" }}>Questions</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
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

      <section style={{ padding: '4rem 0', background: OFF_WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              background: INK,
              borderRadius: '28px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: WHITE, marginBottom: '0.8rem' }}>
              Ready to Dominate Search Results?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 1.5rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', padding: '0 1rem' }}>
              Get a free SEO audit and discover how we can help you rank higher and attract more qualified leads.
            </p>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.8rem',
                background: WHITE,
                color: INK,
                borderRadius: '50px',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem'
              }}
            >
              Get Free SEO Audit <ArrowUpRight size={16} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}