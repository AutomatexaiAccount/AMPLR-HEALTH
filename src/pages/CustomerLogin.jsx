import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ShieldCheck, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.from || '/';

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (signUpError) throw signUpError;
        setSuccess("You have successfully registered! To activate your account, please verify your email address using the link sent to your email. If it's not in your inbox, please check your spam folder, activate it, and then you can log in.");
        setIsSignUp(false); // Switch to login after successful signup
        
      } else {
        // Sign In Flow
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
           if (signInError.message.includes('Email not confirmed')) {
             throw new Error("Please verify your email address before logging in.");
           }
           throw signInError;
        }

        if (data?.user) {
          navigate(returnUrl);
        }
      }
    } catch (err) {
      if (err.message === 'User already registered') {
        setError('This email is already registered with us. Please use another email address or sign in.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        
        {/* Left Presentation Side */}
        <div className="auth-presentation">
          <div className="presentation-overlay"></div>
          <div className="presentation-content">
            <Link to="/" className="auth-brand-logo">
              <img src="/amplr-logo.jpeg" alt="AMPLR Health" />
            </Link>
            
            <div className="presentation-text">
              <h1>
                Your Health,<br/>
                <span className="text-gradient">Simplified.</span>
              </h1>
              <p>Join thousands of users who trust AMPLR Health for their home healthcare, nursing, and diagnostics needs.</p>
            </div>

            <div className="presentation-badges">
              <div className="auth-badge">
                <ShieldCheck size={20} className="badge-icon" />
                <span>Verified Professionals</span>
              </div>
              <div className="auth-badge">
                <HeartPulse size={20} className="badge-icon" />
                <span>24/7 Priority Support</span>
              </div>
              <div className="auth-badge">
                <Stethoscope size={20} className="badge-icon" />
                <span>Family Profile Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-section">
          <div className="auth-form-card">
            
            <div className="form-header">
              <h2>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
              <p>
                {isSignUp 
                  ? 'Sign up to book services and claim offers.' 
                  : 'Enter your credentials to access your account.'}
              </p>
            </div>

            {error && <div className="auth-alert error-alert">{error}</div>}
            {success && <div className="auth-alert success-alert">{success}</div>}

            <form onSubmit={handleAuth} className="auth-form">
              
              {isSignUp && (
                <div className="input-field-wrapper">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input
                      id="fullName"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div className="input-field-wrapper">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">Processing...</span>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            <div className="auth-switch-mode">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                  type="button" 
                  className="switch-btn"
                  onClick={() => { 
                    setIsSignUp(!isSignUp); 
                    setError(''); 
                    setSuccess(''); 
                  }}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerLogin;
