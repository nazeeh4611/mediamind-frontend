import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, Award, Globe, Zap, Heart, Target, Sparkles } from 'lucide-react';
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

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'Visionary leader with 15+ years in tech innovation'
  },
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Award-winning designer specializing in brand experiences'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Full-stack expert with passion for emerging tech'
  },
  {
    name: 'Elena Kowalski',
    role: 'Head of Strategy',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Strategic thinker driving digital transformation'
  }
];

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We constantly push boundaries to deliver cutting-edge solutions that set new standards.'
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our priority. We build partnerships that drive real results.'
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description: 'Creating solutions that transcend borders and connect people worldwide.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every project is measured by tangible outcomes and measurable success.'
  }
];

const milestones = [
  { year: '2020', title: 'Company Founded', description: 'Started with a vision to transform digital connections' },
  { year: '2021', title: 'First 1000 Clients', description: 'Reached milestone of serving over 1000 businesses' },
  { year: '2022', title: 'Global Expansion', description: 'Expanded operations to 15+ countries worldwide' },
  { year: '2023', title: 'NFC Innovation', description: 'Launched revolutionary smart NFC solutions' },
  { year: '2024', title: 'Industry Awards', description: 'Recognized as top innovator in tech industry' }
];

const stats = [
  { number: '5000+', label: 'Happy Clients', icon: Users },
  { number: '98%', label: 'Retention Rate', icon: Award },
  { number: '50+', label: 'Team Members', icon: Sparkles },
  { number: '15+', label: 'Countries', icon: Globe }
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

function HeroAbout() {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-about-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );
      gsap.fromTo('.hero-about-sub',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.hero-about-btns',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );
    }, contentRef);
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
      justifyContent: 'center',
      paddingTop: 'clamp(80px, 12vh, 110px)',
      paddingBottom: 'clamp(3rem, 8vw, 5rem)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(178,39,140,0.15) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div ref={contentRef} style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 1240,
        margin: '0 auto',
        padding: '1rem',
        textAlign: 'center'
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
            OUR STORY
          </span>
        </div>

        <h1 className="hero-about-title" style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 0.96,
          letterSpacing: '-0.03em',
          marginBottom: '1.8rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          We're on a mission to<br />
          <span style={{ color: PINK }}>transform connections</span>
        </h1>

        <p className="hero-about-sub" style={{
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
          lineHeight: 1.75,
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '2.8rem'
        }}>
          We believe in the power of smart technology to create meaningful connections. 
          Since 2020, we've been helping businesses and individuals embrace the future of networking.
        </p>

        <div className="hero-about-btns" style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <MagneticBtn to="/contact" style={{
            padding: '0.85rem 1.8rem',
            background: '#fff',
            color: '#111',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Syne, sans-serif'
          }}>
            Join Our Journey <ArrowUpRight size={14} />
          </MagneticBtn>

          <MagneticBtn to="/works" style={{
            padding: '0.85rem 1.8rem',
            background: 'transparent',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Syne, sans-serif',
            backdropFilter: 'blur(12px)'
          }}>
            View Our Work
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
    );
  }, [index]);

  const Icon = stat.icon;

  return (
    <div ref={cardRef} style={{
      background: WHITE,
      border: `1px solid ${INK10}`,
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.borderColor = PINK;
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = INK10;
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        width: 60,
        height: 60,
        borderRadius: '12px',
        background: PINK_LIGHT,
        border: `1px solid ${PINK_MID}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.2rem'
      }}>
        <Icon size={28} color={PINK} />
      </div>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 800,
        color: INK,
        marginBottom: '0.5rem'
      }}>{stat.number}</div>
      <div style={{
        color: INK60,
        fontSize: '0.85rem',
        fontFamily: 'DM Sans, sans-serif'
      }}>{stat.label}</div>
    </div>
  );
}

function ValueCard({ value, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const Icon = value.icon;

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
    );
  }, [index]);

  return (
    <div ref={cardRef} style={{
      background: hovered ? OFF_WHITE : WHITE,
      border: `1px solid ${hovered ? PINK : INK10}`,
      borderRadius: '16px',
      padding: '2rem',
      transition: 'all 0.3s ease',
      transform: hovered ? 'translateY(-5px)' : 'translateY(0)'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: 50,
        height: 50,
        borderRadius: '12px',
        background: hovered ? PINK : PINK_LIGHT,
        border: `1px solid ${hovered ? PINK : PINK_MID}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        transition: 'all 0.3s'
      }}>
        <Icon size={24} color={hovered ? WHITE : PINK} />
      </div>
      <h3 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '1.2rem',
        fontWeight: 700,
        color: INK,
        marginBottom: '0.8rem'
      }}>{value.title}</h3>
      <p style={{
        color: INK60,
        fontSize: '0.85rem',
        lineHeight: 1.65,
        fontFamily: 'DM Sans, sans-serif'
      }}>{value.description}</p>
    </div>
  );
}

function MilestoneItem({ milestone, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(itemRef.current,
      { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, delay: index * 0.1, scrollTrigger: { trigger: itemRef.current, start: 'top 85%', once: true } }
    );
  }, [index]);

  return (
    <div ref={itemRef} style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1.5rem',
      background: WHITE,
      borderLeft: `3px solid ${PINK}`,
      borderRadius: '8px',
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(8px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '2rem',
        fontWeight: 800,
        color: PINK,
        minWidth: '70px'
      }}>{milestone.year}</div>
      <div>
        <h4 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: INK,
          marginBottom: '0.5rem'
        }}>{milestone.title}</h4>
        <p style={{
          color: INK60,
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: 'DM Sans, sans-serif'
        }}>{milestone.description}</p>
      </div>
    </div>
  );
}

function TeamCard({ member, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
    );
  }, [index]);

  return (
    <div ref={cardRef} style={{
      background: WHITE,
      border: `1px solid ${hovered ? PINK : INK10}`,
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : 'none'
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>
      <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
        <img 
          src={member.image} 
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: INK,
          marginBottom: '0.3rem'
        }}>{member.name}</h3>
        <p style={{
          color: PINK,
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '0.8rem',
          fontFamily: 'DM Sans, sans-serif'
        }}>{member.role}</p>
        <p style={{
          color: INK60,
          fontSize: '0.8rem',
          lineHeight: 1.5,
          fontFamily: 'DM Sans, sans-serif'
        }}>{member.bio}</p>
      </div>
    </div>
  );
}

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-about').forEach((el) => {
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
      <HeroAbout />

      <section style={{ padding: 'clamp(3rem, 8vw, 8rem) 1rem', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="reveal-about" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>OUR IMPACT</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 800,
              color: INK,
              marginBottom: '1rem'
            }}>By the Numbers</h2>
            <p style={{
              color: INK60,
              fontSize: '1rem',
              maxWidth: 600,
              margin: '0 auto',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Our journey in numbers — real impact, real results
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 8rem) 1rem', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="reveal-about" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>OUR VALUES</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 800,
              color: INK,
              marginBottom: '1rem'
            }}>What Drives Us</h2>
            <p style={{
              color: INK60,
              fontSize: '1rem',
              maxWidth: 600,
              margin: '0 auto',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Core principles that guide everything we do
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {values.map((value, i) => (
              <ValueCard key={i} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 8rem) 1rem', background: WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="reveal-about" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <SectionLabel>OUR JOURNEY</SectionLabel>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                fontWeight: 800,
                color: INK,
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}>Milestones That<br />Defined Us</h2>
              <p style={{
                color: INK60,
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontFamily: 'DM Sans, sans-serif'
              }}>
                From humble beginnings to industry leaders — every step has been about innovation and excellence.
              </p>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
                background: PINK,
                color: WHITE,
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.85rem',
                fontFamily: 'Syne, sans-serif'
              }}>
                Be Part of Our Story <ArrowUpRight size={14} />
              </MagneticBtn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {milestones.map((milestone, i) => (
                <MilestoneItem key={i} milestone={milestone} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 8rem) 1rem', background: OFF_WHITE }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="reveal-about" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>MEET THE TEAM</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 800,
              color: INK,
              marginBottom: '1rem'
            }}>The Minds Behind Magic</h2>
            <p style={{
              color: INK60,
              fontSize: '1rem',
              maxWidth: 600,
              margin: '0 auto',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Passionate experts dedicated to your success
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 8rem) 1rem', background: INK, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,39,140,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 5rem)',
            maxWidth: '90%'
          }}>
            <SectionLabel>JOIN US</SectionLabel>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
              fontWeight: 800,
              color: WHITE,
              marginBottom: '1rem',
              letterSpacing: '-0.025em',
              lineHeight: 1.05
            }}>Ready to Create<br />Something Amazing?</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 2rem', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Let's work together to bring your vision to life. We're just a message away.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticBtn to="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                background: WHITE,
                color: INK,
                borderRadius: '6px',
                fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.9rem'
              }}>
                Get in Touch <ArrowUpRight size={16} />
              </MagneticBtn>
              <MagneticBtn to="/works" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                fontWeight: 600,
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.9rem'
              }}>
                View Portfolio
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}