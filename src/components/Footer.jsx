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

  const services = [
    ['Social Media Marketing', '/services/social-media-marketing'],
    ['Website Development', '/services/website-development'],
    ['SEO & Google Ads', '/services/seo-google-ads'],
    ['Branding & Graphic Design', '/services/branding-graphic-design'],
    ['Logo Design', '/services/logo-design'],
    ['NFC Solutions', '/services/nfc-solutions'],
    ['Email Marketing', '/services/email-marketing'],
  ];

  const company = [
    ['About Us', '/about'],
    ['Our Work', '/works'],
    ['Contact', '/contact'],
  ];

  return (
    <footer
    style={{
      background: '#ffffff',
      borderTop: '1px solid rgba(178,39,140,0.4)',
      padding: '5rem 0 2.5rem',
      marginTop: '4rem',
    }}
  >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Logo + About */}
          <div>
            <Link to="/" onClick={handleLinkClick}>
              <img
                src="/dn.png"
                alt="logo"
                style={{ width: '130px', marginBottom: '1.2rem' }}
              />
            </Link>

            <p
              style={{
                color: '#000000',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                maxWidth: 260,
              }}
            >
              We help businesses grow with modern websites, digital marketing,
              branding, and automation solutions designed to increase
              visibility, leads, and revenue.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                marginBottom: '1.2rem',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B2278C',
              }}
            >
              Services
            </h4>

            {services.map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.7rem' }}>
                <Link
                  to={to}
                  onClick={handleLinkClick}
                  style={{
                    color: '#000000',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#B2278C')}
                  onMouseLeave={(e) => (e.target.style.color = '#000000')}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                marginBottom: '1.2rem',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B2278C',
              }}
            >
              Company
            </h4>

            {company.map(([label, to]) => (
              <div key={to} style={{ marginBottom: '0.7rem' }}>
                <Link
                  to={to}
                  onClick={handleLinkClick}
                  style={{
                    color: '#000000',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#B2278C')}
                  onMouseLeave={(e) => (e.target.style.color = '#000000')}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                marginBottom: '1.2rem',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B2278C',
              }}
            >
              Contact
            </h4>

            <p
              style={{
                color: '#000000',
                fontSize: '0.95rem',
                lineHeight: 1.9,
              }}
            >
              hello@mediamind.io
              <br />
              +971 50 123 4567
              <br />
              Dubai, United Arab Emirates
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {['📷', '📘', '🔗', '🐦'].map((icon, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '1.2rem',
                    color: '#000000',
                    cursor: 'pointer',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#B2278C')}
                  onMouseLeave={(e) => (e.target.style.color = '#000000')}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(0,0,0,0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ color: '#000000', fontSize: '0.85rem' }}>
            © 2026 MediaMind Digital Agency. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span
              style={{
                color: '#000000',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: '0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#B2278C')}
              onMouseLeave={(e) => (e.target.style.color = '#000000')}
            >
              Privacy Policy
            </span>
            <span
              style={{
                color: '#000000',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: '0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#B2278C')}
              onMouseLeave={(e) => (e.target.style.color = '#000000')}
            >
              Terms of Service
            </span>
          </div>

          {/* Scroll to top */}
          <span
            onClick={scrollToTop}
            style={{
              color: '#B2278C',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Back to top ↑
          </span>
        </div>
      </div>
    </footer>
  );
}