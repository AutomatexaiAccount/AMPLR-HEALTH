import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../index.css';

const HealthcareDisclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Helmet>
        <title>Healthcare Disclaimer | AMPLR Health</title>
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Healthcare Disclaimer</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>AMPLR HEALTH SERVICES</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '1rem' }}>AMPLR HEALTH SERVICES facilitates and coordinates healthcare services through healthcare professionals and service providers. We act as a technology and service aggregator connecting customers with independent doctors, nurses, physiotherapists, caregivers, diagnostic laboratories, ambulance operators and other service providers.</p>
          <p style={{ marginBottom: '1rem' }}>AMPLR HEALTH SERVICES does not directly employ doctors, provide direct medical treatment or operate as a hospital/clinic unless explicitly stated. Service availability, clinical suitability, pricing and outcomes may vary depending on the service, patient requirement, location and assigned service provider.</p>
          <p style={{ marginBottom: '1rem' }}>AMPLR HEALTH SERVICES does not replace emergency medical care. In an emergency, please contact the appropriate emergency medical services or visit the nearest hospital.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareDisclaimer;
