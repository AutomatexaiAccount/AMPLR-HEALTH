import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const clearCart = () => {
    setCart({ items: [] });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartTotal = cart.items.reduce((total, item) => total + Number(item.price || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal, 
      isCartOpen, 
      setIsCartOpen, 
      toggleCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
