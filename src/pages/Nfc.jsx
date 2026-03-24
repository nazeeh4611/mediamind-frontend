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

const nfcPageData = {
  hero: {
    badge: "NFC SOLUTIONS",
    title: "Smart NFC Technology That",
    titleGradient: "Transforms How You Connect",
    description: "Upgrade your business cards and customer interactions with NFC technology. Share contact details, websites, social media, and more with just one tap. Smart, sustainable, and unforgettable.",
    ctaText: "Get Your NFC Card",
    ctaLink: "/contact",
    secondaryText: "View Products",
    secondaryLink: "/works"
  },
  stats: [
    { number: "1000+", label: "Cards Delivered" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "3x", label: "More Connections" },
    { number: "24/7", label: "Digital Updates" }
  ],
  whatIsNFC: {
    title: "One Tap. Infinite Possibilities.",
    description: "NFC (Near Field Communication) technology allows instant data sharing with a simple tap. Replace traditional paper business cards with smart NFC cards that can be updated anytime, track engagement, and share unlimited information.",
    points: [
      "Share contact details instantly with one tap",
      "Update your information anytime without reprinting",
      "Track who taps your card and when",
      "Connect to websites, portfolios, and social media",
      "Eco-friendly and sustainable alternative"
    ]
  },
  products: [
    {
      title: "Standard NFC Card",
      icon: "💳",
      price: "AED 99",
      description: "Perfect for professionals. Tap to share contact details, website, and social links.",
      features: ["Premium PVC Material", "Custom Design", "URL Redirect", "Analytics Dashboard", "Easy Updates", "One Tap Sharing"]
    },
    {
      title: "Premium NFC Card",
      icon: "✨",
      price: "AED 149",
      description: "Metal finish with advanced features. Stand out with premium quality.",
      features: ["Metal Material", "Custom Design", "Multiple Links", "Advanced Analytics", "Video Integration", "Priority Support"]
    },
    {
      title: "NFC Sticker Pack",
      icon: "🏷️",
      price: "AED 49",
      description: "Place on any surface. Perfect for products, displays, and packaging.",
      features: ["Pack of 10", "Waterproof", "Customizable URL", "Easy Application", "Track Analytics", "Versatile Usage"]
    },
    {
      title: "NFC Wristband",
      icon: "⌚",
      price: "AED 199",
      description: "Wearable NFC technology for events, access control, and more.",
      features: ["Silicone Material", "Custom Branding", "Event Check-in", "Contact Sharing", "Access Control", "Durable Design"]
    }
  ],
  features: [
    {
      title: "Instant Contact Sharing",
      icon: "👤",
      description: "Share your vCard, phone number, email, and social profiles with one tap."
    },
    {
      title: "Link to Anything",
      icon: "🔗",
      description: "Connect to your website, portfolio, calendar, payment links, or any URL."
    },
    {
      title: "Update Anytime",
      icon: "🔄",
      description: "Change your information anytime without reprinting or replacing cards."
    },
    {
      title: "Track Analytics",
      icon: "📊",
      description: "See who tapped your card, when, and how many times—track engagement."
    },
    {
      title: "Custom Design",
      icon: "🎨",
      description: "Fully customized with your logo, colors, and brand identity."
    },
    {
      title: "Eco-Friendly",
      icon: "🌱",
      description: "Sustainable alternative to paper business cards. No waste, no reprinting."
    }
  ],
  useCases: [
    {
      title: "Business Cards",
      description: "Replace paper cards with smart NFC cards that share unlimited information.",
      icon: "💼"
    },
    {
      title: "Product Packaging",
      description: "Add NFC stickers to products for instant access to manuals, videos, and support.",
      icon: "📦"
    },
    {
      title: "Event Check-in",
      description: "Streamline events with NFC wristbands for fast entry and networking.",
      icon: "🎫"
    },
    {
      title: "Restaurant Menus",
      description: "Tap to view digital menus, place orders, and make payments.",
      icon: "🍽️"
    },
    {
      title: "Real Estate",
      description: "Place NFC stickers on properties for instant access to listings and virtual tours.",
      icon: "🏠"
    },
    {
      title: "Retail Displays",
      description: "Connect customers to product information, reviews, and purchase links.",
      icon: "🛍️"
    }
  ],
  howItWorks: [
    {
      step: "01",
      title: "Order Your Card",
      desc: "Choose your card type, upload your design, and provide your link details.",
      icon: "🛒"
    },
    {
      step: "02",
      title: "We Customize",
      desc: "Our team designs and prints your custom NFC card with premium materials.",
      icon: "🎨"
    },
    {
      step: "03",
      title: "Receive & Activate",
      desc: "Get your card delivered and activate it by setting up your profile.",
      icon: "📦"
    },
    {
      step: "04",
      title: "Tap & Share",
      desc: "Simply tap your card on any smartphone to share your information instantly.",
      icon: "📱"
    }
  ],
  faqs: [
    {
      q: "How does NFC technology work?",
      a: "NFC (Near Field Communication) allows data transfer when two devices are within close proximity—just a tap. When someone taps your NFC card with their smartphone, it instantly opens the link or information you've programmed."
    },
    {
      q: "Do all phones support NFC?",
      a: "Most modern smartphones (both iPhone and Android) support NFC. iPhones from iPhone 7 and newer, and most Android phones from 2017+ have built-in NFC readers. No app is required."
    },
    {
      q: "Can I update my information after ordering?",
      a: "Yes! That's one of the biggest advantages of NFC cards. You can update your contact details, links, and profile anytime through our dashboard without needing to reprint or replace your card."
    },
    {
      q: "What information can I share?",
      a: "You can share vCard contacts, websites, portfolios, social media profiles, WhatsApp links, calendar invites, payment links, videos, and any custom URL. The possibilities are endless."
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes 3-5 business days within the UAE. Express delivery is available for urgent orders. International shipping is also available with varying delivery times."
    },
    {
      q: "Can I track who taps my card?",
      a: "Yes! Our analytics dashboard shows you when your card was tapped, where, and how many times. You'll see engagement metrics and can optimize your profile accordingly."
    }
  ]
};

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '28px',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        textAlign: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
        }}
      >
        {product.icon}
      </div>
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: '#ffffff',
        }}
      >
        {product.title}
      </h3>
      <div
        style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          color: '#B2278C',
          marginBottom: '1rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {product.price}
      </div>
      <p
        style={{
          color: '#888',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {product.description}
      </p>
      <div style={{ marginTop: 'auto' }}>
        {product.features.map((feature, idx) => (
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
      <Link
        to="/contact"
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #B2278C, #8B1A6B)',
          color: '#fff',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          transition: 'all 0.3s',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Order Now →
      </Link>
    </div>
  );
}

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(178,39,140,0.5)' : 'rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: '#ffffff',
        }}
      >
        {feature.title}
      </h3>
      <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        {feature.description}
      </p>
    </div>
  );
}

function UseCaseCard({ useCase }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{useCase.icon}</div>
      <h4
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: '#B2278C',
        }}
      >
        {useCase.title}
      </h4>
      <p style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
        {useCase.description}
      </p>
    </div>
  );
}

function HowItWorksStep({ step, title, desc, icon }) {
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

export default function NFCSolutions() {
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
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .usecases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .usecases-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .usecases-grid {
            grid-template-columns: 1fr;
          }
          .process-grid {
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
                {nfcPageData.hero.badge}
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
              {nfcPageData.hero.title}{' '}
              <span className="glow-text">{nfcPageData.hero.titleGradient}</span>
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
              {nfcPageData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to={nfcPageData.hero.ctaLink}
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
                {nfcPageData.hero.ctaText} <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
              <Link
                to={nfcPageData.hero.secondaryLink}
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
                {nfcPageData.hero.secondaryText}
              </Link>
            </div>

            <div className="stats-container">
              {nfcPageData.stats.map((stat, i) => (
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
                SMART TECHNOLOGY
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
                {nfcPageData.whatIsNFC.title}
              </h2>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {nfcPageData.whatIsNFC.description}
              </p>
              <div>
                {nfcPageData.whatIsNFC.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#B2278C', fontSize: '1.2rem' }}>✓</span>
                    <span style={{ color: '#aaa', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              <img
                src='/nfc.avif'
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
              OUR PRODUCTS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Choose Your <span style={{ color: '#B2278C' }}>NFC Solution</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Premium NFC products designed for every need
            </p>
          </div>

          <div className="products-grid">
            {nfcPageData.products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              KEY FEATURES
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Why Choose <span style={{ color: '#B2278C' }}>NFC Technology</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Transform how you connect and share information
            </p>
          </div>

          <div className="features-grid">
            {nfcPageData.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              USE CASES
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Versatile <span style={{ color: '#B2278C' }}>Applications</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              NFC technology works across industries and use cases
            </p>
          </div>

          <div className="usecases-grid">
            {nfcPageData.useCases.map((useCase, i) => (
              <UseCaseCard key={i} useCase={useCase} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Simple <span style={{ color: '#B2278C' }}>4-Step Process</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Get your NFC solution in no time
            </p>
          </div>

          <div className="process-grid">
            {nfcPageData.howItWorks.map((step, i) => (
              <HowItWorksStep key={i} {...step} />
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
              Everything you need to know about NFC solutions
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {nfcPageData.faqs.map((faq, i) => (
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
              Ready to Upgrade Your Business Cards?
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Join the digital revolution. Get your custom NFC card today and make connections that last.
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
              Order Your NFC Card <span style={{ fontSize: '1.2rem' }}>→</span>
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