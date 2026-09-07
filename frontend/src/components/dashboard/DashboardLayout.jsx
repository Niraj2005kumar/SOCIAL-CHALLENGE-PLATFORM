import React, { useState } from 'react';
import {
  Home,
  PlusCircle,
  FileText,
  TrendingUp,
  HelpCircle,
  Settings,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  GraduationCap,
  Building2,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function DashboardLayout({
  role,
  title,
  subtitle,
  children,
  onSelectRole,
  onOpenSearch,
  theme,
  onToggleTheme,
  showToast
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roleMeta = {
    citizen: {
      name: 'Citizen Portal',
      tag: 'Grassroots Reporter',
      color: 'var(--role-citizen)',
      subtleColor: 'var(--role-citizen-subtle)',
      icon: UserCheck,
      user: { name: 'Ravi Kumar Munda', roleText: 'Citizen • Ranchi District', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
      navItems: [
        { id: 'submit', label: 'Submit Challenge', icon: PlusCircle, active: true },
        { id: 'my-challenges', label: 'My Submissions', icon: FileText, count: 3 },
        { id: 'impact', label: 'Track Impact', icon: TrendingUp },
        { id: 'help', label: 'Help & Support (181)', icon: HelpCircle },
      ]
    },
    admin: {
      name: 'Government Admin',
      tag: 'Higher & Technical Education',
      color: 'var(--role-gov)',
      subtleColor: 'var(--role-gov-subtle)',
      icon: Shield,
      user: { name: 'Anita Singh, IAS', roleText: 'Joint Secretary • Gov of Jharkhand', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
      navItems: [
        { id: 'overview', label: 'Overview Dashboard', icon: Home, active: true },
        { id: 'all-challenges', label: 'All Challenges', icon: FileText, count: 184 },
        { id: 'map-view', label: 'District Map View', icon: TrendingUp },
        { id: 'departments', label: 'Universities & R&D', icon: GraduationCap },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ]
    },
    university: {
      name: 'University Hub',
      tag: 'Engineering & R&D Teams',
      color: 'var(--role-university)',
      subtleColor: 'var(--role-university-subtle)',
      icon: GraduationCap,
      user: { name: 'Prof. Rajesh Mehta', roleText: 'Dean of R&D • BIT Mesra', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
      navItems: [
        { id: 'assigned', label: 'Assigned Challenges', icon: FileText, count: 8, active: true },
        { id: 'teams', label: 'Form a Team', icon: PlusCircle },
        { id: 'projects', label: 'Active Projects', icon: TrendingUp, count: 4 },
        { id: 'grants', label: 'CSR Funding Escrow', icon: Building2 },
      ]
    },
    industry: {
      name: 'Industry CSR Hub',
      tag: 'Corporate & ESG Partners',
      color: 'var(--role-industry)',
      subtleColor: 'var(--role-industry-subtle)',
      icon: Building2,
      user: { name: 'Suresh Agarwal', roleText: 'VP CSR • Tata Steel Foundation', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
      navItems: [
        { id: 'opportunities', label: 'Collaboration Opportunities', icon: FileText, count: 14, active: true },
        { id: 'collaborations', label: 'Active Co-Projects', icon: TrendingUp, count: 3 },
        { id: 'register', label: 'Partner Registration', icon: PlusCircle },
        { id: 'reports', label: 'ESG Impact Reports', icon: HelpCircle },
      ]
    }
  };

  const currentRoleMeta = roleMeta[role] || roleMeta.citizen;
  const RoleIcon = currentRoleMeta.icon;

  const mockNotifications = [
    { id: 1, title: 'Challenge Validated', text: 'Angara Fluoride filtration project approved by District Collector.', time: '10m ago' },
    { id: 2, title: 'New CSR Co-sponsor', text: 'Tata Steel Foundation committed ₹14.5L to Ranchi borewell solution.', time: '1h ago' },
    { id: 3, title: 'AI Match Generated', text: '94% match found between Gumla Cold Storage and BAU Agricultural team.', time: '3h ago' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ============================================================ */}
      {/* 1. CONTINUOUS ROTATING OFFICIAL WATERMARK BACKGROUND           */}
      {/* Outer ring continuously rotates smoothly (~100s)             */}
      {/* Center Ashoka Pillar & Satyameva Jayate stays strictly static! */}
      {/* Sits at z-index: 0 behind content                              */}
      {/* ============================================================ */}
      <JharkhandLogo mode="watermark" size={680} />

      {/* ============================================================ */}
      {/* 2. SIDEBAR (Collapsible & Role Themed)                       */}
      {/* ============================================================ */}
      <aside
        style={{
          width: sidebarCollapsed ? '76px' : '260px',
          backgroundColor: 'var(--bg-card)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width var(--transition-normal)',
          zIndex: 20,
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
        }}
        className="hidden md:flex"
      >
        {/* Top: Branding & Switch to Landing */}
        <div>
          <div
            style={{
              padding: '20px 16px 16px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            }}
          >
            <div
              onClick={() => onSelectRole('landing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              title="Return to Public Portal"
            >
              <JharkhandLogo mode="navbar" size={38} />
              {!sidebarCollapsed && (
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    झारखण्ड सरकार
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Innovation Portal
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: sidebarCollapsed ? 'none' : 'flex',
              }}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Active Role Identifier Strip */}
          <div
            style={{
              padding: sidebarCollapsed ? '12px 0' : '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '10px',
              borderBottom: '1px solid var(--border-subtle)',
              backgroundColor: currentRoleMeta.subtleColor,
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: currentRoleMeta.color,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <RoleIcon size={16} />
            </div>
            {!sidebarCollapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {currentRoleMeta.name}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                  {currentRoleMeta.tag}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentRoleMeta.navItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarCollapsed ? 'center' : 'space-between',
                    padding: sidebarCollapsed ? '10px 0' : '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: item.active ? currentRoleMeta.subtleColor : 'transparent',
                    color: item.active ? currentRoleMeta.color : 'var(--text-secondary)',
                    fontWeight: item.active ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="hover-lift"
                  title={item.label}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ItemIcon size={17} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.count && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '999px',
                        backgroundColor: item.active ? currentRoleMeta.color : 'var(--bg-subtle)',
                        color: item.active ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Quick Role Switcher & Back to Landing */}
        <div
          style={{
            padding: '14px 10px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Back to Public Portal button */}
          <button
            onClick={() => onSelectRole('landing')}
            style={{
              width: '100%',
              padding: sidebarCollapsed ? '8px 0' : '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '8px',
              cursor: 'pointer',
            }}
            className="hover-lift"
            title="Return to Public Landing"
          >
            <ArrowLeft size={15} />
            {!sidebarCollapsed && <span>Public Landing</span>}
          </button>

          {/* User Profile Mini Block */}
          {!sidebarCollapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-subtle)',
              }}
            >
              <img
                src={currentRoleMeta.user.avatar}
                alt={currentRoleMeta.user.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {currentRoleMeta.user.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {currentRoleMeta.user.roleText}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 3. MAIN CONTENT CONTAINER (Glassmorphic, z-index: 10)       */}
      {/* ============================================================ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: '64px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
          className="dark:bg-slate-950/80"
        >
          {/* Left: Page Title & Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '6px',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              className="md:hidden flex items-center justify-center"
            >
              <Menu size={18} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {title}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: currentRoleMeta.subtleColor,
                    color: currentRoleMeta.color,
                  }}
                >
                  {currentRoleMeta.name}
                </span>
              </div>
              {subtitle && (
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Controls: Search, Theme, Notifications, Role Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Button (Ctrl+K) */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
              className="hover-lift"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search portal...</span>
              <kbd
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                }}
              >
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="hover-lift"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="hover-lift"
              >
                <Bell size={16} />
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--status-critical)',
                  }}
                />
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: 0,
                    width: '320px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-modal)',
                    padding: '12px',
                    zIndex: 100,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Updates</span>
                    <span style={{ fontSize: '10.5px', color: 'var(--primary)', cursor: 'pointer' }}>Mark all read</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {mockNotifications.map((n) => (
                      <div key={n.id} style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-subtle)', fontSize: '11.5px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{n.title}</div>
                        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.3 }}>{n.text}</div>
                        <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Switch Role Dropdown Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <select
                value={role}
                onChange={(e) => {
                  onSelectRole(e.target.value);
                  showToast?.(`Switched view to ${e.target.value.toUpperCase()} dashboard`, 'info');
                }}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="citizen">Citizen</option>
                <option value="admin">Gov Admin</option>
                <option value="university">University</option>
                <option value="industry">Industry</option>
              </select>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main
          style={{
            flex: 1,
            padding: '28px 24px',
            maxWidth: '1360px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
