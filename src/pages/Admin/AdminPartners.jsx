import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Eye, CheckCircle, XCircle, Clock, X, MessageCircle, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/* ─── Partner ID Service Code Map ─── */
const SERVICE_CODE_MAP = {
  ambulance:        'AMB',
  doctor:           'DOC',
  ecg:              'ECG',
  hospital:         'HOS',
  lab_technician:   'LAB',
  nursing:          'NUR',
  physiotherapy:    'PHY',
  caregiver:        'CGR',
  customer_english: 'CST',
  customer_telugu:  'CST',
};

/* ─── Generate a unique Partner ID ─── */
const generatePartnerId = async (formType) => {
  const code = SERVICE_CODE_MAP[formType] || 'PAR';
  let attempts = 0;
  while (attempts < 10) {
    const num = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    const candidate = `${code}-${num}`;
    // Check if this ID already exists
    const { data } = await supabase
      .from('partner_applications')
      .select('id')
      .eq('partner_id', candidate)
      .maybeSingle();
    if (!data) return candidate; // unique!
    attempts++;
  }
  // Fallback: timestamp-based
  return `${code}-${Date.now().toString().slice(-4)}`;
};

const AdminPartners = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusTab, setStatusTab] = useState('pending'); // 'pending' or 'approved'
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus, showToast = true) => {
    try {
      const { error } = await supabase
        .from('partner_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));

      if (showToast) {
        MySwal.fire({
          icon: 'success',
          title: 'Status Updated',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      MySwal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const sendWhatsAppMessage = (app, initialPassword = '') => {
    const phone = app.mobile_number;
    const formattedPhone = phone.replace(/\D/g, ''); // strip non-digits
    const finalPhone = formattedPhone.length === 10 ? `91${formattedPhone}` : formattedPhone;
    
    const partnerIdText = app.partner_id ? `\n\n🪪 Your Partner ID: *${app.partner_id}*` : '';
    const emailText = app.email_address ? `\n📧 Login Email: *${app.email_address}*` : '';
    const passText = initialPassword ? `\n🔑 Initial Password: *${initialPassword}*` : '';
    
    const message = encodeURIComponent(
      `Hello ${app.full_name},\n\n🎉 Welcome to the AMPLR HEALTH family!${partnerIdText}${emailText}${passText}\n\nYour application has been approved and your account is active. Please visit the link below to access your Partner Dashboard:\n\n👉 www.amplrhealth.com/partner-login\n\n(Note: You can change your password anytime after logging in from your Partner Profile.)\n\nRegards,\nAMPLR HEALTH Team`
    );
    window.open(`https://wa.me/${finalPhone}?text=${message}`, '_blank');
  };

  const handleApprove = async (app) => {
    const existingEmail = app.email_address || app.form_data?.email || app.form_data?.emailAddress || '';
    
    const { value: formValues } = await MySwal.fire({
      title: 'Approve & Create Partner Account',
      html:
        `<div style="text-align:left; font-size:0.95rem;">` +
        `<p style="margin-bottom:12px; color:#475569;">Create login credentials for <strong>${app.full_name}</strong>:</p>` +
        `<label style="display:block;margin-bottom:4px;font-weight:600;color:#0f172a;">Partner Email Address *</label>` +
        `<input id="swal-email" type="email" class="swal2-input" placeholder="Enter partner email" value="${existingEmail}" style="margin:0 0 15px 0;width:100%;box-sizing:border-box;">` +
        `<label style="display:block;margin-bottom:4px;font-weight:600;color:#0f172a;">Initial Password *</label>` +
        `<input id="swal-pass" type="text" class="swal2-input" placeholder="e.g. Partner@123" value="Partner@123" style="margin:0 0 15px 0;width:100%;box-sizing:border-box;">` +
        `<p style="font-size:0.8rem;color:#64748b;margin:0;">The partner can change this password after logging in.</p>` +
        `</div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Approve & Create Account',
      confirmButtonColor: '#10b981',
      preConfirm: () => {
        const emailVal = document.getElementById('swal-email').value.trim();
        const passVal = document.getElementById('swal-pass').value.trim();
        if (!emailVal) {
          Swal.showValidationMessage('Please enter a valid email address');
          return false;
        }
        if (!passVal || passVal.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters');
          return false;
        }
        return { email: emailVal, password: passVal };
      }
    });

    if (!formValues) return;

    try {
      MySwal.fire({
        title: 'Creating Account...',
        text: 'Generating Partner ID & creating account in Supabase.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      // 1. Generate unique Partner ID if not assigned
      let partnerId = app.partner_id;
      if (!partnerId) {
        partnerId = await generatePartnerId(app.form_type);
      }

      // 2. Create User in Supabase Auth via signUp
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formValues.email,
        password: formValues.password,
        options: {
          data: { full_name: app.full_name, role: 'partner' }
        }
      });

      let userId = signUpData?.user?.id || app.user_id;

      if (signUpError && !signUpError.message?.toLowerCase().includes('already registered')) {
        console.warn("Sign up warning:", signUpError.message);
      }

      // 3. Update partner_applications record in Supabase
      const updatePayload = {
        status: 'Approved',
        partner_id: partnerId,
        email_address: formValues.email
      };
      if (userId) updatePayload.user_id = userId;

      const { error: updateError } = await supabase
        .from('partner_applications')
        .update(updatePayload)
        .eq('id', app.id);

      if (updateError) throw updateError;

      // Update local state
      const updatedApp = { 
        ...app, 
        status: 'Approved', 
        partner_id: partnerId, 
        email_address: formValues.email, 
        user_id: userId 
      };

      setApplications(prev => prev.map(a => a.id === app.id ? updatedApp : a));

      MySwal.fire({
        title: `Partner Approved! 🎉`,
        html: 
          `<p style="margin-bottom:6px">Partner ID: <strong style="color:#10b981;font-size:1.1rem">${partnerId}</strong></p>` +
          `<p style="margin-bottom:6px">Email: <strong>${formValues.email}</strong></p>` +
          `<p style="margin-bottom:12px">Password: <strong>${formValues.password}</strong></p>` +
          `<p style="padding:10px;background:#f0fdf4;border-radius:8px;color:#166534;font-size:0.9rem">` +
          `✅ Account created! Send login credentials to partner via WhatsApp now.</p>`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Send WhatsApp Credentials',
        cancelButtonText: 'Done',
        confirmButtonColor: '#25D366'
      }).then((waResult) => {
        if (waResult.isConfirmed) {
          sendWhatsAppMessage(updatedApp, formValues.password);
        }
      });

    } catch (err) {
      console.error("Error approving partner:", err);
      MySwal.fire('Error', err.message || 'Failed to approve partner', 'error');
    }
  };

  const viewDetails = (app) => {
    setSelectedApp(app);
  };

  const handleGenerateId = async (app) => {
    const result = await MySwal.fire({
      title: 'Generate Partner ID?',
      html: `<p>This will assign a new unique Partner ID to <strong>${app.full_name}</strong>.</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Generate!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981'
    });
    if (!result.isConfirmed) return;

    try {
      const partnerId = await generatePartnerId(app.form_type);
      const { error } = await supabase
        .from('partner_applications')
        .update({ partner_id: partnerId })
        .eq('id', app.id);
      if (error) throw error;

      // Update local state
      setApplications(prev =>
        prev.map(a => a.id === app.id ? { ...a, partner_id: partnerId } : a)
      );
      // Also update selectedApp if it's open
      setSelectedApp(prev => prev && prev.id === app.id ? { ...prev, partner_id: partnerId } : prev);

      MySwal.fire({
        title: 'Partner ID Assigned! 🎉',
        html: `<p>Partner ID: <strong style="color:#10b981;font-size:1.2rem;letter-spacing:2px">${partnerId}</strong></p>`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } catch (err) {
      console.error('Generate ID error:', err);
      MySwal.fire('Error', 'Failed to generate Partner ID. Please run the SQL command in Supabase first.', 'error');
    }
  };

  const filteredApps = applications.filter(app => {
    // Search filter
    const matchesSearch = app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.mobile_number.includes(searchTerm) ||
                          app.form_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || app.form_type === typeFilter;
    
    // Status tab filter (Pending/Rejected goes to 'pending' tab, Approved goes to 'approved')
    const matchesStatus = statusTab === 'approved' 
      ? app.status === 'Approved' 
      : (app.status === 'Pending' || app.status === 'Rejected');

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === 'Approved') return <span className="adm-badge adm-badge--confirmed">Approved</span>;
    if (status === 'Rejected') return <span className="adm-badge adm-badge--cancelled">Rejected</span>;
    return <span className="adm-badge adm-badge--pending">Pending</span>;
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading partner applications...</div>;

  return (
    <div className="adm-page">
      <div className="adm-page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 className="adm-page-title">Partner Applications</h1>
          <p className="adm-page-sub">Review and manage partner onboarding requests.</p>
        </div>
      </div>

      {/* STATUS TABS */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setStatusTab('pending')}
          style={{ 
            background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 600, color: statusTab === 'pending' ? 'var(--primary)' : '#64748b',
            borderBottom: statusTab === 'pending' ? '2px solid var(--primary)' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          Pending / Rejected
        </button>
        <button 
          onClick={() => setStatusTab('approved')}
          style={{ 
            background: 'none', border: 'none', padding: '0.75rem 1rem', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 600, color: statusTab === 'approved' ? 'var(--primary)' : '#64748b',
            borderBottom: statusTab === 'approved' ? '2px solid var(--primary)' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          Approved Partners
        </button>
      </div>

      <div className="adm-toolbar" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div className="adm-search-box" style={{ flex: '1', minWidth: '250px' }}>
          <Search size={18} className="adm-search-icon" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adm-search-input"
            style={{ width: '100%' }}
          />
        </div>
        <div className="adm-filter-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Filter by Service:</span>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '0.65rem 0', outline: 'none', fontSize: '0.95rem', color: '#0f172a', cursor: 'pointer', minWidth: '150px' }}
          >
            <option value="all">All Applications</option>
            <option value="ambulance">Ambulance Services</option>
            <option value="doctor">Doctor</option>
            <option value="ecg">ECG Technician</option>
            <option value="hospital">Hospital Partnership</option>
            <option value="lab_technician">Lab Technician / Phlebotomist</option>
            <option value="nursing">Nursing Professional</option>
            <option value="physiotherapy">Physiotherapy</option>
            <option value="customer_english">Customer (English)</option>
            <option value="customer_telugu">Customer (Telugu)</option>
          </select>
        </div>
      </div>

      <div className="adm-table-container">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Applicant Name</th>
              <th>Phone Number</th>
              <th>Application Type</th>
              <th>Partner ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No applications found.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.created_at).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{app.full_name}</td>
                  <td>{app.mobile_number}</td>
                  <td style={{ textTransform: 'capitalize' }}>{app.form_type.replace('_', ' ')}</td>
                  <td>
                    {app.partner_id ? (
                      <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={12} />{app.partner_id}
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>—</span>
                    )}
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => viewDetails(app)}
                        className="adm-btn adm-btn--outline" 
                        title="View Details"
                        style={{ padding: '0.4rem' }}
                      >
                        <Eye size={16} />
                      </button>
                      
                      {app.status === 'Approved' ? (
                        <>
                          {/* Show Generate ID button only if no partner_id yet */}
                          {!app.partner_id && (
                            <button
                              onClick={() => handleGenerateId(app)}
                              className="adm-btn adm-btn--outline"
                              title="Generate Partner ID"
                              style={{ padding: '0.4rem 0.6rem', color: '#7c3aed', borderColor: '#7c3aed', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                            >
                              <ShieldCheck size={14} /> ID
                            </button>
                          )}
                          <button 
                            onClick={() => sendWhatsAppMessage(app)}
                            className="adm-btn adm-btn--outline" 
                            title="Send WhatsApp"
                            style={{ padding: '0.4rem', color: '#25D366', borderColor: '#25D366' }}
                          >
                            <MessageCircle size={16} />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleApprove(app)}
                          className="adm-btn adm-btn--outline" 
                          title="Approve (Verify Documents)"
                          style={{ padding: '0.4rem', color: '#10b981', borderColor: '#10b981' }}
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}

                      {app.status !== 'Rejected' && (
                        <button 
                          onClick={() => updateStatus(app.id, 'Rejected')}
                          className="adm-btn adm-btn--outline" 
                          title="Reject"
                          style={{ padding: '0.4rem', color: '#ef4444', borderColor: '#ef4444' }}
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DRAWER FOR DETAILS */}
      {selectedApp && (
        <div className="adm-drawer-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()} style={{ width: '600px', maxWidth: '100vw' }}>
            <div className="adm-drawer-header">
              <h3>{selectedApp.full_name}'s Application</h3>
              <button className="adm-drawer-close" onClick={() => setSelectedApp(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="adm-drawer-content" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="adm-badge adm-badge--pending" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>
                  Type: {selectedApp.form_type}
                </span>
                {selectedApp.partner_id && (
                  <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '5px', border: '1px solid #a7f3d0' }}>
                    <ShieldCheck size={13} /> Partner ID: {selectedApp.partner_id}
                  </span>
                )}
              </div>
              
              {Object.entries(selectedApp.form_data).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '15px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </strong>
                  <span style={{ color: '#0f172a', fontSize: '1rem', wordBreak: 'break-word', display: 'block' }}>
                    {Array.isArray(value) ? value.join(', ') : (value || 'N/A')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartners;
