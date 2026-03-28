import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Code2, Search, Share2, Sparkles, Zap, Globe } from 'lucide-react';
import { AnimatedScribbleLine } from './AnimatedScribbleLine';
import { INK, INK60, INK10, OFF_WHITE, WHITE } from '../../utils/constants';

export function BentoServicesSection({ onEnterBtn, onLeaveBtn }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(cards, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '6rem 0', background: WHITE, position: 'relative', overflow: 'hidden' }}>
      <AnimatedScribbleLine />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block', padding: '0.25rem 0.9rem',
            border: `1px solid ${INK10}`, borderRadius: 50,
            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: INK60,
            background: OFF_WHITE, marginBottom: '0.75rem',
          }}>What We Do</span>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: INK, letterSpacing: '-0.03em' }}>
            Everything your brand needs
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: INK60, marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0' }}>
            From strategy to execution, we cover every dimension of digital growth.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: '1.25rem',
        }}>
          {/* Add all bento cards here - I'm showing one as example */}
          <motion.div
            className="bento-card"
            whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #fde8d8 0%, #fcd5b8 100%)',
              borderRadius: 28,
              overflow: 'hidden',
              opacity: 0,
              minHeight: 490,
              position: 'relative',
              cursor: 'pointer',
              border: `1px solid ${INK10}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '140px',
              overflow: 'hidden',
            }}>
            
               <img
                src="/webman.avif"
                alt="Google Ads"
                style={{
                  width: '75%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                }}
                loading="lazy"
              />
            </div>
            <div style={{
              position: 'relative', zIndex: 2,
              padding: '1.75rem 2rem',
              background: 'linear-gradient(to top, rgba(253,232,216,0.98) 60%, transparent)',
            }}>
             
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 800,
                fontSize: '1.3rem', color: INK, lineHeight: 1.25, marginBottom: '0.5rem',
              }}>
              We build websites that grow your business.
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: INK60, lineHeight: 1.65,
              }}>
              Fast, scalable, and designed for results.
              </p>
            </div>
          </motion.div>


          

          {/* Add remaining bento cards similarly */}
          <motion.div
            className="bento-card"
            whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: 28,
              overflow: 'hidden',
              opacity: 0,
              minHeight: 420,
              position: 'relative',
              cursor: 'pointer',
              border: `1px solid ${INK10}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>

<div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '140px',
              overflow: 'hidden',
            }}>
              <img
                src="/nfcmain copy.avif"
                alt="Google Ads"
                style={{
                  width: '75%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                }}
                loading="lazy"
              />
            </div>
            <div style={{
              position: 'relative', zIndex: 2,
              padding: '1.75rem 2rem',
            }}>
             
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 800,
                fontSize: '1.3rem', color: INK, lineHeight: 1.25, marginBottom: '0.5rem',
              }}>
Streamline customer engagement with smart NFC solutions.              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: INK60, lineHeight: 1.65,
              }}>
Designed to improve connections, generate leads, and grow your business.              </p>
            </div>
            {/* Content */}
          </motion.div>

          {/* Add more cards... */}
        </div>
      </div>
    </section>
  );
}

<img
src="/webman.avif"
alt="Google Ads"
style={{
  width: '75%',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'bottom',
  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
}}
loading="lazy"
/>