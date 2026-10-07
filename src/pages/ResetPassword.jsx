import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Key, CheckCircle, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is an active session for password recovery
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        console.log('No active recovery session detected.');
      }
    });
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;
      
      setSuccess("Your password has been successfully updated! Redirecting to login...");
      setTimeout(() => {
        navigate('/partner-login');
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update password. Please request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-card">
        <div className="reset-logo-wrapper">
          <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="reset-logo" />
        </div>
        <h3 className="reset-brand">AMPLR HEALTH</h3>
        <h1 className="reset-title">Set New Password</h1>
        <p className="reset-subtitle">Create a new secure password for your account.</p>

        {error && <div className="reset-alert error">{error}</div>}
        {success && <div className="reset-alert success">{success}</div>}

        <form onSubmit={handleResetPassword} className="reset-form">
          <div className="reset-form-group">
            <label>NEW PASSWORD</label>
            <div className="reset-input-wrapper">
              <Key size={16} className="reset-input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingRight: '45px' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', padding: 0 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="reset-form-group">
            <label>CONFIRM PASSWORD</label>
            <div className="reset-input-wrapper">
              <CheckCircle size={16} className="reset-input-icon" />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingRight: '45px' }}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', padding: 0 }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="reset-submit-btn" disabled={loading}>
            {loading ? 'UPDATING...' : 'UPDATE PASSWORD'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
          <button 
            onClick={() => navigate('/partner-login')}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Partner Login
          </button>
          <span style={{ color: '#52525b' }}>•</span>
          <button 
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Customer Login
          </button>
        </div>
      </div>

      <div className="reset-footer">
        <div className="secure-badge">
          <ShieldCheck size={14} color="#e11d48" />
          <span>SECURE ENCRYPTED CONNECTION</span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
