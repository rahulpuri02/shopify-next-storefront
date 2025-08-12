"use client";

import { getCart } from "@/app/actions/cart";
import type { Cart, CartItem } from "@/types/shared";
import React, { useContext, useEffect, useState } from "react";

type ContextProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  showCart: (value: boolean) => void;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  isShowCart: boolean;
};

type ComponentProps = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<ContextProps | null>(null);

export function CartProvider({ children }: ComponentProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isShowCart, setIsShowCart] = useState(false);
  const [cart, setCart] = useState<Cart>();

  function showCart(isShow: boolean) {
    setIsShowCart(isShow);
  }

  useEffect(() => {
    const initCart = async () => {
      try {
        const cart = await getCart();
        cart && setCart(cart);
      } catch (error) {
        console.error("Error initializing cart:", error);
      }
    };

    initCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, showCart, isShowCart, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw "Context should be used inside the provider only";
  return context;
}
