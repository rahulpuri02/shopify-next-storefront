import { reshapeMenus } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import { getMenuQuery } from "@/lib/shopify/queries/navigation";
import { Menu } from "@/types/shared";
import type { ShopifyMenuOperation } from "@/types/shopify";
import { print } from "graphql";

class NavigationService {
  async getMenu(handle: string): Promise<Menu[]> {
    try {
      const response = await shopifyFetch<ShopifyMenuOperation>({
        query: print(getMenuQuery),
        variables: {
          handle,
        },
      });

      return reshapeMenus(response.body);
    } catch (error) {
      console.error("Error while fetching menu:", error);
      return [];
    }
  }
}

export const navigationService = new NavigationService();
