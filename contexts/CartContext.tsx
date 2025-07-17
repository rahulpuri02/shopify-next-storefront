"use client";

import { CartItem } from "@/types/shared";
import React, { useContext, useState } from "react";

type ContextProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

type ComponentProps = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<ContextProps | null>(null);

export function CartProvider({ children }: ComponentProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw "Context should be used inside the provider only";
  return context;
}
