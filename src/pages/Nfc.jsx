import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, ChevronDown, Zap, RefreshCw, BarChart2, Palette, Leaf, Globe } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';
import {
  WHITE, INK, INK60, INK30, INK10,
  OFF_WHITE,
} from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const PINK = '#B2278C';
const PINK_LIGHT = 'rgba(178, 39, 140, 0.08)';
const PINK_MID = 'rgba(178, 39, 140, 0.18)';

const nfcStats = [
  { number: '1,200+', label: 'Smart Cards Deployed' },
  { number: '99%',    label: 'Customer Satisfaction' },
  { number: '4.8x',   label: 'More Engagement' },
  { number: '24/7',   label: 'Live Updates' },
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
  paddingTop: '110px' // space for navbar
}}>
  {/* LEFT IMAGE */}
  <div
    ref={imgRef}
    style={{
      position: 'absolute',
      top: '110px',
      left: 0,
      width: '48%',   // smaller image
      height: '78%',  // smaller height
      zIndex: 1,
      borderTopRightRadius: '24px',
      borderBottomRightRadius: '24px',
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

    {/* overlay gradients */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(to right, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0.7) 70%, rgba(8,8,8,1) 100%)'
    }} />

    <div style={{
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.7) 100%)'
    }} />
  </div>

  {/* RIGHT CONTENT */}
  <div
    ref={textRef}
    style={{
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: 1240,
      margin: '0 auto',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'flex-end'
    }}
  >
    <div style={{ width: '52%', paddingLeft: '2rem' }}>
      {/* Label */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(178,39,140,0.18)',
        border: '1px solid rgba(178,39,140,0.38)',
        borderRadius: '100px',
        padding: '0.35rem 1rem',
        marginBottom: '2rem'
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#B2278C',
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

      {/* Title */}
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
        fontWeight: 800,
        color: '#fff',
        lineHeight: 0.96,
        letterSpacing: '-0.03em',
        marginBottom: '1.8rem'
      }}>
        {['Smart', 'NFC', 'that', 'transforms', 'connections.'].map((w, i) => (
          <span key={i} className="nfc-word" style={{
            display: 'inline-block',
            marginRight: '0.22em'
          }}>{w}</span>
        ))}
      </h1>

      {/* Subtitle */}
      <p className="hero-sub" style={{
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
        lineHeight: 1.75,
        maxWidth: 460,
        marginBottom: '2.8rem'
      }}>
        Replace paper cards with intelligent NFC products. Share contacts, media,
        and websites with one tap — trackable, updatable, unforgettable.
      </p>

      {/* Buttons */}
      <div className="hero-btns" style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '3.5rem'
      }}>
        <MagneticBtn to="/contact" style={{
          padding: '0.95rem 2.2rem',
          background: '#fff',
          color: '#111',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '0.88rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'Syne, sans-serif'
        }}>
          Get Your NFC Card <ArrowUpRight size={15} />
        </MagneticBtn>

        <MagneticBtn to="/works" style={{
          padding: '0.95rem 2.2rem',
          background: 'transparent',
          color: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '0.88rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'Syne, sans-serif',
          backdropFilter: 'blur(12px)'
        }}>
          View Products
        </MagneticBtn>
      </div>

      {/* Stats */}
      <div className="hero-stats" style={{
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        paddingTop: '2rem'
      }}>
        {nfcStats.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            paddingRight: i < nfcStats.length - 1 ? '1.5rem' : '0',
            borderRight: i < nfcStats.length - 1
              ? '1px solid rgba(255,255,255,0.12)'
              : 'none',
            paddingLeft: i > 0 ? '1.5rem' : '0'
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#fff'
            }}>{s.number}</div>

            <div style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.68rem',
              marginTop: '0.3rem'
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
        background: WHITE, border: `1px solid ${hovered ? PINK : INK10}`,
        borderRadius: '16px', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.2,0.9,0.4,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
        <img src={product.image} alt={product.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: PINK, color: WHITE, padding: '0.25rem 0.75rem',
          borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700,
          fontFamily: 'Syne, sans-serif', letterSpacing: '0.08em',
        }}>
          {product.tag.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: INK, marginBottom: '0.5rem' }}>{product.title}</h3>
        <p style={{ color: INK60, fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1.2rem', fontFamily: 'DM Sans, sans-serif' }}>{product.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {product.features.map((feat, idx) => (
            <span key={idx} style={{
              background: INK10, color: INK60,
              padding: '0.25rem 0.7rem', borderRadius: '4px',
              fontSize: '0.72rem', fontFamily: 'DM Sans, sans-serif',
            }}>{feat}</span>
          ))}
        </div>
        <MagneticBtn to="/contact" style={{
          display: 'inline-flex', width: '100%', justifyContent: 'center',
          alignItems: 'center', gap: '0.5rem', padding: '0.8rem 0',
          background: hovered ? PINK : INK, color: WHITE, borderRadius: '6px',
          fontWeight: 600, fontSize: '0.83rem', fontFamily: 'Syne, sans-serif',
          transition: 'background 0.3s',
        }}>
          Order Now <ArrowUpRight size={14} />
        </MagneticBtn>
      </div>
    </div>
  );
}

function FeatureTile({ feat, Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ background: hovered ? OFF_WHITE : WHITE, padding: '2.5rem', transition: 'background 0.3s', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '10px',
        background: hovered ? PINK : PINK_LIGHT,
        border: `1px solid ${hovered ? PINK : PINK_MID}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', transition: 'all 0.3s',
      }}>
        <Icon size={20} color={hovered ? WHITE : PINK} />
      </div>
      <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: INK, marginBottom: '0.6rem' }}>{feat.title}</h4>
      <p style={{ color: INK60, fontSize: '0.83rem', lineHeight: 1.65, fontFamily: 'DM Sans, sans-serif' }}>{feat.description}</p>
    </div>
  );
}

function UseCaseTile({ useCase, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        aspectRatio: featured ? '16/10' : '4/3',
        gridRow: featured ? 'span 2' : 'span 1', cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={useCase.image} alt={useCase.title} style={{
        width: '100%', height: '100%', objectFit: 'cover',
        transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
        transition: 'background 0.4s',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: featured ? '2rem' : '1.2rem' }}>
        <h4 style={{
          fontFamily: 'Syne, sans-serif', fontSize: featured ? '1.4rem' : '0.95rem',
          fontWeight: 800, color: WHITE, marginBottom: '0.4rem', lineHeight: 1.1,
        }}>{useCase.title}</h4>
        <p style={{
          color: 'rgba(255,255,255,0.7)', fontSize: featured ? '0.88rem' : '0.78rem',
          fontFamily: 'DM Sans, sans-serif', lineHeight: 1.5, maxWidth: 300,
          opacity: hovered ? 1 : 0.75, transition: 'opacity 0.3s',
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
        background: WHITE, border: `1px solid ${hovered ? PINK : INK10}`,
        borderRadius: '16px', overflow: 'hidden', transition: 'all 0.35s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 32px rgba(0,0,0,0.07)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 48, height: 48, borderRadius: '12px', background: PINK,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '1.8rem 1.8rem 0',
        fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', fontWeight: 800, color: WHITE,
      }}>
        {step}
      </div>
      <div style={{ padding: '1.2rem 1.8rem 1.8rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 800, color: INK, marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: INK60, fontSize: '0.82rem', lineHeight: 1.65, fontFamily: 'DM Sans, sans-serif' }}>{description}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.45, ease: 'power2.out', opacity: 1 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.35, ease: 'power2.in', opacity: 0 });
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: `1px solid ${INK10}`, overflow: 'hidden' }}>
      <button onClick={onToggle} style={{
        width: '100%', padding: '1.5rem 0', background: 'transparent', border: 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontSize: '0.95rem',
        fontWeight: 700, color: isOpen ? INK : INK60,
        textAlign: 'left', gap: '2rem', transition: 'color 0.2s',
      }}>
        {q}
        <div style={{
          width: 30, height: 30, borderRadius: '6px',
          background: isOpen ? PINK : INK10,
          border: `1px solid ${isOpen ? PINK : INK10}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', flexShrink: 0,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <ChevronDown size={15} color={isOpen ? WHITE : INK} />
        </div>
      </button>
      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{ color: INK60, lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', paddingBottom: '1.5rem' }}>{a}</p>
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
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: WHITE, fontFamily: 'DM Sans, sans-serif' }}>
      <HeroNFC />

      <section style={{ padding: '8rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div className="reveal-up-nfc">
              <SectionLabel>SMART CONNECTIVITY</SectionLabel>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 800, color: INK, lineHeight: 1.05,
                marginBottom: '1.5rem', letterSpacing: '-0.025em',
              }}>One Tap.<br />Infinite Possibilities.</h2>
              <p style={{ color: INK60, lineHeight: 1.85, marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}>
                NFC (Near Field Communication) allows instant data sharing with a simple tap. Replace paper cards with smart NFC products that update anytime, track engagement, and share unlimited information.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {['Share contacts instantly', 'Update without reprinting', 'Track who taps', 'Connect to any URL', 'Social media links', 'Eco-friendly'].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '4px',
                      background: PINK_LIGHT, border: `1px solid ${PINK_MID}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check size={10} color={PINK} />
                    </div>
                    <span style={{ color: INK60, fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>{pt}</span>
                  </div>
                ))}
              </div>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.9rem 2rem', background: PINK, color: WHITE,
                borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'Syne, sans-serif',
              }}>
                Get Started <ArrowUpRight size={15} />
              </MagneticBtn>
            </div>
            <div className="reveal-up-nfc" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/5' }}>
                <img
                  src="/nfcpage.avif"
                  alt="NFC Card"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '-1.5rem', left: '-1.5rem',
                background: WHITE, border: `1px solid ${INK10}`,
                borderRadius: '14px', padding: '1.2rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: INK, lineHeight: 1 }}>4.8x</div>
                <div style={{ color: INK60, fontSize: '0.72rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.2rem' }}>More Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up-nfc" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <SectionLabel>OUR PRODUCTS</SectionLabel>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: INK, letterSpacing: '-0.025em', lineHeight: 1.05 }}>Smart NFC Solutions</h2>
            </div>
            <MagneticBtn to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.75rem', border: `1px solid ${INK30}`,
              color: INK, background: 'transparent', borderRadius: '6px',
              fontWeight: 600, fontSize: '0.85rem', fontFamily: 'Syne, sans-serif', whiteSpace: 'nowrap',
            }}>
              View All <ArrowUpRight size={14} />
            </MagneticBtn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
            {nfcProducts.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up-nfc" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <SectionLabel>KEY FEATURES</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: INK, letterSpacing: '-0.025em' }}>Why Choose NFC</h2>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px', background: INK10,
            borderRadius: '20px', overflow: 'hidden', border: `1px solid ${INK10}`,
          }}>
            {nfcFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return <FeatureTile key={idx} feat={feat} Icon={Icon} />;
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up-nfc" style={{ marginBottom: '4rem' }}>
            <SectionLabel>USE CASES</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: INK, letterSpacing: '-0.025em', lineHeight: 1.05 }}>Versatile Applications</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '1.2rem' }}>
            {nfcUseCases.map((uc, i) => (
              <UseCaseTile key={i} useCase={uc} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up-nfc" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <SectionLabel>SIMPLE PROCESS</SectionLabel>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: INK, letterSpacing: '-0.025em' }}>Get Started in 4 Steps</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '2.8rem',
              left: 'calc(12.5% + 1.5rem)', right: 'calc(12.5% + 1.5rem)',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${PINK_MID}, transparent)`,
              zIndex: 0,
            }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              {nfcProcess.map((step, i) => <ProcessTile key={i} {...step} />)}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>
            <div className="reveal-up-nfc" style={{ position: 'sticky', top: '8rem' }}>
              <SectionLabel>FAQs</SectionLabel>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 800, color: INK, marginBottom: '1rem',
                letterSpacing: '-0.025em', lineHeight: 1.05,
              }}>Common<br />Questions</h2>
              <p style={{ color: INK60, lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Everything about NFC smart cards and solutions.</p>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.9rem 2rem', background: PINK, color: WHITE,
                borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'Syne, sans-serif',
              }}>
                Ask Us Anything <ArrowUpRight size={15} />
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

      <section style={{ padding: '8rem 0', background: INK, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,39,140,0.12) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px',
            padding: '4rem 5rem', maxWidth: 720,
          }}>
            <SectionLabel>GET STARTED</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800, color: WHITE, marginBottom: '1rem',
              letterSpacing: '-0.025em', lineHeight: 1.05,
            }}>Ready to Upgrade<br />Your Connections?</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 2.5rem', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Join the digital revolution. Get your custom NFC card today and start making every interaction count.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1rem 2.4rem', background: WHITE, color: INK,
                borderRadius: '6px', fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: '0.9rem',
              }}>
                Order Your NFC Card <ArrowUpRight size={16} />
              </MagneticBtn>
              <MagneticBtn to="/works" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1rem 2.4rem', background: 'transparent',
                color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px', fontWeight: 600, fontFamily: 'Syne, sans-serif', fontSize: '0.9rem',
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