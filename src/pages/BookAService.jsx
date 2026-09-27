import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FileText } from 'lucide-react';
import DynamicFormModal from '../components/DynamicFormModal';
import '../index.css';

const customerForms = [
  { name: "Telugu Customer Form", formKey: "customer_telugu" },
  { name: "English Customer Form", formKey: "customer_english" }
];

const BookAService = () => {
  const [activeFormKey, setActiveFormKey] = useState(null);

  return (
    <>
      <div className="book-a-service-page" style={{ padding: '6rem 0', minHeight: '80vh', background: '#f8fafc' }}>
        <Helmet>
          <title>Book a Service | AMPLR Health</title>
        </Helmet>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>Book a Service</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Select your preferred language form below to book an AMPLR Health service.</p>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {customerForms.map((form, index) => (
              <button 
                key={index} 
                onClick={() => setActiveFormKey(form.formKey)}
                style={{ 
                  background: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: '#334155',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  textAlign: 'left'
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
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}>{form.name}</span>
                <FileText size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <DynamicFormModal 
        isOpen={!!activeFormKey} 
        onClose={() => setActiveFormKey(null)} 
        formKey={activeFormKey} 
      />
    </>
  );
};

export default BookAService;
