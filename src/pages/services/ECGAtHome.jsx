import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, HeartPulse, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const ECGAtHome = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to book an ECG at Home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>ECG at Home | AMPLR Health</title>
        <meta name="description" content="Quick and accurate ECG tests at home in Vijayawada. Avoid the hassle of traveling with our portable ECG services." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <HeartPulse size={16} />
                <span>Cardiac Care Diagnostics</span>
              </div>
              <h1 className="service-hero-title">ECG at Home</h1>
              <p className="service-hero-desc">
                Experiencing chest pain or irregular heartbeats? Need a routine check-up? Get a clinical-grade ECG done quickly and safely in the comfort of your home by our trained technicians.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book ECG
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/ecg_at_home.jpg" alt="ECG at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Fast & Reliable Cardiac Testing</h2>
              <p>
                Cardiac conditions require immediate attention. Travelling to a clinic can cause unnecessary stress. Our portable 12-channel ECG machines ensure accurate results instantly without the wait.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Clinical-grade 12-lead ECG machines</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Trained technicians for accurate placement</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Instant digital and physical reports</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Ideal for bedridden and elderly patients</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for ECG</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Service Type</th>
                    <th style={{ textAlign: 'right' }}>Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">Standard 12-Lead ECG</td>
                    <td className="service-price">₹499</td>
                  </tr>
                  <tr>
                    <td className="service-name">ECG with Cardiologist Review</td>
                    <td className="service-price">₹799</td>
                  </tr>
                  <tr>
                    <td className="service-name">Emergency ECG (Within 2 hrs)</td>
                    <td className="service-price">₹999</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices may vary slightly based on distance and emergency requirements.
                </p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%' }}>
                  <MessageCircle size={18} /> Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ECGAtHome;
