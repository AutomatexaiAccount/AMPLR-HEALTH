import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ShieldCheck, HeartPulse, Stethoscope, ArrowRight, Eye, EyeOff, Phone, KeyRound } from 'lucide-react';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Email Auth States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone Auth States
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.from || '/';

  // --- Email Authentication ---
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: 'https://amplrhealth.com/verified',
            data: { full_name: fullName }
          }
        });
        if (signUpError) throw signUpError;
        if (data?.user?.identities?.length === 0) {
          throw new Error('This email ID is already registered with us, please try with another email ID');
        }
        setSuccess("You have successfully registered! Please verify your email address to activate your account.");
        setIsSignUp(false);
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        if (data?.user) navigate(returnUrl);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first to reset your password.");
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess("Password reset link has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  // --- Phone OTP Authentication ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Ensure the phone number has the country code (assuming India +91 for now)
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      
      const payload = { phone: formattedPhone };
      if (isSignUp && fullName) {
        payload.options = { data: { full_name: fullName } };
      }

      const { error } = await supabase.auth.signInWithOtp(payload);

      if (error) throw error;

      setSuccess("OTP sent successfully to your mobile number!");
      setShowOtpInput(true); // Show OTP input field
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      if (data?.user) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate(returnUrl), 1000);
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
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

            {/* Login/Signup Method Toggle */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button 
                type="button"
                onClick={() => { setLoginMethod('phone'); setError(''); setSuccess(''); setShowOtpInput(false); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: loginMethod === 'phone' ? '#ecfdf5' : '#fff', color: loginMethod === 'phone' ? '#059669' : '#64748b', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
              >
                <Phone size={16} /> Mobile OTP
              </button>
              <button 
                type="button"
                onClick={() => { setLoginMethod('email'); setError(''); setSuccess(''); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: loginMethod === 'email' ? '#eff6ff' : '#fff', color: loginMethod === 'email' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
              >
                <Mail size={16} /> Email & Password
              </button>
            </div>

            {error && <div className="auth-alert error-alert">{error}</div>}
            {success && <div className="auth-alert success-alert">{success}</div>}

            {/* ===================================== */}
            {/* PHONE OTP FORM (LOGIN/SIGNUP) */}
            {/* ===================================== */}
            {loginMethod === 'phone' && (
              <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="auth-form">
                
                {isSignUp && !showOtpInput && (
                  <div className="input-field-wrapper" style={{ marginBottom: '15px' }}>
                    <label htmlFor="phoneFullName">Full Name</label>
                    <div className="input-group">
                      <User size={18} className="input-icon" />
                      <input
                        id="phoneFullName"
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
                  <label htmlFor="phone">Mobile Number</label>
                  <div className="input-group">
                    <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: '600' }}>+91</span>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      disabled={showOtpInput}
                      required
                      style={{ paddingLeft: '50px' }}
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <div className="input-field-wrapper" style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="otp">Enter 6-digit OTP</label>
                      <button 
                        type="button" 
                        onClick={() => { setShowOtpInput(false); setOtp(''); setError(''); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}
                      >
                        Change Number
                      </button>
                    </div>
                    <div className="input-group">
                      <KeyRound size={18} className="input-icon" />
                      <input
                        id="otp"
                        type="text"
                        className="form-input"
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">Processing...</span>
                  ) : (
                    <>
                      <span>{showOtpInput ? 'Verify OTP & Login' : 'Send OTP'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ===================================== */}
            {/* EMAIL LOGIN / SIGNUP FORM */}
            {/* ===================================== */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailAuth} className="auth-form">
                
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                    {!isSignUp && (
                      <button 
                        type="button" 
                        onClick={handleForgotPassword}
                        style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      style={{ paddingRight: '45px' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">Processing...</span>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In with Email'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

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
