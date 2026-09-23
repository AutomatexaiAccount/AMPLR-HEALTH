import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../../service-pages.css';

const AyurvedaUnaniHomeopathy = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Ayurveda, Unani & Homeopathy consultation.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const items = [
    "General wellness",
    "Lifestyle guidance",
    "Diet and daily routine",
    "Traditional approaches",
    "Follow-up consultation"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Ayurveda, Unani & Homeopathy | AMPLR Health</title>
      </Helmet>

      <section className="service-hero hero-orange">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Traditional Wellness, Professionally Guided.</span>
              </div>
              <h1 className="service-hero-title">Ayurveda, Unani & Homeopathy</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH SERVICES provides access to consultation options from appropriately qualified practitioners across selected traditional healthcare systems, subject to availability.
                </p>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  Our goal is to make professional consultation more convenient while respecting individual healthcare choices.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH Connects with qualified Ayurvedic practitioners, Unani practitioners, homoeopathic practitioners for consultation and guidance based on individual needs.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Consultation may include:</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {items.map((item, i) => (
              <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#1e293b', lineHeight: '1.6', fontWeight: '500' }}>
            Your Choice. Your Healthcare Journey.<br /><br />
            Whether you are looking for conventional healthcare, rehabilitation, nutrition or traditional healthcare consultation, AMPLR HEALTH SERVICES aims to help you access appropriate professional support conveniently.<br /><br />
            AYUSH and traditional healthcare services should be provided by appropriately qualified practitioners. These services may not be suitable for every condition and should not delay necessary emergency or conventional medical care.
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default AyurvedaUnaniHomeopathy;


