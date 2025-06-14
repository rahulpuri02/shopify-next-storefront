import { TAGS } from "@/constants/shopify";
import { shopifyFetch } from "@/lib/shopify/client";
import type { ShopifyMenuOperation } from "@/types/shopify";
import { print } from "graphql";
import gql from "graphql-tag";
import { Menu } from "@/types/shared";
import { reshapeMenus } from "@/lib/server-utils";

class NavigationService {
  async getMenu(handle: string): Promise<Menu[]> {
    const query = gql`
      query getMenu($handle: String!) {
        menu(handle: $handle) {
          items {
            title
            url
            items {
              title
              url
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch<ShopifyMenuOperation>({
        query: print(query),
        tags: [TAGS.collections],
        variables: {
          handle,
        },
      });

      return reshapeMenus(response.body);
    } catch (error) {
      console.log("Error while fetching menu:", error);
      return [];
    }
  }
}

export const navigationService = new NavigationService();
