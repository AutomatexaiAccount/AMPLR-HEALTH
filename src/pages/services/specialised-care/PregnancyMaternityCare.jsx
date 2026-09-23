import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart } from 'lucide-react';
import '../../../service-pages.css';

const PregnancyMaternityCare = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Pregnancy & Maternity Care services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  return (
    <div className="service-page">
      <Helmet>
        <title>Pregnancy & Maternity Care | AMPLR Health</title>
        <meta name="description" content="Thoughtful pregnancy and maternity care support by AMPLR Health for mothers and families." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Thoughtful Support for Mother and Baby</span>
              </div>
              <h1 className="service-hero-title">Pregnancy & Maternity Care</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  Pregnancy is a special journey that deserves the right care, attention and support.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH SERVICES helps expectant mothers and families access appropriate healthcare and support services throughout pregnancy and the postnatal period, subject to professional assessment and service availability.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                <h4 style={{ color: '#fb7185', fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Support Through Every Stage</h4>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: '700', lineHeight: '1.8', margin: 0 }}>
                  Pregnancy Care → Antenatal Support → Delivery Support Coordination → Postnatal Care → Mother &amp; Baby Support
                </h3>
                <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1rem' }}>
                  Our focus is to make appropriate healthcare support more convenient for mothers and families.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '3rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#1e293b', lineHeight: '1.6', fontWeight: '500' }}>
            Pregnancy requires regular care from qualified medical professionals. AMPLR services complement, but do not replace, routine antenatal or emergency medical care.
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default PregnancyMaternityCare;


