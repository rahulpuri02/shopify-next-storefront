import "server-only";

import { TAGS } from "@/constants/shopify";
import { reshapeCart } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import { addToCartMutation, createCartMutation } from "@/lib/shopify/mutations/cart";
import { getCartQuery } from "@/lib/shopify/queries/cart";
import {
  ShopifyAddToCartOperation,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
} from "@/types/shopify";
import { print } from "graphql";
import { cookies } from "next/headers";

class CartService {
  async createCart() {
    try {
      const response = await shopifyFetch<ShopifyCreateCartOperation>({
        query: print(createCartMutation),
        cache: "no-cache",
      });
      const cart = reshapeCart(response.body.data!.cartCreate!.cart);
      (await cookies()).set("cartId", cart!.cartId);
      return reshapeCart(response.body.data!.cartCreate!.cart);
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
      });
      return reshapeCart(response.body.data.cartLinesAdd.cart);
    } catch (error) {
      console.error("Error while adding item to cart:", error);
    }
  }
}

export const cartService = new CartService();
