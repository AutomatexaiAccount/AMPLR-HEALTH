import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, ChevronRight, CheckCircle, Loader2, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import html2pdf from 'html2pdf.js';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, clearCart, cartTotal, discountAmount, activeDiscount, appliedPromo, setAppliedPromo, globalDiscount, grandTotal, isCartOpen, setIsCartOpen } = useCart();

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('amplr_checkout_form');
    if (saved) return JSON.parse(saved);
    return { name: '', phone: '', email: '', city: '', area: '', location: '', pincode: '' };
  });

  // Save formData to sessionStorage when it changes
  React.useEffect(() => {
    sessionStorage.setItem('amplr_checkout_form', JSON.stringify(formData));
  }, [formData]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [bookingFor, setBookingFor] = useState('self');

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const { data, error } = await supabase.from('promo_codes')
        .select('*')
        .eq('code', promoInput.trim().toUpperCase())
        .eq('is_active', true)
        .single();
      
      if (error || !data) {
        setPromoError('Invalid or expired promo code.');
      } else {
        setAppliedPromo(data);
        setPromoInput('');
      }
    } catch (err) {
      setPromoError('Failed to apply promo code.');
    } finally {
      setPromoLoading(false);
    }
  };

  // Auto-fill user data if logged in
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: prev.name || profile.full_name || '',
            phone: prev.phone || profile.phone || '',
            email: prev.email || profile.email || user.email || '',
            city: prev.city || profile.city || '',
            area: prev.area || profile.area || '',
            location: prev.location || profile.location || profile.landmark || '',
            pincode: prev.pincode || profile.pincode || ''
          }));
        }
        const { data: familyData } = await supabase.from('family_members').select('*').eq('user_id', user.id);
        if (familyData) {
          setFamilyMembers(familyData);
        }
      }
    };
    if (isCartOpen && isCheckingOut) {
      fetchUser();
    }
  }, [isCartOpen, isCheckingOut]);

  // ─── Mobile detection ────────────────────────────────────────────────────────
  const isMobileDevice = () =>
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;

  // ─── Handle return from Cashfree after mobile (_self) redirect ──────────────
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnedOrderId = urlParams.get('order_id');
    const pendingBooking = sessionStorage.getItem('amplr_pending_booking');

    if (returnedOrderId && pendingBooking) {
      // Clean the URL immediately to prevent duplicate processing on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
      sessionStorage.removeItem('amplr_pending_booking');

      const saveBookingAfterRedirect = async () => {
        try {
          const bookingsToInsert = JSON.parse(pendingBooking);
          const { error: insertError } = await supabase.from('bookings').insert(bookingsToInsert);
          if (!insertError) {
            clearCart();
            setIsCartOpen(true);
            setIsCheckingOut(true);
            setSuccess(true);
          } else {
            console.error('Error saving booking after redirect:', insertError);
          }
        } catch (e) {
          console.error('Error parsing pending booking:', e);
        }
      };
      saveBookingAfterRedirect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCartOpen) return null;


  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(false);
      setError('');
    }, 300);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) {
      setError('Please fill in all fields.');
      return;
    }
    if (isSubmitting) return; // prevent double-click

    setIsSubmitting(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const mobile = isMobileDevice();

      // 1. Create Cashfree Order via backend proxy
      //    Pass return_path so mobile redirect lands back on the same page
      const endpoint = import.meta.env.PROD ? '/api/create-cashfree-order.php' : '/api/create-cashfree-order';
      const orderResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_amount: grandTotal,
          customer_id: user ? user.id : undefined,
          customer_name: formData.name,
          customer_email: formData.email || 'customer@example.com',
          customer_phone: formData.phone,
          return_path: window.location.pathname.substring(1)
        })
      });
      const orderData = await orderResponse.json();

      if (!orderData.payment_session_id) {
        console.error('Cashfree order creation error:', orderData);
        throw new Error(orderData.message || orderData.error || 'Failed to initiate payment. Please try again.');
      }

      // 2. Initialise Cashfree JS SDK (CDN v3)
      const cashfree = window.Cashfree({ mode: 'sandbox' });

      if (mobile) {
        // ── MOBILE: full-page redirect (_self) ──────────────────────────────
        // Persist booking data in sessionStorage BEFORE leaving the page.
        // The useEffect above will read this when Cashfree redirects back.
        const bookingsToInsert = cart.items.map(item => ({
          user_id: user ? user.id : null,
          family_member_id: bookingFor !== 'self' ? bookingFor : null,
          service_id: item.type === 'service' ? item.id : (item.serviceId || item.service_id),
          sub_service_id: item.type === 'sub_service' ? item.id : null,
          customer_name: formData.name,
          customer_phone: formData.phone,
          booking_date: new Date().toISOString(),
          amount: item.price,
          status: 'pending'
        }));
        sessionStorage.setItem('amplr_pending_booking', JSON.stringify(bookingsToInsert));

        // Redirect full-page to Cashfree — browser navigates away from this app
        cashfree.checkout({
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: '_self'
        });
        // Execution does NOT continue here; browser navigates away
        return;
      }

      // ── DESKTOP: popup modal (_modal) ────────────────────────────────────
      const checkoutResult = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal'
      });

      if (checkoutResult?.error) {
        throw new Error(checkoutResult.error.message || 'Payment failed or was cancelled.');
      }

      // Desktop modal flow: payment is complete, save booking now
      const bookingsToInsert = cart.items.map(item => ({
        user_id: user ? user.id : null,
        family_member_id: bookingFor !== 'self' ? bookingFor : null,
        service_id: item.type === 'service' ? item.id : (item.serviceId || item.service_id),
        sub_service_id: item.type === 'sub_service' ? item.id : null,
        customer_name: formData.name,
        customer_phone: formData.phone,
        booking_date: new Date().toISOString(),
        amount: item.price,
        status: 'pending'
      }));

      const { error: insertError } = await supabase.from('bookings').insert(bookingsToInsert);
      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error(insertError.message || 'Payment successful, but failed to save booking.');
      }

      setSuccess(true);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── TEST MODE: Skip Payment ──────────────────────────────────────────────────
  const handleSkipPayment = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) {
      setError('Please fill in all fields.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const bookingsToInsert = cart.items.map(item => ({
        user_id: user ? user.id : null,
        family_member_id: bookingFor !== 'self' ? bookingFor : null,
        service_id: item.type === 'service' ? item.id : (item.serviceId || item.service_id),
        sub_service_id: item.type === 'sub_service' ? item.id : null,
        customer_name: formData.name,
        customer_phone: formData.phone,
        booking_date: new Date().toISOString(),
        amount: item.price,
        status: 'pending'
      }));

      const { error: insertError } = await supabase.from('bookings').insert(bookingsToInsert);
      if (insertError) throw new Error(insertError.message || 'Failed to save booking.');

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to skip payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    const element = document.getElementById('order-summary-content');
    if (!element) return;
    
    // Temporarily hide remove buttons for PDF
    const removeBtns = element.querySelectorAll('.cart-item-remove');
    removeBtns.forEach(btn => btn.style.display = 'none');

    const opt = {
      margin:       0.5,
      filename:     `AMPLR_Health_Bill_${Date.now()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Restore buttons
      removeBtns.forEach(btn => btn.style.display = 'flex');
    });
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={handleClose}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div>
            <ShoppingCart size={20} />
            <h2>Your Booking Cart</h2>
          </div>
          <button className="cart-drawer-close" onClick={handleClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer-body" id="order-summary-content">
          {/* Always show Logo in PDF view or Checkout view */}
          {(isCheckingOut || success) && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src="/amplr-logo.jpeg" alt="AMPLR Health Logo" style={{ height: '50px', objectFit: 'contain' }} />
              <h3 style={{ margin: '0.5rem 0 0', color: '#c1121f', fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Order Summary
              </h3>
            </div>
          )}

          {success ? (
            <div className="cart-success">
              <CheckCircle size={64} color="#16a34a" style={{ marginBottom: '1rem' }} />
              <h3>Booking Successful!</h3>
              <p>Your service has been successfully booked.</p>
              
              <button 
                onClick={generatePDF}
                className="btn-secondary" 
                style={{ marginTop: '1.5rem', width: '100%', display: 'flex', gap: '8px', justifyContent: 'center', color: '#0f172a' }}
              >
                <Download size={18} /> Download Bill (PDF)
              </button>
              
              <button 
                className="btn-primary" 
                onClick={() => {
                  clearCart();
                  handleClose();
                }} 
                style={{ marginTop: '1rem', width: '100%' }}
              >
                Done
              </button>
            </div>
          ) : cart.items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
              <p>Your cart is empty.</p>
              <button className="btn-secondary" onClick={handleClose}>Browse Services</button>
            </div>
          ) : (
            <div className="cart-items-container">
              <ul className="cart-items-list" style={{ marginBottom: '1.5rem' }}>
                {cart.items.map((item, idx) => (
                  <li key={item.id + '-' + idx} className="cart-item">
                    <div className="cart-item-details">
                      {item.parentServiceTitle && (
                        <span className="cart-item-parent">{item.parentServiceTitle}</span>
                      )}
                      <h4>{item.title}</h4>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    {!isCheckingOut && (
                      <button 
                        className="cart-item-remove" 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Order Summary Breakdown */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#0f172a' }}>Bill Details</h4>
                
                {/* Promo Code Section */}
                {!isCheckingOut && (
                  <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                    {activeDiscount ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', padding: '10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                        <div>
                          <span style={{ fontWeight: 600, color: '#166534', display: 'block' }}>{activeDiscount.code || 'GLOBAL DISCOUNT'} Applied</span>
                          <span style={{ fontSize: '0.8rem', color: '#15803d' }}>
                            {activeDiscount.discount_type === 'percentage' ? `${activeDiscount.discount_amount}% off` : `₹${activeDiscount.discount_amount} off`}
                          </span>
                        </div>
                        {appliedPromo && (
                          <button 
                            onClick={() => setAppliedPromo(null)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input 
                            type="text" 
                            placeholder="Enter Promo Code" 
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                            disabled={promoLoading}
                          />
                          <button 
                            onClick={handleApplyPromo}
                            disabled={promoLoading || !promoInput.trim()}
                            style={{ padding: '8px 16px', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: promoInput.trim() && !promoLoading ? 'pointer' : 'not-allowed', opacity: promoInput.trim() && !promoLoading ? 1 : 0.7 }}
                          >
                            {promoLoading ? '...' : 'Apply'}
                          </button>
                        </div>
                        {promoError && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>{promoError}</div>}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#16a34a', fontWeight: 600 }}>
                    <span>Discount</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}


                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0 0', paddingTop: '1rem', borderTop: '1px dashed #cbd5e1', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  <span>Grand Total</span>
                  <span style={{ color: '#c1121f' }}>₹{grandTotal.toFixed(2)}</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <ShoppingCart size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/>
                  Secure 256-bit SSL Encryption
                </div>
              </div>

              {isCheckingOut && (
                <div className="cart-checkout-form" data-html2canvas-ignore="true">
                  <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Service Location Details</h3>
                  {error && <div className="form-error">{error}</div>}
                  
                  {familyMembers.length > 0 && (
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label>Who is this booking for?</label>
                      <select 
                        className="form-input" 
                        value={bookingFor}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBookingFor(val);
                          if (val === 'self') {
                            supabase.auth.getUser().then(({ data: { user } }) => {
                              if (user) {
                                supabase.from('users').select('*').eq('id', user.id).single().then(({ data: profile }) => {
                                  if (profile) setFormData(prev => ({ 
                                    ...prev, 
                                    name: profile.full_name || '',
                                    phone: profile.phone || '',
                                    email: profile.email || user.email || '',
                                    city: profile.city || '',
                                    area: profile.area || '',
                                    location: profile.location || profile.landmark || '',
                                    pincode: profile.pincode || ''
                                  }));
                                });
                              }
                            });
                          } else {
                            const member = familyMembers.find(m => m.id === val);
                            if (member) {
                              setFormData(prev => ({ 
                                ...prev, 
                                name: member.name,
                                phone: member.phone || prev.phone,
                                email: member.email || prev.email,
                                location: member.location || prev.location,
                                area: member.area || prev.area,
                                city: member.city || prev.city,
                                pincode: member.pincode || prev.pincode
                              }));
                            }
                          }
                        }}
                      >
                        <option value="self">Myself</option>
                        {familyMembers.map(member => (
                          <option key={member.id} value={member.id}>{member.name} ({member.relationship})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <form id="cart-checkout-form" onSubmit={handleCheckout}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        required 
                        disabled={isSubmitting}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          className="form-input"
                          value={formData.email} 
                          onChange={e => setFormData({...formData, email: e.target.value})} 
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Location (House No, Street, Landmark) *</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={formData.location} 
                        onChange={e => setFormData({...formData, location: e.target.value})} 
                        required 
                        disabled={isSubmitting}
                        placeholder="e.g. Flat 401, Galaxy Apts, Near Mall"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <div className="form-group">
                        <label>Area / Locality *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={formData.area} 
                          onChange={e => setFormData({...formData, area: e.target.value})} 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label>City *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={formData.city} 
                          onChange={e => setFormData({...formData, city: e.target.value})} 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label>Pincode *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={formData.pincode} 
                          onChange={e => setFormData({...formData, pincode: e.target.value})} 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.items.length > 0 && !success && (
          <div className="cart-drawer-footer" data-html2canvas-ignore="true">
            {!isCheckingOut ? (
              <button className="cart-drawer-checkout-btn" onClick={() => setIsCheckingOut(true)}>
                Proceed to Checkout <ChevronRight size={18} />
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setIsCheckingOut(false)} 
                    style={{ flex: 1, padding: '0.9rem', borderRadius: '10px' }}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    form="cart-checkout-form"
                    className="cart-drawer-checkout-btn" 
                    style={{ flex: 2 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <><Loader2 size={18} className="spinner" /> Booking...</> : 'Confirm Booking'}
                  </button>
                </div>
                <button 
                  type="button"
                  onClick={handleSkipPayment}
                  className="btn-secondary" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontSize: '0.9rem', opacity: 0.8 }}
                  disabled={isSubmitting}
                >
                  Skip Payment (Test Mode)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
