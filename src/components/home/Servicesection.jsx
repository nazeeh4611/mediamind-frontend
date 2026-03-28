import React, { useState, useEffect, useRef } from "react";

const IconBadge = ({ children, bg = "#111" }) => (
  <div style={{
    width: 44, height: 44, borderRadius: 12, background: bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "0.6rem", flexShrink: 0,
  }}>
    {children}
  </div>
);

const NfcIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2" />
      <path d="M7 10h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8c1.5 1.5 1.5 6.5 0 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 6c2.5 2.5 2.5 9.5 0 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconBadge>
);

const SeoIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke="#fff" strokeWidth="2" />
      <path d="M15.5 15.5L20 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 10h6M10 7v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  </IconBadge>
);

const LogoDesignIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 16L14.5 5.5C15.3 4.7 16.7 4.7 17.5 5.5C18.3 6.3 18.3 7.7 17.5 8.5L7 19L4 20L5 17Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" stroke="#fff" strokeWidth="2" />
    </svg>
  </IconBadge>
);

const MailIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconBadge>
);

const SocialIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="2.5" fill="#fff" />
      <circle cx="6" cy="12" r="2.5" fill="#fff" />
      <circle cx="18" cy="19" r="2.5" fill="#fff" />
      <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke="#fff" strokeWidth="1.8" />
    </svg>
  </IconBadge>
);

const BrandIcon = () => (
  <IconBadge>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 4L8.47 12.23 3 8.26h6.91L12 2z" fill="#fff" />
    </svg>
  </IconBadge>
);

const CodeIcon = () => (
  <IconBadge>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconBadge>
);

const MOBILE_CARD_H = 390;

export function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };
  const onTouchEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent(p => Math.min(mobileSlides.length - 1, p + 1));
    else if (diff < -40) setCurrent(p => Math.max(0, p - 1));
  };

  const mobileSlides = [
    {
      id: 'nfc',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#c8c8f2", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "62%", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 1rem" }}>
            <svg style={{ position: "absolute", top: 12, left: 12, opacity: 0.4, width: "120px" }} viewBox="0 0 230 120" fill="none">
              <path d="M10 60 Q55 -5 115 60 Q175 125 220 60" stroke="#F5A623" strokeWidth="5" fill="none" />
            </svg>
            <img src="/nfcsrvc.avif" alt="NFC" style={{ height: "95%", width: "auto", maxWidth: "60%", objectFit: "contain", position: "relative", zIndex: 2 }} />
          </div>
          <div style={{ padding: "1rem 1.25rem 1.25rem", position: "relative", zIndex: 2 }}>
            <NfcIcon />
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.35rem" }}>Turn every tap into a new business opportunity.</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#444", lineHeight: 1.5 }}>Smart NFC solutions that help you grow your network.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'seo',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#c8c8f2", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "62%", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 1rem" }}>
            <svg style={{ position: "absolute", top: 12, left: 12, opacity: 0.4, width: "120px" }} viewBox="0 0 230 120" fill="none">
              <path d="M10 60 Q55 -5 115 60 Q175 125 220 60" stroke="#F5A623" strokeWidth="5" fill="none" />
            </svg>
            <img src="/seohome.avif" alt="SEO" style={{ height: "95%", width: "auto", maxWidth: "60%", objectFit: "contain", position: "relative", zIndex: 2 }} />
          </div>
          <div style={{ padding: "1rem 1.25rem 1.25rem", position: "relative", zIndex: 2 }}>
            <SeoIcon />
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.35rem" }}>Turn Traffic into Customers with SEO That Performs!</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#444", lineHeight: 1.5 }}>Boost your website visibility using our proven SEO methods.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'web',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#f1f0f5", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <CodeIcon />
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.5rem" }}>Website Development That Attracts Customers.</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>We infuse your ideas with innovation and reliability, ensuring your website exceeds all expectations.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingTop: "0.75rem" }}>
            <img src="/webhome.avif" alt="Web Dev" style={{ width: "75%", height: "auto", objectFit: "contain", maxHeight: "200px" }} />
          </div>
        </div>
      ),
    },
    {
      id: 'social',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#a9a6e8", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, borderRadius: "18px", overflow: "hidden", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", marginBottom: "0.75rem" }}>
            <img src="/socialhome.avif" alt="Social Media" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <SocialIcon />
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d", lineHeight: 1.3 }}>Simplify your Social Media Management.</h3>
        </div>
      ),
    },
    {
      id: 'brand',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#e8d84a", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, borderRadius: "18px", overflow: "hidden", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginBottom: "0.75rem" }}>
            <img src="/branhome.avif" alt="Branding" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <BrandIcon />
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d", lineHeight: 1.3 }}>It's time to revamp your Branding.</h3>
        </div>
      ),
    },
    {
      id: 'digi',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#f5c4d8", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, borderRadius: "18px", overflow: "hidden", background: "rgba(0,0,0,0.05)", marginBottom: "0.75rem" }}>
            <img src="/digihome.avif" alt="Digital Marketing" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.6rem" }}>Explore all our digital Marketing Services</h3>
          <button className="learn-btn" style={{ alignSelf: "flex-start" }}>Learn More</button>
        </div>
      ),
    },
    {
      id: 'mail',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#f5ece0", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, borderRadius: "16px", overflow: "hidden", background: "rgba(0,0,0,0.04)", marginBottom: "0.75rem" }}>
            <img src="/mailhome.avif" alt="Email" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          </div>
          <MailIcon />
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#c84b1e" }}>Reach inbox. Drive results.</h3>
        </div>
      ),
    },
    {
      id: 'logo',
      el: (
        <div style={{ height: MOBILE_CARD_H, background: "#b6e8f2", borderRadius: 28, padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, borderRadius: "16px", overflow: "hidden", background: "rgba(196,219,231,1)", marginBottom: "0.75rem" }}>
            <img src="/logohome.avif" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left", display: "block" }} />
          </div>
          <LogoDesignIcon />
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0d0d0d" }}>Design a logo that speaks your brand</h3>
        </div>
      ),
    },
  ];

  const totalSlides = mobileSlides.length;

  return (
    <section style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: "#fff", padding: isMobile ? "3rem 0 4rem" : "5rem 0 6rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap');
        .srv-card { transition: transform 0.3s cubic-bezier(0.22, 0.68, 0, 1.2), box-shadow 0.3s ease; }
        .srv-card:hover { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.12) !important; }
        .learn-btn { display: inline-block; background: #7B5CF0; color: #fff; border: none; border-radius: 50px; padding: 9px 22px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.25s ease; }
        .learn-btn:hover { background: #6344d6; transform: translateY(-2px); }
        .cta-btn { position: relative; display: inline-flex; align-items: center; width: 260px; height: 62px; border: 1.5px solid #111; border-radius: 999px; background: #fff; color: #111; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 0.95rem; cursor: pointer; overflow: hidden; padding: 0; z-index: 1; transition: color 0.45s ease; }
        .cta-btn::before { content: ''; position: absolute; left: 7px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 999px; background: #111; transition: width 0.55s cubic-bezier(0.19,1,0.22,1), height 0.55s cubic-bezier(0.19,1,0.22,1), left 0.55s cubic-bezier(0.19,1,0.22,1); z-index: 1; }
        .cta-btn:hover::before { left: 0; width: 100%; height: 100%; }
        .cta-btn:hover { color: #fff; }
        .cta-arrow { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; flex-shrink: 0; margin-left: 7px; transition: transform 0.45s cubic-bezier(0.19,1,0.22,1), margin 0.55s cubic-bezier(0.19,1,0.22,1); }
        .cta-btn:hover .cta-arrow { transform: rotate(45deg); margin-left: 16px; }
        .cta-label { position: relative; z-index: 2; flex: 1; text-align: center; padding-right: 10px; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "4rem", padding: "0 1.25rem" }}>
        <div style={{ display: "inline-block", border: "1px solid #e0e0e0", borderRadius: 20, padding: "5px 18px", fontSize: "0.75rem", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#888", marginBottom: "0.85rem" }}>Featured</div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 6vw, 4rem)", color: "#0d0d0d", lineHeight: 1.2, marginBottom: "0.6rem" }}>Our Services</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", color: "#999" }}>Reaching the right audience has never been simpler.</p>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.25rem" }}>

        {isMobile ? (
          <div style={{ width: "100%" }}>
            <div
              style={{ width: "100%", overflow: "hidden", borderRadius: 28, touchAction: "pan-y" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div style={{
                display: "flex",
                width: `${totalSlides * 100}%`,
                transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: `translateX(${(-current * 100) / totalSlides}%)`,
                willChange: "transform",
              }}>
                {mobileSlides.map((slide, i) => (
                  <div key={slide.id} style={{ width: `${100 / totalSlides}%`, flexShrink: 0 }}>
                    {slide.el}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.45rem", marginTop: "1rem" }}>
              {mobileSlides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? "#111" : "#e0e0e0",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr 1fr" : "1.05fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div className="srv-card" style={{ background: "#c8c8f2", borderRadius: 36, overflow: "hidden", height: 520, display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "68%", overflow: "hidden" }}>
                  <svg style={{ position: "absolute", top: "20px", left: "20px", opacity: 0.5, width: "200px" }} viewBox="0 0 230 120" fill="none">
                    <path d="M10 60 Q55 -5 115 60 Q175 125 220 60" stroke="#F5A623" strokeWidth="5" fill="none" />
                    <path d="M20 80 Q70 25 135 80" stroke="#9b8de8" strokeWidth="3" fill="none" />
                  </svg>
                  <img src="/nfcsrvc.avif" alt="NFC" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "88%", width: "auto", objectFit: "contain", zIndex: 2 }} />
                </div>
                <div style={{ padding: "1.5rem 2rem 2rem", position: "relative", zIndex: 2 }}>
                  <NfcIcon />
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.5rem" }}>Turn every tap into a new business opportunity.</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#444", lineHeight: 1.5 }}>From smart business cards to seamless customer engagement, our NFC solutions help you grow your network and scale your business faster.</p>
                </div>
              </div>

              <div className="srv-card" style={{ background: "#c8c8f2", borderRadius: 36, overflow: "hidden", height: 520, display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "68%", overflow: "hidden" }}>
                  <svg style={{ position: "absolute", top: "20px", left: "20px", opacity: 0.5, width: "200px" }} viewBox="0 0 230 120" fill="none">
                    <path d="M10 60 Q55 -5 115 60 Q175 125 220 60" stroke="#F5A623" strokeWidth="5" fill="none" />
                    <path d="M20 80 Q70 25 135 80" stroke="#9b8de8" strokeWidth="3" fill="none" />
                  </svg>
                  <img src="/seohome.avif" alt="SEO" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "88%", width: "auto", objectFit: "contain", zIndex: 2 }} />
                </div>
                <div style={{ padding: "1.5rem 2rem 2rem", position: "relative", zIndex: 2 }}>
                  <SeoIcon />
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.5rem" }}>Turn Traffic into Customers with SEO That Performs!</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#444", lineHeight: 1.5 }}>Boost your website visibility using our proven SEO methods.</p>
                </div>
              </div>
            </div>

            <div className="srv-card" style={{ background: "#f1f0f5", borderRadius: 36, padding: "3.5rem", marginBottom: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", height: 460, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
              <div>
                <CodeIcon />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "1rem" }}>Website Development That Attracts Customers.</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#666", lineHeight: 1.6 }}>We infuse your ideas with a touch of innovation and reliability, ensuring that your website exceeds all expectations.</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/webhome.avif" alt="Web Dev" style={{ width: "100%", maxWidth: "460px", height: "auto", objectFit: "contain" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
              <div className="srv-card" style={{ background: "#a9a6e8", borderRadius: 36, padding: "1.5rem", height: 460, display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ flex: 1, borderRadius: "22px", overflow: "hidden", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginBottom: "0.75rem" }}>
                  <img src="/socialhome.avif" alt="Social Media" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <SocialIcon />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0d0d0d", lineHeight: 1.3 }}>Simplify your Social Media Management.</h3>
              </div>

              <div className="srv-card" style={{ background: "#e8d84a", borderRadius: 36, padding: "1.5rem", height: 460, display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ flex: 1, borderRadius: "22px", overflow: "hidden", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", marginBottom: "0.75rem" }}>
                  <img src="/branhome.avif" alt="Branding" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <BrandIcon />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0d0d0d", lineHeight: 1.3 }}>It's time to revamp your Branding.</h3>
              </div>

              <div className="srv-card" style={{ background: "#f5c4d8", borderRadius: 36, padding: "1.5rem", height: 460, display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ flex: 1, borderRadius: "22px", overflow: "hidden", background: "rgba(0,0,0,0.05)", marginBottom: "0.75rem" }}>
                  <img src="/digihome.avif" alt="Digital Marketing" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0d0d0d", lineHeight: 1.3, marginBottom: "0.75rem" }}>Explore all our digital Marketing Services</h3>
                <button className="learn-btn" style={{ alignSelf: "flex-start" }}>Learn More</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div className="srv-card" style={{ background: "#f5ece0", borderRadius: 36, padding: "1.5rem", height: 380, display: "flex", flexDirection: "column", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
                <div style={{ flex: 1, borderRadius: "20px", overflow: "hidden", background: "rgba(0,0,0,0.04)", marginBottom: "0.75rem" }}>
                  <img src="/mailhome.avif" alt="Email" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
                <MailIcon />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#c84b1e" }}>Reach inbox. Drive results.</h3>
              </div>

              <div className="srv-card" style={{ background: "#b6e8f2", borderRadius: 36, padding: "1.5rem", height: 380, display: "flex", flexDirection: "column", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
                <div style={{ flex: 1, borderRadius: "20px", overflow: "hidden", background: "rgba(196,219,231,1)", marginBottom: "0.75rem" }}>
                  <img src="/logohome.avif" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left", display: "block" }} />
                </div>
                <LogoDesignIcon />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0d0d0d" }}>Design a logo that speaks your brand</h3>
              </div>
            </div>
          </>
        )}

        <div style={{ background: "#f5f0c6", borderRadius: isMobile ? 24 : 36, padding: isMobile ? "2.5rem 1.5rem" : "5rem 3rem", textAlign: "center", marginTop: isMobile ? "1.25rem" : 0 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 5vw, 2.8rem)", color: "#0d0d0d", lineHeight: 1.25, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Innovative solutions for{" "}
            <em style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontStyle: "italic", fontWeight: 500, color: "#B2278C" }}>bold brands</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.85rem, 2.5vw, 1rem)", color: "#777", maxWidth: 560, margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable.
          </p>
          <button className="cta-btn">
            <span className="cta-arrow">
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="cta-label">Let's craft together</span>
          </button>
        </div>
      </div>
    </section>
  );
}