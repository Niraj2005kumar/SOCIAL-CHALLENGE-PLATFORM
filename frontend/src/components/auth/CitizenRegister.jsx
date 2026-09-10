import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function CitizenRegister({ onClose, onLogin, onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', email: '', village: '', district: '', password: '', confirmPassword: '' });

  return (
    <div className="role-login-overlay" onClick={onClose}>
      <section
        className="role-login-modal"
        style={{ '--login-accent': '#08b879', '--login-soft': '#e7fff4' }}
        onClick={(event) => event.stopPropagation()}
        aria-label="Citizen Registration"
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
          <div className="role-login-icon" style={{ backgroundColor: '#08b879' }}>
            <ShieldCheck size={23} />
          </div>
          <h2 style={{ color: '#08b879' }}>Citizen Registration</h2>
          <p>Join the public problem-solving network</p>
        </div>

        <form
          className="role-login-form role-register-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (form.password !== form.confirmPassword) {
              alert('Passwords do not match');
              return;
            }
            onLogin('citizen', 'Citizen Registration', {
              name: form.name,
              email: form.email,
              password: form.password,
              district: form.district,
              role: 'citizen',
              mode: 'register',
            });
          }}
        >
          <div className="role-register-grid">
            <label>
              <span>Full Name</span>
              <div className="role-login-input">
                <UserRound size={15} />
                <input type="text" placeholder="Enter full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Mobile Number</span>
              <div className="role-login-input">
                <Phone size={15} />
                <input type="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </label>

            <label className="role-register-span-2">
              <span>Email Address</span>
              <div className="role-login-input">
                <Mail size={15} />
                <input type="email" placeholder="name@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Village / Ward</span>
              <div className="role-login-input">
                <MapPin size={15} />
                <input type="text" placeholder="eg. Ranchi, Ward-12" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>District</span>
              <div className="role-login-input">
                <MapPin size={15} />
                <select value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required style={{ width: '100%', border: 0, background: 'transparent', outline: 'none', color: '#1e293b', font: 'inherit', fontSize: '10px' }}>
                  <option value="" disabled>Choose district</option>
                  <option>Ranchi</option>
                  <option>East Singhbhum</option>
                  <option>West Singhbhum</option>
                  <option>Hazaribagh</option>
                  <option>Dhanbad</option>
                </select>
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
            I agree to the platform terms and consent to public issue review by local authorities.
          </label>

          <button className="role-login-submit" type="submit" style={{ backgroundColor: '#08b879' }} disabled={!agreeTerms}>
            Create Account <ArrowRight size={16} />
          </button>

          <div className="role-login-divider"><span>OR</span></div>

          <button className="role-login-alt" type="button" onClick={() => onSwitchMode?.('login')}>
            <ShieldCheck size={15} /> Continue with existing account
          </button>
        </form>

        <p className="role-login-footer">
          Already have an account? <strong onClick={() => onSwitchMode?.('login')} style={{ cursor: 'pointer' }}>Login here</strong>
        </p>
      </section>
    </div>
  );
}
