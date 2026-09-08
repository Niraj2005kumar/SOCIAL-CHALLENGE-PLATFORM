import React from 'react';
import {
  Users,
  Building,
  Building2,
  GraduationCap,
  Lightbulb,
  FlaskConical,
  TrendingUp,
  CheckCircle2,
  FileText,
  RefreshCw,
  IndianRupee,
} from 'lucide-react';

export default function LivePortalEcosystem() {
  const steps = [
    {
      id: 'identify',
      icon: Lightbulb,
      label: 'Identify',
      color: '#10B981',
      bg: '#ECFDF5',
      border: '#A7F3D0',
    },
    {
      id: 'collaborate',
      icon: Users,
      label: 'Collaborate',
      color: '#2563EB',
      bg: '#EFF6FF',
      border: '#BFDBFE',
    },
    {
      id: 'jharkhand',
      isCenter: true,
      label: 'A Stronger Jharkhand',
      color: '#059669',
      image: '/images/ecosystem_jharkhand_badge.png',
    },
    {
      id: 'innovate',
      icon: FlaskConical,
      label: 'Innovate',
      color: '#8B5CF6',
      bg: '#F5F3FF',
      border: '#DDD6FE',
    },
    {
      id: 'impact',
      icon: TrendingUp,
      label: 'Create Impact',
      color: '#F59E0B',
      bg: '#FFFBEB',
      border: '#FDE68A',
    },
  ];

  const cards = [
    {
      id: 'citizen',
      role: 'Citizen',
      tagline: 'Report. Participate. Be the Change.',
      primaryColor: '#10B981',
      headerIcon: Users,
      iconBg: '#10B981',
      photo: '/images/ecosystem_citizen.png',
      photoAlt: 'Citizen reporting water challenge in Jharkhand village',
      badgeBg: '#F0FDF4',
      badgeBorder: '#DCFCE7',
      stats: [
        {
          icon: CheckCircle2,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          value: '1,248',
          label: 'Challenges Reported',
        },
        {
          icon: Users,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          value: '5,672',
          label: 'Active Citizens',
        },
      ],
      points: [
        'Report real problems from your area',
        'Track progress and get updates',
        'Be part of a solution-driven community',
      ],
      quote: "People's Problems. People's Power.",
    },
    {
      id: 'admin',
      role: 'Government Admin',
      tagline: 'Insights for Better Governance',
      primaryColor: '#2563EB',
      headerIcon: Building2,
      iconBg: '#2563EB',
      photo: '/images/ecosystem_admin.png',
      photoAlt: 'Government admin analyzing real-time Jharkhand map dashboard',
      badgeBg: '#EFF6FF',
      badgeBorder: '#DBEAFE',
      stats: [
        {
          icon: FileText,
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          value: '320',
          label: 'Under Review',
        },
        {
          icon: RefreshCw,
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          value: '186',
          label: 'In Progress',
        },
      ],
      points: [
        'View and verify citizen submissions',
        'Assign to relevant departments',
        'Track impact with real-time analytics',
      ],
      quote: 'Data-Driven Governance. Real Impact.',
    },
    {
      id: 'university',
      role: 'University Hub',
      tagline: 'Innovate. Research. Create Solutions.',
      primaryColor: '#8B5CF6',
      headerIcon: GraduationCap,
      iconBg: '#8B5CF6',
      photo: '/images/ecosystem_university.png',
      photoAlt: 'University researchers and students collaborating on solutions',
      badgeBg: '#F5F3FF',
      badgeBorder: '#EDE9FE',
      stats: [
        {
          icon: Users,
          iconBg: '#EDE9FE',
          iconColor: '#8B5CF6',
          value: '612',
          label: 'Universities Participating',
        },
        {
          icon: FlaskConical,
          iconBg: '#EDE9FE',
          iconColor: '#8B5CF6',
          value: '148',
          label: 'Active Projects',
        },
      ],
      points: [
        'Work on real-world societal challenges',
        'Form multidisciplinary teams',
        'Turn ideas into impactful solutions',
      ],
      quote: 'Knowledge for a Stronger Jharkhand.',
    },
    {
      id: 'industry',
      role: 'Industry CSR',
      tagline: 'Partner. Invest. Scale Impact.',
      primaryColor: '#F59E0B',
      headerIcon: Building,
      iconBg: '#F59E0B',
      photo: '/images/ecosystem_industry.png',
      photoAlt: 'Corporate CSR partners inspecting clean energy project in Jharkhand',
      badgeBg: '#FFFBEB',
      badgeBorder: '#FEF3C7',
      stats: [
        {
          icon: Building,
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          value: '120+',
          label: 'Industry Partners',
        },
        {
          icon: IndianRupee,
          iconBg: '#CCFBF1',
          iconColor: '#0D9488',
          value: '₹18Cr+',
          label: 'CSR Potential',
        },
      ],
      points: [
        'Discover high-impact opportunities',
        'Collaborate with universities and government',
        'Bring technology, expertise and resources',
      ],
      quote: 'Sustainable Partnerships. Lasting Change.',
    },
  ];

  return (
    <div
      style={{
        borderRadius: '24px',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        background: 'linear-gradient(180deg, #F9FBFE 0%, #FFFFFF 28%, #F8FAFC 100%)',
        boxShadow: '0 16px 48px -8px rgba(15, 23, 42, 0.07), 0 4px 16px -2px rgba(15, 23, 42, 0.03)',
        overflow: 'hidden',
        cursor: 'default',
        userSelect: 'text',
      }}
    >
      {/* 1. TOP HEADER ROW */}
      <div
        style={{
          padding: '36px 36px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 500px', minWidth: '280px' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            Live <span style={{ color: '#2563EB' }}>Portal Ecosystem</span>
          </h2>
          <p
            style={{
              fontSize: '14.5px',
              color: '#64748B',
              margin: 0,
              lineHeight: 1.55,
              fontWeight: 450,
              maxWidth: '720px',
            }}
          >
            Unified collaboration across 4 specialized roles: Citizens, Government Administration,
            Universities, and CSR Industry Partners.
          </p>
        </div>

        {/* Script badge: Different Roles, One Mission, A Better Jharkhand */}
        <div
          style={{
            flex: '0 0 auto',
            textAlign: 'right',
            paddingRight: '8px',
          }}
        >
          <div
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '26px',
              fontWeight: 700,
              color: '#2563EB',
              lineHeight: 1.15,
              letterSpacing: '0.01em',
            }}
          >
            <div>Different Roles</div>
            <div>One Mission</div>
            <div
              style={{
                color: '#10B981',
                position: 'relative',
                display: 'inline-block',
                marginTop: '2px',
              }}
            >
              A Better Jharkhand
              <svg
                width="120"
                height="12"
                viewBox="0 0 120 12"
                fill="none"
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  overflow: 'visible',
                }}
              >
                <path
                  d="M 2 7 C 35 2, 85 2, 118 7"
                  stroke="#10B981"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIVE-NODE CONNECTED WORKFLOW STEPPER */}
      <div
        style={{
          padding: '12px 36px 32px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '920px',
            margin: '0 auto',
            position: 'relative',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Connector Line (visible on desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '60px',
              right: '60px',
              height: '2px',
              borderTop: '2px dashed #CBD5E1',
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {steps.map((step) => {
            const IconComponent = step.icon;
            if (step.isCenter) {
              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    minWidth: '110px',
                  }}
                >
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.28), 0 2px 6px rgba(0,0,0,0.06)',
                      border: '3px solid #E0F2FE',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, #ECFDF5 0%, #F0FDF4 70%, #FFFFFF 100%)',
                    }}
                  >
                    <img
                      src={step.image}
                      alt="A Stronger Jharkhand"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  minWidth: '90px',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: step.bg,
                    border: `2px solid ${step.border}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <IconComponent size={20} color={step.color} strokeWidth={2.3} />
                </div>
                <span
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1E293B',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. FOUR DISTINCT ROLE CARDS GRID */}
      <div
        style={{
          padding: '0 32px 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {cards.map((card) => {
            const HeaderIcon = card.headerIcon;
            return (
              <div
                key={card.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.05), 0 3px 8px -2px rgba(15, 23, 42, 0.03)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                  userSelect: 'text',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: '18px 18px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${card.primaryColor}35`,
                    }}
                  >
                    <HeaderIcon size={21} color="#FFFFFF" strokeWidth={2.2} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        color: '#0F172A',
                        lineHeight: 1.25,
                      }}
                    >
                      {card.role}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#64748B',
                        lineHeight: 1.3,
                        marginTop: '2px',
                      }}
                    >
                      {card.tagline}
                    </div>
                  </div>
                </div>

                {/* Card Visual Photo */}
                <div
                  style={{
                    padding: '0 16px',
                  }}
                >
                  <div
                    style={{
                      height: '144px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <img
                      src={card.photo}
                      alt={card.photoAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Stat Chips Row */}
                <div
                  style={{
                    padding: '14px 16px 12px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                  }}
                >
                  {card.stats.map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: card.badgeBg,
                          border: `1px solid ${card.badgeBorder}`,
                          borderRadius: '10px',
                          padding: '8px 9px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            backgroundColor: stat.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <StatIcon size={14} color={stat.iconColor} strokeWidth={2.4} />
                        </div>
                        <div style={{ minWidth: 0, overflow: 'hidden' }}>
                          <div
                            style={{
                              fontSize: '14px',
                              fontWeight: 800,
                              color: '#0F172A',
                              lineHeight: 1.1,
                            }}
                          >
                            {stat.value}
                          </div>
                          <div
                            style={{
                              fontSize: '9.5px',
                              fontWeight: 600,
                              color: '#64748B',
                              lineHeight: 1.2,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginTop: '2px',
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Checklist Points */}
                <div
                  style={{
                    padding: '0 18px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flexGrow: 1,
                  }}
                >
                  {card.points.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#334155',
                        lineHeight: 1.45,
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        color={card.primaryColor}
                        style={{ flexShrink: 0, marginTop: '2px' }}
                        strokeWidth={2.3}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Card Bottom Quote Pill */}
                <div
                  style={{
                    padding: '12px 16px 16px',
                    borderTop: '1px solid #F1F5F9',
                    backgroundColor: '#FAFAFA',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#475569',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.quote}
                  </div>
                  <div
                    style={{
                      width: '42px',
                      height: '3px',
                      backgroundColor: card.primaryColor,
                      borderRadius: '999px',
                      margin: '7px auto 0',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM WATERMARK & SLOGAN BANNER */}
      <div
        style={{
          position: 'relative',
          padding: '28px 20px 24px',
          minHeight: '115px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/images/ecosystem_landscape_clean.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTop: '1px solid rgba(226, 232, 240, 0.7)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '12.5px',
              fontWeight: 800,
              color: '#334155',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            PEOPLE • NATURE • PROGRESS
          </div>

          {/* 4-Color Accent Line */}
          <div
            style={{
              width: '84px',
              height: '3.5px',
              borderRadius: '999px',
              background:
                'linear-gradient(90deg, #10B981 0%, #10B981 25%, #2563EB 25%, #2563EB 50%, #8B5CF6 50%, #8B5CF6 75%, #F59E0B 75%, #F59E0B 100%)',
              margin: '8px auto 8px',
            }}
            aria-hidden="true"
          />

          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            A BRIGHTER JHARKHAND TOGETHER
          </div>
        </div>
      </div>
    </div>
  );
}
