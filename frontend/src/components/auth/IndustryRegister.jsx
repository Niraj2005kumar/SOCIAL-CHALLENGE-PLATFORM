import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
} from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function IndustryRegister({ onClose, onLogin, onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [form, setForm] = useState({ company: '', contactPerson: '', email: '', phone: '', location: '', focusArea: '', password: '', confirmPassword: '' });

  return (
    <div className="role-login-overlay" onClick={onClose}>
      <section
        className="role-login-modal"
        style={{ '--login-accent': '#ff7800', '--login-soft': '#fff1e2' }}
        onClick={(event) => event.stopPropagation()}
        aria-label="Industry Partner Registration"
      >
        <button className="role-login-close" type="button" onClick={onClose} aria-label="Close registration">
          <X size={18} />
        </button>

        <div className="role-login-watermark" aria-hidden="true">
          <JharkhandLogo mode="watermark" size={520} />
        </div>

        <div className="role-login-brand">
          <JharkhandLogo mode="navbar" size={44} />
          <div>
            <strong>Government of Jharkhand</strong>
            <span>Dept. of Higher & Technical Education</span>
          </div>
        </div>

        <div className="role-login-heading">
          <div className="role-login-icon" style={{ backgroundColor: '#ff7800' }}>
            <Building2 size={23} />
          </div>
          <h2 style={{ color: '#ff7800' }}>Register as Industry Partner</h2>
          <p>Collaborate • Invest • Scale Social Impact</p>
        </div>

        <form
          className="role-login-form role-register-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (form.password !== form.confirmPassword) {
              alert('Passwords do not match');
              return;
            }
            onLogin('industry', 'Industry Partner Registration', {
              name: form.company,
              email: form.email,
              password: form.password,
              district: form.location,
              role: 'industry',
              mode: 'register',
            });
          }}
        >
          <div className="role-register-grid">
            <label>
              <span>Company / Organization</span>
              <div className="role-login-input">
                <Building2 size={15} />
                <input type="text" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Contact Person</span>
              <div className="role-login-input">
                <UserRound size={15} />
                <input type="text" placeholder="Full name" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} required />
              </div>
            </label>

            <label className="role-register-span-2">
              <span>Official Email</span>
              <div className="role-login-input">
                <Mail size={15} />
                <input type="email" placeholder="name@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Mobile Number</span>
              <div className="role-login-input">
                <Phone size={15} />
                <input type="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Head Office / Location</span>
              <div className="role-login-input">
                <MapPin size={15} />
                <input type="text" placeholder="City / State" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
            </label>

            <label className="role-register-span-2">
              <span>CSR / Focus Area</span>
              <div className="role-login-input">
                <Landmark size={15} />
                <input type="text" placeholder="Education, health, livelihoods, environment..." value={form.focusArea} onChange={(e) => setForm({ ...form, focusArea: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Password</span>
              <div className="role-login-input">
                <LockKeyhole size={15} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Create password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>

            <label>
              <span>Confirm Password</span>
              <div className="role-login-input">
                <LockKeyhole size={15} />
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
                <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} aria-label="Toggle confirm password visibility">
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>
          </div>

          <label className="role-register-checkbox">
            <input type="checkbox" checked={agreeTerms} onChange={(event) => setAgreeTerms(event.target.checked)} />
            <span><Check size={10} /></span>
            I agree to partner with the Jharkhand innovation platform and authorize CSR collaboration reviews.
          </label>

          <button className="role-login-submit" type="submit" style={{ backgroundColor: '#ff7800' }} disabled={!agreeTerms}>
            Create Partnership Account <ArrowRight size={16} />
          </button>

          <div className="role-login-divider"><span>OR</span></div>

          <button className="role-login-alt" type="button" onClick={() => onSwitchMode?.('login')}>
            <Building2 size={15} /> Continue with existing account
          </button>
        </form>

        <p className="role-login-footer">
          Already registered? <strong onClick={() => onSwitchMode?.('login')} style={{ cursor: 'pointer' }}>Login here</strong>
        </p>
      </section>
    </div>
  );
}
