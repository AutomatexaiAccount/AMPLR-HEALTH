import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // state: { items: Array of { type: 'service' | 'sub_service', id: string, title: string, price: number, parentServiceTitle?: string } }
  const [cart, setCart] = useState({ items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amplr_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart', err);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('amplr_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      // Check if already exists
      const exists = prev.items.find(i => i.id === item.id);
      if (exists) return prev;
      return { ...prev, items: [...prev.items, item] };
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const [globalDiscounts, setGlobalDiscounts] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    const fetchGlobalDiscounts = async () => {
      try {
        const { data, error } = await supabase.from('promo_codes')
          .select('*')
          .eq('is_auto_apply', true)
          .eq('is_active', true);
        
        if (!error && data) {
          setGlobalDiscounts(data);
        }
      } catch (err) {
        console.error('Error fetching global discounts:', err);
      }
    };
    fetchGlobalDiscounts();
  }, []);

  const clearCart = () => {
    setCart({ items: [] });
    setAppliedPromo(null);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartTotal = cart.items.reduce((total, item) => total + Number(item.price || 0), 0);
  
  // Calculate Discount
  let bestGlobalDiscount = null;
  let maxGlobalDiscountAmount = 0;

  if (globalDiscounts.length > 0) {
    if (cartTotal > 0) {
      globalDiscounts.forEach(discount => {
        let amount = 0;
        if (discount.discount_type === 'percentage') {
          amount = (cartTotal * discount.discount_amount) / 100;
        } else {
          amount = discount.discount_amount;
        }
        
        if (amount > cartTotal) amount = cartTotal;

        if (amount > maxGlobalDiscountAmount) {
          maxGlobalDiscountAmount = amount;
          bestGlobalDiscount = discount;
        }
      });
      if (!bestGlobalDiscount) bestGlobalDiscount = globalDiscounts[0];
    } else {
      bestGlobalDiscount = globalDiscounts[0];
    }
  }

  let discountAmount = 0;
  let activeDiscount = appliedPromo || bestGlobalDiscount;

  if (activeDiscount && cartTotal > 0) {
    if (activeDiscount.discount_type === 'percentage') {
      discountAmount = (cartTotal * activeDiscount.discount_amount) / 100;
    } else {
      discountAmount = activeDiscount.discount_amount;
    }
    // Cap discount at cart total
    if (discountAmount > cartTotal) {
      discountAmount = cartTotal;
    }
  }

  const subtotalAfterDiscount = cartTotal - discountAmount;

  const grandTotal = subtotalAfterDiscount;

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal,
      discountAmount,
      activeDiscount,
      appliedPromo,
      setAppliedPromo,
      globalDiscount: bestGlobalDiscount,
      grandTotal,
      isCartOpen, 
      setIsCartOpen, 
      toggleCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
