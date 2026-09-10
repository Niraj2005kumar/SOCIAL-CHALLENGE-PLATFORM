import React from 'react';
import { Search, Moon, Sun, ArrowRight } from 'lucide-react';
import JharkhandLogo from './JharkhandLogo';

export default function Navbar({
  currentRole,
  onSelectRole,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenAuth,
}) {
  const currentRoleLabel = {
    landing: 'Citizen Login',
    citizen: 'Citizen Login',
    admin: 'Government Login',
    university: 'University Login',
    industry: 'Industry Login',
  }[currentRole] || 'Citizen Login';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      }}
      className="landing-navbar dark:bg-slate-950/85"
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 20px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Left: Official Emblem & Government Branding */}
        <div
          onClick={() => onSelectRole('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          {/* Static small logo in navbar (strictly NO rotation on landing/navbar) */}
          <JharkhandLogo mode="navbar" size={46} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                Government of Jharkhand
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--jharkhand-green)',
                  backgroundColor: 'var(--jharkhand-green-light)',
                  padding: '1px 7px',
                  borderRadius: '999px',
                }}
              >
                झारखण्ड सरकार
              </span>
            </div>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.01em',
              }}
            >
              Dept. of Higher & Technical Education • Civic Innovation
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Only visible on larger screens) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }}
          className="landing-nav-links lg:flex"
        >
          {[
            { label: 'Home', action: () => onSelectRole('landing') },
            { label: 'About', href: '#about' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else if (item.href) {
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13.5px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)',
                padding: '6px 2px',
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Cmd+K Search trigger */}
          <button
            onClick={() => onOpenSearch(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              fontSize: '12.5px',
              cursor: 'pointer',
              transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
            }}
            className="hover-lift hidden sm:flex"
            title="Search everywhere (Cmd+K or Ctrl+K)"
          >
            <Search size={14} />
            <span>Search...</span>
            <kbd
              style={{
                padding: '2px 5px',
                fontSize: '10px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Department Login Action */}
          <button
            onClick={() => {
              const role = currentRole === 'landing' ? 'citizen' : currentRole;
              if (onOpenAuth) onOpenAuth(role, 'login');
              else onSelectRole(role);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
            className="hover-lift"
            title="Open department login"
          >
            <span>{currentRoleLabel}</span>
            <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
            className="hover-lift"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>

          {/* Login / Action CTA */}
          <button
            onClick={() => onOpenAuth ? onOpenAuth('citizen') : onSelectRole('citizen')}
            style={{
              padding: '6px 12px',
              fontSize: '12.5px',
              fontWeight: 600,
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
            }}
            className="landing-sign-in sm:inline-flex hover:text-blue-600"
          >
            Login
          </button>

          <button
            onClick={() => onSelectRole('citizen')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: 'var(--primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-micro)',
              transition: 'background-color var(--transition-fast), transform var(--transition-fast)',
            }}
            className="landing-get-started hover-lift"
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
