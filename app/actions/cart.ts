"use server";

import { TAGS } from "@/constants/shopify";
import { cartService } from "@/services/cart.service";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
    const cart = await cartService.addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
    return cart;
  } catch {
    return "Error adding item to cart";
  }
}

export async function removeItem(merchandiseId: string) {
  try {
    const cart = await getCart();
    if (!cart) {
      return "Error fetching cart";
    }

    const item = cart.items.find((items) => items.merchandiseId === merchandiseId);

    if (item && item.id) {
      const cart = await cartService.removeFromCart([item.id]);
      revalidateTag(TAGS.cart);
      return cart;
    } else {
      return "Item not found in cart";
    }
  } catch {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(merchandiseId: string, quantity: number) {
  try {
    const cart = await getCart();
    if (!cart) return "Error fetching cart";

    const item = cart.items.find((i) => i.merchandiseId === merchandiseId);

    if (item?.id) {
      if (quantity === 0) {
        return await removeItem(item.merchandiseId);
      }

      const updatedCart = await cartService.updateCart([{ id: item.id, merchandiseId, quantity }]);
      revalidateTag(TAGS.cart);
      return updatedCart;
    }

    if (quantity > 0) {
      const updatedCart = await cartService.addToCart([{ merchandiseId, quantity }]);
      revalidateTag(TAGS.cart);
      return updatedCart;
    }

    return cart;
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  redirect(cart!.checkoutUrl);
}
