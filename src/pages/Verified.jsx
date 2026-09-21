import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Verified.css';

const Verified = () => {
  useEffect(() => {
    // Supabase automatically logs the user in upon clicking the link.
    // Since we want them to sign in manually, we sign them out immediately upon landing here.
    const signOutUser = async () => {
      await supabase.auth.signOut();
    };
    signOutUser();
  }, []);

  return (
    <div className="verified-page-wrapper">
      <div className="verified-card">
        <div className="verified-icon-container">
          <CheckCircle size={64} className="verified-icon" />
        </div>
        <h1 className="verified-title">Email Verified!</h1>
        <p className="verified-message">
          Your email address has been verified.<br/>
          Your account is fully activated.
        </p>
        <p className="verified-welcome" style={{ fontWeight: '600', color: 'var(--navy-dark)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Welcome to AMPLR Health family!
        </p>
        <Link to="/login" className="verified-btn">
          Proceed to Login
        </Link>
      </div>
    </div>
  );
};

export default Verified;
