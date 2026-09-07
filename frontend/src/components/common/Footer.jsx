import React from 'react';
import JharkhandLogo from './JharkhandLogo';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onSelectRole }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '60px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Top Banner with Jharkhand Colors */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #0A6938 0%, #D97706 35%, #2563EB 70%, #991B1B 100%)',
          width: '100%',
        }}
      />

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '50px 24px 30px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Column 1: Government Identity */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <JharkhandLogo mode="navbar" size={42} />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  झारखण्ड सरकार
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Government of Jharkhand
                </p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Department of Higher & Technical Education — Societal Innovation Collaboration Portal. Bridging grassroots tribal and rural challenges with state university R&D and industry CSR funding.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--jharkhand-green)', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Official Government Civic Tech Initiative</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Portal Roles
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Citizen Reporting Kiosk', role: 'citizen' },
                { label: 'Government Administration', role: 'admin' },
                { label: 'University & Research Hub', role: 'university' },
                { label: 'Industry & CSR Partnerships', role: 'industry' },
                { label: 'From Problem to Possibility Flow', role: 'landing' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSelectRole(item.role)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Collaborations */}
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Participating Apex Bodies
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li>BIT Mesra, Ranchi</li>
              <li>IIT (ISM) Dhanbad</li>
              <li>NIT Jamshedpur</li>
              <li>Birsa Agricultural University</li>
              <li>Jharkhand University of Technology (JUT)</li>
              <li>Tata Steel Foundation CSR</li>
            </ul>
          </div>

          {/* Column 4: Helplines & Assistance */}
          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Grievance & Helpline
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: 'var(--primary)' }} />
                <span>State Citizen Helpline: <strong>181 (Toll-free)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--primary)' }} />
                <span>support.civic-innov@jharkhand.gov.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} />
                <span>Yojna Bhawan, Nepal House, Doranda, Ranchi, Jharkhand 834002</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Acknowledgement Strip */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Government of Jharkhand. Designed & developed under the aegis of Department of Higher & Technical Education.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>RTI Portal</span>
            <span>Hyperlink Policy</span>
            <span>Accessibility Statement (WCAG 2.1 AA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
