import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, Activity, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const Physiotherapy = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Physiotherapy sessions at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Physiotherapy at Home | AMPLR Health</title>
        <meta name="description" content="Expert physiotherapists at your doorstep in Vijayawada for pain relief, post-surgery rehab, and mobility issues." />
      </Helmet>

      <section className="service-hero hero-indigo">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Activity size={16} />
                <span>Rehabilitation & Recovery</span>
              </div>
              <h1 className="service-hero-title">Physiotherapy Services</h1>
              <p className="service-hero-desc">
                Recover faster in the comfort of your home. Our expert physiotherapists provide personalized treatment plans for pain management, post-surgical rehabilitation, and mobility improvement.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book a Session
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/physiotherapy.jpg" alt="Physiotherapy at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Regain Your Mobility</h2>
              <p>
                Whether you are recovering from a sports injury, surgery, or dealing with chronic joint pain, our qualified physiotherapists bring the necessary equipment to your home for effective healing.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Post-operative Rehabilitation</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Stroke & Neurological Rehab</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Back, Neck & Joint Pain Management</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Geriatric (Elderly) Physiotherapy</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for physiotherapy</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Session Type / Package</th>
                    <th style={{ textAlign: 'right' }}>Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">Single Assessment Session</td>
                    <td className="service-price">₹699</td>
                  </tr>
                  <tr>
                    <td className="service-name">Standard Therapy Session (45 mins)</td>
                    <td className="service-price">₹599</td>
                  </tr>
                  <tr>
                    <td className="service-name">5 Sessions Package</td>
                    <td className="service-price">₹2,799</td>
                  </tr>
                  <tr>
                    <td className="service-name">10 Sessions Package</td>
                    <td className="service-price">₹5,499</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices vary based on the type of therapy required and equipment needed.
                </p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%' }}>
                  <MessageCircle size={18} /> Discuss Treatment Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Physiotherapy;
