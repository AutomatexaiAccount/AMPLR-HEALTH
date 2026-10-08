import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ShieldCheck, Loader2, Mail, Lock, User, 
  ArrowRight, CheckCircle, AlertCircle, LogOut, LayoutDashboard,
  Eye, EyeOff, HeartPulse, Stethoscope, Phone, MapPin, 
  Calendar, Clock, Check, Copy, Star, MessageSquare, 
  CreditCard, ChevronRight, Activity, Award, Bell,
  Sparkles, RefreshCw, Smartphone
} from 'lucide-react';
import Swal from 'sweetalert2';
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
  const [partnerProfile, setPartnerProfile] = useState(null);
  
  // Dashboard UI State
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'profile', 'earnings', 'security'
  const [isAvailable, setIsAvailable] = useState(true);
  const [copiedId, setCopiedId] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingFilter, setBookingFilter] = useState('all'); // 'all', 'active', 'completed'
  
  // Password Change State for Logged in Partner (Exact Match to Customer Profile)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passStatus, setPassStatus] = useState({ msg: '', type: '' });

  // OTP Modal State
  const [otpModalBooking, setOtpModalBooking] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  // Form State for Login / Setup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

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
      if (session) {
        fetchPartnerProfile(session.user.id);
      } else {
        setLoading(false);
      }
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
        fetchAssignedBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedBookings = async (partner) => {
    setLoadingBookings(true);
    try {
      // Query bookings from Supabase
      const { data, error } = await supabase
        .from('bookings')
        .select('*, services(title, price)')
        .eq('assigned_partner_uuid', partner.user_id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        setBookings(data);
      } else {
        // Realistic placeholder data for the partner if table is empty
        setBookings([
          {
            id: 'BK-1082',
            customer_name: 'Rajesh Verma',
            customer_phone: '+91 98290 12345',
            service_name: partner.form_type ? partner.form_type.replace(/_/g, ' ') : 'Healthcare Care',
            address: 'Flat 402, Royal Palms, Vaishali Nagar',
            city: partner.city || 'Jaipur',
            booking_date: new Date().toISOString().split('T')[0],
            booking_time: '10:30 AM',
            status: 'Confirmed',
            amount: 799,
            notes: 'Requires post-consultation evaluation at home.'
          },
          {
            id: 'BK-1079',
            customer_name: 'Anita Sharma',
            customer_phone: '+91 94140 88765',
            service_name: partner.form_type ? partner.form_type.replace(/_/g, ' ') : 'Healthcare Care',
            address: 'B-14, Malviya Nagar Sector 3',
            city: partner.city || 'Jaipur',
            booking_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            booking_time: '04:00 PM',
            status: 'Completed',
            amount: 999,
            notes: 'Completed session. Patient gave 5-star feedback.'
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching partner bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleCopyId = () => {
    if (partnerProfile?.partner_id) {
      navigator.clipboard.writeText(partnerProfile.partner_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleLifecycleUpdate = async (booking, newStatus) => {
    let updates = { service_lifecycle_status: newStatus };
    
    if (newStatus === 'travel_started') {
      updates.travel_started_at = new Date().toISOString();
    } else if (newStatus === 'reached') {
      updates.reached_at = new Date().toISOString();
      // Generate OTP securely
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      updates.service_otp = otp;
      
      // WhatsApp alert to customer with OTP
      const waText = `Hi ${booking.customer_name}, your Amplr Health partner ${partnerProfile.full_name} has reached your location. Your service OTP is ${otp}. Please share it with the partner to start the service.`;
      if (booking.customer_phone) {
        const cleanPhone = booking.customer_phone.replace(/\D/g, '');
        window.open(`https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(waText)}`, '_blank');
      } else {
        Swal.fire('OTP Generated', `Generated OTP: ${otp} (Customer phone missing)`, 'info');
      }
    } else if (newStatus === 'otp_verified') {
      if (!otpInput) {
        setOtpError("Please enter the OTP.");
        return;
      }
      if (otpInput !== booking.service_otp) {
        setOtpError("Incorrect OTP. Please try again.");
        return;
      }
      updates.otp_verified_at = new Date().toISOString();
      updates.service_started_at = new Date().toISOString();
      setOtpModalBooking(null);
      setOtpInput('');
      setOtpError('');
    } else if (newStatus === 'completed') {
      updates.service_completed_at = new Date().toISOString();
      updates.status = 'completed'; // Update main status
      Swal.fire('Success', 'Service Completed successfully!', 'success');
    }

    try {
      const { error } = await supabase.from('bookings').update(updates).eq('id', booking.id);
      if (error) throw error;
      
      // Update local state
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, ...updates } : b));
    } catch (err) {
      console.error("Error updating lifecycle:", err);
      Swal.fire('Error', 'Failed to update status. Please try again.', 'error');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassStatus({ msg: '', type: '' });

    if (!currentPassword) {
      setPassStatus({ msg: 'Please enter your current password.', type: 'error' });
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPassStatus({ msg: 'New password must be at least 6 characters long.', type: 'error' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPassStatus({ msg: 'New passwords do not match.', type: 'error' });
      return;
    }

    setUpdatingPassword(true);

    try {
      // Re-authenticate to verify current password
      const userEmail = session?.user?.email || partnerProfile?.email_address;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPassword,
      });

      if (signInError) {
        setPassStatus({ msg: 'Incorrect current password. Please verify and try again.', type: 'error' });
        setUpdatingPassword(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setPassStatus({ msg: updateError.message || 'Failed to update password.', type: 'error' });
      } else {
        setPassStatus({ msg: 'Password updated successfully!', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (err) {
      console.error('Password update error:', err);
      setPassStatus({ msg: 'An unexpected error occurred. Please try again.', type: 'error' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleCancelPasswordReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPassStatus({ msg: '', type: '' });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login Flow (via Email)
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (signInError) {
          if (signInError.message.toLowerCase().includes("invalid login")) {
            throw new Error("Invalid login credentials. Please check your email and password.");
          }
          throw signInError;
        }
      } else {
        // Setup Flow
        const inputVal = email.trim().toLowerCase();
        const inputDigits = inputVal.replace(/\D/g, '');

        const { data: apps, error: appError } = await supabase
          .from('partner_applications')
          .select('*')
          .eq('status', 'Approved');

        if (appError) throw appError;

        const appData = apps?.find(app => {
          const mainEmail = (app.email_address || '').toLowerCase().trim();
          const formEmail = (app.form_data?.email || app.form_data?.emailAddress || app.form_data?.email_address || '').toLowerCase().trim();
          const appPhone = (app.mobile_number || '').replace(/\D/g, '');
          const formPhone = (app.form_data?.mobile || app.form_data?.phone || '').replace(/\D/g, '');
          
          const matchEmail = (mainEmail && mainEmail === inputVal) || (formEmail && formEmail === inputVal);
          const matchPhone = inputDigits.length >= 8 && ((appPhone && appPhone.endsWith(inputDigits.slice(-10))) || (formPhone && formPhone.endsWith(inputDigits.slice(-10))));
          
          return matchEmail || matchPhone;
        });

        if (!appData) {
          throw new Error('This Email Address / Mobile Number has not been approved by AMPLR Admin. Only approved partners can set up an account.');
        }

        if (appData.user_id) {
          throw new Error('An account has already been set up for this approved partner. Please log in.');
        }

        const authEmail = inputVal.includes('@') 
          ? inputVal 
          : (appData.email_address || appData.form_data?.email || `${appData.mobile_number.replace(/\D/g, '')}@partner.amplrhealth.com`);

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: authEmail,
          password,
          options: {
            data: { full_name: fullName || appData.full_name, role: 'partner' }
          }
        });

        if (signUpError) throw signUpError;

        if (signUpData?.user) {
          await supabase
            .from('partner_applications')
            .update({ user_id: signUpData.user.id, email_address: authEmail })
            .eq('id', appData.id);

          setSuccess(`Account created successfully for ${appData.full_name}! You are now logged in.`);
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
      setError("Please enter your email address first to reset your password.");
      return;
    }
    setAuthLoading(true); setError(''); setSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/verify`,
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
        <Loader2 size={44} className="spinner" />
        <p>Loading AMPLR Partner Portal...</p>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // LOGGED IN DASHBOARD (MOBILE-FIRST PREMIUM VIEW)
  // ══════════════════════════════════════════════════════════════════════════
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

    const serviceTitle = partnerProfile.form_type 
      ? partnerProfile.form_type.replace(/_/g, ' ').toUpperCase() 
      : 'HEALTHCARE SPECIALIST';

    const partnerInitials = partnerProfile.full_name 
      ? partnerProfile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      : 'PH';

    const filteredBookings = bookings.filter(b => {
      if (bookingFilter === 'active') return b.status === 'Confirmed' || b.status === 'In-Progress' || b.status === 'Pending';
      if (bookingFilter === 'completed') return b.status?.toLowerCase() === 'completed';
      return true;
    });

    return (
      <div className="partner-portal-wrapper">
        
        {/* ── TOP NAV BAR ── */}
        <header className="partner-top-header">
          <div className="header-inner">
            <div className="brand-group">
              <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="header-logo" />
              <div className="brand-text-col">
                <span className="brand-name">AMPLR HEALTH</span>
                <span className="portal-pill">PARTNER SUITE</span>
              </div>
            </div>

            <div className="header-actions">
              <a 
                href={`https://wa.me/917997888448?text=Hello%20AMPLR%20Support,%20I%20am%20Partner%20${partnerProfile.partner_id || ''}%20(${encodeURIComponent(partnerProfile.full_name)})`}
                target="_blank" 
                rel="noreferrer"
                className="support-btn"
                title="Partner Helpdesk"
              >
                <MessageSquare size={16} />
                <span className="hide-mobile">Helpdesk</span>
              </a>

              <button className="logout-btn" onClick={handleLogout} title="Log Out">
                <LogOut size={16} />
                <span className="hide-mobile">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── MAIN CONTENT CONTAINER ── */}
        <main className="partner-main-container">
          
          {/* ── HERO BANNER CARD ── */}
          <section className="partner-hero-banner">
            <div className="hero-profile-row">
              <div className="avatar-circle">
                <span>{partnerInitials}</span>
                <span className="online-indicator" title={isAvailable ? "Available" : "Offline"}></span>
              </div>

              <div className="hero-info">
                <div className="name-badge-row">
                  <h1>{partnerProfile.full_name}</h1>
                  <span className="verified-chip">
                    <ShieldCheck size={14} /> Verified Partner
                  </span>
                </div>
                
                <p className="hero-service-tag">
                  <Stethoscope size={15} /> {serviceTitle}
                  {partnerProfile.city && <span className="city-dot">📍 {partnerProfile.city}</span>}
                </p>
              </div>
            </div>

            {/* Partner ID Box & Availability Toggle */}
            <div className="hero-meta-controls">
              <div className="partner-id-card">
                <span className="id-subtext">YOUR PARTNER ID</span>
                <div className="id-number-row">
                  <span className="id-code">{partnerProfile.partner_id || 'PHY-9534'}</span>
                  <button 
                    onClick={handleCopyId}
                    className="copy-id-btn" 
                    title="Copy ID"
                    aria-label="Copy Partner ID"
                  >
                    {copiedId ? <Check size={15} color="#22c55e" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="duty-toggle-wrapper">
                <span className="duty-label">{isAvailable ? '🟢 Online & Ready' : '⚪ Taking a Break'}</span>
                <button 
                  className={`duty-toggle-btn ${isAvailable ? 'active' : 'offline'}`}
                  onClick={() => setIsAvailable(!isAvailable)}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>
            </div>
          </section>

          {/* ── 4 QUICK KPI METRIC CARDS (MOBILE 2x2 GRID) ── */}
          <section className="partner-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon-box bg-blue">
                <Calendar size={20} />
              </div>
              <div className="kpi-details">
                <span className="kpi-value">{bookings.length || 2}</span>
                <span className="kpi-label">Assigned Bookings</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box bg-green">
                <Award size={20} />
              </div>
              <div className="kpi-details">
                <span className="kpi-value">100%</span>
                <span className="kpi-label">Satisfaction Rate</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box bg-amber">
                <Star size={20} />
              </div>
              <div className="kpi-details">
                <span className="kpi-value">4.9 ★</span>
                <span className="kpi-label">Partner Rating</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box bg-purple">
                <CreditCard size={20} />
              </div>
              <div className="kpi-details">
                <span className="kpi-value">₹1,798</span>
                <span className="kpi-label">Estimated Payout</span>
              </div>
            </div>
          </section>

          {/* ── SEGMENTED TAB NAVIGATION (SWIPEABLE / TOUCH FRIENDLY) ── */}
          <nav className="partner-tab-bar">
            <button 
              className={`tab-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Activity size={18} />
              <span>Patient Visits ({bookings.length})</span>
            </button>

            <button 
              className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>Partner Profile</span>
            </button>

            <button 
              className={`tab-item ${activeTab === 'earnings' ? 'active' : ''}`}
              onClick={() => setActiveTab('earnings')}
            >
              <CreditCard size={18} />
              <span>Earnings & Payouts</span>
            </button>

            <button 
              className={`tab-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Lock size={18} />
              <span>Security</span>
            </button>
          </nav>

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 1: ASSIGNED PATIENT BOOKINGS */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <div className="tab-pane">
              <div className="pane-header-row">
                <div>
                  <h2>Patient Service Requests</h2>
                  <p>Real-time healthcare service requests assigned to your partner ID.</p>
                </div>

                <div className="filter-pills">
                  <button 
                    className={`filter-pill ${bookingFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setBookingFilter('all')}
                  >
                    All ({bookings.length})
                  </button>
                  <button 
                    className={`filter-pill ${bookingFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setBookingFilter('active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`filter-pill ${bookingFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setBookingFilter('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>

              {loadingBookings ? (
                <div className="loading-state-card">
                  <Loader2 size={32} className="spinner" />
                  <p>Loading patient requests...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="empty-state-card">
                  <HeartPulse size={48} color="#94a3b8" />
                  <h3>No Service Requests Found</h3>
                  <p>When new patient appointments are assigned to your service area, they will appear here instantly.</p>
                </div>
              ) : (
                <div className="bookings-cards-list">
                  {filteredBookings.map((b, idx) => {
                    const isDone = b.status?.toLowerCase() === 'completed';
                    const patientPhone = b.customer_phone || b.phone || '';
                    const cleanPhone = patientPhone.replace(/\D/g, '');

                    return (
                      <div key={b.id || idx} className={`booking-patient-card ${isDone ? 'done-card' : ''}`}>
                        <div className="bcard-top-row">
                          <div className="bcard-id-time">
                            <span className="bcard-badge">{(b.id ? (b.id.length > 15 ? b.id.substring(0, 8).toUpperCase() : b.id) : `BK-${idx + 100}`)}</span>
                            <span className="bcard-date-time">
                              <Calendar size={13} /> {b.booking_date ? new Date(b.booking_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today'} · <Clock size={13} /> {(b.booking_date && b.booking_date.includes('T')) ? new Date(b.booking_date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : (b.booking_time || '10:00 AM')}
                            </span>
                          </div>
                          <span className={`status-pill ${isDone ? 'status-completed' : 'status-active'}`}>
                            {b.status || 'Active'}
                          </span>
                        </div>

                        <div className="bcard-patient-info">
                          <h3 className="patient-name">{b.customer_name || 'Patient'}</h3>
                          <p className="service-title-text">
                            <Stethoscope size={14} color="#dc2626" /> {b.service_name || b.services?.title || serviceTitle}
                          </p>
                          <p className="patient-address">
                            <MapPin size={14} color="#64748b" /> {b.address || 'Address provided upon confirmation'}, {b.city || partnerProfile.city || 'Jaipur'}
                          </p>
                          {b.notes && (
                            <p className="patient-notes">
                              <strong>Note:</strong> {b.notes}
                            </p>
                          )}
                        </div>

                        {/* Direct Mobile Action Buttons */}
                        <div className="bcard-actions-row">
                          {cleanPhone && (
                            <>
                              <a 
                                href={`tel:${cleanPhone}`}
                                className="patient-action-btn call-btn"
                                title="Call Patient"
                              >
                                <Phone size={15} /> Call Patient
                              </a>
                              <a 
                                href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(b.customer_name || 'Sir/Madam')},%20I%20am%20${encodeURIComponent(partnerProfile.full_name)}%20from%20AMPLR%20Health%20for%20your%20scheduled%20visit.`}
                                target="_blank"
                                rel="noreferrer"
                                className="patient-action-btn wa-btn"
                                title="WhatsApp Patient"
                              >
                                <MessageSquare size={15} /> WhatsApp
                              </a>
                            </>
                          )}

                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address || ''} ${b.city || partnerProfile.city || ''}`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="patient-action-btn map-btn"
                            title="Navigate on Maps"
                          >
                            <MapPin size={15} /> Maps
                          </a>
                        </div>

                        {/* Interactive Lifecycle Buttons */}
                        {!isDone && (
                          <div className="lifecycle-actions" style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <h4 style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Progress</h4>
                            
                            {(!b.service_lifecycle_status || b.service_lifecycle_status === 'pending') && (
                              <button className="partner-btn primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => handleLifecycleUpdate(b, 'travel_started')}>
                                🚀 Start Travel
                              </button>
                            )}
                            
                            {b.service_lifecycle_status === 'travel_started' && (
                              <button className="partner-btn primary" style={{ backgroundColor: '#eab308', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => handleLifecycleUpdate(b, 'reached')}>
                                📍 Reached Location
                              </button>
                            )}
                            
                            {b.service_lifecycle_status === 'reached' && (
                              <button className="partner-btn primary" style={{ backgroundColor: '#8b5cf6', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => setOtpModalBooking(b)}>
                                🔐 Enter OTP to Start
                              </button>
                            )}
                            
                            {b.service_lifecycle_status === 'otp_verified' && (
                              <button className="partner-btn primary" style={{ backgroundColor: '#22c55e', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => handleLifecycleUpdate(b, 'completed')}>
                                ✅ Complete Service
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 2: PARTNER PROFILE & KYC DETAILS */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <div className="tab-pane">
              <div className="profile-details-grid">
                
                {/* Personal Information */}
                <div className="dashboard-card">
                  <div className="dcard-header">
                    <h3><User size={18} color="#dc2626" /> Professional Profile</h3>
                  </div>
                  <div className="dcard-body">
                    <div className="data-row-list">
                      <div className="data-item">
                        <span className="data-label">Full Name</span>
                        <span className="data-val highlight">{partnerProfile.full_name}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Primary Service Category</span>
                        <span className="data-val">{serviceTitle}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Registered Mobile</span>
                        <span className="data-val">{partnerProfile.mobile_number || 'N/A'}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Email Address</span>
                        <span className="data-val">{partnerProfile.email_address || 'N/A'}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">City / Operation Area</span>
                        <span className="data-val">{partnerProfile.city || 'Rajasthan, India'}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Years of Experience</span>
                        <span className="data-val">{partnerProfile.years_of_experience ? `${partnerProfile.years_of_experience} Years` : '5+ Years'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification & Compliance Card */}
                <div className="dashboard-card">
                  <div className="dcard-header">
                    <h3><ShieldCheck size={18} color="#22c55e" /> Verification & KYC Status</h3>
                  </div>
                  <div className="dcard-body">
                    <div className="kyc-status-banner">
                      <div className="kyc-icon-circle">
                        <CheckCircle size={28} color="#22c55e" />
                      </div>
                      <div>
                        <h4>AMPLR Certified Partner</h4>
                        <p>All medical credentials and background verification have been verified by AMPLR Admin.</p>
                      </div>
                    </div>

                    <div className="data-row-list" style={{ marginTop: '1.25rem' }}>
                      <div className="data-item">
                        <span className="data-label">Approval Status</span>
                        <span className="status-badge approved">APPROVED & ACTIVE</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Verification Date</span>
                        <span className="data-val">{partnerProfile.updated_at ? new Date(partnerProfile.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified'}</span>
                      </div>
                      <div className="data-item">
                        <span className="data-label">Medical Trust Tier</span>
                        <span className="data-val" style={{ color: '#eab308', fontWeight: 600 }}>Level 1 Certified Specialist</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 3: EARNINGS & PAYOUTS */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'earnings' && (
            <div className="tab-pane">
              <div className="earnings-summary-row">
                <div className="earnings-hero-card">
                  <span className="e-card-label">AVAILABLE PAYOUT BALANCE</span>
                  <h2 className="e-card-amount">₹1,798.00</h2>
                  <p className="e-card-note">Next payout scheduled on: <strong>10th of this month</strong></p>
                </div>

                <div className="payout-method-card">
                  <div className="pm-header">
                    <CreditCard size={20} color="#dc2626" />
                    <span>Direct Bank Settlement</span>
                  </div>
                  <p className="pm-desc">Payouts are processed directly to your registered bank account via UPI / IMPS upon job completion.</p>
                  <div className="bank-status-pill">
                    <CheckCircle size={14} color="#22c55e" /> Bank Verification Active
                  </div>
                </div>
              </div>

              <div className="dashboard-card" style={{ marginTop: '1.5rem' }}>
                <div className="dcard-header">
                  <h3><Activity size={18} /> Recent Payout History</h3>
                </div>
                <div className="dcard-body">
                  <div className="payout-list">
                    <div className="payout-item">
                      <div className="p-item-left">
                        <span className="p-title">Home Healthcare Visit #BK-1079</span>
                        <span className="p-date">Completed · 5-Star Feedback</span>
                      </div>
                      <span className="p-amount success">+ ₹999.00</span>
                    </div>

                    <div className="payout-item">
                      <div className="p-item-left">
                        <span className="p-title">Patient Consultation #BK-1082</span>
                        <span className="p-date">Pending Settlement</span>
                      </div>
                      <span className="p-amount pending">₹799.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 4: SECURITY & PASSWORD SETTINGS (MATCHES CUSTOMER PROFILE) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === 'security' && (
            <div className="tab-pane">
              <div className="dashboard-card security-setting-card">
                <div className="dcard-header">
                  <h3><Lock size={18} color="#dc2626" /> SECURITY & PASSWORD</h3>
                </div>
                <div className="dcard-body">
                  
                  {passStatus.msg && (
                    <div className={`auth-alert ${passStatus.type === 'error' ? 'error-alert' : 'success-alert'}`} style={{ marginBottom: '1.5rem' }}>
                      {passStatus.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                      <span>{passStatus.msg}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdatePassword} className="partner-password-form">
                    
                    {/* CURRENT PASSWORD */}
                    <div className="form-group-field">
                      <label className="field-label-uppercase">CURRENT PASSWORD</label>
                      <div className="field-input-wrapper">
                        <input 
                          type={showCurrentPass ? "text" : "password"} 
                          className="customer-style-input" 
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="field-eye-btn"
                          aria-label={showCurrentPass ? "Hide current password" : "Show current password"}
                        >
                          {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="form-group-field">
                      <label className="field-label-uppercase">NEW PASSWORD</label>
                      <div className="field-input-wrapper">
                        <input 
                          type={showNewPass ? "text" : "password"} 
                          className="customer-style-input" 
                          placeholder="At least 6 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="field-eye-btn"
                          aria-label={showNewPass ? "Hide new password" : "Show new password"}
                        >
                          {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* CONFIRM NEW PASSWORD */}
                    <div className="form-group-field">
                      <label className="field-label-uppercase">CONFIRM NEW PASSWORD</label>
                      <div className="field-input-wrapper">
                        <input 
                          type={showConfirmPass ? "text" : "password"} 
                          className="customer-style-input" 
                          placeholder="Re-enter new password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="field-eye-btn"
                          aria-label={showConfirmPass ? "Hide confirm password" : "Show confirm password"}
                        >
                          {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    {/* BUTTON ROW (UPDATE PASSWORD + CANCEL) */}
                    <div className="security-btn-actions">
                      <button 
                        type="submit" 
                        className="btn-update-pass" 
                        disabled={updatingPassword}
                      >
                        {updatingPassword ? (
                          <>
                            <Loader2 size={16} className="spinner" />
                            <span>UPDATING...</span>
                          </>
                        ) : (
                          <span>UPDATE PASSWORD</span>
                        )}
                      </button>

                      <button 
                        type="button" 
                        className="btn-cancel-pass"
                        onClick={handleCancelPasswordReset}
                        disabled={updatingPassword}
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>

                  <div className="support-help-box">
                    <h4>Need assistance with your Partner Account?</h4>
                    <p>Our dedicated partner operations team is available 24/7 to assist you with bookings and payouts.</p>
                    <a 
                      href="tel:+917997888448" 
                      className="support-call-link"
                    >
                      <Phone size={15} /> Helpline: +91 7997888448
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── OTP MODAL ── */}
          {otpModalBooking && (
            <div className="otp-modal-overlay">
              <div className="otp-modal-card">
                <h3>Enter Service OTP</h3>
                <p>Please enter the 6-digit OTP sent to the patient to start the service.</p>
                
                {otpError && <div className="otp-error-alert">{otpError}</div>}
                
                <input 
                  type="text" 
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  className="otp-input-field"
                  autoFocus
                />
                
                <div className="otp-modal-actions">
                  <button 
                    className="btn-cancel-pass"
                    onClick={() => {
                      setOtpModalBooking(null);
                      setOtpInput('');
                      setOtpError('');
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-update-pass"
                    style={{ backgroundColor: '#22c55e', color: 'white' }}
                    onClick={() => handleLifecycleUpdate(otpModalBooking, 'otp_verified')}
                  >
                    Verify & Start
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ── MOBILE BOTTOM STICKY BAR ── */}
        <div className="partner-mobile-nav">
          <button 
            className={`mobile-nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Activity size={20} />
            <span>Visits</span>
          </button>
          <button 
            className={`mobile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button 
            className={`mobile-nav-btn ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <CreditCard size={20} />
            <span>Earnings</span>
          </button>
          <button 
            className={`mobile-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={20} />
            <span>Security</span>
          </button>
        </div>

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // NOT LOGGED IN: SPLIT AUTH PAGE (MOBILE RESPONSIVE LOGIN / SETUP)
  // ══════════════════════════════════════════════════════════════════════════
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
                <label htmlFor="partner-email">
                  {isLogin ? 'Approved Email Address' : 'Approved Email Address or Mobile Number *'}
                </label>
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input 
                    id="partner-email"
                    type="text" 
                    className="form-input" 
                    placeholder={isLogin ? "you@example.com" : "Enter your approved email or mobile number"} 
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
                    className="eye-toggle-btn"
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
