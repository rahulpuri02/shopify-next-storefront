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

export type Collection = {
  title: string;
  description: string;
  products: {
    id: string;
    title: string;
    handle: string;
    imageUrl: string | null;
    imageAlt: string | null;
  }[];
};
