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
    { to: '/works', label: 'Works' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 0',
      background: '#ffffff',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/dn.png" alt="logo" style={{ height: '68px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {links.map(l => (
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
              background: '#333333',
              borderRadius: 2,
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
          background: '#ffffff',
          padding: '1.5rem 1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.25rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--font-display, Inter)', fontWeight: 600, fontSize: '1.1rem',
              color: location.pathname === l.to ? '#B2278C' : '#333333',
              padding: '0.85rem 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              textDecoration: 'none',
            }}>
              {l.label}
            </Link>
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