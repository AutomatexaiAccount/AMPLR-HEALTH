import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Syringe, MessageCircle, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import '../../service-pages.css';

const LabBloodCollection = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to book a Lab Test / Blood Collection at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Lab Sample Collection at Home | AMPLR Health</title>
        <meta name="description" content="Book lab tests and blood sample collection from home in Vijayawada. Fast, hygienic, and reliable diagnostics by AMPLR Health." />
      </Helmet>

      {/* Hero Section */}
      <section className="service-hero hero-blue">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Syringe size={16} />
                <span>Home Diagnostic Services</span>
              </div>
              <h1 className="service-hero-title">Lab & Blood Sample Collection</h1>
              <p className="service-hero-desc">
                Skip the clinic waiting rooms. Get your blood tests and diagnostic samples collected safely and hygienically from the comfort of your home by our trained phlebotomists.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book Home Collection
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/blood_collection.jpg" alt="Lab Sample Collection at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Why Choose Home Sample Collection?</h2>
              <p>
                Whether it's a routine health checkup, specialized blood tests, or monitoring chronic conditions, visiting a diagnostic lab isn't always convenient. Our home collection service ensures you get accurate results without stepping out.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Trained & Certified Phlebotomists</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Strict Hygiene & Safety Protocols</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Accurate Reports from Partnered NABL Labs</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Digital Reports delivered directly to you</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for common tests</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Test Profile</th>
                    <th style={{ textAlign: 'right' }}>Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">Routine Blood Tests (CBC, Sugar)</td>
                    <td className="service-price">₹199</td>
                  </tr>
                  <tr>
                    <td className="service-name">Thyroid Profile (T3, T4, TSH)</td>
                    <td className="service-price">₹399</td>
                  </tr>
                  <tr>
                    <td className="service-name">Lipid Profile (Cholesterol)</td>
                    <td className="service-price">₹499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Comprehensive Master Health Check</td>
                    <td className="service-price">₹1,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Home Collection Charge</td>
                    <td className="service-price" style={{ color: '#64748b', fontSize: '0.9rem' }}>Varies by distance</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices are indicative. Final pricing depends on the specific tests prescribed by your doctor.
                </p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%' }}>
                  <FileText size={18} /> Upload Prescription on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabBloodCollection;
