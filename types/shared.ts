import { FILTER_OPERATIONS } from "@/constants/shared";
import { Image } from "./shopify";

export type FilterOperation = (typeof FILTER_OPERATIONS)[keyof typeof FILTER_OPERATIONS];

export type Menu = {
  title: string;
  path: string;
  items?: Menu[];
};

export type SizeStock = {
  name: string;
  stock: number;
};

export type ColorVariant = {
  colorName: string;
  colorCode: string | null;
  availableSizes: SizeStock[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: string | null;
  images: Image[];
  variants: ColorVariant[];
};

export type CollectionProduct = {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  imageAlt: string | null;
  price: string | null;
  variants: ColorVariant[];
};

export type Collection = {
  title: string;
  description: string;
  descriptionHtml: string;
  products: CollectionProduct[];
};

export type CartItem = Product & {
  selectedSize: string | number;
  quantity: number;
};

export type ColorGroup = {
  colorName: string;
  colorCode: string | null;
  availableSizes: SizeStock[];
};
