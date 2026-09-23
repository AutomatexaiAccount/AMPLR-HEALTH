import React from 'react';
import ServiceCartBlock from '../../../components/ServiceCartBlock';

import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, MessageCircle, CheckCircle2 } from 'lucide-react';
import '../../../service-pages.css';

const ElderCare = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Elder Care services.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Elder Care | AMPLR Health</title>
        <meta name="description" content="Compassionate elder care services by AMPLR Health. Support for senior citizens at home in Vijayawada." />
      </Helmet>

      <section className="service-hero hero-rose">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Compassionate Care for Loved Ones</span>
              </div>
              <h1 className="service-hero-title">Elder Care</h1>
              <p className="service-hero-desc">
                As our loved ones grow older, they may need additional support with healthcare, mobility and everyday activities. AMPLR HEALTH helps families arrange suitable support for senior citizens, based on their individual needs.
              </p>
              
              
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/caregiver.jpg" alt="Elder Care Services" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Care for Them. Comfort Them. Be There for Them.</h2>
              <p>
                Our elder care services are designed to provide physical assistance and emotional support, ensuring your elderly family members live with dignity and comfort in their own homes.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Assistance with bathing, grooming & hygiene</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Timely medication administration & reminders</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Mobility support to prevent falls</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Companionship and emotional support</span>
                </div>
              </div>
            </div>
            
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for elder care</p>
              
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
                    <td className="service-price">₹899</td>
                  </tr>
                  <tr>
                    <td className="service-name">24-Hour Continuous Care</td>
                    <td className="service-price">₹1,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Monthly Package (12-Hrs)</td>
                    <td className="service-price">₹22,000</td>
                  </tr>
                  <tr>
                    <td className="service-name">Monthly Package (24-Hrs)</td>
                    <td className="service-price">₹40,000</td>
                  </tr>
                </tbody>
              </table>
              
              
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <ServiceCartBlock searchTitle={window.location.pathname.split('/').pop().replace(/-/g, ' ')} />
      </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElderCare;
