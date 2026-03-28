import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';
import {
  WHITE, INK, INK60, INK30, INK10,
  OFF_WHITE,
} from '../utils/constants';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiWordpress,
  SiShopify,
  SiWebflow,
  SiFramer,
  SiLaravel
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const PINK = '#B2278C';
const PINK_LIGHT = 'rgba(178, 39, 140, 0.1)';

const heroImages = [
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
];

const portfolioProjects = [
  {
    title: 'HRG Investment',
    category: 'Investment Platform',
    url: 'www.hrginvestment.com',
    description: 'A premium holding company website with sophisticated investment solutions and investor-focused UX.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    tag: 'Corporate',
  },
  {
    title: 'AddToCart',
    category: 'E-commerce Platform',
    url: 'www.addtocart.ae',
    description: 'Premier e-commerce platform bringing restaurant-quality F&B products to private customers.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    tag: 'E-commerce',
  },
  {
    title: 'KingsLane Group',
    category: 'Hospitality & Hotels',
    url: 'www.kingslanegroup.com',
    description: 'A $130M+ hotel portfolio website reflecting rapid growth and exceptional hospitality standards.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    tag: 'Hospitality',
  },
  {
    title: 'VAVCI',
    category: 'Luxury Fashion',
    url: 'www.vavci.ae',
    description: "Dubai's premier online shopping destination merging Eastern artistry with modern sophistication.",
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    tag: 'Fashion',
  },
];

const services = [
  {
    label: 'Shopify / Ecommerce Websites',
    heading: 'Stores That Sell While You Sleep',
    desc: 'We design high-converting online stores with seamless user interfaces, custom Shopify themes, and features tailored exactly to your brand.',
    points: ['Payment gateway integration', 'Inventory management', 'Dedicated maintenance & support', 'SEO-optimized product architecture'],
    image: '/webshopi.avif',
    badge: 'E-commerce',
  },
  {
    label: 'WordPress / Business Websites',
    heading: 'Robust Websites That Drive Results',
    desc: 'Scalable, SEO-friendly business websites with blazing fast performance and user-friendly content management so you stay in control.',
    points: ['Blazing fast performance', 'Ultimate user experience', 'Easy content management', 'Mobile-first architecture'],
    image: '/webwe.avif',
    badge: 'CMS',
  },
  {
    label: 'Framer & Webflow Websites',
    heading: 'Visually Stunning. Functionally Flawless.',
    desc: 'Interactive websites built with Framer & Webflow that breathe life into your brand with sophisticated animations and real-time updates.',
    points: ['Seamless CRM integration', 'Tier-1 cloud hosting', 'Advanced animations', 'No-code content editing'],
    image: '/webnocode.avif',
    badge: 'No-Code',
  },
  {
    label: 'Custom Website Development',
    heading: 'Built From Scratch. Built to Last.',
    desc: 'Bespoke web solutions engineered from the ground up, perfectly aligned with your business objectives and unique brand identity.',
    points: ['MEAN & MERN stack', 'Private & secure infrastructure', 'Multi-lingual support', 'Fully scalable architecture'],
    image: '/webcode.avif',
    badge: 'Custom Dev',
  },
];

const faqs = [
  { q: 'How much does it cost to build a website?', a: 'A basic website typically starts from AED 5,000, while a custom and complex website can range from AED 10,000 to AED 20,000+. We provide detailed quotes after understanding your specific requirements.' },
  { q: 'How long does it take to build a website?', a: 'A standard business website typically takes 4–8 weeks, while e-commerce sites may take 8–12 weeks. We provide a detailed timeline after the discovery phase.' },
  { q: 'Will my website be mobile-responsive?', a: 'Absolutely. All websites we build are fully responsive and optimized for every device — desktop, tablet, and mobile. With 60%+ of web traffic from mobile, this is non-negotiable.' },
  { q: 'Will my website be SEO-friendly?', a: 'Yes. We build with clean semantic HTML, optimized page speed, proper meta structure, and schema markup to give your site the best possible foundation for search rankings.' },
  { q: 'What post-launch support do you offer?', a: 'We offer ongoing maintenance packages covering security updates, performance optimization, regular backups, bug fixes, content updates, and 24/7 monitoring.' },
  { q: 'Can you migrate my existing website?', a: 'Yes. We handle full migrations between platforms without data loss, including content, SEO settings, redirects, and user data.' },
];

const stats = [
  { number: '150+',   label: 'Websites Launched'  },
  { number: '99.9%',  label: 'Uptime Guarantee'   },
  { number: '<2s',    label: 'Avg. Load Time'      },
  { number: '6,200+', label: 'Happy Clients'       },
];

const awards = [
  { name: 'Gulf Today',                desc: 'Recognized as top web development company in Dubai, UAE.' },
  { name: 'Clutch',                    desc: 'Acknowledged as one of the top B2B companies for digitization.' },
  { name: 'MEA Business Awards',       desc: 'Best Web Development Agency — Dubai.' },
  { name: 'Shopify Partners',          desc: 'Official Shopify Partner for high-performance e-commerce.' },
  { name: 'Khaleej Times',             desc: 'Featured for Revolutionizing Digital Marketing.' },
  { name: 'Acquisition International', desc: 'Most Client-Focused Web Development Agency — Dubai, UAE.' },
];

const techStack = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
  { name: 'Shopify', icon: SiShopify, color: '#7AB55C' },
  { name: 'Webflow', icon: SiWebflow, color: '#4353FF' },
  { name: 'Framer', icon: SiFramer, color: '#0055FF' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
];

function HeroFullBleed() {
  const gridRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cellH = window.innerHeight / 3;
      const gap = 6;
      const oneRowH = cellH + gap;

      gsap.to(gridRef.current, {
        y: -oneRowH * 4,
        duration: 18,
        repeat: -1,
        ease: 'none',
        modifiers: {
          y: (y) => {
            const val = parseFloat(y) % oneRowH;
            return val + 'px';
          },
        },
      });

      const words = textRef.current.querySelectorAll('.hw');
      gsap.fromTo(words,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.3 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-sub'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.9 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-btns'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );
      gsap.fromTo(textRef.current.querySelector('.hero-stats'),
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.3 }
      );
    });

    return () => ctx.revert();
  }, []);

  const tripled = [...heroImages, ...heroImages, ...heroImages];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#080808',
    }}>
      <style>{`
        .hero-cell {
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          height: calc(100vh / 3);
        }
        .hero-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.32);
          border-radius: 14px;
          pointer-events: none;
        }
        .hero-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .hw { display: inline-block; margin-right: 0.28em; }
        .hw:last-child { margin-right: 0; }
      `}</style>

      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          padding: '6px',
          boxSizing: 'border-box',
          willChange: 'transform',
        }}
      >
        {tripled.map((src, i) => (
          <div key={i} className="hero-cell">
            <img src={src} alt="" loading={i < 100 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          padding: '0 2rem',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(3rem, 7.5vw, 7rem)',
          fontWeight: 800,
          color: WHITE,
          lineHeight: 0.98,
          letterSpacing: '-0.035em',
          marginBottom: '1.5rem',
        }}>
          {['Creating', 'web', 'magic', 'that', 'gets', 'noticed.'].map((w, i) => (
            <span key={i} className="hw">{w}</span>
          ))}
        </h1>

        <p className="hero-sub" style={{
          color: 'rgba(255,255,255,0.72)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.95rem, 1.7vw, 1.2rem)',
          lineHeight: 1.68,
          maxWidth: 580,
          marginBottom: '2.4rem',
          fontWeight: 400,
        }}>
          We don't just develop websites — we create digital experiences that resonate, engage, and convert visitors into loyal customers.
        </p>

        <div className="hero-btns" style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'all' }}>
          <MagneticBtn to="/contact" style={{
            padding: '0.95rem 2.4rem', background: WHITE, color: INK, borderRadius: '50px',
            fontWeight: 700, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center',
            gap: '0.5rem', fontFamily: 'Syne, sans-serif', letterSpacing: '0.01em',
          }}>
            Start Your Project <ArrowUpRight size={16} />
          </MagneticBtn>
          <MagneticBtn to="/works" style={{
            padding: '0.95rem 2.4rem', background: 'rgba(255,255,255,0.08)', color: WHITE,
            border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: '50px', fontWeight: 600,
            fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'Syne, sans-serif', backdropFilter: 'blur(8px)',
          }}>
            View Portfolio <ArrowUpRight size={16} />
          </MagneticBtn>
        </div>

        <div className="hero-stats" style={{ display: 'flex', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: WHITE, lineHeight: 1 }}>{s.number}</div>
              <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.72rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }) {
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);
  const blockRef   = useRef(null);
  const contentRef = useRef(null);
  const imageRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { x: isEven ? -50 : 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: blockRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: blockRef.current, start: 'top 80%', once: true } }
      );
    });
    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={blockRef}
      className="service-block"
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem',
        alignItems: 'center', padding: '6rem 0', borderBottom: `1px solid ${INK10}`,
      }}
    >
      <div ref={contentRef} style={{ order: isEven ? 0 : 1 }}>
        <span style={{
          display: 'inline-block', background: INK, color: WHITE, fontSize: '0.7rem',
          fontWeight: 700, letterSpacing: '0.12em', padding: '0.4rem 1rem', borderRadius: '100px',
          marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif',
        }}>
          {service.badge}
        </span>
        <p style={{ color: PINK, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.75rem', fontFamily: 'Syne, sans-serif' }}>
          {service.label.toUpperCase()}
        </p>
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800,
          color: INK, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em',
        }}>
          {service.heading}
        </h3>
        <p style={{ color: INK60, lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
          {service.desc}
        </p>
        <div>
          {service.points.map((pt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} color={WHITE} />
              </div>
              <span style={{ color: INK, fontSize: '0.95rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{pt}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={imageRef}
        style={{ order: isEven ? 1 : 0, borderRadius: '24px', overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={service.image}
          alt={service.label}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease',
        }} />
      </div>
    </div>
  );
}

function PortfolioCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, delay: index * 0.1, ease: 'back.out(0.4)',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <Link
      ref={cardRef}
      to="/works"
      style={{
        display: 'block', borderRadius: '20px', overflow: 'hidden', background: WHITE,
        border: `1px solid ${INK10}`, textDecoration: 'none', transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.8s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem', background: INK, color: WHITE,
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
          padding: '0.3rem 0.8rem', borderRadius: '100px', fontFamily: 'Syne, sans-serif',
        }}>
          {project.tag}
        </div>
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36,
          background: WHITE, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.3s ease',
        }}>
          <ArrowUpRight size={16} color={INK} />
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <p style={{ color: PINK, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif' }}>
          {project.category}
        </p>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: INK, marginBottom: '0.5rem' }}>
          {project.title}
        </h3>
        <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
          {project.description}
        </p>
        <span style={{ color: INK30, fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>{project.url}</span>
      </div>
    </Link>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.5, ease: 'power2.out', opacity: 1 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power2.in', opacity: 0 });
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: `1px solid ${INK10}`, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '1.75rem 0', background: 'transparent', border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
          fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: INK,
          textAlign: 'left', gap: '2rem',
        }}
      >
        {q}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: `1.5px solid ${isOpen ? PINK : INK30}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <ChevronDown size={16} color={isOpen ? PINK : INK} />
        </div>
      </button>
      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{ color: INK60, lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', paddingBottom: '1.75rem' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

function ImageMosaic() {
  const imgs = [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80',
  ];
  const mosaicRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(mosaicRef.current.children,
        { opacity: 0, y: 30, rotation: -2 },
        {
          opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(0.3)',
          scrollTrigger: { trigger: mosaicRef.current, start: 'top 85%', once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mosaicRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '200px 200px', gap: '8px', borderRadius: '20px', overflow: 'hidden' }}>
      {imgs.map((src, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <img
            src={src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const end = parseInt(target.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const displayValue = target.includes('%') ? `${count}%` : target.includes('<') ? `<${count}s` : `${count}+`;

  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: INK, lineHeight: 1, marginBottom: '0.25rem' }}>
        {displayValue}
      </div>
      <div style={{ color: INK60, fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
    </div>
  );
}

export default function WebDesign() {
  const marqueeRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(marqueeRef.current,
        { x: 0 },
        { x: '-50%', duration: 20, repeat: -1, ease: 'linear' }
      );

      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.utils.toArray('.service-block').forEach(el => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });

      gsap.utils.toArray('.awards-grid > div').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0.9, opacity: 0, rotation: -2 },
          {
            scale: 1, opacity: 1, rotation: 0, duration: 0.5, delay: i * 0.08, ease: 'back.out(0.4)',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      gsap.fromTo('.callback-form',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.callback-form', start: 'top 80%', once: true } }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const marqueeItems = ['Custom Websites', 'E-commerce', 'WordPress', 'Shopify', 'React.js', 'Next.js', 'Webflow', 'Framer', 'Mobile-First Design', 'SEO Optimized'];
  const marqueeDouble = [...marqueeItems, ...marqueeItems];

  return (
    <div style={{ background: WHITE, fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .marquee-track { display:flex; gap:3rem; white-space:nowrap; }
        @media(max-width:900px){
          .service-block{grid-template-columns:1fr!important;gap:2.5rem!important;}
          .two-col{grid-template-columns:1fr!important;}
          .portfolio-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:600px){
          .portfolio-grid{grid-template-columns:1fr!important;}
          .awards-grid{grid-template-columns:1fr!important;}
          .tech-grid-inner{grid-template-columns:repeat(4,1fr)!important;}
        }
      `}</style>

      <HeroFullBleed />

      <div style={{ overflow: 'hidden', padding: '2rem 0', background: INK, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', gap: '3rem', overflow: 'hidden' }}>
          <div ref={marqueeRef} className="marquee-track">
            {marqueeDouble.map((item, i) => (
              <span key={i} style={{
                color: i % 3 === 0 ? PINK : 'rgba(255,255,255,0.5)',
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '3rem',
              }}>
                {item}
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1.2rem' }}>✦</span>
              </span>
            ))}
          </div>
          <div className="marquee-track">
            {marqueeDouble.map((item, i) => (
              <span key={i} style={{
                color: i % 3 === 0 ? PINK : 'rgba(255,255,255,0.5)',
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '3rem',
              }}>
                {item}
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1.2rem' }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section style={{ padding: '7rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div className="reveal-up">
              <p style={{ color: PINK, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>
                WHY WEBSITES MATTER
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: INK, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Elevate Your Business with Custom Tailored Websites
              </h2>
              <p style={{ color: INK60, lineHeight: 1.8, fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', marginBottom: '2rem' }}>
                By understanding our clients' unique value propositions, we ensure that their websites serve as a primary touchpoint for effectively communicating their brand identity to their target audience.
              </p>
              <div>
                {['Custom designs that reflect your brand identity', 'Mobile-responsive layouts that work on all devices', 'SEO-optimized structure for better search rankings', 'Fast loading speeds for improved user experience', 'User-friendly content management systems'].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: PINK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color={WHITE} />
                    </div>
                    <span style={{ color: INK60, fontSize: '0.95rem', fontFamily: 'DM Sans, sans-serif' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-up" style={{ borderRadius: '28px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img
                src="/web1.avif"
                alt="Web Design"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up" style={{ marginBottom: '1rem' }}>
            <p style={{ color: PINK, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', fontFamily: 'Syne, sans-serif' }}>WHAT WE OFFER</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="reveal-up" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 520 }}>
              Our Website Development Services
            </h2>
            <p className="reveal-up" style={{ color: INK60, maxWidth: 380, lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}>
              As a leading web development company, we help brands create scalable and interactive websites that align with their business objectives.
            </p>
          </div>
          {services.map((service, i) => (
            <ServiceBlock key={i} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* <section style={{ padding: '7rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ color: PINK, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>OUR PORTFOLIO</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Work That Speaks for Itself
            </h2>
            <p style={{ color: INK60, maxWidth: 560, margin: '0 auto', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7 }}>
              Whether e-commerce, corporate, or custom applications — our team delivers scalable, user-friendly websites tailored to your business needs.
            </p>
          </div>
          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {portfolioProjects.map((project, i) => (
              <PortfolioCard key={i} project={project} index={i} />
            ))}
          </div>
          <div className="reveal-up" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <MagneticBtn to="/works" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2.2rem', background: INK, color: WHITE, borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}>
              View All Projects <ArrowUpRight size={17} />
            </MagneticBtn>
          </div>
        </div>
      </section> */}

<section
  style={{
    padding: '7rem 0',
    background: INK,
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div
    style={{
      position: 'absolute',
      width: 600,
      height: 600,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${PINK_LIGHT} 0%, transparent 70%)`,
      top: '-20%',
      right: '-10%',
      pointerEvents: 'none'
    }}
  />

  <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center'
      }}
    >
      {/* Left */}
      <div>
        <p
          style={{
            color: PINK,
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
            marginBottom: '1rem',
            fontFamily: 'Syne, sans-serif'
          }}
        >
          TECHNOLOGIES WE USE
        </p>

        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}
        >
          Modern Tech Stack for Modern Businesses
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.8,
            fontFamily: 'DM Sans, sans-serif',
            marginBottom: '3rem'
          }}
        >
          We choose the best technology for your project — from no-code tools to full-stack custom development.
        </p>

        {/* Tech Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem'
          }}
        >
          {techStack.map((tech, i) => {
            const Icon = tech.icon;

            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '1rem 0.75rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = PINK_LIGHT;
                  e.currentTarget.style.borderColor = PINK;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ marginBottom: '0.4rem' }}>
                  <Icon size={26} color={tech.color} />
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.7rem',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600
                  }}
                >
                  {tech.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right */}
      <div>
        <ImageMosaic />
      </div>
    </div>
  </div>
</section>


      <section style={{ padding: '7rem 0', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ color: PINK, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>OUR RECOGNITIONS</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>
              Awards & Achievements
            </h2>
            <p style={{ color: INK60, maxWidth: 500, margin: '1rem auto 0', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7 }}>
              Our exceptional team of award-winning experts is the secret behind our success in delivering websites that drive sales.
            </p>
          </div>
          <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {awards.map((award, i) => (
              <div key={i} className="reveal-up" style={{
                background: WHITE, border: `1px solid ${INK10}`, borderRadius: '20px', padding: '2rem', transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = PINK; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 35px -12px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = INK10; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: 40, height: 40, background: PINK, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.2rem' }}>🏆</div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: INK, marginBottom: '0.5rem' }}>{award.name}</h4>
                <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>{award.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 2rem' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'start' }}>
            <div className="reveal-up">
              <p style={{ color: PINK, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>FAQs</p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: INK60, lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif' }}>
                Everything you need to know about our web design & development services. Can't find an answer? Reach out to us.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <MagneticBtn to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2rem', background: INK, color: WHITE, borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Syne, sans-serif' }}>
                  Ask Us Anything <ArrowUpRight size={16} />
                </MagneticBtn>
              </div>
            </div>
            <div className="reveal-up">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openFAQ === i} onToggle={() => setOpenFAQ(openFAQ === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
  style={{
    padding: '7rem 0',
    background: INK,
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `radial-gradient(circle at 30% 50%, ${PINK_LIGHT} 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 50%)`,
      pointerEvents: 'none'
    }}
  />

  <div
    style={{
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2,
      textAlign: 'center'
    }}
  >
    <h2
      style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
        fontWeight: 800,
        color: WHITE,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        marginBottom: '1.5rem'
      }}
    >
      Have a project in mind? 👋
    </h2>

    <p
      style={{
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8,
        fontFamily: 'DM Sans, sans-serif',
        marginBottom: '2.5rem',
        maxWidth: 600,
        marginInline: 'auto'
      }}
    >
      Connect with our team of designers and developers. Let's craft something extraordinary together.
    </p>

    <MagneticBtn
      to="/contact"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '1.1rem 2.8rem',
        background: PINK,
        color: WHITE,
        borderRadius: '50px',
        fontWeight: 700,
        fontSize: '1rem',
        fontFamily: 'Syne, sans-serif'
      }}
    >
      Let's Collaborate <ArrowUpRight size={18} />
    </MagneticBtn>
  </div>
</section>
    </div>
  );
}