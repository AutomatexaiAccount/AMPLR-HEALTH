import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../index.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Helmet>
        <title>Privacy Policy | AMPLR Health</title>
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>AMPLR HEALTH SERVICES</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '1rem' }}>Your privacy is important to us. AMPLR HEALTH SERVICES collects and processes basic customer and patient information (such as name, contact details, location, and service requirement) solely for the purpose of coordinating and providing requested healthcare services.</p>
          <p style={{ marginBottom: '1rem' }}>We share necessary information only with the specific service provider/professional assigned to fulfill your service request. We do not sell your personal data to third parties.</p>
          <p style={{ marginBottom: '1rem' }}>By requesting a service, you consent to the collection and use of information necessary to deliver the service and improve our platform.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
