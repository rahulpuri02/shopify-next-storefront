import { COLLECTION_PRODUCT_IMAGES_COUNT } from "@/constants/shared";
import {
  DEFAULT_COLLECTIONS_COUNT,
  DEFAULT_PRODUCTS_COUNT,
  SHOPIFY_CUSTOM_METAFIELDS,
} from "@/constants/shopify";
import { reshapeCollection, reshapeCollections } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import { getCollectionQuery, getCollectionsQuery } from "@/lib/shopify/queries/collection";
import type { Collection } from "@/types/shared";
import type { ShopifyCollectionOperation, ShopifyCollectionsOperation } from "@/types/shopify";
import { print } from "graphql";

class CollectionService {
  async getCollection(
    handle: string,
    productCount = DEFAULT_PRODUCTS_COUNT,
    imageCount = COLLECTION_PRODUCT_IMAGES_COUNT
  ): Promise<Collection | null> {
    try {
      const response = await shopifyFetch<ShopifyCollectionOperation>({
        query: print(getCollectionQuery),
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
    try {
      const response = await shopifyFetch<ShopifyCollectionsOperation>({
        query: print(getCollectionsQuery),
        variables: { count, key, namespace: SHOPIFY_CUSTOM_METAFIELDS.name },
      });
      return reshapeCollections(response.body, { key, value });
    } catch (error) {
      console.error("Error while fetching collections", error);
    }
  }
}

export const collectionService = new CollectionService();
