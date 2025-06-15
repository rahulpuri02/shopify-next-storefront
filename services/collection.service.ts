import { reshapeCollection } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import { Collection, ShopifyCollectionOperation } from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";

class CollectionService {
  async getCollection(
    handle: string,
    productCount = 5,
    imageCount = 2
  ): Promise<Collection | null> {
    const query = gql`
      query getCollection($handle: String!, $productCount: Int!, $imageCount: Int!) {
        collection(handle: $handle) {
          title
          description
          products(first: $productCount) {
            edges {
              node {
                id
                title
                handle
                images(first: $imageCount) {
                  edges {
                    node {
                      url
                      altText
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
      console.log("Error while fetching collection:", error);
      return null;
    }
  }
}

export const collectionService = new CollectionService();
