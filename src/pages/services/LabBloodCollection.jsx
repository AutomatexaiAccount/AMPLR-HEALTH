import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import '../../service-pages.css';

const LabBloodCollection = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to enquire about Lab Sample Collection at home.";
  const BOOK_SERVICE_LINK = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const servicesIncluded = [
    "Blood sample collection at home",
    "Routine diagnostic sample collection",
    "Preventive health test sample collection",
    "Specialised test sample collection",
    "Health packages",
    "Hormonal tests",
    "Vitamin tests",
    "Diabetic tests",
    "Allergy tests",
    "PCOD / irregular-period related tests",
    "Fertility-related tests",
    "Genetic / DNA tests",
    "Cancer marker tests",
    "Other laboratory investigations as available"
  ];

  const idealFor = [
    "Senior citizens",
    "Children",
    "Patients with mobility difficulties",
    "Busy professionals",
    "Families",
    "Patients requiring regular testing"
  ];

  return (
    <div className="service-page">
      <Helmet>
        <title>Lab Sample Collection | AMPLR Health</title>
        <meta name="description" content="Home sample collection for diagnostic testing. AMPLR Health makes testing convenient." />
      </Helmet>

      <section className="service-hero hero-cyan">
        <div className="container">
          <div className="service-hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <div className="service-hero-badge">
                <Heart size={16} />
                <span>Your Tests. Your Home. Your Convenience.</span>
              </div>
              <h1 className="service-hero-title">Lab Sample Collection</h1>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="service-hero-desc" style={{ marginBottom: '1rem', textAlign: 'left', color: '#cbd5e1' }}>
                  No need to travel to a laboratory for every blood test. AMPLR HEALTH SERVICES helps you arrange home sample collection through trained and appropriate laboratory service professionals.
                </p>
                <p className="service-hero-desc" style={{ textAlign: 'left', color: '#cbd5e1' }}>
                  Our service is designed to make diagnostic testing more convenient for children, senior citizens, working professionals, patients and families.
                </p>
              </div>
              <div className="service-hero-actions" style={{ justifyContent: 'center' }}>
                <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <CalendarCheck size={20} /> Book Home Sample Collection
                </a>
                <a href={`tel:${CALL_NUMBER}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <PhoneCall size={20} /> Call Helpdesk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-benefits" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Services Include</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {servicesIncluded.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.6rem 1rem' }}>
                    <CheckCircle size={16} style={{ color: 'var(--premium-red)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1.5rem' }}>Ideal For</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {idealFor.map((item, i) => (
                  <li key={i} className="service-check-item" style={{ padding: '0.8rem 1.2rem', background: 'white' }}>
                    <CheckCircle size={18} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--premium-blue)', marginBottom: '1rem' }}>How It Works</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#334155', fontWeight: '500' }}>
                  <span>Book</span> <ArrowRight size={14} color="#94a3b8" />
                  <span>Schedule</span> <ArrowRight size={14} color="#94a3b8" />
                  <span>Home Collection</span> <ArrowRight size={14} color="#94a3b8" />
                  <span>Laboratory Testing</span> <ArrowRight size={14} color="#94a3b8" />
                  <span>Online Report</span>
                </div>
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.95rem' }}>Our team coordinates the sample collection according to the requested test and service availability.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
            Test availability, laboratory processing and report delivery depend on the selected laboratory/service provider.
          </div>
        </div>
      </section>

      <section className="pricing-section" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <div className="pricing-card-wrapper" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem', margin: '0 auto' }}>
            <Heart size={48} color="#e11d48" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Pricing Details</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Prices vary depending on the specific tests or health packages required. Contact us to check the price and schedule your home sample collection.
            </p>
            <a href={BOOK_SERVICE_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '0.8rem 2rem', borderRadius: '50px', background: 'linear-gradient(135deg, #e11d48, #be123c)', color: 'white', fontWeight: 'bold' }}>
              Check Prices on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabBloodCollection;
