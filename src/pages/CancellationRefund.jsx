import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../index.css';

const CancellationRefund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Helmet>
        <title>Cancellation Refund | AMPLR Health</title>
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Cancellation Refund</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>AMPLR HEALTH SERVICES</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '2rem' }}>At AMPLR HEALTH, we aim to provide reliable and hassle-free healthcare services at your doorstep. Please read our cancellation and refund terms below.</p>
          
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>1. Cancellation by Customer</h3>
          <p style={{ marginBottom: '1rem' }}>Customers may request cancellation of a booking through WhatsApp, phone, or other available communication channels.</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Cancellation before service confirmation may be eligible for a full refund.</li>
            <li>Cancellation after service confirmation may be subject to applicable cancellation charges.</li>
            <li>Once a healthcare professional/provider has been dispatched or the service has started, the amount may be non-refundable.</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>2. Rescheduling</h3>
          <p style={{ marginBottom: '1rem' }}>Customers may request to reschedule a service, subject to availability of the healthcare professional/service provider.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>3. Cancellation by AMPLR HEALTH</h3>
          <p style={{ marginBottom: '1rem' }}>If AMPLR HEALTH or the assigned service provider is unable to provide the booked service, we may offer:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Rescheduling, or</li>
            <li>A full or appropriate refund of the amount paid.</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>4. Refund Processing</h3>
          <p style={{ marginBottom: '1rem' }}>Approved refunds will be processed to the original payment method or through another suitable method, as applicable.</p>
          <p style={{ marginBottom: '1rem' }}>Refund processing time may depend on the payment gateway or banking institution.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>5. Special Situations</h3>
          <p style={{ marginBottom: '1rem' }}>For ambulance, emergency, home visits, or services involving professional/provider travel, cancellation and refund eligibility may vary depending on the stage of service and actual expenses incurred.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>6. Important Note</h3>
          <p style={{ marginBottom: '1rem' }}>Refund eligibility may depend on the nature of the service, booking status, provider availability, and circumstances of cancellation.</p>
          <p style={{ marginBottom: '1.5rem' }}>For cancellation, refund, or rescheduling assistance, please contact:</p>
          <p style={{ marginBottom: '0.2rem', fontWeight: 'bold' }}>AMPLR HEALTH</p>
          <p style={{ marginBottom: '0.2rem' }}>Phone: <a href="tel:7997888448" style={{ color: 'var(--primary)' }}>7997888448</a></p>
          <p style={{ marginBottom: '1rem' }}>Email: <a href="mailto:amplrhealth@gmail.com" style={{ color: 'var(--primary)' }}>amplrhealth@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
