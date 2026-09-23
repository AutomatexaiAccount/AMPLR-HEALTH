import React from 'react';
import ServiceCartBlock from '../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, HeartHandshake, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const CaregiverCaretaker = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Caregiver / Caretaker services at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Caregiver & Caretaker Services | AMPLR Health</title>
        <meta name="description" content="Compassionate caretakers and patient attendants for everyday assistance at home in Vijayawada." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <HeartHandshake size={16} />
                <span>3. CAREGIVER / CARETAKER SERVICES</span>
              </div>
              <h1 className="service-hero-title">Compassionate Everyday Care at Home</h1>
              
              <p className="service-hero-desc" style={{ marginTop: '1.5rem' }}>
                Sometimes patients and elderly family members need <strong>reliable day to day assistance</strong>, rather than medical treatment.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps families arrange caregiver/caretaker support for elderly persons, children, mothers, recovering patients and individuals who need assistance with daily activities.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/caregiver.jpg" alt="Caregiver Services" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Caregiver Support May Include</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Personal assistance</li>
                <li>Mobility assistance</li>
                <li>Assistance with daily activities</li>
                <li>Feeding assistance</li>
                <li>Elderly care</li>
                <li>Child care support</li>
                <li>Mother and baby support</li>
                <li>Bedridden patient assistance</li>
                <li>Post-surgery support</li>
                <li>Companion care</li>
                <li>Basic patient assistance</li>
                <li>Support for patients with limited mobility</li>
              </ul>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Flexible Duration</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--navy-light)' }}>Caregiver services can be arranged according to requirement, subject to availability:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Short duration care</li>
                <li>Half-day support</li>
                <li>Full-day support</li>
                <li>Extended-day support</li>
                <li>Overnight support</li>
                <li>24-hour care</li>
                <li>Monthly caregiver arrangements</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                
                <h2 style={{ marginBottom: '1.5rem' }}>Specialised Care Support</h2>
                <p style={{ marginBottom: '1rem', color: 'var(--navy-light)' }}>We can help families arrange support for:</p>
                <p style={{ fontWeight: '600', color: 'var(--navy-dark)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                  Elderly Care | Child Care | Mother & Baby Care | Pregnant Care | Bedridden Care | Post-Surgery Care | Daily Assistance
                </p>

                <h2 style={{ marginBottom: '1.5rem' }}>More Than Assistance — Compassionate Support</h2>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)', lineHeight: '1.8' }}>
                  Our objective is to help families provide their loved ones with <strong>comfort, companionship and dependable day to day assistance at home.</strong>
                </p>

                
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaregiverCaretaker;
