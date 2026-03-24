import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import FloatingOrbs from '../components/Floatingorbs';
import CTABanner from '../components/Ctabanner';
import baseurl from '../../base/Base';

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(new Error(err.response?.data?.message || err.message || 'Request failed'))
);

const FALLBACK_WORKS = [
  {
    _id: 'social-brand-launch',
    id: 'social-brand-launch',
    category: 'Social Media Creatives',
    title: 'Multi-Platform Brand Launch',
    subtitle: 'Instagram · Facebook · TikTok',
    desc: 'Built an end-to-end social presence for a Dubai lifestyle brand — content strategy, reels, paid promotion and community management.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    result: '3.2x ROAS',
    resultLabel: 'Return on Ad Spend',
    color: '#B2278C',
    tags: ['Strategy', 'Content', 'Paid Social'],
  },
  {
    _id: 'restaurant-social',
    id: 'restaurant-social',
    category: 'Social Media Creatives',
    title: 'F&B Restaurant Social Growth',
    subtitle: 'Instagram · Facebook',
    desc: 'Grew a Dubai restaurant from 800 to 18,000 followers in 4 months through consistent creative content and targeted paid boosting.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    result: '22x',
    resultLabel: 'Follower Growth',
    color: '#B2278C',
    tags: ['Content', 'Community', 'Growth'],
  },
  {
    _id: 'ecommerce-social',
    id: 'ecommerce-social',
    category: 'Social Media Creatives',
    title: 'E-Commerce Social Ads',
    subtitle: 'Meta · Snapchat',
    desc: 'Managed ongoing social ad creatives and strategy for a fashion e-commerce brand targeting UAE and GCC audiences.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    result: '41%',
    resultLabel: 'Lower CPA',
    color: '#B2278C',
    tags: ['Paid Social', 'Creative', 'E-comm'],
  },
  {
    _id: 'luxury-brand-identity',
    id: 'luxury-brand-identity',
    category: 'Branding & Design',
    title: 'Luxury Hospitality Brand Identity',
    subtitle: 'Full Brand System',
    desc: 'Complete visual identity for a high-end Dubai hospitality company — logo, color palette, typography, stationery, and brand guidelines.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    result: 'Full System',
    resultLabel: 'Brand Deliverables',
    color: '#185EA7',
    tags: ['Logo', 'Guidelines', 'Print'],
  },
  {
    _id: 'startup-identity',
    id: 'startup-identity',
    category: 'Branding & Design',
    title: 'Tech Startup Identity',
    subtitle: 'Logo + Digital Brand',
    desc: 'Modern brand identity for a SaaS startup — minimal logo mark, icon set, color system and digital usage guidelines.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    result: '48hrs',
    resultLabel: 'Express Delivery',
    color: '#185EA7',
    tags: ['Logo', 'Digital', 'Icons'],
  },
  {
    _id: 'salon-branding',
    id: 'salon-branding',
    category: 'Branding & Design',
    title: 'Beauty Salon Brand Refresh',
    subtitle: 'Rebrand Project',
    desc: 'Full rebrand for an established Dubai salon — new logo, brand colors, signage design and social media templates.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    result: '100%',
    resultLabel: 'Client Satisfaction',
    color: '#185EA7',
    tags: ['Rebrand', 'Signage', 'Templates'],
  },
  {
    _id: 'event-posters',
    id: 'event-posters',
    category: 'Branding & Design',
    title: 'Event & Promotional Posters',
    subtitle: 'Print & Digital',
    desc: 'Series of high-impact event posters and digital ads for Dubai nightlife, exhibitions and corporate events.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    result: '500+',
    resultLabel: 'Designs Delivered',
    color: '#814B97',
    tags: ['Posters', 'Events', 'Print'],
  },
  {
    _id: 'ad-banners',
    id: 'ad-banners',
    category: 'Branding & Design',
    title: 'Digital Ad Banner Suite',
    subtitle: 'GDN · Social · Display',
    desc: 'Complete set of ad banners in all standard sizes for Google Display Network and social platforms — animated and static.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    result: 'All Sizes',
    resultLabel: 'Formats Covered',
    color: '#814B97',
    tags: ['Banners', 'Animated', 'GDN'],
  },
  {
    _id: 'corporate-materials',
    id: 'corporate-materials',
    category: 'Branding & Design',
    title: 'Corporate Marketing Materials',
    subtitle: 'Brochures · Flyers · Profiles',
    desc: 'Professional company profiles, brochures and marketing kits for real estate, legal and finance clients in Dubai.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    result: '50+',
    resultLabel: 'Corporate Clients',
    color: '#814B97',
    tags: ['Print', 'Corporate', 'Profiles'],
  },
  {
    _id: 'real-estate-website',
    id: 'real-estate-website',
    category: 'Websites',
    title: 'Real Estate Agency Website',
    subtitle: 'React + CMS',
    desc: 'Custom real estate website with property listings, agent profiles, search filters and CRM integration for a Dubai agency.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    result: 'Top 3',
    resultLabel: 'Google Ranking',
    color: '#B2278C',
    tags: ['React', 'CMS', 'SEO'],
  },
  {
    _id: 'restaurant-website',
    id: 'restaurant-website',
    category: 'Websites',
    title: 'Restaurant & Cafe Websites',
    subtitle: 'WordPress · Custom',
    desc: 'Fast, mobile-first websites for F&B businesses featuring menus, online reservations and WhatsApp ordering integration.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    result: '40+',
    resultLabel: 'Sites Built',
    color: '#B2278C',
    tags: ['WordPress', 'Mobile', 'Booking'],
  },
  {
    _id: 'ecommerce-store',
    id: 'ecommerce-store',
    category: 'Websites',
    title: 'E-Commerce Store Build',
    subtitle: 'Shopify · WooCommerce',
    desc: 'Full e-commerce builds with product pages, payment gateway integration, inventory management and conversion optimisation.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    result: '2.8x',
    resultLabel: 'Conversion Boost',
    color: '#B2278C',
    tags: ['Shopify', 'WooCommerce', 'CRO'],
  },
  {
    _id: 'google-ads-retail',
    id: 'google-ads-retail',
    category: 'Performance Marketing',
    title: 'Google Ads for Retail Brand',
    subtitle: 'Search · Shopping · Display',
    desc: 'Managed full Google Ads account for a Dubai retail brand — search, shopping and display campaigns across UAE and KSA.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    result: 'AED 800K',
    resultLabel: 'Revenue Generated',
    color: '#185EA7',
    tags: ['Google Ads', 'Shopping', 'Search'],
  },
  {
    _id: 'meta-lead-gen',
    id: 'meta-lead-gen',
    category: 'Social Media Creatives',
    title: 'Meta Lead Gen for Real Estate',
    subtitle: 'Facebook · Instagram Ads',
    desc: 'High-volume lead generation campaigns for real estate developers targeting investors and end-users across UAE.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    result: '1,200+',
    resultLabel: 'Qualified Leads',
    color: '#185EA7',
    tags: ['Meta Ads', 'Lead Gen', 'Real Estate'],
  },
  {
    _id: 'seo-local',
    id: 'seo-local',
    category: 'SEO',
    title: 'Local SEO for Dubai Businesses',
    subtitle: 'Google My Business · On-Page',
    desc: 'Full local SEO campaigns for clinics, restaurants and service businesses — ranking page 1 for high-intent Dubai keywords.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80',
    result: 'Page 1',
    resultLabel: 'Google Rankings',
    color: '#814B97',
    tags: ['Local SEO', 'GMB', 'On-Page'],
  },
  {
    _id: 'nfc-professional',
    id: 'nfc-professional',
    category: 'NFC Digital Cards',
    title: 'Professional NFC Card Setup',
    subtitle: 'Design · Program · Deploy',
    desc: 'Custom-designed NFC business cards — tap to share contact, WhatsApp, portfolio and social media instantly.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&q=80',
    result: '200+',
    resultLabel: 'Cards Delivered',
    color: '#814B97',
    tags: ['NFC Card', 'Digital Profile', 'WhatsApp'],
  },
  {
    _id: 'nfc-corporate',
    id: 'nfc-corporate',
    category: 'NFC Digital Cards',
    title: 'Corporate NFC Card Programme',
    subtitle: 'Team · Bulk · Branded',
    desc: 'Branded NFC card programme for a Dubai consultancy — custom design, programming and digital landing pages for all team members.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80' },
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
    result: '50+',
    resultLabel: 'Team Members',
    color: '#814B97',
    tags: ['Corporate', 'Bulk', 'Landing Page'],
  },
];

const CATEGORIES = [
  'All',
  'Websites',
  'Branding & Design',
  'Social Media Creatives',
  'NFC Digital Cards',
  'Performance Marketing',
  'SEO',
];

const colorRgb = {
  '#B2278C': '178,39,140',
  '#185EA7': '24,94,167',
  '#814B97': '129,75,151',
};

function SkeletonCard() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
      <div style={{ height: 220, background: 'rgba(255,255,255,0.05)', animation: 'wshimmer 1.5s infinite' }} />
      <div style={{ padding: '1.5rem' }}>
        {[80, 60, 100, 70].map((w, i) => (
          <div key={i} style={{ height: i === 1 ? 18 : 12, width: `${w}%`, borderRadius: 6, background: 'rgba(255,255,255,0.06)', marginBottom: i === 3 ? 0 : '0.85rem', animation: 'wshimmer 1.5s infinite', animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work }) {
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
      style={{ display: 'block', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden', position: 'relative', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${rgb},0.45)`;
        e.currentTarget.style.transform = 'translateY(-7px)';
        e.currentTarget.style.boxShadow = `0 28px 64px rgba(${rgb},0.18)`;
        const ov = e.currentTarget.querySelector('.cov'); if (ov) ov.style.opacity = '1';
        const im = e.currentTarget.querySelector('.cim'); if (im) im.style.transform = 'scale(1.06)';
        const ar = e.currentTarget.querySelector('.car'); if (ar) { ar.style.opacity = '1'; ar.style.transform = 'translateX(0)'; }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const ov = e.currentTarget.querySelector('.cov'); if (ov) ov.style.opacity = '0';
        const im = e.currentTarget.querySelector('.cim'); if (im) im.style.transform = 'scale(1)';
        const ar = e.currentTarget.querySelector('.car'); if (ar) { ar.style.opacity = '0'; ar.style.transform = 'translateX(-6px)'; }
      }}
    >
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: `rgba(${rgb},0.08)`, flexShrink: 0 }}>
        {!imgErr && safeWork.image
          ? <img className="cim" src={safeWork.image} alt={safeWork.title} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, rgba(${rgb},0.2), rgba(${rgb},0.04))`, fontSize: '3.5rem' }}>📷</div>
        }
        <div className="cov" style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, rgba(${rgb},0.78), rgba(0,0,0,0.55))`, opacity: 0, transition: 'opacity 0.35s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ padding: '0.55rem 1.5rem', border: '2px solid rgba(255,255,255,0.9)', borderRadius: '50px', color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em', backdropFilter: 'blur(4px)' }}>
            View Project →
          </span>
        </div>
        <span style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', padding: '0.28rem 0.8rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', color: safeWork.color, border: `1px solid rgba(${rgb},0.45)` }}>
          {safeWork.category}
        </span>
        <span style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', padding: '0.28rem 0.8rem', borderRadius: '50px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.82rem', color: safeWork.color }}>
          {safeWork.result}
        </span>
      </div>

      <div style={{ padding: '1.35rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          {safeWork.tags.slice(0, 3).map((tag, ti) => (
            <span key={`${safeWork._id}-tag-${ti}`} style={{ padding: '0.22rem 0.65rem', borderRadius: '50px', fontSize: '0.67rem', fontWeight: 600, background: `rgba(${rgb},0.1)`, color: safeWork.color, border: `1px solid rgba(${rgb},0.22)` }}>
              {tag}
            </span>
          ))}
        </div>
        <h3 style={{ color: '#f0f0f0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem', lineHeight: 1.3 }}>
          {safeWork.title}
        </h3>
        <p style={{ color: '#555', fontSize: '0.73rem', marginBottom: '0.65rem', fontWeight: 500 }}>
          {safeWork.subtitle}
        </p>
        <p style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
          {safeWork.desc.length > 115 ? safeWork.desc.slice(0, 115) + '…' : safeWork.desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.9rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: safeWork.color, lineHeight: 1 }}>{safeWork.result}</div>
            <div style={{ color: '#4a4a4a', fontSize: '0.65rem', marginTop: '0.15rem', fontWeight: 500 }}>{safeWork.resultLabel}</div>
          </div>
          <span className="car" style={{ color: safeWork.color, fontSize: '0.88rem', fontWeight: 700, opacity: 0, transform: 'translateX(-6px)', transition: 'all 0.3s' }}>
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Works() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorks = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const params = category !== 'All' ? { category } : {};
      const data = await api.get('/works', { params });
      const list = Array.isArray(data?.works) ? data.works : Array.isArray(data) ? data : [];
      const safeList = list.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        services: Array.isArray(item.services) ? item.services : [],
        deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
        metrics: Array.isArray(item.metrics) ? item.metrics : [],
        gallery: Array.isArray(item.gallery) ? item.gallery : [],
        featuredImage: item.featuredImage || null,
        image: item.featuredImage?.url || item.image || null,
        _id: item._id || item.id,
      }));
      setWorks(safeList);
    } catch (err) {
      const filtered = category === 'All' ? FALLBACK_WORKS : FALLBACK_WORKS.filter(w => w.category === category);
      setWorks(filtered);
      setError('Showing cached projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    fetchWorks(activeCategory);
  }, [activeCategory, fetchWorks]);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(gridRef.current.querySelectorAll('.work-animate'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
      );
    }
  }, [works, loading]);

  return (
    <div>
      <style>{`
        @keyframes wshimmer { 0%,100%{opacity:.4} 50%{opacity:.85} }
        .fscroll::-webkit-scrollbar { display:none; }
        @media (max-width:1024px) { .wgrid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:600px)  { .wgrid { grid-template-columns:1fr !important; } }
      `}</style>

      <section style={{ minHeight: '52vh', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrbs count={4} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'radial-gradient(ellipse at top right, rgba(178,39,140,0.07), transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', background: 'rgba(178,39,140,0.08)', border: '1px solid rgba(178,39,140,0.3)', borderRadius: '50px', marginBottom: '1.5rem' }}>
              <span style={{ color: '#B2278C', fontSize: '0.7rem' }}>✦</span>
              <span style={{ color: '#B2278C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Our Portfolio</span>
            </div>
            <h1 className="section-title" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              Work that <span style={{ color: '#B2278C' }}>delivers</span>
            </h1>
            <p style={{ color: '#888', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 560, marginBottom: '2.5rem' }}>
              Design, marketing & digital solutions we've delivered for businesses in Dubai and worldwide.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[['17+', 'Projects'], ['6', 'Categories'], ['50+', 'Happy Clients']].map(([n, l], i) => (
                <div key={`stat-${i}`}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#B2278C', lineHeight: 1 }}>{n}</div>
                  <div style={{ color: '#555', fontSize: '0.78rem', marginTop: '0.2rem', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 2.5rem' }}>
        <div className="container">
          <div className="fscroll" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '0.5rem 1.2rem', borderRadius: '50px', cursor: 'pointer', outline: 'none',
                  border: `1px solid ${isActive ? '#B2278C' : 'rgba(255,255,255,0.1)'}`,
                  background: isActive ? 'rgba(178,39,140,0.15)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#B2278C' : '#777',
                  fontSize: '0.82rem', fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap', transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(178,39,140,0.4)'; e.currentTarget.style.color = '#ddd'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#777'; } }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {!loading && (
            <p style={{ color: '#444', fontSize: '0.78rem', marginTop: '0.75rem' }}>
              {works.length} project{works.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: '0 0 6rem' }}>
        <div className="container">
          {error && (
            <div style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '2rem', background: 'rgba(178,39,140,0.07)', border: '1px solid rgba(178,39,140,0.2)', color: '#B2278C', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠</span> {error}
            </div>
          )}
          <div ref={gridRef} className="wgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
              : works.length > 0
                ? works.map(work => (
                  <div key={work._id} className="work-animate">
                    <WorkCard work={work} />
                  </div>
                ))
                : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                    <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>No projects in this category yet.</p>
                    <button onClick={() => setActiveCategory('All')} style={{ background: 'none', border: 'none', color: '#B2278C', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}>
                      View all projects →
                    </button>
                  </div>
                )
            }
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}