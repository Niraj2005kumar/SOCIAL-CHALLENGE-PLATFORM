import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CmdKSearch from './components/common/CmdKSearch';
import Toast from './components/common/Toast';
import CitizenLogin from './components/auth/CitizenLogin';
import CitizenRegister from './components/auth/CitizenRegister';
import GovernmentAdminLogin from './components/auth/GovernmentAdminLogin';
import UniversityHubLogin from './components/auth/UniversityHubLogin';
import UniversityRegister from './components/auth/UniversityRegister';
import IndustryCsrLogin from './components/auth/IndustryCsrLogin';
import IndustryRegister from './components/auth/IndustryRegister';
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

  const pathsByRole = {
    landing: '/',
    citizen: '/citizen',
    admin: '/admin',
    university: '/university',
    industry: '/industry',
  };

  const authPathsByRole = {
    citizen: authMode === 'register' ? '/CitizenRegister' : '/CitizenLogin',
    admin: '/GovernmentAdminLogin',
    university: '/UniversityHubLogin',
    industry: '/IndustryCsrLogin',
  };

  const syncPath = (role, mode = 'login', modal = false) => {
    const nextPath = modal ? authPathsByRole[role] || '/CitizenLogin' : pathsByRole[role] || '/';
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', nextPath);
    }
  };

  const handleSelectRole = (role) => {
    setCurrentRole(role);
    setIsAuthOpen(false);
    syncPath(role, 'login', false);
  };

  const handleOpenAuth = (role = 'citizen', mode = 'login') => {
    setAuthRole(role);
    setAuthMode(mode);
    setIsAuthOpen(true);
    setCurrentRole('landing');
    syncPath(role, mode, true);
  };

  // Update theme on html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jharkhand-theme', theme);
  }, [theme]);

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    const routeMap = {
      '/': () => {
        setCurrentRole('landing');
        setIsAuthOpen(false);
      },
      '/citizen': () => {
        setCurrentRole('citizen');
        setIsAuthOpen(false);
      },
      '/admin': () => {
        setCurrentRole('admin');
        setIsAuthOpen(false);
      },
      '/university': () => {
        setCurrentRole('university');
        setIsAuthOpen(false);
      },
      '/industry': () => {
        setCurrentRole('industry');
        setIsAuthOpen(false);
      },
      '/citizenlogin': () => {
        setAuthRole('citizen');
        setAuthMode('login');
        setCurrentRole('landing');
        setIsAuthOpen(true);
      },
      '/governmentadminlogin': () => {
        setAuthRole('admin');
        setAuthMode('login');
        setCurrentRole('landing');
        setIsAuthOpen(true);
      },
      '/universityhublogin': () => {
        setAuthRole('university');
        setAuthMode('login');
        setCurrentRole('landing');
        setIsAuthOpen(true);
      },
      '/industrycsrlogin': () => {
        setAuthRole('industry');
        setAuthMode('login');
        setCurrentRole('landing');
        setIsAuthOpen(true);
      },
      '/citizenregister': () => {
        setAuthRole('citizen');
        setAuthMode('register');
        setCurrentRole('landing');
        setIsAuthOpen(true);
      },
    };

    const handler = routeMap[currentPath];
    if (handler) {
      handler();
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const getDemoUsers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('jharkhand-demo-users') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const storeDemoUser = (user) => {
    const users = getDemoUsers();
    const safeUser = {
      name: user.name || 'User',
      email: String(user.email || '').toLowerCase(),
      role: user.role || 'citizen',
      password: user.password || 'demo123',
      district: user.district || 'Ranchi',
      createdAt: new Date().toISOString(),
    };

    const filtered = users.filter((entry) => entry.email !== safeUser.email);
    filtered.push(safeUser);
    localStorage.setItem('jharkhand-demo-users', JSON.stringify(filtered));
    return safeUser;
  };

  const startSession = (user, roleId) => {
    const safeRole = user.role || roleId;
    localStorage.setItem('jharkhand-token', 'demo-token');
    localStorage.setItem('jharkhand-user', JSON.stringify({
      name: user.name,
      email: user.email,
      role: safeRole,
    }));

    setCurrentRole(safeRole);
    setIsAuthOpen(false);
    setAuthMode('login');
    syncPath(safeRole, 'login', false);
  };

  const handleOfflineAuth = (roleId, roleName, payload = {}, mode = 'login') => {
    const email = String(payload.email || payload.mobile || payload.username || '').trim().toLowerCase();
    const password = String(payload.password || '').trim();

    if (!email || !password) {
      showToast('Please enter your email and password.', 'warning');
      return false;
    }

    const savedUsers = getDemoUsers();
    const allowedRole = payload.role || roleId;

    if (mode === 'register') {
      const user = storeDemoUser({
        name: payload.name || 'New User',
        email,
        password,
        role: allowedRole,
        district: payload.district || 'Ranchi',
      });
      startSession(user, roleId);
      showToast(`Account created successfully as ${roleName}`, 'success');
      return true;
    }

    const match = savedUsers.find(
      (user) =>
        user.email === email &&
        user.role === allowedRole &&
        user.password === password
    );

    if (match) {
      startSession(match, roleId);
      showToast(`Signed in successfully as ${roleName}`, 'success');
      return true;
    }

    const fallbackUser = storeDemoUser({
      name: payload.name || roleName.replace(' Login', '').replace(' Registration', '') || 'User',
      email,
      password,
      role: allowedRole,
      district: payload.district || 'Ranchi',
    });

    startSession(fallbackUser, roleId);
    showToast(`Signed in successfully as ${roleName}`, 'success');
    return true;
  };

  const closeToast = () => {
    setToast({ message: '', type: 'info' });
  };

  const LoginComponent = {
    citizen: authMode === 'register' ? CitizenRegister : CitizenLogin,
    admin: GovernmentAdminLogin,
    university: authMode === 'register' ? UniversityRegister : UniversityHubLogin,
    industry: authMode === 'register' ? IndustryRegister : IndustryCsrLogin,
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
          onClose={() => {
            setIsAuthOpen(false);
            syncPath(currentRole === 'landing' ? 'citizen' : currentRole, authMode, false);
          }}
          onSwitchMode={(mode) => {
            setAuthMode(mode);
            syncPath(authRole, mode, true);
          }}
          onLogin={async (roleId, roleName, payload = {}) => {
            const mode = payload.mode || authMode;
            const email = String(payload.email || payload.mobile || payload.username || '').trim();
            const password = String(payload.password || '').trim();

            if (!email || !password) {
              showToast('Please enter your email and password.', 'warning');
              return;
            }

            handleOfflineAuth(roleId, roleName, payload, mode);
          }}
        />
      )}

      {/* Main View Router */}
      {currentRole === 'landing' ? (
        <>
          {/* Public Landing Navbar */}
          <Navbar
            currentRole={currentRole}
            onSelectRole={handleSelectRole}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAuth={(role = 'citizen', mode = 'login') => handleOpenAuth(role, mode)}
          />

          {/* Public Landing View */}
          <main style={{ flex: 1 }}>
            <LandingPage
              onSelectRole={handleSelectRole}
              onOpenAuth={(role = 'citizen', mode = 'login') => handleOpenAuth(role, mode)}
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
          onSelectRole={handleSelectRole}
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
