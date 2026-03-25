import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import FloatingOrbs from '../components/Floatingorbs';
import StatsSection from '../components/Statssection';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/Ctabanner';
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

const marqueeItems = [
  { name: 'Social Media Marketing', icon: '📱', color: '#B2278C' },
  { name: 'Logo & Brand Identity', icon: '✦', color: '#185EA7' },
  { name: 'Website Development', icon: '🌐', color: '#814B97' },
  { name: 'Google & Meta Ads', icon: '🎯', color: '#B2278C' },
  { name: 'NFC Business Cards', icon: '📲', color: '#185EA7' },
  { name: 'SEO Optimisation', icon: '🔍', color: '#814B97' },
  { name: 'Graphic Design', icon: '🎨', color: '#B2278C' },
  { name: 'Email Marketing', icon: '📧', color: '#185EA7' },
];

const processSteps = [
  {
    step: '01',
    title: 'Discover & Plan',
    desc: 'We deep-dive into your brand, audience, and goals to build a tailored digital strategy that drives real results.',
    icon: '🔍',
    color: '#B2278C',
  },
  {
    step: '02',
    title: 'Design & Build',
    desc: 'From stunning visuals to high-performing websites and ad creatives — we build assets that convert.',
    icon: '⚡',
    color: '#185EA7',
  },
  {
    step: '03',
    title: 'Launch & Grow',
    desc: 'We run your campaigns, optimise continuously, and scale what works across every channel.',
    icon: '📈',
    color: '#814B97',
  },
  {
    step: '04',
    title: 'Report & Refine',
    desc: 'Full transparency with data-backed reporting and constant iteration to keep your growth compounding.',
    icon: '🔄',
    color: '#B2278C',
  },
];

const whyUs = [
  {
    icon: '🏆',
    title: 'All-in-One Digital Partner',
    desc: 'Marketing, design, development & NFC solutions — everything in one place.',
    color: '#B2278C',
  },
  {
    icon: '📈',
    title: 'Results-Focused Strategy',
    desc: 'We focus on leads, sales and business growth — not just design.',
    color: '#185EA7',
  },
  {
    icon: '⚙️',
    title: 'Custom Solutions',
    desc: 'Every business is different. We create strategies tailored to your brand.',
    color: '#814B97',
  },
  {
    icon: '🚀',
    title: 'Modern & Innovative',
    desc: 'We use the latest tools, AI systems and smart technologies.',
    color: '#B2278C',
  },
  {
    icon: '🤝',
    title: 'Personal Support',
    desc: 'Direct communication. Fast response. Real partnership.',
    color: '#185EA7',
  },
];

const nfcSection = {
  headline: 'Smart NFC Digital Business Card',
  subhead: 'One Tap. Instant Connection.',
  description: 'Share your contact, website, social media, and portfolio instantly with just one tap.',
  uses: [
    { icon: '👤', title: 'Share Contact Details', desc: 'VCard + phone number' },
    { icon: '🌐', title: 'Open Website or Portfolio', desc: 'Instant access' },
    { icon: '📱', title: 'Social Media Links', desc: 'All platforms' },
    { icon: '💬', title: 'WhatsApp Direct Chat', desc: 'Start conversation' },
  ],
  design: {
    title: 'Fully Custom Designed & Printed',
    desc: 'Premium materials. Custom branding. NFC integrated.',
  },
  image: '/nfc.avif',
};

const allServices = [
  {
    title: 'NFC Solutions',
    bgImage: '/nfchom.avif',
    color: '#814B97',
    link: '/services/nfc-solutions'
  },
  {
    title: 'Website Design & Development',
    bgImage: '/web.avif',
    color: '#B2278C',
    link: '/services/website-development'
  },
  {
    title: 'Social Media Marketing',
    bgImage: '/social.avif',
    color: '#185EA7',
    link: '/services/social-media'
  },
  {
    title: ' SEO & Google Ads',
    bgImage: '/seo.avif',
    color: '#814B97',
    link: '/services/seo'
  },
  {
    title: 'Branding & Graphic Design',
    bgImage: '/brand.avif',
    color: '#B2278C',
    link: '/services/photography'
  },
  {
    title: 'Logo Designing',
    bgImage: '/logo.avif',
    color: '#185EA7',
    link: '/services/'
  },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

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
          src={service.bgImage}
          alt={service.title}
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
            {service.title}
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
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.78rem',
            fontWeight: 500,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.35s ease 0.05s',
          }}>
            Explore service →
          </p>
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

function WorkCard({ work }) {
  const colorRgb = {
    '#B2278C': '178,39,140',
    '#185EA7': '24,94,167',
    '#814B97': '129,75,151',
  };
  const rgb = colorRgb[work.color] || '178,39,140';
  const [imgErr, setImgErr] = useState(false);
  
  const getImageUrl = () => {
    if (work.featuredImage?.url) return work.featuredImage.url;
    if (work.image) return work.image;
    return null;
  };
  
  const imageUrl = getImageUrl();
  
  const safeWork = {
    ...work,
    tags: Array.isArray(work?.tags) ? work.tags : [],
    desc: work?.desc || '',
    title: work?.title || '',
    subtitle: work?.subtitle || '',
    result: work?.result || '',
    resultLabel: work?.resultLabel || '',
    category: work?.category || '',
    color: work?.color || '#B2278C',
    _id: work?._id || work?.id || '',
    image: imageUrl
  };

  return (
    <Link
      to={`/works/${safeWork._id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.45)`;
        e.currentTarget.style.transform = 'translateY(-7px)';
        e.currentTarget.style.boxShadow = `0 28px 64px rgba(${rgb},0.18)`;
        const im = e.currentTarget.querySelector('.cim');
        if (im) im.style.transform = 'scale(1.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const im = e.currentTarget.querySelector('.cim');
        if (im) im.style.transform = 'scale(1)';
      }}
    >
      <div style={{ position: 'relative', height: 240, overflow: 'hidden', background: `rgba(${rgb},0.08)`, flexShrink: 0 }}>
        {!imgErr && safeWork.image ? (
          <img
            className="cim"
            src={safeWork.image}
            alt={safeWork.title}
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, rgba(${rgb},0.2), rgba(${rgb},0.04))`,
              fontSize: '3.5rem',
            }}
          >
            📷
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: 1.3,
          }}
        >
          {safeWork.title}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            padding: '0.28rem 0.8rem',
            borderRadius: '50px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.82rem',
            color: safeWork.color,
          }}
        >
          {safeWork.result}
        </span>
      </div>

      <div style={{ padding: '1.35rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          {safeWork.tags.slice(0, 3).map((tag, ti) => (
            <span
              key={`${safeWork._id}-tag-${ti}`}
              style={{
                padding: '0.22rem 0.65rem',
                borderRadius: '50px',
                fontSize: '0.67rem',
                fontWeight: 600,
                background: `rgba(${rgb},0.1)`,
                color: safeWork.color,
                border: `1px solid rgba(${rgb},0.22)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p style={{ color: '#555', fontSize: '0.73rem', marginBottom: '0.65rem', fontWeight: 500 }}>{safeWork.subtitle}</p>
        <p style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
          {safeWork.desc.length > 100 ? safeWork.desc.slice(0, 100) + '…' : safeWork.desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.9rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: safeWork.color, lineHeight: 1 }}>{safeWork.result}</div>
            <div style={{ color: '#4a4a4a', fontSize: '0.65rem', marginTop: '0.15rem', fontWeight: 500 }}>{safeWork.resultLabel}</div>
          </div>
          <span style={{ color: safeWork.color, fontSize: '0.88rem', fontWeight: 700 }}>Details →</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const marqueeRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const sliderRef = useRef(null);
  const [recentWorks, setRecentWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const fetchRecentWorks = useCallback(async () => {
    try {
      const data = await api.get('/works', { params: { limit: 6 } });
      const worksList = Array.isArray(data?.works) ? data.works : Array.isArray(data) ? data : [];
      const safeWorks = worksList.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        image: item.featuredImage?.url || item.image || null,
        _id: item._id || item.id,
        color: item.color || '#B2278C'
      }));
      setRecentWorks(safeWorks.slice(0, 6));
    } catch (err) {
      console.error('Failed to fetch works:', err);
      setRecentWorks([]);
    } finally {
      setLoadingWorks(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentWorks();

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

    gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    gsap.utils.toArray('.process-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(0.4)',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          delay: i * 0.1,
        }
      );
    });

    gsap.utils.toArray('.work-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: (i % 3) * 0.1,
        }
      );
    });

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
  }, [fetchRecentWorks]);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes wshimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        
        .work-card {
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .process-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .process-card:hover {
          transform: translateY(-8px);
          border-color: #B2278C !important;
        }
        
        .why-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(178,39,140,0.5) !important;
          background: rgba(178,39,140,0.08) !important;
        }
        
        .nfc-card {
          transition: all 0.3s ease;
        }
        
        .nfc-card:hover {
          transform: translateY(-4px);
          border-color: #B2278C !important;
          background: rgba(178,39,140,0.1) !important;
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
        
        .service-card {
          width: 379px;
          height: 466px;
          flex-shrink: 0;
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: #0a0a0a;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
        }
        
        .service-card:hover .service-bg {
          transform: scale(1.08);
        }
        
        .service-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }
        
        .service-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        .service-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        
        .services-grid-desktop {
          display: grid;
          grid-template-columns: repeat(3, 379px);
          gap: 2rem;
          justify-content: center;
        }
        
        .services-slider {
          display: none;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 1.5rem;
          padding-bottom: 1rem;
          cursor: grab;
          scrollbar-width: none;
        }
        
        .services-slider:active {
          cursor: grabbing;
        }
        
        .services-slider::-webkit-scrollbar {
          display: none;
        }
        
        .slider-item {
          scroll-snap-align: start;
          flex-shrink: 0;
        }
        
        .stats-container {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          color: #B2278C;
          line-height: 1;
        }
        
        .stat-label {
          color: #888;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
        
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        @media (max-width: 1200px) {
          .services-grid-desktop {
            grid-template-columns: repeat(3, minmax(300px, 379px));
            gap: 1.5rem;
          }
          .service-card {
            width: 100%;
            max-width: 379px;
            height: 466px;
          }
          .container {
            padding: 0 1.5rem;
          }
        }
        
        @media (max-width: 1024px) {
          .services-grid-desktop {
            display: none;
          }
          .services-slider {
            display: flex;
          }
          .service-card {
            width: 300px;
            height: 380px;
          }
          .works-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        @media (max-width: 768px) {
          .works-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .nfc-grid { grid-template-columns: 1fr !important; text-align: center; }
          .uses-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-badge-text { font-size: 0.8rem !important; }
          .stats-container { gap: 2rem; }
          .service-card {
            width: 280px;
            height: 360px;
          }
          .service-title {
            font-size: 1.4rem;
          }
          .service-icon {
            font-size: 3rem;
          }
          .container {
            padding: 0 1rem;
          }
          section {
            padding: 4rem 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .uses-grid { grid-template-columns: 1fr !important; }
          .works-grid { grid-template-columns: 1fr !important; }
          .service-card {
            width: 260px;
            height: 340px;
          }
          .container {
            padding: 0 0.75rem;
          }
          section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FloatingOrbs />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '100px' }}>
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
              <span className="hero-badge-text" style={{ color: '#e0e0e0', fontSize: '0.9rem', fontWeight: 500 }}>
                ✨ Trusted by 15+ UAE Brands ✨
              </span>
            </div>

            <h1
              ref={headlineRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 5.8rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: '1.5rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              We Build Systems That <span className="glow-text">Grow Your Revenue</span>
            </h1>

            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: '#b0b0b0',
                maxWidth: 600,
                margin: '0 auto 0.75rem',
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Performance Marketing + Funnels for UAE Businesses
            </p>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                color: '#888',
                maxWidth: 560,
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              From social media and paid ads to stunning websites and NFC smart cards — Media Mind Digital delivers creative solutions that make your brand impossible to ignore.
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link
                to="/contact"
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
                }}
              >
                Book Free Growth Call <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
              <Link
                to="/works"
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
                }}
              >
                View Our Work
              </Link>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">700+</div>
                <div className="stat-label">Satisfied Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">AED 500K+</div>
                <div className="stat-label">ROI Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            padding: '1.25rem 0',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(178,39,140,0.3)',
          }}
        >
          <div ref={marqueeRef} style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'fit-content' }}>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={`marquee-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: item.color, fontSize: '1rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#e0e0e0', letterSpacing: '0.02em' }}>{item.name}</span>
                <span style={{ color: '#B2278C', fontSize: '0.6rem', marginLeft: '0.5rem' }}>●</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1rem', color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              OUR SERVICES
            </p>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
              What We <span style={{ color: '#B2278C' }}>Offer</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid-desktop">
            {allServices.slice(0, 3).map((service, i) => (
              <ServiceCard key={`service-${i}`} service={service} />
            ))}
          </div>

          <div className="services-grid-desktop" style={{ marginTop: '2rem' }}>
            {allServices.slice(3, 6).map((service, i) => (
              <ServiceCard key={`service-${i+3}`} service={service} />
            ))}
          </div>

          <div
            ref={sliderRef}
            className="services-slider"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              display: 'none',
              overflowX: 'auto',
              gap: '1.5rem',
              padding: '0.5rem 0 1.5rem 0',
            }}
          >
            {allServices.map((service, i) => (
              <div key={`slider-service-${i}`} className="slider-item">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(178,39,140,0.2)';
                e.currentTarget.style.borderColor = '#B2278C';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View All Services <span style={{ fontSize: '1.2rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1rem', color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              RECENT WORK
            </p>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
              Latest <span style={{ color: '#B2278C' }}>Projects</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>
              Real results for real businesses across Dubai
            </p>
          </div>

          {loadingWorks ? (
            <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.8rem' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={`skeleton-${i}`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
                  <div style={{ height: 240, background: 'rgba(255,255,255,0.05)', animation: 'wshimmer 1.5s infinite' }} />
                  <div style={{ padding: '1.5rem' }}>
                    {[80, 60, 100, 70].map((w, idx) => (
                      <div
                        key={`skeleton-bar-${i}-${idx}`}
                        style={{
                          height: idx === 1 ? 18 : 12,
                          width: `${w}%`,
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.06)',
                          marginBottom: idx === 3 ? 0 : '0.85rem',
                          animation: 'wshimmer 1.5s infinite',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : recentWorks.length > 0 ? (
            <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.8rem' }}>
              {recentWorks.map(work => (
                <div key={work.id} className="work-animate">
                  <WorkCard work={work} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: '#666' }}>No projects available.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 2rem',
                background: 'rgba(178,39,140,0.1)',
                border: '1px solid rgba(178,39,140,0.4)',
                borderRadius: '50px',
                color: '#B2278C',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
            >
              View All Projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ marginBottom: '1rem', color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              HOW WE WORK
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>
              Our proven <span style={{ color: '#B2278C' }}>process</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>A systematic approach to deliver measurable results every time</p>
          </div>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative' }}>
            {processSteps.map((p, i) => (
              <div
                key={`process-${i}`}
                className="process-card"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '28px',
                  padding: '2rem',
                  position: 'relative',
                  zIndex: 1,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                  }}
                />

                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '24px',
                    background: `linear-gradient(135deg, ${p.color}25, transparent)`,
                    border: `1px solid ${p.color}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.2rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {p.icon}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: p.color,
                    marginBottom: '0.5rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  STEP {p.step}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#ffffff',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>{p.desc}</p>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '-0.5rem',
                    right: '1rem',
                    fontSize: '6rem',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.02)',
                    fontFamily: 'var(--font-display)',
                    pointerEvents: 'none',
                    lineHeight: 1,
                  }}
                >
                  {p.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ marginBottom: '1rem', color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              WHY CHOOSE US
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>
              Your all-in-one <span style={{ color: '#B2278C' }}>digital partner</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto' }}>We combine creativity, strategy, and technology to drive real growth</p>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
            {whyUs.map((w, i) => (
              <div
                key={`why-${i}`}
                className="why-card"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '24px',
                  padding: '2rem 1.5rem',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${w.color}66, transparent)`,
                  }}
                />
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{w.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}
                >
                  {w.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'transparent' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
              borderRadius: '40px',
              padding: '3.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(178,39,140,0.3)',
            }}
            className="nfc-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.2rem',
                  background: 'rgba(178,39,140,0.15)',
                  borderRadius: '50px',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(178,39,140,0.3)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>📲</span>
                <span style={{ color: '#B2278C', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>NFC TECHNOLOGY</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#ffffff',
                  marginBottom: '1rem',
                }}
              >
                {nfcSection.headline}
              </h2>
              <p style={{ color: '#B2278C', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>{nfcSection.subhead}</p>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{nfcSection.description}</p>

              <div className="uses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {nfcSection.uses.map((use, i) => (
                  <div
                    key={`nfc-use-${i}`}
                    className="nfc-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 1.25rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{use.icon}</span>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{use.title}</div>
                      <div style={{ color: '#666', fontSize: '0.7rem' }}>{use.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(178,39,140,0.12), rgba(24,94,167,0.08))',
                  borderRadius: '20px',
                  border: '1px solid rgba(178,39,140,0.3)',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#B2278C', marginBottom: '0.5rem', fontSize: '1rem' }}>{nfcSection.design.title}</div>
                <p style={{ color: '#888', fontSize: '0.85rem' }}>{nfcSection.design.desc}</p>
              </div>

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
                }}
              >
                Get Your NFC Card <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                height: '500px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={nfcSection.image}
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
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                }}
              >
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>Tap. Share. Connect.</div>
                <div style={{ color: '#B2278C', fontSize: '0.85rem', marginTop: '0.25rem' }}>One tap is all it takes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <CTABanner />

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
          <span style={{ color: '#ffffff', fontWeight: 500 }}>Based in Dubai · Available Worldwide</span>
        </div>
      </div>
    </>
  );
}