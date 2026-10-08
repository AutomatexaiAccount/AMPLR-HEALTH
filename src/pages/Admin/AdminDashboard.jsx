import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard, Users, CalendarCheck, LogOut,
  Search, Bell, Activity, Clock, CheckCircle, XCircle,
  Edit2, Save, X, Heart, TrendingUp, Handshake,
  Phone, Mail, Calendar, RefreshCw, AlertCircle,
  ChevronRight, Loader2, Eye, User, Menu, ArrowRight,
  Zap, FileText, UserPlus, Settings, ShieldCheck, Tag, Plus, Trash2, Download, Upload, MapPin,
  Briefcase
} from 'lucide-react';
import Swal from 'sweetalert2';
import AdminPartners from './AdminPartners';
import './AdminDashboard.css';

/* ─── Module-level SwalToast mixin (created once, never re-created on re-renders) ─── */
const SwalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

/* ─── Module-level AudioContext (created once, avoids autoplay restriction stacking) ─── */
let _audioCtx = null;
const playNotifBeep = () => {
  try {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Silently ignore — browser autoplay policy may block before first user interaction
  }
};

const getEligiblePartners = (booking, partnersList) => {
  const serviceTitle = (booking.services?.title || '').toLowerCase();
  return partnersList.filter(p => {
    if (p.status !== 'Approved') return false;
    const formType = (p.form_type || '').toLowerCase();
    
    if (serviceTitle.includes('lab')) return formType.includes('lab') || formType.includes('phleb');
    if (serviceTitle.includes('physio')) return formType.includes('physio');
    if (serviceTitle.includes('nurs')) return formType.includes('nurse');
    if (serviceTitle.includes('doctor') || serviceTitle.includes('consult')) return formType.includes('doctor');
    if (serviceTitle.includes('ecg')) return formType.includes('ecg');
    if (serviceTitle.includes('ambulance')) return formType.includes('ambulance');
    if (serviceTitle.includes('caregiver') || serviceTitle.includes('caretaker')) return formType.includes('caregiver') || formType.includes('caretaker');
    
    return true; 
  });
};

/* ═══════════════════════════════════════════════
   HELPER COMPONENTS
═══════════════════════════════════════════════ */

/* ─── Toast ─── */
const ToastContainer = ({ toasts, onDismiss }) => (
  <div className="adm-toast-container" aria-live="polite">
    {toasts.map(t => (
      <div key={t.id} className={`adm-toast adm-toast--${t.type}`} role="alert">
        <div className="adm-toast-accent" />
        <div className="adm-toast-icon">
          {t.type === 'realtime' && <Zap size={16} />}
          {t.type === 'success' && <CheckCircle size={16} />}
          {t.type === 'error' && <XCircle size={16} />}
          {t.type === 'info' && <Bell size={16} />}
        </div>
        <div className="adm-toast-body">
          <span className="adm-toast-title">{t.title}</span>
          {t.message && <span className="adm-toast-msg">{t.message}</span>}
        </div>
        <button className="adm-toast-close" onClick={() => onDismiss(t.id)} aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

/* ─── Status Badge ─── */
const StatusBadge = ({ status }) => {
  const map = {
    pending:   { label: 'Pending',   cls: 'adm-badge--pending' },
    confirmed: { label: 'Accepted',  cls: 'adm-badge--confirmed' },
    completed: { label: 'Completed', cls: 'adm-badge--completed' },
    cancelled: { label: 'Cancelled', cls: 'adm-badge--cancelled' },
  };
  const cfg = map[status] || map.pending;
  return <span className={`adm-badge ${cfg.cls}`}>{cfg.label}</span>;
};

/* ─── Skeleton ─── */
const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="adm-skeleton">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="adm-skeleton-row">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className={`adm-skeleton-cell ${j === 0 ? 'adm-skeleton-cell--wide' : ''}`} />
        ))}
      </div>
    ))}
  </div>
);

const CardSkeleton = ({ count = 6 }) => (
  <div className="adm-stats-grid">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="adm-stat-card adm-stat-card--skeleton">
        <div className="adm-skeleton-circle" />
        <div className="adm-skeleton-lines">
          <div className="adm-skeleton-cell adm-skeleton-cell--wide" style={{ height: 24 }} />
          <div className="adm-skeleton-cell" style={{ height: 12, width: '60%' }} />
        </div>
      </div>
    ))}
  </div>
);

/* ─── Empty State ─── */
const EmptyState = ({ icon: Icon, title, sub, action, onAction }) => (
  <div className="adm-empty">
    <div className="adm-empty-icon"><Icon size={28} /></div>
    <h3 className="adm-empty-title">{title}</h3>
    <p className="adm-empty-sub">{sub}</p>
    {action && onAction && (
      <button className="adm-btn adm-btn--primary" onClick={onAction}>
        {action} <ArrowRight size={14} />
      </button>
    )}
  </div>
);

/* ─── Error State ─── */
const ErrorState = ({ message, onRetry }) => (
  <div className="adm-error-state">
    <AlertCircle size={32} />
    <h3>Something went wrong</h3>
    <p>{message || 'Unable to load data. Please try again.'}</p>
    {onRetry && (
      <button className="adm-btn adm-btn--outline" onClick={onRetry}>
        <RefreshCw size={14} /> Try Again
      </button>
    )}
  </div>
);

/* ─── Greeting ─── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

/* ─── Advanced Filters ─── */
const AdvancedFilters = ({ filters, setFilters, services, filterStats }) => {
  const [expanded, setExpanded] = useState(true);
  const isActive = filters.fromDate || filters.toDate || filters.serviceId || filters.status;

  const handleDateChange = (field, value) => {
    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (selectedDate > today) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Date Selection',
          text: `You cannot select a future date (${selectedDate.toLocaleDateString()}).`,
          confirmButtonColor: '#2563eb',
          confirmButtonText: 'Okay'
        });
        return; // Prevent setting future date
      }
    }
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`adm-advanced-filters ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="adm-filters-header" onClick={() => setExpanded(!expanded)}>
        <div className="adm-filters-title-group">
          <h3 className="adm-filters-title">
            <Search size={16} className={isActive ? 'adm-text-blue' : ''} /> 
            Advanced Filters
            {isActive && <span className="adm-filter-active-dot"></span>}
          </h3>
          <p className="adm-filters-subtitle">Click to {expanded ? 'collapse' : 'expand'} options</p>
        </div>
        <div className="adm-filters-header-actions" onClick={e => e.stopPropagation()}>
          {isActive && (
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setFilters({fromDate:'', toDate:'', serviceId:'', status:''})}>
              Clear Filters
            </button>
          )}
          <button className="adm-btn-icon adm-btn-icon--sm" onClick={() => setExpanded(!expanded)}>
            <ChevronRight size={16} className={`adm-filter-chevron ${expanded ? 'rotate' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className={`adm-filters-body ${expanded ? 'show' : ''}`}>
        <div className="adm-filters-grid">
          <div className="adm-filter-item">
            <label>From Date</label>
            <input type="date" className="adm-input adm-input-btn" value={filters.fromDate} onChange={e => handleDateChange('fromDate', e.target.value)} />
          </div>
          <div className="adm-filter-item">
            <label>To Date</label>
            <input type="date" className="adm-input adm-input-btn" value={filters.toDate} onChange={e => handleDateChange('toDate', e.target.value)} />
          </div>
          <div className="adm-filter-item">
            <label>Service</label>
            <select className="adm-select adm-input-btn" value={filters.serviceId} onChange={e => setFilters({...filters, serviceId: e.target.value})}>
              <option value="">All Services</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
        </div>
        
        <div className="adm-filter-hint">
          <span className="adm-filter-hint-icon">💡</span>
          <span className="adm-filter-hint-text">To view bookings for a <strong>single specific date</strong>, simply select that same date in both the "From Date" and "To Date" fields.</span>
        </div>
        
        <div className="adm-filter-summary">
          <div className="adm-filter-stat-box">
            <div className="adm-stat-icon-sm blue"><CalendarCheck size={18} /></div>
            <div className="adm-filter-stat-text">
              <span className="adm-filter-stat-label">Filtered Bookings</span>
              <span className="adm-filter-stat-val">
                {filterStats.totalBookings}
              </span>
            </div>
          </div>
          <div className="adm-filter-stat-box">
            <div className="adm-stat-icon-sm green"><TrendingUp size={18} /></div>
            <div className="adm-filter-stat-text">
              <span className="adm-filter-stat-label">Total Collection</span>
              <span className="adm-filter-stat-val">
                ₹{filterStats.totalCollection.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════════════ */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [partnersProfileList, setPartnersProfileList] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [familyMembersCount, setFamilyMembersCount] = useState(0);
  const [pendingPartnersCount, setPendingPartnersCount] = useState(0);
  const [promoCodes, setPromoCodes] = useState([]);

  // Sidebar mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Service editing
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({ title: '', category: 'HEALTHCARE SERVICES', price: 0 });
  const [manageSubServiceModalOpen, setManageSubServiceModalOpen] = useState(false);
  const [manageSubServiceData, setManageSubServiceData] = useState(null); // the selected parent service
  const [subServicesList, setSubServicesList] = useState([]);
  const [subServiceLoading, setSubServiceLoading] = useState(false);
  const [newSubServiceForm, setNewSubServiceForm] = useState({ title: '', price: 0 });

  // Customer detail drawer
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerData, setCustomerData] = useState({ family: [], bookings: [] });
  const [customerTab, setCustomerTab] = useState('overview');

  // Partner detail drawer
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partnerTab, setPartnerTab] = useState('overview');

  // Promo Code editing
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [promoForm, setPromoForm] = useState({ code: '', discount_amount: '', discount_type: 'percentage', is_active: true, is_auto_apply: false });
  const [promoSaving, setPromoSaving] = useState(false);

  // Toasts & notifications
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Activity feed
  const [activityFeed, setActivityFeed] = useState([]);

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingFilter, setBookingFilter] = useState('active');
  const [globalFilter, setGlobalFilter] = useState({
    fromDate: '',
    toDate: '',
    serviceId: '',
    status: ''
  });

  const navigate = useNavigate();
  const notifRef = useRef(null);
  const toastCounter = useRef(0);

  /* ─── Toast / notification helpers ─── */
  // Uses module-level SwalToast (stable, never re-created on render)
  const addToast = useCallback((title, message = '', type = 'info') => {
    let icon = 'info';
    if (type === 'success') icon = 'success';
    if (type === 'error') icon = 'error';
    if (type === 'realtime') {
      icon = 'info';
      playNotifBeep(); // uses module-level stable function
    }
    SwalToast.fire({ icon, title, text: message });
  }, []); // safe: SwalToast and playNotifBeep are module-level constants

  const dismissToast = useCallback(() => {
    // No-op: toasts are managed by SwalToast, not local state
  }, []);

  const addNotification = useCallback((title, message, type = 'info') => {
    const n = { id: Date.now(), title, message, type, time: new Date(), read: false };
    setNotifications(prev => [n, ...prev].slice(0, 30));
    setUnreadCount(c => c + 1);
  }, []);

  const addActivity = useCallback((text, type = 'info') => {
    const a = { id: Date.now(), text, type, time: new Date() };
    setActivityFeed(prev => [a, ...prev].slice(0, 15));
  }, []);

  /* ─── Auth check ─── */
  const checkUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate('/admin'); return; }
    const { data: userData } = await supabase
      .from('users').select('*').eq('id', session.user.id).single();
    if (userData?.role !== 'admin') {
      await supabase.auth.signOut();
      navigate('/admin');
      return;
    }
    setAdminUser(userData);
  }, [navigate]);

  /* ─── Fetch all data ─── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const [bkRes, svRes, cuRes, fmRes, pcRes, ppRes, pendRes] = await Promise.all([
        supabase.from('bookings')
          .select('*, services(title, price), users(full_name, phone), family_members(name, relationship)')
          .order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('category', { ascending: true }),
        supabase.from('users').select('*').eq('role', 'user').order('created_at', { ascending: false }),
        supabase.from('family_members').select('id', { count: 'exact' }),
        supabase.from('promo_codes').select('*').order('created_at', { ascending: false }),
        supabase.from('partner_applications').select('*').eq('status', 'Approved').order('created_at', { ascending: false }),
        supabase.from('partner_applications').select('id', { count: 'exact' }).eq('status', 'Pending')
      ]);

      if (bkRes.error) throw bkRes.error;
      if (svRes.error) throw svRes.error;
      if (cuRes.error) throw cuRes.error;
      // promo_codes table might not exist if SQL wasn't run yet, handle gracefully
      if (pcRes.error) {
         console.warn('promo_codes table missing or error:', pcRes.error);
      } else {
         setPromoCodes(pcRes.data || []);
      }

      setBookings(bkRes.data || []);
      setServices(svRes.data || []);
      setCustomers(cuRes.data || []);
      setPartnersProfileList(ppRes?.data || []);
      setFamilyMembersCount(fmRes.data?.length || 0);
      setPendingPartnersCount(pendRes.count || 0);
    } catch (err) {
      console.error('fetchData error:', err);
      setFetchError('Unable to load dashboard data. Please check your connection.');
      addToast('Connection Error', 'Unable to load data from the database.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  /* ─── Mount ─── */
  useEffect(() => { checkUser(); fetchData(); }, [checkUser, fetchData]);

  /* ─── Realtime ─── */
  useEffect(() => {
    const bookingCh = supabase
      .channel('adm-rt-bookings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, async (payload) => {
        const { data } = await supabase.from('bookings')
          .select('*, services(title, price), users(full_name, phone), family_members(name, relationship)')
          .eq('id', payload.new.id).single();
        if (data) {
          setBookings(prev => [data, ...prev]);
          addToast('New Booking Received', `${data.customer_name || 'Customer'} · ${data.services?.title || 'Service'}`, 'realtime');
          addNotification('New Booking', `${data.customer_name || 'Customer'} booked ${data.services?.title || 'a service'}`, 'booking');
          addActivity(`New booking from ${data.customer_name || 'a customer'} for ${data.services?.title || 'a service'}`, 'booking');
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookings' }, (payload) => {
        setBookings(prev => prev.map(b => b.id === payload.new.id ? { ...b, ...payload.new } : b));
      })
      .subscribe();

    const familyCh = supabase
      .channel('adm-rt-family')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'family_members' }, (payload) => {
        setFamilyMembersCount(c => c + 1);
        addToast('Family Member Added', `${payload.new.name} (${payload.new.relationship})`, 'realtime');
        addNotification('Family Member', `${payload.new.name} added as ${payload.new.relationship}`, 'family');
        addActivity(`${payload.new.name} was added as a family member (${payload.new.relationship})`, 'family');
      })
      .subscribe();

    const customerCh = supabase
      .channel('adm-rt-customers')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, (payload) => {
        if (payload.new.role === 'user') {
          setCustomers(prev => [payload.new, ...prev]);
          const name = payload.new.full_name || payload.new.email || 'New user';
          addToast('New Customer', name, 'realtime');
          addNotification('New Customer', `${name} registered`, 'customer');
          addActivity(`${name} created an account`, 'customer');
        }
      })
      .subscribe();

    const partnerCh = supabase
      .channel('adm-rt-partners')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'partner_applications' }, (payload) => {
        setPendingPartnersCount(c => c + 1);
        const name = payload.new.full_name || 'New partner';
        addToast('New Partner Application', name, 'realtime');
        addNotification('Partner Application', `${name} applied to be a partner`, 'partner');
        addActivity(`${name} submitted a partner application`, 'partner');
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'partner_applications' }, (payload) => {
        if (payload.old.status === 'Pending' && payload.new.status !== 'Pending') {
          setPendingPartnersCount(c => Math.max(0, c - 1));
        } else if (payload.old.status !== 'Pending' && payload.new.status === 'Pending') {
          setPendingPartnersCount(c => c + 1);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingCh);
      supabase.removeChannel(familyCh);
      supabase.removeChannel(customerCh);
      supabase.removeChannel(partnerCh);
    };
  }, [addToast, addNotification, addActivity]);

  /* ─── Close notif panel on outside click ─── */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifPanel(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ─── Close sidebar on outside click (mobile) ─── */
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = () => setSidebarOpen(false);
    const timer = setTimeout(() => document.addEventListener('click', handler), 10);
    return () => { clearTimeout(timer); document.removeEventListener('click', handler); };
  }, [sidebarOpen]);

  /* ─── Actions ─── */
  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/admin'); };

  const updateBookingStatus = (bookingId, newStatus, selectEl) => {
    const currentBooking = bookings.find(b => b.id === bookingId);
    const prevStatus = currentBooking?.status || 'pending';

    const displayStatus = newStatus === 'confirmed' ? 'ACCEPTED' : newStatus.toUpperCase();

    Swal.fire({
      title: 'Update Booking Status?',
      text: `Change status to "${displayStatus}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, Update!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (!result.isConfirmed) {
        if (selectEl) selectEl.value = prevStatus;
        return;
      }
      try {
        const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
        if (error) throw error;
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
        
        const displayStatusLower = newStatus === 'confirmed' ? 'accepted' : newStatus;
        Swal.fire({
          title: 'Updated!',
          text: `Booking marked as ${displayStatusLower}.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: '#0f766e'
        });
      } catch (err) {
        console.error('Update Booking Error:', err);
        if (selectEl) selectEl.value = prevStatus;
        Swal.fire('Error', err.message || 'Unable to update booking status.', 'error');
      }
    });
  };

  const assignPartnerToBooking = async (booking, partnerAppId, selectEl) => {
    if (booking.status !== 'confirmed') {
      Swal.fire({
        title: 'Action Not Allowed',
        text: 'Please accept the booking first before assigning a partner!',
        icon: 'warning',
        confirmButtonColor: '#0f766e'
      });
      if (selectEl) selectEl.value = "";
      return;
    }

    const partner = partnersProfileList.find(p => p.id === partnerAppId);
    if (!partner) return;

    const result = await Swal.fire({
      title: 'Assign Partner?',
      text: `Assign ${partner.full_name} to this booking?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Assign',
      confirmButtonColor: '#0f766e'
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase.from('bookings').update({
        assigned_partner_id: partner.partner_id,
        assigned_partner_uuid: partner.user_id,
        assigned_partner_name: partner.full_name,
        assigned_partner_phone: partner.mobile_number
      }).eq('id', booking.id);

      if (error) throw error;
      
      setBookings(prev => prev.map(b => b.id === booking.id ? {
        ...b,
        assigned_partner_id: partner.partner_id,
        assigned_partner_uuid: partner.user_id,
        assigned_partner_name: partner.full_name,
        assigned_partner_phone: partner.mobile_number
      } : b));

      Swal.fire('Assigned!', 'Partner has been assigned.', 'success');

      // WhatsApp alert
      if (partner.mobile_number) {
        const waText = `Hello ${partner.full_name}, you have a new assignment for ${booking.customer_name}. Service: ${booking.services?.title || 'Healthcare'}. Please check your Partner Portal.`;
        const waUrl = `https://wa.me/${partner.mobile_number.replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
      }
      
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not assign partner.', 'error');
    }
  };

  /* ─── CSV EXPORT & IMPORT ─── */
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      addToast('Error', 'No data to export', 'error');
      return;
    }
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const triggerImport = (tableName) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const rows = text.split('\n').filter(r => r.trim() !== '');
      if (rows.length < 2) {
        Swal.fire('Error', 'Empty or invalid CSV', 'error');
        return;
      }
      const headers = rows[0].split(',').map(h => h.trim());
      const data = [];
      for (let i = 1; i < rows.length; i++) {
        // basic regex to split by comma outside quotes
        const rowData = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const obj = {};
        headers.forEach((h, index) => {
          let val = rowData[index] || '';
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"');
          }
          if (val === 'null') val = null;
          else if (val === 'true') val = true;
          else if (val === 'false') val = false;
          obj[h] = val;
        });
        data.push(obj);
      }

      const result = await Swal.fire({
        title: 'Restore Data?',
        text: `You are about to restore ${data.length} records to ${tableName}. Existing records with the same ID will be updated.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0f766e',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Restore'
      });

      if (result.isConfirmed) {
        try {
          const { error } = await supabase.from(tableName).upsert(data);
          if (error) throw error;
          Swal.fire('Success', 'Data restored successfully!', 'success');
          fetchData(); // Refresh the grid
        } catch (err) {
          console.error(err);
          Swal.fire('Error', err.message || 'Failed to restore data', 'error');
        }
      }
    };
    input.click();
  };

  const saveServicePrice = async (serviceId) => {
    const price = parseFloat(editPriceValue);
    if (isNaN(price) || price < 0) { 
      Swal.fire('Invalid Price', 'Enter a valid number.', 'error'); 
      return; 
    }

    const result = await Swal.fire({
      title: 'Update Service Price?',
      text: 'Are you sure you want to change the price for this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Yes, Update',
      backdrop: true
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase.from('services').update({ price }).eq('id', serviceId);
      if (error) throw error;
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, price } : s));
      setEditingServiceId(null);
      Swal.fire({
        title: 'Updated!',
        text: 'Service price has been saved.',
        icon: 'success',
        confirmButtonColor: '#0f766e',
        backdrop: true
      });
    } catch {
      Swal.fire('Error', 'Unable to update price.', 'error');
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    const price = parseFloat(newServiceForm.price);
    if (!newServiceForm.title.trim() || isNaN(price) || price < 0) {
      Swal.fire('Validation Error', 'Title and valid price are required.', 'error');
      return;
    }

    const result = await Swal.fire({
      title: 'Add New Service',
      text: 'You are about to add a new service to the live catalog. Please ensure all details are correct.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Understood, Proceed',
      backdrop: true
    });

    if (!result.isConfirmed) return;

    try {
      const { data, error } = await supabase.from('services').insert([
        { title: newServiceForm.title, category: newServiceForm.category, price: price }
      ]).select();
      if (error) throw error;
      if (data && data.length > 0) {
        setServices(prev => [...prev, data[0]]);
        setAddServiceModalOpen(false);
        setNewServiceForm({ title: '', category: 'HEALTHCARE SERVICES', price: 0 });
        Swal.fire({
          title: 'Success!',
          text: 'New service created successfully.',
          icon: 'success',
          confirmButtonColor: '#0f766e',
          backdrop: true
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Unable to add service.', 'error');
    }
  };

  const openManageSubServices = async (service) => {
    setManageSubServiceData(service);
    setManageSubServiceModalOpen(true);
    setSubServiceLoading(true);
    setSubServicesList([]);
    try {
      const { data, error } = await supabase.from('sub_services').select('*').eq('service_id', service.id).order('title', { ascending: true });
      if (error) throw error;
      if (data) setSubServicesList(data);
    } catch (err) {
      addToast('Error', 'Unable to fetch sub-services.', 'error');
    } finally {
      setSubServiceLoading(false);
    }
  };

  const handleAddSubService = async (e) => {
    e.preventDefault();
    const price = parseFloat(newSubServiceForm.price);
    if (!newSubServiceForm.title.trim() || isNaN(price) || price < 0) {
      Swal.fire('Validation Error', 'Title and valid price are required.', 'error');
      return;
    }

    const result = await Swal.fire({
      title: 'Add New Sub-Service',
      text: 'You are about to add a new sub-service. Please ensure all details are correct.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Understood, Proceed',
      backdrop: true
    });

    if (!result.isConfirmed) return;

    try {
      const { data, error } = await supabase.from('sub_services').insert([
        { service_id: manageSubServiceData.id, title: newSubServiceForm.title, price: price, is_active: true }
      ]).select();
      if (error) throw error;
      if (data && data.length > 0) {
        setSubServicesList(prev => [...prev, data[0]]);
        setNewSubServiceForm({ title: '', price: 0 });
        Swal.fire({
          title: 'Success!',
          text: 'Sub-service added successfully.',
          icon: 'success',
          confirmButtonColor: '#0f766e',
          backdrop: true
        });
      }
    } catch (err) {
      Swal.fire('Error', 'Unable to add sub-service.', 'error');
    }
  };

  const handleDeleteSubService = async (id) => {
    const result = await Swal.fire({
      title: 'Remove Sub-Service?',
      text: 'Are you sure you want to remove this from the live inventory?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Yes, Remove',
      backdrop: true
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase.from('sub_services').delete().eq('id', id);
      if (error) throw error;
      setSubServicesList(prev => prev.filter(s => s.id !== id));
      Swal.fire({
        title: 'Removed!',
        text: 'Sub-service has been deleted.',
        icon: 'success',
        confirmButtonColor: '#0f766e',
        backdrop: true
      });
    } catch (err) {
      Swal.fire('Error', 'Unable to delete sub-service.', 'error');
    }
  };

  const openCustomerDetail = async (customer) => {
    setSelectedCustomer(customer);
    setCustomerTab('overview');
    setCustomerLoading(true);
    setCustomerData({ family: [], bookings: [] });
    try {
      const [fRes, bRes] = await Promise.all([
        supabase.from('family_members').select('*').eq('user_id', customer.id).order('created_at', { ascending: true }),
        supabase.from('bookings')
          .select('*, services(title, price), family_members(name, relationship)')
          .eq('user_id', customer.id).order('created_at', { ascending: false }),
      ]);
      setCustomerData({ family: fRes.data || [], bookings: bRes.data || [] });
    } catch (err) {
      console.error('Customer detail error:', err);
    } finally {
      setCustomerLoading(false);
    }
  };

  const openPartnerDetail = (partner) => {
    setSelectedPartner(partner);
    setPartnerTab('overview');
  };

  const handleSavePromo = async (e) => {
    e.preventDefault();
    if (!promoForm.code.trim() || !promoForm.discount_amount) {
      addToast('Validation Error', 'Code and discount amount are required.', 'error');
      return;
    }

    const result = await Swal.fire({
      title: editingPromoId ? 'Update Promo Code?' : 'Create Promo Code?',
      text: editingPromoId ? 'Are you sure you want to update this promo code?' : 'Are you sure you want to create this new promo code?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: editingPromoId ? 'Yes, Update' : 'Yes, Create',
      backdrop: true
    });

    if (!result.isConfirmed) return;

    setPromoSaving(true);
    try {
      const payload = {
        code: promoForm.code.trim().toUpperCase(),
        discount_amount: parseFloat(promoForm.discount_amount),
        discount_type: promoForm.discount_type,
        is_active: promoForm.is_active,
        is_auto_apply: promoForm.is_auto_apply
      };

      if (editingPromoId) {
        const { error } = await supabase.from('promo_codes').update(payload).eq('id', editingPromoId);
        if (error) throw error;
        setPromoCodes(prev => prev.map(p => p.id === editingPromoId ? { ...p, ...payload } : p));
        Swal.fire({
          title: 'Promo Updated!',
          text: 'Promo code updated successfully.',
          icon: 'success',
          confirmButtonColor: '#0f766e',
          backdrop: true
        });
      } else {
        const { data, error } = await supabase.from('promo_codes').insert(payload).select().single();
        if (error) throw error;
        setPromoCodes(prev => [data, ...prev]);
        Swal.fire({
          title: 'Promo Created!',
          text: 'New promo code added.',
          icon: 'success',
          confirmButtonColor: '#0f766e',
          backdrop: true
        });
      }
      setShowPromoModal(false);
    } catch (err) {
      console.error('Save Promo Error:', err);
      Swal.fire('Error', 'Unable to save promo code. It might already exist.', 'error');
    } finally {
      setPromoSaving(false);
    }
  };

  const openPromoModal = (promo = null) => {
    if (promo) {
      setEditingPromoId(promo.id);
      setPromoForm({ code: promo.code, discount_amount: promo.discount_amount, discount_type: promo.discount_type, is_active: promo.is_active, is_auto_apply: promo.is_auto_apply || false });
    } else {
      setEditingPromoId(null);
      setPromoForm({ code: '', discount_amount: '', discount_type: 'percentage', is_active: true, is_auto_apply: false });
    }
    setShowPromoModal(true);
  };

  /* ─── Derived ─── */
  const stats = useMemo(() => ({
    customers: customers.length,
    bookings: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    services: services.length,
    family: familyMembersCount,
  }), [bookings, customers, services, familyMembersCount]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(c =>
      (c.full_name || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.phone || '').toLowerCase().includes(q)
    );
  }, [customers, searchQuery]);

  const filteredPartners = useMemo(() => {
    if (!searchQuery) return partnersProfileList;
    const q = searchQuery.toLowerCase();
    return partnersProfileList.filter(p =>
      (p.full_name || '').toLowerCase().includes(q) ||
      (p.email_address || '').toLowerCase().includes(q) ||
      (p.mobile_number || '').toLowerCase().includes(q)
    );
  }, [partnersProfileList, searchQuery]);

  const advancedFilteredBookings = useMemo(() => {
    let result = bookings;
    if (globalFilter.fromDate) {
      const from = new Date(globalFilter.fromDate);
      from.setHours(0, 0, 0, 0);
      result = result.filter(b => new Date(b.created_at) >= from);
    }
    if (globalFilter.toDate) {
      const to = new Date(globalFilter.toDate);
      to.setHours(23, 59, 59, 999);
      result = result.filter(b => new Date(b.created_at) <= to);
    }
    if (globalFilter.serviceId) {
      result = result.filter(b => b.service_id === globalFilter.serviceId);
    }
    if (globalFilter.status) {
      result = result.filter(b => b.status === globalFilter.status);
    }
    return result;
  }, [bookings, globalFilter]);

  const filterStats = useMemo(() => {
    const totalBookings = advancedFilteredBookings.length;
    const totalCollection = advancedFilteredBookings.reduce((sum, b) => {
      const amt = parseFloat(b.amount) || 0;
      return sum + amt;
    }, 0);
    return { totalBookings, totalCollection };
  }, [advancedFilteredBookings]);

  const filteredBookings = useMemo(() => {
    if (!searchQuery) return advancedFilteredBookings;
    const q = searchQuery.toLowerCase();
    return advancedFilteredBookings.filter(b =>
      (b.customer_name || '').toLowerCase().includes(q) ||
      (b.services?.title || '').toLowerCase().includes(q)
    );
  }, [advancedFilteredBookings, searchQuery]);

  const tabTitle = { dashboard: 'Dashboard', bookings: 'Bookings', customers: 'Customers Profile', partnersProfile: 'Partners Profile', services: 'Services', promocodes: 'Promo Codes', partners: 'Partner Applications' }[activeTab] || 'Dashboard';

  /* ─── Nav items ─── */
  const navItems = [
    { section: 'MAIN' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'MANAGEMENT' },
    { id: 'bookings', icon: CalendarCheck, label: 'Bookings', badge: stats.pending || null },
    { id: 'customers', icon: Users, label: 'Customers Profile' },
    { id: 'partnersProfile', icon: Briefcase, label: 'Partners Profile' },
    { id: 'services', icon: Activity, label: 'Services' },
    { id: 'promocodes', icon: Tag, label: 'Promo Codes' },
    { id: 'partners', icon: Handshake, label: 'Partners', badge: pendingPartnersCount || null },
  ];

  /* ═══ RENDER ═══ */
  return (
    <div className="adm-shell">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Mobile overlay */}
      {sidebarOpen && <div className="adm-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ═══ SIDEBAR ═══ */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar--open' : ''}`} onClick={e => e.stopPropagation()}>
        {/* Brand */}
        <div className="adm-sidebar-brand">
          <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="adm-brand-logo" />
          <div className="adm-brand-text">
            <span className="adm-brand-name">AMPLR Health</span>
            <span className="adm-brand-sub">Admin Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="adm-sidebar-nav">
          {navItems.map((item, i) =>
            item.section ? (
              <div key={`s-${i}`} className="adm-nav-section">{item.section}</div>
            ) : (
              <button
                key={item.id}
                className={`adm-nav-item ${activeTab === item.id ? 'adm-nav-item--active' : ''}`}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              >
                <item.icon size={18} className="adm-nav-icon" />
                <span className="adm-nav-label">{item.label}</span>
                {item.badge ? <span className="adm-nav-badge">{item.badge}</span> : null}
              </button>
            )
          )}
        </nav>

        {/* Bottom */}
        <div className="adm-sidebar-bottom">
          <div className="adm-sidebar-user">
            <div className="adm-sidebar-user-avatar">
              {adminUser?.full_name ? adminUser.full_name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="adm-sidebar-user-info">
              <span className="adm-sidebar-user-name">{adminUser?.full_name || 'Admin'}</span>
              <span className="adm-sidebar-user-role">Administrator</span>
            </div>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ═══ MAIN ═══ */}
      <main className="adm-main">
        {/* TOPBAR */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div className="adm-topbar-title-area">
              <h2 className="adm-topbar-title">{tabTitle}</h2>
            </div>
          </div>

          <div className="adm-topbar-right">
            <div className="adm-search-box">
              <Search size={15} className="adm-search-icon" />
              <input
                className="adm-search-input"
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="adm-icon-btn" onClick={fetchData} title="Refresh data">
              <RefreshCw size={16} />
            </button>

            {/* Notification bell */}
            <div className="adm-notif-wrap" ref={notifRef}>
              <button
                className={`adm-icon-btn ${unreadCount > 0 ? 'adm-icon-btn--alert' : ''}`}
                onClick={() => { setShowNotifPanel(p => !p); if (!showNotifPanel) { setUnreadCount(0); setNotifications(prev => prev.map(n => ({ ...n, read: true }))); } }}
                aria-label="Notifications"
              >
                <Bell size={16} />
                {unreadCount > 0 && <span className="adm-notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
              </button>

              {showNotifPanel && (
                <div className="adm-notif-panel">
                  <div className="adm-notif-header">
                    <span className="adm-notif-header-title">Notifications</span>
                    {notifications.length > 0 && (
                      <button className="adm-notif-clear" onClick={() => setNotifications([])}>Clear all</button>
                    )}
                  </div>
                  <div className="adm-notif-list">
                    {notifications.length === 0 ? (
                      <div className="adm-notif-empty">
                        <Bell size={20} />
                        <span>No notifications yet</span>
                      </div>
                    ) : notifications.map(n => (
                      <div key={n.id} className={`adm-notif-item ${n.read ? '' : 'adm-notif-item--unread'}`}>
                        <div className={`adm-notif-dot adm-notif-dot--${n.type}`} />
                        <div className="adm-notif-body">
                          <span className="adm-notif-title">{n.title}</span>
                          <span className="adm-notif-msg">{n.message}</span>
                          <span className="adm-notif-time">{n.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="adm-topbar-divider" />

            <div className="adm-topbar-profile">
              <div className="adm-topbar-avatar">
                {adminUser?.full_name ? adminUser.full_name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="adm-topbar-profile-text">
                <span className="adm-topbar-name">{adminUser?.full_name || 'Admin'}</span>
                <span className="adm-topbar-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* ═══ CONTENT ═══ */}
        <div className="adm-content">

          {/* ══ ERROR FALLBACK ══ */}
          {fetchError && !loading && (
            <ErrorState message={fetchError} onRetry={fetchData} />
          )}

          {/* ══ DASHBOARD ══ */}
          {activeTab === 'dashboard' && !fetchError && (
            <div className="adm-page">
              {/* Welcome */}
              <div className="adm-welcome">
                <div>
                  <h1 className="adm-welcome-title">
                    {getGreeting()}, {adminUser?.full_name?.split(' ')[0] || 'Admin'} 👋
                  </h1>
                  <p className="adm-welcome-sub">Here's what's happening across AMPLR Health today.</p>
                </div>
                <div className="adm-welcome-actions">
                  <span className="adm-live-tag"><span className="adm-live-dot" /> Live</span>
                </div>
              </div>

              <AdvancedFilters filters={globalFilter} setFilters={setGlobalFilter} services={services} filterStats={filterStats} />

              {/* Stats */}
              {loading ? <CardSkeleton count={6} /> : (
                <div className="adm-stats-grid">
                  {[
                    { icon: Users,         val: stats.customers, label: 'Total Customers',  color: 'blue' },
                    { icon: CalendarCheck,  val: stats.bookings,  label: 'Total Bookings',   color: 'indigo' },
                    { icon: Clock,          val: stats.pending,   label: 'Pending Bookings', color: 'amber' },
                    { icon: CheckCircle,    val: stats.completed, label: 'Completed',        color: 'green' },
                    { icon: Activity,       val: stats.services,  label: 'Active Services',  color: 'purple' },
                    { icon: Heart,          val: stats.family,    label: 'Family Members',   color: 'rose' },
                  ].map(({ icon: Icon, val, label, color }) => (
                    <div className={`adm-stat-card adm-stat-card--${color}`} key={label}>
                      <div className="adm-stat-icon"><Icon size={20} /></div>
                      <div className="adm-stat-info">
                        <span className="adm-stat-value">{val}</span>
                        <span className="adm-stat-label">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              <div className="adm-quick-actions">
                <button className="adm-qa-btn" onClick={() => setActiveTab('bookings')}>
                  <CalendarCheck size={16} /> View Bookings
                </button>
                <button className="adm-qa-btn" onClick={() => setActiveTab('customers')}>
                  <Users size={16} /> View Customers
                </button>
                <button className="adm-qa-btn" onClick={() => setActiveTab('services')}>
                  <Activity size={16} /> Manage Services
                </button>
                <button className="adm-qa-btn" onClick={fetchData}>
                  <RefreshCw size={16} /> Refresh Data
                </button>
              </div>

              {/* Two-column: Recent Bookings + Activity */}
              <div className="adm-dash-grid">
                {/* Recent Bookings */}
                <div className="adm-card adm-card--bookings">
                  <div className="adm-card-header">
                    <div>
                      <h3 className="adm-card-title">Recent Bookings</h3>
                      <p className="adm-card-sub">Updates in real time</p>
                    </div>
                    <button className="adm-btn adm-btn--ghost" onClick={() => setActiveTab('bookings')}>
                      View All <ArrowRight size={13} />
                    </button>
                  </div>
                  {loading ? <TableSkeleton rows={4} cols={4} /> : bookings.length === 0 ? (
                    <EmptyState icon={CalendarCheck} title="No bookings yet" sub="New bookings will appear here automatically." />
                  ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Assigned Partner</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {advancedFilteredBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').slice(0, 5).map(b => (
                            <tr key={b.id}>
                              <td>
                                <div className="adm-cell-main">{b.customer_name || '—'}</div>
                                <div className="adm-cell-sub">{new Date(b.created_at).toLocaleDateString('en-IN')}</div>
                              </td>
                              <td><div className="adm-cell-main">{b.services?.title || 'Unknown'}</div></td>
                              <td><div className="adm-cell-amount">₹{b.amount}</div></td>
                              <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                  <StatusBadge status={b.status} />
                                  {b.service_lifecycle_status && b.service_lifecycle_status !== 'pending' && (
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569', whiteSpace: 'nowrap' }}>
                                      {b.service_lifecycle_status === 'travel_started' && '🚗 On the Way'}
                                      {b.service_lifecycle_status === 'reached' && '📍 Reached'}
                                      {b.service_lifecycle_status === 'otp_verified' && '⚙️ In Progress'}
                                      {b.service_lifecycle_status === 'completed' && '✅ Done'}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  {b.assigned_partner_name ? (
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f766e' }}>
                                      {b.assigned_partner_name}
                                    </div>
                                  ) : (
                                    (() => {
                                      const eligible = getEligiblePartners(b, partnersProfileList);
                                      if (eligible.length === 0) {
                                        return (
                                          <div 
                                            className="adm-select" 
                                            style={{ width: '120px', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
                                            onClick={() => Swal.fire({
                                              title: 'No Provider Available!',
                                              text: 'There are no approved partners for this service category. You have to arrange a provider yourself.',
                                              icon: 'warning',
                                              confirmButtonColor: '#0f766e'
                                            })}
                                          >
                                            Assign...
                                          </div>
                                        );
                                      }
                                      return (
                                        <select 
                                          className="adm-select" 
                                          style={{ width: '120px', padding: '4px' }}
                                          onChange={(e) => assignPartnerToBooking(b, e.target.value, e.target)}
                                          defaultValue=""
                                        >
                                          <option value="" disabled>Assign...</option>
                                          {eligible.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name}</option>
                                          ))}
                                        </select>
                                      );
                                    })()
                                  )}
                                </div>
                              </td>
                              <td>
                                <select className="adm-select" value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value, e.target)}>
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Accepted</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Activity Feed */}
                <div className="adm-card adm-card--activity">
                  <div className="adm-card-header">
                    <div>
                      <h3 className="adm-card-title">Live Activity</h3>
                      <p className="adm-card-sub">Real-time events</p>
                    </div>
                    <span className="adm-live-tag adm-live-tag--sm"><span className="adm-live-dot" /> Live</span>
                  </div>
                  <div className="adm-activity-list">
                    {activityFeed.length === 0 ? (
                      <div className="adm-activity-empty">
                        <Zap size={18} />
                        <span>Listening for real-time events…</span>
                        <span className="adm-activity-hint">Activity from customers will appear here automatically.</span>
                      </div>
                    ) : activityFeed.map(a => (
                      <div key={a.id} className={`adm-activity-item adm-activity-item--${a.type}`}>
                        <div className="adm-activity-dot" />
                        <div className="adm-activity-body">
                          <span className="adm-activity-text">{a.text}</span>
                          <span className="adm-activity-time">
                            {a.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Status Overview */}
              {!loading && bookings.length > 0 && (
                <div className="adm-card adm-card--status-overview">
                  <div className="adm-card-header">
                    <h3 className="adm-card-title">Booking Status Overview</h3>
                  </div>
                  <div className="adm-status-bars">
                    {[
                      { label: 'Accepted', count: stats.accepted, color: 'var(--adm-blue)', total: stats.bookings },
                      { label: 'Pending',   count: stats.pending,   color: 'var(--adm-amber)', total: stats.bookings },
                      { label: 'Completed', count: stats.completed, color: 'var(--adm-green)', total: stats.bookings },
                      { label: 'Cancelled', count: stats.cancelled, color: 'var(--adm-red)', total: stats.bookings },
                    ].map(s => (
                      <div className="adm-status-bar-row" key={s.label}>
                        <div className="adm-status-bar-label">
                          <span className="adm-status-bar-dot" style={{ background: s.color }} />
                          <span>{s.label}</span>
                        </div>
                        <div className="adm-status-bar-track">
                          <div
                            className="adm-status-bar-fill"
                            style={{ width: `${s.total > 0 ? (s.count / s.total * 100) : 0}%`, background: s.color }}
                          />
                        </div>
                        <span className="adm-status-bar-count">{s.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ BOOKINGS ══ */}
          {activeTab === 'bookings' && !fetchError && (
            <div className="adm-page">
              <div className="adm-page-header">
                <div>
                  <h1 className="adm-page-title">Bookings</h1>
                  <p className="adm-page-sub">Manage all customer service requests.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="adm-btn adm-btn--outline" onClick={() => exportToCSV(bookings, 'bookings_backup.csv')} title="Export backup"><Download size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={() => triggerImport('bookings')} title="Restore backup"><Upload size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={fetchData}><RefreshCw size={14} /> Refresh</button>
                </div>
              </div>

              <AdvancedFilters filters={globalFilter} setFilters={setGlobalFilter} services={services} filterStats={filterStats} />

              {/* Booking Filters */}
              <div className="adm-tabs" style={{ marginBottom: '1.5rem' }}>
                <button 
                  className={`adm-tab ${bookingFilter === 'active' ? 'active' : ''}`}
                  onClick={() => setBookingFilter('active')}
                >
                  Active Bookings (Pending/Accepted)
                </button>
                <button 
                  className={`adm-tab ${bookingFilter === 'past' ? 'active' : ''}`}
                  onClick={() => setBookingFilter('past')}
                >
                  Past Bookings (Completed/Cancelled)
                </button>
                <button 
                  className={`adm-tab ${bookingFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setBookingFilter('all')}
                >
                  All Bookings
                </button>
              </div>

              <div className="adm-card">
                {loading ? <TableSkeleton rows={8} cols={5} /> : bookings.length === 0 ? (
                  <EmptyState icon={CalendarCheck} title="No bookings found" sub="Bookings will appear here when customers make service requests." />
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Booking</th>
                          <th>Customer</th>
                          <th>Service</th>
                          <th>Patient</th>
                          <th>Amount</th>
                          <th>Assigned Partner</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchQuery ? filteredBookings : advancedFilteredBookings)
                          .filter(b => {
                            if (bookingFilter === 'all') return true;
                            if (bookingFilter === 'active') return b.status === 'pending' || b.status === 'confirmed';
                            if (bookingFilter === 'past') return b.status === 'completed' || b.status === 'cancelled';
                            return true;
                          })
                          .map(b => (
                          <tr key={b.id}>
                            <td>
                              <div className="adm-cell-id">#{b.id.substring(0, 8)}</div>
                              <div className="adm-cell-sub">{new Date(b.created_at).toLocaleDateString('en-IN')}</div>
                            </td>
                            <td>
                              <div className="adm-cell-main">{b.customer_name || '—'}</div>
                              <div className="adm-cell-sub">{b.customer_phone || ''}</div>
                            </td>
                            <td><div className="adm-cell-main">{b.services?.title || 'Unknown'}</div></td>
                            <td>
                              {b.family_members ? (
                                <>
                                  <div className="adm-cell-main">{b.family_members.name}</div>
                                  <div className="adm-cell-sub">{b.family_members.relationship}</div>
                                </>
                              ) : <span className="adm-badge adm-badge--neutral">Self</span>}
                            </td>
                            <td>
                              <div className="adm-cell-amount">₹{b.amount}</div>
                              {b.payment_status && (
                                <div className={`adm-cell-pay adm-cell-pay--${b.payment_status}`}>{b.payment_status}</div>
                              )}
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {b.assigned_partner_name ? (
                                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f766e' }}>
                                    {b.assigned_partner_name}
                                    <br/>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.assigned_partner_phone}</span>
                                  </div>
                                ) : (
                                  <div style={{ display: 'flex', gap: '4px' }}>
                                    {(() => {
                                      const eligible = getEligiblePartners(b, partnersProfileList);
                                      if (eligible.length === 0) {
                                        return (
                                          <select className="adm-select" style={{ width: '140px', padding: '4px', color: '#dc2626', fontSize: '11px' }} disabled>
                                            <option>No provider available, arrange yourself</option>
                                          </select>
                                        );
                                      }
                                      return (
                                        <select 
                                          className="adm-select" 
                                          style={{ width: '120px', padding: '4px' }}
                                          onChange={(e) => assignPartnerToBooking(b, e.target.value, e.target)}
                                          defaultValue=""
                                        >
                                          <option value="" disabled>Assign...</option>
                                          {eligible.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name} ({p.partner_id})</option>
                                          ))}
                                        </select>
                                      );
                                    })()}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                <StatusBadge status={b.status} />
                                {b.service_lifecycle_status && b.service_lifecycle_status !== 'pending' && (
                                  <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569', whiteSpace: 'nowrap' }}>
                                    {b.service_lifecycle_status === 'travel_started' && '🚗 On the Way'}
                                    {b.service_lifecycle_status === 'reached' && '📍 Reached'}
                                    {b.service_lifecycle_status === 'otp_verified' && '⚙️ In Progress'}
                                    {b.service_lifecycle_status === 'completed' && '✅ Done'}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <select
                                className="adm-select"
                                value={b.status}
                                onChange={e => updateBookingStatus(b.id, e.target.value, e.target)}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Accepted</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ SERVICES ══ */}
          {activeTab === 'services' && !fetchError && (
            <div className="adm-page">
              <div className="adm-page-header">
                <div>
                  <h1 className="adm-page-title">Services Catalog</h1>
                  <p className="adm-page-sub">Manage available services and pricing.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="adm-btn adm-btn--outline" onClick={() => exportToCSV(services, 'services_backup.csv')} title="Export backup"><Download size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={() => triggerImport('services')} title="Restore backup"><Upload size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={fetchData}><RefreshCw size={14} /> Refresh</button>
                  <button className="adm-btn adm-btn--primary" onClick={() => setAddServiceModalOpen(true)}><Plus size={14} /> Add Service</button>
                </div>
              </div>

              {/* Service cards */}
              {loading ? <CardSkeleton count={4} /> : services.length === 0 ? (
                <EmptyState icon={Activity} title="No services" sub="Services will appear here once added." />
              ) : (
                <>
                  <div className="adm-services-grid">
                    {services.map(sv => (
                      <div className="adm-service-card" key={sv.id}>
                        <div className="adm-service-card-top">
                          <span className="adm-service-category">{sv.category}</span>
                          <span className="adm-badge adm-badge--confirmed">Active</span>
                        </div>
                        <h4 className="adm-service-name">{sv.title}</h4>
                        <div className="adm-service-price">
                          {editingServiceId === sv.id ? (
                            <div className="adm-service-edit-row">
                              <input
                                type="number"
                                className="adm-input adm-input--sm"
                                value={editPriceValue}
                                onChange={e => setEditPriceValue(e.target.value)}
                                autoFocus
                              />
                              <button className="adm-btn-icon adm-btn-icon--primary" onClick={() => saveServicePrice(sv.id)} title="Save">
                                <Save size={14} />
                              </button>
                              <button className="adm-btn-icon" onClick={() => setEditingServiceId(null)} title="Cancel">
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="adm-service-price-row">
                              <span className="adm-service-amount">₹{sv.price}</span>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  className="adm-btn adm-btn--ghost adm-btn--sm"
                                  onClick={() => openManageSubServices(sv)}
                                >
                                  Sub-Services
                                </button>
                                <button
                                  className="adm-btn adm-btn--ghost adm-btn--sm"
                                  onClick={() => { setEditingServiceId(sv.id); setEditPriceValue(sv.price); }}
                                >
                                  <Edit2 size={13} /> Edit
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ CUSTOMERS ══ */}
          {activeTab === 'customers' && !fetchError && (
            <div className="adm-page">
              <div className="adm-page-header">
                <div>
                  <h1 className="adm-page-title">Customers</h1>
                  <p className="adm-page-sub">Click any customer to view their full profile.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="adm-btn adm-btn--outline" onClick={() => exportToCSV(customers, 'customers_backup.csv')} title="Export backup"><Download size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={() => triggerImport('users')} title="Restore backup"><Upload size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={fetchData}><RefreshCw size={14} /> Refresh</button>
                </div>
              </div>

              <div className="adm-card">
                {loading ? <TableSkeleton rows={6} cols={4} /> : customers.length === 0 ? (
                  <EmptyState icon={Users} title="No customers yet" sub="Registered customers will appear here." />
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Joined</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map(c => (
                          <tr key={c.id} className="adm-row-click" onClick={() => openCustomerDetail(c)}>
                            <td>
                              <div className="adm-customer-cell">
                                <div 
                                  className="adm-customer-avatar"
                                  style={{ backgroundImage: c.avatar_url ? `url(${c.avatar_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                >
                                  {!c.avatar_url && (c.full_name ? c.full_name.charAt(0).toUpperCase() : 'A')}
                                </div>
                                <div>
                                  <div className="adm-cell-main">{c.full_name || 'Anonymous'}</div>
                                  <div className="adm-cell-sub">#{c.id.substring(0, 8)}</div>
                                </div>
                              </div>
                            </td>
                            <td><span className="adm-cell-sub">{c.phone || '—'}</span></td>
                            <td><span className="adm-cell-sub">{c.email || '—'}</span></td>
                            <td><span className="adm-cell-sub">{new Date(c.created_at).toLocaleDateString('en-IN')}</span></td>
                            <td><Eye size={15} className="adm-row-eye" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ PARTNERS PROFILE ══ */}
          {activeTab === 'partnersProfile' && !fetchError && (
            <div className="adm-page">
              <div className="adm-page-header">
                <div>
                  <h1 className="adm-page-title">Partners Profile</h1>
                  <p className="adm-page-sub">Click any partner to view their full profile.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="adm-btn adm-btn--outline" onClick={() => exportToCSV(partnersProfileList, 'partners_backup.csv')} title="Export backup"><Download size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={fetchData}><RefreshCw size={14} /> Refresh</button>
                </div>
              </div>

              <div className="adm-card">
                {loading ? <TableSkeleton rows={6} cols={4} /> : partnersProfileList.length === 0 ? (
                  <EmptyState icon={Briefcase} title="No partners yet" sub="Approved partners will appear here." />
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Partner</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Partner ID</th>
                          <th>Joined</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPartners.map(p => (
                          <tr key={p.id} className="adm-row-click" onClick={() => openPartnerDetail(p)}>
                            <td>
                              <div className="adm-customer-cell">
                                <div 
                                  className="adm-customer-avatar"
                                  style={{ background: 'var(--adm-blue)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                >
                                  {p.full_name ? p.full_name.charAt(0).toUpperCase() : 'P'}
                                </div>
                                <div>
                                  <div className="adm-cell-main">{p.full_name || 'Anonymous'}</div>
                                  <div className="adm-cell-sub" style={{textTransform: 'capitalize'}}>{p.form_type?.replace('_', ' ') || 'Service Partner'}</div>
                                </div>
                              </div>
                            </td>
                            <td><span className="adm-cell-sub">{p.mobile_number || '—'}</span></td>
                            <td><span className="adm-cell-sub">{p.email_address || '—'}</span></td>
                            <td>
                              {p.partner_id ? (
                                <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.5px' }}>
                                  {p.partner_id}
                                </span>
                              ) : (
                                <span className="adm-cell-sub" style={{ color: '#94a3b8' }}>—</span>
                              )}
                            </td>
                            <td><span className="adm-cell-sub">{new Date(p.created_at).toLocaleDateString('en-IN')}</span></td>
                            <td><Eye size={15} className="adm-row-eye" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ PROMO CODES ══ */}
          {activeTab === 'promocodes' && !fetchError && (
            <div className="adm-page">
              <div className="adm-page-header">
                <div>
                  <h1 className="adm-page-title">Promo Codes</h1>
                  <p className="adm-page-sub">Manage discounts and offers for customers.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="adm-btn adm-btn--outline" onClick={() => exportToCSV(promoCodes, 'promocodes_backup.csv')} title="Export backup"><Download size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={() => triggerImport('promo_codes')} title="Restore backup"><Upload size={14} /></button>
                  <button className="adm-btn adm-btn--outline" onClick={fetchData}><RefreshCw size={14} /> Refresh</button>
                  <button className="adm-btn adm-btn--primary" onClick={() => openPromoModal()}><Edit2 size={14} /> Add Promo</button>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={16} color="var(--brand-primary)" /> Promo Code Guidelines
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li><strong>Standard Coupons:</strong> Users must manually enter these codes at checkout. Create memorable codes (e.g., <code style={{background: '#e2e8f0', padding: '2px 4px', borderRadius: '4px'}}>FESTIVAL50</code>).</li>
                  <li><strong>Auto Apply (Global Discount):</strong> These are applied automatically to everyone's cart without them needing to enter a code.</li>
                  <li><strong>Multiple Auto-Apply Coupons:</strong> If you have multiple "Auto Apply" coupons active at the same time, the system will automatically evaluate the cart and <strong>apply the one that gives the highest discount</strong> to the user.</li>
                </ul>
              </div>

              <div className="adm-card">
                {loading ? <TableSkeleton rows={4} cols={4} /> : promoCodes.length === 0 ? (
                  <EmptyState icon={Tag} title="No promo codes yet" sub="Create your first discount code to offer savings to your customers." />
                ) : (
                  <div className="adm-table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Discount</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promoCodes.map(p => (
                          <tr key={p.id}>
                            <td><div className="adm-cell-main" style={{ letterSpacing: '1px', fontWeight: 'bold' }}>{p.code}</div></td>
                            <td>
                              <div className="adm-cell-main">
                                {p.discount_type === 'percentage' ? `${p.discount_amount}%` : `₹${p.discount_amount}`}
                              </div>
                            </td>
                            <td>
                              {p.is_active ? <span className="adm-badge adm-badge--confirmed">Active</span> : <span className="adm-badge adm-badge--cancelled">Inactive</span>}
                              {p.is_auto_apply && <span className="adm-badge adm-badge--pending" style={{ marginLeft: '8px' }}>Auto Apply</span>}
                            </td>
                            <td><span className="adm-cell-sub">{new Date(p.created_at).toLocaleDateString('en-IN')}</span></td>
                            <td>
                              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => openPromoModal(p)}>
                                <Edit2 size={13} /> Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PARTNERS */}
          {activeTab === 'partners' && !fetchError && (
            <AdminPartners />
          )}

        </div>
      </main>

      {/* ═══ CUSTOMER DETAIL DRAWER ═══ */}
      {selectedCustomer && (
        <div className="adm-drawer-backdrop" onClick={() => setSelectedCustomer(null)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="adm-drawer-header">
              <h3>Customer Profile</h3>
              <button className="adm-drawer-close" onClick={() => setSelectedCustomer(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Profile card */}
            <div className="adm-drawer-profile">
              <div 
                className="adm-drawer-avatar"
                style={{ backgroundImage: selectedCustomer.avatar_url ? `url(${selectedCustomer.avatar_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {!selectedCustomer.avatar_url && (selectedCustomer.full_name ? selectedCustomer.full_name.charAt(0).toUpperCase() : 'A')}
              </div>
              <div className="adm-drawer-profile-info">
                <h4 className="adm-drawer-name">{selectedCustomer.full_name || 'Anonymous User'}</h4>
                <div className="adm-drawer-meta-chips">
                  {selectedCustomer.phone && (
                    <span className="adm-meta-chip"><Phone size={12} />{selectedCustomer.phone}</span>
                  )}
                  {selectedCustomer.email && (
                    <span className="adm-meta-chip"><Mail size={12} />{selectedCustomer.email}</span>
                  )}
                  <span className="adm-meta-chip">
                    <Calendar size={12} />
                    Joined {new Date(selectedCustomer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="adm-drawer-tabs">
              {['overview', 'family', 'bookings'].map(t => (
                <button
                  key={t}
                  className={`adm-drawer-tab ${customerTab === t ? 'adm-drawer-tab--active' : ''}`}
                  onClick={() => setCustomerTab(t)}
                >
                  {t === 'overview' && <User size={14} />}
                  {t === 'family' && <Heart size={14} />}
                  {t === 'bookings' && <CalendarCheck size={14} />}
                  <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                  {t === 'family' && !customerLoading && <span className="adm-tab-count">{customerData.family.length}</span>}
                  {t === 'bookings' && !customerLoading && <span className="adm-tab-count">{customerData.bookings.length}</span>}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="adm-drawer-content">
              {customerLoading ? (
                <div className="adm-drawer-loading">
                  <Loader2 size={22} className="adm-spin" />
                  <span>Loading customer data…</span>
                </div>
              ) : (
                <>
                  {/* Overview */}
                  {customerTab === 'overview' && (
                    <div className="adm-drawer-section">
                      <div className="adm-detail-grid">
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Full Name</span>
                          <span className="adm-detail-value">{selectedCustomer.full_name || '—'}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Email</span>
                          <span className="adm-detail-value">{selectedCustomer.email || '—'}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Phone</span>
                          <span className="adm-detail-value">{selectedCustomer.phone || '—'}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Customer ID</span>
                          <span className="adm-detail-value adm-detail-mono">{selectedCustomer.id.substring(0, 12)}…</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Location</span>
                          <span className="adm-detail-value">{selectedCustomer.location || <span style={{color:'#94a3b8',fontStyle:'italic'}}>Not set</span>}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Landmark</span>
                          <span className="adm-detail-value">{selectedCustomer.landmark || <span style={{color:'#94a3b8',fontStyle:'italic'}}>Not set</span>}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Pincode</span>
                          <span className="adm-detail-value">{selectedCustomer.pincode || <span style={{color:'#94a3b8',fontStyle:'italic'}}>Not set</span>}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Member Since</span>
                          <span className="adm-detail-value">{new Date(selectedCustomer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Family Members</span>
                          <span className="adm-detail-value">{customerData.family.length}</span>
                        </div>
                        <div className="adm-detail-item">
                          <span className="adm-detail-label">Total Bookings</span>
                          <span className="adm-detail-value">{customerData.bookings.length}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Family */}
                  {customerTab === 'family' && (
                    <div className="adm-drawer-section">
                      {customerData.family.length === 0 ? (
                        <div className="adm-drawer-empty">No family members added.</div>
                      ) : (
                        <div className="adm-family-cards">
                          {customerData.family.map(m => (
                            <div key={m.id} className="adm-family-card">
                              <div className="adm-family-avatar">{m.name.charAt(0).toUpperCase()}</div>
                              <div className="adm-family-info">
                                <span className="adm-family-name">{m.name}</span>
                                <span className="adm-family-rel">{m.relationship}</span>
                                <div className="adm-family-meta">
                                  {m.age != null && <span>Age {m.age}</span>}
                                  {m.gender && <span>{m.gender}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bookings */}
                  {customerTab === 'bookings' && (
                    <div className="adm-drawer-section">
                      {customerData.bookings.length === 0 ? (
                        <div className="adm-drawer-empty">No services booked yet.</div>
                      ) : (
                        <div className="adm-booking-cards">
                          {customerData.bookings.map(b => (
                            <div key={b.id} className="adm-booking-card">
                              <div className="adm-booking-card-top">
                                <span className="adm-booking-service">{b.services?.title || 'Unknown'}</span>
                                <StatusBadge status={b.status} />
                              </div>
                              <div className="adm-booking-card-meta">
                                <span><Calendar size={11} /> {new Date(b.created_at).toLocaleDateString('en-IN')}</span>
                                <span className="adm-booking-card-amount">₹{b.amount}</span>
                              </div>
                              <div className="adm-booking-card-patient">
                                <User size={11} />
                                {b.family_members ? `${b.family_members.name} (${b.family_members.relationship})` : 'Self'}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PARTNER DETAIL DRAWER ═══ */}
      {selectedPartner && (
        <div className="adm-drawer-backdrop" onClick={() => setSelectedPartner(null)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="adm-drawer-header">
              <h3>Partner Profile</h3>
              <button className="adm-drawer-close" onClick={() => setSelectedPartner(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Profile card */}
            <div className="adm-drawer-profile">
              <div 
                className="adm-drawer-avatar"
                style={{ background: 'var(--adm-blue)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {selectedPartner.full_name ? selectedPartner.full_name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div className="adm-drawer-profile-info">
                <h4 className="adm-drawer-name">{selectedPartner.full_name || 'Anonymous Partner'}</h4>
                {selectedPartner.partner_id && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ecfdf5', color: '#059669', borderRadius: '20px', padding: '2px 10px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    <ShieldCheck size={11} /> {selectedPartner.partner_id}
                  </div>
                )}
                <div className="adm-drawer-meta-chips">
                  {selectedPartner.mobile_number && (
                    <span className="adm-meta-chip"><Phone size={12} />{selectedPartner.mobile_number}</span>
                  )}
                  {selectedPartner.email_address && (
                    <span className="adm-meta-chip"><Mail size={12} />{selectedPartner.email_address}</span>
                  )}
                  <span className="adm-meta-chip">
                    <Calendar size={12} />
                    Joined {new Date(selectedPartner.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="adm-drawer-tabs">
              {['overview', 'services'].map(t => (
                <button
                  key={t}
                  className={`adm-drawer-tab ${partnerTab === t ? 'adm-drawer-tab--active' : ''}`}
                  onClick={() => setPartnerTab(t)}
                >
                  {t === 'overview' && <User size={14} />}
                  {t === 'services' && <Activity size={14} />}
                  <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="adm-drawer-content">
              {/* Overview */}
              {partnerTab === 'overview' && (
                <div className="adm-drawer-section">
                  {selectedPartner.partner_id && (
                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck size={18} color="#059669" />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Partner ID</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', letterSpacing: '1px' }}>{selectedPartner.partner_id}</div>
                      </div>
                    </div>
                  )}
                  <div className="adm-detail-grid">
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Full Name</span>
                      <span className="adm-detail-value">{selectedPartner.full_name || '—'}</span>
                    </div>
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Email</span>
                      <span className="adm-detail-value">{selectedPartner.email_address || '—'}</span>
                    </div>
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Phone</span>
                      <span className="adm-detail-value">{selectedPartner.mobile_number || '—'}</span>
                    </div>
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Status</span>
                      <span className="adm-detail-value" style={{ textTransform: 'capitalize' }}>{selectedPartner.status || 'Pending'}</span>
                    </div>
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Location</span>
                      <span className="adm-detail-value">{selectedPartner.form_data?.location || selectedPartner.form_data?.city || selectedPartner.form_data?.address || <span style={{color:'#94a3b8',fontStyle:'italic'}}>Not provided</span>}</span>
                    </div>
                    <div className="adm-detail-item">
                      <span className="adm-detail-label">Member Since</span>
                      <span className="adm-detail-value">{new Date(selectedPartner.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Services */}
              {partnerTab === 'services' && (
                <div className="adm-drawer-section">
                  <div className="adm-detail-list">
                    <div className="adm-detail-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>Services Provided</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'capitalize' }}>
                          Category: {selectedPartner.form_type?.replace('_', ' ')}
                        </div>
                      </div>
                      <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
                        Total: 0
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b', fontSize: '0.85rem' }}>
                    * Integration with booking fulfillment is coming soon.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PROMO CODE MODAL ═══ */}
      {showPromoModal && (
        <div className="adm-drawer-backdrop" onClick={() => setShowPromoModal(false)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()} style={{ width: '400px', maxWidth: '100%' }}>
            <div className="adm-drawer-header">
              <h3>{editingPromoId ? 'Edit Promo Code' : 'New Promo Code'}</h3>
              <button className="adm-drawer-close" onClick={() => setShowPromoModal(false)}><X size={18} /></button>
            </div>
            <div className="adm-drawer-content" style={{ padding: '20px' }}>
              <form onSubmit={handleSavePromo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Promo Code</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%', border: '1px solid var(--adm-border)' }}
                    value={promoForm.code}
                    onChange={e => setPromoForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="e.g. WELCOME50"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Amount</label>
                    <input
                      type="number"
                      className="adm-search-input"
                      style={{ width: '100%', border: '1px solid var(--adm-border)' }}
                      value={promoForm.discount_amount}
                      onChange={e => setPromoForm(prev => ({ ...prev, discount_amount: e.target.value }))}
                      placeholder="e.g. 50"
                      min="0"
                      step="any"
                      required
                    />
                  </div>
                  <div>
                    <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Type</label>
                    <select
                      className="adm-select"
                      style={{ width: '100%' }}
                      value={promoForm.discount_type}
                      onChange={e => setPromoForm(prev => ({ ...prev, discount_type: e.target.value }))}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat Amount (₹)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="adm-detail-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={promoForm.is_active}
                      onChange={e => setPromoForm(prev => ({ ...prev, is_active: e.target.checked }))}
                    />
                    Active (can be used by customers)
                  </label>
                </div>
                <div>
                  <label className="adm-detail-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={promoForm.is_auto_apply}
                      onChange={e => setPromoForm(prev => ({ ...prev, is_auto_apply: e.target.checked }))}
                    />
                    Apply automatically to all users (Global Discount)
                  </label>
                </div>
                <button type="submit" className="adm-btn adm-btn--primary" style={{ marginTop: '10px', justifyContent: 'center' }} disabled={promoSaving}>
                  {promoSaving ? <Loader2 size={16} className="adm-spin" /> : 'Save Promo Code'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ═══ ADD SERVICE MODAL ═══ */}
      {addServiceModalOpen && (
        <div className="adm-drawer-backdrop" onClick={() => setAddServiceModalOpen(false)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()}>
            <div className="adm-drawer-header">
              <h3>Add New Service</h3>
              <button className="adm-drawer-close" onClick={() => setAddServiceModalOpen(false)}><X size={18} /></button>
            </div>
            <div className="adm-drawer-content" style={{ padding: '20px' }}>
              <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Service Title</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%', border: '1px solid var(--adm-border)' }}
                    value={newServiceForm.title}
                    onChange={e => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Daily Checkups"
                    required
                  />
                </div>
                <div>
                  <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Category</label>
                  <select
                    className="adm-select"
                    style={{ width: '100%' }}
                    value={newServiceForm.category}
                    onChange={e => setNewServiceForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="HEALTHCARE SERVICES">Healthcare Services</option>
                    <option value="SPECIALISED CARE">Specialised Care</option>
                    <option value="THERAPY">Therapy</option>
                    <option value="WELLNESS">Wellness</option>
                    <option value="AYUSH">Ayush</option>
                    <option value="CORPORATE">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="adm-detail-label" style={{ display: 'block', marginBottom: '5px' }}>Price (₹)</label>
                  <input
                    type="number"
                    className="adm-search-input"
                    style={{ width: '100%', border: '1px solid var(--adm-border)' }}
                    value={newServiceForm.price}
                    onChange={e => setNewServiceForm(prev => ({ ...prev, price: e.target.value }))}
                    min="0"
                    step="any"
                    required
                  />
                </div>
                <button type="submit" className="adm-btn adm-btn--primary" style={{ marginTop: '10px', justifyContent: 'center' }}>
                  <Plus size={16} /> Create Service
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MANAGE SUB-SERVICES MODAL ═══ */}
      {manageSubServiceModalOpen && (
        <div className="adm-drawer-backdrop" onClick={() => setManageSubServiceModalOpen(false)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()} style={{ width: '500px', maxWidth: '100vw' }}>
            <div className="adm-drawer-header">
              <h3>Sub-Services for {manageSubServiceData?.title}</h3>
              <button className="adm-drawer-close" onClick={() => setManageSubServiceModalOpen(false)}><X size={18} /></button>
            </div>
            <div className="adm-drawer-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'var(--adm-surface)', padding: '15px', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--adm-text-main)' }}>Add Sub-Service</h4>
                <form onSubmit={handleAddSubService} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ flex: 2, border: '1px solid var(--adm-border)' }}
                    value={newSubServiceForm.title}
                    onChange={e => setNewSubServiceForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Sub-service title"
                    required
                  />
                  <input
                    type="number"
                    className="adm-search-input"
                    style={{ flex: 1, border: '1px solid var(--adm-border)' }}
                    value={newSubServiceForm.price}
                    onChange={e => setNewSubServiceForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Price"
                    min="0"
                    step="any"
                    required
                  />
                  <button type="submit" className="adm-btn adm-btn--primary" style={{ padding: '0 15px' }} title="Add">
                    <Plus size={16} />
                  </button>
                </form>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--adm-text-main)' }}>Existing Sub-Services</h4>
                {subServiceLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><Loader2 className="adm-spin" size={24} /></div>
                ) : subServicesList.length === 0 ? (
                  <div className="adm-empty" style={{ padding: '20px' }}>
                    <p className="adm-empty-sub">No sub-services found.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {subServicesList.map(sub => (
                      <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '10px 15px', borderRadius: '6px', border: '1px solid var(--adm-border)' }}>
                        <span style={{ fontWeight: 500, color: 'var(--adm-text-main)' }}>{sub.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{ fontWeight: 600, color: 'var(--adm-primary)' }}>₹{sub.price}</span>
                          <button className="adm-btn-icon" style={{ color: '#dc2626' }} onClick={() => handleDeleteSubService(sub.id)} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
