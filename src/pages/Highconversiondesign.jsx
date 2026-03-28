import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowUpRight } from 'lucide-react';
import {MagneticBtn} from '../components/home/MagneticBtn';
import { 
  WHITE, INK, INK60, INK30, INK10, 
  OFF_WHITE, ORANGE, GRAD_HERO 
} from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const brandingData = {
  hero: {
    badge: "BRANDING & GRAPHIC DESIGN",
    title: "Create a Brand That",
    titleGradient: "Stands Out & Connects",
    description: "We craft unique brand identities and stunning visual designs that capture attention, build trust, and leave lasting impressions. From logos to complete brand systems, we bring your vision to life.",
    ctaText: "Start Your Brand Journey",
    ctaLink: "/contact",
    secondaryText: "View Portfolio",
    secondaryLink: "/works"
  },
  stats: [
    { number: "150+", label: "Brands Created" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Logo Designs" },
    { number: "24/7", label: "Creative Support" }
  ],
  whatIsBranding: {
    title: "Your Brand Is Your Promise",
    description: "Branding is more than just a logo—it's the emotional connection between your business and your audience. A strong brand identity builds trust, creates recognition, and communicates your values at every touchpoint.",
    points: [
      "Memorable logo and visual identity",
      "Consistent brand messaging across all platforms",
      "Professional packaging and marketing materials",
      "Emotional connection with your target audience",
      "Increased brand recognition and loyalty"
    ]
  },
  services: [
    {
      title: "Logo Design",
      icon: "✨",
      description: "Unique, memorable logos that capture your brand's essence and make a lasting impression.",
      features: ["Custom Logo Concepts", "Vector Graphics", "Color Palette Development", "Typography Selection", "Logo Usage Guidelines", "Multiple File Formats"]
    },
    {
      title: "Brand Identity",
      icon: "🎯",
      description: "Complete brand systems that create consistency across all customer touchpoints.",
      features: ["Brand Strategy", "Visual Identity System", "Brand Guidelines", "Color Psychology", "Typography Systems", "Brand Voice Development"]
    },
    {
      title: "Packaging Design",
      icon: "📦",
      description: "Eye-catching packaging that stands out on shelves and delights customers.",
      features: ["Product Packaging", "Box Design", "Label Design", "Sustainable Materials", "3D Mockups", "Retail-Ready Designs"]
    },
    {
      title: "Print Design",
      icon: "🖨️",
      description: "Professional print materials that communicate your brand's quality and professionalism.",
      features: ["Business Cards", "Brochures & Flyers", "Posters & Banners", "Stationery Design", "Catalog Design", "Print-Ready Files"]
    },
    {
      title: "Social Media Graphics",
      icon: "📱",
      description: "Engaging visual content that drives engagement and builds your social presence.",
      features: ["Post Designs", "Story Templates", "Cover Images", "Ad Creatives", "Carousel Designs", "Branded Templates"]
    },
    {
      title: "Illustration",
      icon: "🎨",
      description: "Custom illustrations that add personality and uniqueness to your brand.",
      features: ["Custom Illustrations", "Character Design", "Icon Sets", "Infographics", "Mascot Design", "Digital Art"]
    }
  ],
  portfolio: [
    {
      title: "Luxury Brand Identity",
      category: "Brand Identity",
      image: "https://images.pexels.com/photos/5598321/pexels-photo-5598321.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: ORANGE
    },
    {
      title: "Modern Logo Design",
      category: "Logo Design",
      image: "https://images.pexels.com/photos/5900446/pexels-photo-5900446.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#3b82f6"
    },
    {
      title: "Packaging Collection",
      category: "Packaging",
      image: "https://images.pexels.com/photos/4492135/pexels-photo-4492135.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#8b5cf6"
    },
    {
      title: "Social Media Campaign",
      category: "Social Graphics",
      image: "https://images.pexels.com/photos/3760373/pexels-photo-3760373.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: ORANGE
    },
    {
      title: "Brand Guidelines",
      category: "Brand Identity",
      image: "https://images.pexels.com/photos/5691696/pexels-photo-5691696.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#3b82f6"
    },
    {
      title: "Custom Illustrations",
      category: "Illustration",
      image: "https://images.pexels.com/photos/5554750/pexels-photo-5554750.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#8b5cf6"
    }
  ],
  process: [
    { step: "01", title: "Discovery", desc: "We dive deep into your business, values, target audience, and competitive landscape.", icon: "🔍" },
    { step: "02", title: "Research & Strategy", desc: "Market analysis, competitor research, and brand strategy development.", icon: "📊" },
    { step: "03", title: "Concept Development", desc: "Create initial concepts and visual directions for your brand identity.", icon: "💡" },
    { step: "04", title: "Design & Refinement", desc: "Develop chosen concepts with detailed design and client feedback integration.", icon: "✏️" },
    { step: "05", title: "Brand Guidelines", desc: "Create comprehensive brand guidelines for consistent application.", icon: "📘" },
    { step: "06", title: "Launch & Support", desc: "Deliver final assets and provide ongoing design support.", icon: "🚀" }
  ],
  results: [
    { metric: "Brand Recognition", increase: "+89%", timeframe: "Average Increase", color: ORANGE },
    { metric: "Customer Trust", increase: "+76%", timeframe: "Brand Credibility", color: "#3b82f6" },
    { metric: "Social Engagement", increase: "+156%", timeframe: "Average Growth", color: "#8b5cf6" },
    { metric: "Brand Value", increase: "+123%", timeframe: "Market Position", color: ORANGE }
  ],
  faqs: [
    { q: "What's included in a brand identity package?", a: "Our brand identity packages typically include logo design, color palette, typography selection, brand guidelines, business cards, and other essential brand elements. We customize packages based on your specific needs and business goals." },
    { q: "How long does the branding process take?", a: "A complete brand identity project typically takes 4-8 weeks, depending on complexity and feedback cycles. This includes research, concept development, design refinement, and final asset delivery." },
    { q: "Do you offer revisions during the design process?", a: "Yes! We include multiple rounds of revisions to ensure your brand identity perfectly aligns with your vision. We work collaboratively to refine and perfect every detail until you're completely satisfied." },
    { q: "What file formats do I receive for my logo?", a: "You'll receive your logo in multiple formats including AI (vector), EPS, PDF, PNG (transparent background), JPG, and SVG. These formats ensure your logo works perfectly for both print and digital applications." },
    { q: "Can you help with printing and production?", a: "Absolutely! We can help coordinate printing and production for business cards, packaging, signage, and other brand materials. We work with trusted local and international printers to ensure quality results." }
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
          fontSize: '1.2rem',
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
          fontSize: '2.5rem',
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

function PortfolioItem({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            background: WHITE,
            border: `1px solid ${item.color}`,
            borderRadius: '50px',
            fontSize: '0.7rem',
            color: item.color,
            marginBottom: '0.5rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          {item.category}
        </div>
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: WHITE,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
      </div>
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

export default function Branding() {
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
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .results-grid { grid-template-columns: repeat(2, 1fr); }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .results-grid { grid-template-columns: 1fr; }
          .portfolio-grid { grid-template-columns: 1fr; }
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
                {brandingData.hero.badge}
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
              {brandingData.hero.title}{' '}
              <span className="glow-text">{brandingData.hero.titleGradient}</span>
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
              {brandingData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn
                to={brandingData.hero.ctaLink}
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
                {brandingData.hero.ctaText} <ArrowUpRight size={18} />
              </MagneticBtn>
              <MagneticBtn
                to={brandingData.hero.secondaryLink}
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
                {brandingData.hero.secondaryText} <ArrowUpRight size={18} />
              </MagneticBtn>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
              {brandingData.stats.map((stat, i) => (
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
                WHY BRANDING MATTERS
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: INK, marginBottom: '1.5rem' }}>
                {brandingData.whatIsBranding.title}
              </h2>
              <p style={{ color: INK60, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {brandingData.whatIsBranding.description}
              </p>
              <div>
                {brandingData.whatIsBranding.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Check size={18} color={ORANGE} />
                    <span style={{ color: INK60, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/graph.avif'
                alt="Branding"
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
              OUR EXPERTISE
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Branding & <span style={{ color: ORANGE }}>Design Services</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Creative solutions that bring your brand to life
            </p>
          </div>

          <div className="services-grid">
            {brandingData.services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR WORK
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Recent <span style={{ color: ORANGE }}>Branding Projects</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how we've transformed brands across industries
            </p>
          </div>

          <div className="portfolio-grid">
            {brandingData.portfolio.map((item, i) => (
              <PortfolioItem key={i} item={item} index={i} />
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
              How We Build <span style={{ color: ORANGE }}>Your Brand</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A strategic approach to creating memorable brands
            </p>
          </div>

          <div className="process-grid">
            {brandingData.process.map((step, i) => (
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
              Brand Impact. <span style={{ color: ORANGE }}>Real Growth.</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how strategic branding has transformed our clients' businesses
            </p>
          </div>

          <div className="results-grid">
            {brandingData.results.map((result, i) => (
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
              Everything you need to know about our branding & design services
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {brandingData.faqs.map((faq, i) => (
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
              Ready to Build a Memorable Brand?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Let's create a unique brand identity that connects with your audience and stands out from the competition.
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
              Start Your Brand Journey <ArrowUpRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}