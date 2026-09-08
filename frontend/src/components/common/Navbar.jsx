import React, { useState } from 'react';
import { Search, Moon, Sun, ChevronDown, UserCheck, Shield, GraduationCap, Building2, Globe, LogIn, ArrowRight } from 'lucide-react';
import JharkhandLogo from './JharkhandLogo';

export default function Navbar({
  currentRole,
  onSelectRole,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenAuth,
}) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'landing', label: 'Public Portal', icon: Globe, color: 'text-slate-600', badge: 'Public' },
    { id: 'citizen', label: 'Citizen Dashboard', icon: UserCheck, color: 'text-emerald-500', badge: 'Green' },
    { id: 'admin', label: 'Government Admin', icon: Shield, color: 'text-blue-500', badge: 'Blue' },
    { id: 'university', label: 'University Hub', icon: GraduationCap, color: 'text-purple-500', badge: 'Purple' },
    { id: 'industry', label: 'Industry CSR', icon: Building2, color: 'text-amber-500', badge: 'Orange' },
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];

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

          {/* Role Switcher Dropdown (Allows seamless 1-click preview of all 4 roles) */}
          <div className="landing-role-switcher" style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
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
              title="Switch role view or dashboard"
            >
              <currentRoleObj.icon size={15} style={{ color: 'var(--primary)' }} />
              <span>{currentRoleObj.label}</span>
              <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
            </button>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '240px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-modal)',
                  padding: '6px',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Switch View / Role Portal
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectRole(r.id);
                      setRoleDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: currentRole === r.id ? 'var(--primary-subtle)' : 'transparent',
                      color: currentRole === r.id ? 'var(--primary)' : 'var(--text-primary)',
                      fontWeight: currentRole === r.id ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <r.icon size={16} />
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
