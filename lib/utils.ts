import { FILTER_OPERATIONS } from "@/constants/shared";
import { SHOPIFY_URL_PREFIXS } from "@/constants/shopify";
import { environment } from "@/environment";
import { FilterOperation, Menu } from "@/types/shared";
import { Collection, ShopifyCollectionOperation, ShopifyMenuOperation } from "@/types/shopify";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterMenuItems(
  items: Menu[],
  pathsToFilter: string[] = [],
  operation: FilterOperation
) {
  return items.filter((item) => {
    const isMatch = pathsToFilter.includes(item.path.trim());
    return operation === FILTER_OPERATIONS.include ? isMatch : !isMatch;
  });
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

export function reshapeMenus(response: ShopifyMenuOperation): Menu[] {
  const items = response.data.menu?.items;
  if (!items) return [];
  return (
    items.map((item) => ({
      title: item.title.trim(),
      path: item.url
        .replace(environment.Shopify_STORE_DOMAIN, "")
        .replace(SHOPIFY_URL_PREFIXS.pages, "")
        .replace(SHOPIFY_URL_PREFIXS.collections, ""),
      items:
        item.items?.map((subItem) => ({
          title: subItem.title.trim(),
          path: subItem.url
            .replace(environment.Shopify_STORE_DOMAIN, "")
            .replace(SHOPIFY_URL_PREFIXS.pages, "")
            .replace(SHOPIFY_URL_PREFIXS.collections, ""),
        })) || [],
    })) || []
  );
}
