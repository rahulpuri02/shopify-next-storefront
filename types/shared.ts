import { FILTER_OPERATIONS } from "@/constants/shared";

export type FilterOperation = (typeof FILTER_OPERATIONS)[keyof typeof FILTER_OPERATIONS];

export type Menu = {
  title: string;
  path: string;
  items?: Menu[];
};

export type Collection = {
  title: string;
  description: string;
  descriptionHtml: string;
  products: {
    id: string;
    title: string;
    handle: string;
    imageUrl: string | null;
    imageAlt: string | null;
    price: string | null;
    variants: {
      colorName: string;
      colorCode: string | null;
      availableSizes: {
        name: string;
        stock: number;
      }[];
    }[];
  }[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  images: {
    url: string;
    altText: string | null;
  }[];
  variants: {
    colorName: string;
    colorCode: string | null;
    availableSizes: {
      name: string;
      stock: number;
    }[];
  }[];
};

export type CartItem = Product & { selectedSize: string | number; quantity: number };
