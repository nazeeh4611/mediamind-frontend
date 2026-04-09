import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { OFF_WHITE, WHITE, INK, INK60, INK10 } from '../../utils/constants';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.innerWidth <= 768) {
      const left = sectionRef.current.querySelector('.contact-left');
      const right = sectionRef.current.querySelector('.contact-right');
      if (left) left.style.opacity = 1;
      if (right) right.style.opacity = 1;
      return;
    }
    const left = sectionRef.current.querySelector('.contact-left');
    const right = sectionRef.current.querySelector('.contact-right');
    gsap.fromTo(
      [left, right],
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
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
          subject: `New Project Inquiry from ${form.name}`,
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

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a3a6b 0%, #0f2347 100%)', zIndex: 0 }} />
      <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 C360,100 1080,0 1440,80 L1440,0 Z" fill={OFF_WHITE} />
      </svg>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: isMobile ? '6rem 1.25rem 3rem' : '8rem 2rem 5rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
        <div className="contact-left" style={{ opacity: 0 }}>
          <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.6rem' }}>📁</div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3.5rem)', color: WHITE, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Have a project<br />in mind? 👋
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '1rem' }}>Connect with our team of dazzling designers and creative developers.</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)' }}>Catch us for coffee, it's always on us ☕</p>
        </div>

        <div className="contact-right" style={{ opacity: 0 }}>
          {submitted ? (
            <div style={{ background: WHITE, borderRadius: 24, padding: isMobile ? '1.75rem 1.25rem' : '2.5rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.75rem', color: INK }}>Message sent!</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: INK60, lineHeight: 1.7 }}>
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div style={{ background: WHITE, borderRadius: 24, padding: isMobile ? '1.75rem 1.25rem' : '2.5rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {[{ label: 'Name*', key: 'name', placeholder: 'Jane Smith', type: 'text' }, { label: 'Email*', key: 'email', placeholder: 'jane@gmail.com', type: 'email' }].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: INK, marginBottom: '0.4rem' }}>{f.label}</label>
                      <input required={f.label.includes('*')} type={f.type} placeholder={f.placeholder} value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${INK10}`, borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK, background: OFF_WHITE, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: INK, marginBottom: '0.4rem' }}>Phone*</label>
                    <div style={{ display: 'flex', border: `1px solid ${INK10}`, borderRadius: 10, overflow: 'hidden', background: OFF_WHITE }}>
                      <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.75rem', gap: '0.3rem', borderRight: `1px solid ${INK10}` }}>
                        <span>🇦🇪</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: INK60 }}>+971</span>
                      </div>
                      <input type="tel" placeholder="+971" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={{ flex: 1, padding: '0.75rem', border: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK, outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: INK, marginBottom: '0.4rem' }}>Website</label>
                    <input type="url" placeholder="www.example.com" value={form.website}
                      onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${INK10}`, borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK, background: OFF_WHITE, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: INK, marginBottom: '0.4rem' }}>Message</label>
                  <textarea rows={4} placeholder="Enter your message" value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${INK10}`, borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: INK, background: OFF_WHITE, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                </div>

                {error && (
                  <p style={{ color: '#c0392b', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '1rem', background: loading ? '#555' : INK, color: WHITE, border: 'none', borderRadius: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#333'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = INK; }}>
                  {loading ? 'Sending…' : 'Submit'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}