import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
} from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function UniversityRegister({ onClose, onLogin, onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [form, setForm] = useState({ name: '', contactPerson: '', email: '', phone: '', district: '', domain: '', password: '', confirmPassword: '' });

  return (
    <div className="role-login-overlay" onClick={onClose}>
      <section
        className="role-login-modal"
        style={{ '--login-accent': '#7029f4', '--login-soft': '#f1eaff' }}
        onClick={(event) => event.stopPropagation()}
        aria-label="University Institution Registration"
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
          <div className="role-login-icon" style={{ backgroundColor: '#7029f4' }}>
            <GraduationCap size={23} />
          </div>
          <h2 style={{ color: '#7029f4' }}>Register Your Institution</h2>
          <p>Build Research • Mentor Teams • Solve Local Challenges</p>
        </div>

        <form
          className="role-login-form role-register-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (form.password !== form.confirmPassword) {
              alert('Passwords do not match');
              return;
            }
            onLogin('university', 'University Institution Registration', {
              name: form.name,
              email: form.email,
              password: form.password,
              district: form.district,
              role: 'university',
              mode: 'register',
            });
          }}
        >
          <div className="role-register-grid">
            <label>
              <span>University / Institution Name</span>
              <div className="role-login-input">
                <Landmark size={15} />
                <input type="text" placeholder="Institution name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Dean / Contact Person</span>
              <div className="role-login-input">
                <UserRound size={15} />
                <input type="text" placeholder="Full name" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} required />
              </div>
            </label>

            <label className="role-register-span-2">
              <span>Official Email</span>
              <div className="role-login-input">
                <Mail size={15} />
                <input type="email" placeholder="name@university.edu" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
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
              <span>City / District</span>
              <div className="role-login-input">
                <MapPin size={15} />
                <input type="text" placeholder="Your location" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required />
              </div>
            </label>

            <label>
              <span>Academic Domain</span>
              <div className="role-login-input">
                <GraduationCap size={15} />
                <input type="text" placeholder="Engineering, Social Science, AI, etc." value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} required />
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
            I agree to participate in public problem-solving and academic challenge facilitation for Jharkhand.
          </label>

          <button className="role-login-submit" type="submit" style={{ backgroundColor: '#7029f4' }} disabled={!agreeTerms}>
            Create Institution Account <ArrowRight size={16} />
          </button>

          <div className="role-login-divider"><span>OR</span></div>

          <button className="role-login-alt" type="button" onClick={() => onSwitchMode?.('login')}>
            <GraduationCap size={15} /> Continue with existing account
          </button>
        </form>

        <p className="role-login-footer">
          Already registered? <strong onClick={() => onSwitchMode?.('login')} style={{ cursor: 'pointer' }}>Login here</strong>
        </p>
      </section>
    </div>
  );
}
