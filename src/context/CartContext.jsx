import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
            return prev.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            );
        } else {
            return [...prev, item];
        }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
