import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
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

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 0',
      background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(178,39,140,0.3)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to="/" className="nav-item flex items-center">
      <img
  src="/dn.png"
  alt="logo"
  className="h-12 md:h-16 w-auto object-contain"
/>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
              color: location.pathname === l.to ? '#B2278C' : '#ffffff',
              opacity: location.pathname === l.to ? 1 : 0.75,
              transition: 'all 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { e.target.style.color = '#B2278C'; e.target.style.opacity = 1; }}
            onMouseLeave={e => {
              e.target.style.color = location.pathname === l.to ? '#B2278C' : '#ffffff';
              e.target.style.opacity = location.pathname === l.to ? 1 : 0.75;
            }}
            >{l.label}</Link>
          ))}
          <Link to="/contact" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', background: '#B2278C', border: 'none' }}>
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px',
          }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: '#ffffff', borderRadius: 2,
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

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          borderBottom: '1px solid #185EA7',
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem',
              color: location.pathname === l.to ? '#B2278C' : '#ffffff',
              padding: '0.5rem 0',
              borderBottom: '1px solid #185EA7',
            }}>{l.label}</Link>
          ))}
          <Link to="/contact" className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem', background: '#B2278C', border: 'none' }}>
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