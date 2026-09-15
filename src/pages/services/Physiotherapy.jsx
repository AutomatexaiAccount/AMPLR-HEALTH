import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../service-pages.css';

const Physiotherapy = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Physiotherapy at Home.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const physiotherapyServices = [
    "Orthopaedic physiotherapy (Joint pain, arthritis, fractures)",
    "Neuro-physiotherapy (Stroke recovery, paralysis, Parkinson's)",
    "Post-surgery rehabilitation (Knee/hip replacement, spinal surgery)",
    "Sports injury rehabilitation",
    "Geriatric (elderly) physiotherapy",
    "Cardiopulmonary physiotherapy",
    "Back pain, neck pain and postural correction"
  ];

  const idealFor = [
    "Patients recovering from surgery",
    "Senior citizens with mobility issues",
    "Stroke or neurological patients",
    "Individuals with chronic joint or back pain",
    "Sports injury recovery"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Physiotherapy at Home | AMPLR Health</title>
        <meta name="description" content="Professional physiotherapy at your doorstep. AMPLR Health provides convenient home physiotherapy services." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Professional Physiotherapy at Your Doorstep</span>
              </div>
              <h1 className="service-hero-title">Physiotherapy at Home</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Regaining mobility and managing pain often requires consistent physiotherapy. Travelling to a clinic with an injury or pain can worsen the condition.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  AMPLR HEALTH SERVICES helps you arrange professional physiotherapy at home, helping patients recover comfortably in a familiar environment.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book Physiotherapy
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
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Physiotherapy Services May Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {physiotherapyServices.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.6rem 1rem' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Ideal For</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {idealFor.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem', background: 'white' }}>
                    <CheckCircle size={18} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Physiotherapy assessments and treatment sessions are conducted by qualified physiotherapists based on the patient's specific condition and recovery goals.
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

export default Physiotherapy;
