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
          <p style={{ marginBottom: '1rem' }}>We understand that plans can change or medical emergencies can arise.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Customer Cancellations</h3>
          <p style={{ marginBottom: '1rem' }}>Cancellations made reasonably ahead of the scheduled service time may be eligible for a full refund of any advance paid.</p>
          <p style={{ marginBottom: '1rem' }}>Cancellations made after the professional/vehicle has been dispatched or arrived at the location may attract a cancellation fee to cover travel and dispatch costs.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Service Provider Cancellations</h3>
          <p style={{ marginBottom: '1rem' }}>If AMPLR HEALTH SERVICES or the service provider cancels the booking due to unforeseen circumstances or unavailability, any advance paid will be fully refunded.</p>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>Refund Process</h3>
          <p style={{ marginBottom: '1rem' }}>Approved refunds will be processed to the original payment method within a standard time frame (usually 5-7 working days, subject to banking procedures).</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
