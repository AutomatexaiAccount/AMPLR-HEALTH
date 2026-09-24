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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to update password. Please try the reset link again.");
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
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: 0 }}
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
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: 0 }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="reset-submit-btn" disabled={loading}>
            {loading ? 'UPDATING...' : 'UPDATE PASSWORD'} <ArrowRight size={18} />
          </button>
        </form>
      </div>

      <div className="reset-footer">
        <div className="secure-badge">
          <ShieldCheck size={14} color="#eab308" />
          <span>SECURE CONNECTION</span>
        </div>
        <p>Designed & Managed by <strong>AutomateX</strong></p>
      </div>
    </div>
  );
};

export default ResetPassword;
