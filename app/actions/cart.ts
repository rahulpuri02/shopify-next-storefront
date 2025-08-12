"use server";

import { TAGS } from "@/constants/shopify";
import { cartService } from "@/services/cart.service";
import { revalidateTag } from "next/cache";

export async function getCart() {
  return await cartService.getCart();
}

export async function createCart() {
  return await cartService.createCart();
}

export async function addItem(selectedVariantId: string | undefined) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await cartService.addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch {
    return "Error adding item to cart";
  }
}
