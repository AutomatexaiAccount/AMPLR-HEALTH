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
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>Contact us</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--primary)' }}>Need Healthcare Support at Home?</h2>
            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem', lineHeight: '1.6' }}>
              Tell us what you need. Our team will help coordinate the appropriate service based on your requirement, location and availability.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AMPLR HEALTH SERVICES</h3>
              <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic' }}>Brings Hospital Care to Your Home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Actions */}
      <section style={{ padding: '4rem 0', background: 'white', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-booking-modal')); }} className="btn-primary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>Book a Service</a>
            <a href="tel:7997888448" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>Talk to Us on WhatsApp</a>
            <a href="https://wa.me/917997888448?text=Hi!%20I%20want%20to%20book%20a%20service." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem', background: '#ecfdf5', color: '#10b981', border: '1px solid #10b981' }}>Chat to Us on WhatsApp</a>
            <a href="https://wa.me/917997888448?text=Hi!%20I%20need%20an%20ambulance." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem', background: '#fff1f2', color: 'var(--primary)', border: '1px solid var(--primary)' }}>Request an Ambulance</a>
            <a href="/partner" className="btn-secondary" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>Become a Partner</a>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>HOW AMPLR HEALTH SERVICES WORKS</h4>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a' }}>Healthcare Made Simple</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>1. Select Your Service</h3>
              <p style={{ color: 'var(--navy-light)' }}>Choose the healthcare service you need.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>2. Check the Price</h3>
              <p style={{ color: 'var(--navy-light)' }}>View the service details and price before booking.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>3. Choose Date & Time</h3>
              <p style={{ color: 'var(--navy-light)' }}>Select your preferred date and available time slot.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>4. Enter Your Details</h3>
              <p style={{ color: 'var(--navy-light)' }}>Provide your basic customer, patient and service details. Provide precaution has to take.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>5. Make Payment</h3>
              <p style={{ color: 'var(--navy-light)' }}>Complete the booking with secure online payment.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>6. Get Confirmation</h3>
              <p style={{ color: 'var(--navy-light)' }}>Receive your booking confirmation and service details.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>7. Share Your Location</h3>
              <p style={{ color: 'var(--navy-light)' }}>Share your location through WhatsApp or Google Maps.</p>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-dark)', marginBottom: '0.5rem' }}>8. Feedback & Follow-Up</h3>
              <p style={{ color: 'var(--navy-light)' }}>After the service, customers can provide feedback and request future or repeat services where applicable.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center', background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontWeight: '600', color: 'var(--navy-dark)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              Select the Required Service → Check price → Select Date and Time → Fill Customer details → Do the Payment → Receive Confirmation → Send Location → Get the Service Complete → Share Feedback
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
