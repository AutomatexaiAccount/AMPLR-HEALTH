import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Loader2, ShoppingCart, CheckCircle2, ChevronRight } from 'lucide-react';

const ServiceCartBlock = ({ searchTitle }) => {
  const navigate = useNavigate();
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
          const normalizedSearch = searchTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          let serviceData = allServices.find(s => {
            const normalizedTitle = s.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            return normalizedTitle.includes(normalizedSearch) || normalizedSearch.includes(normalizedTitle);
          });
          
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

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem' }}>
      <Loader2 size={28} style={{ color: '#c1121f', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  const isMainAdded = cart.items.some(i => i.id === serviceDetails?.id);
  const selectedCount = cart.items.filter(i => subServices.some(s => s.id === i.id)).length;

  return (
    <div style={{
      background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 24px rgba(15,23,42,0.08)',
      overflow: 'hidden',
      marginTop: '2rem',
    }}>
      {/* Header Strip */}
      <div style={{
        background: 'linear-gradient(135deg, #c1121f 0%, #9b0f18 100%)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <ShoppingCart size={18} color="white" />
        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.2px' }}>
          {subServices.length > 0 ? `Book Options & Tests` : `Book this Service`}
        </span>
        {selectedCount > 0 && (
          <span style={{
            marginLeft: 'auto', background: 'rgba(255,255,255,0.2)',
            color: 'white', borderRadius: '50px', fontSize: '0.75rem',
            fontWeight: 700, padding: '2px 10px', border: '1px solid rgba(255,255,255,0.3)'
          }}>
            {selectedCount} selected
          </span>
        )}
      </div>

      <div style={{ padding: '1.25rem 1.5rem' }}>
        {/* Sub-services checklist */}
        {subServices.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontSize: '0.78rem !important', fontWeight: 700, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.75rem'
            }}>
              Available Options
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {subServices.map(sub => {
                const isSelected = cart.items.some(i => i.id === sub.id);
                return (
                  <label key={sub.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '0.85rem 1rem',
                    background: isSelected ? 'rgba(193,18,31,0.04)' : '#f8fafc',
                    border: `1.5px solid ${isSelected ? '#c1121f' : '#e2e8f0'}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(193,18,31,0.1)' : 'none',
                  }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                      border: `2px solid ${isSelected ? '#c1121f' : '#cbd5e1'}`,
                      background: isSelected ? '#c1121f' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.18s ease',
                    }}>
                      {isSelected && <CheckCircle2 size={13} color="white" strokeWidth={3} />}
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={async () => {
                        const { data: { session } } = await supabase.auth.getSession();
                        if (!session) {
                          navigate('/login');
                          return;
                        }
                        if (!isSelected) {
                          addToCart({ type: 'sub_service', id: sub.id, title: sub.title, price: sub.price, serviceId: serviceDetails?.id });
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <span style={{ flex: 1, fontSize: '0.92rem', color: '#1e293b', fontWeight: 500 }}>{sub.title}</span>
                    <span style={{
                      fontWeight: 800, color: isSelected ? '#c1121f' : '#334155',
                      fontSize: '0.9rem', flexShrink: 0
                    }}>₹{sub.price}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        {subServices.length > 0 && (
          <div style={{ borderTop: '1px dashed #e2e8f0', marginBottom: '1.25rem' }} />
        )}

        {/* Main service add button */}
        {serviceDetails && (
          <button
            onClick={async () => {
              const { data: { session } } = await supabase.auth.getSession();
              if (!session) {
                navigate('/login');
                return;
              }
              if (!isMainAdded) {
                addToCart({ type: 'service', id: serviceDetails.id, title: serviceDetails.title, price: serviceDetails.price });
              } else {
                setIsCartOpen(true);
              }
            }}
            style={{
              width: '100%',
              padding: '0.9rem 1.5rem',
              background: isMainAdded
                ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                : 'linear-gradient(135deg, #c1121f 0%, #9b0f18 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '0.65rem',
              transition: 'all 0.2s ease',
              boxShadow: isMainAdded ? '0 4px 15px rgba(22,163,74,0.25)' : '0 4px 15px rgba(193,18,31,0.25)',
              letterSpacing: '0.1px',
            }}
          >
            {isMainAdded
              ? <><CheckCircle2 size={18} /> Added to Cart</>
              : <><ShoppingCart size={18} /> Add Service to Cart &nbsp;·&nbsp; ₹{serviceDetails.price}</>
            }
          </button>
        )}

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: '#334155',
            border: '1.5px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c1121f'; e.currentTarget.style.color = '#c1121f'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
        >
          View Cart & Complete Booking <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCartBlock;
