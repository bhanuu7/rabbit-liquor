import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (product) => {
    setCartProducts((prev) => {
      const productExists = prev?.[product.id];
      return {
        ...prev,
        [product.id]: productExists
          ? { ...productExists, quantity: productExists.quantity + 1 }
          : { product, quantity: 1 },
      };
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  const removeFromCart = (product) => {
    setCartProducts((prev) => {
      const existingItem = prev[product.id];

      // 🛑 Safety check
      if (!existingItem) return prev;

      if (existingItem.quantity > 1) {
        return {
          ...prev,
          [product.id]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        };
      } else {
        const newCart = { ...prev };
        delete newCart[product.id];
        return newCart;
      }
    });
  };

  const getCartCount = () => {
    if (!cartProducts) return;
    return Object.values(cartProducts).reduce(
      (total, item) => total + item.quantity,
      0,
    );
  };

  const getProductCount = (productId) => {
    if (!cartProducts) return 0;
    return (
      Object.values(cartProducts).filter(
        (product) => product.product.id === productId,
      )[0]?.quantity || 0
    );
  };

  const getCartTotal = () => {
    if (!cartProducts) return;
    return Object.values(cartProducts).reduce(
      (total, item) => total + Number(item.product.price) * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cartProducts,
        getCartCount,
        getProductCount,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) return;
  return cart;
}
