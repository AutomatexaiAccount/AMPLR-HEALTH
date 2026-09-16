import React from 'react';
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
                <span>Everyday Assistance</span>
              </div>
              <h1 className="service-hero-title">Caregiver / Caretaker Services</h1>
              <p className="service-hero-desc">
                Reliable and compassionate care for your loved ones. Our trained caretakers assist with daily activities, hygiene, mobility, and feeding for the elderly and bedridden patients.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book a Caregiver
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/caregiver.jpg" alt="Caregiver Services" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Support for Daily Living</h2>
              <p>
                When a family member needs continuous assistance with their daily routine, our trained patient attendants are there to help with empathy and dignity.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Assistance with bathing, grooming & hygiene</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Help with feeding and medication reminders</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Mobility assistance and wheelchair support</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Companionship for the elderly</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for caretakers</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Service Duration</th>
                    <th style={{ textAlign: 'right' }}>Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">12-Hour Shift (Day or Night)</td>
                    <td className="service-price">₹799</td>
                  </tr>
                  <tr>
                    <td className="service-name">24-Hour Continuous Care</td>
                    <td className="service-price">₹1,299</td>
                  </tr>
                  <tr>
                    <td className="service-name">Weekly Package (12-Hrs)</td>
                    <td className="service-price">₹5,200</td>
                  </tr>
                  <tr>
                    <td className="service-name">Monthly Package (12-Hrs)</td>
                    <td className="service-price">₹20,000</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices vary based on patient condition (e.g., bedridden) and location.
                </p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%' }}>
                  <MessageCircle size={18} /> Discuss Needs on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaregiverCaretaker;
