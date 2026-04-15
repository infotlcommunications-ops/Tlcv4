import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await loginAdmin(email, password);
      navigate(location.state?.from?.pathname || '/admin');
    } catch (err) {
      setError(err.message || 'Invalid login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-card card login-card">
      <h1>Admin Login</h1>
      <p>Secure login using Firebase Authentication.</p>
      <form className="form-card plain-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </div>
  );
}
