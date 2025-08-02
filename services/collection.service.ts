import { COLLECTION_PRODUCT_IMAGES_COUNT } from "@/constants/shared";
import {
  DEFAULT_COLLECTIONS_COUNT,
  DEFAULT_PRODUCTS_COUNT,
  SHOPIFY_CUSTOM_METAFIELDS,
} from "@/constants/shopify";
import { reshapeCollection, reshapeCollections } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import type { Collection } from "@/types/shared";
import type { ShopifyCollectionOperation, ShopifyCollectionsOperation } from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";

class CollectionService {
  async getCollection(
    handle: string,
    productCount = DEFAULT_PRODUCTS_COUNT,
    imageCount = COLLECTION_PRODUCT_IMAGES_COUNT
  ): Promise<Collection | null> {
    const query = gql`
      query getCollection($handle: String!, $productCount: Int!, $imageCount: Int!) {
        collection(handle: $handle) {
          title
          description
          descriptionHtml
          products(first: $productCount) {
            edges {
              node {
                id
                title
                handle
                description
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
                images(first: $imageCount) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: $productCount) {
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
          }
        }
      }
    `;
    try {
      const response = await shopifyFetch<ShopifyCollectionOperation>({
        query: print(query),
        variables: {
          handle,
          productCount,
          imageCount,
        },
      });
      return reshapeCollection(response.body);
    } catch (error) {
      console.error("Error while fetching collection:", error);
      return null;
    }
  }

  async getCollections({
    count = DEFAULT_COLLECTIONS_COUNT,
    key = SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.key,
    value = SHOPIFY_CUSTOM_METAFIELDS.collections.homepageType.values.highlights,
  }: {
    count?: number;
    key?: string;
    value?: string;
  }) {
    const query = gql`
      query getCollections($count: Int!, $key: String!, $namespace: String!) {
        collections(first: $count) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                altText
                url
              }
              metafield(namespace: $namespace, key: $key) {
                key
                value
              }
            }
          }
        }
      }
    `;
    try {
      const response = await shopifyFetch<ShopifyCollectionsOperation>({
        query: print(query),
        variables: { count, key, namespace: SHOPIFY_CUSTOM_METAFIELDS.name },
      });
      return reshapeCollections(response.body, { key, value });
    } catch (error) {
      console.error("Error while fetching collections", error);
    }
  }
}

export const collectionService = new CollectionService();
