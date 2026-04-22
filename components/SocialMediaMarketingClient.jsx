"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';
import { MagneticBtn } from '@/components/home/MagneticBtn';
import {
  WHITE, INK, INK60, INK30, INK10,
  OFF_WHITE, ORANGE, GRAD_HERO
} from '@/utils/constants';

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
    { name: "Instagram", icon: "📸", color: "#E4405F", description: "Visual storytelling, reels, stories, and shoppable posts for brand awareness and engagement." },
    { name: "Facebook", icon: "👍", color: "#1877F2", description: "Community building, targeted ads, events, and customer engagement at scale." },
    { name: "LinkedIn", icon: "💼", color: "#0A66C2", description: "B2B networking, thought leadership, professional branding, and lead generation." },
    { name: "TikTok", icon: "🎵", color: "#000000", description: "Short-form video content, viral trends, and reaching younger demographics." },
    { name: "Twitter/X", icon: "🐦", color: "#1DA1F2", description: "Real-time engagement, customer service, and brand personality." },
    { name: "YouTube", icon: "▶️", color: "#FF0000", description: "Long-form video content, tutorials, and in-depth brand storytelling." }
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
    { step: "01", title: "Discovery & Strategy", desc: "We analyze your brand, audience, competitors, and goals to create a tailored strategy.", icon: "🔍" },
    { step: "02", title: "Content Planning", desc: "Develop content calendar, themes, and creative assets aligned with your brand voice.", icon: "📅" },
    { step: "03", title: "Content Creation", desc: "Produce high-quality visuals, videos, and copy that resonate with your audience.", icon: "🎨" },
    { step: "04", title: "Scheduling & Posting", desc: "Consistent posting at optimal times to maximize reach and engagement.", icon: "⏰" },
    { step: "05", title: "Engagement & Community", desc: "Actively engage with your audience, respond to comments, and build community.", icon: "💬" },
    { step: "06", title: "Analysis & Optimization", desc: "Track performance, analyze data, and continuously optimize for better results.", icon: "📊" }
  ],
  results: [
    { metric: "Followers Growth", increase: "+245%", timeframe: "Average Increase", color: "#B2278C" },
    { metric: "Engagement Rate", increase: "+178%", timeframe: "Industry Average", color: "#B2278C" },
    { metric: "Website Traffic", increase: "+156%", timeframe: "From Social", color: "#B2278C" },
    { metric: "Leads Generated", increase: "+134%", timeframe: "Monthly Average", color: "#B2278C" }
  ],
  faqs: [
    { q: "Which social media platforms should my business be on?", a: "It depends on your target audience, industry, and business goals. We analyze your ideal customers and recommend platforms where they're most active. For most businesses, Instagram, Facebook, and LinkedIn are great starting points." },
    { q: "How often should I post on social media?", a: "Consistency is key. We recommend 3-5 posts per week on Instagram and Facebook, 1-2 posts daily on Twitter, and 3-4 posts per week on LinkedIn. We'll create a content calendar tailored to your audience and platform." },
    { q: "What's included in your social media management services?", a: "Our comprehensive management includes content creation, daily posting, community engagement, paid advertising, influencer partnerships, analytics reporting, and strategy optimization. We handle everything so you can focus on your business." },
    { q: "How do you measure social media success?", a: "We track key metrics including reach, impressions, engagement rate, follower growth, website clicks, leads generated, and ROI. You'll receive detailed monthly reports with actionable insights and recommendations." },
    { q: "Do you offer paid advertising services?", a: "Yes! We specialize in paid social advertising across all platforms. We create targeted campaigns, manage ad budgets, optimize for conversions, and track ROI to ensure you're getting the best return on your ad spend." },
    { q: "How long before I see results?", a: "While some results like engagement can be seen immediately, significant growth typically takes 3-6 months of consistent strategy. We focus on sustainable, long-term growth rather than quick fixes." }
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
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
        minWidth: '280px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
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
            <Check size={14} color="#B2278C" />
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
        background: WHITE,
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        minWidth: '260px',
        width: '100%'
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
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {platform.name}
      </div>
      <p
        style={{
          color: INK60,
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
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
        background: WHITE,
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        minWidth: '280px',
        width: '100%',
        height: '100%'
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
          color: "#B2278C",
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
        border: `1px solid ${hovered ? "#B2278C" : INK10}`,
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        minWidth: '200px',
        width: '100%'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: "#B2278C",
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
          padding: '1rem 1.5rem',
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
        <span style={{ flex: 1 }}>{q}</span>
        <span
          style={{
            fontSize: '1.5rem',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            color: "#B2278C",
            marginLeft: '1rem'
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

function HorizontalScrollSection({ title, subtitle, items, renderItem, bgColor = WHITE }) {
  const scrollRef = useRef(null);

  return (
    <section style={{ padding: '4rem 0', background: bgColor }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {subtitle && (
            <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
              {subtitle}
            </p>
          )}
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
            {title}
          </h2>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch'
          }}
          className="horizontal-scroll"
        >
          {items.map((item, i) => (
            <div key={i} style={{ flex: '0 0 auto', width: 'min(100%, 320px)' }}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: ${INK10};
          borderRadius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: #B2278C;
          borderRadius: 10px;
        }
      `}</style>
    </section>
  );
}

export default function SocialMediaMarketingClient() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div style={{ background: WHITE }}>
      <style jsx global>{`
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
        .container {
          width: 100%;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        button, .btn {
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .stats-container {
            gap: 1.5rem !important;
          }
        }
      `}</style>

      <section
        style={{
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',
          background: GRAD_HERO,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', width: '60%', maxWidth: 600, paddingBottom: '60%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '50%', maxWidth: 500, paddingBottom: '50%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.2rem',
                background: OFF_WHITE,
                border: `1px solid ${INK10}`,
                borderRadius: '100px',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: ORANGE, display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: INK60, fontSize: '0.85rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                {socialData.hero.badge}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: INK,
                letterSpacing: '-0.02em',
              }}
            >
              {socialData.hero.title}{' '}
              <span className="glow-text">{socialData.hero.titleGradient}</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                color: INK60,
                maxWidth: 700,
                margin: '0 auto 1.5rem',
                lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
                padding: '0 1rem'
              }}
            >
              {socialData.hero.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
              <MagneticBtn
                to={socialData.hero.ctaLink}
                style={{
                  padding: '0.8rem 1.8rem',
                  background: INK,
                  color: WHITE,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {socialData.hero.ctaText} <ArrowUpRight size={16} />
              </MagneticBtn>
              <MagneticBtn
                to={socialData.hero.secondaryLink}
                style={{
                  padding: '0.8rem 1.8rem',
                  background: WHITE,
                  color: INK,
                  border: `1px solid ${INK10}`,
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {socialData.hero.secondaryText} <ArrowUpRight size={16} />
              </MagneticBtn>
            </div>

            <div className="stats-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              {socialData.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: '100px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, background: `linear-gradient(135deg, ${ORANGE}, #8b5cf6)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>
                    {stat.number}
                  </div>
                  <div style={{ color: INK60, fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                WHY SOCIAL MEDIA
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
                {socialData.whatIsSocial.title}
              </h2>
              <p style={{ color: INK60, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                {socialData.whatIsSocial.description}
              </p>
              <div>
                {socialData.whatIsSocial.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <Check size={16} color="#B2278C" />
                    <span style={{ color: INK60, fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '24px', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/social.avif'
                alt="Social Media Marketing"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          </div>
        </div>
      </section>

      <HorizontalScrollSection
        subtitle="PLATFORMS WE MASTER"
        title={
          <>
            Reach Your Audience <span style={{ color: '#B2278C' }}>Where They Are</span>
          </>
        }
        items={socialData.platforms}
        renderItem={(platform) => <PlatformCard platform={platform} />}
        bgColor={OFF_WHITE}
      />

      <HorizontalScrollSection
        subtitle="OUR SERVICES"
        title={
          <>
            Social Media <span style={{ color: '#B2278C' }}>Marketing Services</span>
          </>
        }
        items={socialData.services}
        renderItem={(service) => <ServiceCard service={service} />}
        bgColor={WHITE}
      />

      <HorizontalScrollSection
        subtitle="OUR PROCESS"
        title={
          <>
            How We Build <span style={{ color: '#B2278C' }}>Your Social Presence</span>
          </>
        }
        items={socialData.process}
        renderItem={(step) => <ProcessStep {...step} />}
        bgColor={OFF_WHITE}
      />

      <HorizontalScrollSection
        subtitle="PROVEN RESULTS"
        title={
          <>
            Real Growth. <span style={{ color: '#B2278C' }}>Real Engagement.</span>
          </>
        }
        items={socialData.results}
        renderItem={(result) => <ResultCard {...result} />}
        bgColor={WHITE}
      />

      <section style={{ padding: '4rem 0', background: OFF_WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: "#B2278C", fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
              Frequently Asked <span style={{ color: "#B2278C" }}>Questions</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
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

      <section style={{ padding: '4rem 0', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              background: INK,
              borderRadius: '28px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: WHITE, marginBottom: '0.8rem' }}>
              Ready to Grow Your Social Presence?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 1.5rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', padding: '0 1rem' }}>
              Let's create engaging content and campaigns that connect with your audience and drive real business results.
            </p>
            <MagneticBtn
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.8rem',
                background: WHITE,
                color: INK,
                borderRadius: '50px',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem'
              }}
            >
              Start Your Social Campaign <ArrowUpRight size={16} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}