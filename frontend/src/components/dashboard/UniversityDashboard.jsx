import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlusCircle,
  FileText,
  MapPin,
  Building2,
  ThumbsUp,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { MOCK_CHALLENGES, UNIVERSITIES } from '../../data/mockData';

export default function UniversityDashboard({ showToast }) {
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'New' | 'In Progress' | 'Completed'
  const [teamName, setTeamName] = useState('');
  const [selectedChallengeId, setSelectedChallengeId] = useState(MOCK_CHALLENGES[0]?.id || '');
  const [facultyMentor, setFacultyMentor] = useState('Dr. A. K. Roy (Head of Dept)');
  const [studentLead, setStudentLead] = useState('');
  const [challenges, setChallenges] = useState(MOCK_CHALLENGES);
  const [detailsModal, setDetailsModal] = useState(null);

  const filteredChallenges = challenges.filter((c) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'New') return c.status === 'Assigned' || c.status === 'Submitted';
    if (activeTab === 'In Progress') return c.status === 'In Progress';
    if (activeTab === 'Completed') return c.status === 'Resolved';
    return true;
  });

  const handleAcceptChallenge = (id) => {
    setChallenges(
      challenges.map((c) =>
        c.id === id ? { ...c, status: 'In Progress' } : c
      )
    );
    showToast?.('Challenge accepted! Now assign your student squad and faculty mentor.', 'success');
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      showToast?.('Please enter a team name', 'warning');
      return;
    }
    showToast?.(`Team "${teamName}" created and assigned to selected challenge with ${facultyMentor}!`, 'success');
    setTeamName('');
    setStudentLead('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: University Info */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--role-university-subtle)',
              color: 'var(--role-university)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraduationCap size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Birla Institute of Technology (BIT) Mesra
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: 'var(--role-university)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                AUTONOMOUS R&D HUB
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Ranchi, Jharkhand • 8 Active Civic Innovation Squads • ₹42,50,000 Total Co-Funding
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--role-university)' }}>8</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Assigned Needs</div>
          </div>
          <div style={{ height: '36px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--role-citizen)' }}>4</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Pilots</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Challenge Feed & Right "Form a Team" */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
          gap: '24px',
        }}
        className="university-grid-responsive"
      >
        {/* Left Column: Assigned Challenges List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-subtle)', padding: '3px', borderRadius: '8px' }}>
              {[
                { id: 'All', label: 'All (8)' },
                { id: 'New', label: 'New AI Matches (3)' },
                { id: 'In Progress', label: 'In Progress (4)' },
                { id: 'Completed', label: 'Completed (1)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? 'var(--role-university)' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Showing {filteredChallenges.length} challenges
            </span>
          </div>

          {/* Challenge Cards Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredChallenges.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
                className="hover-lift"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>
                        {item.id}
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          backgroundColor: 'var(--primary-subtle)',
                          color: 'var(--primary)',
                          padding: '1px 7px',
                          borderRadius: '4px',
                        }}
                      >
                        ⚡ {item.aiConfidence || '94%'} AI Match
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          backgroundColor: item.priority === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                          color: item.priority === 'Critical' ? '#EF4444' : '#F59E0B',
                          padding: '1px 7px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      📍 {item.village}, {item.block} Block, {item.district} • Category: {item.category}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 9px',
                      borderRadius: '999px',
                      backgroundColor: item.status === 'In Progress' ? 'var(--role-citizen-subtle)' : 'var(--bg-subtle)',
                      color: item.status === 'In Progress' ? 'var(--role-citizen)' : 'var(--text-secondary)',
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {item.description}
                </p>

                {/* Milestone preview bar */}
                {item.milestones && (
                  <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: '8px', padding: '10px 14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                      PROJECT MILESTONES
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {item.milestones.map((m, idx) => (
                        <div key={idx} style={{ fontSize: '11px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: m.status === 'completed' ? 'var(--role-citizen)' : 'var(--text-secondary)' }}>
                            <CheckCircle2 size={12} />
                            <span style={{ fontWeight: 600 }}>{m.name}</span>
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '16px' }}>{m.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    CSR Partner: <strong>{item.industryPartner || 'Tata Steel CSR'}</strong> • Raised: <strong>{item.fundingRaised || '₹14.5L'}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setDetailsModal(item)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-secondary)',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>

                    {item.status !== 'In Progress' && (
                      <button
                        onClick={() => handleAcceptChallenge(item.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: 'var(--role-university)',
                          color: '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Accept Challenge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: "Form a Team" Quick Creation Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '22px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Users size={18} style={{ color: 'var(--role-university)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Form a Team
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 16px' }}>
              Assemble a student innovation squad under accredited faculty mentorship.
            </p>

            <form onSubmit={handleCreateTeam} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Select Challenge */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Target Challenge *
                </label>
                <select
                  value={selectedChallengeId}
                  onChange={(e) => setSelectedChallengeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                  }}
                >
                  {challenges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} - {c.title.substring(0, 38)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Name */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. JalShuddhi BIT Squad"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                  }}
                  required
                />
              </div>

              {/* Faculty Mentor */}
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Faculty Mentor *
                </label>
                <select
                  value={facultyMentor}
                  onChange={(e) => setFacultyMentor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                  }}
                >
                  <option value="Dr. A. K. Roy (Dept of Chemical Eng)">Dr. A. K. Roy (Chemical Eng)</option>
                  <option value="Prof. Swati Kumari (Dept of Civil Eng)">Prof. Swati Kumari (Civil Eng)</option>
                  <option value="Dr. Rajesh Mehta (IoT & Computer Science)">Dr. Rajesh Mehta (IoT & CS)</option>
                  <option value="Prof. P. Soren (Tribal Technology Lab)">Prof. P. Soren (Tribal Tech)</option>
                </select>
              </div>

              {/* Student Roles */}
              <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: '8px', padding: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Squad Composition (3 Students)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <div>• Student Lead: Prototyping & CAD</div>
                  <div>• Student 2: IoT Sensors & Field Telemetry</div>
                  <div>• Student 3: Village Community Survey & Data</div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--role-university)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Create Team</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>

          {/* Accreditation & Academic Credits Note */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--role-citizen)' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                UGC & AICTE Credits
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              All participating engineering students receive 6 academic activity credits and an official State Innovation Citation signed by the Governor of Jharkhand.
            </p>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {detailsModal && (
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
          onClick={() => setDetailsModal(null)}
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
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-university)', backgroundColor: 'var(--role-university-subtle)', padding: '2px 8px', borderRadius: '999px' }}>
                  CHALLENGE DOSSIER
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                  {detailsModal.title}
                </h3>
              </div>
              <button
                onClick={() => setDetailsModal(null)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              {detailsModal.description}
            </p>

            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-subtle)', marginBottom: '16px', fontSize: '12px' }}>
              <div><strong>Expected Impact:</strong> {detailsModal.impactBenefit}</div>
              <div style={{ marginTop: '4px' }}><strong>Funding Target:</strong> {detailsModal.fundingRaised}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setDetailsModal(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-strong)', backgroundColor: 'var(--bg-card)', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAcceptChallenge(detailsModal.id);
                  setDetailsModal(null);
                }}
                style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--role-university)', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Accept Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
