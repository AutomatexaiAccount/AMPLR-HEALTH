import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../../service-pages.css';

const YogaWellness = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Yoga & Wellness services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const items = [
    "Flexibility",
    "Mobility",
    "Breathing practices",
    "Relaxation",
    "Stress management",
    "General fitness",
    "Mind-body wellness",
    "Healthy lifestyle practices"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Yoga & Wellness | AMPLR Health</title>
        <meta name="description" content="Move. Breathe. Relax. Professional yoga and wellness sessions by AMPLR Health." />
      </Helmet>

      <section className="service-hero hero-green">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Move. Breathe. Relax.</span>
              </div>
              <h1 className="service-hero-title">Yoga & Wellness</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  Guided yoga and wellness sessions can complement a healthy lifestyle and support flexibility, mobility, relaxation and mind-body wellbeing.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Sessions may focus on:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {items.map((item, i) => (
              <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#1e293b', lineHeight: '1.8', fontWeight: '500' }}>
            Wellness That Fits Your Lifestyle.<br /><br />
            Yoga and wellness services are complementary and should not replace necessary medical treatment.
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default YogaWellness;


