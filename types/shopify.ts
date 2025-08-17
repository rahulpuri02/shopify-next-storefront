export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: Money;
  selectedOptions: SelectedOption[];
};

export type ProductVariantConnection = {
  edges: {
    node: ProductVariant;
  }[];
};

export type ProductImageConnection = {
  edges: {
    node: Image;
  }[];
};

export type ProductPriceRange = {
  maxVariantPrice: Money;
  minVariantPrice: Money;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags?: string[];
  images: ProductImageConnection;
  priceRange: ProductPriceRange;
  variants: ProductVariantConnection;
};

export type ShopifyProductVariant = {
  edges: {
    node: ProductVariant;
  }[];
};

export type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
        items: {
          title: string;
          url: string;
        }[];
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection?: {
      title: string;
      description: string;
      descriptionHtml: string;
      products: {
        edges: {
          node: Product;
        }[];
      };
    } | null;
  };
  variables: {
    handle: string;
    productCount: number;
    imageCount: number;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          image: Image | null;
          metafield: {
            key: string;
            value: string;
          } | null;
        };
      }[];
    };
  };
  variables: {
    count: number;
    key: string;
    namespace: string;
  };
};

export type ShopifyPageOperation = {
  data: {
    pageByHandle?: {
      id: string;
      title: string;
      handle: string;
      body: string;
      bodySummary: string;
      seo: {
        title: string;
        description: string;
      };
    } | null;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyProductOperation = {
  data: {
    product: Product | null;
  };
  variables: {
    handle: string;
    imageCount: number;
    variantCount: number;
  };
};

export type ShopifyRecommendedProductsOperation = {
  data: {
    productRecommendations: Product[];
  };
  variables: {
    productHandle: string;
    imageCount: number;
    variantCount: number;
  };
};

export type ShopifySearchResultsOperation = {
  data: {
    products: {
      edges: {
        node: Product & {
          featuredImage: {
            altText?: string;
            url: string;
          };
        };
      }[];
    };
  };
  variables: {
    query: string;
    variantCount: number;
    first: number;
  };
};

export type ShopifyCartOperation = {
  data: {
    cart: {
      id: string;
      cost: {
        subtotalAmount: Money;
        totalAmount: Money;
      };
      checkoutUrl: string;
      lines: {
        edges: {
          node: {
            id: string;
            estimatedCost: {
              subtotalAmount: Money;
              totalAmount: Money;
            };
            merchandise: {
              availableForSale: boolean;
              compareAtPrice: Money | null;
              currentlyNotInStock: boolean;
              image: Image | null;
              price: Money;
              selectedOptions: SelectedOption[];
              id: string;
              product: {
                title: string;
              };
            };
            quantity: number;
          };
        }[];
      };
    };
  };
  variables: {
    id: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: {
    cartCreate: {
      cart: ShopifyCartOperation["data"]["cart"];
    };
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: ShopifyCreateCartOperation["data"]["cartCreate"];
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};
