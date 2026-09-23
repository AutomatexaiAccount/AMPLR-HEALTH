import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart } from 'lucide-react';
import '../../../service-pages.css';

const EmployeeCheckups = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Employee Health Check-ups.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  return (
    <div className="service-page">
      <Helmet>
        <title>Employee Health Check-ups | AMPLR Health</title>
      </Helmet>

      <section className="service-hero hero-navy">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Preventive Healthcare for Your Workforce</span>
              </div>
              <h1 className="service-hero-title">Employee Health Check-ups</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  Regular health screening can help employees become more aware of important health parameters.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH SERVICES can coordinate customised health check-up programmes based on your organisation's requirements.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                <h4 style={{ color: '#fb7185', fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Programmes Can Be Designed Around</h4>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: '700', lineHeight: '1.8', margin: 0 }}>
                  Employee Strength | Age Group | Industry Type | Location | Health Requirements | Frequency | Budget
                </h3>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default EmployeeCheckups;


