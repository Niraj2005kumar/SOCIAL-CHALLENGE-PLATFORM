import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Shield, X } from 'lucide-react';
import JharkhandLogo from '../common/JharkhandLogo';

export default function GovernmentAdminLogin({ onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="role-login-overlay" onClick={onClose}>
      <section className="role-login-modal" style={{ '--login-accent': '#1769ee', '--login-soft': '#eaf2ff' }} onClick={(event) => event.stopPropagation()} aria-label="Government Admin Login">
        <button className="role-login-close" type="button" onClick={onClose} aria-label="Close login"><X size={18} /></button>
        <div className="role-login-watermark" aria-hidden="true"><JharkhandLogo mode="watermark" size={520} /></div>
        <div className="role-login-brand"><JharkhandLogo mode="navbar" size={44} /><div><strong>Government of Jharkhand</strong><span>Dept. of Higher & Technical Education</span></div></div>
        <div className="role-login-heading"><div className="role-login-icon" style={{ backgroundColor: '#1769ee' }}><Shield size={23} /></div><h2 style={{ color: '#1769ee' }}>Government Admin Login</h2><p>Monitor • Validate • Enable Solutions</p></div>
        <form className="role-login-form" onSubmit={(event) => { event.preventDefault(); onLogin('admin', 'Government Admin Login'); }}>
          <label><span>Official Email / ID</span><div className="role-login-input"><Mail size={15} /><input type="email" placeholder="Official Email / ID" required /></div></label>
          <label><span>Password</span><div className="role-login-input"><LockKeyhole size={15} /><input type={showPassword ? 'text' : 'password'} placeholder="Password" required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></label>
          <div className="role-login-options"><label className="role-login-remember"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /><span><Check size={10} /></span>Remember me</label><button type="button" style={{ color: '#1769ee' }}>Forgot Password?</button></div>
          <button className="role-login-submit" type="submit" style={{ backgroundColor: '#1769ee' }}>Login <ArrowRight size={16} /></button>
          <div className="role-login-divider"><span>OR</span></div>
          <button className="role-login-alt" type="button"><Shield size={15} /> Login with NIC SSO</button>
        </form>
        <p className="role-login-footer">Need access? <strong>Contact your department admin</strong></p>
      </section>
    </div>
  );
}
