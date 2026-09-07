import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Building, GraduationCap, FileText, ArrowRight } from 'lucide-react';
import { JHARKHAND_DISTRICTS, MOCK_CHALLENGES, UNIVERSITIES } from '../../data/mockData';

export default function CmdKSearch({ isOpen, onClose, onSelectRoute }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDistricts = JHARKHAND_DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.zone.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredChallenges = MOCK_CHALLENGES.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.district.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredUniversities = UNIVERSITIES.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
      onClick={() => onClose(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden',
          animation: 'subtle-fade-in 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', gap: '12px' }}>
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Search districts, challenges, institutes, policies... (Esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => onClose(false)}
            style={{
              padding: '4px',
              borderRadius: '6px',
              border: 'none',
              background: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px 14px' }}>
          {/* Quick Navigation Pages */}
          {!query && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, margin: '6px 8px' }}>
                Quick Dashboards
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { role: 'citizen', name: 'Citizen Portal', desc: 'Submit & track ground issues' },
                  { role: 'admin', name: 'Government Admin', desc: 'Verify, allocate & analyze' },
                  { role: 'university', name: 'University Hub', desc: 'Student R&D & teams' },
                  { role: 'industry', name: 'Industry CSR', desc: 'Co-funding & partnerships' },
                ].map(item => (
                  <div
                    key={item.role}
                    onClick={() => {
                      onSelectRoute(item.role);
                      onClose(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 150ms ease',
                    }}
                    className="hover-lift"
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Districts */}
          {filteredDistricts.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, margin: '6px 8px' }}>
                Districts ({filteredDistricts.length})
              </p>
              {filteredDistricts.map(d => (
                <div
                  key={d.id}
                  onClick={() => {
                    onSelectRoute('admin');
                    onClose(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                  }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} style={{ color: 'var(--jharkhand-green)' }} />
                    <span style={{ fontWeight: 600 }}>{d.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({d.zone})</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>{d.challenges} challenges</span>
                </div>
              ))}
            </div>
          )}

          {/* Challenges */}
          {filteredChallenges.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, margin: '6px 8px' }}>
                Active Challenges ({filteredChallenges.length})
              </p>
              {filteredChallenges.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectRoute('university');
                    onClose(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    marginBottom: '4px',
                  }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '999px',
                        backgroundColor: c.priority === 'Critical' ? 'var(--status-critical-subtle)' : 'var(--primary-subtle)',
                        color: c.priority === 'Critical' ? 'var(--status-critical)' : 'var(--primary)',
                        fontWeight: 700,
                      }}
                    >
                      {c.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {c.district} • {c.category}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Universities */}
          {filteredUniversities.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, margin: '6px 8px' }}>
                Institutions ({filteredUniversities.length})
              </p>
              {filteredUniversities.map(u => (
                <div
                  key={u.id}
                  onClick={() => {
                    onSelectRoute('university');
                    onClose(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={16} style={{ color: 'var(--role-university)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.city}</span>
                </div>
              ))}
            </div>
          )}

          {/* Empty search */}
          {query && filteredDistricts.length === 0 && filteredChallenges.length === 0 && filteredUniversities.length === 0 && (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matches found for "{query}". Try searching "Ranchi", "Water", "Solar", or "BIT Mesra".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>Tip: Press <strong>Esc</strong> to close</span>
          <span>Societal Innovation Portal • Govt of Jharkhand</span>
        </div>
      </div>
    </div>
  );
}
