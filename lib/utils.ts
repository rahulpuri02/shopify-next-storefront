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

export function capitalize(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatPrice(minPrice: { amount: string; currencyCode: string }): string {
  const number = parseFloat(minPrice.amount || "0");

  const parts = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: minPrice.currencyCode || "INR",
    minimumFractionDigits: 2,
  }).formatToParts(number);

  const formatted = parts
    .map((part) => {
      if (part.type === "currency") return `${part.value} `;
      return part.value;
    })
    .join("");

  return formatted.trim();
}

export function getColorCodeByName(colorName: string): string | null {
  const match = COLOR_CODES.find(
    (color) => color.name.toLowerCase() === colorName.trim().toLowerCase()
  );
  return match?.code || null;
}
