import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, Activity, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const Physiotherapy = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Physiotherapy sessions at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Physiotherapy at Home | AMPLR Health</title>
        <meta name="description" content="Expert physiotherapists at your doorstep in Vijayawada for pain relief, post-surgery rehab, and mobility issues." />
      </Helmet>

      <section className="service-hero hero-indigo">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Activity size={16} />
                <span>7. PHYSIOTHERAPY AT HOME</span>
              </div>
              <h1 className="service-hero-title">Professional Physiotherapy at Your Doorstep</h1>
              
              <p className="service-hero-desc" style={{ marginTop: '1.5rem' }}>
                Recovery and mobility can require regular physiotherapy. Travelling to a clinic may be difficult for patients with limited mobility.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps arrange <strong>physiotherapy services at home</strong> according to the patient's requirement and service availability.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/physiotherapy.jpg" alt="Physiotherapy at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Physiotherapy May Support</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Post-surgery rehabilitation</li>
                <li>Orthopaedic recovery</li>
                <li>Mobility improvement</li>
                <li>Strength and flexibility</li>
                <li>Elderly mobility support</li>
                <li>Post injury rehabilitation</li>
                <li>Back and neck-related rehabilitation</li>
                <li>Joint and muscle rehabilitation</li>
                <li>Recovery after prolonged hospitalisation</li>
                <li>Bedridden patient rehabilitation</li>
                <li>General functional recovery</li>
              </ul>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Personalised Home Sessions</h2>
              <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                A physiotherapist can assess the patient's condition and provide appropriate exercises and therapy according to the individual's needs.
              </p>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Benefits of Home Physiotherapy</h2>
                
                <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Comfort</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  Receive therapy in your familiar home environment.
                </p>

                <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Convenience</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  Reduce unnecessary travel.
                </p>

                <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Personal Attention</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  Sessions can focus on the patient's individual requirements.
                </p>

                <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Continuity</h3>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  Regular sessions can help support an organised rehabilitation plan.
                </p>

                <div className="pricing-cta">
                  <a href="#" onClick={openBookingModal} className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
                    Book Physiotherapy at Home
                  </a>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1.5rem', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.6' }}>
                    Physiotherapy treatment depends on professional assessment and clinical suitability.
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

export default Physiotherapy;
