import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../index.css';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Helmet>
        <title>Terms And Conditions | AMPLR Health</title>
      </Helmet>

      {/* Back Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
        <div className="container">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#0f172a', color: 'white', padding: '4rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Terms And Conditions</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>AMPLR HEALTH SERVICES</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '1rem' }}>By booking a service with AMPLR HEALTH SERVICES, you agree to the following terms:</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Service Request and Coordination</h3>
          <p style={{ marginBottom: '1rem' }}>We coordinate services based on the details provided by the customer. Service provision is subject to the availability of suitable professionals and service partners.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Payments</h3>
          <p style={{ marginBottom: '1rem' }}>Service charges will be communicated before confirmation. Payments must be settled as per the agreed terms (advance or upon completion) directly with AMPLR HEALTH SERVICES or the designated service provider as instructed.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Professional Discretion</h3>
          <p style={{ marginBottom: '1rem' }}>The assigned healthcare professional reserves the right to decline or modify a service if it is found to be clinically inappropriate or unsafe for the patient during assessment.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Liability</h3>
          <p style={{ marginBottom: '1rem' }}>While we strive to connect you with verified and qualified professionals, AMPLR HEALTH SERVICES acts as an aggregator. The primary responsibility for clinical outcomes and medical advice rests with the consulting doctor, laboratory, or healthcare professional providing the service.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
