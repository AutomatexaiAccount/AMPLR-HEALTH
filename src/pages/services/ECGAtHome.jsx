import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle, AlertTriangle } from 'lucide-react';
import '../../service-pages.css';

const ECGAtHome = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about ECG at Home Services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const ecgIncludes = [
    "12-lead ECG testing at home",
    "Digital ECG report",
    "Portable and reliable equipment",
    "Professional ECG technicians",
    "Fast report delivery"
  ];

  const idealFor = [
    "Cardiac patients requiring regular monitoring",
    "Senior citizens",
    "Bedridden patients",
    "Post-surgery patients",
    "Individuals experiencing mild discomfort (Non-emergency)",
    "Pre-operative health checkups"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>ECG at Home | AMPLR Health</title>
        <meta name="description" content="ECG testing without leaving home. AMPLR Health provides convenient home ECG services." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>ECG Testing Without Leaving Home</span>
              </div>
              <h1 className="service-hero-title">ECG at Home Services</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Heart health requires timely monitoring. Travelling to a diagnostic centre for an ECG can be stressful for cardiac patients and senior citizens.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  AMPLR HEALTH SERVICES helps you arrange ECG testing at home through suitable service partners and professionals.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book ECG at Home
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
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>ECG Service Includes</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {ecgIncludes.map((item, i) => (
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

          <div style={{ background: '#fff1f2', color: '#be123c', padding: '2rem', borderRadius: '16px', border: '1px solid #fda4af', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <AlertTriangle size={32} style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Important</h4>
              <p style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>
                ECG at home is a diagnostic service, not an emergency response service. In case of severe chest pain, suspected heart attack or medical emergency, please visit the nearest hospital or call an ambulance immediately.
              </p>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Diagnostic services are provided by independent laboratories/service providers. Interpretation of the ECG must be done by a qualified doctor.
          </div>
        </div>
      </section>

      <section className="pricing-section" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <div className="pricing-card-wrapper" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem', margin: '0 auto' }}>
            <Heart size={48} color="#e11d48" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Pricing Details</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Prices vary based on location and specific requirements. Contact us to check the price and schedule your home ECG test.
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

export default ECGAtHome;
