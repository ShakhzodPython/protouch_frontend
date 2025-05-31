import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CartItemType,
  CartProviderPropsType,
} from '../components/Cart/Cart.types';
import { ProductType } from '../types/productService.types';
import { CartContext } from '../contexts/CartContext';

export function CartProvider({ children }: CartProviderPropsType) {
  const [cart, setCart] = useState<Array<CartItemType>>([]);

  // Load cart from local storage, when the apps start
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = useCallback((product: ProductType) => {
    setCart((prev) => {
      const productExist = prev.find((item) => item.product.id === product.id);
      if (productExist) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  }, []);

  // Update product quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  // Remove product from cart
  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const values = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
