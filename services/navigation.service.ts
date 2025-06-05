import { environment } from "@/environment";
import { TAGS } from "@/constants/shopify";
import { shopifyFetch } from "@/lib/shopify/client";
import type { Menu } from "@/types/navigation/types";
import type { ShopifyMenuOperation } from "@/types/shopify/types";
import { print } from "graphql";
import gql from "graphql-tag";

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

    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: print(query),
      tags: [TAGS.collections],
      variables: {
        handle,
      },
    });

    return (
      res.body?.data?.menu?.items.map((item) => ({
        title: item.title.trim(),
        path: item.url.replace(environment.Shopify_STORE_DOMAIN, "").replace("/pages", ""),
        items:
          item.items?.map((subItem) => ({
            title: subItem.title.trim(),
            path: subItem.url.replace(environment.Shopify_STORE_DOMAIN, "").replace("/pages", ""),
          })) || [],
      })) || []
    );
  }
}

export const navigationService = new NavigationService();
