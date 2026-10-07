import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import './AuthVerify.css';

const AuthVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your secure link...');

  useEffect(() => {
    const verifyToken = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type') || 'recovery';

      if (!token_hash) {
        setStatus('error');
        setMessage('Invalid or missing verification link. Please request a new password reset link.');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type
        });

        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage('Security check passed! Redirecting to set your new password...');

        // Smooth redirect to Reset Password page
        setTimeout(() => {
          navigate('/reset-password', { replace: true });
        }, 1200);
      } catch (err) {
        console.error('OTP Verification Error:', err);
        setStatus('error');
        setMessage(err.message || 'This reset link has expired or has already been used. Please request a new one.');
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="auth-verify-page">
      <div className="auth-verify-card">
        <div className="auth-verify-logo-wrapper">
          <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="auth-verify-logo" />
        </div>
        <h3 className="auth-verify-brand">AMPLR HEALTH</h3>

        {status === 'verifying' && (
          <div className="auth-verify-content">
            <div className="auth-verify-icon-wrapper spinner-box">
              <Loader2 size={40} className="auth-verify-spinner" />
            </div>
            <h1 className="auth-verify-title">Security Verification</h1>
            <p className="auth-verify-subtitle">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="auth-verify-content">
            <div className="auth-verify-icon-wrapper success-box">
              <ShieldCheck size={44} color="#22c55e" />
            </div>
            <h1 className="auth-verify-title">Verified Securely</h1>
            <p className="auth-verify-subtitle success-text">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="auth-verify-content">
            <div className="auth-verify-icon-wrapper error-box">
              <AlertCircle size={44} color="#ef4444" />
            </div>
            <h1 className="auth-verify-title">Link Expired or Invalid</h1>
            <p className="auth-verify-subtitle error-text">{message}</p>

            <div className="auth-verify-actions">
              <button 
                onClick={() => navigate('/partner-login')}
                className="auth-verify-btn primary"
              >
                Back to Partner Portal
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="auth-verify-btn secondary"
              >
                Back to Customer Login
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="auth-verify-footer">
        <div className="secure-badge">
          <ShieldCheck size={14} color="#e11d48" />
          <span>AMPLR SECURITY PROTOCOL</span>
        </div>
      </div>
    </div>
  );
};

export default AuthVerify;
