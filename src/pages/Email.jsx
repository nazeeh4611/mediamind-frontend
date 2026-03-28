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

const emailData = {
  hero: {
    badge: "EMAIL MARKETING & AUTOMATION",
    title: "Turn Leads Into Loyal Customers With",
    titleGradient: "Smart Email Automation",
    description: "Build meaningful relationships, nurture leads, and drive repeat sales with powerful email marketing campaigns and automated follow-up sequences that work 24/7.",
    ctaText: "Start Your Automation",
    ctaLink: "/contact",
    secondaryText: "View Case Studies",
    secondaryLink: "/works"
  },
  stats: [
    { number: "4200%", label: "Average ROI" },
    { number: "73%", label: "Lead Generation" },
    { number: "89%", label: "Open Rate Increase" },
    { number: "24/7", label: "Automated Follow-up" }
  ],
  whatIsEmail: {
    title: "Email Marketing That Builds Relationships",
    description: "Email marketing is one of the most effective ways to connect with your audience, nurture leads, and drive sales. With automated follow-up sequences, you can engage customers at the right time with the right message—without manual effort.",
    points: [
      "Nurture leads automatically with personalized sequences",
      "Increase customer lifetime value with targeted campaigns",
      "Recover abandoned carts and win back inactive customers",
      "Build trust through valuable, consistent communication",
      "Track performance with real-time analytics and insights"
    ]
  },
  services: [
    {
      title: "Welcome Sequences",
      icon: "👋",
      description: "Automated email series that greet new subscribers and introduce your brand.",
      features: ["Welcome Emails", "Brand Introduction", "First Offer Delivery", "Value Content", "Onboarding Flow", "Engagement Tracking"]
    },
    {
      title: "Lead Nurturing",
      icon: "🌱",
      description: "Educate and build trust with leads through targeted, value-driven content.",
      features: ["Educational Content", "Case Studies", "Product Benefits", "Social Proof", "Gradual Selling", "Engagement Scoring"]
    },
    {
      title: "Abandoned Cart Recovery",
      icon: "🛒",
      description: "Recover lost sales with strategic follow-up emails for abandoned carts.",
      features: ["Cart Reminders", "Urgency Triggers", "Discount Offers", "Product Highlights", "Multiple Touchpoints", "Recovery Tracking"]
    },
    {
      title: "Customer Re-engagement",
      icon: "🔄",
      description: "Win back inactive customers with personalized reactivation campaigns.",
      features: ["Inactive Alerts", "Special Offers", "Feedback Requests", "New Product Updates", "Win-back Sequences", "Reactivation Tracking"]
    },
    {
      title: "Newsletter Campaigns",
      icon: "📰",
      description: "Regular newsletters that keep your audience informed and engaged.",
      features: ["Monthly Newsletters", "Content Curations", "Company Updates", "Industry Insights", "Promotional Offers", "Engagement Analytics"]
    },
    {
      title: "Post-Purchase Follow-up",
      icon: "🎁",
      description: "Delight customers after purchase with automated follow-up sequences.",
      features: ["Order Confirmations", "Shipping Updates", "Review Requests", "Cross-sell Offers", "Loyalty Programs", "Customer Satisfaction"]
    }
  ],
  automation: [
    {
      title: "Trigger-based Automation",
      description: "Automatically send emails based on specific customer actions and behaviors.",
      triggers: ["Welcome Sign-up", "Abandoned Cart", "Product Purchase", "Inactive Period", "Birthday", "Anniversary"]
    },
    {
      title: "Segmented Campaigns",
      description: "Target specific audience segments with personalized messaging.",
      segments: ["New Subscribers", "Active Customers", "Inactive Users", "High-value Customers", "Location-based", "Interest-based"]
    },
    {
      title: "Behavioral Targeting",
      description: "Send emails based on how customers interact with your brand.",
      behaviors: ["Website Visits", "Email Opens", "Link Clicks", "Product Views", "Purchase History", "Support Tickets"]
    }
  ],
  process: [
    {
      step: "01",
      title: "Strategy Development",
      desc: "Define goals, target audience, and key messaging for your email campaigns.",
      icon: "📋"
    },
    {
      step: "02",
      title: "List Building",
      desc: "Grow your email list with effective opt-in strategies and lead magnets.",
      icon: "📧"
    },
    {
      step: "03",
      title: "Content Creation",
      desc: "Craft compelling email content, subject lines, and visual designs.",
      icon: "✏️"
    },
    {
      step: "04",
      title: "Automation Setup",
      desc: "Build automated sequences with triggers, conditions, and timing.",
      icon: "⚙️"
    },
    {
      step: "05",
      title: "Testing & Optimization",
      desc: "A/B test subject lines, content, and timing for maximum performance.",
      icon: "📊"
    },
    {
      step: "06",
      title: "Analytics & Reporting",
      desc: "Track opens, clicks, conversions, and ROI with detailed reporting.",
      icon: "📈"
    }
  ],
  results: [
    { metric: "Open Rate", increase: "+45%", timeframe: "Average Increase", color: ORANGE },
    { metric: "Click-Through Rate", increase: "+62%", timeframe: "Campaign Performance", color: "#3b82f6" },
    { metric: "Conversion Rate", increase: "+38%", timeframe: "Email to Sale", color: "#8b5cf6" },
    { metric: "Revenue Generated", increase: "+156%", timeframe: "From Automation", color: ORANGE }
  ],
  faqs: [
    { q: "What email marketing platform do you use?", a: "We work with all major email marketing platforms including Mailchimp, Klaviyo, ActiveCampaign, HubSpot, ConvertKit, and custom solutions. We'll recommend the best platform based on your business needs and budget." },
    { q: "How many emails should I send?", a: "The optimal frequency depends on your audience and industry. We'll help you find the right balance—typically 1-4 emails per month for newsletters, plus automated sequences triggered by specific actions." },
    { q: "What is email automation and why do I need it?", a: "Email automation sends the right message to the right person at the right time—automatically. It saves time, ensures consistent communication, and nurtures leads without manual effort, resulting in higher engagement and sales." },
    { q: "How do you grow my email list?", a: "We implement proven list-building strategies including lead magnets, opt-in forms, landing pages, pop-ups, and content upgrades. We focus on quality subscribers who are genuinely interested in your brand." },
    { q: "What metrics do you track?", a: "We track key metrics including open rates, click-through rates, conversion rates, bounce rates, unsubscribe rates, revenue generated, and customer lifetime value. You'll receive detailed monthly reports with actionable insights." }
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

function AutomationCard({ title, description, items }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${hovered ? ORANGE : INK10}`,
        borderRadius: '20px',
        padding: '2rem',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: ORANGE,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: INK60,
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map((item, idx) => (
          <span
            key={idx}
            style={{
              padding: '0.4rem 1rem',
              background: OFF_WHITE,
              border: `1px solid ${INK10}`,
              borderRadius: '50px',
              fontSize: '0.8rem',
              color: INK60,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {item}
          </span>
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

export default function EmailMarketing() {
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
        
        .automation-grid {
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
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .automation-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .results-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .automation-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .results-grid { grid-template-columns: 1fr; }
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
                {emailData.hero.badge}
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
              {emailData.hero.title}{' '}
              <span className="glow-text">{emailData.hero.titleGradient}</span>
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
              {emailData.hero.description}
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn
                to={emailData.hero.ctaLink}
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
                {emailData.hero.ctaText} <ArrowUpRight size={18} />
              </MagneticBtn>
              <MagneticBtn
                to={emailData.hero.secondaryLink}
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
                {emailData.hero.secondaryText} <ArrowUpRight size={18} />
              </MagneticBtn>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
              {emailData.stats.map((stat, i) => (
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
                WHY EMAIL MARKETING
              </p>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: INK, marginBottom: '1.5rem' }}>
                {emailData.whatIsEmail.title}
              </h2>
              <p style={{ color: INK60, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                {emailData.whatIsEmail.description}
              </p>
              <div>
                {emailData.whatIsEmail.points.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Check size={18} color={ORANGE} />
                    <span style={{ color: INK60, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <img
                src='/email.avif'
                alt="Email Marketing"
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
              OUR SERVICES
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Email Marketing & <span style={{ color: ORANGE }}>Automation</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Strategic campaigns that nurture leads and drive conversions
            </p>
          </div>

          <div className="services-grid">
            {emailData.services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: WHITE }} className="reveal-section">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
              SMART AUTOMATION
            </p>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: INK, marginBottom: '1rem' }}>
              Automated <span style={{ color: ORANGE }}>Follow-up Sequences</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              Send the right message at the right time—automatically
            </p>
          </div>

          <div className="automation-grid">
            {emailData.automation.map((item, i) => (
              <AutomationCard
                key={i}
                title={item.title}
                description={item.description}
                items={item.triggers || item.segments || item.behaviors}
              />
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
              How We Build <span style={{ color: ORANGE }}>Your Campaigns</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              A data-driven approach to email marketing success
            </p>
          </div>

          <div className="process-grid">
            {emailData.process.map((step, i) => (
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
              Real Metrics. <span style={{ color: ORANGE }}>Real ROI.</span>
            </h2>
            <p style={{ color: INK60, maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
              See how email automation transforms business results
            </p>
          </div>

          <div className="results-grid">
            {emailData.results.map((result, i) => (
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
              Everything you need to know about our email marketing services
            </p>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {emailData.faqs.map((faq, i) => (
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
              Ready to Automate Your Email Marketing?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              Let's build automated email sequences that nurture leads and drive sales on autopilot.
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
              Start Your Automation <ArrowUpRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </div>
  );
}