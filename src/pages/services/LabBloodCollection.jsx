import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, CalendarCheck, Syringe, MessageCircle, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import '../../service-pages.css';
import ServiceCartBlock from '../../components/ServiceCartBlock';

const LabBloodCollection = () => {
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to book a Lab Test / Blood Collection at home.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
  const CALL_NUMBER = '7997888448';

  const openBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="service-page">
      <Helmet>
        <title>Lab Sample Collection at Home | AMPLR Health</title>
        <meta name="description" content="Book lab tests and blood sample collection from home in Vijayawada. Fast, hygienic, and reliable diagnostics by AMPLR Health." />
      </Helmet>

      {/* Hero Section */}
      <section className="service-hero hero-blue">
        <div className="container">
          <div className="service-hero-inner">
            <div>
              <div className="service-hero-badge">
                <Syringe size={16} />
                <span>1. Home Healthcare Services</span>
              </div>
              <h1 className="service-hero-title">Lab Sample Collection</h1>
              
              <h3 style={{ color: 'var(--primary)', marginTop: '1rem', marginBottom: '1.5rem' }}>Your Tests. Your Home. Your Convenience.</h3>
              
              <p className="service-hero-desc">
                No need to travel to a laboratory for every blood test.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                AMPLR HEALTH SERVICES helps you arrange home sample collection through trained and appropriate laboratory service professionals.
              </p>
              <p className="service-hero-desc" style={{ marginTop: '1rem' }}>
                Our service is designed to make diagnostic testing more convenient for children, senior citizens, working professionals, patients and families.
              </p>
            </div>
            
            <div className="service-hero-img-wrap">
              <img src="/blood_collection.jpg" alt="Lab Sample Collection at Home" className="service-hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="content-text">
              <h2 style={{ marginBottom: '1.5rem' }}>Services Include</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Blood sample collection at home</li>
                <li>Routine diagnostic sample collection</li>
                <li>Preventive health test sample collection</li>
                <li>Specialised test sample collection</li>
                <li>Health packages</li>
                <li>Hormonal tests</li>
                <li>Vitamin tests</li>
                <li>Diabetic tests</li>
                <li>Allergy tests</li>
                <li>PCOD / irregular-period related tests</li>
                <li>Fertility-related tests</li>
                <li>Genetic / DNA tests</li>
                <li>Cancer marker tests</li>
                <li>Other laboratory investigations as available</li>
              </ul>
              
              <h2 style={{ marginBottom: '1.5rem' }}>Ideal For</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <li>Senior citizens</li>
                <li>Children</li>
                <li>Patients with mobility difficulties</li>
                <li>Busy professionals</li>
                <li>Families</li>
                <li>Patients requiring regular testing</li>
              </ul>
            </div>
            
            <div className="content-text">
              <div className="pricing-wrapper" style={{ margin: '0', backgroundColor: 'var(--bg-alt)' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>How It Works</h2>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.8' }}>
                    Book &rarr; Schedule &rarr; Home Collection &rarr; Laboratory Testing &rarr; Online Report
                  </p>
                </div>
                <p style={{ marginBottom: '2.5rem', color: 'var(--navy-light)' }}>
                  Our team coordinates the sample collection according to the requested test and service availability.
                </p>

                <div className="pricing-cta">
                  <ServiceCartBlock searchTitle="Lab Sample Collection" />
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
                    Test availability, laboratory processing and report delivery depend on the selected laboratory/service provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabBloodCollection;
