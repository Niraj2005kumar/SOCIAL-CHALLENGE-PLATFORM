import React, { useState } from 'react';
import {
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  MapPin,
  GraduationCap,
  Building2,
  ChevronRight,
  Sparkles,
  X,
  ExternalLink,
  Users
} from 'lucide-react';
import { JHARKHAND_DISTRICTS, PLATFORM_STATS, MOCK_CHALLENGES, UNIVERSITIES, INDUSTRY_PARTNERS } from '../../data/mockData';

export default function AdminDashboard({ showToast }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignModalChallenge, setAssignModalChallenge] = useState(null);
  const [assignedUni, setAssignedUni] = useState(UNIVERSITIES[0]?.name || 'BIT Mesra');
  const [assignedIndustry, setAssignedIndustry] = useState(INDUSTRY_PARTNERS[0]?.name || 'Tata Steel Foundation');
  const [grantAmount, setGrantAmount] = useState('₹5,00,000');

  // Filter challenges based on district, status, and search
  const filteredChallenges = MOCK_CHALLENGES.filter((c) => {
    if (selectedDistrict && c.district.toLowerCase() !== selectedDistrict.name.toLowerCase() && !selectedDistrict.name.includes(c.district)) {
      return false;
    }
    if (statusFilter !== 'All' && c.priority !== statusFilter && c.status !== statusFilter) {
      return false;
    }
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const categories = [
    { name: 'Water & Sanitation', pct: 26, color: '#2563EB' },
    { name: 'Infrastructure & Roads', pct: 22, color: '#F59E0B' },
    { name: 'Education & Digital', pct: 19, color: '#8B5CF6' },
    { name: 'Healthcare & Nutrition', pct: 12, color: '#EC4899' },
    { name: 'Forest Economy & Environment', pct: 10, color: '#10B981' },
    { name: 'Others / Energy', pct: 11, color: '#64748B' },
  ];

  const handleConfirmAssignment = () => {
    showToast?.(`Challenge verified and officially assigned to ${assignedUni} with CSR co-partner ${assignedIndustry}!`, 'success');
    setAssignModalChallenge(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. TOP METRIC CARDS ROW (4 KPIs) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
        className="admin-metrics-grid"
      >
        {/* Total Challenges */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Total Challenges
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-citizen)', backgroundColor: 'var(--role-citizen-subtle)', padding: '2px 7px', borderRadius: '999px' }}>
              +12%
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
            1,248
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Across 24 districts of Jharkhand
          </p>
        </div>

        {/* Under Review */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Under Review
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', backgroundColor: '#FEF2F2', padding: '2px 7px', borderRadius: '999px' }}>
              +5%
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--status-critical)', fontVariantNumeric: 'tabular-nums' }}>
            320
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Pending District Collector sign-off
          </p>
        </div>

        {/* In Progress */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
              In Progress
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-industry)', backgroundColor: 'var(--role-industry-subtle)', padding: '2px 7px', borderRadius: '999px' }}>
              +18%
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--role-industry)', fontVariantNumeric: 'tabular-nums' }}>
            612
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Assigned to University R&D squads
          </p>
        </div>

        {/* Resolved */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Resolved & Scaled
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-citizen)', backgroundColor: 'var(--role-citizen-subtle)', padding: '2px 7px', borderRadius: '999px' }}>
              +22%
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--role-citizen)', fontVariantNumeric: 'tabular-nums' }}>
            316
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Solutions operational in field
          </p>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: DISTRICT INTERACTIVE MAP & CATEGORY BREAKDOWN */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.85fr)',
          gap: '20px',
        }}
        className="admin-map-category-grid"
      >
        {/* Left: Jharkhand District Interactive Map */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '22px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Challenges Across Jharkhand
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                {selectedDistrict ? `Filtered: ${selectedDistrict.name} District` : 'Click a district pin to inspect local problems'}
              </p>
            </div>

            {selectedDistrict && (
              <button
                onClick={() => setSelectedDistrict(null)}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-subtle)',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <X size={13} />
                <span>Show All Districts</span>
              </button>
            )}
          </div>

          {/* Interactive District Map Surface */}
          <div
            style={{
              position: 'relative',
              height: '280px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Silhouette Outline */}
            <svg
              viewBox="0 0 500 320"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.18,
              }}
            >
              <path
                d="M 60,90 Q 120,40 240,40 Q 360,50 420,100 Q 450,180 390,260 Q 280,300 160,270 Q 70,230 60,90 Z"
                fill="var(--jharkhand-green)"
              />
            </svg>

            {/* District Pins Grid overlaying realistic coordinates */}
            {JHARKHAND_DISTRICTS.slice(0, 16).map((dist, idx) => {
              // Normalized coordinates for Jharkhand
              const leftPct = ((dist.lng - 83.5) / (87.9 - 83.5)) * 82 + 8;
              const topPct = (1 - (dist.lat - 22.3) / (25.3 - 22.3)) * 80 + 10;
              const isSelected = selectedDistrict?.id === dist.id;

              return (
                <div
                  key={dist.id}
                  onClick={() => setSelectedDistrict(isSelected ? null : dist)}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: isSelected ? 10 : 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.15s',
                  }}
                  title={`${dist.name} (${dist.challenges} challenges)`}
                >
                  <div
                    style={{
                      width: isSelected ? '26px' : '18px',
                      height: isSelected ? '26px' : '18px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--primary)' : 'var(--jharkhand-green)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isSelected ? '11px' : '9px',
                      fontWeight: 800,
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    {dist.challenges}
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: isSelected ? 'var(--primary)' : 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {dist.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick District Picker Chips */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
            {JHARKHAND_DISTRICTS.slice(0, 8).map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(selectedDistrict?.id === d.id ? null : d)}
                style={{
                  fontSize: '11px',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: selectedDistrict?.id === d.id ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: selectedDistrict?.id === d.id ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {d.name} ({d.challenges})
              </button>
            ))}
          </div>
        </div>

        {/* Right: Category Breakdown Donut */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '22px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
              By Category
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              Statewide distribution of citizen challenges
            </p>
          </div>

          {/* SVG Donut Visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2563EB" strokeWidth="14" strokeDasharray="62 177" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="52 187" strokeDashoffset="-62" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="45 194" strokeDashoffset="-114" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#EC4899" strokeWidth="14" strokeDasharray="28 211" strokeDashoffset="-159" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="24 215" strokeDashoffset="-187" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#64748B" strokeWidth="14" strokeDasharray="28 211" strokeDashoffset="-211" />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>1,248</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Total</span>
              </div>
            </div>
          </div>

          {/* Category Legend List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.color }} />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{c.name}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: RECENT SUBMISSIONS TABLE WITH RAPID VERIFY */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '22px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Recent Submissions & Triage Queue
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Showing {filteredChallenges.length} challenges requiring review or team assignment
            </p>
          </div>

          {/* Status Filters & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-subtle)', padding: '3px', borderRadius: '8px' }}>
              {['All', 'Critical', 'In Progress', 'Assigned'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: statusFilter === status ? 'var(--primary)' : 'transparent',
                    color: statusFilter === status ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '6px 12px 6px 30px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredChallenges.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                gap: '16px',
                flexWrap: 'wrap',
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-subtle)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    flexShrink: 0,
                  }}
                >
                  {item.district.substring(0, 3).toUpperCase()}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {item.id}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: item.priority === 'Critical' ? '#EF4444' : '#F59E0B',
                        backgroundColor: item.priority === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                      className={item.priority === 'Critical' ? 'animate-pulse-critical' : ''}
                    >
                      {item.priority}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {item.category}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    📍 {item.village}, {item.block}, {item.district} • Submitted by {item.submittedBy}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setAssignModalChallenge(item)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--role-gov)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  className="hover-lift"
                >
                  <span>Verify & Assign</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL: VERIFY & ASSIGN CHALLENGE */}
      {assignModalChallenge && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setAssignModalChallenge(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              padding: '24px',
              maxWidth: '560px',
              width: '100%',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-modal)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-gov)', backgroundColor: 'var(--role-gov-subtle)', padding: '2px 8px', borderRadius: '999px' }}>
                  GOVERNMENT TRIAGE & FEASIBILITY GRANT
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                  Verify & Assign to Research Squad
                </h3>
              </div>
              <button
                onClick={() => setAssignModalChallenge(null)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Target Challenge Summary */}
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'var(--bg-subtle)', marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)' }}>
                {assignModalChallenge.id} • {assignModalChallenge.category}
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {assignModalChallenge.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                📍 {assignModalChallenge.block} Block, {assignModalChallenge.district}
              </div>
            </div>

            {/* Select University */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Assign to Higher Education Institution *
              </label>
              <select
                value={assignedUni}
                onChange={(e) => setAssignedUni(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                }}
              >
                {UNIVERSITIES.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Industry CSR Partner */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Recommend Industry CSR Co-Sponsor
              </label>
              <select
                value={assignedIndustry}
                onChange={(e) => setAssignedIndustry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                }}
              >
                {INDUSTRY_PARTNERS.map((ind) => (
                  <option key={ind.id} value={ind.name}>
                    {ind.name} • {ind.focusArea}
                  </option>
                ))}
              </select>
            </div>

            {/* Feasibility Grant */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Initial Government Feasibility Seed Grant
              </label>
              <input
                type="text"
                value={grantAmount}
                onChange={(e) => setGrantAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              />
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setAssignModalChallenge(null)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAssignment}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--role-gov)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                }}
              >
                Confirm Official Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
