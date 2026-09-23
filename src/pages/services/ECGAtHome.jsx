import React from 'react';
import ServiceCartBlock from '../../components/ServiceCartBlock';

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
                <span>4. ECG AT HOME</span>
              </div>
              <h1 className="service-hero-title">ECG Testing Without Leaving Home</h1>
              
              <p className="service-hero-desc" style={{ marginTop: '1.5rem' }}>
                For patients who need an ECG, travelling to a diagnostic centre may not always be convenient.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps arrange <strong>ECG services at home</strong>, subject to location and service availability.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/ecg_at_home.jpg" alt="ECG at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>ECG at Home May Be Convenient For</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Elderly patients</li>
                <li>Patients with mobility difficulties</li>
                <li>Bedridden patients</li>
                <li>Post-hospitalisation patients</li>
                <li>Patients advised to undergo ECG testing</li>
                <li>Individuals who require convenient diagnostic support</li>
              </ul>
              
              <div style={{ backgroundColor: '#fff1f2', borderLeft: '4px solid #e11d48', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginTop: '2rem' }}>
                <h3 style={{ color: '#e11d48', marginBottom: '1rem', fontSize: '1.2rem' }}>Important</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--navy-dark)' }}>
                  An ECG is a diagnostic test and does not by itself provide a complete medical diagnosis.
                </p>
                <p style={{ color: 'var(--navy-dark)', fontWeight: '500' }}>
                  If you experience emergency symptoms such as severe chest pain, severe breathing difficulty, fainting or other serious symptoms, seek <strong>immediate emergency medical care</strong> rather than waiting for a home ECG appointment.
                </p>
              </div>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Simple Process</h2>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.8' }}>
                    Book ECG &rarr; Professional Visits Your Home &rarr; ECG Performed &rarr; Report / Result Processed
                  </p>
                </div>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  The ECG is performed using appropriate equipment by the assigned healthcare professional/service provider.
                </p>

                
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

export default ECGAtHome;
