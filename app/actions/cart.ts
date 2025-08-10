"use server";

import { reshapeCart } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import { ShopifyCartOperation, ShopifyCreateCartOperation } from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";
import { cookies } from "next/headers";

export async function getCart() {
  const query = gql`
    query getCart($id: ID!) {
      cart(id: $id)
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
    const cartId = (await cookies()).get("cart")?.value;
    if (!cartId) {
      const response = await createCart();
      return reshapeCart(response);
    } else {
      const response = await shopifyFetch<ShopifyCartOperation>({
        query: print(query),
        variables: { id: cartId },
        cache: "no-cache",
      });
      return reshapeCart(response.body.data.cart);
    }
  } catch (error) {
    console.error("Error while getting cart:", error);
    return null;
  }
}

export async function createCart() {
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
    (await cookies()).set("cartId", cart!.id);
    return reshapeCart(response.body.data!.cartCreate!.cart);
  } catch (error) {
    console.error("Error while creating new cart:", error);
    throw error;
  }
}
