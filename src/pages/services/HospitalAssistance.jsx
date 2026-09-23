import React from 'react';
import ServiceCartBlock from '../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { Hospital, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const HospitalAssistance = () => {
  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Hospital Booking & Admission Assistance | AMPLR Health</title>
        <meta name="description" content="Finding a hospital, booking an appointment or arranging admission can be stressful. AMPLR Health helps patients and families coordinate with hospitals." />
      </Helmet>

      <section className="service-hero hero-navy">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Hospital size={16} />
                <span>Hospital Assistance</span>
              </div>
              <h1 className="service-hero-title">Hospital Booking & Admission Assistance</h1>
              
              <h3 style={{ color: 'var(--primary)', marginTop: '1rem', marginBottom: '1.5rem' }}>The Right Hospital Support, When You Need It</h3>
              
              <p className="service-hero-desc">
                Finding a hospital, booking an appointment or arranging admission can be stressful. AMPLR Health helps patients and families coordinate with hospitals and clinics for a smoother healthcare experience.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/hospital_assistance.jpg" alt="Hospital Assistance" className="service-hero-img" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>How AMPLR Helps</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li><strong>Hospital & Doctor Appointment:</strong> We help coordinate appointments with suitable hospitals, departments and doctors based on your requirement.</li>
                <li><strong>Hospital Admission Assistance:</strong> For planned or urgent requirements, AMPLR coordinates with available hospital partners and assists with the admission process.</li>
                <li><strong>Emergency Hospital Coordination:</strong> During urgent situations, AMPLR can coordinate with available hospitals and ambulance partners to help the patient reach appropriate medical care.</li>
                <li><strong>Specialist Consultation:</strong> We can assist in coordinating appointments with relevant specialists through associated hospitals and healthcare partners.</li>
                <li><strong>Follow-Up Support:</strong> Assistance can also be provided for follow-up hospital visits and appointments.</li>
              </ul>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Our Role in Hospital Assistance</h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                AMPLR Health acts as a healthcare service facilitator and coordinator. We connect and coordinate customers with hospitals, clinics and other healthcare partners based on their requirements.
              </p>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--navy-dark)' }}>AMPLR Coordinates:</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Hospital and doctor appointments</li>
                <li>Admission requests</li>
                <li>Emergency hospital coordination</li>
                <li>Ambulance coordination, where available</li>
                <li>Specialist appointments</li>
                <li>Follow-up appointments</li>
                <li>Communication between the customer and hospital</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Why Use AMPLR?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>One point of coordination</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>Saves time and effort</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>Convenient for families</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>Hospital coordination</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>Planned & urgent support</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ fontSize: '0.95rem' }}>Related healthcare services</span>
                  </div>
                </div>

                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>What You Need to Do</h2>
                <div style={{ padding: '1rem', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem' }}>
                  Share Requirement ➔ AMPLR Coordinates ➔ Hospital Confirmation ➔ Visit / Admission
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--navy-dark)' }}>Hospital's Role</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>The respective hospital and its medical professionals are responsible for:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  <li>Medical examination and treatment</li>
                  <li>Diagnosis and clinical decisions</li>
                  <li>Admission approval & Bed allocation</li>
                  <li>Doctor availability & Treatment procedures</li>
                  <li>Hospital charges and billing</li>
                </ul>

                
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

export default HospitalAssistance;
