import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ShieldCheck, Loader2, Mail, Lock, User, 
  ArrowRight, CheckCircle, AlertCircle, LogOut, LayoutDashboard,
  Eye, EyeOff, HeartPulse, Stethoscope 
} from 'lucide-react';
import './PartnerPortal.css';

const PartnerPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set mode based on current URL path
  const [isLogin, setIsLogin] = useState(!location.pathname.includes('setup'));
  const [showPassword, setShowPassword] = useState(false);
  
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Partner Profile State
  const [partnerProfile, setPartnerProfile] = useState(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Only for setup

  useEffect(() => {
    if (location.pathname.includes('setup')) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchPartnerProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchPartnerProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPartnerProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error("Not a linked partner application", error);
        setPartnerProfile(null);
      } else {
        setPartnerProfile(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login Flow
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
      } else {
        // Setup Flow
        // 1. Verify email exists in partner_applications and is Approved by Admin
        const { data: apps, error: appError } = await supabase
          .from('partner_applications')
          .select('*')
          .eq('status', 'Approved');

        if (appError) throw appError;

        const targetEmail = email.toLowerCase().trim();
        const appData = apps?.find(app => {
          const mainEmail = (app.email_address || '').toLowerCase().trim();
          const formEmail = (app.form_data?.email || app.form_data?.emailAddress || app.form_data?.email_address || '').toLowerCase().trim();
          return mainEmail === targetEmail || formEmail === targetEmail;
        });

        if (!appData) {
          throw new Error('This email address has not been approved by AMPLR Admin. Only approved partners can set up an account.');
        }

        if (appData.user_id) {
          throw new Error('An account has already been set up for this approved partner. Please log in.');
        }

        // 2. Sign up the user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || appData.full_name, role: 'partner' }
          }
        });

        if (signUpError) throw signUpError;

        if (signUpData?.user) {
          // 3. Link the user to the partner_application
          await supabase
            .from('partner_applications')
            .update({ user_id: signUpData.user.id })
            .eq('id', appData.id);

          setSuccess('Account created successfully! You are now logged in.');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your approved email address first to reset your password.");
      return;
    }
    setAuthLoading(true); setError(''); setSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess("Password reset link has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="partner-portal-loading">
        <Loader2 size={40} className="spinner" />
        <p>Loading Partner Portal...</p>
      </div>
    );
  }

  // If Logged In
  if (session) {
    if (!partnerProfile) {
      return (
        <div className="partner-portal-wrapper">
          <div className="partner-card error-card">
            <AlertCircle size={48} color="#ef4444" />
            <h2>Access Denied</h2>
            <p>This account is not linked to an approved partner application.</p>
            <button className="partner-btn secondary" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      );
    }

    return (
      <div className="partner-portal-wrapper">
        <nav className="partner-nav">
          <div className="partner-nav-brand">
            <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="partner-logo" />
            <span className="partner-badge">Partner Portal</span>
          </div>
          <button className="partner-nav-logout" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </nav>

        <div className="partner-dashboard-container">
          <div className="partner-welcome-banner">
            <div className="welcome-text">
              <h1>Welcome, {partnerProfile.full_name}</h1>
              <p>Service: {partnerProfile.form_type ? partnerProfile.form_type.replace(/_/g, ' ') : 'Partner'}</p>
            </div>
            <div className="partner-id-box">
              <span className="id-label">Your Partner ID</span>
              <span className="id-value">{partnerProfile.partner_id || 'PENDING'}</span>
            </div>
          </div>

          <div className="partner-grid">
            <div className="partner-card stats-card">
              <div className="card-header">
                <h3><LayoutDashboard size={20} /> Dashboard Overview</h3>
              </div>
              <div className="card-body empty-state">
                <ShieldCheck size={48} color="#cbd5e1" />
                <p>Your dashboard is active.</p>
                <span>New features and statistics will appear here soon!</span>
              </div>
            </div>

            <div className="partner-card info-card">
              <div className="card-header">
                <h3><User size={20} /> Application Details</h3>
              </div>
              <div className="card-body">
                <ul className="info-list">
                  <li><strong>Status:</strong> <span className="status-badge approved">{partnerProfile.status}</span></li>
                  <li><strong>Email:</strong> {partnerProfile.email_address}</li>
                  <li><strong>Mobile:</strong> {partnerProfile.mobile_number}</li>
                  <li><strong>Experience:</strong> {partnerProfile.years_of_experience || 'N/A'}</li>
                  <li><strong>City:</strong> {partnerProfile.city}</li>
                  <li><strong>Approval Date:</strong> {partnerProfile.updated_at ? new Date(partnerProfile.updated_at).toLocaleDateString() : 'N/A'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If Not Logged In (Exact Match to Customer Login Layout)
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
              <h1>Partner Portal,<br/><span className="text-gradient">Simplified.</span></h1>
              <p>Join AMPLR Health as an approved healthcare partner, service provider, or medical specialist.</p>
            </div>

            <div className="presentation-badges">
              <div className="auth-badge">
                <ShieldCheck size={20} className="badge-icon" />
                <span>Verified Partner Network</span>
              </div>
              <div className="auth-badge">
                <HeartPulse size={20} className="badge-icon" />
                <span>Instant Service Requests</span>
              </div>
              <div className="auth-badge">
                <Stethoscope size={20} className="badge-icon" />
                <span>Partner Dashboard & Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-section">
          <div className="auth-form-card">
            
            <div className="form-header">
              <h2>{isLogin ? 'Partner Portal' : 'Account Setup'}</h2>
              <p>
                {isLogin 
                  ? 'Log in to access your partner dashboard.' 
                  : 'Set up your approved partner account.'}
              </p>
            </div>

            {error && <div className="auth-alert error-alert">{error}</div>}
            {success && <div className="auth-alert success-alert">{success}</div>}

            <form onSubmit={handleAuth} className="auth-form">
              {!isLogin && (
                <div className="input-field-wrapper">
                  <label htmlFor="partner-fullname">Full Name</label>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input 
                      id="partner-fullname"
                      type="text" 
                      className="form-input"
                      placeholder="Enter your full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={authLoading}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}
              
              <div className="input-field-wrapper">
                <label htmlFor="partner-email">Approved Email Address</label>
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input 
                    id="partner-email"
                    type="email" 
                    className="form-input"
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={authLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label htmlFor="partner-password" style={{ marginBottom: 0 }}>Password</label>
                  {isLogin && (
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
                    id="partner-password"
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input"
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={authLoading}
                    minLength={6}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    style={{ paddingRight: '45px' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={authLoading}>
                {authLoading ? (
                  <span className="btn-loading">{isLogin ? 'Logging in...' : 'Setting up...'}</span>
                ) : (
                  <>
                    <span>{isLogin ? 'Log In' : 'Set Up Account'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-switch-mode">
              <p>
                {isLogin ? "New approved partner?" : "Already have an account?"}
                <button 
                  type="button" 
                  className="switch-btn"
                  onClick={() => { 
                    const nextMode = !isLogin;
                    setIsLogin(nextMode); 
                    setError(''); 
                    setSuccess(''); 
                    navigate(nextMode ? '/partner-login' : '/partner-setup');
                  }}
                >
                  {isLogin ? 'Set up your account' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPortal;
