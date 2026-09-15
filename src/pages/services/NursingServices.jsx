import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../service-pages.css';

const NursingServices = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Nursing Services at home.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const nursingServicesIncluded = [
    "General nursing care",
    "Post-hospitalisation care",
    "Post-operative care",
    "Patient monitoring",
    "Medication assistance as prescribed",
    "Vital signs monitoring",
    "Wound and dressing support",
    "Catheter-related care",
    "Bedridden patient care",
    "Elderly patient support",
    "Recovery assistance",
    "Other nursing support based on requirement"
  ];

  const flexibleOptions = [
    "Short-duration nursing",
    "Hourly nursing support",
    "Nursing visit",
    "Extended nursing support",
    "Regular / ongoing nursing care"
  ];

  const whoCanBenefit = [
    "Senior citizens",
    "Post-surgery patients",
    "Bedridden patients",
    "Patients recovering from illness",
    "Patients requiring regular monitoring",
    "Families needing professional nursing assistance at home"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Nursing Services | AMPLR Health</title>
        <meta name="description" content="Professional nursing support at home. AMPLR Health connects you with qualified nurses." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Professional Nursing Support at Home</span>
              </div>
              <h1 className="service-hero-title">Nursing Services</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Recovering at home can be more comfortable with the right nursing support. AMPLR HEALTH SERVICES helps you arrange home nursing services based on the patient's needs and required duration.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  Our nursing services may support patients recovering from illness, surgery, hospitalisation or other healthcare needs.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book Nursing Service
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <PhoneCall size={20} /> Call Helpdesk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Nursing Services May Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {nursingServicesIncluded.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Flexible Service Options</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {flexibleOptions.map((item, i) => (
                    <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                      <CheckCircle size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Who Can Benefit?</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {whoCanBenefit.map((item, i) => (
                    <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                      <CheckCircle size={16} style={{ color: 'var(--secondary)', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div style={{ background: '#0f172a', color: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary)' }}>Our Approach</h3>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
              We aim to provide the right nursing support for the patient's requirement, subject to service availability and clinical suitability.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Services are provided by appropriate healthcare professionals/service partners. Medical procedures are performed only when clinically appropriate and within the professional's scope of practice.
          </div>
        </div>
      </section>

      <section className="pricing-section" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <div className="pricing-card-wrapper" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem', margin: '0 auto' }}>
            <Heart size={48} color="#e11d48" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Pricing Details</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Every patient's requirements are unique. Price will be shared after a detailed discussion regarding your specific needs, duration, and the appropriate professional required.
            </p>
            <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '0.8rem 2rem', borderRadius: '50px', background: 'linear-gradient(135deg, #e11d48, #be123c)', color: 'white', fontWeight: 'bold' }}>
              Discuss Pricing on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NursingServices;
