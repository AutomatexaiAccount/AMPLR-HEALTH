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
          <p style={{ marginBottom: '2rem' }}>By using the AMPLR HEALTH SERVICES website, WhatsApp services or booking our services, you agree to these Terms & Conditions.</p>
          
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>1. Our Services</h3>
          <p style={{ marginBottom: '1rem' }}>AMPLR HEALTH SERVICES provides and/or coordinates healthcare-related services such as:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Lab sample collection at home</li>
            <li>Nursing</li>
            <li>Caregiver / caretaker</li>
            <li>ECG at home</li>
            <li>Doctor virtual consultation</li>
            <li>Ambulance / patient transport</li>
            <li>Physiotherapy at home</li>
            <li>Other healthcare services offered by AMPLR</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>2. Booking</h3>
          <p style={{ marginBottom: '1rem' }}>Submitting a booking request does not guarantee service confirmation.</p>
          <p style={{ marginBottom: '1rem' }}>A booking is confirmed only after service availability, timing, location and applicable charges are confirmed by AMPLR or the relevant service provider.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>3. Customer Information</h3>
          <p style={{ marginBottom: '1rem' }}>Customers must provide accurate information about the patient, contact details, location and service requirement.</p>
          <p style={{ marginBottom: '1rem' }}>Incorrect or incomplete information may affect service delivery.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>4. Healthcare Professionals & Service Providers</h3>
          <p style={{ marginBottom: '1rem' }}>Services may be provided by independent healthcare professionals or service partners such as doctors, nurses, laboratories, physiotherapists, caregivers and ambulance providers.</p>
          <p style={{ marginBottom: '1rem' }}>Services are subject to professional availability, qualification and applicable requirements.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>5. Medical Disclaimer</h3>
          <p style={{ marginBottom: '1rem' }}>Information on our website is for general information and service coordination.</p>
          <p style={{ marginBottom: '1rem' }}>AMPLR HEALTH SERVICES does not replace professional medical advice or emergency medical care.</p>
          <p style={{ marginBottom: '1rem' }}>For serious or life-threatening emergencies, please contact emergency medical services or visit the nearest appropriate hospital.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>6. Charges & Payment</h3>
          <p style={{ marginBottom: '1rem' }}>Service charges may vary depending on the service, duration, location, professional, equipment and other requirements.</p>
          <p style={{ marginBottom: '1rem' }}>Applicable charges will be communicated before confirmation wherever reasonably possible.</p>
          <p style={{ marginBottom: '1rem' }}>Payments must be made only through authorised AMPLR payment methods.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>7. Cancellation & Rescheduling</h3>
          <p style={{ marginBottom: '1rem' }}>Customers may request cancellation or rescheduling through our official contact channels.</p>
          <p style={{ marginBottom: '1rem' }}>Cancellation, rescheduling and refund eligibility may depend on the service and the timing of the request. Applicable terms will be communicated at the time of booking/payment where required.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>8. Service Availability</h3>
          <p style={{ marginBottom: '1rem' }}>Services depend on location, date, time and availability of suitable healthcare professionals, equipment and vehicles.</p>
          <p style={{ marginBottom: '1rem' }}>AMPLR may decline, reschedule or modify a booking when the required service is unavailable or circumstances make service delivery impractical or unsafe.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>9. Customer Responsibility</h3>
          <p style={{ marginBottom: '1rem' }}>Customers are expected to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Provide correct information</li>
            <li>Follow reasonable instructions from healthcare professionals</li>
            <li>Provide a safe environment for home services</li>
            <li>Treat healthcare professionals and service staff respectfully</li>
            <li>Make payments through authorised channels</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>10. Privacy</h3>
          <p style={{ marginBottom: '1rem' }}>Use of our services is also subject to our Privacy Policy, which explains how personal information is collected and used.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>11. Changes to Terms</h3>
          <p style={{ marginBottom: '1rem' }}>AMPLR may update these Terms & Conditions from time to time. The latest version will be available on our website.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>12. Governing Law</h3>
          <p style={{ marginBottom: '1rem' }}>These Terms are governed by the applicable laws of India.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>13. Contact Us</h3>
          <p style={{ marginBottom: '0.2rem' }}>AMPLR HEALTH SERVICES</p>
          <p style={{ marginBottom: '0.2rem' }}>Email: <a href="mailto:amplrhealth@gmail.com" style={{ color: 'var(--primary)' }}>amplrhealth@gmail.com</a></p>
          <p style={{ marginBottom: '1.5rem' }}>Phone: <a href="tel:7997888448" style={{ color: 'var(--primary)' }}>7997888448</a></p>
          <p>&copy; AMPLR HEALTH SERVICES. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
