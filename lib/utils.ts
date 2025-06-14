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
