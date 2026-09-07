import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Users,
  Building,
  GraduationCap,
  Shield,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Award,
  Mic,
  Camera,
  Layers,
  HeartHandshake,
  Search
} from 'lucide-react';
import heroBannerImg from '../../assets/hero.png';
import JharkhandLogo from '../common/JharkhandLogo';
import { JHARKHAND_DISTRICTS, PLATFORM_STATS, MOCK_CHALLENGES } from '../../data/mockData';

export default function LandingPage({ onSelectRole, onOpenSearch, showToast }) {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [counts, setCounts] = useState({
    challenges: 0,
    institutions: 0,
    citizens: 0,
    solutions: 0,
  });

  // Smooth counter animation on mount
  useEffect(() => {
    const duration = 1400;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const factor = 1 - (1 - progress) * (1 - progress);

      setCounts({
        challenges: Math.floor(1248 * factor),
        institutions: Math.floor(320 * factor),
        citizens: Math.floor(5672 * factor),
        solutions: Math.floor(186 * factor),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          challenges: 1248,
          institutions: 320,
          citizens: 5672,
          solutions: 186,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const stepsData = [
    {
      num: 1,
      title: 'Report',
      subtitle: 'Citizen Voice',
      badgeColor: '#F97316',
      bgColor: '#FFF7ED',
      desc: 'Villagers & ward members report real civic & tribal challenges with photos, GPS tags, and voice notes in regional dialects (Hindi, Santhali, Mundari, Ho).',
      detail: 'Includes geo-tagging, voice waveform recognition, and automated block-level routing.'
    },
    {
      num: 2,
      title: 'Analyze',
      subtitle: 'AI Triage',
      badgeColor: '#3B82F6',
      bgColor: '#EFF6FF',
      desc: 'AI categorizes the submission, estimates societal priority, matches relevant engineering domains, and flags critical infrastructure emergencies.',
      detail: 'Natural language semantic parser identifies technical parameters such as arsenic levels or solar wattage requirements.'
    },
    {
      num: 3,
      title: 'Validate',
      subtitle: 'Gov Admin',
      badgeColor: '#8B5CF6',
      bgColor: '#F5F3FF',
      desc: 'District collectors and Dept. of Higher Education officers review authenticity, approve problem statement, and allocate initial feasibility grants.',
      detail: 'Panchayat Samiti cross-checks field requirements and verifies with local sarpanch.'
    },
    {
      num: 4,
      title: 'Collaborate',
      subtitle: 'University R&D',
      badgeColor: '#EC4899',
      bgColor: '#FDF2F8',
      desc: 'Faculty & multidisciplinary student teams from BIT Mesra, IIT ISM Dhanbad, and NIT Jamshedpur form project squads to design local solutions.',
      detail: 'Interdisciplinary teams combine civil engineering, IoT sensors, agricultural science, and tribal community design.'
    },
    {
      num: 5,
      title: 'Solve',
      subtitle: 'CSR Co-Funding',
      badgeColor: '#10B981',
      bgColor: '#ECFDF5',
      desc: 'Tata Steel CSR, SAIL, CCL, and local MSMEs co-fund R&D prototyping, hardware fabrication, and field test deployments in target villages.',
      detail: 'Direct milestone disbursements via transparent state innovation escrow accounts.'
    },
    {
      num: 6,
      title: 'Impact',
      subtitle: 'District Scale',
      badgeColor: '#0A6938',
      bgColor: '#E8F5E9',
      desc: 'Validated pilot solutions scale to all 24 districts through official government departmental schemes, creating permanent, measurable change.',
      detail: 'Continuous IoT telemetry and citizen satisfaction feedback loop monitoring lasting outcomes.'
    },
  ];

  const selectedDistrictsPreview = [
    { name: 'Ranchi', x: '52%', y: '56%', challenges: 142, img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=60' },
    { name: 'Dhanbad', x: '72%', y: '40%', challenges: 118, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&auto=format&fit=crop&q=60' },
    { name: 'Jamshedpur', x: '68%', y: '74%', challenges: 135, img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=60' },
    { name: 'Bokaro', x: '64%', y: '46%', challenges: 94, img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=120&auto=format&fit=crop&q=60' },
    { name: 'Gumla', x: '35%', y: '65%', challenges: 66, img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=120&auto=format&fit=crop&q=60' },
    { name: 'Deoghar', x: '76%', y: '25%', challenges: 78, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="landing-page-root" style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. TOP HERO SECTION */}
      <section
        className="landing-masthead"
        style={{
          position: 'relative',
          padding: '14px 8px 26px',
          maxWidth: '1380px',
          margin: '0 auto',
          backgroundImage: `linear-gradient(90deg, rgba(3, 20, 35, 0.82) 0%, rgba(3, 20, 35, 0.28) 47%, rgba(3, 20, 35, 0.08) 100%), url(${heroBannerImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="hero-grid-responsive landing-mast-grid"
        >
          {/* LEFT: Headline, Tagline, CTAs & Counters */}
          <div className="hero-copy-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '18px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  PEOPLE • PROBLEMS • POSSIBILITIES
                </span>
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: '18px',
                }}
              >
                A Smarter{' '}
                <span style={{ color: 'var(--primary)', position: 'relative' }}>
                  Jharkhand
                </span>{' '}
                Starts With You
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '16.5px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  marginBottom: '28px',
                }}
              >
                A collaborative platform to identify real societal problems, connect them with the right minds, and create lasting impact across Jharkhand.
              </p>

              {/* CTA Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '36px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => {
                    onSelectRole('citizen');
                    showToast?.('Switched to Citizen Portal — report your challenge!', 'info');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '13px 26px',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="hover-lift"
                >
                  <span>Report a Challenge</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={onOpenSearch}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 22px',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-strong)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="hover-lift"
                >
                  <Search size={15} style={{ color: 'var(--text-muted)' }} />
                  <span>Explore Challenges</span>
                </button>
              </div>

              {/* Animated Stat Counters Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  padding: '20px 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '28px',
                }}
              >
                <div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    {counts.challenges.toLocaleString()}+
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                    Challenges
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    {counts.institutions.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                    Institutions
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    {counts.citizens.toLocaleString()}+
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                    Citizens
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    {counts.solutions.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                    Solutions in Progress
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Roles Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
              }}
              className="role-cards-strip"
            >
              {/* Citizen */}
              <div
                onClick={() => onSelectRole('citizen')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all var(--transition-fast)',
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--role-citizen-subtle)',
                    color: 'var(--role-citizen)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Users size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    For Citizens
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    Report problems
                  </div>
                </div>
              </div>

              {/* Government */}
              <div
                onClick={() => onSelectRole('admin')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all var(--transition-fast)',
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--role-gov-subtle)',
                    color: 'var(--role-gov)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Shield size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    For Government
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    Data-driven insights
                  </div>
                </div>
              </div>

              {/* Universities */}
              <div
                onClick={() => onSelectRole('university')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all var(--transition-fast)',
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--role-university-subtle)',
                    color: 'var(--role-university)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    For Universities
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    Solve challenges
                  </div>
                </div>
              </div>

              {/* Industry */}
              <div
                onClick={() => onSelectRole('industry')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all var(--transition-fast)',
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--role-industry-subtle)',
                    color: 'var(--role-industry)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Building size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    For Industry
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    CSR & Innovation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Real Photo Showcase & Jharkhand District Pulse Card */}
          <div className="landing-right-rail" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="compact-workflow-panel">
              <div className="compact-workflow-heading">
                <div>
                  <h2>From Problem to Possibility</h2>
                  <p>A simple yet powerful journey from a citizen's report to a real-world solution.</p>
                </div>
                <ArrowRight size={16} />
              </div>
              <div className="compact-workflow-steps">
                {stepsData.map((step) => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(step.num)}
                    className={activeStep === step.num ? 'is-active' : ''}
                    style={{ '--step-color': step.badgeColor }}
                  >
                    <span>{step.num}</span>
                    <strong>{step.title}</strong>
                  </button>
                ))}
              </div>
              <div className="compact-workflow-caption">{stepsData[activeStep - 1].subtitle}</div>
            </div>

            {/* Real Photo Banner with Handwritten Tagline */}
            <div className="hero-photo-banner"
              style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                height: '270px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <img
                src={heroBannerImg}
                alt="Jharkhand rural reality: clean water, tribal communities, road infrastructure"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
                }}
              />
              {/* Handwritten style badge overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '24px',
                  fontFamily: "'Caveat', cursive",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  transform: 'rotate(-4deg)',
                  pointerEvents: 'none',
                  letterSpacing: '1px',
                }}
              >
                Real Problems
                <br />
                <span style={{ color: '#FDE047', marginLeft: '24px' }}>Real People</span>
                <br />
                <span style={{ marginLeft: '48px' }}>Real Change</span>
              </div>
            </div>

            {/* Jharkhand District Pulse & Map Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '18px',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--jharkhand-green)',
                      boxShadow: '0 0 0 3px rgba(10, 105, 56, 0.2)',
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      Real Challenges, Real Impact
                    </h3>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0 }}>
                      Across all 24 districts of Jharkhand
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectRole('admin')}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--primary-subtle)',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Explore the map</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Map Canvas with District Photo Markers */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px dashed var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* SVG Silhouette representation of Jharkhand */}
                <svg
                  viewBox="0 0 320 200"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.25,
                  }}
                >
                  <path
                    d="M 50,60 Q 90,20 180,30 Q 260,35 280,80 Q 290,140 230,175 Q 160,195 90,165 Q 35,130 50,60 Z"
                    fill="var(--jharkhand-green)"
                  />
                </svg>

                {/* District Circular Pins */}
                {selectedDistrictsPreview.map((d) => (
                  <div
                    key={d.name}
                    onMouseEnter={() => setHoveredDistrict(d)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => onSelectRole('admin')}
                    style={{
                      position: 'absolute',
                      left: d.x,
                      top: d.y,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.2s',
                        transform: hoveredDistrict?.name === d.name ? 'scale(1.3)' : 'scale(1)',
                      }}
                    >
                      <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        color: '#ffffff',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {d.name}
                    </span>
                  </div>
                ))}

                {/* Cultural Inscription: Mera Jharkhand Mera Garv */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--jharkhand-green)',
                    opacity: 0.6,
                    letterSpacing: '1px',
                  }}
                >
                  मेरा झारखंड मेरा गर्व
                </div>
              </div>

              {/* District summary numbers */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>24</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Districts</div>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>1,248</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Total Challenges</div>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--role-industry)' }}>612</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>In Progress</div>
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--role-citizen)' }}>316</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Resolved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "FROM PROBLEM TO POSSIBILITY" (6-STEP INTERACTIVE WORKFLOW) */}
      <section
        className="full-workflow-section"
        style={{
          padding: '40px 20px',
          maxWidth: '1380px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '20px',
            padding: '32px 28px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                From Problem to Possibility
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                A simple yet powerful journey from a citizen's report to real-world solution.
              </p>
            </div>

            <button
              onClick={() => {
                const nextStep = activeStep < 6 ? activeStep + 1 : 1;
                setActiveStep(nextStep);
              }}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Explore Step {activeStep} of 6</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 6 Step Circles Row with Glowing Trail */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
              position: 'relative',
              marginBottom: '24px',
            }}
            className="steps-row-responsive"
          >
            {stepsData.map((step) => {
              const isCurrent = activeStep === step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '12px 8px',
                    borderRadius: '14px',
                    backgroundColor: isCurrent ? step.bgColor : 'var(--bg-subtle)',
                    border: `1.5px solid ${isCurrent ? step.badgeColor : 'var(--border-subtle)'}`,
                    transition: 'all var(--transition-fast)',
                    transform: isCurrent ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isCurrent ? `0 4px 14px ${step.badgeColor}30` : 'none',
                  }}
                  className="hover-lift"
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? step.badgeColor : 'var(--bg-card)',
                      color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                      marginBottom: '8px',
                      border: `2px solid ${step.badgeColor}`,
                    }}
                  >
                    {step.num}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {step.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          {stepsData[activeStep - 1] && (
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '14px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                borderLeft: `4px solid ${stepsData[activeStep - 1].badgeColor}`,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: stepsData[activeStep - 1].badgeColor,
                      color: '#ffffff',
                    }}
                  >
                    STAGE {activeStep}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {stepsData[activeStep - 1].title} — {stepsData[activeStep - 1].subtitle}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {stepsData[activeStep - 1].desc}
                </p>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                  {stepsData[activeStep - 1].detail}
                </div>
              </div>

              <button
                onClick={() => {
                  if (activeStep === 1) onSelectRole('citizen');
                  else if (activeStep === 2 || activeStep === 3) onSelectRole('admin');
                  else if (activeStep === 4) onSelectRole('university');
                  else onSelectRole('industry');
                }}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: stepsData[activeStep - 1].badgeColor,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Jump to Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. 4-DASHBOARD CONDENSED LIVE PREVIEW STRIP (Matching the Reference UI Layout) */}
      <section
        style={{
          padding: '20px 20px 60px',
          maxWidth: '1380px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Layers size={18} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Live Portal Ecosystem
            </h2>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
            Unified collaboration across 4 specialized roles: Citizens, Government Administration, Universities, and CSR Industry Partners.
          </p>
        </div>

        {/* 4 Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            alignItems: 'stretch',
          }}
          className="dashboard-preview-strip"
        >
          {/* ================= PREVIEW CARD 1: CITIZEN DASHBOARD ================= */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--transition-normal)',
            }}
            className="hover-lift"
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--role-citizen-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JharkhandLogo mode="navbar" size={28} />
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Citizen Dashboard
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    Submit a Challenge
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'var(--role-citizen)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                CITIZEN
              </span>
            </div>

            {/* Simulated Form Body */}
            <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Problem Title *
                </label>
                <div
                  style={{
                    fontSize: '11.5px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                  }}
                >
                  e.g. High fluoride water in Angara village borewells
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Description *
                </label>
                <div
                  style={{
                    fontSize: '11px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    height: '52px',
                    overflow: 'hidden',
                    lineHeight: 1.4,
                  }}
                >
                  Handpumps across 12 hamlets yield yellow tinted water. Villagers facing joint pain...
                </div>
              </div>

              {/* Location Mock Pickers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                <div style={{ fontSize: '10px', padding: '5px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                  Ranchi
                </div>
                <div style={{ fontSize: '10px', padding: '5px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                  Angara
                </div>
                <div style={{ fontSize: '10px', padding: '5px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                  Hesal
                </div>
              </div>

              {/* Media Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px dashed var(--border-strong)',
                    fontSize: '10.5px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Camera size={13} />
                  <span>Upload Photos</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px dashed var(--role-citizen)',
                    backgroundColor: 'var(--role-citizen-subtle)',
                    fontSize: '10.5px',
                    color: 'var(--role-citizen)',
                    fontWeight: 600,
                  }}
                >
                  <Mic size={13} />
                  <span>Record Voice</span>
                </div>
              </div>

              {/* AI Analysis Preview Tag */}
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--primary-subtle)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  fontSize: '10.5px',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} />
                <span>AI: Water & Sanitation • Priority: Critical</span>
              </div>
            </div>

            {/* Launch Button */}
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => onSelectRole('citizen')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--role-citizen)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Launch Citizen Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ================= PREVIEW CARD 2: ADMIN DASHBOARD ================= */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--transition-normal)',
            }}
            className="hover-lift"
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--role-gov-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JharkhandLogo mode="navbar" size={28} />
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Government Admin
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    Statewide Oversight
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'var(--role-gov)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                ADMIN
              </span>
            </div>

            {/* Metrics & Donut Preview */}
            <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Mini 4 KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>1,248</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Total Challenges (+12%)</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--status-critical)' }}>320</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Under Review (+5%)</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--role-industry)' }}>612</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>In Progress (+18%)</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--role-citizen)' }}>316</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Resolved (+22%)</div>
                </div>
              </div>

              {/* Category Breakdown Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Categories</span>
                  <span style={{ color: 'var(--text-muted)' }}>Water 26% • Infra 22%</span>
                </div>
                <div style={{ height: '6px', borderRadius: '999px', display: 'flex', overflow: 'hidden' }}>
                  <div style={{ width: '26%', backgroundColor: '#2563EB' }} />
                  <div style={{ width: '22%', backgroundColor: '#F59E0B' }} />
                  <div style={{ width: '19%', backgroundColor: '#8B5CF6' }} />
                  <div style={{ width: '12%', backgroundColor: '#EC4899' }} />
                  <div style={{ width: '21%', backgroundColor: '#10B981' }} />
                </div>
              </div>

              {/* Recent Ticker item */}
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Fluoride borewells in Angara
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Ranchi • 2h ago</div>
                </div>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: 'var(--status-critical)',
                    backgroundColor: 'var(--status-critical-subtle)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                  className="animate-pulse-critical"
                >
                  Critical
                </span>
              </div>
            </div>

            {/* Launch Button */}
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => onSelectRole('admin')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--role-gov)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Launch Admin Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ================= PREVIEW CARD 3: UNIVERSITY DASHBOARD ================= */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--transition-normal)',
            }}
            className="hover-lift"
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--role-university-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JharkhandLogo mode="navbar" size={28} />
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    University Hub
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    Assigned Challenges
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'var(--role-university)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                ACADEMIA
              </span>
            </div>

            {/* University Content Preview */}
            <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Tab mock */}
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-subtle)', padding: '3px', borderRadius: '6px' }}>
                <div style={{ flex: 1, fontSize: '10.5px', fontWeight: 700, textAlign: 'center', padding: '4px', backgroundColor: 'var(--bg-card)', borderRadius: '4px', color: 'var(--role-university)' }}>
                  All (8)
                </div>
                <div style={{ flex: 1, fontSize: '10.5px', fontWeight: 500, textAlign: 'center', padding: '4px', color: 'var(--text-muted)' }}>
                  New (3)
                </div>
                <div style={{ flex: 1, fontSize: '10.5px', fontWeight: 500, textAlign: 'center', padding: '4px', color: 'var(--text-muted)' }}>
                  In Prog (4)
                </div>
              </div>

              {/* Challenge Card Preview */}
              <div
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    Safe Drinking Water Solution
                  </span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-subtle)', padding: '1px 5px', borderRadius: '4px' }}>
                    96% AI Match
                  </span>
                </div>
                <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', margin: '2px 0 6px' }}>
                  Ranchi, Jharkhand • Water & Sanitation
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Matched: BIT Mesra</span>
                  <button
                    onClick={() => onSelectRole('university')}
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      backgroundColor: 'var(--role-university)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>

              {/* Form a Team banner */}
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px dashed var(--role-university)',
                  backgroundColor: 'var(--role-university-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--role-university)' }}>Form a Team</div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Faculty mentor + 3 students</div>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--role-university)' }} />
              </div>
            </div>

            {/* Launch Button */}
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => onSelectRole('university')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--role-university)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Launch University Hub</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ================= PREVIEW CARD 4: INDUSTRY DASHBOARD ================= */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all var(--transition-normal)',
            }}
            className="hover-lift"
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 18px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--role-industry-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <JharkhandLogo mode="navbar" size={28} />
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Industry CSR
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                    Collaboration Opportunities
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'var(--role-industry)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                INDUSTRY
              </span>
            </div>

            {/* Industry Content Preview */}
            <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Filter preview */}
              <div style={{ display: 'flex', gap: '6px', fontSize: '10px' }}>
                <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  All Sectors
                </span>
                <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  All Districts
                </span>
              </div>

              {/* Opportunity 1 */}
              <div
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Solar Street Lighting & Microgrids
                  </span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--status-high)', backgroundColor: 'var(--status-high-subtle)', padding: '1px 5px', borderRadius: '4px' }}>
                    High
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '3px 0' }}>
                  Dhanbad • Energy & Power
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--jharkhand-green)' }}>
                    ₹18,00,000 CSR
                  </span>
                  <button
                    onClick={() => onSelectRole('industry')}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    View & Connect
                  </button>
                </div>
              </div>

              {/* Opportunity 2 */}
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Forest Lac Cold Chain Preservation
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Gumla • Agritech</div>
              </div>
            </div>

            {/* Launch Button */}
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => onSelectRole('industry')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--role-industry)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>Launch Industry CSR Hub</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRIBAL HERITAGE & CITIZEN ENGAGEMENT BANNER */}
      <section
        style={{
          padding: '0 20px 60px',
          maxWidth: '1380px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0A6938 0%, #074D29 100%)',
            borderRadius: '20px',
            padding: '36px 40px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}
            >
              <HeartHandshake size={14} />
              <span>COMMUNITY-POWERED GOVERNANCE</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>
              Your Voice Builds a Smarter, Sustainable Jharkhand
            </h3>
            <p style={{ fontSize: '14.5px', opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              From the Santhal Parganas to the Kolhan belt, every citizen challenge matters. Connect with leading engineering minds and CSR leaders to turn local struggles into state pride.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onSelectRole('citizen')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                color: '#0A6938',
                fontWeight: 800,
                fontSize: '14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}
              className="hover-lift"
            >
              Report a Challenge Now
            </button>
            <button
              onClick={() => onSelectRole('industry')}
              style={{
                padding: '12px 22px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '10px',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
              }}
              className="hover-lift"
            >
              Register as CSR Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
