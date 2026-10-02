import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ShieldCheck, HeartPulse, Stethoscope, ArrowRight, Eye, EyeOff, Phone, KeyRound } from 'lucide-react';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState('phone'); // 'phone' or 'email'
  
  // Auth States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.from || '/';

  // --- Sign In (Email Only) ---
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      if (data?.user) navigate(returnUrl);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('email not confirmed')) {
        setError(
          <div style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>
            <strong style={{ display: 'block', marginBottom: '5px' }}>Account Not Active!</strong>
            Your account will not be active until you verify your email address. Please check your inbox (and <strong>spam/junk folder</strong>) for the verification link we sent you. 
            Once you click the link, you will be automatically verified and can log in from there, or you can come back here to log in.
          </div>
        );
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first to reset your password.");
      return;
    }
    setLoading(true); setError(''); setSuccess('');
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

  // --- Sign Up (Email) ---
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
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
        throw new Error('This email ID is already registered. Please sign in instead.');
      }
      setSuccess("You have successfully registered! Please check your email and verify your account to start booking.");
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Sign Up (Phone OTP) ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (error) throw error;
      setSuccess("OTP sent successfully to your mobile number!");
      setShowOtpInput(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
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
    setLoading(true); setError(''); setSuccess('');
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      if (data?.user) {
        setSuccess("OTP Verified! Please complete your profile.");
        setShowProfileForm(true);
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      const { error } = await supabase.auth.updateUser({
        email: email,
        password: password,
        data: { full_name: fullName }
      });
      if (error) throw error;
      
      await supabase.auth.signOut(); // Sign out to force email verification
      
      setSuccess("A verification link has been sent. Please verify your account to start booking services.");
      setShowProfileForm(false);
      setShowOtpInput(false);
      setPhone('');
      setOtp('');
      setEmail('');
      setPassword('');
      setFullName('');
      setIsSignUp(false); // Switch back to login
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
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
              <h1>Your Health,<br/><span className="text-gradient">Simplified.</span></h1>
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
                  : 'Enter your email and password to access your account.'}
              </p>
            </div>

            {/* Toggle between Email and Phone ONLY for Sign Up */}
            {isSignUp && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                  type="button"
                  onClick={() => { setSignUpMethod('phone'); setError(''); setSuccess(''); }}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: signUpMethod === 'phone' ? '#ecfdf5' : '#fff', color: signUpMethod === 'phone' ? '#059669' : '#64748b', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                >
                  <Phone size={16} /> Mobile OTP
                </button>
                <button 
                  type="button"
                  onClick={() => { setSignUpMethod('email'); setError(''); setSuccess(''); }}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: signUpMethod === 'email' ? '#eff6ff' : '#fff', color: signUpMethod === 'email' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                >
                  <Mail size={16} /> Email
                </button>
              </div>
            )}

            {error && <div className="auth-alert error-alert">{error}</div>}
            {success && <div className="auth-alert success-alert">{success}</div>}

            {/* ===================================== */}
            {/* SIGN IN FORM (EMAIL ONLY)             */}
            {/* ===================================== */}
            {!isSignUp && (
              <form onSubmit={handleSignIn} className="auth-form">
                <div className="input-field-wrapper">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="email" type="email" className="form-input"
                      placeholder="you@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} required
                    />
                  </div>
                </div>

                <div className="input-field-wrapper">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                    <button type="button" onClick={handleForgotPassword} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
                      Forgot Password?
                    </button>
                  </div>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="password" type={showPassword ? "text" : "password"} className="form-input"
                      placeholder="••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)} required style={{ paddingRight: '45px' }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">Processing...</span> : <><span>Sign In</span><ArrowRight size={18} /></>}
                </button>
              </form>
            )}

            {/* ===================================== */}
            {/* SIGN UP FORM (MOBILE OTP)             */}
            {/* ===================================== */}
            {isSignUp && signUpMethod === 'phone' && !showProfileForm && (
              <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="auth-form">
                <div className="input-field-wrapper">
                  <label htmlFor="phone">Mobile Number</label>
                  <div className="input-group">
                    <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: '600' }}>+91</span>
                    <input
                      id="phone" type="tel" className="form-input" placeholder="9876543210"
                      value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      maxLength={10} disabled={showOtpInput} required style={{ paddingLeft: '50px' }}
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <div className="input-field-wrapper" style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="otp">Enter 6-digit OTP</label>
                      <button type="button" onClick={() => { setShowOtpInput(false); setOtp(''); setError(''); }} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}>
                        Change Number
                      </button>
                    </div>
                    <div className="input-group">
                      <KeyRound size={18} className="input-icon" />
                      <input
                        id="otp" type="text" className="form-input" placeholder="••••••"
                        value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6} required
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">Processing...</span> : <><span>{showOtpInput ? 'Verify OTP & Continue' : 'Send OTP'}</span><ArrowRight size={18} /></>}
                </button>
              </form>
            )}

            {/* ===================================== */}
            {/* COMPLETE PROFILE FORM (AFTER OTP)     */}
            {/* ===================================== */}
            {isSignUp && signUpMethod === 'phone' && showProfileForm && (
              <form onSubmit={handleCompleteProfile} className="auth-form">
                <div className="input-field-wrapper">
                  <label htmlFor="fullNameProfile">Full Name</label>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input id="fullNameProfile" type="text" className="form-input" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="emailProfile">Email Address</label>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input id="emailProfile" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="passwordProfile" style={{ marginBottom: '0.5rem' }}>Create Password</label>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input id="passwordProfile" type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px', marginBottom: '20px', lineHeight: '1.4', background: '#f8fafc', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
                  <strong>Note:</strong> You will need to confirm this email address to activate your account, so please enter a valid email.
                </p>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">Processing...</span> : <><span>Complete Profile</span><ArrowRight size={18} /></>}
                </button>
              </form>
            )}

            {/* ===================================== */}
            {/* SIGN UP FORM (EMAIL)                  */}
            {/* ===================================== */}
            {isSignUp && signUpMethod === 'email' && (
              <form onSubmit={handleEmailSignUp} className="auth-form">
                <div className="input-field-wrapper">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input id="fullName" type="text" className="form-input" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input id="email" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Password</label>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input id="password" type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">Processing...</span> : <><span>Create Account</span><ArrowRight size={18} /></>}
                </button>
              </form>
            )}

            <div className="auth-switch-mode">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                  type="button" 
                  className="switch-btn"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); setShowOtpInput(false); setShowProfileForm(false); }}
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

