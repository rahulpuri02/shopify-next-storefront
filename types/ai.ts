import { ProductVariant } from "./shopify";

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  collections: {
    edges: Array<{
      node: {
        title: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
  };
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
      };
    }>;
  };
};
