import React from 'react';
import { Helmet } from 'react-helmet';
import { PhoneCall, MessageCircle, Mail, MapPin, Heart } from 'lucide-react';
import '../index.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us | AMPLR Health</title>
        <meta name="description" content="Contact AMPLR HEALTH SERVICES for home healthcare support. Tell us what you need." />
      </Helmet>

      {/* Hero Section */}
      <section className="contact-hero" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <Heart size={16} color="var(--primary)" />
              <span>We Are Here to Help</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>Need Healthcare Support at Home?</h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
              Tell us what you need. Our team will help coordinate the appropriate service based on your requirement, location and availability.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '4rem 0', background: '#f8fafc', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '-8rem' }}>
            
            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '70px', height: '70px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <PhoneCall size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Call Us</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>Speak directly with our support team for immediate assistance or emergency coordination.</p>
              <a href="tel:7997888448" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>+91 7997888448</a>
            </div>

            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid var(--secondary)' }}>
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--secondary)', color: 'white', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '50px', fontWeight: 'bold' }}>FASTEST RESPONSE</div>
              <div style={{ width: '70px', height: '70px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
                <MessageCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>WhatsApp Us</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>Send us a message for quick service coordination, pricing inquiries, or booking.</p>
              <a href="https://wa.me/917997888448?text=Hi!%20I%20need%20healthcare%20support%20at%20home." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#10b981' }}>Chat on WhatsApp</a>
            </div>

            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '70px', height: '70px', background: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                <Mail size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Email Us</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>Prefer email? Drop us a line with your detailed requirements and we'll get back to you.</p>
              <a href="mailto:amplrhealth@gmail.com" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>amplrhealth@gmail.com</a>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Actions */}
      <section style={{ padding: '4rem 0', background: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '2rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://wa.me/917997888448?text=Hi!%20I%20want%20to%20book%20a%20service." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>Book a Service</a>
            <a href="https://wa.me/917997888448?text=Hi!%20I%20want%20to%20request%20an%20ambulance." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem', background: '#fff1f2', color: 'var(--primary)', border: 'none' }}>Request an Ambulance</a>
            <a href="/partner" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>Become a Partner</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
