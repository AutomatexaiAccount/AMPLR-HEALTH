import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../../service-pages.css';

const OccupationalTherapy = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Occupational Therapy services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const items = [
    "Activities of daily living",
    "Fine motor skills",
    "Pediatric developmental needs",
    "Sensory integration",
    "Neurological rehabilitation",
    "Functional rehabilitation",
    "Elderly functional support",
    "Post-injury recovery"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Occupational Therapy | AMPLR Health</title>
        <meta name="description" content="Building skills for everyday life. Professional occupational therapy by AMPLR Health." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Building Skills for Everyday Life.</span>
              </div>
              <h1 className="service-hero-title">Occupational Therapy</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  Occupational therapy can help individuals develop or regain skills needed for everyday activities and greater independence.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Therapy may support:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {items.map((item, i) => (
              <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#1e293b', lineHeight: '1.6', fontWeight: '500' }}>
            Supporting Independence, One Step at a Time.
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default OccupationalTherapy;


