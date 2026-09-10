import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Phone, UserCheck, X } from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function CitizenLogin({ onClose, onLogin, onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className="role-login-overlay" onClick={onClose}>
      <section className="role-login-modal" style={{ '--login-accent': '#08b879', '--login-soft': '#e7fff4' }} onClick={(event) => event.stopPropagation()} aria-label="Citizen Login">
        <button className="role-login-close" type="button" onClick={onClose} aria-label="Close login"><X size={18} /></button>
        <div className="role-login-watermark" aria-hidden="true"><JharkhandLogo mode="watermark" size={520} /></div>
        <div className="role-login-brand"><JharkhandLogo mode="navbar" size={44} /><div><strong>Government of Jharkhand</strong><span>Dept. of Higher & Technical Education</span></div></div>
        <div className="role-login-heading"><div className="role-login-icon" style={{ backgroundColor: '#08b879' }}><UserCheck size={23} /></div><h2 style={{ color: '#08b879' }}>Citizen Login</h2><p>Report • Participate • Create Change</p></div>
        <form
          className="role-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin('citizen', 'Citizen Login', { ...form, mode: 'login', role: 'citizen' });
          }}
        >
          <label><span>Mobile Number / Email</span><div className="role-login-input"><Phone size={15} /><input type="text" placeholder="Mobile Number / Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div></label>
          <label><span>Password</span><div className="role-login-input"><LockKeyhole size={15} /><input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></label>
          <div className="role-login-options"><label className="role-login-remember"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /><span><Check size={10} /></span>Remember me</label><button type="button" style={{ color: '#08b879' }}>Forgot Password?</button></div>
          <button className="role-login-submit" type="submit" style={{ backgroundColor: '#08b879' }}>Login <ArrowRight size={16} /></button>
          <div className="role-login-divider"><span>OR</span></div>
          <button className="role-login-alt" type="button"><Phone size={15} /> Login with OTP</button>
        </form>
        <p className="role-login-footer">Don't have an account? <strong onClick={() => onSwitchMode?.('register')} style={{ cursor: 'pointer' }}>Register as Citizen</strong></p>
      </section>
    </div>
  );
}
