import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '' 
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await register(formData);
      navigate('/dashboard'); // Auto-login and redirect upon success
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (typeof data === 'object') {
          const firstKey = Object.keys(data)[0];
          const firstMessage = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
          setError(`${firstKey.toUpperCase()}: ${firstMessage}`);
        } else {
          setError('Failed to register account. Please check your data.');
        }
      } else {
        setError('Network error: Unable to connect to backend server.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '50px auto', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
      <h2 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Create an Account</h2>
      {error && <p style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '14px' }}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '14px' }}>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '14px' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px' }}>Confirm Password:</label>
          <input
            type="password"
            name="password_confirm"
            value={formData.password_confirm}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting} 
          style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {submitting ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
        Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Sign In</Link>
      </p>
    </div>
  );
};

export default Register;