import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, AlertTriangle, CheckCircle, Navigation, Clock } from 'lucide-react';
import '../../service-pages.css';

const AmbulanceServices = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I need an Ambulance / Patient Transport Service.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const ambulanceServicesIncluded = [
    "Basic Life Support (BLS) Ambulance",
    "Advanced Life Support (ALS / ICU) Ambulance",
    "Patient transport vehicles",
    "Inter-city / outstation patient transfer",
    "Hospital-to-hospital transfer",
    "Home-to-hospital transfer",
    "Scheduled transport for treatments (e.g. dialysis, chemotherapy)"
  ];

  const ambulanceFeatures = [
    "Coordinated emergency response",
    "Trained medical personnel (where applicable)",
    "Essential medical equipment (as per ambulance type)",
    "Prompt booking and dispatch"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Ambulance Services | AMPLR Health</title>
        <meta name="description" content="Emergency & Patient Transport Support. AMPLR Health connects you with ambulance providers." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <AlertTriangle size={16} />
                <span>Emergency & Patient Transport Support</span>
              </div>
              <h1 className="service-hero-title">Ambulance Services</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  In an emergency, every minute counts. AMPLR HEALTH SERVICES helps patients connect with appropriate ambulance service providers for emergencies, hospital transfers and planned medical transportation.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: '#e11d48', color: 'white', border: 'none' }}>
                  <PhoneCall size={20} /> Call for Emergency
                </a>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'transparent', border: '2px solid white' }}>
                  <CalendarCheck size={20} /> Schedule Transport
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
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Ambulance Services May Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {ambulanceServicesIncluded.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Ambulance Support Features</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {ambulanceFeatures.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.4rem 0' }}>
                    <Navigation size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div style={{ background: '#fff1f2', color: '#be123c', padding: '2.5rem', borderRadius: '16px', border: '1px solid #fda4af', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={32} />
              <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>Important Notice Regarding Emergencies</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              <p>
                AMPLR HEALTH SERVICES acts as a coordinator connecting patients with third-party ambulance providers. Availability, response time, and equipment depend on the ambulance service provider and current location constraints.
              </p>
              <p style={{ fontWeight: 'bold' }}>
                In severe emergencies, please directly dial national emergency numbers (e.g. 108) while simultaneously reaching out for private support to ensure maximum safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmbulanceServices;
