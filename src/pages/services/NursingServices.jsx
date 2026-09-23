import React from 'react';
import ServiceCartBlock from '../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Stethoscope, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const NursingServices = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Nursing Services at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Nursing Services at Home | AMPLR Health</title>
        <meta name="description" content="Professional nursing care at home. Short visits or 24/7 care by certified nurses in Vijayawada." />
      </Helmet>

      <section className="service-hero hero-emerald">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Stethoscope size={16} />
                <span>Nursing</span>
              </div>
              <h1 className="service-hero-title">Professional Nursing Support at Home</h1>
              
              <h3 style={{ color: 'var(--primary)', marginTop: '1rem', marginBottom: '1.5rem' }}>Recovering at home can be more comfortable with the right nursing support.</h3>
              
              <p className="service-hero-desc">
                AMPLR HEALTH SERVICES helps you arrange <strong>home nursing services</strong> based on the patient's needs and required duration.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                Our nursing services may support patients recovering from illness, surgery, hospitalisation or other healthcare needs.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/nursing_services.jpg" alt="Nursing Services at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Nursing Services May Include</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>General nursing care</li>
                <li>Post-hospitalisation care</li>
                <li>Post operative care</li>
                <li>Patient monitoring</li>
                <li>Medication assistance as prescribed</li>
                <li>Vital signs monitoring</li>
                <li>Wound and dressing support</li>
                <li>Catheter-related care</li>
                <li>Bedridden patient care</li>
                <li>Elderly patient support</li>
                <li>Recovery assistance</li>
                <li>Other nursing support based on requirement</li>
              </ul>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Flexible Service Options</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Short duration nursing</li>
                <li>Hourly nursing support</li>
                <li>Nursing visit</li>
                <li>Extended nursing support</li>
                <li>Regular / ongoing nursing care</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Who Can Benefit?</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                  <li>Senior citizens</li>
                  <li>Post-surgery patients</li>
                  <li>Bedridden patients</li>
                  <li>Patients recovering from illness</li>
                  <li>Patients requiring regular monitoring</li>
                  <li>Families needing professional nursing assistance at home</li>
                </ul>

                <h2 style={{ marginBottom: '1.5rem' }}>Our Approach</h2>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  We aim to provide the right nursing support for the patient's requirement, subject to service availability and clinical suitability.
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

export default NursingServices;
