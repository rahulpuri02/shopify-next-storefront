import { shopifyFetch } from "@/lib/shopify/client";
import { getPageQuery } from "@/lib/shopify/queries/page";
import { ShopifyPageOperation } from "@/types/shopify";
import { print } from "graphql";

class PageService {
  async getPageData(handle: string) {
    try {
      const response = await shopifyFetch<ShopifyPageOperation>({
        query: print(getPageQuery),
        variables: { handle },
      });
      return response?.body?.data?.pageByHandle || null;
    } catch (error) {
      console.error("Error fetching page data:", error);
      return null;
    }
  }
}

export const pageService = new PageService();
