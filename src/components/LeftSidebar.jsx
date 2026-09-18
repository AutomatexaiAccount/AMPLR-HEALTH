import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Scale, Link as LinkIcon, PhoneCall, HeartPulse, HelpCircle, Calendar, UserPlus, AlertCircle } from 'lucide-react';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);

  return (
    <aside className="left-sidebar">
      <div className="left-sidebar-inner">
        <ul className="sidebar-menu">
          
          <li className="sidebar-item">
            <Link to="/privacy" className="sidebar-link">
              <Scale size={16} />
              <span>Legal</span>
            </Link>
          </li>

          <li className="sidebar-item has-submenu">
            <button 
              className="sidebar-link" 
              onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              aria-expanded={quickLinksOpen}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <LinkIcon size={16} />
                <span>Quick Links</span>
              </div>
              {quickLinksOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {quickLinksOpen && (
              <ul className="sidebar-submenu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#about">About us</Link></li>
                <li><Link to="/#services">Our Services</Link></li>
                <li><Link to="/partner">Partner with us</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/privacy">Privacy policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            )}
          </li>

          <li className="sidebar-item">
            <Link to="/contact" className="sidebar-link">
              <PhoneCall size={16} />
              <span>Contact Us</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/#services" className="sidebar-link">
              <HeartPulse size={16} />
              <span>AMPLR Services</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/contact" className="sidebar-link">
              <HelpCircle size={16} />
              <span>Support</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-booking-modal')); }}>
              <Calendar size={16} />
              <span>Book Service</span>
            </a>
          </li>

          <li className="sidebar-item">
            <Link to="/partner" className="sidebar-link">
              <UserPlus size={16} />
              <span>Become a Partner</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/disclaimer" className="sidebar-link">
              <AlertCircle size={16} />
              <span>Disclaimer</span>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;
