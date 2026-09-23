import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, History, Users, LogOut, ChevronRight,
  Edit, Plus, CheckCircle, Home, ArrowLeft, X,
  Trash2, AlertCircle, Loader2
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

/* ── Relationship options ── */
const RELATIONSHIP_OPTIONS = [
  'Father', 'Mother', 'Brother', 'Sister',
  'Son', 'Daughter', 'Husband', 'Wife',
  'Grandfather', 'Grandmother', 'Other'
];

/* ── Gender options ── */
const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

/* ── Toast notification ── */
const Toast = ({ message, type, onClose }) => (
  <div className={`profile-toast profile-toast--${type}`} role="alert">
    {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
    <span>{message}</span>
    <button className="profile-toast__close" onClick={onClose} aria-label="Dismiss">
      <X size={14} />
    </button>
  </div>
);

/* ── Confirmation Dialog ── */
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay" role="dialog" aria-modal="true">
    <div className="modal-container confirm-dialog">
      <div className="confirm-dialog__icon">
        <AlertCircle size={28} color="#dc2626" />
      </div>
      <p className="confirm-dialog__message">{message}</p>
      <div className="modal-footer">
        <button className="btn-modal-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-modal-danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [publicUser, setPublicUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ── Family members state ── */
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyLoading, setFamilyLoading] = useState(false);
  const [familyError, setFamilyError] = useState('');

  /* ── Toast state ── */
  const [toast, setToast] = useState(null); // { message, type }

  /* ── Edit Profile modal state ── */
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: '', phone: '', landmark: '', location: '', pincode: '' });
  const [editErrors, setEditErrors] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  /* ── Add/Edit Family Member modal state ── */
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [editingFamilyMemberId, setEditingFamilyMemberId] = useState(null);
  const [familyForm, setFamilyForm] = useState({ name: '', relationship: '', age: '', gender: '' });
  const [familyFormErrors, setFamilyFormErrors] = useState({});
  const [familySaving, setFamilySaving] = useState(false);
  const [familyFormError, setFamilyFormError] = useState('');

  /* ── Delete confirmation state ── */
  const [deleteTarget, setDeleteTarget] = useState(null); // member id

  /* ── Show toast helper ── */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  /* ── Fetch session on mount ── */
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (userData) {
          setPublicUser(userData);
        }
      }
      setLoading(false);
    };
    fetchSession();
  }, [navigate]);

  /* ── Fetch family members when Family tab is active ── */
  const fetchFamilyMembers = useCallback(async () => {
    if (!user) return;
    setFamilyLoading(true);
    setFamilyError('');
    try {
      const { data: { user: freshUser }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !freshUser) {
        setFamilyError('Unable to verify your session. Please log in again.');
        setFamilyLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', freshUser.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Family fetch error:', error);
        setFamilyError('Unable to load family members. Please try again.');
      } else {
        setFamilyMembers(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching family members:', err);
      setFamilyError('Something went wrong. Please try again.');
    }
    setFamilyLoading(false);
  }, [user]);

  useEffect(() => {
    if (activeTab === 'family' && user) {
      fetchFamilyMembers();
    }
  }, [activeTab, user, fetchFamilyMembers]);

  /* ── Logout ── */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  /* ─────────────────────────────────────────────────
     EDIT PROFILE
  ───────────────────────────────────────────────── */
  const openEditModal = () => {
    setEditForm({
      fullName: user?.user_metadata?.full_name || '',
      phone: user?.phone || '',
      landmark: publicUser?.landmark || '',
      location: publicUser?.location || '',
      pincode: publicUser?.pincode || ''
    });
    setEditErrors({});
    setEditError('');
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    if (editSaving) return;
    setShowEditModal(false);
    setEditErrors({});
    setEditError('');
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editForm.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }
    if (editForm.phone && !/^[+\d\s\-().]{7,15}$/.test(editForm.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    return errors;
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    setEditSaving(true);
    setEditError('');
    try {
      const { data: { user: freshUser }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !freshUser) {
        setEditError('Unable to verify your session. Please log in again.');
        setEditSaving(false);
        return;
      }

      const updatePayload = {
        data: {
          ...freshUser.user_metadata,
          full_name: editForm.fullName.trim()
        }
      };

      const { data, error } = await supabase.auth.updateUser(updatePayload);

      if (error) {
        console.error('Profile update error:', error);
        setEditError('Unable to update profile name. Please try again.');
        setEditSaving(false);
        return;
      }

      // Update public.users table with new fields including phone
      const { error: dbError } = await supabase
        .from('users')
        .update({
          phone: editForm.phone.trim() || null,
          landmark: editForm.landmark.trim(),
          location: editForm.location.trim(),
          pincode: editForm.pincode.trim()
        })
        .eq('id', freshUser.id);
        
      if (!dbError) {
        setPublicUser(prev => ({
          ...prev,
          phone: editForm.phone.trim() || null,
          landmark: editForm.landmark.trim(),
          location: editForm.location.trim(),
          pincode: editForm.pincode.trim()
        }));
        // Also update user.phone if we want to reflect it locally on the auth object
        if (data.user) {
          data.user.phone = editForm.phone.trim() || null;
        }
      } else {
        console.error('Failed to update public user details:', dbError);
      }



      // Update local user state immediately (no page refresh)
      setUser(data.user);
      setShowEditModal(false);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      console.error('Unexpected error updating profile:', err);
      setEditError('Something went wrong. Please try again.');
    }
    setEditSaving(false);
  };

  /* ─────────────────────────────────────────────────
     ADD / EDIT FAMILY MEMBER
  ───────────────────────────────────────────────── */
  const openFamilyModal = (member = null) => {
    // We check if it's an event (from onClick) or an actual member object
    if (member && member.id && !member.target) {
      setEditingFamilyMemberId(member.id);
      setFamilyForm({
        name: member.name || '',
        relationship: member.relationship || '',
        age: member.age || '',
        gender: member.gender || ''
      });
    } else {
      setEditingFamilyMemberId(null);
      setFamilyForm({ name: '', relationship: '', age: '', gender: '' });
    }
    setFamilyFormErrors({});
    setFamilyFormError('');
    setShowFamilyModal(true);
  };

  const closeFamilyModal = () => {
    if (familySaving) return;
    setShowFamilyModal(false);
    setEditingFamilyMemberId(null);
    setFamilyFormErrors({});
    setFamilyFormError('');
  };

  const validateFamilyForm = () => {
    const errors = {};
    if (!familyForm.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!familyForm.relationship) {
      errors.relationship = 'Relationship is required.';
    }
    if (familyForm.age && (isNaN(Number(familyForm.age)) || Number(familyForm.age) < 0 || Number(familyForm.age) > 120)) {
      errors.age = 'Please enter a valid age between 0 and 120.';
    }
    return errors;
  };

  const handleAddFamilyMember = async (e) => {
    e.preventDefault();
    const errors = validateFamilyForm();
    if (Object.keys(errors).length > 0) {
      setFamilyFormErrors(errors);
      return;
    }
    setFamilySaving(true);
    setFamilyFormError('');
    try {
      const { data: { user: freshUser }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !freshUser) {
        setFamilyFormError('Unable to verify your session. Please log in again.');
        setFamilySaving(false);
        return;
      }

      const payload = {
        name: familyForm.name.trim(),
        relationship: familyForm.relationship,
        age: familyForm.age ? parseInt(familyForm.age, 10) : null,
        gender: familyForm.gender || null
      };

      if (editingFamilyMemberId) {
        // Update existing
        const { data, error } = await supabase
          .from('family_members')
          .update(payload)
          .eq('id', editingFamilyMemberId)
          .eq('user_id', freshUser.id)
          .select()
          .single();

        if (error) {
          console.error('Family member update error:', error);
          setFamilyFormError('Unable to update family member. Please try again.');
          setFamilySaving(false);
          return;
        }

        setFamilyMembers(prev => prev.map(m => m.id === editingFamilyMemberId ? data : m));
        setShowFamilyModal(false);
        showToast(`${data.name}'s details updated!`, 'success');
      } else {
        // Insert new
        const insertPayload = {
          user_id: freshUser.id,
          ...payload
        };

        const { data, error } = await supabase
          .from('family_members')
          .insert(insertPayload)
          .select()
          .single();

        if (error) {
          console.error('Family member insert error:', error);
          setFamilyFormError('Unable to save family member. Please try again.');
          setFamilySaving(false);
          return;
        }

        setFamilyMembers(prev => [...prev, data]);
        setShowFamilyModal(false);
        showToast(`${data.name} added to your family!`, 'success');
      }
    } catch (err) {
      console.error('Unexpected error saving family member:', err);
      setFamilyFormError('Something went wrong. Please try again.');
    }
    setFamilySaving(false);
  };

  /* ─────────────────────────────────────────────────
     DELETE FAMILY MEMBER
  ───────────────────────────────────────────────── */
  const handleDeleteMember = async () => {
    if (!deleteTarget) return;
    try {
      const { data: { user: freshUser }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !freshUser) {
        showToast('Unable to verify your session. Please log in again.', 'error');
        setDeleteTarget(null);
        return;
      }

      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', deleteTarget)
        .eq('user_id', freshUser.id);

      if (error) {
        console.error('Family member delete error:', error);
        showToast('Unable to delete family member. Please try again.', 'error');
      } else {
        setFamilyMembers(prev => prev.filter(m => m.id !== deleteTarget));
        showToast('Family member removed.', 'success');
      }
    } catch (err) {
      console.error('Unexpected error deleting family member:', err);
      showToast('Something went wrong. Please try again.', 'error');
    }
    setDeleteTarget(null);
  };

  /* ── Loading guard ── */
  if (loading) {
    return (
      <div className="profile-loading">
        <Loader2 size={24} className="spinner" />
        <span>Loading your profile…</span>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || 'AMPLR User';
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);
  const isVerified = !!user?.email_confirmed_at;

  return (
    <div className="customer-profile-page">

      {/* ── TOAST ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteTarget && (
        <ConfirmDialog
          message="Are you sure you want to remove this family member? This action cannot be undone."
          onConfirm={handleDeleteMember}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── EDIT PROFILE MODAL ── */}
      {showEditModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
          <div className="modal-container">
            <div className="modal-header">
              <h3 id="edit-modal-title">Edit Profile</h3>
              <button className="modal-close-btn" onClick={closeEditModal} aria-label="Close modal" disabled={editSaving}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSave} noValidate>
              <div className="modal-body">
                {editError && (
                  <div className="form-alert form-alert--error">
                    <AlertCircle size={15} />
                    <span>{editError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="edit-fullName" className="form-label">Full Name <span className="required-star">*</span></label>
                  <input
                    id="edit-fullName"
                    type="text"
                    className={`form-input ${editErrors.fullName ? 'form-input--error' : ''}`}
                    value={editForm.fullName}
                    onChange={e => {
                      setEditForm(prev => ({ ...prev, fullName: e.target.value }));
                      if (editErrors.fullName) setEditErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="Enter your full name"
                    disabled={editSaving}
                    autoComplete="name"
                  />
                  {editErrors.fullName && <span className="form-error">{editErrors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="edit-phone" className="form-label">Phone Number</label>
                  <input
                    id="edit-phone"
                    type="tel"
                    className={`form-input ${editErrors.phone ? 'form-input--error' : ''}`}
                    value={editForm.phone}
                    onChange={e => {
                      setEditForm(prev => ({ ...prev, phone: e.target.value }));
                      if (editErrors.phone) setEditErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="+91 98765 43210"
                    disabled={editSaving}
                    autoComplete="tel"
                  />
                  {editErrors.phone && <span className="form-error">{editErrors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="edit-location" className="form-label">Location (City / Area)</label>
                  <input
                    id="edit-location"
                    type="text"
                    className="form-input"
                    value={editForm.location}
                    onChange={e => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your city or area"
                    disabled={editSaving}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-landmark" className="form-label">Landmark</label>
                  <input
                    id="edit-landmark"
                    type="text"
                    className="form-input"
                    value={editForm.landmark}
                    onChange={e => setEditForm(prev => ({ ...prev, landmark: e.target.value }))}
                    placeholder="e.g. Near Apollo Hospital"
                    disabled={editSaving}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-pincode" className="form-label">Pincode</label>
                  <input
                    id="edit-pincode"
                    type="text"
                    className="form-input"
                    value={editForm.pincode}
                    onChange={e => setEditForm(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder="e.g. 110001"
                    disabled={editSaving}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={closeEditModal} disabled={editSaving}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-primary" disabled={editSaving}>
                  {editSaving ? (
                    <><Loader2 size={15} className="spinner" /> Saving…</>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD FAMILY MEMBER MODAL ── */}
      {showFamilyModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="family-modal-title">
          <div className="modal-container">
            <div className="modal-header">
              <h3 id="family-modal-title">{editingFamilyMemberId ? 'Edit Family Member' : 'Add Family Member'}</h3>
              <button className="modal-close-btn" onClick={closeFamilyModal} aria-label="Close modal" disabled={familySaving}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFamilyMember} noValidate>
              <div className="modal-body">
                {familyFormError && (
                  <div className="form-alert form-alert--error">
                    <AlertCircle size={15} />
                    <span>{familyFormError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="family-name" className="form-label">Name <span className="required-star">*</span></label>
                  <input
                    id="family-name"
                    type="text"
                    className={`form-input ${familyFormErrors.name ? 'form-input--error' : ''}`}
                    value={familyForm.name}
                    onChange={e => {
                      setFamilyForm(prev => ({ ...prev, name: e.target.value }));
                      if (familyFormErrors.name) setFamilyFormErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Enter full name"
                    disabled={familySaving}
                    autoComplete="off"
                  />
                  {familyFormErrors.name && <span className="form-error">{familyFormErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="family-relationship" className="form-label">Relationship <span className="required-star">*</span></label>
                  <select
                    id="family-relationship"
                    className={`form-select ${familyFormErrors.relationship ? 'form-input--error' : ''}`}
                    value={familyForm.relationship}
                    onChange={e => {
                      setFamilyForm(prev => ({ ...prev, relationship: e.target.value }));
                      if (familyFormErrors.relationship) setFamilyFormErrors(prev => ({ ...prev, relationship: '' }));
                    }}
                    disabled={familySaving}
                  >
                    <option value="">Select relationship</option>
                    {RELATIONSHIP_OPTIONS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {familyFormErrors.relationship && <span className="form-error">{familyFormErrors.relationship}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="family-age" className="form-label">Age <span className="form-optional">(optional)</span></label>
                    <input
                      id="family-age"
                      type="number"
                      className={`form-input ${familyFormErrors.age ? 'form-input--error' : ''}`}
                      value={familyForm.age}
                      onChange={e => {
                        setFamilyForm(prev => ({ ...prev, age: e.target.value }));
                        if (familyFormErrors.age) setFamilyFormErrors(prev => ({ ...prev, age: '' }));
                      }}
                      placeholder="e.g. 30"
                      min="0"
                      max="120"
                      disabled={familySaving}
                    />
                    {familyFormErrors.age && <span className="form-error">{familyFormErrors.age}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="family-gender" className="form-label">Gender <span className="form-optional">(optional)</span></label>
                    <select
                      id="family-gender"
                      className="form-select"
                      value={familyForm.gender}
                      onChange={e => setFamilyForm(prev => ({ ...prev, gender: e.target.value }))}
                      disabled={familySaving}
                    >
                      <option value="">Select gender</option>
                      {GENDER_OPTIONS.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={closeFamilyModal} disabled={familySaving}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-primary" disabled={familySaving}>
                  {familySaving ? (
                    <><Loader2 size={15} className="spinner" /> Saving…</>
                  ) : (
                    <>{editingFamilyMemberId ? <Edit size={15} /> : <Plus size={15} />} {editingFamilyMemberId ? 'Save Changes' : 'Add Member'}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── HERO BANNER ── */}
      <div className="profile-header-bg">
        <div className="container">

          {/* Back to site link */}
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/" className="btn-back-glass">
              <ArrowLeft size={16} /> Back to AMPLR Health
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

          {/* Compact user card */}
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
                    <button className="edit-btn" aria-label="Edit personal details" onClick={openEditModal}>
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
                    <span className="info-label">Location</span>
                    <span className="info-value">
                      {publicUser?.location || <span className="info-value-muted">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Landmark</span>
                    <span className="info-value">
                      {publicUser?.landmark || <span className="info-value-muted">Not provided</span>}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Pincode</span>
                    <span className="info-value">
                      {publicUser?.pincode || <span className="info-value-muted">Not provided</span>}
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
                  onClick={() => openFamilyModal()}
                >
                  <Plus size={15} /> Add Member
                </button>
              </div>

              {/* Loading state */}
              {familyLoading && (
                <div className="family-loading">
                  <Loader2 size={20} className="spinner" />
                  <span>Loading family members…</span>
                </div>
              )}

              {/* Error state */}
              {!familyLoading && familyError && (
                <div className="form-alert form-alert--error" style={{ marginBottom: '1rem' }}>
                  <AlertCircle size={15} />
                  <span>{familyError}</span>
                </div>
              )}

              {/* Family member cards */}
              {!familyLoading && !familyError && familyMembers.length > 0 && (
                <div className="family-grid">
                  {familyMembers.map(member => (
                    <div className="family-card" key={member.id}>
                      <div className="family-card__avatar">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="family-card__info">
                        <h4 className="family-card__name">{member.name}</h4>
                        <span className="family-card__relationship">{member.relationship}</span>
                        <div className="family-card__meta">
                          {member.age != null && (
                            <span className="family-card__tag">Age: {member.age}</span>
                          )}
                          {member.gender && (
                            <span className="family-card__tag">{member.gender}</span>
                          )}
                        </div>
                      </div>
                      <div className="family-card__actions" style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                        <button
                          className="family-card__edit"
                          aria-label={`Edit ${member.name}`}
                          onClick={() => openFamilyModal(member)}
                          title="Edit member"
                          style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '4px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="family-card__delete"
                          aria-label={`Remove ${member.name}`}
                          onClick={() => setDeleteTarget(member.id)}
                          title="Remove member"
                          style={{ padding: '6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!familyLoading && !familyError && familyMembers.length === 0 && (
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
                      onClick={() => openFamilyModal()}
                    >
                      <Plus size={15} /> Add Family Member
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default CustomerProfile;
