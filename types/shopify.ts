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
          node: {
            id: string;
            title: string;
            handle: string;
            images: {
              edges: {
                node: {
                  url: string;
                  altText: string | null;
                };
              }[];
            };
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

export type ShopifyProductOperation = {
  data: {
    product: {
      id: string;
      title: string;
      description: string;
      handle: string;
      tags: string[];
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string | null;
          };
        }>;
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        }>;
      };
    } | null;
  };
  variables: {
    handle: string;
    imageCount: number;
    variantCount: number;
  };
};
