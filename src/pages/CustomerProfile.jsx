import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, History, Users, LogOut, ChevronRight,
  Edit, Plus, CheckCircle, Home, ArrowLeft
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import './CustomerProfile.css';

/* ── Helper: generate initials from a name or email ── */
const getInitials = (name, email) => {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.trim().slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return 'AU';
};

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <span>Loading your profile…</span>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || 'AMPLR User';
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);
  const isVerified = !!user?.email_confirmed_at;

  return (
    <div className="customer-profile-page">

      {/* ── HERO BANNER ── */}
      <div className="profile-header-bg">
        <div className="container">

          {/* Back to site link */}
          <div style={{ marginBottom: '1.5rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <ArrowLeft size={14} /> Back to AMPLR Health
            </Link>
          </div>

          {/* Identity Card */}
          <div className="profile-identity-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar" aria-label={`Avatar for ${displayName}`}>
                {initials}
              </div>
              {isVerified && (
                <div className="profile-verified-badge" title="Email verified">
                  <CheckCircle size={13} color="#ffffff" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <div className="profile-identity-info">
              <h2>{displayName}</h2>
              <span className="profile-email">{user?.email}</span>
              {isVerified && (
                <span className="profile-status-pill">
                  <CheckCircle size={11} strokeWidth={2.5} /> Verified Account
                </span>
              )}
            </div>
          </div>

          {/* Page Title */}
          <h1>My Profile</h1>
          <p>Manage your account, view history, and add family members.</p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container profile-container">

        {/* ── SIDEBAR ── */}
        <aside className="profile-sidebar" aria-label="Profile navigation">

          {/* Compact user card (inside sidebar on desktop) */}
          <div className="profile-user-card">
            <div className="sidebar-avatar" aria-hidden="true">
              {initials}
            </div>
            <div className="profile-user-info">
              <h3>{displayName}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="profile-nav" role="tablist" aria-label="Profile sections">
            <button
              role="tab"
              aria-selected={activeTab === 'overview'}
              className={`profile-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <User size={16} aria-hidden="true" />
              <span className="nav-label">Account</span>
              <ChevronRight size={14} className="chevron" aria-hidden="true" />
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'history'}
              className={`profile-nav-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} aria-hidden="true" />
              <span className="nav-label">History</span>
              <ChevronRight size={14} className="chevron" aria-hidden="true" />
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'family'}
              className={`profile-nav-btn ${activeTab === 'family' ? 'active' : ''}`}
              onClick={() => setActiveTab('family')}
            >
              <Users size={16} aria-hidden="true" />
              <span className="nav-label">Family</span>
              <ChevronRight size={14} className="chevron" aria-hidden="true" />
            </button>

            <button
              className="profile-nav-btn logout-btn"
              onClick={handleLogout}
              aria-label="Logout from your account"
            >
              <LogOut size={16} aria-hidden="true" />
              <span className="nav-label">Logout</span>
            </button>
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="profile-content" role="tabpanel">

          {/* ACCOUNT OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="profile-section fade-in">
              <h2 className="profile-section-title">
                <User size={18} aria-hidden="true" /> Account Overview
              </h2>
              <div className="overview-cards">
                <div className="info-card">
                  <div className="info-card-header">
                    <h4>Personal Details</h4>
                    <button className="edit-btn" aria-label="Edit personal details">
                      <Edit size={13} /> Edit
                    </button>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Name</span>
                    <span className="info-value">
                      {user?.user_metadata?.full_name || (
                        <span className="info-value-muted">Not provided</span>
                      )}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">
                      {user?.phone || (
                        <span className="info-value-muted">Not provided</span>
                      )}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status</span>
                    <span className="info-value">
                      {isVerified ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          color: '#16a34a', fontWeight: 600, fontSize: '0.88rem'
                        }}>
                          <CheckCircle size={14} /> Verified
                        </span>
                      ) : (
                        <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.88rem' }}>
                          Pending verification
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Member since</span>
                    <span className="info-value" style={{ fontSize: '0.9rem' }}>
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })
                        : '—'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICE HISTORY */}
          {activeTab === 'history' && (
            <div className="profile-section fade-in">
              <h2 className="profile-section-title">
                <History size={18} aria-hidden="true" /> Service History
              </h2>
              <div className="history-list">
                <div className="empty-state">
                  <div className="empty-icon-wrap">
                    <History size={28} aria-hidden="true" />
                  </div>
                  <h3>No service history yet</h3>
                  <p>
                    Book a service with AMPLR Health and your appointments will appear here.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary mt-3"
                    style={{ borderRadius: '8px', padding: '0.65rem 1.5rem', fontSize: '0.92rem' }}
                  >
                    <Home size={15} /> Explore Services
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FAMILY MEMBERS */}
          {activeTab === 'family' && (
            <div className="profile-section fade-in">
              <div className="section-header-flex">
                <h2>Family Members</h2>
                <button
                  className="btn-secondary add-family-btn"
                  aria-label="Add a new family member"
                >
                  <Plus size={15} /> Add Member
                </button>
              </div>
              <div className="family-list">
                <div className="empty-state">
                  <div className="empty-icon-wrap">
                    <Users size={28} aria-hidden="true" />
                  </div>
                  <h3>No family members added</h3>
                  <p>
                    Add family members to quickly book healthcare services for them.
                  </p>
                  <button
                    className="btn-primary mt-3"
                    style={{ borderRadius: '8px', padding: '0.65rem 1.5rem', fontSize: '0.92rem' }}
                  >
                    <Plus size={15} /> Add Family Member
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default CustomerProfile;
