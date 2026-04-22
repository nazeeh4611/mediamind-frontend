"use client";

import React from 'react';
import Link from 'next/link';

// Constants
const WHITE = '#FFFFFF';
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK30 = 'rgba(17, 17, 17, 0.3)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';
const ORANGE = '#F97316';

export function Footer() {
  return (
    <footer style={{ background: WHITE, borderTop: `1px solid ${INK10}`, padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2rem', color: ORANGE, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Socio</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: INK60, lineHeight: 1.75, maxWidth: 260, marginBottom: '1.5rem' }}>
              We help our clients succeed by creating brand identities, digital experiences...
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['📸', '📘', '🎨', '🔵'].map((icon, i) => (
                <div key={i} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: OFF_WHITE, border: `1px solid ${INK10}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s',
                }} 
                onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={e => e.currentTarget.style.background = OFF_WHITE}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: INK, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Navigation</h4>
            {['Home', 'About Us', 'Careers', 'Contact Us', 'Blogs'].map(l => {
              const path = l === 'Home' ? '/' : `/${l.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div key={l} style={{ marginBottom: '0.6rem' }}>
                  <Link 
                    href={path} 
                    style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: '0.88rem', 
                      color: INK60, 
                      textDecoration: 'none', 
                      transition: 'color 0.2s' 
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = INK}
                    onMouseLeave={e => e.currentTarget.style.color = INK60}>
                    {l}
                  </Link>
                </div>
              );
            })}
          </div>
          
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: INK, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services</h4>
            {['Digital Marketing', 'Web Development', 'SEO', 'Performance Marketing', 'Social Media Marketing'].map(l => (
              <div key={l} style={{ marginBottom: '0.6rem' }}>
                <Link 
                  href="/services" 
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontSize: '0.88rem', 
                    color: INK60, 
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = INK}
                  onMouseLeave={e => e.currentTarget.style.color = INK60}>
                  {l}
                </Link>
              </div>
            ))}
          </div>
          
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: INK, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
            {[
              { icon: '📍', text: '10th Floor, Concord Tower, Media City, Dubai' },
              { icon: '📞', text: '+971545255889' },
              { icon: '💬', text: '+971545255889' },
              { icon: '✉️', text: 'info@socio.ae' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '0.05rem' }}>{c.icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: INK60, lineHeight: 1.5 }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ borderTop: `1px solid ${INK10}`, paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: INK30 }}>Copyright ©2026 Socio | MCS Marketing</p>
        </div>
      </div>
    </footer>
  );
}