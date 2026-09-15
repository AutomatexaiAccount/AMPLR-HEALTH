import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle, Video, AlertTriangle } from 'lucide-react';
import '../../service-pages.css';

const DoctorConsultation = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Doctor Consultation.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const consultationServices = [
    "General physician consultation",
    "Pediatric consultation",
    "Geriatric (elderly) care consultation",
    "Post-surgery follow-up consultation",
    "Second opinion consultation",
    "Routine medical advice",
    "E-prescription for general ailments",
    "Follow-up on diagnostic reports"
  ];

  const flexibleModes = [
    "Video consultation",
    "Tele-consultation (Audio)",
    "Doctor home visit (Subject to availability and requirement)"
  ];

  const idealFor = [
    "Mild fevers and common infections",
    "Chronic disease management",
    "General medical advice",
    "Senior citizens who have difficulty travelling",
    "Second opinions"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Doctor Virtual Consultation | AMPLR Health</title>
        <meta name="description" content="Consult a doctor from the comfort of your home. AMPLR Health provides virtual and home visit consultations." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Consult a Doctor From the Comfort of Your Home</span>
              </div>
              <h1 className="service-hero-title">Doctor Virtual Consultation</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Not every medical issue requires a hospital visit. AMPLR HEALTH SERVICES helps you connect with qualified doctors through virtual consultation (video / audio call) or arrange home visits for specific requirements.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book Consultation
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
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Consultation Services May Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {consultationServices.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Flexible Consultation Modes</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {flexibleModes.map((item, i) => (
                    <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                      <Video size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Ideal For</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {idealFor.map((item, i) => (
                    <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                      <CheckCircle size={16} style={{ color: 'var(--secondary)', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div style={{ background: '#fff1f2', color: '#be123c', padding: '2rem', borderRadius: '16px', border: '1px solid #fda4af', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <AlertTriangle size={32} style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Important Emergency Notice</h4>
              <p style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>
                In case of medical emergencies, severe symptoms, trauma or accidents, please visit the nearest hospital or call an ambulance immediately. Virtual consultations are for non-emergency medical advice only.
              </p>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Consultations are provided by registered independent medical practitioners. Prescriptions and medical advice are solely the responsibility of the consulting doctor.
          </div>
        </div>
      </section>

      <section className="pricing-section" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <div className="pricing-card-wrapper" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem', margin: '0 auto' }}>
            <Heart size={48} color="#e11d48" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Pricing Details</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Prices vary depending on the type of consultation (virtual vs. home visit) and the doctor's specialization. Contact us to check availability and pricing.
            </p>
            <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '0.8rem 2rem', borderRadius: '50px', background: 'linear-gradient(135deg, #e11d48, #be123c)', color: 'white', fontWeight: 'bold' }}>
              Check Prices on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorConsultation;
