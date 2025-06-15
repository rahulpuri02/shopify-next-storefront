"server-only";

import { SHOPIFY_URL_PREFIXS } from "@/constants/shopify";
import { environment } from "@/environment";
import type { Menu } from "@/types/shared";
import type { Collection, ShopifyCollectionOperation, ShopifyMenuOperation } from "@/types/shopify";

export function reshapeMenus(response: ShopifyMenuOperation): Menu[] {
  const items = response.data.menu?.items;
  if (!items) return [];
  return (
    items.map((item) => ({
      title: item.title.trim(),
      path: item.url
        .replace(environment.Shopify_STORE_DOMAIN ?? "", "")
        .replace(SHOPIFY_URL_PREFIXS.pages, "")
        .replace(SHOPIFY_URL_PREFIXS.collections, ""),
      items:
        item.items?.map((subItem) => ({
          title: subItem.title.trim(),
          path: subItem.url
            .replace(environment.Shopify_STORE_DOMAIN ?? "", "")
            .replace(SHOPIFY_URL_PREFIXS.pages, "")
            .replace(SHOPIFY_URL_PREFIXS.collections, ""),
        })) || [],
    })) || []
  );
}

export function reshapeCollection(response: ShopifyCollectionOperation): Collection | null {
  const collection = response.data.collection;
  if (!collection) return null;
  return {
    title: collection.title.trim(),
    description: collection.description.trim(),
    products: collection.products.edges.map((edge) => {
      const product = edge.node;
      const image = product.images.edges[0]?.node;

      return {
        id: product.id,
        title: product.title.trim(),
        handle: product.handle,
        imageUrl: image?.url || null,
        imageAlt: image?.altText || null,
      };
    }),
  };
}
