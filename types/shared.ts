import { FILTER_OPERATIONS } from "@/constants/shared";
import { Image, Money } from "./shopify";
import { type CustomerAddress } from "@/app/actions/customer";

export type FilterOperation = (typeof FILTER_OPERATIONS)[keyof typeof FILTER_OPERATIONS];

export type Menu = {
  title: string;
  path: string;
  items?: Menu[];
};

export type SizeStock = {
  name: string;
  stock: number;
  variantId: string;
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
  secondaryImageUrl: string | null;
  price: string | null;
  variants: ColorVariant[];
};

export type Collection = {
  title: string;
  description: string;
  descriptionHtml: string;
  products: CollectionProduct[];
};

export type ColorGroup = {
  colorName: string;
  colorCode: string | null;
  availableSizes: SizeStock[];
};

export type CartItem = {
  id: string;
  title: string;
  price: Money;
  merchandiseId: string;
  outOfStock: boolean;
  totalCost: Money;
  subTotal: Money;
  imageUrl: string | undefined;
  imageAlt: string | null | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  quantity: number;
};

export type Cart = {
  cartId: string;
  subTotal: Money;
  totalAmount: Money;
  checkoutUrl: string;
  items: CartItem[];
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  email: string;
  phone: string;
  addresses: CustomerAddress[];
  defaultAddress: CustomerAddress;
};
