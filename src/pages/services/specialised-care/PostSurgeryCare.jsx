import React from 'react';
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
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  Returning home after surgery is an important part of recovery. With appropriate professional support, patients and families can manage the transition more comfortably.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  AMPLR HEALTH SERVICES helps coordinate suitable home-based services according to the patient's requirements.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '700', lineHeight: '1.6', margin: 0 }}>
                  Your Recovery. Our Support.
                </h3>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Explore Post-Surgery Care
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <PhoneCall size={20} /> Call Helpdesk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <div className="pricing-card-wrapper" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem', margin: '0 auto' }}>
            <Heart size={48} color="#e11d48" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Pricing Details</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Every patient's requirements are unique. Price will be shared after a detailed discussion regarding your specific needs, duration, and the appropriate professional required.
            </p>
            <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '0.8rem 2rem', borderRadius: '50px', background: 'linear-gradient(135deg, #e11d48, #be123c)', color: 'white', fontWeight: 'bold' }}>
              Discuss Pricing on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostSurgeryCare;
