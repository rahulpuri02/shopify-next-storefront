import { environment } from "@/environment";
import { TAGS } from "@/lib/constants/shopify";
import { shopifyFetch } from "@/lib/shopify/client";
import { Menu } from "@/types/navigation/types";
import { ShopifyMenuOperation } from "@/types/shopify/types";
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
      res.body?.data?.menu?.items.map(
        (item: { title: string; url: string }) => ({
          title: item.title,
          path: item.url
            .replace(environment.SHOPIFY_STORE_DOMAIN, "")
            .replace(TAGS.collections, "search")
            .replace("/pages", ""),
        })
      ) || []
    );
  }
}

export const navigationService = new NavigationService();
