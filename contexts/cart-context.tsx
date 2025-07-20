"use client";

import { CartItem } from "@/types/shared";
import React, { useContext, useState } from "react";

type ContextProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  showCart: (value: boolean) => void;
  isShowCart: boolean;
};

type ComponentProps = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<ContextProps | null>(null);

export function CartProvider({ children }: ComponentProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isShowCart, setIsShowCart] = useState(false);

  function showCart(isShow: boolean) {
    setIsShowCart(isShow);
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, showCart, isShowCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw "Context should be used inside the provider only";
  return context;
}
