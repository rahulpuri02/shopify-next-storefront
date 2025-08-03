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

export type ShopifyProductVariant = {
  edges: {
    node: {
      id: string;
      title: string;
      availableForSale: boolean;
      currentlyNotInStock: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
      image: {
        url: string;
        altText: string | null;
      } | null;
      selectedOptions: {
        name: string;
        value: string;
      }[];
    };
  }[];
};

export type ShopifyCollectionOperation = {
  data: {
    collection?: {
      title: string;
      description: string;
      descriptionHtml: string;
      products: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string;
            description: string;
            images: {
              edges: {
                node: {
                  url: string;
                  altText: string | null;
                };
              }[];
            };
            priceRange: {
              maxVariantPrice: {
                amount: string;
                currencyCode: string;
              };
              minVariantPrice: {
                amount: string;
                currencyCode: string;
              };
            };
            variants: ShopifyProductVariant;
          };
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
          image: {
            altText: string | null;
            url: string;
          } | null;
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
    product: {
      id: string;
      title: string;
      description: string;
      handle: string;
      tags: string[];
      priceRange: {
        maxVariantPrice: {
          amount: string;
          currencyCode: string;
        };
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      images: {
        edges: {
          node: {
            url: string;
            altText: string | null;
          };
        }[];
      };
      variants: ShopifyProductVariant;
    } | null;
  };
  variables: {
    handle: string;
    imageCount: number;
    variantCount: number;
  };
};

export type ShopifyRecommendedProductsOperation = {
  data: {
    productRecommendations: ShopifyProductOperation["data"]["product"][];
  };
  variables: {
    productHandle: string;
    imageCount: number;
    variantCount: number;
  };
};
