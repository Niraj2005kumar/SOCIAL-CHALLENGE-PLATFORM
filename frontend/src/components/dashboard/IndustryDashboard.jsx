import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  Filter,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  DollarSign,
  Briefcase,
  MapPin,
  FileCheck,
  X,
  ExternalLink
} from 'lucide-react';
import { MOCK_CHALLENGES, INDUSTRY_PARTNERS, JHARKHAND_DISTRICTS } from '../../data/mockData';

export default function IndustryDashboard({ showToast }) {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [connectModalChallenge, setConnectModalChallenge] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [csrBudget, setCsrBudget] = useState('₹25,00,000');

  // Filter opportunities
  const filteredOpportunities = MOCK_CHALLENGES.filter((item) => {
    if (sectorFilter !== 'All' && !item.category.toLowerCase().includes(sectorFilter.toLowerCase())) {
      return false;
    }
    if (districtFilter !== 'All' && item.district.toLowerCase() !== districtFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRegisterPartner = (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      showToast?.('Please enter your organization name', 'warning');
      return;
    }
    showToast?.(`Registration submitted for ${companyName}! Department MoU coordinator will reach out in 24 hours.`, 'success');
    setRegisterModalOpen(false);
    setCompanyName('');
  };

  const handlePledgeCsr = () => {
    showToast?.(`Co-sponsorship intent recorded for ${connectModalChallenge?.title}! Seed agreement sent to CSR team.`, 'success');
    setConnectModalChallenge(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. TOP HERO BANNER: PARTNER FOR A SUSTAINABLE JHARKHAND */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
          borderRadius: '18px',
          padding: '28px 32px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#FBBF24',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              marginBottom: '10px',
            }}
          >
            <Building2 size={13} />
            <span>CORPORATE CITIZENSHIP & ESG ALLIANCE</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
            Partner for a Sustainable Jharkhand
          </h2>
          <p style={{ fontSize: '13.5px', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
            Bring your technology, CSR capital, and engineering expertise to co-fund high-impact rural and tribal innovations alongside top state universities. 100% CSR tax deduction eligible under Section 135.
          </p>
        </div>

        <button
          onClick={() => setRegisterModalOpen(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'var(--role-industry)',
            color: '#0F172A',
            fontWeight: 800,
            fontSize: '13.5px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="hover-lift"
        >
          <span>Register as Partner</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 2. STATS ROW: ESG & CSR IMPACT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
        className="industry-stats-grid"
      >
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>CSR Capital Deployed</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--jharkhand-green)', marginTop: '4px' }}>₹3.82 Cr</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>In active village pilots</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>Corporate Partners</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--role-industry)', marginTop: '4px' }}>18 Giants</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Tata Steel, SAIL, CCL, Jindal</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>Tribal Hamlets Impacted</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--role-citizen)', marginTop: '4px' }}>48 Villages</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Across 6 aspirational districts</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>ESG Compliance Rating</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>BRSR Gold</div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Gov verified audit trail</div>
        </div>
      </div>

      {/* 3. FILTER BAR */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <Filter size={15} />
            <span style={{ fontWeight: 700 }}>Filter By:</span>
          </div>

          {/* Sector Filter */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <option value="All">All Sectors</option>
            <option value="Water">Clean Water & Sanitation</option>
            <option value="Solar">Clean Energy & Microgrids</option>
            <option value="Forest">Agritech & Forest Economy</option>
            <option value="Infra">Rural Infrastructure</option>
          </select>

          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <option value="All">All Districts</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Dhanbad">Dhanbad</option>
            <option value="Gumla">Gumla</option>
            <option value="Bokaro">Bokaro</option>
            <option value="East Singhbhum">Jamshedpur</option>
          </select>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search CSR opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 32px',
              borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              backgroundColor: 'var(--bg-canvas)',
              fontSize: '12px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* 4. OPPORTUNITIES GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
            }}
            className="hover-lift"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {opp.id}
                </span>

                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: opp.priority === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                    color: opp.priority === 'Critical' ? '#EF4444' : '#F59E0B',
                  }}
                >
                  {opp.priority} Priority
                </span>
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px', lineHeight: 1.3 }}>
                {opp.title}
              </h3>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <MapPin size={13} />
                <span>{opp.district}, Jharkhand • {opp.category}</span>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {opp.description}
              </p>
            </div>

            {/* University & Funding requirement */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned University:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{opp.assignedTo.split('(')[0]}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Co-Funding Progress:</span>
                <span style={{ fontWeight: 800, color: 'var(--jharkhand-green)' }}>{opp.fundingRaised}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => setConnectModalChallenge(opp)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
              className="hover-lift"
            >
              <span>View & Connect</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* 5. MODAL: VIEW & CONNECT / CO-SPONSOR */}
      {connectModalChallenge && (
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
          onClick={() => setConnectModalChallenge(null)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--role-industry)', backgroundColor: 'var(--role-industry-subtle)', padding: '2px 8px', borderRadius: '999px' }}>
                  CSR CO-SPONSORSHIP DOSSIER
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                  {connectModalChallenge.title}
                </h3>
              </div>
              <button
                onClick={() => setConnectModalChallenge(null)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              {connectModalChallenge.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: '10px', padding: '14px', marginBottom: '18px', fontSize: '12.5px' }}>
              <div>📍 <strong>Location:</strong> {connectModalChallenge.village}, {connectModalChallenge.block}, {connectModalChallenge.district}</div>
              <div>🎓 <strong>Lead R&D Partner:</strong> {connectModalChallenge.assignedTo}</div>
              <div>🌱 <strong>Target Beneficiaries:</strong> {connectModalChallenge.impactBenefit}</div>
              <div>💰 <strong>CSR Budget Target:</strong> {connectModalChallenge.fundingRaised}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setConnectModalChallenge(null)}
                style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg-card)', cursor: 'pointer', fontSize: '12.5px' }}
              >
                Cancel
              </button>
              <button
                onClick={handlePledgeCsr}
                style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--role-industry)', color: '#0F172A', fontWeight: 800, cursor: 'pointer', fontSize: '12.5px' }}
              >
                Pledge CSR Co-Sponsorship
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: REGISTER AS PARTNER */}
      {registerModalOpen && (
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
          onClick={() => setRegisterModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              padding: '24px',
              maxWidth: '520px',
              width: '100%',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-modal)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--role-industry)', backgroundColor: 'var(--role-industry-subtle)', padding: '2px 8px', borderRadius: '999px' }}>
                  STATE CSR COLLABORATION
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                  Register as CSR / Innovation Partner
                </h3>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterPartner} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tata Steel Foundation / SAIL / NTPC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    fontSize: '13px',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Estimated Annual CSR Innovation Budget
                </label>
                <input
                  type="text"
                  value={csrBudget}
                  onChange={(e) => setCsrBudget(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg-card)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--role-industry)', color: '#0F172A', fontWeight: 800, cursor: 'pointer' }}
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
