import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { MagneticBtn } from '../components/home/MagneticBtn';

const PINK = '#B2278C';
const PINK_LIGHT = 'rgba(178, 39, 140, 0.08)';
const PINK_MID = 'rgba(178, 39, 140, 0.18)';
const WHITE = '#FFFFFF';
const INK = '#111111';
const INK60 = 'rgba(17, 17, 17, 0.6)';
const INK10 = 'rgba(17, 17, 17, 0.1)';
const OFF_WHITE = '#F9F9F9';
const GRAD_HERO = 'radial-gradient(circle at 70% 30%, rgba(178,39,140,0.08) 0%, #FFFFFF 70%)';

export default function Contact() {
  const heroRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      heroRef.current?.children || [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '0c42db5a-cf77-47e0-a73f-6330f679efad',
          subject: `New Inquiry from ${form.name} — ${form.service || 'General'}`,
          from_name: form.name,
          ...form,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.25rem',
    background: OFF_WHITE,
    border: `1px solid ${INK10}`,
    borderRadius: '12px',
    color: INK,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: INK,
  };

  return (
    <div style={{ background: WHITE }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-form-container { padding: 1.5rem !important; }
          .contact-hero-title { font-size: 2rem !important; }
          .contact-hero-desc { font-size: 0.9rem !important; }
        }
        .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
        @media (min-width: 640px) { .container { padding: 0 1.5rem; } }
        @media (min-width: 1024px) { .container { padding: 0 2rem; } }
        .section-label {
          display: inline-block; color: ${PINK}; font-weight: 700;
          letter-spacing: 0.12em; font-size: 0.72rem; font-family: 'Syne', sans-serif;
          margin-bottom: 1rem; background: ${PINK_LIGHT}; border: 1px solid ${PINK_MID};
          padding: 0.3rem 0.9rem; border-radius: 4px;
        }
        .section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800; color: ${INK}; margin-bottom: 1.5rem; line-height: 1.2;
        }
        .section-desc {
          color: ${INK60}; font-size: clamp(0.9rem, 2vw, 1rem);
          line-height: 1.7; font-family: 'DM Sans', sans-serif; max-width: 600px;
        }
      `}</style>

      <section style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(100px, 15vh, 120px)',
        paddingBottom: 'clamp(2rem, 5vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
        background: GRAD_HERO,
      }}>
        <div style={{ position: 'absolute', width: 'min(600px, 80vw)', height: 'min(600px, 80vw)', borderRadius: '50%', background: `radial-gradient(circle, ${PINK_LIGHT} 0%, transparent 70%)`, top: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 'min(500px, 70vw)', height: 'min(500px, 70vw)', borderRadius: '50%', background: `radial-gradient(circle, ${PINK_MID} 0%, transparent 70%)`, bottom: '5%', left: '-5%', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div ref={heroRef} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <span className="section-label">Let's Talk</span>
            <h1 className="section-title contact-hero-title" style={{ marginBottom: '1.5rem' }}>
              Ready to scale your<br />
              <span style={{ color: PINK }}>business?</span>
            </h1>
            <p className="section-desc contact-hero-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
              Book a free 30-minute growth call and we'll show you exactly how we'd grow your UAE business.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem, 6vw, 4rem) 0 clamp(3rem, 8vw, 6rem)', background: WHITE }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 400px) 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }} className="contact-grid">

            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)', color: INK }}>
                Contact Information
              </h2>
              {[
                { icon: <Mail size={20} />, label: 'Email', value: 'admin@mediaminddigital.ae' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+971 55 117 1721' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Dubai, UAE' },
                { icon: <Clock size={20} />, label: 'Response Time', value: 'Within 24 hours' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 'clamp(0.75rem, 3vw, 1rem)', marginBottom: '1.5rem',
                  padding: 'clamp(1rem, 3vw, 1.25rem)', background: OFF_WHITE,
                  border: `1px solid ${INK10}`, borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = PINK; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = INK10; }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${PINK}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: PINK, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ color: PINK, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem', fontFamily: "'DM Sans', sans-serif" }}>{c.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: INK, fontSize: '0.95rem', wordBreak: 'break-word' }}>{c.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2rem', padding: 'clamp(1.25rem, 3vw, 1.5rem)', background: OFF_WHITE, border: `1px solid ${INK10}`, borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = PINK; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = INK10; }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: '0.5rem', color: PINK, fontSize: '1rem' }}>🎁 Free Growth Call</div>
                <p style={{ color: INK60, fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                  Every new inquiry gets a free 30-minute strategy session. No sales pressure — just genuine advice on how to grow your UAE business online.
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', padding: 'clamp(1.25rem, 3vw, 1.5rem)', background: OFF_WHITE, border: `1px solid ${INK10}`, borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = PINK; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = INK10; }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: '1rem', color: INK, fontSize: '0.9rem' }}>Trusted by 200+ UAE Brands</div>
                {['$50M+ Revenue Generated', 'Social Media, Ads, Web & NFC', 'Dubai-based, worldwide reach'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Check size={14} color={PINK} />
                    <span style={{ color: INK60, fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: WHITE, border: `1px solid ${INK10}`, borderRadius: '24px',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', transition: 'all 0.3s ease',
            }} className="contact-form-container">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'clamp(2rem, 8vw, 3rem) 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.3rem, 4vw, 1.5rem)', marginBottom: '1rem', color: INK }}>Message sent!</h3>
                  <p style={{ color: INK60, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                    Thanks for reaching out. We'll be in touch within 24 hours to schedule your free growth call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem, 4vw, 1.3rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)', color: INK }}>
                    Tell us about your project
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input required style={inputStyle} placeholder="John Smith" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = PINK}
                        onBlur={e => e.target.style.borderColor = INK10} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input required type="email" style={inputStyle} placeholder="john@company.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = PINK}
                        onBlur={e => e.target.style.borderColor = INK10} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Company</label>
                    <input style={inputStyle} placeholder="Your Company" value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = PINK}
                      onBlur={e => e.target.style.borderColor = INK10} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                    <div>
                      <label style={labelStyle}>Service Needed</label>
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = PINK}
                        onBlur={e => e.target.style.borderColor = INK10}>
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
                      <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = PINK}
                        onBlur={e => e.target.style.borderColor = INK10}>
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
                      onFocus={e => e.target.style.borderColor = PINK}
                      onBlur={e => e.target.style.borderColor = INK10} />
                  </div>

                  {error && (
                    <p style={{ color: '#c0392b', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                      {error}
                    </p>
                  )}

                  <MagneticBtn
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: loading ? INK60 : INK,
                      color: WHITE,
                      borderRadius: '50px',
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Sending…' : <>Send Message & Book Free Call <ArrowUpRight size={16} /></>}
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