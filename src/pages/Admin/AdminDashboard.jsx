import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, Users, CalendarCheck, Settings, LogOut, 
  Search, Bell, Activity, Clock, CheckCircle, XCircle, Edit2, Save
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
      return;
    }
    
    // Verify admin role
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (userData?.role !== 'admin') {
      await supabase.auth.signOut();
      navigate('/admin');
      return;
    }
    
    setAdminUser(userData);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          services (title, price),
          users (full_name, phone),
          family_members (name, relationship)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });
      setServices(servicesData || []);

      // Fetch customers
      const { data: customersData } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'user')
        .order('created_at', { ascending: false });
      setCustomers(customersData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) throw error;
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (error) {
      alert('Failed to update booking status');
    }
  };

  const saveServicePrice = async (serviceId) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ price: parseFloat(editPriceValue) })
        .eq('id', serviceId);
        
      if (error) throw error;
      setServices(services.map(s => s.id === serviceId ? { ...s, price: parseFloat(editPriceValue) } : s));
      setEditingServiceId(null);
    } catch (error) {
      alert('Failed to update price');
    }
  };

  const renderStatusBadge = (status) => {
    const statusMap = {
      pending: { color: '#f59e0b', bg: '#fef3c7', icon: Clock },
      confirmed: { color: '#3b82f6', bg: '#dbeafe', icon: Activity },
      completed: { color: '#10b981', bg: '#d1fae5', icon: CheckCircle },
      cancelled: { color: '#ef4444', bg: '#fee2e2', icon: XCircle }
    };
    const config = statusMap[status] || statusMap.pending;
    const Icon = config.icon;
    return (
      <span className="status-badge" style={{ color: config.color, backgroundColor: config.bg }}>
        <Icon size={14} style={{ marginRight: '4px' }} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="sidebar-logo" />
          <div className="sidebar-title">Admin Portal</div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Activity size={20} /> Services Catalog
          </button>
          <button 
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} /> Customers
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item text-danger" onClick={handleLogout}>
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search bookings, customers, services..." />
          </div>
          
          <div className="topbar-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="admin-profile">
              <div className="profile-info">
                <span className="profile-name">{adminUser?.full_name || 'Admin'}</span>
                <span className="profile-role">Admin</span>
              </div>
              <div className="profile-avatar">
                {adminUser?.full_name ? adminUser.full_name.charAt(0) : 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="dashboard-content">
          
          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <>
              <div className="content-header">
                <h1>Service Bookings Overview</h1>
                <p>Manage all customer service requests and history.</p>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper blue"><CalendarCheck size={24} /></div>
                  <div className="stat-details">
                    <span className="stat-value">{bookings.length}</span>
                    <span className="stat-label">Total Bookings</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon-wrapper orange"><Clock size={24} /></div>
                  <div className="stat-details">
                    <span className="stat-value">{bookings.filter(b => b.status === 'pending').length}</span>
                    <span className="stat-label">Pending Requests</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon-wrapper green"><CheckCircle size={24} /></div>
                  <div className="stat-details">
                    <span className="stat-value">{bookings.filter(b => b.status === 'completed').length}</span>
                    <span className="stat-label">Completed Services</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon-wrapper purple"><Activity size={24} /></div>
                  <div className="stat-details">
                    <span className="stat-value">{services.length}</span>
                    <span className="stat-label">Active Services</span>
                  </div>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header">
                  <h2>Recent Bookings</h2>
                  <button className="btn-secondary" onClick={fetchData}>Refresh Data</button>
                </div>
                {loading ? <div className="loading-state">Loading booking data...</div> : bookings.length === 0 ? <div className="empty-state">No bookings found yet.</div> : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID / Date</th>
                        <th>Customer Info</th>
                        <th>Service Booked</th>
                        <th>Patient/For</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td>
                            <div className="booking-id">#{booking.id.substring(0, 8)}</div>
                            <div className="booking-date">{new Date(booking.created_at).toLocaleDateString()}</div>
                          </td>
                          <td>
                            <div className="customer-name">{booking.customer_name}</div>
                            <div className="customer-phone">{booking.customer_phone}</div>
                          </td>
                          <td><div className="service-name">{booking.services?.title || 'Unknown Service'}</div></td>
                          <td>
                            {booking.family_members ? (
                              <div><div className="patient-name">{booking.family_members.name}</div><div className="patient-rel">({booking.family_members.relationship})</div></div>
                            ) : (
                              <div className="patient-name">Self</div>
                            )}
                          </td>
                          <td>
                            <div className="amount">₹{booking.amount}</div>
                            <div className={`payment-status ${booking.payment_status}`}>{booking.payment_status}</div>
                          </td>
                          <td>{renderStatusBadge(booking.status)}</td>
                          <td>
                            <select className="status-select" value={booking.status} onChange={(e) => updateBookingStatus(booking.id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── SERVICES CATALOG TAB ── */}
          {activeTab === 'services' && (
            <>
              <div className="content-header">
                <h1>Services Catalog</h1>
                <p>Manage all available services and update live pricing.</p>
              </div>
              <div className="table-container">
                <div className="table-header">
                  <h2>All Services</h2>
                  <button className="btn-secondary" onClick={fetchData}>Refresh Data</button>
                </div>
                {loading ? <div className="loading-state">Loading services...</div> : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Service Title</th>
                        <th>Price (₹)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(service => (
                        <tr key={service.id}>
                          <td><span className="status-badge" style={{backgroundColor:'#f1f5f9', color:'#475569'}}>{service.category}</span></td>
                          <td><div className="service-name">{service.title}</div></td>
                          <td>
                            {editingServiceId === service.id ? (
                              <input 
                                type="number" 
                                className="price-edit-input"
                                value={editPriceValue} 
                                onChange={(e) => setEditPriceValue(e.target.value)}
                                autoFocus
                                style={{ padding: '0.25rem 0.5rem', width: '100px', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}
                              />
                            ) : (
                              <div className="amount">₹{service.price}</div>
                            )}
                          </td>
                          <td>
                            {editingServiceId === service.id ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize:'0.8rem' }} onClick={() => saveServicePrice(service.id)}>
                                  <Save size={14} style={{marginRight:'4px'}}/> Save
                                </button>
                                <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize:'0.8rem' }} onClick={() => setEditingServiceId(null)}>
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize:'0.8rem' }} onClick={() => { setEditingServiceId(service.id); setEditPriceValue(service.price); }}>
                                <Edit2 size={14} style={{marginRight:'4px'}}/> Edit Price
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── CUSTOMERS TAB ── */}
          {activeTab === 'customers' && (
            <>
              <div className="content-header">
                <h1>Registered Customers</h1>
                <p>View all users registered in the Amplr Health system.</p>
              </div>
              <div className="table-container">
                <div className="table-header">
                  <h2>Customer List</h2>
                  <button className="btn-secondary" onClick={fetchData}>Refresh Data</button>
                </div>
                {loading ? <div className="loading-state">Loading customers...</div> : customers.length === 0 ? <div className="empty-state">No customers found.</div> : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id}>
                          <td><div className="booking-id">#{customer.id.substring(0, 8)}</div></td>
                          <td><div className="customer-name">{customer.full_name || 'Anonymous User'}</div></td>
                          <td><span className="status-badge" style={{backgroundColor:'#dbeafe', color:'#3b82f6'}}>{customer.role}</span></td>
                          <td><div className="booking-date">{new Date(customer.created_at).toLocaleDateString()}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
