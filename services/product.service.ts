import { DEFAULT_IMAGES_COUNT, DEFAULT_VARIANTS_COUNT, TAGS } from "@/constants/shopify";
import { reshapeProduct, reshapeProducts } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import type { Product } from "@/types/shared";
import type { ShopifyProductOperation, ShopifyRecommendedProductsOperation } from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";

class ProductService {
  async getProduct(handle: string): Promise<Product | null> {
    const query = gql`
      query getProduct($handle: String!, $imageCount: Int!, $variantCount: Int!) {
        product(handle: $handle) {
          id
          title
          description
          handle
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          images(first: $imageCount) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: $variantCount) {
            edges {
              node {
                id
                title
                availableForSale
                currentlyNotInStock
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch<ShopifyProductOperation>({
        query: print(query),
        variables: {
          handle,
          imageCount: DEFAULT_IMAGES_COUNT,
          variantCount: DEFAULT_VARIANTS_COUNT,
        },
        tags: [TAGS.products],
      });
      return reshapeProduct(response.body);
    } catch (error) {
      console.error("Error while fetching a product:", error);
      return null;
    }
  }

  async getProductRecommendations(productHandle: string) {
    const query = gql`
      query getProductRecommendations(
        $productHandle: String
        $imageCount: Int
        $variantCount: Int
      ) {
        productRecommendations(productHandle: $productHandle) {
          id
          title
          description
          handle
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          images(first: $imageCount) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: $variantCount) {
            edges {
              node {
                id
                title
                availableForSale
                currentlyNotInStock
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch<ShopifyRecommendedProductsOperation>({
        query: print(query),
        tags: [TAGS.products],
        variables: {
          productHandle,
          imageCount: DEFAULT_IMAGES_COUNT,
          variantCount: DEFAULT_VARIANTS_COUNT,
        },
      });
      return reshapeProducts(response.body);
    } catch (error) {
      console.error("Error while getting product recommendations:", error);
      return null;
    }
  }
}

export const productService = new ProductService();
