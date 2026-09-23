import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const ServiceCartBlock = ({ searchTitle }) => {
  const { addToCart, cart, setIsCartOpen } = useCart();
  const [subServices, setSubServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data: allServices } = await supabase
          .from('services')
          .select('id, title, price');
        
        if (allServices) {
          // Normalize search title
          const normalizedSearch = searchTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          // Find best match
          let serviceData = allServices.find(s => {
            const normalizedTitle = s.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            return normalizedTitle.includes(normalizedSearch) || normalizedSearch.includes(normalizedTitle);
          });
          
          // Fallback: Check if first two words match
          if (!serviceData && searchTitle.split(' ').length >= 2) {
            const firstTwoWords = searchTitle.split(' ').slice(0, 2).join('').toLowerCase();
            serviceData = allServices.find(s => s.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(firstTwoWords));
          }

          if (serviceData) {
            setServiceDetails(serviceData);
            const { data: subData } = await supabase
              .from('sub_services')
              .select('*')
              .eq('service_id', serviceData.id)
              .eq('is_active', true)
              .order('title', { ascending: true });
            
            if (subData) setSubServices(subData);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (searchTitle) {
      fetchServiceData();
    }
  }, [searchTitle]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Loader2 className="adm-spin" /></div>;

  return (
    <div className="service-cart-block" style={{ marginTop: '2rem', background: '#f8fafc', padding: '2rem', borderRadius: '15px' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--navy-dark)', fontSize: '1.2rem', textAlign: 'center' }}>
        {subServices.length > 0 ? 'Available Options & Tests' : 'Book this Service'}
      </h3>
      
      {subServices.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {subServices.map(sub => {
            const isSelected = cart.items.some(i => i.id === sub.id);
            return (
              <label key={sub.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px', background: isSelected ? 'rgba(193, 18, 31, 0.05)' : '#ffffff',
                border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => {
                    if (!isSelected) {
                      addToCart({ type: 'sub_service', id: sub.id, title: sub.title, price: sub.price, serviceId: serviceDetails?.id });
                    }
                  }}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <span style={{ flex: 1, fontSize: '1rem', color: 'var(--slate-dark)' }}>{sub.title}</span>
                <span style={{ fontWeight: '600', color: 'var(--navy-dark)' }}>₹{sub.price}</span>
              </label>
            );
          })}
        </div>
      )}

      <div className="pricing-cta" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {serviceDetails && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (!cart.items.some(i => i.id === serviceDetails.id)) {
                addToCart({ type: 'service', id: serviceDetails.id, title: serviceDetails.title, price: serviceDetails.price });
              } else {
                setIsCartOpen(true);
              }
            }} 
            className="btn-primary" 
            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            {cart.items.some(i => i.id === serviceDetails?.id) ? 'Main Service Added ✓' : `Add General Service (₹${serviceDetails.price})`}
          </button>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }} 
          className="btn-secondary" 
          style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', textAlign: 'center' }}
        >
          View Cart & Complete Booking
        </button>
      </div>
    </div>
  );
};

export default ServiceCartBlock;
