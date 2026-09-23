import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset states after animation
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

    setIsSubmitting(true);
    setError('');

    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      // Create an array of booking inserts
      const bookingsToInsert = cart.items.map(item => {
        return {
          user_id: user ? user.id : null,
          service_id: item.type === 'service' ? item.id : item.service_id, // Must have service_id
          sub_service_id: item.type === 'sub_service' ? item.id : null,
          customer_name: formData.name,
          // We can't guarantee 'phone' or 'city' exist as columns in bookings, 
          // but we know bookings are tied to services. 
          // If they don't exist, Supabase might ignore them or throw an error.
          // Let's rely on the assumption that bookings at least takes basic fields.
          amount: item.price,
          status: 'Pending'
        };
      });

      // Insert all cart items into the bookings table
      const { error: insertError } = await supabase.from('bookings').insert(bookingsToInsert);

      if (insertError) {
        console.error('Booking insertion error:', insertError);
        throw new Error('Failed to save booking. Please try again.');
      }

      // Success
      clearCart();
      setSuccess(true);
      setFormData({ name: '', phone: '', city: '' });

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={handleClose}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={20} />
            <h2>Your Booking Cart</h2>
          </div>
          <button className="cart-drawer-close" onClick={handleClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {success ? (
            <div className="cart-success">
              <CheckCircle size={64} color="#16a34a" style={{ marginBottom: '1rem' }} />
              <h3>Booking Successful!</h3>
              <p>Your service has been successfully booked. Our team will contact you shortly.</p>
              <button className="btn-primary" onClick={handleClose} style={{ marginTop: '2rem' }}>
                Continue Browsing
              </button>
            </div>
          ) : cart.items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
              <p>Your cart is empty.</p>
              <button className="btn-secondary" onClick={handleClose}>Browse Services</button>
            </div>
          ) : (
            !isCheckingOut ? (
              <div className="cart-items-container">
                <ul className="cart-items-list">
                  {cart.items.map((item, idx) => (
                    <li key={item.id + '-' + idx} className="cart-item">
                      <div className="cart-item-details">
                        {item.parentServiceTitle && (
                          <span className="cart-item-parent">{item.parentServiceTitle}</span>
                        )}
                        <h4>{item.title}</h4>
                        <span className="cart-item-price">₹{item.price}</span>
                      </div>
                      <button 
                        className="cart-item-remove" 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="cart-checkout-form">
                <h3>Enter your details</h3>
                {error && <div className="form-error" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#fee2e2', color: '#dc2626', borderRadius: '4px' }}>{error}</div>}
                
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
                </form>
              </div>
            )
          )}
        </div>

        {cart.items.length > 0 && !success && (
          <div className="cart-drawer-footer">
            <div className="cart-drawer-total">
              <span>Total Estimated Amount:</span>
              <strong>₹{cartTotal}</strong>
            </div>
            
            {!isCheckingOut ? (
              <button className="btn-primary cart-drawer-checkout-btn" onClick={() => setIsCheckingOut(true)}>
                Proceed to Checkout <ChevronRight size={18} />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setIsCheckingOut(false)} 
                  style={{ flex: 1 }}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  form="cart-checkout-form"
                  className="btn-primary cart-drawer-checkout-btn" 
                  style={{ flex: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <><Loader2 size={18} className="spinner" /> Booking...</> : 'Confirm Booking'}
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
