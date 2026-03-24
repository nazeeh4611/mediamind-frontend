import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FloatingOrbs from '../components/Floatingorbs';

export default function Contact() {
  const heroRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(heroRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.25rem',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid #185EA7',
    borderRadius: '12px', color: '#ffffff',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)'
  };

  const labelStyle = {
    display: 'block', marginBottom: '0.5rem',
    fontFamily: 'var(--font-display)', fontWeight: 600,
    fontSize: '0.85rem', color: '#ffffff'
  };

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        minHeight: '40vh', display: 'flex', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '2rem', position: 'relative', overflow: 'hidden',
        background: 'transparent'
      }}>
        <FloatingOrbs count={4} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: '#B2278C' }}>Let's Talk</p>
            <h1 className="section-title" style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
              Ready to scale your<br />
              <span style={{ color: '#B2278C' }}>business?</span>
            </h1>
            <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center', color: '#e0e0e0' }}>
              Book a free 30-minute growth call and we'll show you exactly how we'd grow your UAE business.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem', background: 'transparent' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 400px) 1fr',
            gap: '3rem', alignItems: 'start',
          }} className="contact-grid">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem', color: '#ffffff' }}>
                Contact Information
              </h2>
              {[
                { icon: '📧', label: 'Email', value: 'hello@mediaminddigital.com' },
                { icon: '📞', label: 'Phone', value: '+971 50 123 4567' },
                { icon: '📍', label: 'Location', value: 'Dubai, UAE' },
                { icon: '⏰', label: 'Response Time', value: 'Within 24 hours' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1rem', marginBottom: '1.5rem',
                  padding: '1.25rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid #185EA7',
                  borderRadius: '14px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ color: '#B2278C', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff' }}>{c.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid #B2278C', borderRadius: '14px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem', color: '#B2278C' }}>🎁 Free Growth Call</div>
                <p style={{ color: '#e0e0e0', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  Every new inquiry gets a free 30-minute strategy session. No sales pressure — just genuine advice on how to grow your UAE business online.
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(178,39,140,0.06)', border: '1px solid rgba(178,39,140,0.2)', borderRadius: '14px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1rem', color: '#ffffff', fontSize: '0.9rem' }}>Trusted by 15+ UAE Brands</div>
                {[
                  'AED 500K+ ROI Delivered',
                  'Social Media, Ads, Web & NFC',
                  'Dubai-based, worldwide reach',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#B2278C', fontSize: '0.75rem' }}>✓</span>
                    <span style={{ color: '#aaa', fontSize: '0.82rem' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid #185EA7',
              borderRadius: '24px', padding: '2.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>
                    Message sent!
                  </h3>
                  <p style={{ color: '#e0e0e0', lineHeight: 1.7 }}>
                    Thanks for reaching out. We'll be in touch within 24 hours to schedule your free growth call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '2rem', color: '#ffffff' }}>
                    Tell us about your project
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input required style={inputStyle} placeholder="John Smith" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = '#B2278C'}
                        onBlur={e => e.target.style.borderColor = '#185EA7'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input required type="email" style={inputStyle} placeholder="john@company.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = '#B2278C'}
                        onBlur={e => e.target.style.borderColor = '#185EA7'}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Company</label>
                    <input style={inputStyle} placeholder="Your Company" value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = '#B2278C'}
                      onBlur={e => e.target.style.borderColor = '#185EA7'}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Service Needed</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                        <option value="">Select service</option>
                        <option>Social Media Marketing</option>
                        <option>Website Design & Development</option>
                        <option>SEO & Google Ads</option>
                        <option>Branding & Graphic Design</option>
                        <option>Logo Design</option>
                        <option>Email Marketing</option>
                        <option>NFC Digital Business Cards</option>
                        <option>Full Package</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Monthly Budget</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                        <option value="">Select budget</option>
                        <option>AED 1k – 5k</option>
                        <option>AED 5k – 15k</option>
                        <option>AED 15k – 50k</option>
                        <option>AED 50k+</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Tell us about your business, goals, and challenges..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#B2278C', border: 'none', padding: '1rem' }}>
                    Send Message & Book Free Call →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}