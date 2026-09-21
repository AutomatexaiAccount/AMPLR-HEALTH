import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, History, Users, LogOut, ChevronRight, Phone, Mail, MapPin, Edit, Plus
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import './CustomerProfile.css';

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
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="customer-profile-page">
      <div className="profile-header-bg">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account, view history, and add family members.</p>
        </div>
      </div>

      <div className="container profile-container">
        <aside className="profile-sidebar">
          <div className="profile-user-card">
            <div className="profile-avatar">
              <User size={32} color="#fff" />
            </div>
            <div className="profile-user-info">
              <h3>{user?.user_metadata?.full_name || 'AMPLR User'}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="profile-nav">
            <button 
              className={`profile-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <User size={18} /> Account Overview <ChevronRight size={16} className="chevron" />
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={18} /> Service History <ChevronRight size={16} className="chevron" />
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'family' ? 'active' : ''}`}
              onClick={() => setActiveTab('family')}
            >
              <Users size={18} /> Family Members <ChevronRight size={16} className="chevron" />
            </button>
            <button className="profile-nav-btn logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          {activeTab === 'overview' && (
            <div className="profile-section fade-in">
              <h2>Account Overview</h2>
              <div className="overview-cards">
                <div className="info-card">
                  <div className="info-card-header">
                    <h4>Personal Details</h4>
                    <button className="edit-btn"><Edit size={14} /> Edit</button>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Name</span>
                    <span className="info-value">{user?.user_metadata?.full_name || 'Not provided'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{user?.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="profile-section fade-in">
              <h2>Service History</h2>
              <div className="history-list">
                {/* Placeholder content for now */}
                <div className="empty-state">
                  <History size={48} className="empty-icon" />
                  <h3>No service history yet</h3>
                  <p>Book a service with AMPLR Health and it will appear here.</p>
                  <button onClick={() => navigate('/')} className="btn-primary mt-3">Explore Services</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'family' && (
            <div className="profile-section fade-in">
              <div className="section-header-flex">
                <h2>Family Members</h2>
                <button className="btn-secondary add-family-btn"><Plus size={16} /> Add Member</button>
              </div>
              <div className="family-list">
                {/* Placeholder content for now */}
                <div className="empty-state">
                  <Users size={48} className="empty-icon" />
                  <h3>No family members added</h3>
                  <p>Add family members to easily book services for them.</p>
                  <button className="btn-primary mt-3"><Plus size={16} /> Add Family Member</button>
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
