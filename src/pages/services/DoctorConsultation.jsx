import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, UserPlus, MessageCircle, CheckCircle2, Video } from 'lucide-react';
import '../../service-pages.css';

const DoctorConsultation = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to book a Doctor Consultation.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Doctor Consultation | AMPLR Health</title>
        <meta name="description" content="Consult experienced doctors online or request a home visit in Vijayawada through AMPLR Health." />
      </Helmet>

      <section className="service-hero hero-teal">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <UserPlus size={16} />
                <span>5. DOCTOR VIRTUAL CONSULTATION</span>
              </div>
              <h1 className="service-hero-title">Consult a Doctor From the Comfort of Your Home</h1>
              
              <p className="service-hero-desc" style={{ marginTop: '1.5rem' }}>
                Getting medical guidance can be easier when you don't have to travel for every consultation.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps connect customers with doctors for <strong>virtual consultations</strong>, subject to doctor availability and clinical suitability.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/doctor_consultation.jpg" alt="Doctor Consultation" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Consultation Options</h2>
              
              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Allopathic Doctors</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                Consult qualified medical professionals for appropriate general medical concerns.
              </p>

              <h3 style={{ color: 'var(--navy-dark)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>AYUSH Doctors</h3>
              <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                Virtual consultation options may also be available with qualified AYUSH practitioners, depending on availability.
              </p>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Suitable For</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>General health concerns</li>
                <li>Follow-up consultations</li>
                <li>Reviewing ongoing health concerns</li>
                <li>Medical guidance</li>
                <li>Lifestyle-related discussions</li>
                <li>Follow-up after previous consultation</li>
                <li>Other conditions suitable for virtual consultation</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>How It Works</h2>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.8' }}>
                    Book Consultation &rarr; Select Available Slot &rarr; Connect With Doctor &rarr; Consultation
                  </p>
                </div>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  The doctor will assess your concerns and provide medical advice based on the information available during the consultation.
                </p>

                <div style={{ backgroundColor: '#fff1f2', borderLeft: '4px solid #e11d48', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '2.5rem' }}>
                  <h3 style={{ color: '#e11d48', marginBottom: '1rem', fontSize: '1.2rem' }}>Important</h3>
                  <p style={{ marginBottom: '1rem', color: 'var(--navy-dark)' }}>
                    Virtual consultation may not be suitable for every medical condition.
                  </p>
                  <p style={{ color: 'var(--navy-dark)', fontWeight: '500' }}>
                    For emergencies or serious symptoms, please visit the nearest appropriate healthcare facility or use our ambulance service where required.
                  </p>
                </div>

                <div className="pricing-cta">
                  <a href="#" onClick={openBookingModal} className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
                    Book Doctor Virtual Consultation
                  </a>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1.5rem', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.6' }}>
                    Doctor availability, consultation duration and applicable charges may vary.
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

export default DoctorConsultation;
