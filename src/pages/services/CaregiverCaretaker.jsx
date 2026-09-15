import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../service-pages.css';

const CaregiverCaretaker = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Caregiver / Caretaker services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const caregiverSupport = [
    "Personal assistance",
    "Mobility assistance",
    "Assistance with daily activities",
    "Feeding assistance",
    "Elderly care",
    "Child care support",
    "Mother and baby support",
    "Bedridden patient assistance",
    "Post-surgery support",
    "Companion care",
    "Basic patient assistance",
    "Support for patients with limited mobility"
  ];

  const flexibleDuration = [
    "Short-duration care",
    "Half-day support",
    "Full-day support",
    "Extended-day support",
    "Overnight support",
    "24-hour care",
    "Monthly caregiver arrangements"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Caregiver & Caretaker Services | AMPLR Health</title>
        <meta name="description" content="Compassionate everyday care at home. AMPLR Health provides professional caregivers." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Compassionate Everyday Care at Home</span>
              </div>
              <h1 className="service-hero-title">Caregiver / Caretaker Services</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Sometimes patients and elderly family members need reliable day-to-day assistance, rather than medical treatment.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  AMPLR HEALTH SERVICES helps families arrange caregiver/caretaker support for elderly persons, children, mothers, recovering patients and individuals who need assistance with daily activities.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book Caregiver / Caretaker
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
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Caregiver Support May Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {caregiverSupport.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Flexible Duration</h3>
                <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.95rem' }}>Caregiver services can be arranged according to requirement, subject to availability:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {flexibleDuration.map((item, i) => (
                    <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                      <CheckCircle size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Specialised Care Support</h3>
                <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.95rem' }}>We can help families arrange support for:</p>
                <div style={{ color: '#334155', fontWeight: '600', lineHeight: '1.8' }}>
                  Elderly Care | Child Care | Mother & Baby Care | Pregnant Care | Bedridden Care | Post-Surgery Care | Daily Assistance
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#0f172a', color: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary)' }}>More Than Assistance — Compassionate Support</h3>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto' }}>
              Our objective is to help families provide their loved ones with comfort, companionship and dependable day-to-day assistance at home.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Caregiver services are non-medical support services unless specifically provided by a qualified healthcare professional.
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

export default CaregiverCaretaker;
