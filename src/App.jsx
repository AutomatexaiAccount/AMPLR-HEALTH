import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, Menu, X, PhoneCall, MessageCircle, Phone, Mail, MapPin, ShieldCheck, ChevronRight, Clock, Calendar, Ambulance, Stethoscope, Activity, Search, User, LogOut
} from 'lucide-react';
import { supabase } from './lib/supabase';
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationRefund from './pages/CancellationRefund';
import HealthcareDisclaimer from './pages/HealthcareDisclaimer';
import LabBloodCollection from './pages/services/LabBloodCollection';
import NursingServices from './pages/services/NursingServices';
import CaregiverCaretaker from './pages/services/CaregiverCaretaker';
import Physiotherapy from './pages/services/Physiotherapy';
import ECGAtHome from './pages/services/ECGAtHome';
import DoctorConsultation from './pages/services/DoctorConsultation';
import AmbulanceServices from './pages/services/AmbulanceServices';
import HospitalAssistance from './pages/services/HospitalAssistance';
import BecomePartner from './pages/BecomePartner';
import ContactUs from './pages/ContactUs';
import WhyAmplr from './pages/WhyAmplr';
import Offers from './pages/Offers';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CustomerLogin from './pages/CustomerLogin';
import CustomerProfile from './pages/CustomerProfile';
import Verified from './pages/Verified';
import ResetPassword from './pages/ResetPassword';
import { CartProvider, useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './index.css';
import './service-pages.css';

// Specialised Care
import ElderCare from './pages/services/specialised-care/ElderCare';
import PregnancyMaternityCare from './pages/services/specialised-care/PregnancyMaternityCare';
import MotherChildCare from './pages/services/specialised-care/MotherChildCare';
import PostSurgeryCare from './pages/services/specialised-care/PostSurgeryCare';
import PostHospitalisationCare from './pages/services/specialised-care/PostHospitalisationCare';
import BedriddenCare from './pages/services/specialised-care/BedriddenCare';

// Therapy & Rehabilitation
import SpeechTherapy from './pages/services/therapy-rehabilitation/SpeechTherapy';
import Audiology from './pages/services/therapy-rehabilitation/Audiology';
import OccupationalTherapy from './pages/services/therapy-rehabilitation/OccupationalTherapy';
import RehabilitationSupport from './pages/services/therapy-rehabilitation/RehabilitationSupport';

// Wellness & Lifestyle
import DieticianNutrition from './pages/services/wellness-lifestyle/DieticianNutrition';
import LifestyleManagement from './pages/services/wellness-lifestyle/LifestyleManagement';
import YogaWellness from './pages/services/wellness-lifestyle/YogaWellness';
import PreventiveHealth from './pages/services/wellness-lifestyle/PreventiveHealth';

// AYUSH
import AyurvedaUnaniHomeopathy from './pages/services/ayush-traditional/AyurvedaUnaniHomeopathy';

// Corporate
import HealthCamps from './pages/services/corporate-industrial/HealthCamps';
import EmployeeCheckups from './pages/services/corporate-industrial/EmployeeCheckups';
import WorkplaceWellness from './pages/services/corporate-industrial/WorkplaceWellness';

const searchData = [
  { name: 'Home', path: '/', keywords: ['home', 'amplr', 'health'] },
  { name: 'About Us', path: '/#about', keywords: ['about', 'company', 'who we are', 'vision', 'mission'] },
  { name: 'Contact Us / Helpdesk', path: '/#contact', keywords: ['contact', 'help', 'support', 'phone', 'email', 'whatsapp'] },
  { name: 'Lab Sample Collection', path: '/services/lab-blood-collection', keywords: ['lab', 'blood', 'sample', 'test', 'diagnostics'] },
  { name: 'Nursing Services', path: '/services/nursing-services', keywords: ['nurse', 'nursing', 'care', 'medical'] },
  { name: 'Caregiver Services', path: '/services/caregiver-caretaker', keywords: ['caregiver', 'caretaker', 'attendant', 'help'] },
  { name: 'Physiotherapy Services', path: '/services/physiotherapy', keywords: ['physio', 'physical therapy', 'rehab', 'exercise'] },
  { name: 'ECG at Home Services', path: '/services/ecg-at-home', keywords: ['ecg', 'heart', 'cardiac', 'test'] },
  { name: 'Doctor Consultation', path: '/services/doctor-consultation', keywords: ['doctor', 'consult', 'physician', 'appointment'] },
  { name: 'Ambulance Services', path: '/services/ambulance-services', keywords: ['ambulance', 'transport', 'emergency'] },
  { name: 'Hospital Assistance', path: '/services/hospital-assistance', keywords: ['hospital', 'booking', 'admission', 'assistance', 'help'] },
  { name: 'Elder Care', path: '/services/specialised-care/elder-care', keywords: ['elder', 'senior', 'old age', 'geriatric'] },
  { name: 'Pregnancy & Maternity', path: '/services/specialised-care/pregnancy-maternity-care', keywords: ['pregnancy', 'maternity', 'pregnant', 'baby', 'antenatal', 'prenatal'] },
  { name: 'Mother & Child Care', path: '/services/specialised-care/mother-child-care', keywords: ['mother', 'child', 'baby', 'pediatric', 'neonatal'] },
  { name: 'Post-Surgery Care', path: '/services/specialised-care/post-surgery-care', keywords: ['surgery', 'operation', 'post-op', 'recovery'] },
  { name: 'Post-Hospitalisation', path: '/services/specialised-care/post-hospitalisation-care', keywords: ['hospital', 'discharge', 'recovery'] },
  { name: 'Bedridden Care', path: '/services/specialised-care/bedridden-care', keywords: ['bedridden', 'paralysis', 'immobile', 'chronic'] },
  { name: 'Speech Therapy', path: '/services/therapy-rehabilitation/speech-therapy', keywords: ['speech', 'language', 'swallowing', 'communication'] },
  { name: 'Audiology', path: '/services/therapy-rehabilitation/audiology', keywords: ['audio', 'hearing', 'ear', 'deafness'] },
  { name: 'Occupational Therapy', path: '/services/therapy-rehabilitation/occupational-therapy', keywords: ['occupational', 'motor skills', 'daily living', 'ot'] },
  { name: 'Rehabilitation Support', path: '/services/therapy-rehabilitation/rehabilitation-support', keywords: ['rehab', 'recovery', 'addiction', 'physical'] },
  { name: 'Dietician & Nutrition', path: '/services/wellness-lifestyle/dietician-nutrition', keywords: ['diet', 'nutrition', 'food', 'weight', 'meal'] },
  { name: 'Lifestyle Management', path: '/services/wellness-lifestyle/lifestyle-management', keywords: ['lifestyle', 'stress', 'sleep', 'habit'] },
  { name: 'Yoga & Wellness', path: '/services/wellness-lifestyle/yoga-wellness', keywords: ['yoga', 'wellness', 'meditation', 'mindfulness', 'fitness'] },
  { name: 'Preventive Health', path: '/services/wellness-lifestyle/preventive-health', keywords: ['preventive', 'checkup', 'screening', 'health check'] },
  { name: 'AYUSH Consultation', path: '/services/ayush-traditional/ayurveda-unani-homeopathy', keywords: ['ayush', 'ayurveda', 'unani', 'homeopathy', 'traditional'] },
  { name: 'Health Camps', path: '/services/corporate-industrial/health-camps', keywords: ['camp', 'corporate', 'group', 'community'] },
  { name: 'Employee Checkups', path: '/services/corporate-industrial/employee-checkups', keywords: ['employee', 'checkup', 'corporate', 'staff'] },
  { name: 'Workplace Wellness', path: '/services/corporate-industrial/workplace-wellness', keywords: ['workplace', 'wellness', 'office', 'ergonomics'] }
];

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

/* ── BOOKING MODAL COMPONENT ── */
const BookingModal = ({ isOpen, onClose, redirectUrl }) => {
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', city: '', date: ''
  });

  const serviceOptions = [
    'Lab Sample Collection', 'Nursing Services', 'Caregiver / Caretaker',
    'ECG at Home', 'Doctor Consultation', 'Ambulance Services', 'Hospital Assistance', 'Physiotherapy',
    'Elder Care', 'Pregnancy & Maternity Care', 'Mother & Child Care',
    'Post-Surgery Care', 'Post-Hospitalisation Care', 'Bedridden Care',
    'Speech Therapy', 'Audiology', 'Occupational Therapy', 'Rehabilitation Support',
    'Dietician & Nutrition', 'Lifestyle Management', 'Yoga & Wellness',
    'Preventive Health', 'AYUSH Consultation', 'Health Camps',
    'Employee Checkups', 'Workplace Wellness', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "917997888448";
    const msg = `Hi! I want to book a service with AMPLR Health.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${formData.service}\n*City:* ${formData.city}\n*Preferred Date:* ${formData.date || 'Flexible'}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    onClose();
    setFormData({ name: '', phone: '', service: '', city: '', date: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="booking-modal-header">
          <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="booking-modal-logo" />
          <h2>Book a Service</h2>
          <p>Fill in your details and we'll connect with you on WhatsApp</p>
        </div>
        <form className="booking-modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="booking-name">Full Name *</label>
            <input type="text" id="booking-name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="booking-phone">Phone Number *</label>
            <input type="tel" id="booking-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
          </div>
          <div className="form-group">
            <label htmlFor="booking-service">Service Required *</label>
            <select id="booking-service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select a service</option>
              {serviceOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="booking-city">City *</label>
              <input type="text" id="booking-city" name="city" value={formData.city} onChange={handleChange} placeholder="Your city" required />
            </div>
            <div className="form-group">
              <label htmlFor="booking-date">Preferred Date</label>
              <input type="date" id="booking-date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="booking-modal-submit">
            <MessageCircle size={18} />
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isCustomerLoginRoute = location.pathname === '/login';
  const isVerifiedRoute = location.pathname === '/verified';
  const isProfileRoute = location.pathname === '/profile';
  const isResetPasswordRoute = location.pathname === '/reset-password';
  
  const hideHeaderFooter = isAdminRoute || isCustomerLoginRoute || isVerifiedRoute || isProfileRoute || isResetPasswordRoute;
  const hideFooter = hideHeaderFooter;

  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { setIsCartOpen, globalDiscount } = useCart();

  // Synchronous check before Supabase clears the URL hash
  if (typeof window !== 'undefined' && window.location.hash.includes('type=signup')) {
    if (!sessionStorage.getItem('signup_redirect_pending')) {
      sessionStorage.setItem('signup_redirect_pending', 'true');
    }
  }

  // Listen for Auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      
      // If we flagged a signup redirect, execute it now (Supabase has processed the token)
      if (sessionStorage.getItem('signup_redirect_pending')) {
        sessionStorage.removeItem('signup_redirect_pending');
        setTimeout(() => {
          navigate('/verified');
        }, 100); // Small delay ensures Supabase finishes its internal state updates
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      // Fallback check
      if (event === 'SIGNED_IN' && sessionStorage.getItem('signup_redirect_pending')) {
        sessionStorage.removeItem('signup_redirect_pending');
        navigate('/verified');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Listen for booking modal events from other components
  useEffect(() => {
    const handler = (e) => {
      openBookingModal();
    };
    window.addEventListener('open-booking-modal', handler);
    return () => window.removeEventListener('open-booking-modal', handler);
  }, [user]);

  const openBookingModal = (e) => {
    if (e) e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setIsCartOpen(true);
    }
  };

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    await supabase.auth.signOut();
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      const lowerQ = q.trim().toLowerCase();
      setSearchResults(
        searchData.filter(s => {
          const matchName = s.name.toLowerCase().includes(lowerQ);
          const matchKeywords = s.keywords && s.keywords.some(k => k.toLowerCase().includes(lowerQ));
          return matchName || matchKeywords;
        })
      );
    } else {
      setSearchResults([]);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [specialisedExpanded, setSpecialisedExpanded] = useState(false);
  const [therapyExpanded, setTherapyExpanded] = useState(false);
  const [wellnessExpanded, setWellnessExpanded] = useState(false);
  const [ayushExpanded, setAyushExpanded] = useState(false);
  const [corporateExpanded, setCorporateExpanded] = useState(false);
  const [quickLinksExpanded, setQuickLinksExpanded] = useState(false);
  const [legalExpanded, setLegalExpanded] = useState(false);
  const whatsappNumber = "917997888448";
  const phoneCallNumber = "+917997888448";
  const whatsappMsg = "Hi! I want to book a healthcare service with AMPLR Health.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setServicesExpanded(false);
    setSpecialisedExpanded(false);
    setTherapyExpanded(false);
    setWellnessExpanded(false);
    setAyushExpanded(false);
    setCorporateExpanded(false);
    setQuickLinksExpanded(false);
    setLegalExpanded(false);
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    setMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <ScrollToHash />
      <div className="app">

        {/* Cart Drawer */}
        <CartDrawer />

        {/* ── STICKY HEADER WRAPPER ── */}
        {!hideHeaderFooter && (
        <div className="header-sticky-wrapper">
          {globalDiscount && (
            <div style={{ background: '#fef08a', color: '#854d0e', textAlign: 'center', padding: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
              🎉 Special Offer: {globalDiscount.discount_type === 'percentage' ? `${globalDiscount.discount_amount}%` : `₹${globalDiscount.discount_amount}`} Off! Automatically applied at checkout.
            </div>
          )}
          {/* ── TOP BAR ── */}
          <div className="top-bar">
          <div className="container top-bar-inner">
            <div className="top-bar-left">
              <span className="live-pulse" aria-hidden="true"></span>
              <span className="top-bar-text">
                <strong>24/7 Helpline:</strong>{' '}
                <a href={`tel:${phoneCallNumber}`}>+91 7997888448</a>
              </span>
            </div>
            <div className="top-bar-right">
              <div className="nav-search-wrap" style={{ position: 'relative' }}>
                <input
                  type="search"
                  className="nav-search-input"
                  placeholder="Search services…"
                  aria-label="Search services"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchResults.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: '100%', width: '220px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 1000, maxHeight: '350px', overflowY: 'auto' }}>
                    {searchResults.map((result, i) => (
                      <Link 
                        key={i} 
                        to={result.path} 
                        onClick={clearSearch}
                        style={{ display: 'block', padding: '10px 12px', color: '#334155', textDecoration: 'none', borderBottom: i === searchResults.length - 1 ? 'none' : '1px solid #f1f5f9', fontSize: '0.85rem' }}
                      >
                        {result.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ── TOP BAR AUTH LINKS ── */}
              {user ? (
                <>
                  <Link to="/profile" className="top-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <User size={13} /> <span className="top-link-text">My Profile</span>
                  </Link>
                  <a href="#" onClick={handleLogout} className="top-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-red)' }}>
                    <LogOut size={13} /> <span className="top-link-text">Logout</span>
                  </a>
                </>
              ) : (
                <Link to="/login" className="top-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <User size={13} /> <span className="top-link-text">Login</span>
                </Link>
              )}
              <span className="divider" aria-hidden="true" style={{ color: 'var(--border-strong)' }}>|</span>

              <a href="#" onClick={openBookingModal} className="btn-primary-nav" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                <MessageCircle size={14} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <span className="divider" aria-hidden="true" style={{ color: 'var(--border-strong)' }}>|</span>
              <a href="mailto:amplrhealth@gmail.com" className="top-link">
                <Mail size={13} /> <span className="top-link-text">amplrhealth@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN NAVBAR ── */}
        <header className="navbar-wrapper">
          <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="container nav-container">

              {/* Logo — actual image */}
              <Link to="/" className="brand-logo" onClick={closeMenu} aria-label="AMPLR Health – Home">
                <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="brand-logo-img" />
              </Link>

              {/* ── DESKTOP NAV ── */}
              <div className="nav-links" role="menubar">

                <Link to="/" className="nav-item-link">Home</Link>
                <Link to="/offers" className="nav-item-link" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Offers</Link>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Healthcare Services <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/lab-blood-collection" role="menuitem">Lab Sample Collection</Link>
                    <Link to="/services/nursing-services" role="menuitem">Nursing Services</Link>
                    <Link to="/services/caregiver-caretaker" role="menuitem">Caregiver services</Link>
                    <Link to="/services/physiotherapy" role="menuitem">Physiotherapy Services</Link>
                    <Link to="/services/ecg-at-home" role="menuitem">ECG at Home Services</Link>
                    <Link to="/services/doctor-consultation" role="menuitem">Doctor Consultation</Link>
                    <Link to="/services/ambulance-services" role="menuitem">Ambulance Services</Link>
                    <Link to="/services/hospital-assistance" role="menuitem">Hospital Assistance</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Specialised Care <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/specialised-care/elder-care" role="menuitem">Elder Care</Link>
                    <Link to="/services/specialised-care/pregnancy-maternity-care" role="menuitem">Pregnancy & Maternity</Link>
                    <Link to="/services/specialised-care/mother-child-care" role="menuitem">Mother & Child Care</Link>
                    <Link to="/services/specialised-care/post-surgery-care" role="menuitem">Post-Surgery Care</Link>
                    <Link to="/services/specialised-care/post-hospitalisation-care" role="menuitem">Post-Hospitalisation</Link>
                    <Link to="/services/specialised-care/bedridden-care" role="menuitem">Bedridden Care</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Therapy <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/therapy-rehabilitation/speech-therapy" role="menuitem">Speech Therapy</Link>
                    <Link to="/services/therapy-rehabilitation/audiology" role="menuitem">Audiology</Link>
                    <Link to="/services/therapy-rehabilitation/occupational-therapy" role="menuitem">Occupational Therapy</Link>
                    <Link to="/services/therapy-rehabilitation/rehabilitation-support" role="menuitem">Rehabilitation Support</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Wellness <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/wellness-lifestyle/dietician-nutrition" role="menuitem">Dietician & Nutrition</Link>
                    <Link to="/services/wellness-lifestyle/lifestyle-management" role="menuitem">Lifestyle Management</Link>
                    <Link to="/services/wellness-lifestyle/yoga-wellness" role="menuitem">Yoga & Wellness</Link>
                    <Link to="/services/wellness-lifestyle/preventive-health" role="menuitem">Preventive Health</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Ayush <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/ayush-traditional/ayurveda-unani-homeopathy" role="menuitem">AYUSH Consultation</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Corporate <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/services/corporate-industrial/health-camps" role="menuitem">Health Camps</Link>
                    <Link to="/services/corporate-industrial/employee-checkups" role="menuitem">Employee Checkups</Link>
                    <Link to="/services/corporate-industrial/workplace-wellness" role="menuitem">Workplace Wellness</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Quick Links <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/" role="menuitem">Home</Link>
                    <Link to="/#about" role="menuitem">About us</Link>
                    <Link to="/#services" role="menuitem">Our Services</Link>
                    <Link to="/partner" role="menuitem">Partner with us</Link>
                    <Link to="/contact" role="menuitem">Contact us</Link>
                    <Link to="/privacy" role="menuitem">Privacy policy</Link>
                    <Link to="/terms" role="menuitem">Terms & Conditions</Link>
                  </div>
                </div>

                <div className="nav-dropdown" role="menuitem">
                  <span className="nav-dropdown-trigger">
                    Legal <ChevronRight size={12} className="nav-chevron" aria-hidden="true" />
                  </span>
                  <div className="nav-dropdown-content" role="menu">
                    <Link to="/privacy" role="menuitem">Privacy policy</Link>
                    <Link to="/terms" role="menuitem">Terms & Conditions</Link>
                    <Link to="/cancellation-refund" role="menuitem">Cancellation & Refund Policy</Link>
                    <Link to="/disclaimer" role="menuitem">Healthcare Disclaimer</Link>
                  </div>
                </div>

                <a href="#" onClick={openBookingModal} className="nav-item-link">Book a Service</a>
                <Link to="/partner" className="nav-item-link">Become a Partner</Link>
                
              </div>

              {/* ── DESKTOP ACTION AREA (Moved to Top Bar) ── */}
              <div className="nav-actions" style={{ display: 'none' }}>
              </div>

              {/* ── MOBILE ICON ROW ── */}
              <div className="mobile-header-actions">
                {user ? (
                  <Link
                    to="/profile"
                    className="mobile-icon-btn profile-btn"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--navy-dark)' }}
                    aria-label="My Profile"
                  >
                    <User size={18} />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="mobile-icon-btn profile-btn"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--navy-dark)' }}
                    aria-label="Login"
                  >
                    <User size={18} />
                  </Link>
                )}
                <button
                  className="mobile-icon-btn search-btn"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--navy-dark)' }}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
                <a
                  href="#"
                  onClick={openBookingModal}
                  className="mobile-icon-btn wa-btn"
                  aria-label="Book on WhatsApp"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
                <button
                  className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                  onClick={mobileMenuOpen ? closeMenu : openMenu}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* ── MOBILE SEARCH DROPDOWN ── */}
            {mobileSearchOpen && (
              <div className="mobile-header-search-wrap">
                <div style={{ position: 'relative' }}>
                  <input
                    type="search"
                    className="mobile-header-search-input"
                    placeholder="Search services…"
                    aria-label="Search services"
                    value={searchQuery}
                    onChange={handleSearch}
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: '100%', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}>
                      {searchResults.map((result, i) => (
                        <Link 
                          key={i} 
                          to={result.path} 
                          onClick={() => { clearSearch(); setMobileSearchOpen(false); }}
                          style={{ display: 'block', padding: '10px 12px', color: '#334155', textDecoration: 'none', borderBottom: i === searchResults.length - 1 ? 'none' : '1px solid #f1f5f9', fontSize: '0.85rem' }}
                        >
                          {result.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* ── MOBILE OVERLAY ── */}
          {mobileMenuOpen && (
            <div
              className="mobile-drawer-overlay"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          {/* ── MOBILE DRAWER ── */}
          <div
            className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
            aria-hidden={!mobileMenuOpen}
          >
            {/* Drawer header */}
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-logo" onClick={closeMenu}>
                <img src="/amplr-logo.jpeg" alt="AMPLR Health" className="brand-logo-img" />
              </Link>
              <button className="mobile-menu-toggle active" onClick={closeMenu} aria-label="Close navigation menu">
                <X size={22} />
              </button>
            </div>

            {/* Scrollable drawer body */}
            <div className="mobile-drawer-inner">

              {/* Emergency strip */}
              <div className="mobile-emergency-strip">
                <span className="live-pulse" aria-hidden="true"></span>
                <span>24/7 Helpline:</span>
                <a href={`tel:${phoneCallNumber}`}>+91 7997888448</a>
              </div>

              {/* Mobile search removed from here (moved to header) */}

              {/* Nav links */}
              <nav className="mobile-nav-links">

                <Link to="/" onClick={closeMenu} className="mobile-link">
                  <span>Home</span>
                  <ChevronRight size={16} />
                </Link>
                <Link to="/offers" onClick={closeMenu} className="mobile-link" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                  <span>Offers & Coupons</span>
                  <ChevronRight size={16} />
                </Link>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setServicesExpanded(s => !s)}
                    aria-expanded={servicesExpanded}
                  >
                    <span>Healthcare Services</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${servicesExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {servicesExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/lab-blood-collection" onClick={closeMenu}>Lab Sample Collection</Link>
                      <Link to="/services/nursing-services" onClick={closeMenu}>Nursing Services</Link>
                      <Link to="/services/caregiver-caretaker" onClick={closeMenu}>Caregiver services</Link>
                      <Link to="/services/physiotherapy" onClick={closeMenu}>Physiotherapy Services</Link>
                      <Link to="/services/ecg-at-home" onClick={closeMenu}>ECG at Home Services</Link>
                      <Link to="/services/doctor-consultation" onClick={closeMenu}>Doctor Consultation</Link>
                      <Link to="/services/ambulance-services" onClick={closeMenu}>Ambulance Services</Link>
                      <Link to="/services/hospital-assistance" onClick={closeMenu}>Hospital Assistance</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setSpecialisedExpanded(s => !s)}
                    aria-expanded={specialisedExpanded}
                  >
                    <span>Specialised Care</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${specialisedExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {specialisedExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/specialised-care/elder-care" onClick={closeMenu}>Elder Care</Link>
                      <Link to="/services/specialised-care/pregnancy-maternity-care" onClick={closeMenu}>Pregnancy & Maternity</Link>
                      <Link to="/services/specialised-care/mother-child-care" onClick={closeMenu}>Mother & Child Care</Link>
                      <Link to="/services/specialised-care/post-surgery-care" onClick={closeMenu}>Post-Surgery Care</Link>
                      <Link to="/services/specialised-care/post-hospitalisation-care" onClick={closeMenu}>Post-Hospitalisation</Link>
                      <Link to="/services/specialised-care/bedridden-care" onClick={closeMenu}>Bedridden Care</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setTherapyExpanded(s => !s)}
                    aria-expanded={therapyExpanded}
                  >
                    <span>Therapy</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${therapyExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {therapyExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/therapy-rehabilitation/speech-therapy" onClick={closeMenu}>Speech Therapy</Link>
                      <Link to="/services/therapy-rehabilitation/audiology" onClick={closeMenu}>Audiology</Link>
                      <Link to="/services/therapy-rehabilitation/occupational-therapy" onClick={closeMenu}>Occupational Therapy</Link>
                      <Link to="/services/therapy-rehabilitation/rehabilitation-support" onClick={closeMenu}>Rehabilitation Support</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setWellnessExpanded(s => !s)}
                    aria-expanded={wellnessExpanded}
                  >
                    <span>Wellness</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${wellnessExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {wellnessExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/wellness-lifestyle/dietician-nutrition" onClick={closeMenu}>Dietician & Nutrition</Link>
                      <Link to="/services/wellness-lifestyle/lifestyle-management" onClick={closeMenu}>Lifestyle Management</Link>
                      <Link to="/services/wellness-lifestyle/yoga-wellness" onClick={closeMenu}>Yoga & Wellness</Link>
                      <Link to="/services/wellness-lifestyle/preventive-health" onClick={closeMenu}>Preventive Health</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setAyushExpanded(s => !s)}
                    aria-expanded={ayushExpanded}
                  >
                    <span>Ayush</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${ayushExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {ayushExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/ayush-traditional/ayurveda-unani-homeopathy" onClick={closeMenu}>AYUSH Consultation</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setCorporateExpanded(s => !s)}
                    aria-expanded={corporateExpanded}
                  >
                    <span>Corporate</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${corporateExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {corporateExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/services/corporate-industrial/health-camps" onClick={closeMenu}>Health Camps</Link>
                      <Link to="/services/corporate-industrial/employee-checkups" onClick={closeMenu}>Employee Checkups</Link>
                      <Link to="/services/corporate-industrial/workplace-wellness" onClick={closeMenu}>Workplace Wellness</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setQuickLinksExpanded(s => !s)}
                    aria-expanded={quickLinksExpanded}
                  >
                    <span>Quick Links</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${specialisedExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {specialisedExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/" onClick={closeMenu}>Home</Link>
                      <Link to="/#about" onClick={closeMenu}>About us</Link>
                      <Link to="/#services" onClick={closeMenu}>Our Services</Link>
                      <Link to="/partner" onClick={closeMenu}>Partner with us</Link>
                      <Link to="/contact" onClick={closeMenu}>Contact us</Link>
                      <Link to="/privacy" onClick={closeMenu}>Privacy policy</Link>
                      <Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link>
                    </div>
                  )}
                </div>

                <div className="mobile-nav-group">
                  <button
                    className="mobile-nav-group-header"
                    onClick={() => setLegalExpanded(s => !s)}
                    aria-expanded={legalExpanded}
                  >
                    <span>Legal</span>
                    <ChevronRight
                      size={16}
                      className={`mobile-nav-chevron ${legalExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  {legalExpanded && (
                    <div className="mobile-nav-sub">
                      <Link to="/privacy" onClick={closeMenu}>Privacy policy</Link>
                      <Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link>
                      <Link to="/cancellation-refund" onClick={closeMenu}>Cancellation & Refund Policy</Link>
                      <Link to="/disclaimer" onClick={closeMenu}>Healthcare Disclaimer</Link>
                    </div>
                  )}
                </div>

                <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); openBookingModal(); }} className="mobile-link">
                  <span>Book a Service</span><ChevronRight size={16} />
                </a>
                <Link to="/partner" onClick={closeMenu} className="mobile-link">
                  <span>Become a Partner</span><ChevronRight size={16} />
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" onClick={closeMenu} className="mobile-link" style={{ fontWeight: 600 }}>
                      <span><User size={16} style={{marginRight:'8px', verticalAlign:'middle'}}/> My Profile</span>
                    </Link>
                    <a href="#" onClick={(e) => { closeMenu(); handleLogout(e); }} className="mobile-link" style={{ color: 'var(--accent-red)' }}>
                      <span><LogOut size={16} style={{marginRight:'8px', verticalAlign:'middle'}}/> Logout</span>
                    </a>
                  </>
                ) : (
                  <Link to="/login" onClick={closeMenu} className="mobile-link" style={{ fontWeight: 600 }}>
                    <span><User size={16} style={{marginRight:'8px', verticalAlign:'middle'}}/> Login / Sign Up</span>
                  </Link>
                )}
              </nav>

              {/* CTA buttons */}
              <div className="mobile-drawer-cta">
                <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); openBookingModal(); }} className="btn-primary full-width">
                  <MessageCircle size={18} /> Book Instant on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </header>
        </div>
        )}

            <Routes>
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/disclaimer" element={<HealthcareDisclaimer />} />
          <Route path="/services/lab-blood-collection" element={<LabBloodCollection />} />
          <Route path="/services/nursing-services" element={<NursingServices />} />
          <Route path="/services/caregiver-caretaker" element={<CaregiverCaretaker />} />
          <Route path="/services/physiotherapy" element={<Physiotherapy />} />
          <Route path="/services/ecg-at-home" element={<ECGAtHome />} />
          <Route path="/services/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="/services/ambulance-services" element={<AmbulanceServices />} />
          <Route path="/services/hospital-assistance" element={<HospitalAssistance />} />
          <Route path="/partner" element={<BecomePartner />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/why-amplr" element={<WhyAmplr />} />
          
          <Route path="/services/specialised-care/elder-care" element={<ElderCare />} />
          <Route path="/services/specialised-care/pregnancy-maternity-care" element={<PregnancyMaternityCare />} />
          <Route path="/services/specialised-care/mother-child-care" element={<MotherChildCare />} />
          <Route path="/services/specialised-care/post-surgery-care" element={<PostSurgeryCare />} />
          <Route path="/services/specialised-care/post-hospitalisation-care" element={<PostHospitalisationCare />} />
          <Route path="/services/specialised-care/bedridden-care" element={<BedriddenCare />} />
          
          <Route path="/services/therapy-rehabilitation/speech-therapy" element={<SpeechTherapy />} />
          <Route path="/services/therapy-rehabilitation/audiology" element={<Audiology />} />
          <Route path="/services/therapy-rehabilitation/occupational-therapy" element={<OccupationalTherapy />} />
          <Route path="/services/therapy-rehabilitation/rehabilitation-support" element={<RehabilitationSupport />} />
          
          <Route path="/services/wellness-lifestyle/dietician-nutrition" element={<DieticianNutrition />} />
          <Route path="/services/wellness-lifestyle/lifestyle-management" element={<LifestyleManagement />} />
          <Route path="/services/wellness-lifestyle/yoga-wellness" element={<YogaWellness />} />
          <Route path="/services/wellness-lifestyle/preventive-health" element={<PreventiveHealth />} />
          
          <Route path="/services/ayush-traditional/ayurveda-unani-homeopathy" element={<AyurvedaUnaniHomeopathy />} />
          
          <Route path="/services/corporate-industrial/health-camps" element={<HealthCamps />} />
          <Route path="/services/corporate-industrial/employee-checkups" element={<EmployeeCheckups />} />
          <Route path="/services/corporate-industrial/workplace-wellness" element={<WorkplaceWellness />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>

        {/* Enhanced Modern Footer */}
        {!hideFooter && (
        <>
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-top-grid">
              {/* Brand Col */}
              <div className="footer-col-brand">
                <h3 className="footer-brand-title" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--navy-dark)' }}>AMPLR HEALTH SERVICES</h3>
                <p className="footer-brand-tagline" style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--brand-primary)' }}>
                  Brings Hospital Care to Your Home
                </p>
                <p className="footer-brand-services" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--slate-dark)' }}>
                  Home Healthcare | Lab Sample Collection | Nursing | Caregiver | Physiotherapy | ECG at Home | Doctor Virtual Consultation | Ambulance
                </p>
              </div>

              {/* Quick Links Col */}
              <div className="footer-col">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-link-list">
                  <li><Link to="/"><ChevronRight size={14} /> Home</Link></li>
                  <li><Link to="/#about"><ChevronRight size={14} /> About Us</Link></li>
                  <li><Link to="/why-amplr"><ChevronRight size={14} /> Why AMPLR?</Link></li>
                  <li><Link to="/#services"><ChevronRight size={14} /> Services</Link></li>
                  <li><Link to="/#how-it-works"><ChevronRight size={14} /> How It Works</Link></li>
                  <li><Link to="/partner"><ChevronRight size={14} /> Partner With Us</Link></li>
                  <li><Link to="/contact"><ChevronRight size={14} /> Contact Us</Link></li>
                  <li><Link to="/privacy"><ChevronRight size={14} /> Privacy Policy</Link></li>
                  <li><Link to="/terms"><ChevronRight size={14} /> Terms & Conditions</Link></li>
                </ul>
              </div>

              {/* Support Col */}
              <div className="footer-col">
                <h4 className="footer-heading">Support</h4>
                <ul className="footer-link-list">
                  <li><a href="#" onClick={openBookingModal}><ChevronRight size={14} /> WhatsApp</a></li>
                  <li><Link to="/contact"><ChevronRight size={14} /> Customer Support</Link></li>
                  <li><a href={`tel:${phoneCallNumber}`}><ChevronRight size={14} /> Emergency Assistance</a></li>
                  <li><Link to="/contact"><ChevronRight size={14} /> Service Availability</Link></li>
                </ul>
              </div>

              {/* Legal Col */}
              <div className="footer-col">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-link-list">
                  <li><Link to="/privacy"><ChevronRight size={14} /> Privacy Policy</Link></li>
                  <li><Link to="/terms"><ChevronRight size={14} /> Terms & Conditions</Link></li>
                  <li><Link to="/cancellation-refund"><ChevronRight size={14} /> Cancellation & Refund Policy</Link></li>
                  <li><Link to="/disclaimer"><ChevronRight size={14} /> Healthcare Disclaimer</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-disclaimer-section" style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'justify' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-medium)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--navy-dark)' }}>Important Healthcare Disclaimer</strong> AMPLR HEALTH SERVICES facilitates and coordinates healthcare services through healthcare professionals and service providers. Service availability, clinical suitability, pricing and outcomes may vary depending on the service, patient requirement, location and assigned service provider. AMPLR HEALTH SERVICES does not replace emergency medical care. In an emergency, please contact the appropriate emergency medical services or visit the nearest hospital.
              </p>
            </div>

            <div className="footer-bottom-bar">
              <div className="footer-bottom-inner" style={{ justifyContent: 'center' }}>
                <p>&copy; AMPLR HEALTH SERVICES. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>


        {/* Mobile Sticky Bottom Floating Action Bar */}
        <div className="mobile-bottom-bar">
          <a href={`tel:${phoneCallNumber}`} className="bottom-bar-btn call">
            <PhoneCall size={18} />
            <span>Call: 7997888448</span>
          </a>
          <a href="#" onClick={openBookingModal} className="bottom-bar-btn whatsapp">
            <MessageCircle size={18} />
            <span>WhatsApp Us</span>
          </a>
          <Link to="/services/ambulance-services" className="bottom-bar-btn ambulance">
            <Ambulance size={18} />
            <span>Ambulance</span>
          </Link>
        </div>
        </>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
