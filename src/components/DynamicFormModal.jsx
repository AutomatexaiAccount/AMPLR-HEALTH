import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { supabase } from '../lib/supabase';
import { partnerFormsData } from '../data/partnerForms';
import './DynamicFormModal.css';

const MySwal = withReactContent(Swal);

const DynamicFormModal = ({ isOpen, onClose, formKey }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !formKey || !partnerFormsData[formKey]) return null;

  const formSchema = partnerFormsData[formKey];

  const handleInputChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (field.options && field.options.length > 1) {
        // Multi-select checkbox
        const currentVals = formData[name] || [];
        if (checked) {
          setFormData({ ...formData, [name]: [...currentVals, value] });
        } else {
          setFormData({ ...formData, [name]: currentVals.filter(v => v !== value) });
        }
      } else {
        // Single boolean checkbox (like declaration)
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Extract common fields for easy filtering
      const fullName = formData.providerName || formData.hospitalName || formData.patientName || formData.contactPerson || "Unknown";
      const mobileNumber = formData.mobile || "Unknown";
      
      // 4. Save to Supabase
      const { error } = await supabase
        .from('partner_applications')
        .insert([
          {
            form_type: formKey,
            full_name: fullName,
            mobile_number: mobileNumber,
            form_data: formData
          }
        ]);
        
      if (error) throw error;
      
      MySwal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        html: '<p>Thank you. Our team will review your application and contact you soon.</p><p style="margin-top: 15px; color: var(--primary); font-weight: 500;">Please send your relevant documents (ID proof, certificates, etc.) via WhatsApp to <b>7997888448</b> or email to <b>amplrhealth@gmail.com</b> for verification.</p>',
        confirmButtonColor: 'var(--primary)'
      });
      
      setFormData({});
      onClose();
      
    } catch (error) {
      console.error("Submit error: ", error);
      MySwal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="partner-modal-overlay" onClick={onClose}>
      <div className="partner-modal-container" onClick={e => e.stopPropagation()}>
        
        <div className="partner-modal-header">
          <div>
            <h3 className="partner-modal-title">{formSchema.title}</h3>
            <p className="partner-modal-desc">{formSchema.description}</p>
          </div>
          <button className="partner-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="partner-modal-content">
          {formSchema.fields.map((field, index) => (
            <div key={index} className="partner-form-group">
              <label className="partner-form-label">
                {field.label}
                {field.required && <span className="partner-form-required">*</span>}
              </label>
              
              {/* Text, Email, Tel, Date, Time */}
              {['text', 'email', 'tel', 'date', 'time', 'number'].includes(field.type) && (
                <input
                  type={field.type}
                  name={field.name}
                  className="partner-form-input"
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                />
              )}
              
              {/* Textarea */}
              {field.type === 'textarea' && (
                <textarea
                  name={field.name}
                  className="partner-form-textarea"
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                />
              )}
              
              {/* Radio */}
              {field.type === 'radio' && (
                <div className="partner-form-radio-group">
                  {field.options.map((opt, i) => (
                    <label key={i} className="partner-form-option">
                      <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        required={field.required}
                        checked={formData[field.name] === opt}
                        onChange={(e) => handleInputChange(e, field)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {/* Checkbox (Single or Multi) */}
              {field.type === 'checkbox' && (
                <div className="partner-form-checkbox-group">
                  {field.options.map((opt, i) => {
                    const isMulti = field.options.length > 1;
                    const isChecked = isMulti 
                      ? (formData[field.name] || []).includes(opt)
                      : !!formData[field.name];
                      
                    return (
                      <label key={i} className="partner-form-option">
                        <input
                          type="checkbox"
                          name={field.name}
                          value={opt}
                          required={field.required && (!isMulti || (formData[field.name] || []).length === 0)}
                          checked={isChecked}
                          onChange={(e) => handleInputChange(e, field)}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}
              
              {field.type === 'document_notice' && (
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, color: '#0369a1', fontSize: '0.95rem' }}>{field.text}</p>
                  <p style={{ margin: '8px 0 0', color: '#0c4a6e', fontSize: '0.9rem', fontWeight: 600 }}>
                    Please email these documents to <a href="mailto:amplrhealth@gmail.com" style={{color: 'var(--primary)'}}>amplrhealth@gmail.com</a> or WhatsApp to <a href="https://wa.me/917997888448" target="_blank" style={{color: 'var(--primary)'}}>7997888448</a> after submitting this form.
                  </p>
                </div>
              )}
            </div>
          ))}
          
          <div className="partner-modal-footer">
            <button type="button" className="partner-btn-cancel" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="partner-btn-submit" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner"></span> : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicFormModal;
