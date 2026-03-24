import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer style={{
      background: 'transparent',
      borderTop: '1px solid #B2278C',
      padding: '4rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          <div>
            <Link to="/" onClick={handleLinkClick} style={{ display: 'inline-block' }}>
              <img
                src="/dn.png"
                alt="logo"
                style={{ height: 'auto', width: '120px', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 240, marginTop: '1rem' }}>
              Comprehensive solutions to accelerate your growth through data-driven digital marketing.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Services</h4>
            {[
              ['Social Media Marketing', '/services/social-media-marketing'],
              ['Website Development', '/services/website-development'],
              ['SEO & Google Ads', '/services/seo-google-ads'],
              ['Branding & Graphic Design', '/services/branding-graphic-design'],
              ['Logo Design', '/services/logo-design'],
              ['NFC Solutions', '/services/nfc-solutions'],
              ['Email Marketing', '/services/email-marketing'],
            ].map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.6rem' }}>
                <Link 
                  to={to} 
                  onClick={handleLinkClick}
                  style={{ color: '#e0e0e0', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#B2278C'}
                  onMouseLeave={e => e.target.style.color = '#e0e0e0'}
                >{label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Company</h4>
            {[
              ['About Us', '/about'], 
              ['Our Work', '/works'],
              ['Contact', '/contact']
            ].map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.6rem' }}>
                <Link 
                  to={to} 
                  onClick={handleLinkClick}
                  style={{ color: '#e0e0e0', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#B2278C'}
                  onMouseLeave={e => e.target.style.color = '#e0e0e0'}
                >{label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Contact</h4>
            <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.8 }}>
              hello@mediamind.io<br />
              +971 50 123 4567<br />
              Dubai, UAE
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: '1.2rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#B2278C'}
                onMouseLeave={e => e.target.style.color = '#e0e0e0'}
              >📷</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: '1.2rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#B2278C'}
                onMouseLeave={e => e.target.style.color = '#e0e0e0'}
              >📘</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: '1.2rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#B2278C'}
                onMouseLeave={e => e.target.style.color = '#e0e0e0'}
              >🔗</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: '1.2rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#B2278C'}
                onMouseLeave={e => e.target.style.color = '#e0e0e0'}
              >🐦</a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #185EA7',
          paddingTop: '2rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ color: '#e0e0e0', fontSize: '0.85rem' }}>
            © 2026 MediaMind Digital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span 
                key={t} 
                style={{ color: '#e0e0e0', fontSize: '0.85rem', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#B2278C'}
                onMouseLeave={e => e.target.style.color = '#e0e0e0'}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}