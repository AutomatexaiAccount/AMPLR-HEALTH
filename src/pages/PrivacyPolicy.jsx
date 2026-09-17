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
          <p style={{ marginBottom: '2rem' }}>AMPLR HEALTH SERVICES ("AMPLR", "we", "us" or "our") respects your privacy. This Privacy Policy explains how we collect, use and protect your information when you use our website, WhatsApp services or book our healthcare services.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
          <p style={{ marginBottom: '1rem' }}>Depending on the service, we may collect:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Name and age</li>
            <li>Mobile number and email</li>
            <li>Address / service location</li>
            <li>Patient and booking details</li>
            <li>Healthcare information voluntarily provided for the requested service</li>
            <li>Payment and transaction details where applicable</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h3>
          <p style={{ marginBottom: '1rem' }}>We use your information to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Process and coordinate your booking</li>
            <li>Contact you regarding your service</li>
            <li>Arrange healthcare professionals or service providers</li>
            <li>Send booking confirmations and reminders</li>
            <li>Process payments</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
            <li>Meet applicable legal requirements</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>3. Sharing Information</h3>
          <p style={{ marginBottom: '1rem' }}>To provide the requested service, we may share necessary information with relevant:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Doctors</li>
            <li>Nurses</li>
            <li>Lab / diagnostic service providers</li>
            <li>Physiotherapists</li>
            <li>Caregivers</li>
            <li>ECG providers</li>
            <li>Ambulance providers</li>
            <li>Hospitals / clinics</li>
            <li>Payment and technology service providers</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>We share only information reasonably required for the relevant purpose.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>4. Healthcare Information</h3>
          <p style={{ marginBottom: '1rem' }}>Healthcare-related information may be used only as reasonably necessary to coordinate or provide the requested healthcare service, or as permitted or required by law.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>5. Data Security</h3>
          <p style={{ marginBottom: '1rem' }}>We take reasonable measures to protect your personal information from unauthorised access, misuse or disclosure. However, no online system can be guaranteed to be completely secure.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>6. Data Retention</h3>
          <p style={{ marginBottom: '1rem' }}>We retain information only for as long as reasonably necessary for providing services, maintaining records, legal requirements, dispute resolution and legitimate business purposes.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>7. Your Rights</h3>
          <p style={{ marginBottom: '1rem' }}>Subject to applicable law, you may request access, correction or deletion of your personal information and may withdraw consent where applicable.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>8. Third-Party Services</h3>
          <p style={{ marginBottom: '1rem' }}>Our website or services may use third-party platforms such as WhatsApp, payment gateways or other service providers. Their own privacy policies may also apply.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>9. Updates</h3>
          <p style={{ marginBottom: '1rem' }}>We may update this Privacy Policy from time to time. The latest version will be published on this page.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>10. Contact Us</h3>
          <p style={{ marginBottom: '0.2rem' }}>AMPLR HEALTH SERVICES</p>
          <p style={{ marginBottom: '0.2rem' }}>Email: <a href="mailto:amplrhealth@gmail.com" style={{ color: 'var(--primary)' }}>amplrhealth@gmail.com</a></p>
          <p style={{ marginBottom: '1.5rem' }}>Phone: <a href="tel:7997888448" style={{ color: 'var(--primary)' }}>7997888448</a></p>
          <p style={{ marginBottom: '1rem' }}>For privacy-related questions or complaints, please contact us using the above details.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
