import { shopifyFetch } from "@/lib/shopify/client";
import gql from "graphql-tag";
import { print } from "graphql";
import { ShopifyPageOperation } from "@/types/shopify";

class PageService {
  async getPageData(handle: string) {
    console;
    const query = gql`
      query getPageByHandle($handle: String!) {
        pageByHandle(handle: $handle) {
          id
          title
          handle
          body
          bodySummary
          seo {
            title
            description
          }
        }
      }
    `;
    try {
      const response = await shopifyFetch<ShopifyPageOperation>({
        query: print(query),
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
