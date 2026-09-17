import React from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle2, Navigation, Handshake, Users, CalendarCheck, FileText, Heart } from 'lucide-react';
import '../index.css';

const WhyAmplr = () => {
  return (
    <div className="why-amplr-page">
      <Helmet>
        <title>Why AMPLR? | AMPLR Health</title>
        <meta name="description" content="Why choose AMPLR Health? Your Healthcare. Closer to Home." />
      </Helmet>

      {/* Hero Section */}
      <section className="why-hero" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>WHY AMPLR?</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--primary)' }}>Your Healthcare. Closer to Home.</h2>
          </div>
        </div>
      </section>

      {/* Core Reasons */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <Navigation size={28} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Convenient</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>Reduce unnecessary travel for suitable healthcare services.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <Handshake size={28} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Reliable Coordination</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>We coordinate your service request with the appropriate service provider.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <CheckCircle2 size={28} color="#10b981" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Professional Network</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>We aim to build a trusted network of healthcare professionals and service partners.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <Users size={28} color="var(--accent)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Family Friendly</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>Services designed with patients, elderly family members and caregivers in mind.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <CalendarCheck size={28} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Easy Booking</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>Book through WhatsApp or our online service request system.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <FileText size={28} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Transparent</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>Understand the service, availability and applicable charges before confirmation.</p>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <Heart size={28} color="#e11d48" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-dark)', margin: 0 }}>Compassionate</h3>
              </div>
              <p style={{ color: 'var(--navy-light)', lineHeight: '1.6' }}>Because healthcare is not only about treatment — it is also about care, comfort and dignity.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default WhyAmplr;
