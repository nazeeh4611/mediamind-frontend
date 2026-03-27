import React from "react";

const IconBadge = ({ children, bg = "#111" }) => (
  <div
    style={{
      width: 52,
      height: 52,
      borderRadius: 16,
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1rem",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const AdsIcon = () => (
  <IconBadge>
    <svg width="28" height="28" viewBox="0 0 192 192" fill="none">
      <path d="M96 20L60 80h28v32h16V80h28L96 20z" fill="#4285F4" />
      <path d="M60 80L20 140h36l8-28H60V80z" fill="#FBBC04" />
      <path d="M132 80v32h-24l8 28h36L132 80z" fill="#34A853" />
    </svg>
  </IconBadge>
);

const NfcIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="6"
        width="14"
        height="10"
        rx="2"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M7 10h6"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 8c1.5 1.5 1.5 6.5 0 8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 6c2.5 2.5 2.5 9.5 0 12"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </IconBadge>
);

const LogoDesignIcon = () => (
    <IconBadge>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        {/* Pencil */}
        <path
          d="M4 16L14.5 5.5C15.3 4.7 16.7 4.7 17.5 5.5C18.3 6.3 18.3 7.7 17.5 8.5L7 19L4 20L5 17Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        {/* Logo circle */}
        <circle
          cx="16"
          cy="16"
          r="3"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </IconBadge>
  );
const MailIcon = () => (
    <IconBadge>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          d="M3 7l9 6 9-6"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBadge>
  );
const SeoIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke="#fff" strokeWidth="2" />
      <path
        d="M15.5 15.5L20 20"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M7 10h6M10 7v6"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </IconBadge>
);

const CodeIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconBadge>
);

const SocialIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="2.5" fill="#fff" />
      <circle cx="6" cy="12" r="2.5" fill="#fff" />
      <circle cx="18" cy="19" r="2.5" fill="#fff" />
      <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke="#fff" strokeWidth="1.8" />
    </svg>
  </IconBadge>
);

const BrandIcon = () => (
  <IconBadge>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 4L8.47 12.23 3 8.26h6.91L12 2z"
        fill="#fff"
      />
    </svg>
  </IconBadge>
);

const MegaIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 9v6h4l6 5V4L8 9H4z" fill="#fff" />
      <path
        d="M19 5.5a8.5 8.5 0 010 13M16.5 8a5 5 0 010 8"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </IconBadge>
);

const WAIcon = () => (
  <IconBadge>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.987-1.42A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5c-2.667-1.417-4.583-3.333-6-6l1.5-1.5 1.167 2.333-.917 1.167c.583 1.167 1.833 2.417 3 3l1.167-.917L12.5 15.5l-1.5 1.5-.5-.5z"
        fill="#fff"
      />
    </svg>
  </IconBadge>
);

export function ServicesSection() {
  return (
    <section
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        background: "#fff",
        padding: "5rem 1rem 6rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap');

        .srv-section * { box-sizing: border-box; margin: 0; padding: 0; }
        .srv-card {
          transition: transform 0.3s cubic-bezier(0.22, 0.68, 0, 1.2), box-shadow 0.3s ease;
          cursor: default;
        }
        .srv-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.12) !important;
        }
        .learn-btn {
          display: inline-block;
          background: #7B5CF0;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(123, 92, 240, 0.3);
        }
        .learn-btn:hover {
          background: #6344d6;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(123, 92, 240, 0.4);
        }
        .learn-btn:active {
          transform: translateY(0px);
        }

        .cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 280px;
          height: 68px;
          border: 1.5px solid #111;
          border-radius: 999px;
          background: #fff;
          color: #111;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
          padding: 0;
          z-index: 1;
          transition: color 0.45s ease;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: #111;
          transition: width 0.55s cubic-bezier(0.19, 1, 0.22, 1),
                      height 0.55s cubic-bezier(0.19, 1, 0.22, 1),
                      left 0.55s cubic-bezier(0.19, 1, 0.22, 1),
                      border-radius 0.55s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 1;
        }

        .cta-btn:hover::before {
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 999px;
        }

        .cta-btn:hover {
          color: #fff;
        }

        .cta-arrow {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          margin-left: 7px;
          transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1),
                      margin 0.55s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .cta-btn:hover .cta-arrow {
          transform: rotate(45deg);
          margin-left: 18px;
        }

        .cta-label {
          position: relative;
          z-index: 2;
          flex: 1;
          text-align: center;
          padding-right: 12px;
          transition: padding 0.55s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .cta-btn:hover .cta-label {
          padding-right: 20px;
        }

        .seo-float {
          display: inline-block;
          animation: seo-float 4s ease-in-out infinite;
        }
        @keyframes seo-float {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-9px) rotate(-3deg); }
        }
        @keyframes sp1 {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes sp2 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        .sp1 { animation: sp1 2.4s ease-in-out infinite; }
        .sp2 { animation: sp2 2.4s ease-in-out infinite 0.9s; }
        
        @media (max-width: 1024px) {
          .srv-row3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        @media (max-width: 768px) {
          .srv-row1 { grid-template-columns: 1fr !important; }
          .srv-row2 { grid-template-columns: 1fr !important; text-align: center; padding: 2rem !important; gap: 2rem !important; }
          .srv-row3 { grid-template-columns: 1fr !important; }
          .srv-row4 { grid-template-columns: 1fr !important; }
          .srv-card { min-height: auto !important; }
          .srv-card h3 { font-size: 1.2rem !important; }
          .srv-card p { font-size: 0.9rem !important; }
          .srv-card img, .srv-card svg { max-width: 100%; height: auto; }
        }
        
        @media (max-width: 480px) {
          .srv-section .cta-btn { width: 240px; font-size: 0.9rem; }
          .srv-card { padding: 1.5rem !important; }
          .srv-card h3 { font-size: 1rem !important; }
          .seo-float { font-size: 3rem !important; }
        }
      `}</style>

      <div className="srv-section">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-block",
              border: "1px solid #e0e0e0",
              borderRadius: 20,
              padding: "6px 20px",
              fontSize: "0.8rem",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#888",
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            Featured
          </div>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              color: "#0d0d0d",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Our Services
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#999",
            }}
          >
            Reaching the right audience has never been simpler.
          </p>
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
          <div
            className="srv-row1"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "32px",
              marginBottom: "32px",
            }}
          >
            <div
              className="srv-card"
              style={{
                background: "#c8c8f2",
                borderRadius: 40,
                overflow: "hidden",
                minHeight: 560,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "420px",
                  borderRadius: "40px",
                  background: "",
                  overflow: "hidden",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: "50px",
                    opacity: 0.5,
                    width: "260px",
                  }}
                  viewBox="0 0 230 120"
                  fill="none"
                >
                  <path
                    d="M10 60 Q55 -5 115 60 Q175 125 220 60"
                    stroke="#F5A623"
                    strokeWidth="5"
                    fill="none"
                  />
                  <path
                    d="M20 80 Q70 25 135 80"
                    stroke="#9b8de8"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>

                <img
                  src="/nfcsrvc.avif"
                  alt="NFC"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "360px",
                    width: "auto",
                    objectFit: "contain",
                    zIndex: 2,
                  }}
                />
              </div>

              <div
                style={{
                  padding: "0 2rem 2rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <NfcIcon />
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                    color: "#0d0d0d",
                    lineHeight: 1.3,
                    marginBottom: "0.8rem",
                  }}
                >
                  Turn every tap into a new business opportunity.
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#444",
                    lineHeight: 1.5,
                  }}
                >
                  From smart business cards to seamless customer engagement, our NFC solutions help you grow your network and scale your business faster.
                </p>
              </div>
            </div>

            <div
              className="srv-card"
              style={{
                background: "#c8c8f2",
                borderRadius: 40,
                overflow: "hidden",
                minHeight: 560,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "420px",
                  borderRadius: "40px",
                  background: "",
                  overflow: "hidden",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: "50px",
                    opacity: 0.5,
                    width: "260px",
                  }}
                  viewBox="0 0 230 120"
                  fill="none"
                >
                  <path
                    d="M10 60 Q55 -5 115 60 Q175 125 220 60"
                    stroke="#F5A623"
                    strokeWidth="5"
                    fill="none"
                  />
                  <path
                    d="M20 80 Q70 25 135 80"
                    stroke="#9b8de8"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>

                <img
                  src="/seohome.avif"
                  alt="SEO"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "360px",
                    width: "auto",
                    objectFit: "contain",
                    zIndex: 2,
                  }}
                />
              </div>

              <div
                style={{
                  padding: "0 2rem 2rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <SeoIcon />
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                    color: "#0d0d0d",
                    lineHeight: 1.3,
                    marginBottom: "0.8rem",
                  }}
                >
                  Turn Traffic into Customers with SEO That Performs!
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#444",
                    lineHeight: 1.5,
                  }}
                >
                  Boost your website visibility using our proven SEO methods.
                </p>
              </div>
            </div>
          </div>

          <div
            className="srv-card srv-row2"
            style={{
              background: "#f1f0f5",
              borderRadius: 40,
              padding: "4rem",
              marginBottom: "32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
              minHeight: 520,
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <CodeIcon />
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  color: "#0d0d0d",
                  lineHeight: 1.3,
                  marginBottom: "1rem",
                  marginTop: "0.5rem",
                }}
              >
                Website Development
                <br />
                That Attracts Customers.
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "#666",
                  lineHeight: 1.6,
                  maxWidth: "520px",
                }}
              >
                We infuse your ideas with a touch of innovation and reliability,
                ensuring that your website exceeds all expectations.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/webhome.avif"
                alt="service"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div
            className="srv-row3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              marginBottom: "32px",
            }}
          >
<div
  className="srv-card"
  style={{
    background: "#a9a6e8",
    borderRadius: 40,
    padding: "1.5rem",
    minHeight: 420,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    position: "relative",
  }}
>
  {/* Image Section */}
  <div
    style={{
      position: "relative",
      height: "360px", 
      marginBottom: "1rem",
      borderRadius: "24px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    }}
  >
    <img
      src="/socialhome.avif"
      alt="Social Media Management"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain", // IMPORTANT (shows full image)
      }}
    />
  </div>

  <SocialIcon />

  <h3
    style={{
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: 700,
      fontSize: "1.1rem",
      color: "#0d0d0d",
      lineHeight: 1.3,
      marginTop: "0.5rem",
    }}
  >
    Simplify your Social Media Management.
  </h3>
</div>
<div
  className="srv-card"
  style={{
    background: "#e8d84a",
    borderRadius: 40,
    padding: "2rem",
    minHeight: 480,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  }}
>
  <div
    style={{
      position: "relative",
      height: "360px", // increased image area
      marginBottom: "1rem",
      borderRadius: "24px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
    }}
  >
    <img
      src="/branhome.avif"
      alt="Branding Services"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain", // shows full image
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>

  <BrandIcon />

  <h3
    style={{
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: 700,
      fontSize: "1.1rem",
      color: "#0d0d0d",
      lineHeight: 1.3,
      marginBottom: "0.8rem",
      marginTop: "0.5rem",
    }}
  >
    It's time to revamp your Branding.
  </h3>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "auto",
    }}
  >

  </div>
</div>
            <div
              className="srv-card"
              style={{
                background: "#f5c4d8",
                borderRadius: 40,
                padding: "2rem",
                minHeight: 480,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "360px",
                  marginBottom: "1rem",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/digihome.avif"
                  alt="Digital Marketing Services"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#0d0d0d",
                  lineHeight: 1.3,
                  marginBottom: "0.8rem",
                }}
              >
                Explore all our digital Marketing Services
              </h3>
              <button className="learn-btn" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                Learn More
              </button>
              <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <svg width="80" height="80" viewBox="0 0 95 95" fill="none">
                  <path
                    d="M8 87 Q38 52 72 12"
                    stroke="#d97553"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
  className="srv-row4"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "24px",
  }}
>
  {/* Card 1 */}
  <div
    className="srv-card"
    style={{
      background: "#f5ece0",
      borderRadius: 32,
      padding: "1.5rem",
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    }}
  >
    <div
      style={{
        height: "250px",
        marginBottom: "12px",
        borderRadius: "18px",
        overflow: "hidden",
        background: "rgba(0,0,0,0.05)",
      }}
    >
   <img
  src="/mailhome.avif"
  alt="Public Relations"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",   // FIX
    display: "block",
  }}
/>
    </div>

    <MailIcon />

    <h3
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#c84b1e",
        marginTop: "6px",
        marginBottom: "6px",
      }}
    >
Reach inbox. Drive results.    </h3>


  </div>

  {/* Card 2 */}
  <div
    className="srv-card"
    style={{
      background: "#b6e8f2",
      borderRadius: 32,
      padding: "1.5rem",
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    }}
  >
    <div
       style={{
        height: "250px",
        marginBottom: "12px",
        borderRadius: "18px",
        overflow: "hidden",
        background: "rgba(196, 219, 231)",
      }}
    >
      <img
        src="/logohome.avif"
        alt="Logo Designing"
        style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",  
            objectPosition: "left",   // <-- ADD THIS            // FIX
            display: "block",
        }}
      />
    </div>

    <LogoDesignIcon/>

    <h3
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#0d0d0d",
        marginTop: "6px",
      }}
    >
Design a logo that speaks your brand    </h3>
  </div>
</div>

          <div
            style={{
              background: "#f5f0c6",
              borderRadius: 40,
              padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 3rem)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
                color: "#0d0d0d",
                lineHeight: 1.25,
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Innovative solutions for{" "}
              <em
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#B2278C",
                }}
              >
                bold brands
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                color: "#777",
                maxWidth: 560,
                margin: "0 auto 2rem",
                lineHeight: 1.6,
              }}
            >
              Looking to elevate your brand? We craft immersive experiences that
              captivate, engage, and make your business unforgettable in every
              interaction.
            </p>

            <button className="cta-btn">
              <span className="cta-arrow">
                <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H5M12 2v7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="cta-label">Let's craft together</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}