import { useState } from 'react';
import { api } from '../../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'citizen', district: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await api.post('/auth/register', form);
      setMessage('Registration successful. You can now log in.');
      setForm({ name: '', email: '', password: '', role: 'citizen', district: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <section>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="district" placeholder="District" value={form.district} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="university">University</option>
          <option value="industry">Industry</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p role="status">{message}</p>}
    </section>
  );
}
