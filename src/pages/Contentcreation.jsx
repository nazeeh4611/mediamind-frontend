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

const socialData = {
  hero: {
    badge: "SOCIAL MEDIA MARKETING",
    title: "Build Your Brand &",
    titleGradient: "Grow Your Audience",
    description: "Connect with your target audience, build meaningful relationships, and drive business growth through strategic social media marketing. We create engaging content and data-driven campaigns that deliver real results.",
    ctaText: "Start Your Social Campaign",
    ctaLink: "/contact",
    secondaryText: "View Case Studies",
    secondaryLink: "/works"
  },
  stats: [
    { number: "500M+", label: "Reach Generated" },
    { number: "250+", label: "Campaigns Run" },
    { number: "89%", label: "Engagement Rate" },
    { number: "156%", label: "Avg. ROI" }
  ],
  whatIsSocial: {
    title: "Social Media That Drives Business Growth",
    description: "Social media is more than just posting content—it's about building authentic connections with your audience, telling your brand story, and creating communities that convert. Our strategic approach helps you stand out in crowded feeds and turn followers into loyal customers.",
    points: [
      "Build brand awareness and credibility",
      "Engage directly with your target audience",
      "Drive traffic to your website and store",
      "Generate qualified leads and sales",
      "Create loyal brand advocates and communities"
    ]
  },
  platforms: [
    {
      name: "Instagram",
      icon: "📸",
      color: "#E4405F",
      description: "Visual storytelling, reels, stories, and shoppable posts for brand awareness and engagement."
    },
    {
      name: "Facebook",
      icon: "👍",
      color: "#1877F2",
      description: "Community building, targeted ads, events, and customer engagement at scale."
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "#0A66C2",
      description: "B2B networking, thought leadership, professional branding, and lead generation."
    },
    {
      name: "TikTok",
      icon: "🎵",
      color: "#000000",
      description: "Short-form video content, viral trends, and reaching younger demographics."
    },
    {
      name: "Twitter/X",
      icon: "🐦",
      color: "#1DA1F2",
      description: "Real-time engagement, customer service, and brand personality."
    },
    {
      name: "YouTube",
      icon: "▶️",
      color: "#FF0000",
      description: "Long-form video content, tutorials, and in-depth brand storytelling."
    }
  ],
  services: [
    {
      title: "Content Creation",
      icon: "🎨",
      description: "High-quality, engaging content that stops the scroll and tells your brand story.",
      features: ["Custom Graphics", "Video Production", "Copywriting", "Story Templates", "Reel Creation", "User-Generated Content"]
    },
    {
      title: "Social Media Management",
      icon: "📊",
      description: "Full-service management of your social accounts with consistent posting and engagement.",
      features: ["Daily Posting", "Community Management", "Engagement Strategy", "Content Calendar", "Influencer Outreach", "Crisis Management"]
    },
    {
      title: "Paid Social Advertising",
      icon: "💰",
      description: "Targeted ad campaigns that reach your ideal customers and drive conversions.",
      features: ["Facebook Ads", "Instagram Ads", "LinkedIn Ads", "TikTok Ads", "Retargeting", "Lookalike Audiences"]
    },
    {
      title: "Influencer Marketing",
      icon: "🌟",
      description: "Partner with relevant influencers to amplify your brand message and reach new audiences.",
      features: ["Influencer Identification", "Campaign Management", "Content Collaboration", "Performance Tracking", "Micro-Influencers", "Celebrity Partnerships"]
    },
    {
      title: "Social Media Strategy",
      icon: "📈",
      description: "Data-driven strategies aligned with your business goals and audience insights.",
      features: ["Audience Research", "Competitor Analysis", "Content Strategy", "Platform Selection", "KPI Setting", "ROI Tracking"]
    },
    {
      title: "Analytics & Reporting",
      icon: "📊",
      description: "Comprehensive analytics and actionable insights to optimize performance.",
      features: ["Monthly Reports", "Engagement Metrics", "Growth Tracking", "ROI Analysis", "Competitor Benchmarking", "Actionable Recommendations"]
    }
  ],
  process: [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "We analyze your brand, audience, competitors, and goals to create a tailored strategy.",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Content Planning",
      desc: "Develop content calendar, themes, and creative assets aligned with your brand voice.",
      icon: "📅"
    },
    {
      step: "03",
      title: "Content Creation",
      desc: "Produce high-quality visuals, videos, and copy that resonate with your audience.",
      icon: "🎨"
    },
    {
      step: "04",
      title: "Scheduling & Posting",
      desc: "Consistent posting at optimal times to maximize reach and engagement.",
      icon: "⏰"
    },
    {
      step: "05",
      title: "Engagement & Community",
      desc: "Actively engage with your audience, respond to comments, and build community.",
      icon: "💬"
    },
    {
      step: "06",
      title: "Analysis & Optimization",
      desc: "Track performance, analyze data, and continuously optimize for better results.",
      icon: "📊"
    }
  ],
  results: [
    {
      metric: "Followers Growth",
      increase: "+245%",
      timeframe: "Average Increase",
      color: "#B2278C"
    },
    {
      metric: "Engagement Rate",
      increase: "+178%",
      timeframe: "Industry Average",
      color: "#185EA7"
    },
    {
      metric: "Website Traffic",
      increase: "+156%",
      timeframe: "From Social",
      color: "#814B97"
    },
    {
      metric: "Leads Generated",
      increase: "+134%",
      timeframe: "Monthly Average",
      color: "#B2278C"
    }
  ],
  faqs: [
    {
      q: "Which social media platforms should my business be on?",
      a: "It depends on your target audience, industry, and business goals. We analyze your ideal customers and recommend platforms where they're most active. For most businesses, Instagram, Facebook, and LinkedIn are great starting points."
    },
    {
      q: "How often should I post on social media?",
      a: "Consistency is key. We recommend 3-5 posts per week on Instagram and Facebook, 1-2 posts daily on Twitter, and 3-4 posts per week on LinkedIn. We'll create a content calendar tailored to your audience and platform."
    },
    {
      q: "What's included in your social media management services?",
      a: "Our comprehensive management includes content creation, daily posting, community engagement, paid advertising, influencer partnerships, analytics reporting, and strategy optimization. We handle everything so you can focus on your business."
    },
    {
      q: "How do you measure social media success?",
      a: "We track key metrics including reach, impressions, engagement rate, follower growth, website clicks, leads generated, and ROI. You'll receive detailed monthly reports with actionable insights and recommendations."
    },
    {
      q: "Do you offer paid advertising services?",
      a: "Yes! We specialize in paid social advertising across all platforms. We create targeted campaigns, manage ad budgets, optimize for conversions, and track ROI to ensure you're getting the best return on your ad spend."
    },
    {
      q: "How long before I see results?",
      a: "While some results like engagement can be seen immediately, significant growth typically takes 3-6 months of consistent strategy. We focus on sustainable, long-term growth rather than quick fixes."
    }
  ]
};

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '20px',
          background: `linear-gradient(135deg, rgba(178,39,140,0.2), transparent)`,
          border: '1px solid rgba(178,39,140,0.3)',
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
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#ffffff',
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: '#888',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontFamily: 'Inter, sans-serif',
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
    </div>
  );
}

function PlatformCard({ platform }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: hovered ? `rgba(178,39,140,0.5)` : 'rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '0.75rem',
        }}
      >
        {platform.icon}
      </div>
      <div
        style={{
          color: platform.color,
          fontSize: '1.2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {platform.name}
      </div>
      <p
        style={{
          color: '#888',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {platform.description}
      </p>
    </div>
  );
}

function ProcessStep({ step, title, desc, icon }) {
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

function ResultCard({ metric, increase, timeframe, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: hovered ? `rgba(178,39,140,0.5)` : 'rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: color,
          fontFamily: 'Inter, sans-serif',
          marginBottom: '0.5rem',
        }}
      >
        {increase}
      </div>
      <div
        style={{
          color: '#ffffff',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {metric}
      </div>
      <div style={{ color: '#666', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>{timeframe}</div>
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

export default function SocialMediaMarketing() {
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .platforms-grid {
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
        
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .platforms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .platforms-grid {
            grid-template-columns: 1fr;
          }
          .process-grid {
            grid-template-columns: 1fr;
          }
          .results-grid {
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
                {socialData.hero.badge}
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
              {socialData.hero.title}{' '}
              <span className="glow-text">{socialData.hero.titleGradient}</span>
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
              {socialData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to={socialData.hero.ctaLink}
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
                {socialData.hero.ctaText} <span style={{ fontSize: '1.2rem' }}>→</span>
              </Link>
              <Link
                to={socialData.hero.secondaryLink}
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
                {socialData.hero.secondaryText}
              </Link>
            </div>

            <div className="stats-container">
              {socialData.stats.map((stat, i) => (
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
                WHY SOCIAL MEDIA
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
                {socialData.whatIsSocial.title}
              </h2>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {socialData.whatIsSocial.description}
              </p>
              <div>
                {socialData.whatIsSocial.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#B2278C', fontSize: '1.2rem' }}>✓</span>
                    <span style={{ color: '#aaa', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: '28px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
               <img
                src='/social.avif'
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
              PLATFORMS WE MASTER
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Reach Your Audience <span style={{ color: '#B2278C' }}>Where They Are</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Strategic presence across all major social platforms
            </p>
          </div>

          <div className="platforms-grid">
            {socialData.platforms.map((platform, i) => (
              <PlatformCard key={i} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR SERVICES
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Social Media <span style={{ color: '#B2278C' }}>Marketing Services</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Comprehensive solutions to grow your social presence
            </p>
          </div>

          <div className="services-grid">
            {socialData.services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              OUR PROCESS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              How We Build <span style={{ color: '#B2278C' }}>Your Social Presence</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A strategic approach to social media success
            </p>
          </div>

          <div className="process-grid">
            {socialData.process.map((step, i) => (
              <ProcessStep key={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'transparent' }} className="reveal-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#B2278C', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              PROVEN RESULTS
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Real Growth. <span style={{ color: '#B2278C' }}>Real Engagement.</span>
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how we've transformed social presence for our clients
            </p>
          </div>

          <div className="results-grid">
            {socialData.results.map((result, i) => (
              <ResultCard key={i} {...result} />
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
              Everything you need to know about our social media marketing services
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {socialData.faqs.map((faq, i) => (
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
              Ready to Grow Your Social Presence?
            </h2>
            <p style={{ color: '#888', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Let's create engaging content and campaigns that connect with your audience and drive real business results.
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
              Start Your Social Campaign <span style={{ fontSize: '1.2rem' }}>→</span>
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