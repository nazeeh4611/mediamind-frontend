import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import {MagneticBtn} from '../components/home/MagneticBtn';
import { 
  WHITE, INK, INK60, INK30, INK10, 
  OFF_WHITE, ORANGE, GRAD_HERO 
} from '../utils/constants';

export default function Contact() {
  const heroRef = useRef(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    service: '', 
    budget: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(heroRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.25rem',
    background: OFF_WHITE,
    border: `1px solid ${INK10}`,
    borderRadius: '12px',
    color: INK,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: INK,
  };

  return (
    <div style={{ background: WHITE }}>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        background: GRAD_HERO,
      }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.1) 0%,transparent 70%)', top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,.08) 0%,transparent 70%)', bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, width: '100%' }}>
          <div ref={heroRef} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <p className="section-label" style={{ marginBottom: '1rem', color: ORANGE, background: `${INK10}` }}>Let's Talk</p>
            <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Ready to scale your<br />
              <span style={{ color: ORANGE }}>business?</span>
            </h1>
            <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
              Book a free 30-minute growth call and we'll show you exactly how we'd grow your UAE business.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 400px) 1fr',
            gap: '4rem',
            alignItems: 'start',
          }} className="contact-grid">
            
            <div>
              <h2 style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 800, 
                fontSize: '1.75rem', 
                marginBottom: '2rem', 
                color: INK 
              }}>
                Contact Information
              </h2>
              
              {[
                { icon: <Mail size={20} />, label: 'Email', value: 'hello@socio.ae' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+971 50 123 4567' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Dubai, UAE' },
                { icon: <Clock size={20} />, label: 'Response Time', value: 'Within 24 hours' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  background: OFF_WHITE,
                  border: `1px solid ${INK10}`,
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = ORANGE;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = INK10;
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: `${ORANGE}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ORANGE,
                    flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ 
                      color: ORANGE, 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em', 
                      marginBottom: '0.25rem',
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {c.label}
                    </div>
                    <div style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontWeight: 600, 
                      color: INK,
                      fontSize: '0.95rem',
                    }}>
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ 
                marginTop: '2rem', 
                padding: '1.5rem', 
                background: OFF_WHITE, 
                border: `1px solid ${INK10}`, 
                borderRadius: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = ORANGE;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = INK10;
              }}>
                <div style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: 800, 
                  marginBottom: '0.5rem', 
                  color: ORANGE,
                  fontSize: '1rem',
                }}>
                  🎁 Free Growth Call
                </div>
                <p style={{ 
                  color: INK60, 
                  fontSize: '0.85rem', 
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Every new inquiry gets a free 30-minute strategy session. No sales pressure — just genuine advice on how to grow your UAE business online.
                </p>
              </div>

              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1.5rem', 
                background: OFF_WHITE, 
                border: `1px solid ${INK10}`, 
                borderRadius: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = ORANGE;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = INK10;
              }}>
                <div style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: 800, 
                  marginBottom: '1rem', 
                  color: INK,
                  fontSize: '0.9rem',
                }}>
                  Trusted by 200+ UAE Brands
                </div>
                {[
                  '$50M+ Revenue Generated',
                  'Social Media, Ads, Web & NFC',
                  'Dubai-based, worldwide reach',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Check size={14} color={ORANGE} />
                    <span style={{ color: INK60, fontSize: '0.82rem', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: WHITE,
              border: `1px solid ${INK10}`,
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              transition: 'all 0.3s ease',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ 
                    fontSize: '4rem', 
                    marginBottom: '1.5rem',
                  }}>🎉</div>
                  <h3 style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 800, 
                    fontSize: '1.5rem', 
                    marginBottom: '1rem', 
                    color: INK 
                  }}>
                    Message sent!
                  </h3>
                  <p style={{ 
                    color: INK60, 
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    Thanks for reaching out. We'll be in touch within 24 hours to schedule your free growth call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 800, 
                    fontSize: '1.3rem', 
                    marginBottom: '2rem', 
                    color: INK 
                  }}>
                    Tell us about your project
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input 
                        required 
                        style={inputStyle} 
                        placeholder="John Smith" 
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = INK10}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input 
                        required 
                        type="email" 
                        style={inputStyle} 
                        placeholder="john@company.com" 
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = INK10}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Company</label>
                    <input 
                      style={inputStyle} 
                      placeholder="Your Company" 
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = ORANGE}
                      onBlur={e => e.target.style.borderColor = INK10}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Service Needed</label>
                      <select 
                        style={{ ...inputStyle, cursor: 'pointer' }} 
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = INK10}
                      >
                        <option value="">Select service</option>
                        <option>Social Media Marketing</option>
                        <option>Website Design & Development</option>
                        <option>SEO & Google Ads</option>
                        <option>Branding & Graphic Design</option>
                        <option>Logo Design</option>
                        <option>Email Marketing</option>
                        <option>NFC Digital Business Cards</option>
                        <option>Performance Marketing</option>
                        <option>Full Package</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Monthly Budget</label>
                      <select 
                        style={{ ...inputStyle, cursor: 'pointer' }} 
                        value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = INK10}
                      >
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
                    <textarea 
                      required 
                      rows={5} 
                      style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Tell us about your business, goals, and challenges..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = ORANGE}
                      onBlur={e => e.target.style.borderColor = INK10}
                    />
                  </div>

                  <MagneticBtn
                    type="submit"
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: INK,
                      color: WHITE,
                      borderRadius: '50px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Send Message & Book Free Call <ArrowUpRight size={16} />
                  </MagneticBtn>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}