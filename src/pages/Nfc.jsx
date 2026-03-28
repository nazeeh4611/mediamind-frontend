import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, ChevronDown, Zap, RefreshCw, BarChart2, Palette, Leaf, Globe } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';

gsap.registerPlugin(ScrollTrigger);

const PINK = '#B2278C';
const PINK_LIGHT = 'rgba(178, 39, 140, 0.08)';
const PINK_MID = 'rgba(178, 39, 140, 0.18)';
const WHITE = '#FFFFFF';
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK30 = 'rgba(17, 17, 17, 0.3)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';

const nfcStats = [
  { number: '1,200+', label: 'Smart Cards Deployed' },
  { number: '99%', label: 'Customer Satisfaction' },
  { number: '4.8x', label: 'More Engagement' },
  { number: '24/7', label: 'Live Updates' },
];

const nfcProducts = [
  {
    title: 'Standard NFC Business Card',
    category: 'Essential',
    description: 'Premium PVC card with custom branding. Tap to share contact, website, and social profiles instantly.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    tag: 'Essential',
    features: ['Premium PVC', 'Custom design', 'Analytics dashboard', 'Unlimited updates'],
  },
  {
    title: 'Metal NFC Executive Card',
    category: 'Premium',
    description: 'Sleek metal finish with advanced NFC chip. Includes video integration, multi-link support, and priority analytics.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    tag: 'Premium',
    features: ['Metal material', 'Multi-link dashboard', 'Video integration', 'Advanced analytics'],
  },
  {
    title: 'NFC Smart Stickers',
    category: 'Versatile',
    description: 'Waterproof adhesive NFC stickers. Place on products, packaging, laptops, or any surface for instant connectivity.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
    tag: 'Stickers',
    features: ['Pack of 10', 'Waterproof', 'Custom URL', 'Track analytics'],
  },
  {
    title: 'NFC Wearable Wristband',
    category: 'Events',
    description: 'Silicone wristband with embedded NFC. Perfect for events, access control, and seamless networking.',
    image: 'https://images.unsplash.com/photo-1556741533-6e6a3bd1e0d2?w=800&q=80',
    tag: 'Wearable',
    features: ['Custom branding', 'Event check-in', 'Contact sharing', 'Durable design'],
  },
];

const nfcFeatures = [
  { title: 'Instant Contact Sharing', description: 'Share vCard, phone, email, and social profiles with a single tap.', icon: Zap },
  { title: 'Link to Anything', description: 'Connect to your website, portfolio, calendar, payment links, or any URL.', icon: Globe },
  { title: 'Update Anytime', description: 'Change information without reprinting. Always up-to-date.', icon: RefreshCw },
  { title: 'Analytics Dashboard', description: 'See who tapped, when, and how many times — track engagement.', icon: BarChart2 },
  { title: 'Custom Branding', description: 'Fully customized with your logo, colors, and brand identity.', icon: Palette },
  { title: 'Eco-Friendly', description: 'Sustainable alternative to paper cards. Zero waste, infinite reuse.', icon: Leaf },
];

const nfcUseCases = [
  { title: 'Business Networking', description: 'Replace paper cards with smart NFC that shares unlimited info.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80' },
  { title: 'Product Packaging', description: 'NFC stickers for instant manuals, video tutorials, and support.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
  { title: 'Event Management', description: 'Fast check-in, networking, and access control with wristbands.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
  { title: 'Restaurants & Cafes', description: 'Tap to view digital menus, order, and pay seamlessly.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80' },
  { title: 'Real Estate', description: 'NFC on property signs for instant listings and virtual tours.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
  { title: 'Retail Displays', description: 'Connect customers to product details, reviews, and purchase links.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
];

const nfcProcess = [
  { step: '01', title: 'Choose Your Card', description: 'Select from standard, metal, stickers, or wristbands. Upload your design or let our team craft it.' },
  { step: '02', title: 'Customize & Approve', description: 'We create mockups, add your brand assets, and set up your NFC destination link.' },
  { step: '03', title: 'Delivery & Activation', description: 'Receive your NFC product and activate it through our dashboard in seconds.' },
  { step: '04', title: 'Tap & Connect', description: 'Simply tap your card on any smartphone to share your world — instantly.' },
];

const nfcFaqs = [
  { q: 'How does NFC technology work?', a: "NFC (Near Field Communication) allows instant data transfer when two devices are close. When someone taps your NFC card with their smartphone, it instantly opens the link or information you've programmed — no app needed for most modern phones." },
  { q: 'Do all smartphones support NFC?', a: 'Yes, most modern smartphones (iPhone 7 and newer, and Android phones from 2017+) have built-in NFC readers. Users simply tap and the content appears.' },
  { q: 'Can I update my information after ordering?', a: 'Absolutely. One of the biggest advantages: you can update your contact details, links, and profile anytime through our online dashboard without reprinting.' },
  { q: 'What kind of content can I share?', a: 'vCard, websites, portfolios, social media, WhatsApp, calendar invites, payment links, videos, and any custom URL. The possibilities are limitless.' },
  { q: 'How long does delivery take?', a: 'Standard delivery 3–5 business days within UAE. Express available. International shipping also supported.' },
  { q: 'Can I track who taps my card?', a: 'Yes. Our analytics dashboard shows tap count, location, and engagement metrics. Optimize your profile based on real data.' },
];

function SectionLabel({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      color: PINK,
      fontWeight: 700,
      letterSpacing: '0.12em',
      fontSize: '0.72rem',
      fontFamily: 'Syne, sans-serif',
      marginBottom: '1rem',
      background: PINK_LIGHT,
      border: `1px solid ${PINK_MID}`,
      padding: '0.3rem 0.9rem',
      borderRadius: '4px',
    }}>{children}</span>
  );
}

function HeroNFC() {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.1 }
      );
      const words = textRef.current.querySelectorAll('.nfc-word');
      gsap.fromTo(words,
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'power4.out', delay: 0.4 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-sub'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.0 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-btns'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-stats'),
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(80px, 12vh, 110px)',
      paddingBottom: 'clamp(3rem, 8vw, 5rem)'
    }}>
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          top: 'clamp(80px, 12vh, 110px)',
          left: 0,
          width: '100%',
          height: '45%',
          zIndex: 1,
          borderTopRightRadius: 'clamp(16px, 3vw, 24px)',
          borderBottomRightRadius: 'clamp(16px, 3vw, 24px)',
          overflow: 'hidden'
        }}
      >
        <img
          src="/nfchero.avif"
          alt="NFC Hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.8) 100%)'
        }} />
      </div>

      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '1.5rem',
        }}
      >
        <div style={{ 
          width: '100%', 
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: PINK_MID,
            border: `1px solid ${PINK_MID}`,
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            marginBottom: '2rem'
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: PINK,
              display: 'block'
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.72rem',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.12em'
            }}>
              SMART NFC TECHNOLOGY
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            {['Smart', 'NFC', 'that', 'transforms', 'connections.'].map((w, i) => (
              <span key={i} className="nfc-word" style={{
                display: 'inline-block',
                marginRight: '0.22em'
              }}>{w}</span>
            ))}
          </h1>

          <p className="hero-sub" style={{
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            lineHeight: 1.6,
            maxWidth: '100%',
            marginBottom: '2.5rem'
          }}>
            Replace paper cards with intelligent NFC products. Share contacts, media,
            and websites with one tap — trackable, updatable, unforgettable.
          </p>

          <div className="hero-btns" style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            justifyContent: 'flex-start'
          }}>
            <MagneticBtn to="/contact" style={{
              padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
              background: '#fff',
              color: '#111',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'Syne, sans-serif',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              Get Your NFC Card <ArrowUpRight size={16} />
            </MagneticBtn>

            <MagneticBtn to="/works" style={{
              padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'Syne, sans-serif',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none'
            }}>
              View Products
            </MagneticBtn>
          </div>

          <div className="hero-stats" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '2rem'
          }}>
            {nfcStats.map((s, i) => (
              <div key={i} style={{
                textAlign: 'left'
              }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2
                }}>{s.number}</div>
                <div style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
                  marginTop: '0.3rem',
                  letterSpacing: '0.02em'
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: index * 0.08, scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? PINK : INK10}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.2,0.9,0.4,1.1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
        <img src={product.image} alt={product.title} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: PINK,
          color: WHITE,
          padding: '0.3rem 0.9rem',
          borderRadius: '6px',
          fontSize: '0.7rem',
          fontWeight: 700,
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '0.08em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {product.tag.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: INK, marginBottom: '0.6rem', lineHeight: 1.3 }}>{product.title}</h3>
        <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem', fontFamily: 'DM Sans, sans-serif' }}>{product.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {product.features.map((feat, idx) => (
            <span key={idx} style={{
              background: INK10,
              color: INK60,
              padding: '0.3rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif',
            }}>{feat}</span>
          ))}
        </div>
        <MagneticBtn to="/contact" style={{
          display: 'inline-flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.9rem 0',
          background: hovered ? PINK : INK,
          color: WHITE,
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.85rem',
          fontFamily: 'Syne, sans-serif',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          textDecoration: 'none',
          border: 'none'
        }}>
          Order Now <ArrowUpRight size={15} />
        </MagneticBtn>
      </div>
    </div>
  );
}

function FeatureTile({ feat, Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered ? OFF_WHITE : WHITE,
        padding: 'clamp(1.8rem, 4vw, 2.5rem)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        borderBottom: hovered ? `2px solid ${PINK}` : '2px solid transparent'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 52,
        height: 52,
        borderRadius: '12px',
        background: hovered ? PINK : PINK_LIGHT,
        border: `1px solid ${hovered ? PINK : PINK_MID}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        transition: 'all 0.3s ease',
      }}>
        <Icon size={22} color={hovered ? WHITE : PINK} />
      </div>
      <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: INK, marginBottom: '0.8rem' }}>{feat.title}</h4>
      <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.65, fontFamily: 'DM Sans, sans-serif' }}>{feat.description}</p>
    </div>
  );
}

function UseCaseTile({ useCase, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        aspectRatio: featured ? '16/10' : '4/3',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.15)' : 'none'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={useCase.image} alt={useCase.title} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.7s ease',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        transition: 'background 0.4s ease',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: featured ? 'clamp(1.5rem, 4vw, 2rem)' : '1.2rem' }}>
        <h4 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: featured ? 'clamp(1.1rem, 4vw, 1.4rem)' : '1rem',
          fontWeight: 800,
          color: WHITE,
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>{useCase.title}</h4>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: featured ? 'clamp(0.8rem, 2vw, 0.85rem)' : '0.75rem',
          fontFamily: 'DM Sans, sans-serif',
          lineHeight: 1.5,
          opacity: hovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease',
          display: featured ? 'block' : 'none'
        }}>{useCase.description}</p>
      </div>
    </div>
  );
}

function ProcessTile({ step, title, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? PINK : INK10}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.2,0.9,0.4,1.1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 4px 12px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '16px',
        background: hovered ? PINK : PINK_LIGHT,
        border: `1px solid ${hovered ? PINK : PINK_MID}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.8rem 1.8rem 0',
        fontFamily: 'Syne, sans-serif',
        fontSize: '1rem',
        fontWeight: 800,
        color: hovered ? WHITE : PINK,
        transition: 'all 0.3s ease'
      }}>
        {step}
      </div>
      <div style={{ padding: '1.2rem 1.8rem 1.8rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: INK, marginBottom: '0.6rem' }}>{title}</h3>
        <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.65, fontFamily: 'DM Sans, sans-serif' }}>{description}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, { height: 'auto', duration: 0.45, ease: 'power2.out', opacity: 1 });
      } else {
        gsap.to(contentRef.current, { height: 0, duration: 0.35, ease: 'power2.in', opacity: 0 });
      }
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: `1px solid ${INK10}`, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{
        width: '100%',
        padding: 'clamp(1rem, 4vw, 1.5rem) 0',
        background: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(0.9rem, 3vw, 1rem)',
        fontWeight: 700,
        color: isOpen ? INK : INK60,
        textAlign: 'left',
        gap: '1rem',
        transition: 'color 0.2s ease',
      }}>
        <span>{q}</span>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          background: isOpen ? PINK : INK10,
          border: `1px solid ${isOpen ? PINK : INK10}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          flexShrink: 0,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <ChevronDown size={16} color={isOpen ? WHITE : INK} />
        </div>
      </button>
      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{ color: INK60, lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', paddingBottom: '1.5rem' }}>{a}</p>
      </div>
    </div>
  );
}

export default function NFCSolutions() {
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up-nfc').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: WHITE, fontFamily: 'DM Sans, sans-serif' }}>
      <HeroNFC />

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="reveal-up-nfc">
              <SectionLabel>SMART CONNECTIVITY</SectionLabel>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                color: INK,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}>One Tap.<br />Infinite Possibilities.</h2>
              <p style={{ color: INK60, lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                NFC (Near Field Communication) allows instant data sharing with a simple tap. Replace paper cards with smart NFC products that update anytime, track engagement, and share unlimited information.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
                {['Share contacts instantly', 'Update without reprinting', 'Track who taps', 'Connect to any URL', 'Social media links', 'Eco-friendly'].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '5px',
                      background: PINK_LIGHT,
                      border: `1px solid ${PINK_MID}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={12} color={PINK} />
                    </div>
                    <span style={{ color: INK60, fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>{pt}</span>
                  </div>
                ))}
              </div>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: 'clamp(0.85rem, 2.5vw, 1rem) clamp(1.8rem, 4vw, 2.5rem)',
                background: PINK,
                color: WHITE,
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                fontFamily: 'Syne, sans-serif',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                border: 'none',
                boxShadow: '0 4px 12px rgba(178,39,140,0.3)'
              }}>
                Get Started <ArrowUpRight size={16} />
              </MagneticBtn>
            </div>
            <div className="reveal-up-nfc" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img
                  src="/nfcpage.avif"
                  alt="NFC Card"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: OFF_WHITE }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-1rem',
                left: '1rem',
                background: WHITE,
                border: `1px solid ${INK10}`,
                borderRadius: '16px',
                padding: 'clamp(1rem, 3vw, 1.2rem) clamp(1.2rem, 3vw, 1.5rem)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', fontWeight: 800, color: INK, lineHeight: 1 }}>4.8x</div>
                <div style={{ color: INK60, fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.2rem' }}>More Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal-up-nfc" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '3rem', gap: '1.5rem' }}>
            <div>
              <SectionLabel>OUR PRODUCTS</SectionLabel>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Smart NFC Solutions</h2>
            </div>
            <MagneticBtn to="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.6rem',
              border: `1.5px solid ${INK30}`,
              color: INK,
              background: 'transparent',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              fontFamily: 'Syne, sans-serif',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none'
            }}>
              View All <ArrowUpRight size={14} />
            </MagneticBtn>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {nfcProducts.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal-up-nfc" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>KEY FEATURES</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>Why Choose NFC</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1px',
            background: INK10,
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${INK10}`,
          }}>
            {nfcFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return <FeatureTile key={idx} feat={feat} Icon={Icon} />;
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal-up-nfc" style={{ marginBottom: '3rem' }}>
            <SectionLabel>USE CASES</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Versatile Applications</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {nfcUseCases.map((uc, i) => (
              <UseCaseTile key={i} useCase={uc} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal-up-nfc" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>SIMPLE PROCESS</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>Get Started in 4 Steps</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.8rem',
            position: 'relative',
            zIndex: 1,
          }}>
            {nfcProcess.map((step, i) => <ProcessTile key={i} {...step} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div className="reveal-up-nfc" style={{ position: 'sticky', top: '100px' }}>
              <SectionLabel>FAQs</SectionLabel>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 800,
                color: INK,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>Common<br />Questions</h2>
              <p style={{ color: INK60, lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif', marginBottom: '2rem', fontSize: '0.95rem' }}>Everything about NFC smart cards and solutions.</p>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: 'clamp(0.85rem, 2.5vw, 1rem) clamp(1.8rem, 4vw, 2.5rem)',
                background: PINK,
                color: WHITE,
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                fontFamily: 'Syne, sans-serif',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                border: 'none',
                boxShadow: '0 4px 12px rgba(178,39,140,0.3)'
              }}>
                Ask Us Anything <ArrowUpRight size={16} />
              </MagneticBtn>
            </div>
            <div className="reveal-up-nfc">
              {nfcFaqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openFAQ === i} onToggle={() => setOpenFAQ(openFAQ === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 1.5rem', background: INK, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(178,39,140,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '32px',
            padding: 'clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)',
            maxWidth: '95%',
            width: '100%'
          }}>
            <SectionLabel>GET STARTED</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              fontWeight: 800,
              color: WHITE,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>Ready to Upgrade<br />Your Connections?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 2rem', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
              Join the digital revolution. Get your custom NFC card today and start making every interaction count.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: 'clamp(0.9rem, 2.5vw, 1.1rem) clamp(1.8rem, 5vw, 2.8rem)',
                background: WHITE,
                color: INK,
                borderRadius: '12px',
                fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                Order Your NFC Card <ArrowUpRight size={16} />
              </MagneticBtn>
              <MagneticBtn to="/works" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: 'clamp(0.9rem, 2.5vw, 1.1rem) clamp(1.8rem, 5vw, 2.8rem)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.85)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                fontWeight: 600,
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}>
                See Examples
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}