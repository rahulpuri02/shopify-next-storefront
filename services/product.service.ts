import { TAGS } from "@/constants/shopify";
import { reshapeProduct, reshapeProducts, reshapeSearchResults } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getSearchResultsQuery,
} from "@/lib/shopify/queries/product";
import type { Product } from "@/types/shared";
import type {
  ShopifyProductOperation,
  ShopifyRecommendedProductsOperation,
  ShopifySearchResultsOperation,
} from "@/types/shopify";
import { print } from "graphql";

class ProductService {
  async getProduct(handle: string): Promise<Product | null> {
    try {
      const response = await shopifyFetch<ShopifyProductOperation>({
        query: print(getProductQuery),
        variables: {
          handle,
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
    try {
      const response = await shopifyFetch<ShopifyRecommendedProductsOperation>({
        query: print(getProductRecommendationsQuery),
        tags: [TAGS.products],
        variables: {
          productHandle,
        },
      });
      return reshapeProducts(response.body);
    } catch (error) {
      console.error("Error while getting product recommendations:", error);
      return null;
    }
  }

  async getSearchResults(searchQuery: string) {
    try {
      const response = await shopifyFetch<ShopifySearchResultsOperation>({
        query: print(getSearchResultsQuery),
        variables: {
          query: searchQuery,
          first: 50,
        },
        tags: [TAGS.products],
      });
      return reshapeSearchResults(response.body);
    } catch (error) {
      console.error("Error while searching products:", error);
      return null;
    }
  }
}

export const productService = new ProductService();
