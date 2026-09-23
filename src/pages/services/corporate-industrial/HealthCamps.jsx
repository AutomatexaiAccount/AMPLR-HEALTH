import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../../service-pages.css';

const HealthCamps = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Health Camps services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const items = [
    "General health check-ups",
    "Blood pressure screening",
    "Blood sugar testing",
    "BMI assessment",
    "Blood sample collection",
    "Diagnostic testing",
    "ECG",
    "Doctor consultation",
    "Physiotherapy assessment",
    "Dietician consultation",
    "Lifestyle counselling",
    "Women's health awareness",
    "Health awareness sessions"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Health Camps | AMPLR Health</title>
      </Helmet>

      <section className="service-hero hero-navy">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Bring Healthcare Closer to Your Employees.</span>
              </div>
              <h1 className="service-hero-title">Industrial & Corporate Health Camps</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  Organise professional healthcare services at your workplace and make preventive health more accessible to your team.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Health Camp Services May Include</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {items.map((item, i) => (
              <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default HealthCamps;


