import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Syringe, Stethoscope, HeartHandshake, Activity, HeartPulse, 
  UserPlus, Ambulance, CheckCircle2, Clock, 
  ShieldCheck, Award, Star, ChevronRight, PhoneCall, MessageCircle, MapPin
} from 'lucide-react';

const services = [
  { id: 1, title: 'Lab Sample Collection', icon: Syringe, image: '/95565.jpg', tag: 'Home Collection', link: '/services/lab-blood-collection' },
  { id: 2, title: 'Nursing Services', icon: Stethoscope, image: '/95567.png', tag: 'Professional Support', link: '/services/nursing-services' },
  { id: 3, title: 'Caregiver / Caretaker', icon: HeartHandshake, image: '/95569.png', tag: 'Everyday Care', link: '/services/caregiver-caretaker' },
  { id: 4, title: 'ECG at Home', icon: HeartPulse, image: '/95888.jpg', tag: 'Convenient Testing', link: '/services/ecg-at-home' },
  { id: 5, title: 'Doctor Consultation', icon: UserPlus, image: '/95890.jpg', tag: 'Virtual Consults', link: '/services/doctor-consultation' },
  { id: 6, title: 'Ambulance Services', icon: Ambulance, image: '/95892.jpg', tag: 'Patient Transport', link: '/services/ambulance-services' },
  { id: 7, title: 'Physiotherapy', icon: Activity, image: '/95887.png', tag: 'Home Rehabilitation', link: '/services/physiotherapy' },
];

const Home = () => {
  const phoneCallNumber = "+917997888448";
  const whatsappNumber = "917997888448";
  const whatsappMsg = "Hi! I want to book a healthcare service with AMPLR Health.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="home-page">
      <Helmet>
        <title>AMPLR Health Services | Brings Hospital Care to Your Home</title>
        <meta name="description" content="Quality healthcare, made simpler. AMPLR Health connects patients with trusted home healthcare professionals." />
      </Helmet>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-icon">✨</span>
              <span>Trusted Healthcare Services at Your Doorstep</span>
            </div>

            <h1 className="hero-title">
              Quality healthcare, <br />
              <span className="text-gradient">made simpler.</span>
            </h1>

            <p className="hero-description" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              The Care You Need. Where You Need It. <br /><br />
              Travelling to hospitals, clinics and diagnostic centres isn't always easy — especially for elderly people, children, recovering patients and families caring for loved ones. <br /><br />
              AMPLR HEALTH SERVICES helps make suitable healthcare services accessible at home through a coordinated network of healthcare professionals and service partners.
            </p>

            <div className="hero-buttons">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary hero-btn-main">
                <MessageCircle size={20} />
                <span>Book on WhatsApp</span>
              </a>
              <a href={`tel:${phoneCallNumber}`} className="btn-secondary hero-btn-sub">
                <PhoneCall size={20} />
                <span>Call Helpdesk</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-metrics">
              <div className="metric-item">
                <div className="metric-icon-wrap"><Clock size={18} /></div>
                <div>
                  <div className="metric-val">24 / 7</div>
                  <div className="metric-lbl">Emergency Assistance</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon-wrap"><ShieldCheck size={18} /></div>
                <div>
                  <div className="metric-val">Verified</div>
                  <div className="metric-lbl">Healthcare Network</div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-icon-wrap"><MapPin size={18} /></div>
                <div>
                  <div className="metric-val">Home</div>
                  <div className="metric-lbl">Based Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us (Vision & Mission) */}
      <section id="about" style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-pill">About Us</div>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>AMPLR HEALTH SERVICES</h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Brings Hospital Care to Your Home</p>
          </div>

          <div className="about-vision-grid">
            {/* Vision */}
            <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--primary)', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Star size={30} />
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1rem' }}>OUR VISION</h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>To Make Quality Healthcare More Accessible at Home</h4>
              <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>
                We envision a healthcare ecosystem where people can easily access appropriate healthcare services without unnecessary travel or complexity.
                <br /><br />
                AMPLR HEALTH SERVICES aims to become a trusted home healthcare service platform connecting patients, families, healthcare professionals, laboratories, hospitals, clinics, ambulance providers and other healthcare partners.
              </p>
            </div>

            {/* Mission */}
            <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--secondary)', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Award size={30} />
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1rem' }}>OUR MISSION</h3>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>Making Healthcare Easier, Accessible and Closer to Home.</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569' }}>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Improving access to home healthcare services</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Connecting customers with suitable healthcare professionals</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Supporting elderly and dependent patients</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Making healthcare booking simple</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Encouraging convenient home-based care</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Building a reliable healthcare service network</li>
                <li style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={20} className="text-secondary" style={{ flexShrink: 0, marginTop: '2px' }} /> Using technology to simplify healthcare coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section style={{ padding: '6rem 0', background: '#0f172a', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-pill" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>How It Works</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Healthcare Made Simple</h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Simple booking. Convenient care. Trusted coordination.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>01</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Select & Check</h4>
              <p style={{ color: '#94a3b8' }}>Choose the required service and view details/price before booking.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>02</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Book & Details</h4>
              <p style={{ color: '#94a3b8' }}>Select your preferred date/time and provide basic customer and patient details.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>03</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Confirm & Pay</h4>
              <p style={{ color: '#94a3b8' }}>Complete booking with secure online payment and receive confirmation.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>04</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Service & Feedback</h4>
              <p style={{ color: '#94a3b8' }}>Share your location, get the service completed, and share your feedback.</p>
            </div>

          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section id="services" className="section services-section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header text-center">
            <div className="section-pill">Our Services</div>
            <h2>Home Healthcare Services</h2>
            <p>Appropriate healthcare support closer to your home.</p>
          </div>

          <div className="services-grid">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="service-card">
                  <a href={s.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="service-image-wrap">
                      <img src={s.image} alt={s.title} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#f1f5f9', padding: '0.5rem' }} />
                    </div>
                  </a>
                  <div className="service-card-body">
                    <div className="service-card-meta">
                      <div className="service-icon-inline">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <span className="service-tag-pill">{s.tag}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <a href={s.link} className="btn-secondary">
                      View Details <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why AMPLR */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-pill">Why AMPLR?</div>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>Your Healthcare. Closer to Home.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><CheckCircle2 size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Convenient</h4>
              <p style={{ color: '#64748b' }}>Reduce unnecessary travel for suitable healthcare services.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><HeartHandshake size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Reliable Coordination</h4>
              <p style={{ color: '#64748b' }}>We coordinate your service request with the appropriate service provider.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Professional Network</h4>
              <p style={{ color: '#64748b' }}>We aim to build a trusted network of healthcare professionals and service partners.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><HeartPulse size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Family Friendly</h4>
              <p style={{ color: '#64748b' }}>Services designed with patients, elderly family members and caregivers in mind.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><MessageCircle size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Easy Booking</h4>
              <p style={{ color: '#64748b' }}>Book through WhatsApp or our online service request system.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '16px', background: 'var(--primary)', color: 'white' }}>
              <div style={{ color: 'white', marginBottom: '1rem' }}><Star size={32} /></div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'white' }}>Compassionate</h4>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>Because healthcare is not only about treatment — it is also about care, comfort and dignity.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
