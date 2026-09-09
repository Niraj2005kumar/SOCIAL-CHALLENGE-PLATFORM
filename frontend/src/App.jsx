import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CmdKSearch from './components/common/CmdKSearch';
import Toast from './components/common/Toast';
import CitizenLogin from './components/auth/CitizenLogin';
import CitizenRegister from './components/auth/CitizenRegister';
import GovernmentAdminLogin from './components/auth/GovernmentAdminLogin';
import UniversityHubLogin from './components/auth/UniversityHubLogin';
import IndustryCsrLogin from './components/auth/IndustryCsrLogin';
import LandingPage from './components/landing/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import CitizenDashboard from './components/dashboard/CitizenDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UniversityDashboard from './components/dashboard/UniversityDashboard';
import IndustryDashboard from './components/dashboard/IndustryDashboard';
import Chatbot from './components/Chatbot';

export default function App() {
  const [currentRole, setCurrentRole] = useState('landing');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jharkhand-theme') || 'light';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState('citizen');
  const [authMode, setAuthMode] = useState('login');
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

  const LoginComponent = {
    citizen: authMode === 'register' ? CitizenRegister : CitizenLogin,
    admin: GovernmentAdminLogin,
    university: UniversityHubLogin,
    industry: IndustryCsrLogin,
  }[authRole] || CitizenLogin;

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

      {isAuthOpen && (
        <LoginComponent
          onClose={() => setIsAuthOpen(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onLogin={(roleId, roleName) => {
            setCurrentRole(roleId);
            setIsAuthOpen(false);
            setAuthMode('login');
            showToast(`Signed in successfully as ${roleName}`, 'success');
          }}
        />
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
            onOpenAuth={(role = 'citizen') => {
              setAuthRole(role);
              setAuthMode('login');
              setIsAuthOpen(true);
            }}
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
      {/* Floating AI Help Assistant — visible on every page/role */}
      <Chatbot />
    </div>
  );
}
