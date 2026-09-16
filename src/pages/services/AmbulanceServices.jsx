import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, Ambulance, CheckCircle2, Phone, ShieldAlert } from 'lucide-react';
import '../../service-pages.css';

const AmbulanceServices = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I need an Ambulance immediately.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>24/7 Ambulance Services | AMPLR Health</title>
        <meta name="description" content="Fast and reliable 24/7 ambulance services in Vijayawada. BLS, ALS, and Patient Transport Vehicles available for emergencies." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <ShieldAlert size={16} color="#e11d48" />
                <span style={{ color: '#e11d48' }}>Emergency Medical Transport</span>
              </div>
              <h1 className="service-hero-title">24/7 Ambulance Services</h1>
              <p className="service-hero-desc">
                In a medical emergency, every second counts. We provide swift, fully-equipped ambulance services with trained paramedics to ensure safe transportation to the nearest medical facility.
              </p>
              
              <div className="service-hero-actions">
                <a href={`tel:${CALL_NUMBER}`} className="btn-primary" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}>
                  <PhoneCall size={20} /> Emergency Call: {CALL_NUMBER}
                </a>
                <a href="#" onClick={openBookingModal} className="btn-secondary">
                  <Ambulance size={20} /> Pre-book Transport
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/ambulance.jpg" alt="Ambulance Services" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Types of Ambulances Available</h2>
              <p>
                We coordinate a fleet of well-maintained ambulances to cater to different medical requirements, ensuring patient safety and comfort during transit.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span><strong>Basic Life Support (BLS):</strong> For stable patients needing basic monitoring.</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span><strong>Advanced Life Support (ALS / ICU):</strong> Equipped with ventilators and defibrillators.</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span><strong>Patient Transport Vehicle (PTV):</strong> For non-emergency hospital visits/discharges.</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span><strong>Inter-City Transfer:</strong> Safe out-station transport for long distances.</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for transport</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Ambulance Type</th>
                    <th style={{ textAlign: 'right' }}>Starting Price (Local)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">Patient Transport (Non-Emergency)</td>
                    <td className="service-price">₹1,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">BLS Ambulance (with Oxygen)</td>
                    <td className="service-price">₹1,999</td>
                  </tr>
                  <tr>
                    <td className="service-name">ALS / ICU Ambulance (with Paramedic)</td>
                    <td className="service-price">₹3,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Inter-City Transport</td>
                    <td className="service-price" style={{ color: '#64748b', fontSize: '0.9rem' }}>₹25 - ₹40 per km</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices vary based on exact distance, traffic conditions, and required medical equipment.
                </p>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '12px' }}>
                  <p style={{ color: '#b91c1c', fontWeight: '700', fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Phone size={20} /> Call {CALL_NUMBER} for immediate dispatch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmbulanceServices;
