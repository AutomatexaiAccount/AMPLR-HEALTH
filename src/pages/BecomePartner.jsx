import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle2, Building2, Stethoscope, Briefcase, MapPin, SearchCheck, Rocket, Handshake, ExternalLink } from 'lucide-react';
import '../index.css';

const partnerForms = [
  { name: "Partner Ambulance", link: "https://forms.gle/bScLWDSmhg6RDQwh6" },
  { name: "Partner Care Taker", link: "https://forms.gle/bScLWDSmhg6RDQwh6" },
  { name: "Partner Doctor Consultation", link: "https://forms.gle/pob6vRt5reBS7YMq5" },
  { name: "Partner ECG at Home", link: "https://forms.gle/ihAB8nruwNo9JJjC6" },
  { name: "Partner Hospital/Clinic Tie-up", link: "https://forms.gle/iUWhwpiWwyGA176Q6" },
  { name: "Partner Lab Sample Collection", link: "https://forms.gle/LXC4gU5E7wFVEAvcA" },
  { name: "Partner Nursing Service", link: "https://forms.gle/wYAu8YUGAnjuHFwD6" },
  { name: "Partner Physiotherapy", link: "https://forms.gle/QB2kwRWH8gpNnz1K8" },
  { name: "Telugu Customer Form", link: "https://forms.gle/ndEuC7ToumgiiTy59" },
  { name: "English Customer Form", link: "https://forms.gle/ndEuC7ToumgiiTy59" },
];

const BecomePartner = () => {
  const formsSectionRef = useRef(null);

  const scrollToForms = (e) => {
    e.preventDefault();
    if (formsSectionRef.current) {
      formsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="partner-page">
      <Helmet>
        <title>Become a Partner | AMPLR Health</title>
        <meta name="description" content="Join the AMPLR HEALTH partner network and grow your reach as a healthcare provider." />
      </Helmet>

      {/* Hero Section */}
      <section className="partner-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <Handshake size={16} />
              <span>Grow With Us</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2', color: 'white' }}>Join the AMPLR HEALTH partner network and grow your reach.</h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
              We are building a reliable healthcare service network to make quality healthcare more accessible at home.
            </p>
            <a href="#application-forms" onClick={scrollToForms} className="btn-primary" style={{ display: 'inline-block', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>
              Become a Partner
            </a>
          </div>
        </div>
      </section>

      {/* Application Forms Section */}
      <section id="application-forms" ref={formsSectionRef} style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>Application Forms</h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Select the appropriate category below to fill out your partner or customer application form.</p>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {partnerForms.map((form, index) => (
              <a 
                key={index} 
                href={form.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  background: '#f8fafc', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '12px',
                  textDecoration: 'none',
                  color: '#334155',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0f172a' }}>{form.name}</span>
                <ExternalLink size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>We welcome suitable:</h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              "Nurses", "Lab technicians", "Physiotherapists", "Caregivers / caretakers",
              "ECG service providers", "Ambulance providers", "Doctors", "Hospitals",
              "Clinics", "Diagnostic laboratories", "Other healthcare service providers"
            ].map((item, index) => (
              <div key={index} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} style={{ color: 'var(--secondary)' }} />
                <span style={{ fontSize: '1.1rem', color: '#334155', fontWeight: '500' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            
            <div style={{ padding: '2rem', background: '#f1f5f9', borderRadius: '16px' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>Local Opportunities</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Receive suitable service requirements in your area.</p>
            </div>

            <div style={{ padding: '2rem', background: '#f1f5f9', borderRadius: '16px' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Briefcase size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>Digital Support</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Manage service requests through our digital/WhatsApp platform.</p>
            </div>

            <div style={{ padding: '2rem', background: '#f1f5f9', borderRadius: '16px' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--accent)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>Flexible Partnership</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Accept suitable services based on your availability.</p>
            </div>

            <div style={{ padding: '2rem', background: '#f1f5f9', borderRadius: '16px' }}>
              <div style={{ width: '50px', height: '50px', background: '#10b981', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Stethoscope size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>Professional Network</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Be part of a growing and trusted healthcare network.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 0', background: '#0f172a', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>How It Works</h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            
            <div>
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>1</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Register</h4>
              <p style={{ color: '#94a3b8' }}>Submit your details</p>
            </div>

            <div>
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>2</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Verify</h4>
              <p style={{ color: '#94a3b8' }}>Our team verifies your information.</p>
            </div>

            <div>
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>3</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Activate</h4>
              <p style={{ color: '#94a3b8' }}>Approved partners are onboarded</p>
            </div>

            <div>
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>4</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Serve</h4>
              <p style={{ color: '#94a3b8' }}>Receive suitable service opportunities.</p>
            </div>

          </div>

          <div style={{ marginTop: '4rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '700px', margin: '4rem auto 0' }}>
            <strong>Important:</strong> Partner registration is subject to verification and approval. Service opportunities depend on patient requirements, location, availability and applicable qualifications.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Ready to Join?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: '0.9' }}>Become a Partner with AMPLR HEALTH today.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#application-forms" onClick={scrollToForms} className="btn-secondary" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold' }}>
              Become a Partner
            </a>
            <a href="tel:7997888448" className="btn-secondary" style={{ padding: '1rem 2rem', borderRadius: '50px', border: '2px solid white' }}>
              Call 7997888448
            </a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>Email: <a href="mailto:amplrhealth@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>amplrhealth@gmail.com</a></p>
        </div>
      </section>

    </div>
  );
};

export default BecomePartner;
