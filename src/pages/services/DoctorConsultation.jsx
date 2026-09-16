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
                <span>Expert Medical Advice</span>
              </div>
              <h1 className="service-hero-title">Doctor Consultation</h1>
              <p className="service-hero-desc">
                Connect with qualified and experienced doctors for general health issues, chronic disease management, and specialized medical advice through convenient video consultations or home visits.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book Appointment
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/doctor_consultation.jpg" alt="Doctor Consultation" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Accessible Medical Expertise</h2>
              <p>
                Get accurate diagnoses and treatment plans without the hassle of clinic waiting rooms. Our network includes General Physicians, Pediatricians, Orthopedics, and other specialists.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Secure Video/Audio Consultations</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Doctor Home Visits (Subject to availability)</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Digital Prescriptions provided instantly</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Second opinion for chronic conditions</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Consultation Fees</h3>
              <p className="pricing-subtitle">Indicative starting fees for consultations</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Consultation Type</th>
                    <th style={{ textAlign: 'right' }}>Starting Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">General Physician (Online)</td>
                    <td className="service-price">₹499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Specialist Doctor (Online)</td>
                    <td className="service-price">₹799</td>
                  </tr>
                  <tr>
                    <td className="service-name">General Physician (Home Visit)</td>
                    <td className="service-price">₹1,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Follow-up Consultation (Within 7 days)</td>
                    <td className="service-price">₹299</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Fees vary based on the doctor's specialty and experience.
                </p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%' }}>
                  <Video size={18} /> Schedule Video Consult
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorConsultation;
