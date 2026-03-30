import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const serviceItems = [
  { label: "NFC Solutions", route: "/services/nfc-solutions", icon: "📡" },
  { label: "Website Development", route: "/services/website-development", icon: "</>" },
  { label: "Social Media Marketing", route: "/services/social-media-marketing", icon: "🔗" },
  { label: "SEO & Google Ads", route: "/services/seo", icon: "🔍" },
  { label: "Branding & Graphic Design", route: "/services/branding-graphic-design", icon: "🎨" },
  { label: "Logo Design", route: "/services/logo-design", icon: "✏️" },
  { label: "Email Marketing", route: "/services/email-marketing", icon: "📧" },
  // { label: "Performance Marketing", route: "/services/perfomance-marketing", icon: "🚀" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const servicesTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [location]);

  // Animate dropdown when it opens
  useEffect(() => {
    if (servicesOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -8, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' }
      );
    }
  }, [servicesOpen]);

  const handleServicesEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '', label: 'Services', hasDropdown: true },
    { to: '/works', label: 'Works' },
    { to: '/about', label: 'About' },
  ];

  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 0',
      background: '#ffffff',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/lg.avif" alt="logo" style={{ height: '88px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {links.map(l => (
            l.hasDropdown ? (
              <div
                key={l.to}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
                style={{ position: 'relative' }}
              >
                <Link to={l.to} style={{
                  fontFamily: 'var(--font-display, Inter)', fontWeight: 600, fontSize: '0.9rem',
                  color: isServicesActive ? '#B2278C' : '#333333',
                  opacity: isServicesActive ? 1 : 0.8,
                  transition: 'all 0.2s', letterSpacing: '0.01em', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#B2278C'; e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isServicesActive ? '#B2278C' : '#333333';
                  e.currentTarget.style.opacity = isServicesActive ? '1' : '0.8';
                }}
                >
                  {l.label}
                  {/* Chevron */}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transition: 'transform 0.25s ease',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      marginTop: '1px',
                    }}>
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isServicesActive && (
                    <span style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 2, background: '#B2278C', borderRadius: 2,
                    }} />
                  )}
                </Link>

                {/* Dropdown */}
                {servicesOpen && (
                  <div
                    ref={dropdownRef}
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                    style={{
                      position: 'absolute', top: 'calc(100% + 18px)', left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#ffffff',
                      borderRadius: '16px',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(178,39,140,0.07)',
                      padding: '0.75rem 0',
                      minWidth: '260px',
                      zIndex: 2000,
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Notch triangle */}
                    <div style={{
                      position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)',
                      width: 14, height: 7,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: 14, height: 14,
                        background: '#ffffff',
                        border: '1px solid rgba(0,0,0,0.06)',
                        transform: 'rotate(45deg) translate(-1px, 3px)',
                        borderRadius: '2px',
                      }} />
                    </div>

                    {serviceItems.map((item, idx) => (
                      <Link
                        key={item.route}
                        to={item.route}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '14px',
                          padding: '0.72rem 1.4rem',
                          fontFamily: 'var(--font-display, Inter)',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          color: location.pathname === item.route ? '#B2278C' : '#222',
                          textDecoration: 'none',
                          transition: 'all 0.15s',
                          borderRadius: '8px',
                          margin: '0 0.4rem',
                          background: location.pathname === item.route ? 'rgba(178,39,140,0.06)' : 'transparent',
                          borderBottom: idx < serviceItems.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(178,39,140,0.07)';
                          e.currentTarget.style.color = '#B2278C';
                          e.currentTarget.style.paddingLeft = '1.65rem';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = location.pathname === item.route ? 'rgba(178,39,140,0.06)' : 'transparent';
                          e.currentTarget.style.color = location.pathname === item.route ? '#B2278C' : '#222';
                          e.currentTarget.style.paddingLeft = '1.4rem';
                        }}
                      >
                        <span style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 32, height: 32, borderRadius: '8px',
                          background: 'rgba(178,39,140,0.08)',
                          fontSize: '0.95rem', flexShrink: 0,
                        }}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.to} to={l.to} style={{
                fontFamily: 'var(--font-display, Inter)', fontWeight: 600, fontSize: '0.9rem',
                color: location.pathname === l.to ? '#B2278C' : '#333333',
                opacity: location.pathname === l.to ? 1 : 0.8,
                transition: 'all 0.2s', letterSpacing: '0.01em', textDecoration: 'none',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#B2278C'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => {
                e.currentTarget.style.color = location.pathname === l.to ? '#B2278C' : '#333333';
                e.currentTarget.style.opacity = location.pathname === l.to ? '1' : '0.8';
              }}
              >
                {l.label}
                {location.pathname === l.to && (
                  <span style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: 2, background: '#B2278C', borderRadius: 2,
                  }} />
                )}
              </Link>
            )
          ))}

          <Link to="/contact" style={{
            padding: '0.6rem 1.5rem', fontSize: '0.85rem',
            background: '#B2278C', color: '#fff', borderRadius: '50px',
            fontFamily: 'var(--font-display, Inter)', fontWeight: 700,
            textDecoration: 'none', transition: 'all 0.25s',
            boxShadow: '0 0 20px rgba(178,39,140,0.25)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(178,39,140,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(178,39,140,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: '#333333', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                  : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#ffffff',
          padding: '1.5rem 1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.25rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          {links.map(l => (
            l.hasDropdown ? (
              <div key={l.to}>
                <button
                  onClick={() => setMobileServicesOpen(prev => !prev)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'var(--font-display, Inter)', fontWeight: 600, fontSize: '1.1rem',
                    color: isServicesActive ? '#B2278C' : '#333333',
                    padding: '0.85rem 0',
                    borderBottom: mobileServicesOpen ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {l.label}
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                    style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div style={{ paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
                    {serviceItems.map(item => (
                      <Link key={item.route} to={item.route} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        fontFamily: 'var(--font-display, Inter)', fontWeight: 500, fontSize: '0.95rem',
                        color: location.pathname === item.route ? '#B2278C' : '#444',
                        padding: '0.65rem 0',
                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                        textDecoration: 'none',
                      }}>
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={l.to} to={l.to} style={{
                fontFamily: 'var(--font-display, Inter)', fontWeight: 600, fontSize: '1.1rem',
                color: location.pathname === l.to ? '#B2278C' : '#333333',
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                textDecoration: 'none',
              }}>
                {l.label}
              </Link>
            )
          ))}
          <Link to="/contact" style={{
            textAlign: 'center', marginTop: '1rem',
            padding: '0.85rem', background: '#B2278C', color: '#fff',
            borderRadius: '12px', fontFamily: 'var(--font-display, Inter)',
            fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem',
          }}>
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}