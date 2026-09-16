import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Stethoscope, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import '../../service-pages.css';

const NursingServices = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Nursing Services at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Nursing Services at Home | AMPLR Health</title>
        <meta name="description" content="Professional nursing care at home. Short visits or 24/7 care by certified nurses in Vijayawada." />
      </Helmet>

      <section className="service-hero hero-emerald">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Stethoscope size={16} />
                <span>Professional Medical Care</span>
              </div>
              <h1 className="service-hero-title">Nursing Services</h1>
              <p className="service-hero-desc">
                Get hospital-quality medical care in the comfort of your home. Our qualified and experienced nurses are equipped to handle post-surgical care, wound dressing, injections, and long-term medical assistance.
              </p>
              
              <div className="service-hero-actions">
                <a href="#" onClick={openBookingModal} className="btn-primary">
                  <MessageCircle size={20} /> Book a Nurse
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary">
                  <PhoneCall size={20} /> Call: {CALL_NUMBER}
                </a>
              </div>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/nursing_services.jpg" alt="Nursing Services at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Compassionate & Qualified Care</h2>
              <p>
                Caring for a sick or recovering family member can be overwhelming. Our nursing services provide you with peace of mind, knowing that a trained medical professional is managing the patient's healthcare needs.
              </p>
              <div className="features-checklist" style={{ marginTop: '2rem' }}>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Post-Surgical & Wound Care</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>IV Infusions & Injections</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>Catheterisation & Vitals Monitoring</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 className="text-primary" size={24} />
                  <span>12-hour and 24-hour shift options</span>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="pricing-wrapper" style={{ margin: '0' }}>
              <h3>Pricing Details</h3>
              <p className="pricing-subtitle">Indicative starting prices for nursing care</p>
              
              <table className="pricing-table-modern">
                <thead>
                  <tr>
                    <th>Service Duration / Type</th>
                    <th style={{ textAlign: 'right' }}>Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="service-name">Short Visit (Injections/Vitals)</td>
                    <td className="service-price">₹499</td>
                  </tr>
                  <tr>
                    <td className="service-name">Wound Dressing</td>
                    <td className="service-price">₹599</td>
                  </tr>
                  <tr>
                    <td className="service-name">12-Hour Shift (Day/Night)</td>
                    <td className="service-price">₹1,499</td>
                  </tr>
                  <tr>
                    <td className="service-name">24-Hour Continuous Care</td>
                    <td className="service-price">₹2,499</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="pricing-cta">
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                  *Prices vary based on patient condition, required skill level, and duration of care.
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

export default NursingServices;
