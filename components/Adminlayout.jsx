"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from './Admincontext';

const NAV = [
  { to: '/admin/dashboard', icon: '▦', label: 'Dashboard' },
  { to: '/admin/works', icon: '◈', label: 'Works' },
  { to: '/admin/works/new', icon: '+', label: 'Add Work' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); router.push('/admin/login'); };

  const initials = admin?.name ? admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'A';

  const isActive = (path) => {
    if (path === '/admin/dashboard') return pathname === path;
    if (path === '/admin/works/new') return pathname === path;
    return pathname.startsWith(path) && path !== '/admin/dashboard' && path !== '/admin/works/new';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080810', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        .nav-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 1rem; border-radius: 12px; text-decoration: none; transition: all 0.2s; color: #555; font-size: 0.88rem; font-weight: 500; white-space: nowrap; overflow: hidden; }
        .nav-link:hover { background: rgba(255,255,255,0.05); color: #ccc; }
        .nav-link.active { background: rgba(178,39,140,0.15); color: #B2278C; border: 1px solid rgba(178,39,140,0.25); }
        .nav-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 0.9rem; flex-shrink: 0; }
        .nav-link.active .nav-icon { background: rgba(178,39,140,0.2); color: #B2278C; }
        .nav-link:hover .nav-icon { background: rgba(255,255,255,0.07); color: #ccc; }
        .logout-btn { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 1rem; border-radius: 12px; background: none; border: none; cursor: pointer; color: #444; font-size: 0.88rem; width: 100%; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; overflow: hidden; }
        .logout-btn:hover { background: rgba(220,50,50,0.08); color: #ff6b6b; }
        @media (max-width: 768px) { .sidebar { transform: translateX(-100%) !important; } .sidebar.open { transform: translateX(0) !important; } .mobile-overlay { display: block !important; } }
      `}</style>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} style={{ display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99, backdropFilter: 'blur(4px)' }} />}

      <aside className={`sidebar${mobileOpen ? ' open' : ''}`} style={{ width: collapsed ? 72 : 240, flexShrink: 0, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '1.25rem 0.75rem', transition: 'width 0.3s ease', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', padding: '0 0.25rem' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(178,39,140,0.2)', border: '1px solid rgba(178,39,140,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#B2278C', fontWeight: 700 }}>MM</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>Admin</span>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: '0.25rem', borderRadius: '8px', transition: 'color 0.2s', fontSize: '1rem', marginLeft: collapsed ? 'auto' : 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#444'}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {NAV.map(item => {
            const active = isActive(item.to);
            return (
              <Link key={item.to} href={item.to} className={`nav-link${active ? ' active' : ''}`} title={collapsed ? item.label : ''}>
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {!collapsed && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #B2278C, #814B97)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {initials}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.82rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.email}</div>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout} title={collapsed ? 'Logout' : ''}>
            <span className="nav-icon" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⇥</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: collapsed ? 72 : 240, transition: 'margin-left 0.3s ease', minWidth: 0 }}>
        <header style={{ height: 60, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: 'rgba(255,255,255,0.01)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
          <button onClick={() => setMobileOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }} className="mobile-menu-btn">☰</button>
          <div style={{ color: '#444', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>
            {pathname.split('/').filter(Boolean).map((seg, i, arr) => (
              <span key={i}>
                <span style={{ color: i === arr.length - 1 ? '#aaa' : '#444', textTransform: 'capitalize' }}>{seg}</span>
                {i < arr.length - 1 && <span style={{ margin: '0 0.4rem', color: '#333' }}>/</span>}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#555', fontSize: '0.78rem' }}>Live</span>
          </div>
        </header>

        <main style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 60px)' }}>
          {children}
        </main>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width:768px) { .mobile-menu-btn { display:block !important; } }
      `}</style>
    </div>
  );
}