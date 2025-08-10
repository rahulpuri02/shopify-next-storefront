"use client";

import { CollectionProduct } from "@/types/shared";
import { createContext, useContext, useState } from "react";

type ContextProps = {
  favItems: CollectionProduct[];
  handleFavState: (product: CollectionProduct) => void;
  isProductInFavorites: (product: CollectionProduct) => boolean;
};

type ComponentProps = {
  children: React.ReactNode;
};

const FavoriteContext = createContext<ContextProps | null>(null);

export function FavoriteProvider({ children }: ComponentProps) {
  function getFavorites() {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [];
  }

  const [favItems, setFavItems] = useState<CollectionProduct[]>(getFavorites());

  function isProductInFavorites(selectedProduct: CollectionProduct) {
    return favItems.some((i) => i.id === selectedProduct.id);
  }

  function handleFavState(selectedProduct: CollectionProduct) {
    const isAlreadyAdded = isProductInFavorites(selectedProduct);
    const newItems = !isAlreadyAdded
      ? [...favItems, selectedProduct]
      : favItems.filter((i) => i.handle !== selectedProduct.handle);
    localStorage.setItem("favorites", JSON.stringify(newItems));
    setFavItems(newItems);
  }

  return (
    <FavoriteContext.Provider value={{ favItems, handleFavState, isProductInFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) throw "Context should be used inside the provider only";

  return context;
}
