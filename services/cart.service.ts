import "server-only";

import { TAGS } from "@/constants/shopify";
import { reshapeCart } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  addToCartMutation,
  createCartMutation,
  removeFromCartMutation,
  updateCartMutation,
} from "@/lib/shopify/mutations/cart";
import { getCartQuery } from "@/lib/shopify/queries/cart";
import {
  ShopifyAddToCartOperation,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "@/types/shopify";
import { print } from "graphql";
import { cookies } from "next/headers";
import { Cart } from "@/types/shared";

class CartService {
  async createCart() {
    try {
      const response = await shopifyFetch<ShopifyCreateCartOperation>({
        query: print(createCartMutation),
        cache: "no-cache",
        tags: [TAGS.cart],
      });
      const cart = reshapeCart(response.body.data!.cartCreate!.cart);
      (await cookies()).set("cartId", cart!.cartId);
      return cart;
    } catch (error) {
      console.error("Error while creating new cart:", error);
      throw error;
    }
  }

  async getCart() {
    try {
      const cartId = (await cookies()).get("cartId")?.value;
      if (!cartId) {
        const cart = await this.createCart();
        return cart;
      } else {
        const response = await shopifyFetch<ShopifyCartOperation>({
          query: print(getCartQuery),
          variables: { id: cartId },
          cache: "no-cache",
          tags: [TAGS.cart],
        });
        return reshapeCart(response.body.data.cart);
      }
    } catch (error) {
      console.error("Error while getting cart:", error);
      return null;
    }
  }

  async addToCart(lines: { merchandiseId: string; quantity: number }[]) {
    try {
      const cartId = (await cookies()).get("cartId")?.value!;
      const response = await shopifyFetch<ShopifyAddToCartOperation>({
        query: print(addToCartMutation),
        variables: {
          cartId,
          lines,
        },
        cache: "no-cache",
        tags: [TAGS.cart],
      });
      return reshapeCart(response.body.data.cartLinesAdd.cart);
    } catch (error) {
      console.error("Error while adding item to cart:", error);
      return "Error while adding item to cart";
    }
  }

  async updateCart(
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ): Promise<Cart> {
    const cartId = (await cookies()).get("cartId")?.value!;
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
      query: print(updateCartMutation),
      variables: {
        cartId,
        lines,
      },
      cache: "no-cache",
      tags: [TAGS.cart],
    });

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
  }

  async removeFromCart(lineIds: string[]): Promise<Cart> {
    try {
      const cartId = (await cookies()).get("cartId")?.value!;
      const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
        query: print(removeFromCartMutation),
        variables: {
          cartId,
          lineIds,
        },
        cache: "no-cache",
        tags: [TAGS.cart],
      });

      return reshapeCart(res.body.data.cartLinesRemove.cart);
    } catch (error) {
      console.error("Error while adding item to cart:", error);
      throw error;
    }
  }
}

export const cartService = new CartService();
