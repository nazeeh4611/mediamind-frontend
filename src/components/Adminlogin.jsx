import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './Admincontext';

export default function AdminLogin() {
  const { login, admin } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (admin) navigate('/admin/dashboard');
  }, [admin, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .al-input { 
          width: 100%; 
          padding: 0.85rem 1rem; 
          background: rgba(255,255,255,0.04); 
          border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 12px; 
          color: #fff; 
          font-size: 0.95rem;
          outline: none; 
          transition: all 0.25s; 
        }
        .al-input:focus { 
          border-color: rgba(178,39,140,0.6); 
          background: rgba(178,39,140,0.05); 
          box-shadow: 0 0 0 3px rgba(178,39,140,0.1); 
        }
        .al-input::placeholder { 
          color: #444; 
        }
        .al-btn { 
          width: 100%; 
          padding: 0.9rem; 
          background: #B2278C; 
          color: #fff; 
          border: none; 
          border-radius: 12px; 
          font-weight: 500; 
          font-size: 0.95rem; 
          cursor: pointer; 
          transition: all 0.25s; 
          position: relative; 
          overflow: hidden; 
        }
        .al-btn:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 12px 32px rgba(178,39,140,0.4); 
        }
        .al-btn:disabled { 
          opacity: 0.6; 
          cursor: not-allowed; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        @keyframes orb { 
          0%,100%{transform:translate(0,0) scale(1)} 
          33%{transform:translate(30px,-20px) scale(1.1)} 
          66%{transform:translate(-20px,30px) scale(0.9)} 
        }
      `}</style>

      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,39,140,0.12), transparent 70%)', animation: 'orb 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,94,167,0.1), transparent 70%)', animation: 'orb 10s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '16px', background: 'rgba(178,39,140,0.15)', border: '1px solid rgba(178,39,140,0.3)', marginBottom: '1.25rem', fontSize: '1.5rem' }}>
            🔐
          </div>
          <h1 style={{ fontWeight: 600, fontSize: '1.75rem', color: '#fff', marginBottom: '0.4rem' }}>Admin Portal</h1>
          <p style={{ color: '#555', fontSize: '0.88rem' }}>Media Mind Digital · Internal</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem', backdropFilter: 'blur(20px)' }}>
          {error && (
            <div style={{ padding: '0.8rem 1rem', background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.25)', borderRadius: '10px', color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#888', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</label>
              <input className="al-input" type="email" placeholder="admin@mediamind.ae" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', color: '#888', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="al-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} autoComplete="current-password" style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1rem', padding: '0.25rem' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button className="al-btn" type="submit" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Signing in…
                </span>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#333', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Media Mind Digital © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}