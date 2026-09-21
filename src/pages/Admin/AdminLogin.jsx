import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Phone, ExternalLink, HelpCircle, Database, Server, Headphones, CheckCircle2, HeartPulse, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
           throw new Error("You must disable 'Confirm email' in Supabase (Authentication -> Providers -> Email) or verify your email address.");
        }
        throw authError;
      }

      if (data?.user) {
        // Verify they are an admin
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (userError) {
          setError(`Database Error checking role: ${userError.message}`);
          return;
        }
          
        if (userData?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          // If they are a normal user trying to log into the admin portal
          setError('Access denied. You do not have administrator privileges. Role found: ' + userData?.role);
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Left Panel - Branding & Features */}
      <div className="admin-left-panel">
        <div className="admin-left-content">
          
          <div className="admin-badges">
            <div className="admin-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem 1rem' }}>
              <img src="/amplr-logo.jpeg" alt="AMPLR Health Logo" style={{ height: '36px', borderRadius: '4px', objectFit: 'contain' }} />
              <span className="badge-text" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>AMPLR HEALTH<br/><small style={{ color: '#cbd5e1' }}>OFFICIAL ADMIN PORTAL</small></span>
            </div>
            <div className="admin-badge automatex-badge" style={{ padding: '0.5rem 1rem' }}>
              <span className="badge-icon">⚙️</span>
              <span className="badge-text">AutomateX<br/><small>OFFICIAL DEVELOPER</small></span>
            </div>
          </div>

          <div className="engineered-tag">
            <span>&lt;/&gt; ENGINEERED BY AUTOMATEX</span>
          </div>

          <h1 className="admin-hero-title">
            Amplr Health <span className="highlight-gold">Admin</span>
          </h1>
          
          <p className="admin-hero-subtitle">
            Secure central portal for managing healthcare services, live price updates, bookings, and Amplr Health operational management.
          </p>

          <ul className="admin-features-list">
            <li>
              <Database size={18} className="feature-icon" style={{color: '#3b82f6'}} />
              <span>Real-time Supabase Cloud Database Sync</span>
            </li>
            <li>
              <Server size={18} className="feature-icon" style={{color: '#10b981'}} />
              <span>Bulk Service & Booking Management</span>
            </li>
            <li>
              <Shield size={18} className="feature-icon" style={{color: '#8b5cf6'}} />
              <span>Cloudflare Edge SSL Protection & Fast CDN</span>
            </li>
            <li>
              <Headphones size={18} className="feature-icon" style={{color: '#f59e0b'}} />
              <span>24/7 Dedicated AutomateX Developer Support</span>
            </li>
          </ul>

        </div>

        <div className="admin-left-footer">
          <div className="system-status">
            <span className="status-dot pulse"></span>
            System Status: Fully Operational
          </div>
          <div className="ssl-secured">
            Cloudflare Edge SSL Protected
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="admin-right-panel">
        <div className="admin-right-content">
          
          <div className="login-header">
            <div className="shield-icon-wrapper">
              <Shield size={24} color="#0f172a" />
            </div>
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to access the dashboard.</p>
          </div>

          <form className="admin-login-form" onSubmit={handleLogin}>
            {error && <div className="error-message" style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #f87171' }}>{error}</div>}
            <div className="form-group">
              <label>ADMIN EMAIL ADDRESS</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@amplrhealth.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>PASSWORD</label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Lock size={16} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: '40px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Support Card */}
          <div className="automatex-support-card">
            <div className="support-header">
              <div className="support-title">
                <HelpCircle size={14} />
                <span>NEED HELP? AUTOMATEX SUPPORT</span>
              </div>
              <div className="support-badge">24/7 Priority</div>
            </div>
            
            <div className="support-body">
              <div className="support-row">
                <a href="tel:+917426016636" className="support-item">
                  <Phone size={14} /> +91 7426016636
                </a>
                <a href="https://wa.me/917426016636" className="support-item whatsapp" target="_blank" rel="noreferrer">
                  <span className="wa-icon">💬</span> WhatsApp
                </a>
              </div>
              <div className="support-row single">
                <a href="tel:+919424466992" className="support-item">
                  <Phone size={14} /> Alternate: +91 9424466992
                </a>
              </div>
              <div className="support-row single">
                <a href="mailto:support@digifysoft.in" className="support-item">
                  <Mail size={14} /> support@digifysoft.in
                </a>
              </div>
            </div>
            
            <a href="https://automatexai.co.in" target="_blank" rel="noreferrer" className="support-footer-link">
              <ExternalLink size={14} /> Visit AutomateX Portal (automatexai.co.in)
            </a>
          </div>
          
          <div className="admin-copyright">
            © {new Date().getFullYear()} Amplr Health. Developed & Managed by <strong>AutomateX</strong>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
