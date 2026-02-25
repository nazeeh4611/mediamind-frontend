import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
          <img
  src="/dn.png"
  alt="logo"
  className="h-12 md:h-16 w-auto object-contain"
/>
            <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 240 }}>
              Comprehensive solutions to accelerate your growth through data-driven digital marketing.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Services</h4>
            {[
              ['Performance Marketing', '/services/performance-marketing'],
              ['CRM Optimization', '/services/crm-optimization'],
              ['High-Conversion Design', '/services/design'],
              ['Content Creation', '/services/content'],
            ].map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.6rem' }}>
                <Link to={to} style={{ color: '#e0e0e0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#e0e0e0'}
                >{label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Company</h4>
            {[['About', '/about'], ['Contact', '/contact']].map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.6rem' }}>
                <Link to={to} style={{ color: '#e0e0e0', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = '#e0e0e0'}
                >{label}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#B2278C' }}>Contact</h4>
            <p style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: 1.8 }}>
              hello@mediamind.io<br />
              +1 (555) 000-0000<br />
              Dubai, UAE
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #185EA7',
          paddingTop: '2rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ color: '#e0e0e0', fontSize: '0.85rem' }}>
            © 2026 MediaMind. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span key={t} style={{ color: '#e0e0e0', fontSize: '0.85rem', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}