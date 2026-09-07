import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CmdKSearch from './components/common/CmdKSearch';
import Toast from './components/common/Toast';
import LandingPage from './components/landing/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import CitizenDashboard from './components/dashboard/CitizenDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UniversityDashboard from './components/dashboard/UniversityDashboard';
import IndustryDashboard from './components/dashboard/IndustryDashboard';
import { X, UserCheck, Shield, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import JharkhandLogo from './components/common/JharkhandLogo';

export default function App() {
  const [currentRole, setCurrentRole] = useState('landing');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jharkhand-theme') || 'light';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Update theme on html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jharkhand-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: 'info' });
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      {/* Global Cmd+K Search Modal */}
      <CmdKSearch
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        onSelectRoute={(roleId) => {
          setCurrentRole(roleId);
          setIsSearchOpen(false);
          showToast(`Navigated to ${roleId.toUpperCase()} portal`, 'info');
        }}
      />

      {/* Quick Login / Sign In Modal */}
      {isAuthOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setIsAuthOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '460px',
              width: '100%',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-modal)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JharkhandLogo mode="navbar" size={38} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Sign In to Portal
                  </h3>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>
                    Select your role for quick single sign-on demo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAuthOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              {[
                { id: 'citizen', name: 'Citizen / Grassroots Reporter', desc: 'Report village water, road, electricity challenges', icon: UserCheck, color: 'var(--role-citizen)' },
                { id: 'admin', name: 'Government Admin (IAS/Dept)', desc: 'Review submissions, verify feasibility & assign funds', icon: Shield, color: 'var(--role-gov)' },
                { id: 'university', name: 'University Faculty & Students', desc: 'BIT Mesra, IIT ISM, NIT Jamshedpur R&D Squads', icon: GraduationCap, color: 'var(--role-university)' },
                { id: 'industry', name: 'Industry CSR Partner', desc: 'Tata Steel, SAIL, CCL co-funding & deployment', icon: Building2, color: 'var(--role-industry)' },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setIsAuthOpen(false);
                      showToast(`Signed in successfully as ${r.name}`, 'success');
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    className="hover-lift"
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: r.color,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {r.desc}
                      </div>
                    </div>
                    <ArrowRight size={15} style={{ color: 'var(--text-muted)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main View Router */}
      {currentRole === 'landing' ? (
        <>
          {/* Public Landing Navbar */}
          <Navbar
            currentRole={currentRole}
            onSelectRole={setCurrentRole}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          {/* Public Landing View */}
          <main style={{ flex: 1 }}>
            <LandingPage
              onSelectRole={setCurrentRole}
              onOpenSearch={() => setIsSearchOpen(true)}
              showToast={showToast}
            />
          </main>

          {/* Official Government Footer */}
          <Footer onSelectRole={setCurrentRole} />
        </>
      ) : (
        /* Dashboard Shell (with continuous rotating watermark in background & static center Ashoka pillar) */
        <DashboardLayout
          role={currentRole}
          title={
            currentRole === 'citizen'
              ? 'Submit a Challenge'
              : currentRole === 'admin'
              ? 'Government Administration Console'
              : currentRole === 'university'
              ? 'University R&D & Team Hub'
              : 'Industry CSR & Co-Funding Hub'
          }
          subtitle={
            currentRole === 'citizen'
              ? 'Tell us about the problem in your village or ward'
              : currentRole === 'admin'
              ? 'Department of Higher & Technical Education • 24 District Oversight'
              : currentRole === 'university'
              ? 'Birla Institute of Technology Mesra • Department of Chemical & Environmental Engineering'
              : 'Corporate Social Responsibility & Technological Scalability'
          }
          onSelectRole={setCurrentRole}
          onOpenSearch={() => setIsSearchOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          showToast={showToast}
        >
          {currentRole === 'citizen' && <CitizenDashboard showToast={showToast} />}
          {currentRole === 'admin' && <AdminDashboard showToast={showToast} />}
          {currentRole === 'university' && <UniversityDashboard showToast={showToast} />}
          {currentRole === 'industry' && <IndustryDashboard showToast={showToast} />}
        </DashboardLayout>
      )}
    </div>
  );
}
