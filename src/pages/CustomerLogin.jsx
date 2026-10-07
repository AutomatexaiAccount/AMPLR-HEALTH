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
  const [isResumeSignup, setIsResumeSignup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.from || '/';

  // Helper to normalize phone number to canonical +919876543210 format
  const getCanonicalPhone = (rawPhone) => {
    if (!rawPhone) return '';
    const digits = rawPhone.replace(/\D/g, '');
    if (digits.length === 10) return `+91${digits}`;
    if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
    return rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`;
  };

  // Helper to reset states cleanly
  const resetFormState = () => {
    setError('');
    setSuccess('');
    setShowOtpInput(false);
    setShowProfileForm(false);
    setOtp('');
    setIsResumeSignup(false);
    setLoading(false);
    setLoadingText('');
  };

  // --- Sign In (Email Only) ---
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText('Signing in...');
    setError('');
    setSuccess('');
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) throw signInError;
      if (data?.user) navigate(returnUrl);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('email not confirmed')) {
        setError("Please verify your email address before signing in. Check your inbox for the verification link.");
      } else if (err.message && (err.message.toLowerCase().includes('invalid login credentials') || err.message.toLowerCase().includes('invalid_grant'))) {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else {
        setError("Authentication failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first to reset your password.");
      return;
    }
    setLoading(true);
    setLoadingText('Sending reset link...');
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess("Password reset link has been sent to your email.");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  // --- Sign Up (Email) ---
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Please enter a valid password (at least 6 characters).");
      return;
    }

    setLoading(true);
    setLoadingText('Creating account...');
    setError('');
    setSuccess('');
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: 'https://amplrhealth.com/verified',
          data: { full_name: fullName.trim() }
        }
      });
      if (signUpError) throw signUpError;
      if (data?.user?.identities?.length === 0) {
        throw new Error('This email ID is already registered. Please sign in instead.');
      }
      setSuccess("Your account setup is complete. We've sent a verification link to your email address. Please verify your email before signing in.");
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('already registered')) {
        setError("This email address is already associated with another account. Please use a different email address or sign in to the existing account.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  // --- Sign Up (Phone OTP) ---
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !indianPhoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    setLoading(true);
    setLoadingText("Sending verification code...");
    setError('');
    setSuccess('');
    setOtp(''); // Reset any stale OTP token

    const formattedPhone = getCanonicalPhone(phone);

    try {
      // Check account status before sending OTP to save SMS costs & identify returning vs new vs complete
      let accountStatus = 'new';
      try {
        const { data: statusData, error: statusErr } = await supabase.rpc('check_phone_status', { phone_number: formattedPhone });
        if (!statusErr && statusData) {
          if (typeof statusData === 'object') {
            accountStatus = statusData.status || (statusData.is_complete ? 'complete' : (statusData.exists ? 'incomplete' : 'new'));
          } else if (typeof statusData === 'string') {
            accountStatus = statusData;
          }
        } else {
          // Fallback check
          const { data: phoneExists } = await supabase.rpc('check_phone_exists', { phone_number: formattedPhone });
          const { data: pubUser } = await supabase.from('users').select('email').eq('phone', formattedPhone).maybeSingle();
          if (pubUser?.email) {
            accountStatus = 'complete';
          } else if (phoneExists) {
            accountStatus = 'incomplete';
          }
        }
      } catch (checkErr) {
        console.warn('Account check note:', checkErr);
      }

      // If account is already fully registered with email -> DO NOT send OTP, redirect to Sign In
      if (accountStatus === 'complete') {
        setError("This mobile number is already associated with a registered account. Please sign in to continue.");
        setLoadingText("Redirecting you to Sign In...");
        setTimeout(() => {
          setIsSignUp(false);
          setLoading(false);
          setLoadingText('');
        }, 1800);
        return;
      }

      // Check if this is an incomplete/abandoned signup resume
      const isResume = (accountStatus === 'incomplete');
      setIsResumeSignup(isResume);

      // Send OTP via Supabase
      const { error: otpError } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (otpError) throw otpError;

      if (isResume) {
        setSuccess("A new verification code has been sent to your mobile number. Verify it to continue setting up your account.");
      } else {
        setSuccess("OTP sent successfully to your mobile number. Please enter the verification code to continue.");
      }
      setShowOtpInput(true);
    } catch (err) {
      console.error('Send OTP error:', err);
      if (err.message && (err.message.toLowerCase().includes('network') || err.message.toLowerCase().includes('fetch'))) {
        setError("Something went wrong while connecting to the server. Please check your internet connection and try again.");
      } else {
        setError("We couldn't send the verification code right now. Please try again in a moment.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setLoadingText("Sending verification code...");
    setError('');
    setSuccess('');
    setOtp(''); // Discard previous OTP

    const formattedPhone = getCanonicalPhone(phone);
    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
      if (resendError) throw resendError;
      setSuccess("A new verification code has been sent to your mobile number.");
    } catch (err) {
      console.error('Resend OTP error:', err);
      if (err.message && (err.message.toLowerCase().includes('network') || err.message.toLowerCase().includes('fetch'))) {
        setError("Something went wrong while connecting to the server. Please check your internet connection and try again.");
      } else {
        setError("We couldn't send the verification code right now. Please try again in a moment.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Invalid verification code. Please check the OTP and try again.");
      return;
    }
    setLoading(true);
    setLoadingText("Verifying your code...");
    setError('');
    setSuccess('');

    const formattedPhone = getCanonicalPhone(phone);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp.trim(),
        type: 'sms'
      });
      
      if (verifyError) throw verifyError;
      
      if (data?.user) {
        if (isResumeSignup) {
          setSuccess("Mobile number verified. Please complete your profile to finish creating your account.");
        } else {
          setSuccess("Mobile number verified successfully.");
        }
        setShowProfileForm(true);
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('expired') || msg.includes('expire')) {
        setError("This verification code has expired. Please request a new OTP.");
      } else if (msg.includes('invalid') || msg.includes('token') || msg.includes('mismatch') || msg.includes('bad')) {
        setError("Invalid verification code. Please check the OTP and try again.");
      } else if (msg.includes('session') || msg.includes('jwt') || msg.includes('unauthorized')) {
        setError("Your verification session has expired. Please request a new OTP to continue.");
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setError("Something went wrong while connecting to the server. Please check your internet connection and try again.");
      } else {
        setError("Invalid verification code. Please check the OTP and try again.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Please enter a valid password (at least 6 characters).");
      return;
    }

    setLoading(true);
    setLoadingText("Completing your registration...");
    setError('');
    setSuccess('');

    const formattedPhone = getCanonicalPhone(phone);

    try {
      const { data: authData, error: updateError } = await supabase.auth.updateUser({
        email: email.trim().toLowerCase(),
        password: password,
        data: { full_name: fullName.trim(), phone: formattedPhone }
      }, {
        emailRedirectTo: 'https://amplrhealth.com/verified'
      });
      
      if (updateError) throw updateError;

      // Sync into public.users with canonical phone and role
      if (authData?.user?.id) {
        try {
          await supabase.rpc('save_user_profile', {
            user_id: authData.user.id,
            p_full_name: fullName.trim(),
            p_email: email.trim().toLowerCase(),
            p_phone: formattedPhone
          });
        } catch (rpcErr) {
          console.warn('save_user_profile note:', rpcErr);
        }

        const { error: dbError } = await supabase
          .from('users')
          .upsert({
            id: authData.user.id,
            email: email.trim().toLowerCase(),
            full_name: fullName.trim(),
            phone: formattedPhone,
            role: 'user'
          }, { onConflict: 'id' });
          
        if (dbError) console.error("Database update error:", dbError);
      }
      
      // Sign out according to standard app flow to enforce email verification
      await supabase.auth.signOut();
      
      setSuccess("Your account setup is complete. We've sent a verification link to your email address. Please verify your email before signing in.");
      
      // Reset form states cleanly and transition to Sign In
      setShowProfileForm(false);
      setShowOtpInput(false);
      setPhone('');
      setOtp('');
      setEmail('');
      setPassword('');
      setFullName('');
      setIsResumeSignup(false);
      setIsSignUp(false);
    } catch (err) {
      console.error('Profile complete error:', err);
      const msg = (err.message || '').toLowerCase();
      const code = (err.code || '').toLowerCase();
      const status = err.status || err.statusCode;

      if (
        msg.includes('already registered') ||
        msg.includes('already exists') ||
        msg.includes('already in use') ||
        msg.includes('email') ||
        msg.includes('unique') ||
        code.includes('email_exists') ||
        code.includes('identity_already_exists') ||
        status === 422
      ) {
        setError("This email address is already associated with another account. Please use a different email address or sign in to the existing account.");
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setError("Something went wrong while connecting to the server. Please check your internet connection and try again.");
      } else {
        setError("We couldn't save your profile right now. Please try again.");
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleChangeNumber = () => {
    setShowOtpInput(false);
    setOtp('');
    setError('');
    setSuccess('');
    setIsResumeSignup(false);
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
                  onClick={() => { setSignUpMethod('phone'); resetFormState(); }}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: signUpMethod === 'phone' ? '#ecfdf5' : '#fff', color: signUpMethod === 'phone' ? '#059669' : '#64748b', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                >
                  <Phone size={16} /> Mobile OTP
                </button>
                <button 
                  type="button"
                  onClick={() => { setSignUpMethod('email'); resetFormState(); }}
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
                  {loading ? <span className="btn-loading">{loadingText || 'Processing...'}</span> : <><span>Sign In</span><ArrowRight size={18} /></>}
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
                      maxLength={10} disabled={showOtpInput || loading} required style={{ paddingLeft: '50px' }}
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <div className="input-field-wrapper" style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label htmlFor="otp" style={{ marginBottom: 0 }}>Enter 6-digit OTP</label>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                          type="button" 
                          onClick={handleResendOtp} 
                          disabled={loading}
                          style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                        >
                          Resend OTP
                        </button>
                        <button 
                          type="button" 
                          onClick={handleChangeNumber} 
                          disabled={loading}
                          style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}
                        >
                          Change Number
                        </button>
                      </div>
                    </div>
                    <div className="input-group">
                      <KeyRound size={18} className="input-icon" />
                      <input
                        id="otp" type="text" className="form-input" placeholder="••••••"
                        value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6} required disabled={loading}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">{loadingText || 'Processing...'}</span> : <><span>{showOtpInput ? 'Verify OTP & Continue' : 'Send OTP'}</span><ArrowRight size={18} /></>}
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
                    <input id="fullNameProfile" type="text" className="form-input" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={loading} />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="emailProfile">Email Address</label>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input id="emailProfile" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="passwordProfile" style={{ marginBottom: '0.5rem' }}>Create Password</label>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input id="passwordProfile" type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} disabled={loading} style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px', marginBottom: '20px', lineHeight: '1.4', background: '#f8fafc', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
                  <strong>Note:</strong> You will need to confirm this email address to activate your account, so please enter a valid email.
                </p>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">{loadingText || 'Completing your registration...'}</span> : <><span>Complete Profile</span><ArrowRight size={18} /></>}
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
                    <input id="fullName" type="text" className="form-input" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={loading} />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input id="email" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                  </div>
                </div>
                <div className="input-field-wrapper">
                  <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Password</label>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input id="password" type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} disabled={loading} style={{ paddingRight: '45px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="btn-loading">{loadingText || 'Creating Account...'}</span> : <><span>Create Account</span><ArrowRight size={18} /></>}
                </button>
              </form>
            )}

            <div className="auth-switch-mode">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                  type="button" 
                  className="switch-btn"
                  onClick={() => { setIsSignUp(!isSignUp); resetFormState(); }}
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

