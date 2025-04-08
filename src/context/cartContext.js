import React, { createContext, useContext, useState } from "react";

<<<<<<< HEAD
// Создаём контекст
const CartContext = createContext();

// Хук для использования контекста
=======
const CartContext = createContext();
>>>>>>> main
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

<<<<<<< HEAD
  // Добавление товара в корзину
=======
>>>>>>> main
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
<<<<<<< HEAD
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
=======
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: (cartItem.quantity + 1) * cartItem.price }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, totalPrice: item.price }];
>>>>>>> main
      }
    });
  };

<<<<<<< HEAD
  // Функция обновления количества товара
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
=======
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity), totalPrice: Math.max(1, newQuantity) * item.price }
          : item
>>>>>>> main
      )
    );
  };

<<<<<<< HEAD
  // Удаление товара из корзины
=======
>>>>>>> main
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


<<<<<<< HEAD

=======
>>>>>>> main
