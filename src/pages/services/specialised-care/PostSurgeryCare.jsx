import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart } from 'lucide-react';
import '../../../service-pages.css';

const PostSurgeryCare = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Post-Surgery Care services.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  return (
    <div className="service-page">
      <Helmet>
        <title>Post-Surgery Care | AMPLR Health</title>
        <meta name="description" content="Supporting your recovery at home. AMPLR Health coordinates post-surgery home care." />
      </Helmet>

      <section className="service-hero hero-indigo">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Supporting Your Recovery at Home</span>
              </div>
              <h1 className="service-hero-title">Post-Surgery Care</h1>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#1e293b' }}>
                  Returning home after surgery is an important part of recovery. With appropriate professional support, patients and families can manage the transition more comfortably.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#1e293b' }}>
                  AMPLR HEALTH SERVICES helps coordinate suitable home-based services according to the patient's requirements.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: '700', lineHeight: '1.6', margin: 0 }}>
                  Your Recovery. Our Support.
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

export default PostSurgeryCare;


