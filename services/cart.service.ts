import "server-only";

import { reshapeCart } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  ShopifyAddToCartOperation,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
} from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";
import { cookies } from "next/headers";
import { TAGS } from "@/constants/shopify";

class CartService {
  async createCart() {
    const query = gql`
      mutation createCart {
        cartCreate {
          cart {
            id
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                      availableForSale
                      currentlyNotInStock
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        altText
                        url
                      }
                      product {
                        title
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                  quantity
                  estimatedCost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const response = await shopifyFetch<ShopifyCreateCartOperation>({
        query: print(query),
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
    const query = gql`
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    currentlyNotInStock
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      altText
                      url
                    }
                    product {
                      title
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const cartId = (await cookies()).get("cartId")?.value;
      if (!cartId) {
        const cart = await this.createCart();
        return cart;
      } else {
        const response = await shopifyFetch<ShopifyCartOperation>({
          query: print(query),
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
      const query = gql`
        mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
              }
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        availableForSale
                        currentlyNotInStock
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          altText
                          url
                        }
                        selectedOptions {
                          name
                          value
                        }
                        product {
                          title
                        }
                      }
                    }
                    quantity
                    estimatedCost {
                      subtotalAmount {
                        amount
                        currencyCode
                      }
                      totalAmount {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const response = await shopifyFetch<ShopifyAddToCartOperation>({
        query: print(query),
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
