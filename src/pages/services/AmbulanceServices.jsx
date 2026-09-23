import React from 'react';
import ServiceCartBlock from '../../components/ServiceCartBlock';

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
                <span style={{ color: '#e11d48' }}>6. AMBULANCE SERVICES</span>
              </div>
              <h1 className="service-hero-title">Emergency & Patient Transport Support</h1>
              
              <p className="service-hero-desc" style={{ marginTop: '1.5rem' }}>
                When every minute matters, dependable patient transportation is important.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps customers arrange <strong>ambulance and patient transport services</strong> according to the patient's condition and transportation requirement.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/ambulance.jpg" alt="Ambulance Services" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Ambulance Options</h2>
              
              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Basic Ambulance</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                Suitable for patients requiring basic medical transportation and assistance.
              </p>

              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>ICU Ambulance</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                For patients who require higher-level medical support during transportation, subject to vehicle and medical team availability.
              </p>

              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Advanced Ambulance</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                For transportation requirements involving additional medical equipment and professional support.
              </p>

              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Patient Transport</h3>
              <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                Suitable for planned transfers, hospital visits, discharge transportation and other patient movement requirements, where appropriate.
              </p>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Additional Requirements</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--navy-light)' }}>Depending on the ambulance selected, additional services may include:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Oxygen support</li>
                <li>Paramedic support</li>
                <li>Ventilator support</li>
                <li>Patient attendant</li>
                <li>Extended waiting</li>
                <li>Long-distance transportation</li>
                <li>Hospital-to-hospital transfer</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Ambulance Types</h2>
                <p style={{ marginBottom: '1rem', color: 'var(--navy-light)' }}>Depending on availability and requirement:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                  <li>Omni / Toofan type ambulance</li>
                  <li>Tempo Traveller / larger patient transport</li>
                  <li>Other suitable ambulance vehicles</li>
                </ul>

                <div style={{ backgroundColor: '#fff1f2', borderLeft: '4px solid #e11d48', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '2.5rem' }}>
                  <h3 style={{ color: '#e11d48', marginBottom: '1rem', fontSize: '1.2rem' }}>Important</h3>
                  <p style={{ marginBottom: '1rem', color: 'var(--navy-dark)' }}>
                    Ambulance availability and equipment depend on the patient's requirement, location and service provider.
                  </p>
                  <p style={{ color: 'var(--navy-dark)', fontWeight: '500' }}>
                    For a life-threatening emergency, contact your local emergency services immediately.
                  </p>
                </div>

                
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
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
