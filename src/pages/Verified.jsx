import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Verified.css';

const Verified = () => {
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const processVerification = async () => {
      // Parse the hash from the URL: /verified#access_token=...&type=signup
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get('access_token');
      const type = params.get('type');

      if (token && type === 'signup') {
        // Clear the hash from the URL bar
        window.history.replaceState(null, '', '/verified');
        // Sign the user out so they must log in manually
        await supabase.auth.signOut();
      } else {
        // No token — user navigated here directly, just show the page
        await supabase.auth.signOut();
      }
      setStatus('done');
    };

    processVerification();
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
        <p style={{ fontWeight: '600', color: 'var(--navy-dark)', marginBottom: '2rem', fontSize: '1.1rem' }}>
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
