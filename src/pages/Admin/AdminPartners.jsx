import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Eye, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('partner_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));

      MySwal.fire({
        icon: 'success',
        title: 'Status Updated',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } catch (err) {
      console.error("Error updating status:", err);
      MySwal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const handleApprove = (id) => {
    MySwal.fire({
      title: 'Document Verification',
      text: 'Have you completed the document verification for this partner?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Verify & Approve',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981'
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id, 'Approved');
      }
    });
  };

  const viewDetails = (app) => {
    setSelectedApp(app);
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
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
                      <button 
                        onClick={() => handleApprove(app.id)}
                        className="adm-btn adm-btn--outline" 
                        title="Approve (Verify Documents)"
                        style={{ padding: '0.4rem', color: '#10b981', borderColor: '#10b981' }}
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(app.id, 'Rejected')}
                        className="adm-btn adm-btn--outline" 
                        title="Reject"
                        style={{ padding: '0.4rem', color: '#ef4444', borderColor: '#ef4444' }}
                      >
                        <XCircle size={16} />
                      </button>
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
              <div style={{ marginBottom: '15px' }}>
                <span className="adm-badge adm-badge--pending" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>
                  Type: {selectedApp.form_type}
                </span>
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
