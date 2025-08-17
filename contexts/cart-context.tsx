"use client";

import { getCart } from "@/app/actions/cart";
import type { Cart } from "@/types/shared";
import React, { useContext, useEffect, useState } from "react";

type ContextProps = {
  showCart: (value: boolean) => void;
  cart: Cart | undefined;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
  isShowCart: boolean;
};

type ComponentProps = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<ContextProps | null>(null);

export function CartProvider({ children }: ComponentProps) {
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
    <CartContext.Provider value={{ showCart, isShowCart, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw "Context should be used inside the provider only";
  return context;
}
