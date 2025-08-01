import { COLOR_CODES, FILTER_OPERATIONS } from "@/constants/shared";
import { FilterOperation, Menu } from "@/types/shared";
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

export function formatPrice(minPrice: { amount: string; currencyCode: string }): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: minPrice.currencyCode || "INR",
    minimumFractionDigits: 2,
  }).format(parseFloat(minPrice.amount || "0"));
}

export function getColorCodeByName(colorName: string): string | null {
  const match = COLOR_CODES.find(
    (color) => color.name.toLowerCase() === colorName.trim().toLowerCase()
  );
  return match?.code || null;
}
