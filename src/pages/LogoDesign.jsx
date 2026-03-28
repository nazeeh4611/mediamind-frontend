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

const logoData = {
  hero: {
    badge: "LOGO DESIGNING",
    title: "Create a Logo That",
    titleGradient: "Defines Your Brand Identity",
    description: "Your logo is the face of your brand. We create unique, memorable logos that capture your brand's essence, communicate your values, and leave lasting impressions on your audience.",
    ctaText: "Get Your Logo Design",
    ctaLink: "/contact",
    secondaryText: "View Portfolio",
    secondaryLink: "/works"
  },
  stats: [
    { number: "500+", label: "Logos Created" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "3x", label: "Faster Turnaround" },
    { number: "100%", label: "Unique Designs" }
  ],
  whatIsLogo: {
    title: "Your Logo Is Your Brand's First Impression",
    description: "A great logo is more than just a symbol—it's the foundation of your brand identity. It communicates your brand's personality, builds trust, and creates instant recognition. In seconds, your logo tells customers who you are and what you stand for.",
    points: [
      "Creates instant brand recognition and recall",
      "Communicates your brand's personality and values",
      "Builds trust and credibility with customers",
      "Differentiates you from competitors",
      "Creates a professional brand image"
    ]
  },
  services: [
    {
      title: "Minimalist Logo",
      icon: "⬤",
      description: "Clean, simple, and timeless logos that focus on essential elements for maximum impact.",
      features: ["Simple Geometric Shapes", "Clean Typography", "Monochrome Options", "Scalable Design", "Timeless Appeal", "Versatile Usage"]
    },
    {
      title: "Modern Logo",
      icon: "✨",
      description: "Contemporary designs with bold typography, vibrant colors, and cutting-edge aesthetics.",
      features: ["Bold Typography", "Vibrant Colors", "Geometric Patterns", "Negative Space", "Dynamic Layouts", "Trend-Forward Design"]
    },
    {
      title: "Vintage Logo",
      icon: "🎞️",
      description: "Classic, nostalgic designs that evoke tradition, craftsmanship, and authenticity.",
      features: ["Classic Typography", "Ornate Details", "Hand-Drawn Elements", "Textured Finishes", "Heritage Feel", "Timeless Appeal"]
    },
    {
      title: "Luxury Logo",
      icon: "💎",
      description: "Elegant, sophisticated logos that convey premium quality and exclusivity.",
      features: ["Elegant Typography", "Gold Foil Effects", "Refined Details", "Serif Fonts", "Monogram Designs", "Premium Aesthetics"]
    },
    {
      title: "Mascot Logo",
      icon: "🦁",
      description: "Character-based logos that add personality, friendliness, and memorability.",
      features: ["Custom Characters", "Illustrated Mascots", "Friendly Appeal", "Bold Colors", "Versatile Usage", "Brand Personality"]
    },
    {
      title: "Abstract Logo",
      icon: "🎨",
      description: "Unique, artistic symbols that represent your brand in a creative and memorable way.",
      features: ["Custom Symbols", "Artistic Elements", "Unique Shapes", "Creative Concepts", "Symbolic Meaning", "Distinct Identity"]
    },
    {
      title: "3D Logo",
      icon: "🔲",
      description: "Dynamic, dimensional logos that create depth and visual impact.",
      features: ["3D Effects", "Depth Perception", "Modern Look", "Stand Out Design", "Visual Impact", "Versatile Usage"]
    },
    {
      title: "Handwritten Logo",
      icon: "✍️",
      description: "Personal, authentic logos with custom calligraphy and hand-drawn elements.",
      features: ["Custom Calligraphy", "Hand-Drawn Elements", "Personal Touch", "Authentic Feel", "Unique Character", "Artistic Style"]
    },
    {
      title: "Emblem Logo",
      icon: "🏅",
      description: "Classic emblem designs that convey tradition, authority, and heritage.",
      features: ["Classic Shape", "Detailed Elements", "Traditional Style", "Authority Feel", "Heritage Appeal", "Versatile Usage"]
    }
  ],
  portfolio: [
    {
      title: "Luxury Brand Monogram",
      category: "Luxury Logo",
      image: "https://images.pexels.com/photos/5900418/pexels-photo-5900418.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: ORANGE
    },
    {
      title: "Tech Startup Logo",
      category: "Modern Logo",
      image: "https://images.pexels.com/photos/5900459/pexels-photo-5900459.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#3b82f6"
    },
    {
      title: "Cafe Brand Identity",
      category: "Vintage Logo",
      image: "https://images.pexels.com/photos/5900486/pexels-photo-5900486.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#8b5cf6"
    },
    {
      title: "Fitness Brand Logo",
      category: "Abstract Logo",
      image: "https://images.pexels.com/photos/5900422/pexels-photo-5900422.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: ORANGE
    },
    {
      title: "Sports Mascot",
      category: "Mascot Logo",
      image: "https://images.pexels.com/photos/5900472/pexels-photo-5900472.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#3b82f6"
    },
    {
      title: "Beauty Brand",
      category: "Minimalist Logo",
      image: "https://images.pexels.com/photos/5900442/pexels-photo-5900442.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#8b5cf6"
    }
  ],
  process: [
    { step: "01", title: "Discovery", desc: "We learn about your business, values, target audience, and design preferences.", icon: "🔍" },
    { step: "02", title: "Research", desc: "Market analysis, competitor research, and brand positioning strategy.", icon: "📊" },
    { step: "03", title: "Concept Development", desc: "Create multiple logo concepts based on your brand strategy and preferences.", icon: "💡" },
    { step: "04", title: "Refinement", desc: "Select the best concept and refine details, colors, and typography.", icon: "✏️" },
    { step: "05", title: "Finalization", desc: "Prepare final logo files in multiple formats for all applications.", icon: "✅" },
    { step: "06", title: "Delivery", desc: "Deliver complete logo package with brand guidelines and support.", icon: "🚀" }
  ],
  results: [
    { metric: "Brand Recognition", increase: "+78%", timeframe: "Average Increase", color: ORANGE },
    { metric: "Customer Trust", increase: "+65%", timeframe: "Brand Credibility", color: "#3b82f6" },
    { metric: "Recall Rate", increase: "+82%", timeframe: "Logo Recognition", color: "#8b5cf6" },
    { metric: "Brand Value", increase: "+45%", timeframe: "Perceived Value", color: ORANGE }
  ],
  packages: [
    {
      name: "Basic Logo Package",
      price: "AED 499",
      description: "Perfect for startups and small businesses",
      features: ["1 Unique Logo Concept", "2 Revision Rounds", "High-Res Files (PNG, JPG)", "Vector Files (AI, EPS)", "Color Palette", "3 Business Day Delivery"],
      popular: false
    },
    {
      name: "Professional Package",
      price: "AED 999",
      description: "Most popular choice for growing brands",
      features: ["3 Unique Logo Concepts", "Unlimited Revisions", "All File Formats", "Complete Color Palette", "Typography Selection", "Basic Brand Guidelines", "Social Media Kit", "5 Business Day Delivery"],
      popular: true
    },
    {
      name: "Premium Package",
      price: "AED 1999",
      description: "Complete brand identity solution",
      features: ["5 Unique Logo Concepts", "Unlimited Revisions", "All File Formats", "Complete Brand Guidelines", "Full Color Palette", "Typography System", "Social Media Kit", "Business Card Design", "Stationery Design", "Priority Support", "7 Business Day Delivery"],
      popular: false
    }
  ],
  faqs: [
    { q: "What's included in your logo design package?", a: "Our logo design package includes multiple initial concepts, unlimited revisions until you're satisfied, final logo files in all formats (AI, EPS, PDF, PNG, JPG, SVG), color variations, typography details, and basic brand guidelines." },
    { q: "How long does the logo design process take?", a: "Typically, the logo design process takes 2-4 weeks from initial consultation to final delivery. This includes research, concept development, revisions, and final file preparation." },
    { q: "How many logo concepts do you provide?", a: "We typically provide 3-5 unique logo concepts based on your brief. We then refine your preferred concept through multiple rounds of revisions until it's perfect." },
    { q: "What file formats will I receive?", a: "You'll receive your logo in multiple formats including AI (vector), EPS, PDF, PNG (transparent background), JPG, and SVG. These formats ensure your logo works perfectly for both print and digital applications." },
    { q: "Do you provide logo usage guidelines?", a: "Yes! We provide comprehensive logo guidelines that include color codes, typography specifications, minimum size requirements, clear space rules, and examples of correct and incorrect usage." },
    { q: "Can you redesign my existing logo?", a: "Absolutely! We can refresh and modernize your existing logo while maintaining its core identity and recognition value. This is a great option for established brands looking for a fresh look." },
    { q: "Do I own the copyright to my logo?", a: "Yes! Upon final payment, you receive full ownership and copyright of your logo design. We provide all necessary files and documentation." }
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

function PackageCard({ package: pkg }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        background: WHITE,
        border: pkg.popular ? `2px solid ${ORANGE}` : `1px solid ${INK10}`,
        borderRadius: '24px',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
        textAlign: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {pkg.popular && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: ORANGE,
            padding: '0.25rem 1rem',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: WHITE,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          MOST POPULAR
        </div>
      )}
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: INK,
        }}
      >
        {pkg.name}
      </h3>
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: ORANGE,
          marginBottom: '0.5rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {pkg.price}
      </div>
      <p
        style={{
          color: INK60,
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {pkg.description}
      </p>
      <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        {pkg.features.map((feature, idx) => (
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
      <MagneticBtn
        to="/contact"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: pkg.popular ? INK : OFF_WHITE,
          color: pkg.popular ? WHITE : INK,
          borderRadius: '50px',
          fontWeight: 600,
          fontSize: '0.9rem',
          fontFamily: "'Inter', sans-serif",
          border: pkg.popular ? 'none' : `1px solid ${INK10}`,
          width: '100%',
        }}
      >
        Get Started →
      </MagneticBtn>
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

export default function LogoDesigning() {
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
        
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .results-grid { grid-template-columns: repeat(2, 1fr); }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
          .packages-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .results-grid { grid-template-columns: 1fr; }
          .portfolio-grid { grid-template-columns: 1fr; }
          .packages-grid { grid-template-columns: 1fr; }
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
                {logoData.hero.badge}
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
              {logoData.hero.title}{' '}
              <span className="glow-text">{logoData.hero.titleGradient}</span>
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
              {logoData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn
                to={logoData.hero.ctaLink}
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
                {logoData.hero.ctaText} <ArrowUpRight size={18} />
              </MagneticBtn>
              <MagneticBtn
                to={logoData.hero.secondaryLink}
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
                {logoData.hero.secondaryText} <ArrowUpRight size={18} />
              </MagneticBtn>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
              {logoData.stats.map((stat, i) => (
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
                WHY LOGO MATTERS
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: INK, marginBottom: '1.5rem' }}>
                {logoData.whatIsLogo.title}
              </h2>
              <p style={{ color: INK60, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {logoData.whatIsLogo.description}
              </p>
              <div>
                {logoData.whatIsLogo.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Check size={18} color={ORANGE} />
                    <span style={{ color: INK60, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/logo.avif'
                alt="Logo Design"
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
              Logo Design <span style={{ color: ORANGE }}>Styles</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Custom logo designs tailored to your brand personality
            </p>
          </div>

          <div className="services-grid">
            {logoData.services.map((service, i) => (
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
              Recent <span style={{ color: ORANGE }}>Logo Designs</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how we've created memorable logos for businesses across industries
            </p>
          </div>

          <div className="portfolio-grid">
            {logoData.portfolio.map((item, i) => (
              <PortfolioItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: OFF_WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              PRICING PLANS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Choose Your <span style={{ color: ORANGE }}>Logo Package</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Flexible packages designed for every budget and requirement
            </p>
          </div>

          <div className="packages-grid">
            {logoData.packages.map((pkg, i) => (
              <PackageCard key={i} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR PROCESS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              How We Create <span style={{ color: ORANGE }}>Your Logo</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A collaborative process from concept to final delivery
            </p>
          </div>

          <div className="process-grid">
            {logoData.process.map((step, i) => (
              <ProcessStep key={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: OFF_WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              PROVEN RESULTS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Logo Impact. <span style={{ color: ORANGE }}>Brand Growth.</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how professional logo design transforms businesses
            </p>
          </div>

          <div className="results-grid">
            {logoData.results.map((result, i) => (
              <ResultCard key={i} {...result} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Frequently Asked <span style={{ color: ORANGE }}>Questions</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Everything you need to know about our logo design services
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {logoData.faqs.map((faq, i) => (
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

      <section style={{ padding: '5rem 0', background: OFF_WHITE }}>
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
              Ready to Create Your Perfect Logo?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Let's design a logo that captures your brand's essence and makes a lasting impression.
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
              Start Your Logo Design <ArrowUpRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}