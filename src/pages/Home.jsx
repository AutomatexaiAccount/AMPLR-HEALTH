import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Syringe, Stethoscope, HeartHandshake, Activity, HeartPulse, 
  UserPlus, Ambulance, CheckCircle2, Clock, 
  ShieldCheck, Award, Star, ChevronRight, PhoneCall, MessageCircle, MapPin,
  Baby, Brain, Dumbbell, Leaf, Building2, Heart
} from 'lucide-react';

const services = [
  { id: 1, title: 'Lab Sample Collection', icon: Syringe, tag: 'Home Collection', link: '/services/lab-blood-collection', price: '₹199' },
  { id: 2, title: 'Nursing Services', icon: Stethoscope, tag: 'Professional Support', link: '/services/nursing-services', price: '₹599' },
  { id: 3, title: 'Caregiver / Caretaker', icon: HeartHandshake, tag: 'Everyday Care', link: '/services/caregiver-caretaker', price: '₹799' },
  { id: 4, title: 'ECG at Home', icon: HeartPulse, tag: 'Convenient Testing', link: '/services/ecg-at-home', price: '₹499' },
  { id: 5, title: 'Doctor Consultation', icon: UserPlus, tag: 'Virtual Consults', link: '/services/doctor-consultation', price: '₹499' },
  { id: 6, title: 'Ambulance Services', icon: Ambulance, tag: 'Patient Transport', link: '/services/ambulance-services', price: '₹1,499' },
  { id: 7, title: 'Physiotherapy', icon: Activity, tag: 'Home Rehabilitation', link: '/services/physiotherapy', price: '₹699' },
];

const specialisedServices = [
  { title: 'Elder Care', icon: Heart, link: '/services/specialised-care/elder-care' },
  { title: 'Pregnancy & Maternity', icon: Baby, link: '/services/specialised-care/pregnancy-maternity-care' },
  { title: 'Post-Surgery Care', icon: Stethoscope, link: '/services/specialised-care/post-surgery-care' },
  { title: 'Speech Therapy', icon: Brain, link: '/services/therapy-rehabilitation/speech-therapy' },
  { title: 'Yoga & Wellness', icon: Dumbbell, link: '/services/wellness-lifestyle/yoga-wellness' },
  { title: 'AYUSH Consultation', icon: Leaf, link: '/services/ayush-traditional/ayurveda-unani-homeopathy' },
  { title: 'Health Camps', icon: Building2, link: '/services/corporate-industrial/health-camps' },
  { title: 'Dietician & Nutrition', icon: Award, link: '/services/wellness-lifestyle/dietician-nutrition' },
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

      {/* Hero Banner — LIGHT THEME */}
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

            <p className="hero-description">
              The Care You Need. Where You Need It. <br /><br />
              Travelling to hospitals, clinics and diagnostic centres isn't always easy — especially for elderly people, children, recovering patients and families caring for loved ones. <br /><br />
              AMPLR HEALTH SERVICES helps make suitable healthcare services accessible at home through a coordinated network of healthcare professionals and service partners.
            </p>

            <div className="hero-buttons">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary hero-btn-main" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { redirect: waLink } })); }}>
                <MessageCircle size={20} />
                <span>Book on WhatsApp</span>
              </a>
              <a href={`tel:${phoneCallNumber}`} className="btn-secondary hero-btn-sub">
                <PhoneCall size={20} />
                <span>Call Helpdesk: 7997888448</span>
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
      <section id="about" className="section-light">
        <div className="container">
          <div className="section-header-left">
            <div className="section-pill">About Us</div>
            <h2>AMPLR HEALTH SERVICES</h2>
            <p className="section-subtitle">Brings Hospital Care to Your Home</p>
          </div>

          <div className="about-content" style={{ marginBottom: '3rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.25rem' }}>Trusted Healthcare Services at Your Doorstep</h4>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--navy-dark)' }}>Quality healthcare, made simpler.</p>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--navy-medium)' }}>The Care You Need. Where You Need It.</p>
            <p style={{ marginBottom: '1rem' }}>Travelling to hospitals, clinics and diagnostic centres isn't always easy — especially for elderly people, children, recovering patients and families caring for loved ones.</p>
            <p>AMPLR HEALTH SERVICES helps make suitable healthcare services accessible at home through a coordinated network of healthcare professionals and service partners.</p>
          </div>

          <div className="about-vision-grid">
            {/* Vision */}
            <div className="vision-mission-card">
              <div className="vm-icon-wrap vm-icon-primary">
                <Star size={30} />
              </div>
              <h3>OUR VISION</h3>
              <h4 className="vm-subtitle-primary">To Make Quality Healthcare More Accessible at Home</h4>
              <p>
                We envision a healthcare ecosystem where people can easily access appropriate healthcare services without unnecessary travel or complexity.
                <br /><br />
                AMPLR HEALTH SERVICES aims to become a trusted home healthcare service platform connecting patients, families, healthcare professionals, laboratories, hospitals, clinics, ambulance providers and other healthcare partners.
              </p>
            </div>

            {/* Mission */}
            <div className="vision-mission-card">
              <div className="vm-icon-wrap vm-icon-secondary">
                <Award size={30} />
              </div>
              <h3>OUR MISSION</h3>
              <h4 className="vm-subtitle-secondary">Making Healthcare Easier, Accessible and Closer to Home.</h4>
              <p style={{ marginBottom: '1rem' }}>We are committed to:</p>
              <ul className="mission-list">
                <li><CheckCircle2 size={20} className="text-secondary" /> Improving access to home healthcare services</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Connecting customers with suitable healthcare professionals</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Supporting elderly and dependent patients</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Making healthcare booking simple</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Encouraging convenient home-based care</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Building a reliable healthcare service network</li>
                <li><CheckCircle2 size={20} className="text-secondary" /> Using technology to simplify healthcare coordination</li>
              </ul>
              <p style={{ marginTop: '1.5rem', fontWeight: '600', color: 'var(--navy-dark)' }}>Simple booking. Convenient care. Trusted coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process — LIGHT */}
      <section id="how-it-works" className="section-soft">
        <div className="container">
          <div className="section-header-left">
            <div className="section-pill">Working Process</div>
            <h2>AMPLR HEALTH SERVICES working process.....</h2>
            <p className="section-subtitle">Simple booking. Convenient care. Trusted coordination.</p>
          </div>

          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="step-card">
              <div className="step-number">01</div>
              <h4>Select & Check</h4>
              <p>Select the Required Service &rarr; Check price</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h4>Book & Details</h4>
              <p>Select Date and Time &rarr; Fill Customer details</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h4>Confirm & Pay</h4>
              <p>Do the Payment &rarr; Receive Confirmation</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h4>Service & Feedback</h4>
              <p>Send Location &rarr; Get the Service Complete &rarr; Share Feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid — ICON ONLY, NO IMAGES, WITH PRICES */}
      <section id="services" className="section section-light">
        <div className="container">
          <div className="section-header-left">
            <div className="section-pill">Our Services</div>
            <h2>Home Healthcare Services</h2>
            <p className="section-subtitle">Appropriate healthcare support closer to your home.</p>
          </div>

          <div className="services-grid-clean">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.id} to={s.link} className="service-card-clean">
                  <div className="service-card-icon-wrap">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                  <div className="service-card-info">
                    <span className="service-tag-pill">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <div className="service-card-price">Starting from <strong>{s.price}</strong></div>
                    <span className="service-card-link">
                      View Details <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialised & More Services */}
      <section className="section-soft">
        <div className="container">
          <div className="section-header-left">
            <div className="section-pill">More Services</div>
            <h2>Specialised Care, Therapy & Wellness</h2>
            <p className="section-subtitle">Explore our full range of healthcare support services.</p>
          </div>

          <div className="more-services-grid">
            {specialisedServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={i} to={s.link} className="more-service-card">
                  <div className="more-service-icon">
                    <Icon size={22} />
                  </div>
                  <span className="more-service-title">{s.title}</span>
                  <ChevronRight size={16} className="more-service-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why AMPLR — LIGHT */}
      <section className="section-light">
        <div className="container">
          <div className="section-header-left">
            <div className="section-pill">Why AMPLR?</div>
            <h2>Your Healthcare. Closer to Home.</h2>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><CheckCircle2 size={32} /></div>
              <h4>Convenient</h4>
              <p>Reduce unnecessary travel for suitable healthcare services.</p>
            </div>

            <div className="why-card">
              <div className="why-icon"><HeartHandshake size={32} /></div>
              <h4>Reliable Coordination</h4>
              <p>We coordinate your service request with the appropriate service provider.</p>
            </div>

            <div className="why-card">
              <div className="why-icon"><ShieldCheck size={32} /></div>
              <h4>Professional Network</h4>
              <p>We aim to build a trusted network of healthcare professionals and service partners.</p>
            </div>

            <div className="why-card">
              <div className="why-icon"><HeartPulse size={32} /></div>
              <h4>Family Friendly</h4>
              <p>Services designed with patients, elderly family members and caregivers in mind.</p>
            </div>

            <div className="why-card">
              <div className="why-icon"><MessageCircle size={32} /></div>
              <h4>Easy Booking</h4>
              <p>Book through WhatsApp or our online service request system.</p>
            </div>

            <div className="why-card why-card-accent">
              <div className="why-icon"><Star size={32} /></div>
              <h4>Compassionate</h4>
              <p>Because healthcare is not only about treatment — it is also about care, comfort and dignity.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
