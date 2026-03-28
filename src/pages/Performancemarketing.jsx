import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowUpRight } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';  // Fixed: named import
import { 
  WHITE, INK, INK60, INK30, INK10, 
  OFF_WHITE, ORANGE, GRAD_HERO 
} from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const performanceData = {
  hero: {
    badge: "PERFORMANCE MARKETING",
    title: "Turn Your Marketing Budget Into",
    titleGradient: "Measurable Revenue",
    description: "Stop wasting money on ads that don't convert. Our data-driven performance marketing strategies deliver real ROI through Meta Ads, Google Ads, and full-funnel campaigns optimized for UAE and GCC markets.",
    ctaText: "Get Free Growth Audit",
    ctaLink: "/contact",
    secondaryText: "View Case Studies",
    secondaryLink: "/works"
  },
  stats: [
    { number: "AED 500K+", label: "ROI Delivered" },
    { number: "-35%", label: "Cost Per Lead" },
    { number: "2.8x", label: "Avg. ROAS" },
    { number: "15+", label: "UAE Brands" }
  ],
  whatIsPerformance: {
    title: "Performance Marketing That Drives Real Growth",
    description: "Performance marketing is a data-driven approach where every dirham is accountable. We only succeed when your business grows. Through rigorous testing, optimization, and full-funnel strategies, we maximize your ROI across all digital channels.",
    points: [
      "Pay only for measurable results—clicks, leads, or sales",
      "Data-driven decisions with real-time optimization",
      "Full-funnel strategies from awareness to conversion",
      "Multi-channel campaigns across Meta, Google, and more",
      "Transparent reporting with clear attribution"
    ]
  },
  channels: [
    { name: "Meta Ads", icon: "📱", color: "#1877F2", description: "Facebook & Instagram campaigns with precise targeting, creative testing, and budget optimization." },
    { name: "Google Ads", icon: "🔍", color: "#EA4335", description: "Search, Shopping, Display, and YouTube campaigns that capture high-intent traffic." },
    { name: "TikTok Ads", icon: "🎵", color: "#000000", description: "Reach younger audiences with engaging video content and viral campaign strategies." },
    { name: "LinkedIn Ads", icon: "💼", color: "#0A66C2", description: "B2B targeting and professional audience engagement for high-value leads." }
  ],
  services: [
    {
      title: "Meta Ads Management",
      icon: "🎯",
      description: "End-to-end Facebook and Instagram campaigns including audience research, creative testing, and budget optimisation for UAE and GCC markets.",
      features: ["Audience Research", "Creative Testing", "Budget Optimization", "Retargeting Campaigns", "Lookalike Audiences", "Performance Tracking"]
    },
    {
      title: "Google Ads Management",
      icon: "🔍",
      description: "Search, Shopping, Display, and YouTube campaigns combined with SEO to dominate both paid and organic rankings.",
      features: ["Search Campaigns", "Shopping Ads", "Display Network", "YouTube Ads", "Remarketing", "Performance Max"]
    },
    {
      title: "Retargeting Funnels",
      icon: "🔄",
      description: "Multi-touch retargeting sequences that bring back lost visitors and move them toward conversion.",
      features: ["Cart Abandonment", "Site Retargeting", "Email Retargeting", "Cross-Channel Sync", "Dynamic Ads", "Conversion Optimization"]
    },
    {
      title: "Analytics & Attribution",
      icon: "📊",
      description: "Full-funnel tracking with cross-channel attribution so you know exactly which campaigns drive revenue.",
      features: ["Google Analytics", "Conversion Tracking", "UTM Parameters", "ROI Analysis", "Custom Dashboards", "Monthly Reports"]
    },
    {
      title: "Creative Testing",
      icon: "🧪",
      description: "Systematic A/B testing of ad creatives, headlines, and CTAs to continuously improve performance.",
      features: ["A/B Testing", "Creative Strategy", "Ad Copy Testing", "Visual Optimization", "CTA Testing", "Performance Analysis"]
    },
    {
      title: "Conversion Rate Optimisation",
      icon: "⚡",
      description: "Landing page and offer optimisation to maximise the conversion rate of your paid traffic.",
      features: ["Landing Page Design", "A/B Testing", "User Experience", "Form Optimization", "Speed Optimization", "Mobile Responsive"]
    }
  ],
  process: [
    { step: "01", title: "Account Audit", desc: "We review your existing ad accounts, landing pages, and tracking setup to identify quick wins and structural issues.", icon: "🔍" },
    { step: "02", title: "Strategy & Setup", desc: "Build campaign structure, audience segments, creative briefs, and conversion tracking from the ground up.", icon: "📋" },
    { step: "03", title: "Launch & Learn", desc: "Deploy campaigns with controlled budgets while our system collects performance data across all variables.", icon: "🚀" },
    { step: "04", title: "Optimise & Scale", desc: "Double down on winning combinations, cut losers fast, and scale budgets methodically with performance guardrails.", icon: "📈" }
  ],
  results: [
    { metric: "ROI Delivered", increase: "AED 500K+", timeframe: "For UAE Clients", color: ORANGE },
    { metric: "Cost Per Lead", increase: "-35%", timeframe: "Average Reduction", color: "#3b82f6" },
    { metric: "Return on Ad Spend", increase: "2.8x", timeframe: "Average ROAS", color: "#8b5cf6" },
    { metric: "UAE Brands", increase: "15+", timeframe: "Trusted Us to Grow", color: ORANGE }
  ],
  faqs: [
    { q: "What is performance marketing?", a: "Performance marketing is a results-driven approach where advertisers pay only for measurable outcomes like clicks, leads, or sales. Unlike traditional advertising, every dirham spent is accountable and tied directly to business results." },
    { q: "How much budget do I need to start?", a: "We work with businesses of all sizes. Typically, we recommend a minimum monthly ad spend of AED 10,000-15,000 to see meaningful results, but we can tailor strategies based on your goals and budget." },
    { q: "How long until I see results?", a: "Initial results can be seen within the first 2-4 weeks as we test and optimize. Significant, scalable results typically appear after 60-90 days of consistent optimization and budget scaling." },
    { q: "What platforms do you advertise on?", a: "We specialize in Meta Ads (Facebook & Instagram), Google Ads (Search, Shopping, Display, YouTube), TikTok Ads, LinkedIn Ads, and programmatic display. We recommend platforms based on your target audience and business goals." },
    { q: "How do you measure success?", a: "We track key metrics including cost per lead, cost per acquisition, return on ad spend, conversion rate, and overall ROI. You'll receive detailed monthly reports with transparent performance data and actionable insights." },
    { q: "Do you offer creative services?", a: "Yes! We provide full creative services including ad copywriting, graphic design, video production, and landing page creation. We ensure your ads not only target the right audience but also convert them effectively." }
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
        border: `1px solid ${hovered ? ORANGE : INK10}`,
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
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
            <Check size={14} color={ORANGE} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelCard({ channel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? ORANGE : INK10}`,
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{channel.icon}</div>
      <div
        style={{
          color: channel.color,
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {channel.name}
      </div>
      <p
        style={{
          color: INK60,
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {channel.description}
      </p>
    </div>
  );
}

function ProcessStep({ step, title, desc, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? ORANGE : INK10}`,
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
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
          color: ORANGE,
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
        border: `1px solid ${hovered ? ORANGE : INK10}`,
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: color,
          fontFamily: "'Inter', sans-serif",
          marginBottom: '0.5rem',
        }}
      >
        {increase}
      </div>
      <div
        style={{
          color: INK,
          fontSize: '1rem',
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
          padding: '1.5rem',
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
        {q}
        <span
          style={{
            fontSize: '1.5rem',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            color: ORANGE,
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

export default function PerformanceMarketing() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
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
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .channels-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .channels-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .results-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .channels-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .results-grid { grid-template-columns: 1fr; }
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
      `}</style>

      <section
        ref={heroRef}
        style={{
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',
          background: GRAD_HERO,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1.5rem',
                background: OFF_WHITE,
                border: `1px solid ${INK10}`,
                borderRadius: '100px',
                marginBottom: '2rem',
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: ORANGE, display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: INK60, fontSize: '0.9rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                {performanceData.hero.badge}
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
                color: INK,
                letterSpacing: '-0.02em',
              }}
            >
              {performanceData.hero.title}{' '}
              <span className="glow-text">{performanceData.hero.titleGradient}</span>
            </h1>

            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: INK60,
                maxWidth: 700,
                margin: '0 auto 2rem',
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {performanceData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn
                to={performanceData.hero.ctaLink}
                style={{
                  padding: '1rem 2.5rem',
                  background: INK,
                  color: WHITE,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {performanceData.hero.ctaText} <ArrowUpRight size={18} />
              </MagneticBtn>
              <MagneticBtn
                to={performanceData.hero.secondaryLink}
                style={{
                  padding: '1rem 2.5rem',
                  background: WHITE,
                  color: INK,
                  border: `1px solid ${INK10}`,
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {performanceData.hero.secondaryText} <ArrowUpRight size={18} />
              </MagneticBtn>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
              {performanceData.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '2.5rem', fontWeight: 800, background: `linear-gradient(135deg, ${ORANGE}, #8b5cf6)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>
                    {stat.number}
                  </div>
                  <div style={{ color: INK60, fontSize: '0.85rem', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="whatis-grid">
            <div>
              <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                WHY PERFORMANCE MARKETING
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: INK, marginBottom: '1.5rem' }}>
                {performanceData.whatIsPerformance.title}
              </h2>
              <p style={{ color: INK60, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {performanceData.whatIsPerformance.description}
              </p>
              <div>
                {performanceData.whatIsPerformance.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Check size={18} color={ORANGE} />
                    <span style={{ color: INK60, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/perfo.avif'
                alt="Performance Marketing"
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

      <section style={{ padding: '6rem 0', background: OFF_WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              ADVERTISING CHANNELS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Multi-Channel <span style={{ color: ORANGE }}>Approach</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Reach your audience wherever they are
            </p>
          </div>

          <div className="channels-grid">
            {performanceData.channels.map((channel, i) => (
              <ChannelCard key={i} channel={channel} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR SERVICES
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Performance <span style={{ color: ORANGE }}>Marketing Services</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Data-driven strategies that deliver measurable results
            </p>
          </div>

          <div className="services-grid">
            {performanceData.services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: OFF_WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR PROCESS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              How We <span style={{ color: ORANGE }}>Deliver Results</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A systematic approach to achieving your goals
            </p>
          </div>

          <div className="process-grid">
            {performanceData.process.map((step, i) => (
              <ProcessStep key={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              PROVEN RESULTS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Real Metrics. <span style={{ color: ORANGE }}>Real ROI.</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See the impact of our performance marketing strategies
            </p>
          </div>

          <div className="results-grid">
            {performanceData.results.map((result, i) => (
              <ResultCard key={i} {...result} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: OFF_WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Frequently Asked <span style={{ color: ORANGE }}>Questions</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Everything you need to know about performance marketing
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {performanceData.faqs.map((faq, i) => (
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

      <section style={{ padding: '5rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              background: INK,
              borderRadius: '32px',
              padding: '4rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: WHITE, marginBottom: '1rem' }}>
              Ready to Scale Your Business?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Let's build a data-driven performance marketing strategy that delivers measurable ROI.
            </p>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: WHITE,
                color: INK,
                borderRadius: '50px',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Get Free Growth Audit <ArrowUpRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}