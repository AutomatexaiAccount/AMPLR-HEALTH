import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle } from 'lucide-react';
import '../../../service-pages.css';

const RehabilitationSupport = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Rehabilitation Support services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  return (
    <div className="service-page">
      <Helmet>
        <title>Rehabilitation Support | AMPLR Health</title>
        <meta name="description" content="A coordinated approach to recovery. Professional rehabilitation support by AMPLR Health." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>A Coordinated Approach to Recovery</span>
              </div>
              <h1 className="service-hero-title">Rehabilitation Support</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  Rehabilitation may be required after surgery, injury, stroke, prolonged hospitalisation or other conditions affecting movement and daily functioning.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH SERVICES can help coordinate suitable rehabilitation professionals according to the patient's needs.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>Rehabilitation areas may include:</h3>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', color: '#334155', fontWeight: '600', lineHeight: '2' }}>
              Mobility &nbsp;|&nbsp; Strength &nbsp;|&nbsp; Communication &nbsp;|&nbsp; Daily Activities &nbsp;|&nbsp; Functional Recovery &nbsp;|&nbsp; Independence
            </p>
          </div>
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#1e293b', lineHeight: '1.6', fontWeight: '500' }}>
            Therapy and rehabilitation plans are determined by qualified professionals following appropriate assessment.
          </div>
        </div>
      </section>

      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

    </div>
  );
};

export default RehabilitationSupport;


